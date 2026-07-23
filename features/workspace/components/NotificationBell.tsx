'use client';

import { useState, useEffect } from 'react';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { createClient as supabase } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { PushNotificationManager } from './PushNotificationManager';

export const NotificationBell = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [toastAnnouncement, setToastAnnouncement] = useState<any | null>(null);

  const fetchAnnouncements = async () => {
    const { data } = await supabase()
      .from('announcements')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(5);
      
    if (data && data.length > 0) {
      setAnnouncements(data);
      const lastRead = localStorage.getItem('last_read_workspace_announcement');
      if (!lastRead || new Date(data[0].published_at) > new Date(lastRead)) {
        setHasUnread(true);
      }
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    const channel = supabase()
      .channel(`workspace:announcements:${Math.random()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'announcements' },
        (payload) => {
          const newAnn = payload.new;
          if (newAnn.is_published) {
            setAnnouncements(prev => [newAnn, ...prev].slice(0, 5));
            setHasUnread(true);
            if (newAnn.priority === 'HIGH') {
              setToastAnnouncement(newAnn);
              setTimeout(() => setToastAnnouncement(null), 8000);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && announcements.length > 0) {
      setHasUnread(false);
      localStorage.setItem('last_read_workspace_announcement', announcements[0].published_at);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground"
        onClick={handleOpen}
        aria-label="Notifications"
      >
        <Icons.bell className="w-5 h-5" />
        {hasUnread && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.bell className="w-4 h-4 text-primary" /> Notifications
                </h3>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {announcements.length === 0 ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center text-muted-foreground">
                    <Icons.bell className="w-8 h-8 opacity-20 mb-3" />
                    <p className="text-xs font-mono">ALL CAUGHT UP</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-4 hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-2 mb-2">
                          {ann.priority === 'HIGH' && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 font-bold uppercase tracking-wider">
                              High Priority
                            </span>
                          )}
                          {ann.priority === 'MEDIUM' && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 font-bold uppercase tracking-wider">
                              Update
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground ml-auto opacity-70 group-hover:opacity-100 transition-opacity">
                            {new Date(ann.published_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1 text-foreground leading-tight">{ann.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {ann.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-white/10 bg-muted/20">
                <div className="px-2">
                  <PushNotificationManager />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastAnnouncement && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 right-4 sm:right-8 z-[100] w-80 sm:w-96 bg-card border-l-4 border-l-red-500 border-y border-r border-white/10 rounded-lg shadow-2xl p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-500 font-bold uppercase animate-pulse">Important Alert</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{toastAnnouncement.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-3">{toastAnnouncement.content}</p>
              </div>
              <button onClick={() => setToastAnnouncement(null)} className="text-muted-foreground hover:text-foreground">
                <Icons.close className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
