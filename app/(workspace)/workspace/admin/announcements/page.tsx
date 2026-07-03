'use client';

import { useAdminAnnouncements } from '@/features/admin/hooks/useAdminAnnouncements';
import { GlassCard } from '@/components/data-display/GlassCard';

export default function AdminAnnouncementsPage() {
  const { data: announcements, loading } = useAdminAnnouncements();

  if (loading || !announcements) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground mt-1">Manage global event broadcasts.</p>
      </div>
      
      <GlassCard className="overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Title</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Priority</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Audience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {announcements.map(ann => (
              <tr key={ann.id} className="hover:bg-white/5">
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  {ann.pinned && <span className="text-yellow-400">📌</span>}
                  {ann.title}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${ann.status === 'PUBLISHED' ? 'bg-success/20 text-success' : 'bg-white/10 text-muted-foreground'}`}>
                    {ann.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{ann.priority}</td>
                <td className="py-3 px-4 text-muted-foreground">{ann.audience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
