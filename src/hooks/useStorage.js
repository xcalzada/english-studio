import { useState, useEffect, useCallback } from 'react';

export function useStorage(key, defaultValue = '') {
  const [value,  setValue]  = useState(defaultValue);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let alive = true;                              // FIX: local flag per effect, no shared ref
    window.storage?.get(key)
      .then(r => { if (alive && r) setValue(r.value); })
      .catch(() => {});
    return () => { alive = false; };
  }, [key]);

  const save = useCallback(async (val) => {
    try {
      await window.storage.set(key, val);
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }, [key]);

  const remove = useCallback(async () => {
    try { await window.storage.delete(key); } catch {}
  }, [key]);

  return { value, setValue, save, remove, status };
}

export function useStorageJSON(key, defaultValue) {
  const { value, setValue, save: rawSave, remove, status } = useStorage(key, null);

  const parsed = (() => {
    try { return value ? JSON.parse(value) : defaultValue; } catch { return defaultValue; }
  })();

  const save = useCallback((val) => rawSave(JSON.stringify(val)), [rawSave]);

  return { value: parsed, setValue, save, remove, status };
}
