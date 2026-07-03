import { useEffect, useRef } from 'react';
import { RealtimeService } from '../services/realtime.service';
import { ConnectionState, NormalizedRealtimeEvent } from '../types/realtime.types';

export interface UseRealtimeOptions {
  channelName: string;
  table?: string;
  filter?: string;
  onEvent?: (event: NormalizedRealtimeEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPresenceUpdate?: (presence: Record<string, any>) => void;
  onStatusChange?: (status: ConnectionState) => void;
}

export function useRealtime(options: UseRealtimeOptions) {
  const service = RealtimeService.getInstance();
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const unsubscribe = service.subscribe({
      channelName: optionsRef.current.channelName,
      table: optionsRef.current.table,
      filter: optionsRef.current.filter,
      onEvent: (event) => {
        if (optionsRef.current.onEvent) {
          optionsRef.current.onEvent(event);
        }
      },
      onPresenceUpdate: (presence) => {
        if (optionsRef.current.onPresenceUpdate) {
          optionsRef.current.onPresenceUpdate(presence);
        }
      },
      onStatusChange: (status) => {
        if (optionsRef.current.onStatusChange) {
          optionsRef.current.onStatusChange(status);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [service, options.channelName, options.table, options.filter]);

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    broadcast: (event: string, payload: any) => 
      service.broadcast(options.channelName, event, payload),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackPresence: (state: any) =>
      service.trackPresence(options.channelName, state)
  };
}
