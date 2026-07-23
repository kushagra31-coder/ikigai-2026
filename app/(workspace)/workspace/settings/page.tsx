'use client';

import { useState } from 'react';
import { Card } from '@/components/primitives/card';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import { useProfile } from '@/features/authentication/hooks/useProfile';
import { PushNotificationManager } from '@/features/workspace/components/PushNotificationManager';

export default function SettingsPage() {
  const { profile } = useProfile();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [announcements, setAnnouncements] = useState(true);
  const [teamUpdates, setTeamUpdates] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your notification preferences and account settings.</p>
      </div>

      {/* Profile Quick Info */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-bold border border-primary/30">
            {profile?.full_name
              ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
              : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{profile?.full_name || 'User'}</p>
            <p className="text-sm text-muted-foreground truncate">{profile?.email}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/workspace/profile">Edit Profile</a>
          </Button>
        </div>
      </Card>

      {/* Push Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Icons.bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold">Push Notifications</h2>
            <p className="text-xs text-muted-foreground">Browser push alerts for real-time updates</p>
          </div>
        </div>
        <PushNotificationManager />
      </Card>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
            <Icons.mail className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold">Email Notifications</h2>
            <p className="text-xs text-muted-foreground">Control which emails you receive from IKIGAI</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'All email notifications', description: 'Master toggle for all emails', value: emailNotifications, onChange: setEmailNotifications },
            { label: 'Announcements', description: 'Event-wide announcements from organizers', value: announcements, onChange: setAnnouncements },
            { label: 'Team updates', description: 'Changes to your team, members, or submissions', value: teamUpdates, onChange: setTeamUpdates },
            { label: 'Deadline reminders', description: 'Reminders before key event deadlines', value: deadlineReminders, onChange: setDeadlineReminders },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={item.value}
                onClick={() => item.onChange(!item.value)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  item.value ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ${
                    item.value ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-muted rounded-lg text-muted-foreground">
            <Icons.sun className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold">Appearance</h2>
            <p className="text-xs text-muted-foreground">Theme is locked to dark mode for IKIGAI 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/5">
          <Icons.moon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Dark Mode — Active</span>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
            <Icons.alert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-destructive">Danger Zone</h2>
            <p className="text-xs text-muted-foreground">Irreversible account actions</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
