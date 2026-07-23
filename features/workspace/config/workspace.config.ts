import { Icons } from '@/components/constants/icons';

export type WorkspaceRole = 'USER' | 'TEAM' | 'MENTOR' | 'ADMIN';

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  roles: WorkspaceRole[];
  disabled?: boolean;
}

/**
 * Canonical workspace navigation.
 * Only MENTOR and ADMIN roles reach the workspace (enforced by WorkspaceLayout).
 * TEAM / USER items have been removed — this is an operations platform, not a participant portal.
 */
export const WORKSPACE_NAV: NavItem[] = [
  // ─── Shared (Mentor + Admin) ─────────────────────────────────────────────
  {
    title: 'Dashboard',
    href: '/workspace',
    icon: 'dashboard',
    roles: ['MENTOR', 'ADMIN'],
  },
  {
    title: 'Announcements',
    href: '/workspace/announcements',
    icon: 'bell',
    roles: ['MENTOR', 'ADMIN'],
  },

  // ─── Mentor ──────────────────────────────────────────────────────────────
  {
    title: 'Judge Panel',
    href: '/workspace/mentor',
    icon: 'fileText',
    roles: ['MENTOR'],
  },

  // ─── Admin ───────────────────────────────────────────────────────────────
  {
    title: 'Mission Control',
    href: '/workspace/admin',
    icon: 'shield',
    roles: ['ADMIN'],
  },
  {
    title: 'Evaluations Monitor',
    href: '/workspace/admin/evaluations',
    icon: 'star',
    roles: ['ADMIN'],
  },
  {
    title: 'Manage Teams',
    href: '/workspace/admin/teams',
    icon: 'users',
    roles: ['ADMIN'],
  },
  {
    title: 'Manage Tracks',
    href: '/workspace/admin/tracks',
    icon: 'filter',
    roles: ['ADMIN'],
  },
  {
    title: 'Manage Mentors',
    href: '/workspace/admin/mentors',
    icon: 'users',
    roles: ['ADMIN'],
  },
  {
    title: 'Announcements',
    href: '/workspace/admin/announcements',
    icon: 'bell',
    roles: ['ADMIN'],
  },
  {
    title: 'Leaderboard Ops',
    href: '/workspace/admin/leaderboard',
    icon: 'trophy',
    roles: ['ADMIN'],
  },

  // ─── Settings (Shared) ───────────────────────────────────────────────────
  {
    title: 'Settings',
    href: '/workspace/settings',
    icon: 'settings',
    roles: ['MENTOR', 'ADMIN'],
  },
];

// Workspace quick-actions (command palette) — admin only
export const WORKSPACE_ACTIONS = [
  {
    id: 'push-announcement',
    title: 'Push Announcement',
    icon: 'radio' as keyof typeof Icons,
    shortcut: ['P', 'A'],
    roles: ['ADMIN'],
  },
  {
    id: 'view-leaderboard',
    title: 'View Leaderboard',
    icon: 'trophy' as keyof typeof Icons,
    shortcut: ['V', 'L'],
    roles: ['MENTOR', 'ADMIN'],
  },
];
