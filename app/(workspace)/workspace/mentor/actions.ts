'use server';

import { createClient } from '@supabase/supabase-js';

/**
 * Creates a placeholder submission for a team so they can be evaluated live.
 * This bypasses RLS using the service role key, so mentors don't need direct INSERT permissions.
 */
export async function createPlaceholderSubmission(teamId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const adminDb = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await adminDb
    .from('submissions')
    .insert({
      team_id: teamId,
      status: 'EVALUATED_WITHOUT_SUBMISSION'
    })
    .select('id')
    .single();

  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true, submissionId: data.id };
}
