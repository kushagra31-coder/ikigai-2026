'use client';

import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('LOW');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data } = await supabase()
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAnnouncements(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!title || !content) return alert('Title and content are required.');
    setIsCreating(true);
    const { data: { session } } = await supabase().auth.getSession();
    
    const { error } = await supabase().from('announcements').insert({
      title,
      content,
      priority,
      is_published: true,
      published_at: new Date().toISOString(),
      author_id: session?.user?.id
    });
    
    if (error) {
      alert('Error creating announcement: ' + error.message);
    } else {
      setTitle('');
      setContent('');
      setPriority('LOW');
      fetchAnnouncements();
    }
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      await supabase().from('announcements').delete().eq('id', id);
      fetchAnnouncements();
    }
  };

  if (loading) return <div className="animate-pulse h-96 bg-white/5 rounded-xl w-full" />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground mt-1">Push notifications and alerts to all users instantly.</p>
      </div>
      
      <GlassCard className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Icons.bell className="w-5 h-5 text-primary" /> Create New Announcement
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase">Title</label>
              <input 
                value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Lunch is now being served in Hall A"
                className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-sm focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase">Priority</label>
              <select 
                value={priority} onChange={e => setPriority(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-sm focus:border-primary outline-none [&>option]:bg-zinc-900 [&>option]:text-white"
              >
                <option value="HIGH">High (🔴)</option>
                <option value="MEDIUM">Medium (🟡)</option>
                <option value="LOW">Low (⚪)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase">Content</label>
            <textarea 
              value={content} onChange={e => setContent(e.target.value)}
              placeholder="Provide more details here..."
              className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-sm focus:border-primary outline-none min-h-[100px]"
            />
          </div>
          
          <Button onClick={handleCreate} disabled={isCreating} className="w-full">
            {isCreating ? <Icons.spinner className="w-5 h-5 animate-spin mr-2" /> : <Icons.upload className="w-5 h-5 mr-2" />}
            Publish Announcement
          </Button>
        </div>
      </GlassCard>
      
      <GlassCard className="overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground bg-white/5">
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Priority</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Title</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Published At</th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {announcements.length === 0 ? (
              <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No announcements published yet.</td></tr>
            ) : announcements.map(ann => (
              <tr key={ann.id} className="hover:bg-white/5">
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    ann.priority === 'HIGH' ? 'bg-destructive/20 text-destructive' :
                    ann.priority === 'MEDIUM' ? 'bg-warning/20 text-warning' : 'bg-white/10 text-muted-foreground'
                  }`}>
                    {ann.priority}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium max-w-[200px] truncate">{ann.title}</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {new Date(ann.published_at).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDelete(ann.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Icons.close className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
