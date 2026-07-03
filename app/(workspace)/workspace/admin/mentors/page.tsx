'use client';

import { useAdminMentors } from '@/features/admin/hooks/useAdminMentors';
import { AdminMentorsTable } from '@/features/admin/components/AdminMentorsTable';

export default function AdminMentorsPage() {
  const { data: mentors, loading } = useAdminMentors();

  if (loading || !mentors) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentor Management</h1>
        <p className="text-muted-foreground mt-1">Monitor mentor load, capacity, and evaluation progress.</p>
      </div>
      
      <AdminMentorsTable mentors={mentors} />
    </div>
  );
}
