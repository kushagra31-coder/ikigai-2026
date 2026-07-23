import { useState, useEffect } from 'react';
import { createClient as supabase } from '@/lib/supabase/client';

export interface ScoreCategory {
  name: string;
  score: number;
  max: number;
}

export interface EvaluationSession {
  id: string;
  sessionName: string;
  evaluator: string;
  date: string;
  remarks: string;
  categories: ScoreCategory[];
}

export const useScores = (teamId: string | null) => {
  const [evaluations, setEvaluations] = useState<EvaluationSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) {
      setEvaluations([]);
      setLoading(false);
      return;
    }

    const fetchEvaluations = async () => {
      setLoading(true);
      
      // 1. Get team's submission ID
      const { data: submissionData } = await supabase()
        .from('submissions')
        .select('id')
        .eq('team_id', teamId)
        .single();
        
      if (!submissionData) {
        setEvaluations([]);
        setLoading(false);
        return;
      }

      // 2. Get evaluations for that submission
      const { data, error } = await supabase()
        .from('evaluations')
        .select(`
          id,
          score_innovation,
          score_technical,
          score_impact,
          score_presentation,
          feedback,
          created_at,
          mentor:mentor_id(full_name),
          session:session_id(name)
        `)
        .eq('submission_id', submissionData.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        const mapped: EvaluationSession[] = data.map((ev: any) => ({
          id: ev.id,
          sessionName: ev.session?.name || 'General Evaluation',
          evaluator: ev.mentor?.full_name || 'Anonymous Mentor',
          date: ev.created_at,
          remarks: ev.feedback || 'No remarks provided.',
          categories: [
            { name: 'Innovation', score: ev.score_innovation || 0, max: 10 },
            { name: 'Technical', score: ev.score_technical || 0, max: 10 },
            { name: 'Impact', score: ev.score_impact || 0, max: 10 },
            { name: 'Presentation', score: ev.score_presentation || 0, max: 10 },
          ]
        }));
        setEvaluations(mapped);
      }
      setLoading(false);
    };

    fetchEvaluations();
  }, [teamId]);

  return { evaluations, loading };
};
