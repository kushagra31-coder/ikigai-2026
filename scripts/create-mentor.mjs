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

async function createMentor(email, password, fullName) {
  // 1. Create the user in Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  });

  if (authError) {
    console.error('Error creating auth user:', authError);
    return;
  }

  console.log('User created in Auth:', authData.user.id);

  // 2. Wait a moment for trigger to create the profile row
  await new Promise(r => setTimeout(r, 1000));

  // 3. Update the profile role to MENTOR
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'MENTOR', full_name: fullName })
    .eq('id', authData.user.id)
    .select();

  if (profileError) {
    console.error('Error updating profile role:', profileError);
  } else {
    console.log('Successfully set user as MENTOR:', profileData);
  }
}

createMentor('bhagyesh@ikigai2026.com', '123456789', 'bhagyesh');
