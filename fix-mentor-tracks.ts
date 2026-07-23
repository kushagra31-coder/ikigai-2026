import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const adminDb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } });

async function run() {
  const { data: p } = await adminDb.from('profiles').select('*').eq('role', 'MENTOR');
  const { data: t } = await adminDb.from('tracks').select('id');
  if (p && t && t.length > 0) {
    for (const u of p) {
      if (!u.assigned_track_id || !t.find(x => x.id === u.assigned_track_id)) {
        await adminDb.from('profiles').update({ assigned_track_id: t[0].id }).eq('id', u.id);
        console.log('Fixed mentor: ' + u.email);
      }
    }
  }
}
run();
