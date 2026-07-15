import { adminRepository } from '../repository/admin.repository';
import { Result } from '../../../types/result';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function unwrap<T>(result: Result<T>): T {
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}

export class AdminService {
  static async getTeams() { await delay(200); return unwrap(await adminRepository.teams.getTeams()); }
  static async bulkAssignMentor(teamIds: string[], mentorId: string) { await delay(200); return unwrap(await adminRepository.teams.bulkAssignMentor(teamIds, mentorId)); }
  static async bulkAssignTrack(teamIds: string[], trackId: string) { await delay(200); return unwrap(await adminRepository.teams.bulkAssignTrack(teamIds, trackId)); }
  static async bulkLockUnlock(teamIds: string[], isLocked: boolean) { await delay(200); return unwrap(await adminRepository.teams.bulkLockUnlock(teamIds, isLocked)); }
  
  static async getMentors() { await delay(200); return unwrap(await adminRepository.mentors.getMentors()); }
  static async assignMentorTrack(mentorId: string, trackId: string) { await delay(200); return unwrap(await adminRepository.mentors.assignTrack(mentorId, trackId)); }
  
  static async getTracks() { await delay(200); return unwrap(await adminRepository.tracks.getTracks()); }
  
  static async getSessions() { await delay(200); return unwrap(await adminRepository.sessions.getSessions()); }
  
  static async getSettings() { await delay(200); return unwrap(await adminRepository.settings.getSettings()); }
  
  static async getAnnouncements() { await delay(200); return unwrap(await adminRepository.announcements.getAnnouncements()); }
  
  static async getLogs() { await delay(200); return unwrap(await adminRepository.logs.getLogs()); }
}
