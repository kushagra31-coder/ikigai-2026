-- Fix RLS warning: Enable RLS on public.passes table
ALTER TABLE public.passes ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to see their own pass
CREATE POLICY "Users can view own pass"
  ON public.passes FOR SELECT
  USING (auth.uid() = profile_id);

-- Allow admins and volunteers to see all passes
CREATE POLICY "Admins can manage all passes"
  ON public.passes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('ADMIN')
    )
  );
