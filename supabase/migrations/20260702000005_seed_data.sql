-- 0005_seed_data.sql

-- 1. Seed Tracks
INSERT INTO tracks (name, description) VALUES
('AI & Machine Learning', 'Build intelligent systems'),
('Cybersecurity', 'Secure the digital frontier'),
('Healthcare & MedTech', 'Innovate for better health'),
('Agriculture & Rural Innovation', 'Tech for the grassroots'),
('Smart Cities & IoT', 'Connect the urban landscape')
ON CONFLICT (name) DO NOTHING;

-- 2. Seed Settings
INSERT INTO settings (id, value) VALUES
('registration_open', 'true'::jsonb),
('submission_open', 'false'::jsonb),
('current_state', '"PRE_EVENT"'::jsonb)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- 3. Configure Realtime Publications
ALTER PUBLICATION supabase_realtime ADD TABLE evaluations;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE settings;
