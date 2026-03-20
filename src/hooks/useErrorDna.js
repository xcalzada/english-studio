import { useState, useEffect } from 'react';

export function useErrorDna(token) {
  const [dna,     setDna]     = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoading(true);

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch('/api/error-dna',         { headers, signal: controller.signal }).then(r => r.json()),
      fetch('/api/error-dna/history', { headers, signal: controller.signal }).then(r => r.json()),
    ])
      .then(([dnaData, histData]) => {
        if (controller.signal.aborted) return;
        setDna(dnaData.dna ?? null);
        setHistory(histData);
      })
      .catch(e => { if (e.name !== 'AbortError') console.error('useErrorDna:', e); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [token]);

  return { dna, history, loading };
}