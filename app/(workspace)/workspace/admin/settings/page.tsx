'use client';

import { useAdminSettings } from '@/features/admin/hooks/useAdminSettings';
import { SettingsModules } from '@/features/admin/components/SettingsModules';

export default function AdminSettingsPage() {
  const { data: settings, loading } = useAdminSettings();

  if (loading || !settings) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global application parameters.</p>
      </div>
      
      <SettingsModules settings={settings} />
    </div>
  );
}
