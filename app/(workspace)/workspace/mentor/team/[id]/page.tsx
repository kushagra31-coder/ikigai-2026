'use client';

import { use, useState } from 'react';
import { useTeamDetails } from '@/features/mentor/hooks/useAssignedTeams';
import { useMentorTasks } from '@/features/mentor/hooks/useMentorTasks';
import { TeamDetails } from '@/features/mentor/components/TeamDetails';
import { EvaluationLauncher } from '@/features/mentor/components/EvaluationLauncher';
import { TaskEditor } from '@/features/mentor/components/TaskEditor';
import { TaskCard } from '@/features/mentor/components/TaskCard';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import Link from 'next/link';

export default function TeamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: team, isLoading } = useTeamDetails(resolvedParams.id);
  const { data: allTasks, isLoading: tasksLoading } = useMentorTasks();
  
  const [showTaskEditor, setShowTaskEditor] = useState(false);

  if (isLoading || tasksLoading) return <div className="w-full h-96 rounded-xl bg-white/5 animate-pulse" />;
  if (!team) return <div className="text-center py-12">Team not found</div>;

  const teamTasks = allTasks?.filter(t => t.teamId === team.id) || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <Link href="/workspace/mentor/teams" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
        <Icons.arrowLeft className="w-4 h-4" /> Back to Teams
      </Link>
      
      <TeamDetails team={team} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <EvaluationLauncher 
          teamId={team.id} 
          teamName={team.name} 
          evaluationStatus={team.evaluationStatus} 
        />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Icons.check className="w-5 h-5 text-success" /> Assigned Tasks
            </h3>
            {!showTaskEditor && (
              <Button variant="outline" size="sm" onClick={() => setShowTaskEditor(true)}>
                <span className="font-bold mr-1">+</span> New Task
              </Button>
            )}
          </div>
          
          {showTaskEditor && (
            <TaskEditor 
              teamId={team.id}
              onCancel={() => setShowTaskEditor(false)}
              onSuccess={() => setShowTaskEditor(false)}
            />
          )}

          {!showTaskEditor && teamTasks.length === 0 && (
            <div className="text-sm text-muted-foreground italic text-center p-6 bg-white/5 rounded-xl border border-white/5">
              No tasks assigned yet.
            </div>
          )}

          {!showTaskEditor && teamTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
