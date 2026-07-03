-- 0004_storage.sql

-- Setup storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('submissions', 'submissions', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up basic access policies for buckets
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id IN ('submissions', 'assets') );

CREATE POLICY "Authenticated Users can Upload"
ON storage.objects FOR INSERT
WITH CHECK ( auth.role() = 'authenticated' AND bucket_id IN ('submissions', 'assets') );
