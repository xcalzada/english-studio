import { useState, useEffect, useCallback } from 'react';

/**
 * useSR — Spaced Repetition hook
 *
 * Devuelve el estado SR de cada ejercicio y una función para ordenar
 * el quiz priorizando los que toca repasar hoy.
 *
 * Orden de prioridad:
 *   1. Fallados (correct_streak = 0, ya vistos)
 *   2. Due today (next_review <= hoy)
 *   3. No vistos nunca
 *   4. Aprendidos (next_review > hoy) — al final
 */
export function useSR(unitId, toolId, token) {
  const [items,   setItems]   = useState({}); // { [exerciseId]: { correct_streak, due_today, ... } }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!unitId || !toolId || !token) return;
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/sr?unit_id=${unitId}&tool_id=${toolId}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal:  controller.signal,
    })
      .then(r => r.json())
      .then(data => { if (!controller.signal.aborted) setItems(data.items ?? {}); })
      .catch(e  => { if (e.name !== 'AbortError') console.error('useSR:', e); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [unitId, toolId, token]);

  // Ordenar quiz según prioridad SR
  const sortQuiz = useCallback((quiz) => {
    const priority = (item) => {
      const sr = items[item.id];
      if (!sr) return 2;                          // nunca visto → prioridad media
      if (sr.correct_streak === 0) return 0;      // fallado → primero
      if (sr.due_today)            return 1;      // toca hoy → segundo
      return 3;                                   // aprendido → al final
    };
    return [...quiz].sort((a, b) => priority(a) - priority(b));
  }, [items]);

  // Registrar respuesta en servidor
  const record = useCallback(async (exerciseId, correct, { xp = 0, streak = 0 } = {}) => {
    if (!token) return;
    try {
      const res = await fetch('/api/sr', {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit_id: unitId, tool_id: toolId, exercise_id: exerciseId, correct, xp, streak }),
      });
      const data = await res.json();
      if (data.sr) {
        setItems(prev => ({
          ...prev,
          [exerciseId]: {
            correct_streak: data.sr.correct_streak,
            next_review:    data.sr.next_review,
            due_today:      data.sr.due_today,
            total_attempts: (prev[exerciseId]?.total_attempts ?? 0) + 1,
          },
        }));
      }
    } catch (e) {
      console.error('useSR record:', e);
    }
  }, [unitId, toolId, token]);

  return { items, loading, sortQuiz, record };
}