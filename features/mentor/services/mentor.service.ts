import { mentorRepository } from '../repository/mentor.repository';
import { Result } from '../../../types/result';

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw result.error;
  return result.data;
}

export class MentorService {
  static async getProfile() {
    return unwrap(await mentorRepository.getProfile());
  }

  static async getDashboardStats() {
    return unwrap(await mentorRepository.getDashboardStats());
  }

  static async getAssignedTeams() {
    return unwrap(await mentorRepository.getAssignedTeams());
  }

  static async getEvaluationHistory() {
    return unwrap(await mentorRepository.getEvaluationHistory());
  }
}
