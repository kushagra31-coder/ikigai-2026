import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const adminDb = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const CANONICAL_TRACKS = [
  'SportsTech, Gaming and Robotics',
  'AgriTech and Food Security',
  'Cybersecurity, Digital Trust and Smart Surveillance',
  'AI Frontiers and Smart Systems',
  'ClimateTech, Energy and Disaster Resilience'
];

async function fixTracks() {
  console.log('Fetching existing tracks...');
  const { data: tracks, error } = await adminDb.from('tracks').select('*');
  
  if (error) {
    console.error('Error fetching tracks:', error);
    return;
  }

  console.log(`Found ${tracks.length} tracks in database.`);
  
  for (const track of tracks) {
    if (!CANONICAL_TRACKS.includes(track.name)) {
      console.log(`Deleting invalid track: ${track.name} (${track.id})`);
      const { error: deleteError } = await adminDb.from('tracks').delete().eq('id', track.id);
      if (deleteError) {
        console.error(`Failed to delete ${track.name}:`, deleteError);
      } else {
        console.log(`✅ Deleted ${track.name}`);
      }
    } else {
      console.log(`Keeping canonical track: ${track.name}`);
    }
  }
}

fixTracks().catch(console.error);
