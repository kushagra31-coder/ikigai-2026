import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/providers/ToastProvider';

export const useSubmissionData = (teamId: string | null) => {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [github, setGithub] = useState('');
  const [presentation, setPresentation] = useState('');
  const [video, setVideo] = useState('');
  const [status, setStatus] = useState('DRAFT');

  useEffect(() => {
    if (!teamId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      // Fetch repo from teams
      const { data: teamData } = await supabase()
        .from('teams')
        .select('repository_url')
        .eq('id', teamId)
        .single();
        
      if (teamData?.repository_url) {
        setGithub(teamData.repository_url);
      }

      // Fetch submission
      const { data: subData } = await supabase()
        .from('submissions')
        .select('presentation_url, demo_video_url, status')
        .eq('team_id', teamId)
        .limit(1)
        .single();

      if (subData) {
        setPresentation(subData.presentation_url || '');
        setVideo(subData.demo_video_url || '');
        setStatus(subData.status || 'DRAFT');
      }
      setLoading(false);
    };

    fetchData();
  }, [teamId]);

  const saveSubmission = async (isFinal: boolean) => {
    if (!teamId) return;
    setSaving(true);
    
    // Save to teams
    const { error: teamErr } = await supabase()
      .from('teams')
      .update({ repository_url: github })
      .eq('id', teamId);

    if (teamErr) {
      error('Save Failed', 'Failed to update repository URL');
      setSaving(false);
      return;
    }

    // Upsert submission
    const newStatus = isFinal ? 'SUBMITTED' : 'DRAFT';
    
    // Check if submission exists
    const { data: existingSub } = await supabase()
      .from('submissions')
      .select('id')
      .eq('team_id', teamId)
      .limit(1)
      .single();

    if (existingSub) {
      const { error: subErr } = await supabase()
        .from('submissions')
        .update({
          presentation_url: presentation,
          demo_video_url: video,
          status: newStatus
        })
        .eq('id', existingSub.id);

      if (subErr) {
        error('Save Failed', 'Failed to update submission data');
        setSaving(false);
        return;
      }
    } else {
      const { error: subErr } = await supabase()
        .from('submissions')
        .insert({
          team_id: teamId,
          presentation_url: presentation,
          demo_video_url: video,
          status: newStatus
        });
        
      if (subErr) {
        error('Save Failed', 'Failed to create submission data');
        setSaving(false);
        return;
      }
    }

    setStatus(newStatus);
    setSaving(false);
    
    if (isFinal) {
      success('Project Submitted!', 'Your final project has been successfully submitted for review.');
    } else {
      success('Draft Saved', 'Your submission draft has been securely saved.');
    }
  };

  return {
    loading,
    saving,
    github, setGithub,
    presentation, setPresentation,
    video, setVideo,
    status,
    saveSubmission
  };
};
