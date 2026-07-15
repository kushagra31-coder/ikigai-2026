'use client';

import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data } = await supabase().from('settings').select('*').limit(1).single();
      if (data) {
        setSettings({ ...data.value, id: data.id });
      } else {
        // If no settings exist, initialize them
        const defaultSettings = {
          eventStatus: 'PLANNING',
          registration: { isOpen: false, maxTeams: 50 },
          submissions: { isOpen: false },
          evaluation: { isScoringOpen: false },
          leaderboard: { isVisible: false }
        };
        const { data: newData } = await supabase().from('settings').insert([{ key: 'global', value: defaultSettings }]).select().single();
        if (newData) setSettings({ ...newData.value, id: newData.id });
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateRootSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, ...value } = settings;
      await supabase().from('settings').update({ value }).eq('id', id);
      alert('Settings saved successfully!');
    } catch (e) {
      console.error(e);
      alert('Failed to save settings');
    }
    setSaving(false);
  };

  if (loading || !settings) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Settings</h1>
          <p className="text-muted-foreground mt-1">Configure global controls for the hackathon.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Global Event Status */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Global Event Status</h3>
          <p className="text-sm text-muted-foreground mb-4">Set the current stage of the event.</p>
          <select 
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            value={settings.eventStatus || 'PLANNING'}
            onChange={(e) => updateRootSetting('eventStatus', e.target.value)}
          >
            <option value="PLANNING">Planning</option>
            <option value="REGISTRATION_OPEN">Registration Open</option>
            <option value="HACKING">Hacking in Progress</option>
            <option value="SUBMISSION_OPEN">Submissions Open</option>
            <option value="EVALUATION">Judging / Evaluation</option>
            <option value="EVENT_COMPLETED">Event Completed</option>
          </select>
        </GlassCard>

        {/* Registration Controls */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Registration Controls</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Open Registration</span>
            <input 
              type="checkbox" 
              checked={settings.registration?.isOpen || false}
              onChange={(e) => updateSetting('registration', 'isOpen', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-transparent text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Teams limit</label>
            <input 
              type="number"
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm"
              value={settings.registration?.maxTeams || 50}
              onChange={(e) => updateSetting('registration', 'maxTeams', parseInt(e.target.value))}
            />
          </div>
        </GlassCard>

        {/* Submissions Controls */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Submissions</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Project Submissions</span>
            <input 
              type="checkbox" 
              checked={settings.submissions?.isOpen || false}
              onChange={(e) => updateSetting('submissions', 'isOpen', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-transparent text-primary"
            />
          </div>
        </GlassCard>

        {/* Judging Controls */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Judging & Evaluations</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Mentors to Score</span>
            <input 
              type="checkbox" 
              checked={settings.evaluation?.isScoringOpen || false}
              onChange={(e) => updateSetting('evaluation', 'isScoringOpen', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-transparent text-primary"
            />
          </div>
        </GlassCard>

        {/* Leaderboard Controls */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Leaderboard Visibility</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Reveal Leaderboard publicly</span>
            <input 
              type="checkbox" 
              checked={settings.leaderboard?.isVisible || false}
              onChange={(e) => updateSetting('leaderboard', 'isVisible', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-transparent text-primary"
            />
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
