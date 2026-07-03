import { ReactNode } from 'react';
import { AdminGuard } from '@/features/admin/components/AdminGuard';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}
