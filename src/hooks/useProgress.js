import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

export function useProgress(unitId, toolId, token) {
  const [progress, setProgress] = useState(null);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (!unitId || !toolId || !token) return;
    const controller = new AbortController();
    setLoading(true);

    api.get(
      `/api/progress?unit_id=${unitId}&tool_id=${toolId}`,
      token
    )
      .then(r => { if (!controller.signal.aborted) setProgress(r.progress[0] ?? null); })
      .catch(e => { if (e.name !== 'AbortError') console.error('useProgress load error:', e); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [unitId, toolId, token]);

  const record = useCallback(async (exerciseId, correct, opts = {}) => {
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
      const res = await api.post('/api/progress', {
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