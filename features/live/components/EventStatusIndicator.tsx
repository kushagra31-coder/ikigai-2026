'use client';

import React from 'react';
import { useEventStatus } from '../hooks/useEventStatus';
import { EventState } from '../../admin/types';

export function EventStatusIndicator() {
  const status = useEventStatus();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Event Status:</span>
      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusStyle(status)}`}>
        {status.replace(/_/g, ' ')}
      </span>
    </div>
  );
}

function getStatusStyle(status: EventState) {
  switch (status) {
    case EventState.PLANNING:
    case EventState.MAINTENANCE:
      return 'bg-gray-500/20 text-gray-400';
    case EventState.REGISTRATION_OPEN:
    case EventState.SUBMISSION_OPEN:
      return 'bg-green-500/20 text-green-400';
    case EventState.EVALUATION:
    case EventState.MENTORING:
      return 'bg-blue-500/20 text-blue-400';
    case EventState.LEADERBOARD_PREVIEW:
    case EventState.RESULTS_PUBLISHED:
      return 'bg-purple-500/20 text-purple-400';
    case EventState.EVENT_COMPLETED:
    case EventState.REGISTRATION_CLOSED:
    case EventState.SUBMISSION_CLOSED:
      return 'bg-secondary/20 text-secondary';
    default:
      return 'bg-primary/20 text-primary';
  }
}
