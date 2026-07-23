'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';
import { Badge } from '@/components/primitives/badge';
import { useToast } from '@/components/providers/ToastProvider';

import { useWorkspaceTeam } from '@/features/workspace/hooks/useWorkspaceTeam';
import { useSubmissionData } from '@/features/workspace/hooks/useSubmissionData';

export default function SubmissionPage() {
  const { error } = useToast();
  const { teamId, loading: teamLoading } = useWorkspaceTeam();
  const {
    loading: subLoading,
    saving,
    github, setGithub,
    presentation, setPresentation,
    video, setVideo,
    status,
    saveSubmission
  } = useSubmissionData(teamId);

  const loading = teamLoading || subLoading;

  const calculateProgress = () => {
    let progress = 0;
    if (github.length > 5) progress += 25;
    if (presentation.length > 5) progress += 25;
    if (video.length > 5) progress += 25;
    // Assume 25% for ZIP file (mocked as true for this demo if some URLs are filled)
    if (github && presentation) progress += 25;
    return progress;
  };

  const progress = calculateProgress();

  const handleSaveDraft = () => {
    saveSubmission(false);
  };

  const handleSubmit = () => {
    if (progress < 100) {
      error('Validation Failed', 'Please complete all required fields before final submission.');
      return;
    }
    saveSubmission(true);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Submission</h1>
          <p className="text-muted-foreground mt-1">Submit your final project deliverables here.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-warning/20 text-warning border-warning/20 px-3 py-1 font-semibold uppercase tracking-wider">
            Draft Mode
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Submission Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Icons.upload className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Deliverables</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icons.link className="w-4 h-4 text-muted-foreground" /> GitHub Repository URL <span className="text-destructive">*</span>
                </label>
                <input 
                  type="url" 
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/your-team/repo"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icons.link className="w-4 h-4 text-muted-foreground" /> Presentation URL (Google Slides, Canva, Pitch) <span className="text-destructive">*</span>
                </label>
                <input 
                  type="url" 
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icons.link className="w-4 h-4 text-muted-foreground" /> Demo Video URL (YouTube, Loom) <span className="text-destructive">*</span>
                </label>
                <input 
                  type="url" 
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icons.upload className="w-4 h-4 text-muted-foreground" /> Source Code (ZIP File) <span className="text-destructive">*</span>
                </label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icons.upload className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm">Click to upload or drag and drop</h4>
                  <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                    ZIP file containing all your source code. Maximum size 50MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-end">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button 
                variant="primary" 
                className="w-full sm:w-auto" 
                disabled={saving || loading}
                onClick={handleSubmit}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Icons.logo className="w-4 h-4 animate-spin" /> Submitting...
                  </span>
                ) : 'Final Submit'}
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Validation & History */}
        <div className="flex flex-col gap-6">
          <GlassCard>
            <h3 className="font-semibold mb-4">Submission Progress</h3>
            <div className="relative pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold">{progress}%</span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Readiness</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-success' : 'bg-primary'}`} 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <ValidationItem label="GitHub URL Provided" done={github.length > 5} />
              <ValidationItem label="Presentation URL Provided" done={presentation.length > 5} />
              <ValidationItem label="Demo Video URL Provided" done={video.length > 5} />
              <ValidationItem label="Source Code Uploaded" done={progress === 100} />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold flex items-center gap-2 mb-6">
              <Icons.clock className="w-4 h-4 text-muted-foreground" /> Version History
            </h3>
            
            <div className="relative border-l border-white/10 ml-3 space-y-6">
              {[
                { version: 'v1.1 (Draft)', time: 'Today, 14:30', desc: 'Updated Presentation URL' },
                { version: 'v1.0 (Draft)', time: 'Yesterday, 09:15', desc: 'Initial GitHub setup' }
              ].map((h, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[1.5px] top-1.5 -translate-x-1/2" />
                  <h4 className="text-sm font-semibold">{h.version}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1 mb-2">{h.time}</p>
                  <p className="text-xs text-muted-foreground bg-white/5 p-2 rounded-md">{h.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function ValidationItem({ label, done }: { label: string, done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-success/20 text-success' : 'bg-white/10 text-muted-foreground'}`}>
        {done ? <Icons.check className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />}
      </div>
      <span className={`text-sm ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
    </div>
  );
}
