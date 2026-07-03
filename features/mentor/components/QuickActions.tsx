import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    { label: 'View Assignments', icon: Icons.users, href: '/workspace/mentor/teams', color: 'text-blue-400' },
    { label: 'Evaluation Queue', icon: Icons.star, href: '/workspace/mentor/evaluation', color: 'text-yellow-400' },
    { label: 'Task Management', icon: Icons.check, href: '/workspace/mentor/tasks', color: 'text-green-400' },
    { label: 'Evaluation History', icon: Icons.clock, href: '/workspace/mentor/history', color: 'text-purple-400' },
  ];

  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <Link 
            key={i}
            href={action.href}
            className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
          >
            <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
