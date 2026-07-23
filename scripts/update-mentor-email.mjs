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

async function updateMentorEmail() {
  const uid = 'dca76eed-5d61-448d-97cb-cea0888e26a2'; // Bhagyesh's UID from earlier
  const newEmail = 'acroproject2k26@gmail.com';

  const { data, error } = await supabase.auth.admin.updateUserById(
    uid,
    { email: newEmail, email_confirm: true }
  );

  if (error) {
    console.error('Error updating auth email:', error);
    return;
  }
  
  console.log('Successfully updated auth email to:', data.user.email);
  
  // Update the email in profiles table too
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .update({ email: newEmail })
    .eq('id', uid)
    .select();

  if (profileError) {
    console.error('Error updating profile email:', profileError);
  } else {
    console.log('Successfully updated profile email:', profileData);
  }
}

updateMentorEmail();
