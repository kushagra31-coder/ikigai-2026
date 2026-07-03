import { Role, AdminPermission } from './permission.types';

export const PERMISSION_MATRIX: Record<Role, AdminPermission[]> = {
  ADMIN: [
    'MANAGE_TEAMS',
    'MANAGE_MENTORS',
    'MANAGE_TRACKS',
    'MANAGE_SESSIONS',
    'MANAGE_SETTINGS',
    'MANAGE_LEADERBOARD',
    'MANAGE_ANNOUNCEMENTS',
    'MANAGE_LOGS'
  ],
  MENTOR: [],
  PARTICIPANT: [],
  GUEST: []
};
