-- Allow admins to update teams
CREATE POLICY "Admins can update teams" 
ON teams FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
);
