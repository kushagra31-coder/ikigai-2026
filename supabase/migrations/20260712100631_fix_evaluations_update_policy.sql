-- Remove the overly strict draft policy
DROP POLICY IF EXISTS "Mentors update own draft evaluations" ON public.evaluations;
DROP POLICY IF EXISTS "Mentors update own evaluations" ON public.evaluations;

-- Replace it with a simpler policy that allows updating any of your own evaluations
CREATE POLICY "Mentors update own evaluations" ON public.evaluations
FOR UPDATE USING (mentor_id = auth.uid() OR public.is_admin());
