'use client';

import { useState, useEffect } from 'react';
import { LiveEvent } from '../core/eventTypes';
import { activityStore } from '../activity/activityStore';

export function useActivityFeed() {
  const [activities, setActivities] = useState<LiveEvent[]>([]);

  useEffect(() => {
    return activityStore.subscribe((newActivities) => {
      setActivities(newActivities);
    });
  }, []);

  return activities;
}
