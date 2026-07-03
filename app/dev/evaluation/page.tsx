'use client';

import { useState } from 'react';
import { EvaluationEngine } from '@/features/evaluation/components/EvaluationEngine';
import { EvaluationTable } from '@/features/evaluation/components/EvaluationTable';
import { DEFAULT_EVALUATION_CONFIG } from '@/features/evaluation/config/schema';
import { Container, Section } from '@/components/layout';
import { ToastProvider } from '@/components/providers/ToastProvider';

const MOCK_SESSIONS = [
  { id: 'checkpoint-1', name: 'Checkpoint 1: MVP Architecture' },
  { id: 'checkpoint-2', name: 'Checkpoint 2: Feature Freeze' },
  { id: 'final-pitch', name: 'Final Pitch' },
];

export default function EvaluationPlayground() {
  const [activeTab, setActiveTab] = useState<'table' | 'engine'>('engine');

  return (
    <ToastProvider>
      <Section className="min-h-screen pt-24 bg-background">
      <Container className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Evaluation Engine Playground</h1>
            <p className="text-muted-foreground mt-1">
              Test the evaluation infrastructure components strictly isolated from business logic.
            </p>
          </div>
          <div className="flex bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'table' ? 'bg-white/10 shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Evaluation Table
            </button>
            <button
              onClick={() => setActiveTab('engine')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'engine' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Evaluation Engine
            </button>
          </div>
        </div>

        {activeTab === 'table' ? (
          <EvaluationTable 
            records={[
              {
                id: 'eval-1',
                teamName: 'Neural Ninjas',
                sessionName: 'Checkpoint 1: MVP Architecture',
                score: 8.5,
                status: 'SUBMITTED',
                date: new Date().toISOString()
              },
              {
                id: 'eval-2',
                teamName: 'Quantum Coders',
                sessionName: 'Checkpoint 1: MVP Architecture',
                score: 4.2,
                status: 'DRAFT',
                date: new Date().toISOString()
              }
            ]}
          />
        ) : (
          <EvaluationEngine
            config={DEFAULT_EVALUATION_CONFIG}
            teamName="Neural Ninjas"
            sessions={MOCK_SESSIONS}
          />
        )}
      </Container>
    </Section>
    </ToastProvider>
  );
}
