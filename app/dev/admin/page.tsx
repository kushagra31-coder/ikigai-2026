'use client';

import Link from 'next/link';
import { Button } from '@/components/primitives/button';

export default function DevAdminPlayground() {
  const routes = [
    '/workspace/admin',
    '/workspace/admin/teams',
    '/workspace/admin/mentors',
    '/workspace/admin/tracks',
    '/workspace/admin/sessions',
    '/workspace/admin/settings',
    '/workspace/admin/announcements',
    '/workspace/admin/leaderboard',
    '/workspace/admin/logs'
  ];

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Workspace Playground</h1>
        <p className="text-muted-foreground mt-2">
          Verify the architectural integration of the new Admin Workspace without authentication blocks.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {routes.map(r => (
          <Link key={r} href={r} target="_blank">
            <Button variant="outline" className="w-full justify-start">{r}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
