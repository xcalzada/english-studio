// src/hooks/useProgress.ts
import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

interface Progress {
  id:            string;
  unit_id:       string;
  tool_id:       string;
  completed_ids: string[];
  correct_ids:   string[];
  score:         number;
}

interface RecordOpts {
  revealed?: boolean;
  phase?:    'study' | 'check' | 'practice';
}

interface UseProgressReturn {
  progress: Progress | null;
  loading:  boolean;
  record:   (exerciseId: string, correct: boolean, opts?: RecordOpts) => Promise<void>;
}

export function useProgress(unitId: string, toolId: string, token?: string | null): UseProgressReturn {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (!unitId || !toolId || !token) return;
    const controller = new AbortController();
    setLoading(true);

    api.get<{ progress: Progress[] }>(
      `/api/progress?unit_id=${unitId}&tool_id=${toolId}`,
      token
    )
      .then(r => { if (!controller.signal.aborted) setProgress(r.progress[0] ?? null); })
      .catch(e => { if (e.name !== 'AbortError') console.error('useProgress load error:', e); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [unitId, toolId, token]);

  const record = useCallback(async (
    exerciseId: string,
    correct:    boolean,
    opts:       RecordOpts = {}
  ) => {
    if (!token) return;

    setProgress(p => {
      if (!p) return p;
      const completedIds = p.completed_ids.includes(exerciseId)
        ? p.completed_ids : [...p.completed_ids, exerciseId];
      const correctIds = correct && !p.correct_ids.includes(exerciseId)
        ? [...p.correct_ids, exerciseId] : p.correct_ids;
      return { ...p, completed_ids: completedIds, correct_ids: correctIds, score: correctIds.length };
    });

    try {
      const res = await api.post<{ progress: Progress }>('/api/progress', {
        unit_id:     unitId,
        tool_id:     toolId,
        exercise_id: exerciseId,
        correct,
        revealed:    opts.revealed ?? false,
        phase:       opts.phase    ?? 'practice',
      }, token);
      setProgress(res.progress);
    } catch (e) {
      console.error('useProgress record error:', e);
    }
  }, [unitId, toolId, token]);

  return { progress, loading, record };
}