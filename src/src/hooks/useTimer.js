import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(limitSeconds = 300) {
  const [seconds,  setSeconds]  = useState(0);
  const [active,   setActive]   = useState(false);
  const [limit,    setLimit]    = useState(limitSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 >= limit) { setActive(false); return limit; }
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [active, limit]);

  const start  = useCallback(() => setActive(true),  []);
  const pause  = useCallback(() => setActive(false), []);
  const reset  = useCallback(() => { setActive(false); setSeconds(0); }, []);
  const setLimitAndReset = useCallback(s => { setLimit(s); setActive(false); setSeconds(0); }, []);

  const remaining = limit - seconds;
  const pct       = (seconds / limit) * 100;
  const done      = seconds >= limit;

  return { seconds, remaining, pct, done, active, limit, start, pause, reset, setLimit: setLimitAndReset };
}
