import { mentorRepository } from '../repository/mentor.repository';
import { MentorTask } from '../types';
import { Result } from '../../../types/result';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw result.error;
  return result.data;
}

export class MentorService {
  static async getDashboardStats() {
    await delay(300); // Simulate network latency
    return unwrap(await mentorRepository.getDashboardStats());
  }

  static async getAssignedTeams() {
    await delay(400);
    return unwrap(await mentorRepository.getAssignedTeams());
  }

  static async getTeamDetails(teamId: string) {
    await delay(300);
    const result = await mentorRepository.getTeamDetails(teamId);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  static async getTasks() {
    await delay(300);
    return unwrap(await mentorRepository.getTasks());
  }

  static async createTask(task: Omit<MentorTask, 'id' | 'createdAt'>) {
    await delay(500);
    return unwrap(await mentorRepository.createTask(task));
  }

  static async updateTaskStatus(taskId: string, status: MentorTask['status']) {
    await delay(300);
    return unwrap(await mentorRepository.updateTaskStatus(taskId, status));
  }

  static async getEvaluationHistory() {
    await delay(400);
    return unwrap(await mentorRepository.getEvaluationHistory());
  }
}
