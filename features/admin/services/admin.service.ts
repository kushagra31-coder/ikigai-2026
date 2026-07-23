import { adminRepository } from '../repository/admin.repository';
import { Result } from '../../../types/result';

function unwrap<T>(result: Result<T>): T {
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}

export class AdminService {
  static async getTeams() { return unwrap(await adminRepository.teams.getTeams()); }
  static async bulkAssignMentor(teamIds: string[], mentorId: string) { return unwrap(await adminRepository.teams.bulkAssignMentor(teamIds, mentorId)); }
  static async bulkAssignTrack(teamIds: string[], trackId: string) { return unwrap(await adminRepository.teams.bulkAssignTrack(teamIds, trackId)); }
  static async bulkLockUnlock(teamIds: string[], isLocked: boolean) { return unwrap(await adminRepository.teams.bulkLockUnlock(teamIds, isLocked)); }
  
  static async getMentors() { return unwrap(await adminRepository.mentors.getMentors()); }
  static async assignMentorTrack(mentorId: string, trackId: string) { return unwrap(await adminRepository.mentors.assignTrack(mentorId, trackId)); }
  
  static async getTracks() { return unwrap(await adminRepository.tracks.getTracks()); }
  
  static async getSessions() { return unwrap(await adminRepository.sessions.getSessions()); }
  
  static async getSettings() { return unwrap(await adminRepository.settings.getSettings()); }
  
  static async getAnnouncements() { return unwrap(await adminRepository.announcements.getAnnouncements()); }
  
  static async getLogs() { return unwrap(await adminRepository.logs.getLogs()); }
}
