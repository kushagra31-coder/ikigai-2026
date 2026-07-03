-- 0002_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE judging_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. TRACKS (Read-only for all)
CREATE POLICY "Tracks are viewable by everyone" 
ON tracks FOR SELECT USING (true);

-- 3. TEAMS
CREATE POLICY "Teams are viewable by everyone" 
ON teams FOR SELECT USING (true);

CREATE POLICY "Team members can update their team" 
ON teams FOR UPDATE USING (
    EXISTS (SELECT 1 FROM team_members WHERE team_id = teams.id AND profile_id = auth.uid())
);

-- 4. TEAM MEMBERS
CREATE POLICY "Team members viewable by everyone" 
ON team_members FOR SELECT USING (true);

-- 5. SUBMISSIONS
CREATE POLICY "Submissions viewable by team and mentors" 
ON submissions FOR SELECT USING (
    EXISTS (SELECT 1 FROM team_members WHERE team_id = submissions.team_id AND profile_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MENTOR'))
);

CREATE POLICY "Team can insert submission" 
ON submissions FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM team_members WHERE team_id = submissions.team_id AND profile_id = auth.uid())
);

-- 6. ANNOUNCEMENTS
CREATE POLICY "Published announcements viewable by everyone" 
ON announcements FOR SELECT USING (is_published = true);

-- 7. NOTIFICATIONS
CREATE POLICY "Users view own notifications" 
ON notifications FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Users update own notifications" 
ON notifications FOR UPDATE USING (profile_id = auth.uid());
