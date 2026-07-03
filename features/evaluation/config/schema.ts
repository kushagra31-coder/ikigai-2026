import { z } from 'zod';

export const EvaluationCriterionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  minScore: z.number().default(0),
  maxScore: z.number().default(10),
  weight: z.number().default(1),
  required: z.boolean().default(true),
});

export const EvaluationConfigSchema = z.object({
  version: z.string(),
  criteria: z.array(EvaluationCriterionSchema),
  allowDrafts: z.boolean().default(true),
});

export const ScoreEntrySchema = z.object({
  criterionId: z.string(),
  score: z.number().min(0).max(10), // strict validation
});

export const EvaluationResultSchema = z.object({
  id: z.string().optional(),
  sessionId: z.string(),
  teamId: z.string(),
  evaluatorId: z.string(),
  scores: z.array(ScoreEntrySchema),
  remarks: z.string().max(2000).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED']),
  submittedAt: z.string().datetime().optional(),
  
  // Computed fields (often recalculated on server, but validated here for completeness)
  totalScore: z.number().optional(),
  weightedScore: z.number().optional(),
  maxPossibleScore: z.number().optional(),
});

export type EvaluationCriterion = z.infer<typeof EvaluationCriterionSchema>;
export type EvaluationConfig = z.infer<typeof EvaluationConfigSchema>;
export type ScoreEntry = z.infer<typeof ScoreEntrySchema>;
export type EvaluationResult = z.infer<typeof EvaluationResultSchema>;
export type EvaluationStatus = 'IDLE' | 'DRAFT' | 'SUBMITTED';

// Default Hardcoded Configuration for IKIGAI 2026 Checkpoints
export const DEFAULT_EVALUATION_CONFIG: EvaluationConfig = {
  version: '1.0',
  allowDrafts: true,
  criteria: [
    {
      id: 'creativity',
      name: 'Creativity',
      description: 'How innovative and out-of-the-box is the solution?',
      minScore: 0,
      maxScore: 10,
      weight: 1.0,
      required: true,
    },
    {
      id: 'originality',
      name: 'Originality',
      description: 'Is the idea unique or a significant improvement over existing solutions?',
      minScore: 0,
      maxScore: 10,
      weight: 1.0,
      required: true,
    },
    {
      id: 'presentation',
      name: 'Presentation',
      description: 'How effectively was the idea and product communicated?',
      minScore: 0,
      maxScore: 10,
      weight: 1.0,
      required: true,
    },
    {
      id: 'feasibility',
      name: 'Feasibility',
      description: 'Can this be practically implemented and scaled?',
      minScore: 0,
      maxScore: 10,
      weight: 1.5, // Example of weighted scoring for feasibility
      required: true,
    },
    {
      id: 'functionality',
      name: 'Functionality',
      description: 'Does the MVP work? Are the core features complete?',
      minScore: 0,
      maxScore: 10,
      weight: 1.5, // Example of weighted scoring for functionality
      required: true,
    },
  ],
};
