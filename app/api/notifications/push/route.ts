import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

// Configure Web Push with VAPID keys
webpush.setVapidDetails(
  'mailto:support@ikigai2026.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string
);

// Initialize Supabase Admin client to bypass RLS for fetching subscriptions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    // 1. Authenticate the admin user making the request
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

    // 2. Parse the notification payload
    const { title, body, url, targetAudience } = await req.json();

    const payload = JSON.stringify({
      title,
      body,
      url: url || '/workspace'
    });

    // 3. Fetch target subscriptions from the database
    let query = supabaseAdmin.from('push_subscriptions').select('*');
    
    // In the future, we can filter by targetAudience (e.g. only 'participant' or specific team_id)
    // For now, we fetch everyone if targetAudience is 'all'
    const { data: subscriptions, error: fetchError } = await query;

    if (fetchError || !subscriptions) {
      throw new Error('Failed to fetch subscriptions');
    }

    // 4. Send the push notifications in parallel
    const sendPromises = subscriptions.map((sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      };

      return webpush.sendNotification(pushSubscription, payload).catch((err) => {
        // If the subscription is no longer valid (e.g., user revoked permission), delete it
        if (err.statusCode === 410 || err.statusCode === 404) {
          console.log('Deleting expired subscription:', sub.endpoint);
          return supabaseAdmin.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
        console.error('Error sending push notification:', err);
      });
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, count: subscriptions.length });
  } catch (error: any) {
    console.error('Push Notification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
