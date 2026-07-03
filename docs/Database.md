# Database Schema (Supabase)

## Users & Roles
- **users** (managed by Supabase Auth)
- **profiles**: `id` (uuid), `role` (enum: SUPER_ADMIN, ADMIN, MENTOR, USER, VOLUNTEER), `full_name`, `avatar_url`

## Event Entities
- **teams**: `id`, `name`, `track_id`, `leader_id`, `status`
- **team_members**: `team_id`, `user_id`, `is_leader`, `status`
- **tracks**: `id`, `name`, `description`

## Evaluation
- **evaluations**: `id`, `team_id`, `mentor_id`, `config_version`, `raw_total`, `weighted_total`, `timestamp`
- **scores**: `id`, `evaluation_id`, `criterion_id`, `score`, `comment`

## Event Operations
- **digital_passes**: `id`, `team_id`, `status`, `last_scan_checkpoint`
- **scan_logs**: `id`, `pass_id`, `team_id`, `checkpoint`, `volunteer_id`, `result`, `timestamp`, `device_id`

## Security (RLS)
- All tables enforce Row Level Security.
- Only authenticated users can read public event data.
- Admins have `ALL` access to event operations.
- Mentors can only insert `evaluations`.
- Volunteers can only insert `scan_logs`.
