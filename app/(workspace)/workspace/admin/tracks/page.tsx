'use client';

import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export default function AdminTracksPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const { data } = await supabase().from('tracks').select('*').order('created_at', { ascending: false });
      if (data) setTracks(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleOpenModal = (track: any = null) => {
    if (track) {
      setEditingTrack(track);
      setName(track.name);
      setDescription(track.description || '');
    } else {
      setEditingTrack(null);
      setName('');
      setDescription('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!name) return alert('Name is required');
    try {
      if (editingTrack) {
        await supabase().from('tracks').update({ name, description }).eq('id', editingTrack.id);
      } else {
        await supabase().from('tracks').insert([{ name, description }]);
      }
      setIsModalOpen(false);
      fetchTracks();
    } catch (e) {
      console.error(e);
      alert('Failed to save track');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track? This may leave teams without a track.')) return;
    try {
      await supabase().from('tracks').delete().eq('id', id);
      fetchTracks();
    } catch (e) {
      console.error(e);
      alert('Failed to delete track');
    }
  };

  if (loading) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Tracks</h1>
          <p className="text-muted-foreground mt-1">Create and manage evaluation tracks.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icons.add className="w-4 h-4 mr-2" />
          Create Track
        </Button>
      </div>
      
      <GlassCard className="overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Name</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs w-full">Description</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tracks.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No tracks found.
                </td>
              </tr>
            ) : tracks.map(track => (
              <tr key={track.id} className="hover:bg-white/5">
                <td className="py-3 px-4 font-medium">{track.name}</td>
                <td className="py-3 px-4 text-muted-foreground whitespace-normal min-w-[300px]">
                  {track.description || '-'}
                </td>
                <td className="py-3 px-4 text-right space-x-3">
                  <button onClick={() => handleOpenModal(track)} className="text-primary hover:text-primary/80 transition-colors text-xs">Edit</button>
                  <button onClick={() => handleDelete(track.id)} className="text-destructive hover:text-destructive/80 transition-colors text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">{editingTrack ? 'Edit Track' : 'Create Track'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Track Name</label>
                <input 
                  type="text"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AI & Machine Learning"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Description</label>
                <textarea 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this track about?"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingTrack ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
