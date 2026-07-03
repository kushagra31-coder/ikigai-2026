import { Result } from '../../../types/result';
import { AdminTeam, AdminMentor, Track, AdminSession, AuditLog, Announcement } from '../../../features/admin/types';
import { DigitalPass, ScanLog, OfflineQueueItem } from '../../../features/event-operations/types';

// We map AdminSettings locally or import it if we add it
export interface AdminSettings {
  eventStatus: string; // or EventState
  general: { eventName: string; supportEmail: string };
  registration: { isOpen: boolean; maxTeams: number };
  submissions: { isOpen: boolean };
  evaluation: { isScoringOpen: boolean; requireAllMentors: boolean };
  leaderboard: { isVisible: boolean; isFrozen: boolean };
  notifications: { emailEnabled: boolean; smsEnabled: boolean };
  maintenance: { isEnabled: boolean; message: string };
  security: { require2FA: boolean; sessionTimeout: number };
}

export interface ITeamRepository {
  getTeams(): Promise<Result<AdminTeam[]>>;
  bulkAssignMentor(teamIds: string[], mentorId: string): Promise<Result<void>>;
  bulkAssignTrack(teamIds: string[], trackId: string): Promise<Result<void>>;
  bulkLockUnlock(teamIds: string[], isLocked: boolean): Promise<Result<void>>;
}

export interface IMentorRepository {
  getMentors(): Promise<Result<AdminMentor[]>>;
}

export interface ITrackRepository {
  getTracks(): Promise<Result<Track[]>>;
}

export interface ISessionRepository {
  getSessions(): Promise<Result<AdminSession[]>>;
}

export interface ILogRepository {
  getLogs(): Promise<Result<AuditLog[]>>;
  addLog(entry: Omit<AuditLog, 'id'>): Promise<Result<void>>;
}

export interface IAnnouncementRepository {
  getAnnouncements(): Promise<Result<Announcement[]>>;
}

export interface ISettingsRepository {
  getSettings(): Promise<Result<AdminSettings>>;
}

export interface IPassRepository {
  getPassById(passId: string): Promise<Result<DigitalPass>>;
  getPassByTeam(teamId: string): Promise<Result<DigitalPass>>;
  updatePassStatus(passId: string, status: string): Promise<Result<void>>;
}

export interface IScanRepository {
  recordScan(log: ScanLog): Promise<Result<ScanLog>>;
  hasScanned(passId: string, checkpoint: string): Promise<Result<boolean>>;
}

export interface IOfflineQueueRepository {
  enqueue(payload: Omit<OfflineQueueItem, 'id' | 'createdAt'>): Promise<Result<void>>;
  getQueue(): Promise<Result<OfflineQueueItem[]>>;
  dequeue(id: string): Promise<Result<void>>;
}
