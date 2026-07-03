-- 0003_functions.sql

-- 1. Auto-create Profile Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url',
    'TEAM'::user_role
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Leaderboard View
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT 
    t.id AS team_id,
    t.name AS team_name,
    tr.id AS track_id,
    tr.name AS track_name,
    COALESCE(AVG(e.total_score), 0) AS average_score,
    COUNT(e.id) AS evaluation_count
FROM teams t
LEFT JOIN tracks tr ON t.track_id = tr.id
LEFT JOIN submissions s ON t.id = s.team_id
LEFT JOIN evaluations e ON s.id = e.submission_id AND e.status = 'PUBLISHED'
GROUP BY t.id, t.name, tr.id, tr.name;
