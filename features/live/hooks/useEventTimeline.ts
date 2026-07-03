'use client';

import { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/config/event.config';

export type TimelineStageStatus = 'PAST' | 'CURRENT' | 'UPCOMING';

export interface TimelineStage {
  id: string;
  title: string;
  date: string;
  status: TimelineStageStatus;
}

function evaluateStages(): TimelineStage[] {
  const now = new Date().getTime();
  
  const rawStages = [
    { id: 'registration', title: 'Registration Deadline', date: EVENT_CONFIG.timeline.registrationDeadline },
    { id: 'start', title: 'Final Round Starts', date: EVENT_CONFIG.timeline.finalRoundStart },
    { id: 'end', title: 'Final Round Ends', date: EVENT_CONFIG.timeline.finalRoundEnd }
  ];

  return rawStages.map((stage, index) => {
    const stageTime = new Date(stage.date).getTime();
    const nextStageTime = index < rawStages.length - 1 ? new Date(rawStages[index + 1].date).getTime() : Infinity;

    let status: TimelineStageStatus = 'UPCOMING';

    if (now >= stageTime && now < nextStageTime) {
      status = 'CURRENT';
    } else if (now >= nextStageTime) {
      status = 'PAST';
    }

    if (index === rawStages.length - 1 && now >= stageTime) {
       status = 'CURRENT';
    }

    return {
      ...stage,
      status
    };
  });
}

export function useEventTimeline() {
  const [stages, setStages] = useState<TimelineStage[]>(evaluateStages);

  useEffect(() => {
    // Optionally set up an interval to refresh the timeline periodically
    const interval = setInterval(() => {
      setStages(evaluateStages());
    }, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  return stages;
}
