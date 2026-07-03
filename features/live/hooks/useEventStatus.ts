'use client';

import { useState, useEffect } from 'react';
import { EventState } from '../../admin/types';
import { statusStore } from '../status/statusStore';

export function useEventStatus() {
  const [eventState, setEventState] = useState<EventState>(EventState.PLANNING);

  useEffect(() => {
    return statusStore.subscribeEvent((newState) => {
      setEventState(newState);
    });
  }, []);

  return eventState;
}
