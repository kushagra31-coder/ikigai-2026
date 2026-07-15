-- Add assigned_track_id to profiles to link Mentors to specific tracks
ALTER TABLE profiles
ADD COLUMN assigned_track_id UUID REFERENCES tracks(id) ON DELETE SET NULL;

-- Allow public to read this new column (already covered by existing profiles policy)
-- But we should also make sure Admins can update this column.
-- The existing policy "Users can update own profile" might not cover Admins updating other profiles.
-- Let's add an explicit policy for Admins to manage profiles, specifically for assigning tracks.

CREATE POLICY "Admins can update profiles"
ON public.profiles FOR UPDATE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN' OR
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'SUPER_ADMIN'
);
