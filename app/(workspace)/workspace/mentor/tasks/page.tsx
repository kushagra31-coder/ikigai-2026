'use client';

import { useMentorTasks } from '@/features/mentor/hooks/useMentorTasks';
import { TaskCard } from '@/features/mentor/components/TaskCard';
import { Icons } from '@/components/constants/icons';

export default function TasksPage() {
  const { data: tasks, isLoading } = useMentorTasks();

  if (isLoading) return <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage tasks assigned to your teams.</p>
      </div>
      
      {tasks?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-xl border border-white/5">
          <Icons.check className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-1">No Active Tasks</h2>
          <p className="text-muted-foreground text-sm">You haven&apos;t assigned any tasks yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks?.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
