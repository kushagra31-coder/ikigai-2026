import { LiveEventType } from './eventRegistry';

export interface LiveEvent<T = unknown> {
  id: string;
  type: LiveEventType;
  timestamp: string;
  actor: string;
  target: string;
  payload: T;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: string;
}
