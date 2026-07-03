import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MentorService } from '../services/mentor.service';
import { MentorTask } from '../types';

export function useMentorTasks() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['mentorTasks'],
    queryFn: () => MentorService.getTasks(),
  });

  const createTask = useMutation({
    mutationFn: (task: Omit<MentorTask, 'id' | 'createdAt'>) => MentorService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorTasks'] });
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: MentorTask['status'] }) => 
      MentorService.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorTasks'] });
    },
  });

  return {
    ...query,
    createTask,
    updateTaskStatus,
  };
}
