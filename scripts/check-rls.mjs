import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const t = await supabase.from('teams').select('id, name, tracks(id, name)');
  console.log('Teams:', t.data?.length, 'Error:', t.error);
  
  const s = await supabase.from('submissions').select('id, team_id, presentation_url');
  console.log('Submissions:', s.data?.length, 'Error:', s.error);
  
  const e = await supabase.from('evaluations').select('submission_id, total_score, feedback, updated_at');
  console.log('Evaluations:', e.data?.length, 'Error:', e.error);
}

check();
