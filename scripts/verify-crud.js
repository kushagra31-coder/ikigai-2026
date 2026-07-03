/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testCRUD() {
  console.log('Testing Supabase Connection to:', supabaseUrl);

  // 1. Read Test (Announcements)
  const { data: announcements, error: readError } = await supabase.from('announcements').select('*').limit(1);
  if (readError) {
    console.error('❌ Read Test Failed (Announcements):', readError.message);
  } else {
    console.log(`✅ Read Test Passed (Announcements: Found ${announcements.length})`);
  }

  // 2. Read Test (Tracks)
  const { data: tracks, error: tracksError } = await supabase.from('tracks').select('*').limit(1);
  if (tracksError) {
    console.error('❌ Read Test Failed (Tracks):', tracksError.message);
  } else {
    console.log(`✅ Read Test Passed (Tracks: Found ${tracks.length})`);
  }

  // 3. Read Test (Profiles - which Mentors uses)
  const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*').eq('role', 'MENTOR').limit(1);
  if (profilesError) {
    console.error('❌ Read Test Failed (Profiles):', profilesError.message);
  } else {
    console.log(`✅ Read Test Passed (Profiles: Found ${profiles.length})`);
  }
}

testCRUD();
