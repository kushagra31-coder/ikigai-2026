'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import { useToast } from '@/components/providers/ToastProvider';
import { ScoreInput } from './ScoreInput';
import { ScoreSummary } from './ScoreSummary';
import { RemarksEditor } from './RemarksEditor';
import { SessionSelector, Session } from './SessionSelector';
import { EvaluationConfig, ScoreEntry, EvaluationStatus, EvaluationResultSchema } from '../types';
import { calculateScores } from '../utils/scoreCalculator';

interface EvaluationEngineProps {
  config: EvaluationConfig;
  teamName: string;
  sessions: Session[];
  initialStatus?: EvaluationStatus;
}

export function EvaluationEngine({ config, teamName, sessions, initialStatus = 'IDLE' }: EvaluationEngineProps) {
  const { success, error } = useToast();
  
  // State
  const [status, setStatus] = useState<EvaluationStatus>(initialStatus);
  const [sessionId, setSessionId] = useState<string>(sessions[0]?.id || '');
  const [remarks, setRemarks] = useState('');
  
  // Initialize scores safely
  const [scores, setScores] = useState<ScoreEntry[]>(
    config.criteria.map(c => ({ criterionId: c.id, score: 0 }))
  );

  const isLocked = status === 'SUBMITTED';

  const handleScoreChange = (criterionId: string, newScore: number) => {
    if (isLocked) return;
    setScores(prev => prev.map(s => s.criterionId === criterionId ? { ...s, score: newScore } : s));
    if (status === 'IDLE') setStatus('DRAFT');
  };

  const handleSaveDraft = () => {
    if (isLocked) return;
    setStatus('DRAFT');
    success('Draft Saved', 'Your evaluation progress has been saved locally.');
  };

  const handleSubmit = () => {
    if (isLocked) return;
    
    const calculations = calculateScores(config, scores);

    // Construct Object for validation
    const evaluationObj = {
      sessionId,
      teamId: 'mock-team-123',
      evaluatorId: 'mock-evaluator-456',
      scores,
      remarks,
      status: 'SUBMITTED' as const,
      totalScore: calculations.rawTotal,
      weightedScore: calculations.weightedTotal,
      maxPossibleScore: calculations.weightedMax,
    };

    // Parse via Zod
    const result = EvaluationResultSchema.safeParse(evaluationObj);

    if (!result.success) {
      error('Validation Failed', 'Please ensure all scores are within 0-10 bounds.');
      console.error(result.error);
      return;
    }

    // Mock API Call
    setStatus('SUBMITTED');
    success('Evaluation Submitted', 'Final scores have been securely locked and recorded.');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Evaluating: {teamName}</h2>
          <p className="text-muted-foreground mt-1">Version: {config.version}</p>
        </div>
        
        {status !== 'IDLE' && (
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status === 'SUBMITTED' ? 'bg-success/20 text-success border border-success/20' : 'bg-warning/20 text-warning border border-warning/20'}`}>
            {status}
          </div>
        )}
      </div>

      <GlassCard className={isLocked ? 'opacity-90 pointer-events-none' : ''}>
        <div className="mb-8 border-b border-white/10 pb-6">
          <SessionSelector 
            sessions={sessions}
            selectedId={sessionId}
            onChange={setSessionId}
            disabled={isLocked}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Criteria Inputs */}
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Scoring Criteria</h3>
            {config.criteria.map(criterion => (
              <ScoreInput
                key={criterion.id}
                criterion={criterion}
                value={scores.find(s => s.criterionId === criterion.id)?.score || 0}
                onChange={(val) => handleScoreChange(criterion.id, val)}
                disabled={isLocked}
              />
            ))}
          </div>

          {/* Right Column: Summary & Remarks */}
          <div className="w-full md:w-80 flex flex-col gap-6 shrink-0">
            <ScoreSummary config={config} scores={scores} />
            
            <RemarksEditor 
              value={remarks}
              onChange={(val) => {
                setRemarks(val);
                if (status === 'IDLE') setStatus('DRAFT');
              }}
              disabled={isLocked}
            />
          </div>
        </div>

        {/* Action Bar */}
        {!isLocked && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4 pointer-events-auto">
            {config.allowDrafts && (
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
            )}
            <Button variant="primary" className="w-full sm:w-auto" onClick={handleSubmit}>
              <Icons.check className="w-4 h-4 mr-2" />
              Finalize Score
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
