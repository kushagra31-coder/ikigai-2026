import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(req: Request) {
  try {
    // 1. Authenticate the admin user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing authorization' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if the user is an admin
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    // 2. Parse the CSV rows
    const { teams } = await req.json();
    
    if (!teams || !Array.isArray(teams)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Fetch tracks to map track names to track UUIDs
    const { data: tracks } = await supabaseAdmin.from('tracks').select('id, name, short_name');
    
    let createdCount = 0;
    
    // Group participants by team_name
    const teamGroups: Record<string, any[]> = {};
    teams.forEach(row => {
      if (!row.team_name || !row.email) return;
      if (!teamGroups[row.team_name]) teamGroups[row.team_name] = [];
      teamGroups[row.team_name].push(row);
    });

    // 3. Process each team
    for (const [teamName, members] of Object.entries(teamGroups)) {
      // Find track
      const trackName = members[0].track || '';
      let trackId = null;
      if (tracks) {
        const matchedTrack = tracks.find(t => 
          t.name.toLowerCase().includes(trackName.toLowerCase()) || 
          (t.short_name && t.short_name.toLowerCase() === trackName.toLowerCase())
        );
        if (matchedTrack) trackId = matchedTrack.id;
      }

      // Check if team exists
      let { data: team } = await supabaseAdmin
        .from('teams')
        .select('id')
        .eq('name', teamName)
        .single();
        
      if (!team) {
        const { data: newTeam, error: teamError } = await supabaseAdmin
          .from('teams')
          .insert({ name: teamName, track_id: trackId })
          .select('id')
          .single();
          
        if (teamError) {
          console.error(`Failed to create team ${teamName}:`, teamError);
          continue;
        }
        team = newTeam;
        createdCount++;
      }

      // Process members
      for (const member of members) {
        const { email, name, role } = member;
        const isLeader = role?.toLowerCase() === 'leader' || role?.toLowerCase() === 'captain';
        
        // Ensure user exists in Auth
        const { data: authUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
          email: email.trim(),
          password: Math.random().toString(36).slice(-10) + 'A1!', // Temporary complex password
          email_confirm: true
        });

        let profileId;

        if (createUserError && createUserError.message.includes('already exists')) {
          // Find the existing user ID (we would need to fetch it by email via RPC or Admin API, 
          // but listUsers is available in Admin API)
          const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = usersData.users.find(u => u.email === email.trim());
          if (existingUser) profileId = existingUser.id;
        } else if (authUser?.user) {
          profileId = authUser.user.id;
          
          // Upsert profile
          await supabaseAdmin.from('profiles').upsert({
            id: profileId,
            full_name: name || '',
            role: 'student'
          });
        }

        if (profileId) {
          // Link to team
          await supabaseAdmin.from('team_members').upsert({
            team_id: team.id,
            profile_id: profileId,
            is_leader: isLeader
          }, { onConflict: 'team_id, profile_id' });
        }
      }
    }

    return NextResponse.json({ success: true, teamsCreated: createdCount });
  } catch (error: any) {
    console.error('Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
