export type ConnectionState = 'CONNECTED' | 'CONNECTING' | 'DISCONNECTED' | 'RECONNECTING' | 'FAILED';

export type RealtimeOperation = 'INSERT' | 'UPDATE' | 'DELETE' | 'BROADCAST' | 'PRESENCE';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NormalizedRealtimeEvent<T = any> {
  type: string; // Typically maps to LiveEventType, or table name
  entity: string; // The table name or broadcast topic
  operation: RealtimeOperation;
  oldData: Partial<T> | null;
  newData: T | null;
  timestamp: string;
  actor: string; // User ID if known, or 'system'
  source: string; // Channel name
}

export interface PresenceState {
  userId: string;
  role: string;
  workspace: string;
  track?: string;
  lastSeen: string;
  connectionState: ConnectionState;
}

export class RealtimeError extends Error {
  constructor(
    message: string,
    public readonly code: 'CONNECTION_FAILED' | 'SUBSCRIPTION_FAILED' | 'TIMEOUT' | 'UNAUTHORIZED' | 'CHANNEL_CLOSED',
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'RealtimeError';
  }
}
