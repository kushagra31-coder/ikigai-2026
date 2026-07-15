import { Icons } from '@/components/constants/icons';

export type WorkspaceRole = 'USER' | 'TEAM' | 'MENTOR' | 'ADMIN';

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  roles: WorkspaceRole[];
  disabled?: boolean;
}

export const WORKSPACE_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/workspace',
    icon: 'dashboard',
    roles: ['USER', 'TEAM', 'MENTOR', 'ADMIN'],
  },
  {
    title: 'Profile',
    href: '/workspace/profile',
    icon: 'user',
    roles: ['USER', 'TEAM', 'MENTOR', 'ADMIN'],
  },
  {
    title: 'Tasks',
    href: '/workspace/tasks',
    icon: 'check',
    roles: ['TEAM'],
  },
  {
    title: 'Submission',
    href: '/workspace/submission',
    icon: 'upload',
    roles: ['TEAM'],
  },
  {
    title: 'Announcements',
    href: '/workspace/announcements',
    icon: 'bell',
    roles: ['USER', 'TEAM', 'MENTOR', 'ADMIN'],
  },
  {
    title: 'Scores',
    href: '/workspace/scores',
    icon: 'star',
    roles: ['TEAM'],
  },
  {
    title: 'Admin Panel',
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
    title: 'Push Announcements',
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
  {
    title: 'Judge Panel',
    href: '/workspace/judge',
    icon: 'fileText',
    roles: ['MENTOR'],
  },
  {
    title: 'Settings',
    href: '/workspace/settings',
    icon: 'settings',
    roles: ['USER', 'TEAM', 'MENTOR', 'ADMIN'],
  }
];

export const WORKSPACE_ACTIONS = [
  {
    id: 'create-team',
    title: 'Create Team',
    icon: 'add' as keyof typeof Icons,
    shortcut: ['C', 'T'],
    roles: ['USER'],
  },
  {
    id: 'join-team',
    title: 'Join Team',
    icon: 'users' as keyof typeof Icons,
    shortcut: ['J', 'T'],
    roles: ['USER'],
  },
  {
    id: 'submit-project',
    title: 'Submit Project',
    icon: 'upload' as keyof typeof Icons,
    shortcut: ['S', 'P'],
    roles: ['TEAM'],
  },
];
