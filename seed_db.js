const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const mentorEmail = 'kushgratomar@gmail.com';

const OFFICIAL_TRACKS = [
  'Artificial Intelligence & Machine Learning',
  'Computer Vision',
  'Agricultural Technology & Smart Farming',
  'Sports Analytics using AI & Machine Learning',
  'Web & Mobile Applications',
  'Emerging Technologies and Innovation'
];

async function seed() {
  // 1. Find the user ID
  const { data: existingUsers, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) { console.error('Error listing users:', listErr); return; }
  
  const existingMentor = existingUsers.users.find(u => u.email === mentorEmail);
  if (!existingMentor) {
    console.error(`Could not find user with email ${mentorEmail} in auth.users!`);
    return;
  }
  const mentorUserId = existingMentor.id;
  console.log(`Found Auth User: ${mentorUserId}`);

  // 2. Ensure Profile exists
  let { data: existingProfile } = await supabase.from('profiles').select('id').eq('id', mentorUserId).single();
  if (!existingProfile) {
    console.log('Profile missing. Manually inserting profile...');
    const { error: insertErr } = await supabase.from('profiles').insert({
      id: mentorUserId,
      email: mentorEmail,
      full_name: 'Kushagra Tomar (Mentor)',
      role: 'MENTOR'
    });
    if (insertErr) { console.error('Error inserting profile:', insertErr); return; }
    console.log('Profile created and set to MENTOR!');
  } else {
    // If it exists (e.g. from a previous successful trigger), just update role
    console.log('Profile exists. Updating role to MENTOR...');
    await supabase.from('profiles').update({ role: 'MENTOR' }).eq('id', mentorUserId);
    console.log('Role updated to MENTOR!');
  }

  // 3. Seed Data (Teams, Submissions, Evaluations)
  const { data: tracks } = await supabase.from('tracks').select('*');
  const teams = [
    { name: 'Neural Ninjas', track: tracks.find(t => t.name === OFFICIAL_TRACKS[0]).id },
    { name: 'Visionary Tech', track: tracks.find(t => t.name === OFFICIAL_TRACKS[1]).id },
    { name: 'Agro Innovators', track: tracks.find(t => t.name === OFFICIAL_TRACKS[2]).id },
    { name: 'Sports Metrics', track: tracks.find(t => t.name === OFFICIAL_TRACKS[3]).id },
    { name: 'Web Wizards', track: tracks.find(t => t.name === OFFICIAL_TRACKS[4]).id }
  ];

  for (let i = 0; i < teams.length; i++) {
    let { data: teamRes } = await supabase.from('teams').select('id').eq('name', teams[i].name).single();
    let teamId;
    if (!teamRes) {
      const { data: insertedTeam, error: insertErr } = await supabase.from('teams').insert({
        name: teams[i].name,
        repository_url: 'https://github.com',
        track_id: teams[i].track
      }).select('id').single();
      teamId = insertedTeam?.id;
    } else {
      teamId = teamRes.id;
    }

    if (!teamId) continue;

    let { data: subRes } = await supabase.from('submissions').select('id').eq('team_id', teamId).single();
    let subId;
    if (!subRes) {
      const { data: insertedSub } = await supabase.from('submissions').insert({
        team_id: teamId,
        presentation_url: 'https://github.com',
        demo_video_url: 'https://youtube.com',
        status: 'SUBMITTED'
      }).select('id').single();
      subId = insertedSub?.id;
    } else {
      subId = subRes.id;
    }

    if (!subId) continue;

    // Add some random evaluations to populate the leaderboard (status PUBLISHED)
    let { data: evals } = await supabase.from('evaluations').select('id').eq('submission_id', subId);
    if (!evals || evals.length === 0) {
      const { error: evalErr } = await supabase.from('evaluations').insert({
        submission_id: subId,
        mentor_id: mentorUserId,
        score_innovation: Math.floor(Math.random() * 3) + 7,
        score_technical: Math.floor(Math.random() * 3) + 7,
        score_impact: Math.floor(Math.random() * 3) + 7,
        score_presentation: Math.floor(Math.random() * 3) + 7,
        feedback: 'Great job!',
        status: 'PUBLISHED'
      });
      if (evalErr) console.error('Error inserting eval:', evalErr);
    }
    console.log(`Ensured team ${teams[i].name} has a submission and evaluation.`);
  }

  console.log('Finished seeding! You can now log in and test the live leaderboard!');
}

seed().catch(console.error);
