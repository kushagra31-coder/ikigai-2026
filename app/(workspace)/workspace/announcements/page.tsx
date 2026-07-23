'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Badge } from '@/components/primitives/badge';
import { motion, AnimatePresence } from 'framer-motion';

type AnnouncementPriority = 'High' | 'Normal';

import { useAnnouncements, Announcement } from '@/features/workspace/hooks/useAnnouncements';

export default function AnnouncementsPage() {
  const { announcements, loading } = useAnnouncements();

  const pinnedAnnouncements = announcements.filter(a => a.isPinned);
  const unpinnedAnnouncements = announcements.filter(a => !a.isPinned);

  const AnnouncementCard = ({ a }: { a: Announcement }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard className="p-6 hover:bg-white/5 transition-colors border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${a.priority === 'High' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
              {a.priority === 'High' ? <Icons.warning className="w-5 h-5" /> : <Icons.bell className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                {a.title}
                {a.isPinned && <Icons.star className="w-4 h-4 text-warning fill-warning" />}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new Date(a.date).toLocaleString()}
              </p>
            </div>
          </div>
          {a.priority === 'High' && (
            <Badge className="bg-destructive/20 text-destructive border-destructive/20 px-2 py-0.5">
              High Priority
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          {a.content}
        </p>
      </GlassCard>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground mt-1">Stay updated with the latest from the organizing team.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 pb-12 mt-2">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center bg-white/5 border border-white/5 rounded-2xl"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <h3 className="text-lg font-semibold">Loading...</h3>
            </motion.div>
          ) : announcements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 flex flex-col items-center justify-center text-center bg-white/5 border border-white/5 rounded-2xl"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Icons.bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No announcements yet</h3>
            </motion.div>
          ) : (
            <>
              {pinnedAnnouncements.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">Pinned</h2>
                  {pinnedAnnouncements.map(a => <AnnouncementCard key={a.id} a={a} />)}
                </div>
              )}

              {unpinnedAnnouncements.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">Latest</h2>
                  {unpinnedAnnouncements.map(a => <AnnouncementCard key={a.id} a={a} />)}
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
