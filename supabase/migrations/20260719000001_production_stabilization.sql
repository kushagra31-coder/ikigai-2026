-- ============================================================================
-- 20260719000001_production_stabilization.sql
-- IKIGAI 2026 Production Stabilization
-- ============================================================================
-- Resolves:
--   1. Config/DB track mismatch (canonical track names from event config)
--   2. Submissions RLS — mentors saw ALL teams, not just their assigned track
--   3. Evaluations INSERT RLS — mentors could score teams outside their track
--   4. Announcements missing from realtime publication
--   5. Profile auto-creation trigger for first Google login
-- ============================================================================

-- ─── 1. CANONICAL TRACKS ──────────────────────────────────────────────────────
-- Clear existing tracks and reseed with names that exactly match tracks.config.ts
-- The config defines these 5 tracks as the canonical source of truth.
-- Existing team track_id assignments are cleared and must be re-assigned by admin.

-- Temporarily drop FK constraints that reference tracks
ALTER TABLE teams DROP CONSTRAINT IF EXISTS teams_track_id_fkey;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_assigned_track_id_fkey;

-- Clear stale track data and reset assignments
UPDATE teams SET track_id = NULL;
UPDATE profiles SET assigned_track_id = NULL WHERE role IN ('MENTOR');
DELETE FROM tracks;

-- Reseed with canonical track names matching tracks.config.ts exactly
-- Using fixed UUIDs so application code can reference them reliably
INSERT INTO tracks (id, name, description, icon, status, visibility) VALUES
  ('00000001-0000-0000-0000-000000000001', 'SportsTech, Gaming and Robotics',                   'Innovate at the intersection of physical sports, gaming environments, and robotics.',             'activity', 'ACTIVE', 'PUBLIC'),
  ('00000001-0000-0000-0000-000000000002', 'AgriTech and Food Security',                         'Build CPS-powered smart agriculture solutions to tackle food security challenges.',                 'leaf',     'ACTIVE', 'PUBLIC'),
  ('00000001-0000-0000-0000-000000000003', 'Cybersecurity, Digital Trust and Smart Surveillance', 'Enhance privacy and digital trust through intelligent surveillance and security.',                  'shield',   'ACTIVE', 'PUBLIC'),
  ('00000001-0000-0000-0000-000000000004', 'AI Frontiers and Smart Systems',                      'Push the boundaries of Industry 5.0, healthcare, and intelligent automation.',                     'cpu',      'ACTIVE', 'PUBLIC'),
  ('00000001-0000-0000-0000-000000000005', 'ClimateTech, Energy and Disaster Resilience',         'Create sustainable energy solutions and resilient disaster management systems.',                    'sun',      'ACTIVE', 'PUBLIC')
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  icon        = EXCLUDED.icon,
  status      = EXCLUDED.status,
  visibility  = EXCLUDED.visibility;

-- Restore FK constraints
ALTER TABLE teams ADD CONSTRAINT teams_track_id_fkey
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE SET NULL;

ALTER TABLE profiles ADD CONSTRAINT profiles_assigned_track_id_fkey
  FOREIGN KEY (assigned_track_id) REFERENCES tracks(id) ON DELETE SET NULL;


-- ─── 2. FIX SUBMISSIONS RLS FOR MENTOR TRACK SCOPING ─────────────────────────
-- Old policy: any MENTOR role can read any submission (no track check)
-- New policy: mentors can only read submissions of teams in their assigned track

DROP POLICY IF EXISTS "Submissions viewable by team and mentors" ON submissions;

CREATE POLICY "Submissions viewable by own team, assigned mentor, or admin"
ON submissions FOR SELECT
USING (
  -- Team members can see their own submission
  EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = submissions.team_id AND profile_id = auth.uid()
  )
  OR
  -- Admin can see all
  public.is_admin()
  OR
  -- Mentor can only see submissions of teams in their assigned track
  EXISTS (
    SELECT 1 FROM teams t
    JOIN profiles p ON p.assigned_track_id = t.track_id
    WHERE t.id = submissions.team_id
      AND p.id = auth.uid()
      AND p.role = 'MENTOR'
  )
);


-- ─── 3. FIX EVALUATIONS RLS FOR MENTOR TRACK SCOPING ─────────────────────────
-- Old policy: mentors could insert an evaluation for ANY submission
-- New policy: mentors can only insert for submissions of teams in their track

DROP POLICY IF EXISTS "Mentors insert assigned evaluations" ON evaluations;

CREATE POLICY "Mentors insert evaluations for assigned track only"
ON evaluations FOR INSERT
WITH CHECK (
  mentor_id = auth.uid()
  AND (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM submissions s
      JOIN teams t ON t.id = s.team_id
      JOIN profiles p ON p.assigned_track_id = t.track_id
      WHERE s.id = evaluations.submission_id
        AND p.id = auth.uid()
        AND p.role = 'MENTOR'
    )
  )
);


-- ─── 4. ADD ANNOUNCEMENTS TO REALTIME PUBLICATION ────────────────────────────
-- Announcements were missing from supabase_realtime — public pages and
-- mentor dashboards couldn't receive live updates without page refresh.

ALTER PUBLICATION supabase_realtime ADD TABLE announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE evaluations;
ALTER PUBLICATION supabase_realtime ADD TABLE teams;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE settings;


-- ─── 5. PROFILE AUTO-CREATION TRIGGER ────────────────────────────────────────
-- When a new user logs in via Google OAuth for the first time,
-- Supabase creates a row in auth.users but NOT in public.profiles.
-- This trigger creates a minimal profile row with role='VISITOR'.
-- An admin then upgrades the role to MENTOR or ADMIN via the Manage Mentors page.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'VISITOR'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop if exists to allow re-running this migration safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ─── 6. ADMIN ANNOUNCEMENTS INSERT POLICY ────────────────────────────────────
-- Ensure only admins can create announcements (was missing explicit INSERT policy)

DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;

CREATE POLICY "Admins can manage announcements"
ON announcements FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Public can still read published announcements (from existing policy):
-- "Published announcements viewable by everyone" ON announcements FOR SELECT USING (is_published = true)


-- ─── 7. REMOVE VISITOR ROLE FROM WORKSPACE ACCESS ────────────────────────────
-- The WorkspaceLayout guard already handles this at the application layer,
-- but this documents the intent: only MENTOR and ADMIN can access the workspace.
-- VISITOR role is the holding state until an admin upgrades the profile.

COMMENT ON COLUMN public.profiles.role IS
  'VISITOR = pending admin approval, MENTOR = judge access, ADMIN = full access. TEAM/USER roles are legacy and unused in the operations platform.';
