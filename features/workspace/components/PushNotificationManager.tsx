'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/primitives/button';
import { Bell, BellOff } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  async function subscribeToPush() {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        )
      });
      
      setSubscription(sub);
      
      // Save to Supabase
      const subJSON = sub.toJSON();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not logged in');

      await supabase.from('push_subscriptions').upsert({
        profile_id: user.id,
        endpoint: subJSON.endpoint,
        p256dh: subJSON.keys?.p256dh,
        auth: subJSON.keys?.auth
      }, { onConflict: 'endpoint' });
      
    } catch (error) {
      console.error('Failed to subscribe:', error);
      alert('Could not enable push notifications. Please check browser permissions.');
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    setLoading(true);
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        
        // Remove from Supabase
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isSupported) {
    return (
      <Button variant="outline" size="sm" disabled className="w-full justify-start text-muted-foreground">
        <BellOff className="w-4 h-4 mr-2" />
        Push Not Supported
      </Button>
    );
  }

  if (subscription) {
    return (
      <Button variant="outline" size="sm" onClick={unsubscribeFromPush} disabled={loading} className="w-full justify-start text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10">
        <Bell className="w-4 h-4 mr-2" />
        Notifications Enabled
      </Button>
    );
  }

  return (
    <Button variant="default" size="sm" onClick={subscribeToPush} disabled={loading} className="w-full justify-start">
      <Bell className="w-4 h-4 mr-2" />
      Enable Notifications
    </Button>
  );
}
