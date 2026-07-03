'use client';

import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons } from '@/components/constants/icons';
import { motion } from 'framer-motion';

interface ScoreCategory {
  name: string;
  score: number;
  max: number;
}

interface EvaluationSession {
  id: string;
  sessionName: string;
  evaluator: string;
  date: string;
  remarks: string;
  categories: ScoreCategory[];
}

const MOCK_SCORES: EvaluationSession[] = [
  {
    id: 'eval-1',
    sessionName: 'Checkpoint 1 (MVP Review)',
    evaluator: 'Dr. Alan Turing',
    date: '2026-07-01T15:30:00Z',
    remarks: 'Strong technical foundation. The architecture diagram is well thought out. However, the user flow could be simplified. Focus on polishing the core feature before adding secondary ones.',
    categories: [
      { name: 'Creativity', score: 8, max: 10 },
      { name: 'Originality', score: 7, max: 10 },
      { name: 'Presentation', score: 9, max: 10 },
      { name: 'Feasibility', score: 8, max: 10 },
      { name: 'Functionality', score: 6, max: 10 },
    ]
  },
  {
    id: 'eval-2',
    sessionName: 'Checkpoint 2 (Feature Freeze)',
    evaluator: 'Grace Hopper',
    date: '2026-07-02T16:00:00Z',
    remarks: 'Significant improvement on the UI/UX. The backend integration works flawlessly. Make sure to stress test the database queries before the final submission.',
    categories: [
      { name: 'Creativity', score: 9, max: 10 },
      { name: 'Originality', score: 8, max: 10 },
      { name: 'Presentation', score: 9, max: 10 },
      { name: 'Feasibility', score: 9, max: 10 },
      { name: 'Functionality', score: 9, max: 10 },
    ]
  }
];

export default function ScoresPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto h-full pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evaluations & Scores</h1>
          <p className="text-muted-foreground mt-1">Review feedback and scores from mentors and judges.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {MOCK_SCORES.length === 0 ? (
          <GlassCard className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Icons.star className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Evaluations Yet</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              Your scores will appear here once mentors review your checkpoints.
            </p>
          </GlassCard>
        ) : (
          MOCK_SCORES.map((evalSession, index) => {
            const totalScore = evalSession.categories.reduce((acc, curr) => acc + curr.score, 0);
            const totalMax = evalSession.categories.reduce((acc, curr) => acc + curr.max, 0);
            const average = ((totalScore / totalMax) * 10).toFixed(1);

            return (
              <motion.div
                key={evalSession.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5">
                    <div>
                      <h2 className="text-xl font-bold">{evalSession.sessionName}</h2>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1.5"><Icons.user className="w-3.5 h-3.5" /> {evalSession.evaluator}</span>
                        <span className="flex items-center gap-1.5"><Icons.clock className="w-3.5 h-3.5" /> {new Date(evalSession.date).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-background border border-white/10 px-4 py-2 rounded-xl">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Average</span>
                      <span className="text-2xl font-bold text-primary">{average}</span>
                      <span className="text-sm text-muted-foreground">/ 10</span>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Icons.star className="w-4 h-4 text-warning" /> Detailed Breakdown
                      </h3>
                      <div className="space-y-4">
                        {evalSession.categories.map(cat => (
                          <div key={cat.name}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{cat.name}</span>
                              <span className="font-semibold">{cat.score} <span className="text-muted-foreground text-xs font-normal">/ {cat.max}</span></span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-primary h-full rounded-full transition-all duration-1000" 
                                style={{ width: `${(cat.score / cat.max) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Icons.info className="w-4 h-4 text-accent" /> Mentor Remarks
                      </h3>
                      <div className="bg-black/20 border border-white/5 p-4 rounded-xl relative">
                        <Icons.more className="absolute top-4 right-4 w-6 h-6 text-white/10" />
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          &quot;{evalSession.remarks}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
