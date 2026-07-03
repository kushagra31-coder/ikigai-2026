import { useState, useCallback } from 'react';
import { PresenceState } from '../types/realtime.types';
import { useRealtime } from './useRealtime';

export function usePresence(channelName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [presenceState, setPresenceState] = useState<Record<string, any>>({});

  const { trackPresence } = useRealtime({
    channelName,
    onPresenceUpdate: setPresenceState
  });

  const updatePresence = useCallback(
    (state: PresenceState) => {
      trackPresence(state).catch(console.error);
    },
    [trackPresence]
  );

  return { presenceState, updatePresence };
}
