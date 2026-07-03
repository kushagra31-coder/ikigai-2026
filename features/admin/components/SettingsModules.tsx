'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { AdminSettings } from '../../../lib/supabase/repository/interfaces';
import { Button } from '@/components/primitives/button';

export function SettingsModules({ settings }: { settings: AdminSettings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SettingsModule title="General Configuration">
        <label className="text-sm font-medium">Event Name</label>
        <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:border-primary outline-none" defaultValue={settings.general.eventName} />
        
        <label className="text-sm font-medium">Support Email</label>
        <input type="email" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm focus:border-primary outline-none" defaultValue={settings.general.supportEmail} />
      </SettingsModule>

      <SettingsModule title="Registration & Submissions">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Registration Open</span>
          <input type="checkbox" defaultChecked={settings.registration.isOpen} className="rounded border-white/20 bg-transparent" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Submissions Open</span>
          <input type="checkbox" defaultChecked={settings.submissions.isOpen} className="rounded border-white/20 bg-transparent" />
        </div>
        <label className="text-sm font-medium">Max Teams Limit</label>
        <input type="number" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm focus:border-primary outline-none" defaultValue={settings.registration.maxTeams} />
      </SettingsModule>

      <SettingsModule title="Evaluation System">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Scoring Open</span>
          <input type="checkbox" defaultChecked={settings.evaluation.isScoringOpen} className="rounded border-white/20 bg-transparent" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Require All Mentors to Score</span>
          <input type="checkbox" defaultChecked={settings.evaluation.requireAllMentors} className="rounded border-white/20 bg-transparent" />
        </div>
      </SettingsModule>

      <SettingsModule title="Leaderboard Constraints">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Is Visible Globally</span>
          <input type="checkbox" defaultChecked={settings.leaderboard.isVisible} className="rounded border-white/20 bg-transparent" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-warning">Freeze All Rankings</span>
          <input type="checkbox" defaultChecked={settings.leaderboard.isFrozen} className="rounded border-warning/20 bg-transparent" />
        </div>
      </SettingsModule>

      <SettingsModule title="Notifications Engine">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Enable Email Alerts</span>
          <input type="checkbox" defaultChecked={settings.notifications.emailEnabled} className="rounded border-white/20 bg-transparent" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Enable SMS Broadcasts</span>
          <input type="checkbox" defaultChecked={settings.notifications.smsEnabled} className="rounded border-white/20 bg-transparent" />
        </div>
      </SettingsModule>
      
      <SettingsModule title="Maintenance & Lockout">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-destructive">Enable Maintenance Mode</span>
          <input type="checkbox" defaultChecked={settings.maintenance.isEnabled} className="rounded border-destructive/20 bg-transparent" />
        </div>
        <label className="text-sm font-medium">Lockout Message</label>
        <textarea className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm focus:border-primary outline-none resize-none h-20" defaultValue={settings.maintenance.message} />
      </SettingsModule>

      <SettingsModule title="Security Constraints">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Require 2FA for Staff</span>
          <input type="checkbox" defaultChecked={settings.security.require2FA} className="rounded border-white/20 bg-transparent" />
        </div>
        <label className="text-sm font-medium">Session Timeout (Minutes)</label>
        <input type="number" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 mt-1 text-sm focus:border-primary outline-none" defaultValue={settings.security.sessionTimeout} />
      </SettingsModule>
    </div>
  );
}

function SettingsModule({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <GlassCard className="p-6 flex flex-col h-full">
      <h3 className="font-semibold text-lg border-b border-white/10 pb-3 mb-4">{title}</h3>
      <div className="flex-1">{children}</div>
      <div className="pt-4 mt-4 border-t border-white/10 text-right">
        <Button variant="primary" size="sm">Save Changes</Button>
      </div>
    </GlassCard>
  );
}
