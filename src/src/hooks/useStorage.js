import { useState, useEffect, useCallback, useRef } from 'react';

export function useStorage(key, defaultValue = '') {
  const [value,  setValue]  = useState(defaultValue);
  const [status, setStatus] = useState('idle');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    window.storage?.get(key)
      .then(r => { if (mounted.current && r) setValue(r.value); })
      .catch(() => {});
  }, [key]);

  const save = useCallback(async (val) => {
    try {
      await window.storage.set(key, val);
      if (mounted.current) setStatus('saved');
    } catch {
      if (mounted.current) setStatus('error');
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
