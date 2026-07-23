import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false }
  }
);

async function main() {
  const dataPath = path.join(process.cwd(), 'public', 'certificates.json');
  const certs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Extract valid teams
  const teamMap = new Map();
  certs.forEach(c => {
    if (c.team && c.team.trim() !== "") {
      const t = c.team.trim();
      if (!teamMap.has(t)) {
        teamMap.set(t, { name: t, members: [] });
      }
      teamMap.get(t).members.push({
        name: c.name,
        certificateId: c.certificateId
      });
    }
  });

  const teams = Array.from(teamMap.values());
  console.log(`Found ${teams.length} unique teams.`);

  const tracks = [
    { name: "AI & ML", id: null },
    { name: "Cybersecurity", id: null },
    { name: "Healthcare", id: null },
    { name: "Smart Cities", id: null },
    { name: "Open Innovation", id: null }
  ];

  // Insert tracks if missing
  for (let t of tracks) {
    const { data: existing } = await supabase.from('tracks').select('id').eq('name', t.name).single();
    if (existing) {
      t.id = existing.id;
    } else {
      const { data: inserted } = await supabase.from('tracks').insert({ name: t.name }).select('id').single();
      t.id = inserted?.id;
    }
  }

  // Insert teams
  let trackIndex = 0;
  for (const team of teams) {
    const assignedTrack = tracks[trackIndex % tracks.length];
    trackIndex++;

    const { data: existingTeam } = await supabase.from('teams').select('id').eq('name', team.name).single();
    if (!existingTeam) {
      console.log(`Inserting team ${team.name} into ${assignedTrack.name}`);
      await supabase.from('teams').insert({
        name: team.name,
        track_id: assignedTrack.id,
        project_description: "Automatically assigned from certificates.",
        is_locked: false
      });
    } else {
      console.log(`Team ${team.name} already exists. Skipping.`);
    }
  }

  console.log("Seeding complete.");
}

main().catch(console.error);
