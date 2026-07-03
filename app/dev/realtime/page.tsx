"use client";

import React, { useState, useEffect } from 'react';
import { 
  useConnectionStatus, 
  usePresence, 
  useLeaderboardRealtime, 
  useTaskRealtime, 
  useRealtime 
} from '../../../features/realtime/hooks';
import { NormalizedRealtimeEvent } from '../../../features/realtime/types/realtime.types';
import { liveEventBus } from '../../../features/live/core/eventBus';
import { RealtimeService } from '../../../features/realtime/services/realtime.service';

export default function RealtimePlaygroundPage() {
  const [events, setEvents] = useState<NormalizedRealtimeEvent[]>([]);
  
  // Realtime hook that binds the service globally in the UI so its instance gets created
  const { broadcast } = useRealtime({
    channelName: 'system',
    onEvent: (event) => setEvents(prev => [event, ...prev].slice(0, 10))
  });

  const connectionStatus = useConnectionStatus('system');
  const { presenceState, updatePresence } = usePresence('system');
  
  // Listeners for specific domains
  useLeaderboardRealtime((event) => setEvents(prev => [event, ...prev].slice(0, 10)));
  useTaskRealtime((event) => setEvents(prev => [event, ...prev].slice(0, 10)));

  useEffect(() => {
    // Initial presence track
    updatePresence({
      userId: `user-${Math.floor(Math.random() * 1000)}`,
      role: 'Admin',
      workspace: 'Playground',
      lastSeen: new Date().toISOString(),
      connectionState: 'CONNECTED'
    });
  }, [updatePresence]);

  const handleManualBroadcast = () => {
    broadcast('TEST_BROADCAST', { message: 'Hello from Playground!' });
  };

  const handleLegacyEventBusEmit = () => {
    liveEventBus.emit({
      id: crypto.randomUUID(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: 'SESSION_STARTED' as any,
      timestamp: new Date().toISOString(),
      actor: 'dev-user',
      target: 'session-123',
      payload: { details: 'Started manually' },
      priority: 'HIGH',
      source: 'Playground'
    });
  };
  
  const handleDisconnect = () => {
    RealtimeService.getInstance().unsubscribe('system');
    RealtimeService.getInstance().unsubscribe('leaderboard');
    RealtimeService.getInstance().unsubscribe('tasks');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Realtime System Playground</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border p-4 rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
          <div className={`inline-flex items-center px-3 py-1 rounded text-white font-mono ${
            connectionStatus === 'CONNECTED' ? 'bg-green-500' :
            connectionStatus === 'CONNECTING' ? 'bg-yellow-500' :
            connectionStatus === 'RECONNECTING' ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {connectionStatus}
          </div>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={handleDisconnect}
              className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
            >
              Force Disconnect
            </button>
          </div>
        </div>

        <div className="border p-4 rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Actions</h2>
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleManualBroadcast}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Broadcast Event
            </button>
            <button 
              onClick={handleLegacyEventBusEmit}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Emit Legacy EventBus Event
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border p-4 rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Presence State</h2>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-sm overflow-auto max-h-96">
            <pre>{JSON.stringify(presenceState, null, 2)}</pre>
          </div>
        </div>

        <div className="border p-4 rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Event Stream (CDC & Broadcasts)</h2>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-sm overflow-auto max-h-96">
            {events.length === 0 ? (
              <span className="text-gray-500">Waiting for events...</span>
            ) : (
              events.map((ev, i) => (
                <div key={i} className="mb-4 border-b border-gray-800 pb-2">
                  <span className="text-yellow-400">[{ev.timestamp}]</span>{' '}
                  <span className="text-blue-400 font-bold">{ev.type}</span>
                  <pre className="mt-1">{JSON.stringify(ev.newData || ev.oldData || ev, null, 2)}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
