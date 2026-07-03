import { useRealtime } from './useRealtime';
import { NormalizedRealtimeEvent } from '../types/realtime.types';

export function useLeaderboardRealtime(onEvent?: (event: NormalizedRealtimeEvent) => void) {
  return useRealtime({
    channelName: 'leaderboard',
    table: 'evaluations', // Leaderboard updates are driven by evaluation changes
    onEvent
  });
}

export function useTaskRealtime(onEvent?: (event: NormalizedRealtimeEvent) => void, filter?: string) {
  return useRealtime({
    channelName: 'tasks',
    table: 'tasks',
    filter,
    onEvent
  });
}

export function useEvaluationRealtime(onEvent?: (event: NormalizedRealtimeEvent) => void, filter?: string) {
  return useRealtime({
    channelName: 'evaluations',
    table: 'evaluations',
    filter,
    onEvent
  });
}

export function useAnnouncementRealtime(onEvent?: (event: NormalizedRealtimeEvent) => void) {
  return useRealtime({
    channelName: 'announcements',
    table: 'announcements',
    onEvent
  });
}

export function useNotificationRealtime(onEvent?: (event: NormalizedRealtimeEvent) => void, filter?: string) {
  return useRealtime({
    channelName: 'notifications',
    table: 'notifications',
    filter,
    onEvent
  });
}
