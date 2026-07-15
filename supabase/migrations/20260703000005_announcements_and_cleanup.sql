-- 1. Cleanup old data
DELETE FROM evaluations;
DELETE FROM submissions;
DELETE FROM team_members;
DELETE FROM teams;
UPDATE profiles SET assigned_track_id = NULL;
DELETE FROM tracks;

-- 2. Insert Tracks
INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), 'Artificial Intelligence & Machine Learning');
INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), 'Computer Vision');
INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), 'Agricultural Technology & Smart Farming');
INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), 'Sports Analytics using AI & Machine Learning');
INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), 'Web & Mobile Applications');

-- 3. Insert Teams and randomly assign tracks
DO $$
DECLARE
  track0 UUID;
  track1 UUID;
  track2 UUID;
  track3 UUID;
  track4 UUID;
BEGIN
  SELECT id INTO track0 FROM tracks WHERE name = 'Artificial Intelligence & Machine Learning';
  SELECT id INTO track1 FROM tracks WHERE name = 'Computer Vision';
  SELECT id INTO track2 FROM tracks WHERE name = 'Agricultural Technology & Smart Farming';
  SELECT id INTO track3 FROM tracks WHERE name = 'Sports Analytics using AI & Machine Learning';
  SELECT id INTO track4 FROM tracks WHERE name = 'Web & Mobile Applications';
END $$;

-- 4. Add Priority to announcements
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'LOW';
