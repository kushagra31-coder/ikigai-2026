import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log('Seeding demo data...');

  // 1. Get or create a track
  let { data: tracks } = await supabase.from('tracks').select('*').limit(1);
  let trackId = tracks?.[0]?.id;
  
  if (!trackId) {
    console.log('No track found. Creating demo track...');
    const { data, error } = await supabase.from('tracks').insert({
      name: 'Demo Web Track',
      description: 'Track for demo purposes'
    }).select().single();
    if (error) throw error;
    trackId = data.id;
  }
  
  console.log(`Using track ID: ${trackId}`);

  // 2. Assign mentor (kushgratomar@gmail.com) to this track
  const { data: mentor } = await supabase.from('profiles').select('*').eq('email', 'kushgratomar@gmail.com').single();
  if (mentor) {
    console.log(`Assigning track to mentor ${mentor.email}...`);
    await supabase.from('profiles').update({ assigned_track_id: trackId }).eq('id', mentor.id);
  } else {
    console.log('Mentor kushgratomar@gmail.com not found in profiles.');
  }

  // 3. Get or create a team and assign to track
  let { data: teams } = await supabase.from('teams').select('*').limit(1);
  let teamId = teams?.[0]?.id;

  if (teamId) {
    console.log(`Assigning team ${teams[0].name} to track...`);
    await supabase.from('teams').update({ track_id: trackId }).eq('id', teamId);
  } else {
    console.log('No teams found. Creating a demo team...');
    const { data, error } = await supabase.from('teams').insert({
      name: 'Demo Hackers',
      track_id: trackId,
      join_code: 'DEMO123'
    }).select().single();
    if (error) throw error;
    teamId = data.id;
  }

  // 4. Create a submission for this team if it doesn't exist
  const { data: existingSubmission } = await supabase.from('submissions').select('*').eq('team_id', teamId).single();
  if (!existingSubmission) {
    console.log(`Creating submission for team...`);
    await supabase.from('submissions').insert({
      team_id: teamId,
      title: 'Demo Awesome Project',
      description: 'This is a demo project submitted by the demo team.',
      repository_url: 'https://github.com/demo/project'
    });
  } else {
    console.log('Team already has a submission.');
  }

  console.log('Demo data seeded successfully!');
}

seed().catch(console.error);
