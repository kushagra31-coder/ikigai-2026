-- 20260703000000_schema_corrections.sql

-- 1. TRACKS missing fields
ALTER TABLE tracks
ADD COLUMN icon TEXT,
ADD COLUMN status TEXT DEFAULT 'ACTIVE',
ADD COLUMN visibility TEXT DEFAULT 'PUBLIC';

-- 2. TEAMS missing fields
ALTER TABLE teams
ADD COLUMN is_locked BOOLEAN DEFAULT FALSE NOT NULL;

-- 3. ANNOUNCEMENTS missing fields
ALTER TABLE announcements
ADD COLUMN priority TEXT DEFAULT 'NORMAL',
ADD COLUMN pinned BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN audience TEXT DEFAULT 'ALL';

-- 4. CREATE PASSES TABLE
CREATE TABLE passes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
    pass_type TEXT DEFAULT 'PARTICIPANT' NOT NULL,
    status TEXT DEFAULT 'ACTIVE' NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- 5. CREATE SCAN LOGS TABLE
CREATE TABLE scan_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pass_id UUID REFERENCES passes(id) ON DELETE CASCADE NOT NULL,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
    checkpoint TEXT NOT NULL,
    result TEXT NOT NULL,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);
