import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  const { data: teams } = await supabase.from('teams').select('id, name');
  console.log(`Found ${teams.length} teams.`);

  for (const team of teams) {
    const { data: existingSub } = await supabase.from('submissions').select('id').eq('team_id', team.id).single();
    if (!existingSub) {
      console.log(`Creating submission for ${team.name}`);
      await supabase.from('submissions').insert({
        team_id: team.id,
        status: 'SUBMITTED',
        presentation_url: `https://docs.google.com/presentation/d/fake-id-${team.id}`,
        demo_video_url: null
      });
    }
  }
  console.log('Done.');
}
main().catch(console.error);
