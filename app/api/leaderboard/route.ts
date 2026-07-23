import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    // Use service role key to bypass RLS for public leaderboard reading
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const [teamsRes, submissionsRes, evalsRes] = await Promise.all([
      supabase.from('teams').select('id, name, repository_url, tracks(id, name)'),
      supabase.from('submissions').select('id, team_id, presentation_url'),
      supabase.from('evaluations').select('submission_id, total_score, feedback, updated_at')
    ]);

    return NextResponse.json({
      teams: teamsRes.data || [],
      submissions: submissionsRes.data || [],
      evaluations: evalsRes.data || []
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
