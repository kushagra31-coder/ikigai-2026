-- 20260703000001_storage_setup.sql

-- 0. Update user_role ENUM
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'VOLUNTEER';

-- 1. Create file_metadata table
CREATE TABLE IF NOT EXISTS public.file_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bucket TEXT NOT NULL,
    path TEXT NOT NULL,
    original_name TEXT NOT NULL,
    stored_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    extension TEXT NOT NULL,
    size BIGINT NOT NULL,
    checksum TEXT NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES auth.users(id),
    team_id UUID REFERENCES public.teams(id),
    submission_id UUID,
    visibility TEXT NOT NULL DEFAULT 'PRIVATE',
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on file_metadata
ALTER TABLE public.file_metadata ENABLE ROW LEVEL SECURITY;

-- file_metadata Policies
CREATE POLICY "Admins have full access to file_metadata"
ON public.file_metadata FOR ALL
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('ADMIN', 'SUPER_ADMIN')));

CREATE POLICY "Teams can read their own files"
ON public.file_metadata FOR SELECT
USING (team_id IN (SELECT team_id FROM public.team_members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can read files they uploaded"
ON public.file_metadata FOR SELECT
USING (uploaded_by = auth.uid());

CREATE POLICY "Mentors can read submission files"
ON public.file_metadata FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'MENTOR'));

CREATE POLICY "Volunteers can read passes"
ON public.file_metadata FOR SELECT
USING (bucket = 'passes' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text = 'VOLUNTEER'));

CREATE POLICY "Users can insert their own file_metadata"
ON public.file_metadata FOR INSERT
WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their own file_metadata"
ON public.file_metadata FOR UPDATE
USING (uploaded_by = auth.uid() OR team_id IN (SELECT team_id FROM public.team_members WHERE profile_id = auth.uid()));


-- 2. Setup storage buckets
-- Make existing submissions bucket private
UPDATE storage.buckets SET public = false WHERE id = 'submissions';

-- Ensure all buckets exist
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('submissions', 'submissions', false),
('presentations', 'presentations', false),
('videos', 'videos', false),
('documents', 'documents', false),
('sponsors', 'sponsors', true),
('logos', 'logos', true),
('passes', 'passes', false),
('exports', 'exports', false),
('assets', 'assets', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- 3. Storage Policies
-- Drop old policies from 0004_storage.sql
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users can Upload" ON storage.objects;

-- Admin Full Access to Objects
CREATE POLICY "Admins have full access to storage objects"
ON storage.objects FOR ALL
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('ADMIN', 'SUPER_ADMIN')));

-- Public Buckets Read Access
CREATE POLICY "Public Read Access for public buckets"
ON storage.objects FOR SELECT
USING (bucket_id IN ('avatars', 'sponsors', 'logos', 'assets'));

-- Upload Access (Authenticated Users can upload to specific paths)
CREATE POLICY "Authenticated Users can upload"
ON storage.objects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Object specific select access based on metadata
CREATE POLICY "Users can read objects they uploaded"
ON storage.objects FOR SELECT
USING (owner = auth.uid());

-- Delete/Update access
CREATE POLICY "Users can update objects they uploaded"
ON storage.objects FOR UPDATE
USING (owner = auth.uid());

CREATE POLICY "Users can delete objects they uploaded"
ON storage.objects FOR DELETE
USING (owner = auth.uid());
