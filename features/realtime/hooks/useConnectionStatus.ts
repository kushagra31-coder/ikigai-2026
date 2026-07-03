import { useState } from 'react';
import { ConnectionState } from '../types/realtime.types';
import { RealtimeService } from '../services/realtime.service';
import { useRealtime } from './useRealtime';

export function useConnectionStatus(channelName: string) {
  const service = RealtimeService.getInstance();
  const [status, setStatus] = useState<ConnectionState>(service.getConnectionState(channelName));

  useRealtime({
    channelName,
    onStatusChange: setStatus
  });

  return status;
}
