import { useState, useCallback } from 'react';

export function useStreak() {
  const [streak,    setStreak]    = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score,     setScore]     = useState(0);

  const record = useCallback((correct) => {
    if (correct) {
      setStreak(s => {
        const next = s + 1;
        setMaxStreak(m => Math.max(m, next));
        return next;
      });
      setScore(s => s + 1);
    } else {
      setStreak(0);
    }
  }, []);

  const reset = useCallback(() => {
    setStreak(0); setMaxStreak(0); setScore(0);
  }, []);

  return { streak, maxStreak, score, record, reset };
}
