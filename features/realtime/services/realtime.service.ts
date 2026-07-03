import { createClient } from '../../../lib/supabase/client';
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { 
  ConnectionState, 
  NormalizedRealtimeEvent, 
  PresenceState, 
  RealtimeError, 
  RealtimeOperation 
} from '../types/realtime.types';
import { liveEventBus } from '../../live/core/eventBus';

export interface SubscriptionConfig {
  channelName: string;
  table?: string;
  filter?: string;
  onEvent?: (event: NormalizedRealtimeEvent) => void;
  onPresenceUpdate?: (presence: Record<string, unknown>) => void;
  onStatusChange?: (status: ConnectionState) => void;
}

interface ChannelListeners {
  events: Set<(event: NormalizedRealtimeEvent) => void>;
  presence: Set<(presence: Record<string, unknown>) => void>;
  status: Set<(status: ConnectionState) => void>;
}

export class RealtimeService {
  private static instance: RealtimeService;
  private supabase: SupabaseClient;
  private channels: Map<string, RealtimeChannel> = new Map();
  private connectionStates: Map<string, ConnectionState> = new Map();
  private connectionRetries: Map<string, number> = new Map();
  private channelListeners: Map<string, ChannelListeners> = new Map();
  
  private readonly MAX_RETRIES = 5;
  private readonly HEARTBEAT_INTERVAL = 30000;
  private heartbeatIntervalIds: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.supabase = createClient() as any;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleNetworkChange.bind(this));
      window.addEventListener('offline', this.handleNetworkChange.bind(this));
    }
  }

  public static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
      
      // Wire up EventBus to broadcast local custom events
      liveEventBus.setBroadcastProvider((event) => {
        // We broadcast to a general 'system' channel for standard LiveEvents
        RealtimeService.instance.broadcast('system', event.type, event.payload).catch(console.error);
      });
    }
    return RealtimeService.instance;
  }

  private handleNetworkChange() {
    if (navigator.onLine) {
      this.reconnectAll();
    } else {
      this.channels.forEach((_, channelName) => {
        this.updateConnectionState(channelName, 'DISCONNECTED');
      });
    }
  }

  private reconnectAll() {
    this.channels.forEach((_, channelName) => {
      if (this.connectionStates.get(channelName) !== 'CONNECTED') {
        this.updateConnectionState(channelName, 'RECONNECTING');
        const channel = this.channels.get(channelName);
        if (channel) {
          channel.subscribe((status, err) => this.handleSubscribeStatus(channelName, status, err));
        }
      }
    });
  }

  private updateConnectionState(channelName: string, state: ConnectionState) {
    this.connectionStates.set(channelName, state);
    
    const listeners = this.channelListeners.get(channelName);
    listeners?.status.forEach(cb => cb(state));

    // Bridge state change if necessary
    liveEventBus.publish({
      id: crypto.randomUUID(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: 'EVENT_STATE_CHANGED' as any,
      timestamp: new Date().toISOString(),
      actor: 'system',
      target: channelName,
      payload: { state },
      priority: 'LOW',
      source: 'RealtimeService'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleSubscribeStatus(channelName: string, status: string, _err?: Error) {
    if (status === 'SUBSCRIBED') {
      this.updateConnectionState(channelName, 'CONNECTED');
      this.connectionRetries.set(channelName, 0);
      this.startHeartbeat(channelName);
    } else if (status === 'TIMED_OUT' || status === 'CHANNEL_ERROR') {
      this.stopHeartbeat(channelName);
      this.updateConnectionState(channelName, 'FAILED');
      this.attemptReconnect(channelName);
    } else if (status === 'CLOSED') {
      this.stopHeartbeat(channelName);
      this.updateConnectionState(channelName, 'DISCONNECTED');
    }
  }

  private attemptReconnect(channelName: string) {
    const retries = this.connectionRetries.get(channelName) || 0;
    if (retries >= this.MAX_RETRIES) {
      this.updateConnectionState(channelName, 'FAILED');
      return;
    }

    this.connectionRetries.set(channelName, retries + 1);
    this.updateConnectionState(channelName, 'RECONNECTING');
    
    const backoffTime = Math.min(1000 * Math.pow(2, retries), 30000);
    setTimeout(() => {
      const channel = this.channels.get(channelName);
      if (channel) {
        channel.subscribe((status, err) => this.handleSubscribeStatus(channelName, status, err));
      }
    }, backoffTime);
  }

  private startHeartbeat(channelName: string) {
    this.stopHeartbeat(channelName);
    const id = setInterval(() => {
      const channel = this.channels.get(channelName);
      if (channel && this.connectionStates.get(channelName) === 'CONNECTED') {
        channel.send({
          type: 'broadcast',
          event: 'heartbeat',
          payload: { timestamp: new Date().toISOString() }
        }).catch(() => {
          // If sending fails, assume disconnected
          this.handleSubscribeStatus(channelName, 'CHANNEL_ERROR');
        });
      }
    }, this.HEARTBEAT_INTERVAL);
    this.heartbeatIntervalIds.set(channelName, id);
  }

  private stopHeartbeat(channelName: string) {
    const id = this.heartbeatIntervalIds.get(channelName);
    if (id) {
      clearInterval(id);
      this.heartbeatIntervalIds.delete(channelName);
    }
  }

  private normalizePayload(
    entity: string,
    operation: RealtimeOperation,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    oldData: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData: any,
    channelName: string
  ): NormalizedRealtimeEvent {
    return {
      type: `${entity.toUpperCase()}_${operation}`,
      entity,
      operation,
      oldData,
      newData,
      timestamp: new Date().toISOString(),
      actor: newData?.user_id || newData?.actor_id || 'system',
      source: channelName
    };
  }

  private logActivityIfAppropriate(event: NormalizedRealtimeEvent) {
    const loggableEntities = ['evaluations', 'announcements', 'scan_logs', 'tasks'];
    
    if (loggableEntities.includes(event.entity) && ['INSERT', 'UPDATE'].includes(event.operation)) {
      this.supabase.from('activity_logs').insert({
        action: event.type,
        entity_type: event.entity,
        entity_id: event.newData?.id || 'unknown',
        actor_id: event.actor,
        metadata: { diff: event.newData }
      }).then(({ error }) => {
        if (error) console.error(error);
      }); // Silent fail for activity log
    }
  }

  public subscribe(config: SubscriptionConfig): () => void {
    const { channelName, table, filter, onEvent, onPresenceUpdate, onStatusChange } = config;

    let channel = this.channels.get(channelName);

    if (!channel) {
      channel = this.supabase.channel(channelName);
      this.channels.set(channelName, channel);
      this.channelListeners.set(channelName, { events: new Set(), presence: new Set(), status: new Set() });

      // CDC setup
      if (table) {
        channel.on(
          'postgres_changes',
          { event: '*', schema: 'public', table, filter },
          (payload) => {
            const operation = payload.eventType as RealtimeOperation;
            const normalized = this.normalizePayload(table, operation, payload.old, payload.new, channelName);
            
            // Log to activity log if business relevant
            this.logActivityIfAppropriate(normalized);
            
            // Notify local listeners
            const listeners = this.channelListeners.get(channelName);
            listeners?.events.forEach(cb => cb(normalized));

            // Bridge to legacy EventBus
            liveEventBus.publish({
              id: crypto.randomUUID(),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              type: normalized.type as any, // Extensible registry
              timestamp: normalized.timestamp,
              actor: normalized.actor,
              target: normalized.entity,
              payload: normalized,
              priority: 'MEDIUM',
              source: `realtime:${channelName}`
            });
          }
        );
      }

      // Broadcast setup
      channel.on('broadcast', { event: '*' }, (payload) => {
        if (payload.event === 'heartbeat') return; // Ignore internal heartbeats
        
        const normalized = this.normalizePayload(
          payload.event,
          'BROADCAST',
          null,
          payload.payload,
          channelName
        );
        
        const listeners = this.channelListeners.get(channelName);
        listeners?.events.forEach(cb => cb(normalized));
        
        // Bridge broadcast to EventBus
        liveEventBus.publish({
          id: crypto.randomUUID(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: payload.event as any,
          timestamp: normalized.timestamp,
          actor: normalized.actor,
          target: channelName,
          payload: payload.payload,
          priority: 'MEDIUM',
          source: `realtime-broadcast:${channelName}`
        });
      });

      // Presence setup
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel?.presenceState() || {};
        const listeners = this.channelListeners.get(channelName);
        listeners?.presence.forEach(cb => cb(state));
      });

      this.updateConnectionState(channelName, 'CONNECTING');
      channel.subscribe((status, err) => {
        this.handleSubscribeStatus(channelName, status, err);
      });
    }

    const listeners = this.channelListeners.get(channelName)!;
    if (onEvent) listeners.events.add(onEvent);
    if (onPresenceUpdate) listeners.presence.add(onPresenceUpdate);
    if (onStatusChange) {
      listeners.status.add(onStatusChange);
      onStatusChange(this.connectionStates.get(channelName) || 'DISCONNECTED');
    }

    // Return unsubscribe function
    return () => {
      const currentListeners = this.channelListeners.get(channelName);
      if (currentListeners) {
        if (onEvent) currentListeners.events.delete(onEvent);
        if (onPresenceUpdate) currentListeners.presence.delete(onPresenceUpdate);
        if (onStatusChange) currentListeners.status.delete(onStatusChange);
        
        if (currentListeners.events.size === 0 && currentListeners.presence.size === 0 && currentListeners.status.size === 0) {
          this.unsubscribe(channelName);
        }
      }
    };
  }

  public unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelName);
      this.channelListeners.delete(channelName);
      this.stopHeartbeat(channelName);
      this.updateConnectionState(channelName, 'DISCONNECTED');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async broadcast(channelName: string, event: string, payload: any): Promise<void> {
    const channel = this.channels.get(channelName);
    if (!channel) {
      throw new RealtimeError('Channel not found or not connected', 'CHANNEL_CLOSED');
    }

    const res = await channel.send({
      type: 'broadcast',
      event,
      payload
    });

    if (res !== 'ok') {
      throw new RealtimeError('Broadcast failed', 'CONNECTION_FAILED');
    }
  }

  public async trackPresence(channelName: string, state: PresenceState): Promise<void> {
    const channel = this.channels.get(channelName);
    if (!channel) {
      throw new RealtimeError('Channel not found', 'CHANNEL_CLOSED');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await channel.track(state as any);
    if (res !== 'ok') {
      throw new RealtimeError('Presence track failed', 'CONNECTION_FAILED');
    }
  }

  public getConnectionState(channelName: string): ConnectionState {
    return this.connectionStates.get(channelName) || 'DISCONNECTED';
  }
}
