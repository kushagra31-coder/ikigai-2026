'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { Badge } from '@/components/primitives/badge';
import { motion, AnimatePresence } from 'framer-motion';



import { useWorkspaceTeam } from '@/features/workspace/hooks/useWorkspaceTeam';
import { useTasks } from '@/features/workspace/hooks/useTasks';

export default function TasksPage() {
  const { teamId, loading: teamLoading } = useWorkspaceTeam();
  const { tasks: dbTasks, loading: tasksLoading, toggleTaskStatus } = useTasks(teamId);
  const [filter, setFilter] = useState<'All' | string>('All');
  const [search, setSearch] = useState('');

  const loading = teamLoading || tasksLoading;

  const filteredTasks = dbTasks.filter(task => {
    const matchesFilter = filter === 'All' || task.status === filter.toUpperCase();
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = () => {
    // Tasks table schema doesn't have priority, just return a default or derive from due_date
    return 'text-warning bg-warning/10 border-warning/20';
  };

  const getStatusColor = (status: string) => {
    switch(status.toUpperCase()) {
      case 'PENDING': return 'text-warning bg-warning/10 border-warning/20';
      case 'COMPLETED': return 'text-success bg-success/10 border-success/20';
      case 'OVERDUE': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-white/5 border-white/10';
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage and track your assigned tasks.</p>
        </div>
      </div>

      <GlassCard className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 sticky top-0">
        <div className="relative w-full md:w-96">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Pending', 'Completed', 'Overdue'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-4 pb-12">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center bg-white/5 border border-white/5 rounded-2xl"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <h3 className="text-lg font-semibold">Loading tasks...</h3>
            </motion.div>
          ) : filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 flex flex-col items-center justify-center text-center bg-white/5 border border-white/5 rounded-2xl"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Icons.check className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No tasks found</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-sm">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                key={task.id}
              >
                <GlassCard className="hover:border-primary/50 transition-colors p-5 group flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{task.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {task.description || 'No description provided.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md">
                        <Icons.user className="w-3.5 h-3.5" /> Mentor: {task.mentor?.full_name || 'Unassigned'}
                      </div>
                      {task.due_date && (
                        <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md">
                          <Icons.clock className="w-3.5 h-3.5" /> Deadline: {new Date(task.due_date).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between shrink-0 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <Badge className={`px-3 py-1 ${getStatusColor(task.status)} uppercase tracking-wider font-bold`}>
                      {task.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full md:w-auto" 
                      onClick={() => toggleTaskStatus(task.id, task.status)}
                    >
                      {task.status === 'COMPLETED' ? 'Mark Pending' : 'Mark Complete'}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
