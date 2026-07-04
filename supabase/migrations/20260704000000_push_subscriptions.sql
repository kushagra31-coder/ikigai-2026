-- Create push_subscriptions table
CREATE TABLE IF NOT EXISTS push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    UNIQUE(endpoint)
);

-- RLS Policies
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own push subscriptions"
    ON push_subscriptions FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own push subscriptions"
    ON push_subscriptions FOR UPDATE
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can view their own push subscriptions"
    ON push_subscriptions FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own push subscriptions"
    ON push_subscriptions FOR DELETE
    USING (auth.uid() = profile_id);

-- Admins can view all subscriptions (to send notifications)
CREATE POLICY "Admins can view all push subscriptions"
    ON push_subscriptions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );
