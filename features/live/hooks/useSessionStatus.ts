'use client';

import { useState, useEffect } from 'react';
import { SessionState } from '../../admin/types';
import { statusStore } from '../status/statusStore';

export function useSessionStatus() {
  const [sessionState, setSessionState] = useState<SessionState>(SessionState.CREATED);

  useEffect(() => {
    return statusStore.subscribeSession((newState) => {
      setSessionState(newState);
    });
  }, []);

  return sessionState;
}
