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
  { id: '00000001-0000-0000-0000-000000000001', name: 'SportsTech, Gaming and Robotics', description: 'Innovate at the intersection of physical sports, gaming environments, and robotics.', icon: 'activity', status: 'ACTIVE', visibility: 'PUBLIC' },
  { id: '00000001-0000-0000-0000-000000000002', name: 'AgriTech and Food Security', description: 'Build CPS-powered smart agriculture solutions to tackle food security challenges.', icon: 'leaf', status: 'ACTIVE', visibility: 'PUBLIC' },
  { id: '00000001-0000-0000-0000-000000000003', name: 'Cybersecurity, Digital Trust and Smart Surveillance', description: 'Enhance privacy and digital trust through intelligent surveillance and security.', icon: 'shield', status: 'ACTIVE', visibility: 'PUBLIC' },
  { id: '00000001-0000-0000-0000-000000000004', name: 'AI Frontiers and Smart Systems', description: 'Push the boundaries of Industry 5.0, healthcare, and intelligent automation.', icon: 'cpu', status: 'ACTIVE', visibility: 'PUBLIC' },
  { id: '00000001-0000-0000-0000-000000000005', name: 'ClimateTech, Energy and Disaster Resilience', description: 'Create sustainable energy solutions and resilient disaster management systems.', icon: 'sun', status: 'ACTIVE', visibility: 'PUBLIC' }
];

async function insertTracks() {
  const { error } = await adminDb.from('tracks').insert(CANONICAL_TRACKS);
  if (error) {
    console.error('Error inserting tracks:', error);
  } else {
    console.log('Successfully inserted the 5 canonical tracks.');
  }
}
insertTracks();
