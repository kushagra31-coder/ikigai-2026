'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { MentorTask } from '../types';
import { TaskPriorityBadge, TaskStatusBadge } from './Badges';
import { Icons } from '@/components/constants/icons';

interface TaskCardProps {
  task: MentorTask;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <GlassCard className="p-4 flex flex-col gap-3 group hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-sm line-clamp-1">{task.title}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <Icons.users className="w-3 h-3" />
          <span>{task.teamName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icons.clock className="w-3 h-3" />
          <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
        </div>
      </div>
    </GlassCard>
  );
}
