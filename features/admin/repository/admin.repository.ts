import { SupabaseTeamsRepository } from './teams.repository';
import { SupabaseMentorsRepository } from './mentors.repository';
import { SupabaseTracksRepository } from './tracks.repository';
import { SupabaseSessionsRepository } from './sessions.repository';
import { SupabaseSettingsRepository } from './settings.repository';
import { SupabaseAnnouncementsRepository } from './announcements.repository';
import { SupabaseLogsRepository } from './logs.repository';
import { createClient } from '../../../lib/supabase/client';

export class AdminRepository {
  public teams: SupabaseTeamsRepository;
  public mentors: SupabaseMentorsRepository;
  public tracks: SupabaseTracksRepository;
  public sessions: SupabaseSessionsRepository;
  public settings: SupabaseSettingsRepository;
  public announcements: SupabaseAnnouncementsRepository;
  public logs: SupabaseLogsRepository;

  constructor() {
    const supabase = createClient();
    this.teams = new SupabaseTeamsRepository(supabase);
    this.mentors = new SupabaseMentorsRepository(supabase);
    this.tracks = new SupabaseTracksRepository(supabase);
    this.sessions = new SupabaseSessionsRepository(supabase);
    this.settings = new SupabaseSettingsRepository(supabase);
    this.announcements = new SupabaseAnnouncementsRepository(supabase);
    this.logs = new SupabaseLogsRepository(supabase);
  }
}

export const adminRepository = new AdminRepository();
