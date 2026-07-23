import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setAdminRole(email) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'ADMIN' })
    .eq('email', email)
    .select();

  if (error) {
    console.error('Error updating role:', error);
  } else {
    console.log('Successfully updated role for:', email, data);
  }
}

setAdminRole('jainlalit946@gmail.com');
