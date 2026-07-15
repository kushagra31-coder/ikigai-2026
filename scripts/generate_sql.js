const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./public/certificates.json', 'utf-8'));
  let validTeams = [];
  for (const entry of data) {
    if (entry['Team Name'] && entry['Team Name'].trim() !== '') {
      if (!validTeams.some(t => t.name === entry['Team Name'].trim())) {
        validTeams.push({
          name: entry['Team Name'].trim(),
          college: entry['College Name'] || 'Unknown'
        });
      }
    }
  }
  
  const tracks = [
    'Artificial Intelligence & Machine Learning',
    'Computer Vision',
    'Agricultural Technology & Smart Farming',
    'Sports Analytics using AI & Machine Learning',
    'Web & Mobile Applications'
  ];
  
  let sql = '-- 1. Cleanup old data\n';
  sql += 'DELETE FROM evaluations;\n';
  sql += 'DELETE FROM submissions;\n';
  sql += 'DELETE FROM team_members;\n';
  sql += 'DELETE FROM teams;\n';
  sql += 'UPDATE profiles SET assigned_track_id = NULL;\n'; // Clear assigned tracks before deleting tracks
  sql += 'DELETE FROM tracks;\n\n';
  
  sql += '-- 2. Insert Tracks\n';
  tracks.forEach((track) => {
    sql += `INSERT INTO tracks (id, name) VALUES (gen_random_uuid(), '${track.replace(/'/g, "''")}');\n`;
  });
  
  sql += '\n-- 3. Insert Teams and randomly assign tracks\n';
  sql += 'DO $$\nDECLARE\n';
  tracks.forEach((track, i) => {
    sql += `  track${i} UUID;\n`;
  });
  sql += 'BEGIN\n';
  tracks.forEach((track, i) => {
    sql += `  SELECT id INTO track${i} FROM tracks WHERE name = '${track.replace(/'/g, "''")}';\n`;
  });
  
  validTeams.forEach((team) => {
    const randomTrackIndex = Math.floor(Math.random() * tracks.length);
    sql += `  INSERT INTO teams (name, track_id) VALUES ('${team.name.replace(/'/g, "''")}', track${randomTrackIndex});\n`;
  });
  sql += 'END $$;\n\n';
  
  sql += '-- 4. Add Priority to announcements\n';
  sql += 'ALTER TABLE announcements ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT \'LOW\';\n';
  
  fs.writeFileSync('supabase/migrations/20260703000005_announcements_and_cleanup.sql', sql);
  console.log('SQL generated!');
} catch (e) {
  console.error(e);
}
