'use client';

import React from 'react';
import { useSessionStatus } from '../hooks/useSessionStatus';
import { SessionState } from '../../admin/types';

export function SessionStatusIndicator() {
  const status = useSessionStatus();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Session:</span>
      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusStyle(status)}`}>
        {status.replace(/_/g, ' ')}
      </span>
    </div>
  );
}

function getStatusStyle(status: SessionState) {
  switch (status) {
    case SessionState.CREATED:
    case SessionState.SCHEDULED:
    case SessionState.ARCHIVED:
      return 'bg-gray-500/20 text-gray-400';
    case SessionState.ACTIVE:
    case SessionState.PUBLISHED:
      return 'bg-green-500/20 text-green-400';
    case SessionState.PAUSED:
      return 'bg-yellow-500/20 text-yellow-400';
    case SessionState.LOCKED:
    case SessionState.COMPLETED:
      return 'bg-secondary/20 text-secondary';
    default:
      return 'bg-primary/20 text-primary';
  }
}
