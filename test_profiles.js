const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('profiles').insert({
    id: '00000000-0000-0000-0000-000000000000',
    email: 'test_insert@example.com',
    full_name: 'Test',
    role: 'TEAM'
  }).select();
  console.log('Profiles Insert:', error || data);
}
run();
