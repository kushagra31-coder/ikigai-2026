'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';
import { TaskPriority } from '../types';
import { useMentorTasks } from '../hooks/useMentorTasks';

interface TaskEditorProps {
  teamId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export function TaskEditor({ teamId, onCancel, onSuccess }: TaskEditorProps) {
  const { createTask } = useMentorTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !deadline) return;

    createTask.mutate({
      teamId,
      teamName: 'Current Team', // In a real app we'd fetch or pass the actual name
      title,
      description,
      priority,
      status: 'PENDING',
      deadline: new Date(deadline).toISOString(),
      sessionId: 'session-1',
    }, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  return (
    <GlassCard className="p-6 border-primary/20">
      <h3 className="font-semibold text-lg mb-4">Assign New Task</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Task Title</label>
          <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
            placeholder="e.g. Optimize Database Queries"
            required
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none resize-y min-h-24"
            placeholder="Provide actionable steps..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Priority</label>
            <select 
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Deadline</label>
            <input 
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={createTask.isPending}>
            {createTask.isPending ? 'Assigning...' : 'Assign Task'}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
