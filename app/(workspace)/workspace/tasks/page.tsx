'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { Badge } from '@/components/primitives/badge';
import { motion, AnimatePresence } from 'framer-motion';

type TaskStatus = 'Pending' | 'Completed' | 'Overdue';
type TaskPriority = 'High' | 'Medium' | 'Low';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  mentor: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Submit Initial Architecture Diagram',
    description: 'Create a high-level system architecture diagram for your project and submit it for review.',
    priority: 'High',
    status: 'Completed',
    deadline: '2026-07-01T12:00:00Z',
    mentor: 'Dr. Alan Turing',
  },
  {
    id: '2',
    title: 'Set up Database Schema',
    description: 'Initialize your Supabase database and set up the necessary tables and RLS policies.',
    priority: 'High',
    status: 'Pending',
    deadline: '2026-07-02T18:00:00Z',
    mentor: 'Grace Hopper',
  },
  {
    id: '3',
    title: 'Complete UI Mockups',
    description: 'Design the primary user interfaces in Figma and share the link.',
    priority: 'Medium',
    status: 'Overdue',
    deadline: '2026-07-01T10:00:00Z',
    mentor: 'Ada Lovelace',
  },
  {
    id: '4',
    title: 'Implement Authentication',
    description: 'Integrate authentication using the provided credentials.',
    priority: 'Low',
    status: 'Pending',
    deadline: '2026-07-03T12:00:00Z',
    mentor: 'Dr. Alan Turing',
  }
];

export default function TasksPage() {
  const [filter, setFilter] = useState<'All' | TaskStatus>('All');
  const [search, setSearch] = useState('');

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: TaskPriority) => {
    switch(priority) {
      case 'High': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Low': return 'text-success bg-success/10 border-success/20';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch(status) {
      case 'Pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'Completed': return 'text-success bg-success/10 border-success/20';
      case 'Overdue': return 'text-destructive bg-destructive/10 border-destructive/20';
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
              onClick={() => setFilter(f as typeof filter)}
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
          {filteredTasks.length === 0 ? (
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
                      <Badge className={`px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md">
                        <Icons.user className="w-3.5 h-3.5" /> Mentor: {task.mentor}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md">
                        <Icons.clock className="w-3.5 h-3.5" /> Deadline: {new Date(task.deadline).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between shrink-0 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <Badge className={`px-3 py-1 ${getStatusColor(task.status)} uppercase tracking-wider font-bold`}>
                      {task.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="w-full md:w-auto" disabled={task.status === 'Completed'}>
                      {task.status === 'Completed' ? 'Done' : 'Mark Complete'}
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
