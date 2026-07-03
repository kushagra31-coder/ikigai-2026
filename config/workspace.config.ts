import { LayoutDashboard, FileText, CheckSquare, Trophy, Bell, Users, Settings, Activity } from 'lucide-react';
import { MenuItem } from '@/types/workspace.types';
import { Role } from '@/types/auth.types';

export const TEAM_MENU: MenuItem[] = [
  { title: 'Dashboard', href: '/workspace', icon: LayoutDashboard },
  { title: 'Submission', href: '/workspace/submission', icon: FileText },
  { title: 'Tasks', href: '/workspace/tasks', icon: CheckSquare },
  { title: 'Scores', href: '/workspace/scores', icon: Trophy },
  { title: 'Announcements', href: '/workspace/announcements', icon: Bell },
];

export const MENTOR_MENU: MenuItem[] = [
  { title: 'Dashboard', href: '/workspace', icon: LayoutDashboard },
  { title: 'Assigned Teams', href: '/workspace/assigned-teams', icon: Users },
  { title: 'Evaluations', href: '/workspace/evaluations', icon: CheckSquare },
  { title: 'Leaderboard', href: '/workspace/leaderboard', icon: Trophy },
];

export const ADMIN_MENU: MenuItem[] = [
  { title: 'Dashboard', href: '/workspace', icon: LayoutDashboard },
  { title: 'Teams', href: '/workspace/teams', icon: Users },
  { title: 'Mentors', href: '/workspace/mentors', icon: Users },
  { title: 'Tracks', href: '/workspace/tracks', icon: FileText },
  { title: 'Announcements', href: '/workspace/announcements', icon: Bell },
  { title: 'Settings', href: '/workspace/settings', icon: Settings },
  { title: 'Analytics', href: '/workspace/analytics', icon: Activity },
];

export const VISITOR_MENU: MenuItem[] = [
  { title: 'Overview', href: '/workspace', icon: LayoutDashboard }
];

export const getMenuForRole = (role: Role | null): MenuItem[] => {
  switch (role) {
    case 'ADMIN': return ADMIN_MENU;
    case 'MENTOR': return MENTOR_MENU;
    case 'TEAM': return TEAM_MENU;
    case 'VISITOR': return VISITOR_MENU;
    default: return [];
  }
};
