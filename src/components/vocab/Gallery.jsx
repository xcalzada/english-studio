import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Eye, Play, Square } from 'lucide-react';
import { speech } from '../../utils/speech';

export const Gallery = React.memo(({ vocab }) => {
  const [playing,  setPlaying]  = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);

  if (!vocab?.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">📭</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No vocabulary yet</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no words to study.</p>
    </div>
  );

  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) { speech.cancel(); return; }
    indexRef.current = 0;

    const next = () => {
      if (indexRef.current >= vocab.length) { setAutoPlay(false); setPlaying(null); return; }
      const item = vocab[indexRef.current];
      setPlaying(item.id);
      speech.speak(item.word, {
        rate: 0.8,
        onEnd: () => { setPlaying(null); indexRef.current++; timerRef.current = setTimeout(next, 900); },
      });
    };
    next();
    return () => { speech.cancel(); clearTimeout(timerRef.current); };
  }, [autoPlay, vocab]);

  const handleSpeak = useCallback((item) => {
    if (autoPlay) return;
    setPlaying(item.id);
    speech.speak(item.word, { rate: 0.8, onEnd: () => setPlaying(null) });
  }, [autoPlay]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl item-surface">
        <div className="flex items-center gap-2">
          <Eye size={16} style={{ color: 'var(--c0)' }} />
          <span className="font-black uppercase text-xs tracking-widest" style={{ color: 'var(--text-2)' }}>{vocab.length} words · click to hear</span>
        </div>
        <button onClick={() => setAutoPlay(p => !p)} className={autoPlay ? 'btn-ghost' : 'btn-tool'}
          style={autoPlay ? { color: 'var(--fail-text)', background: 'var(--fail-bg)', borderColor: 'var(--fail-border)' } : {}}>
          {autoPlay ? <><Square size={13} fill="currentColor" /> Stop</> : <><Play size={13} fill="currentColor" /> Listen All</>}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocab.map(item => {
          const active = playing === item.id;
          return (
            <div key={item.id} onClick={() => handleSpeak(item)}
              className="card-tool p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300"
              style={active ? { borderColor: 'var(--c0)', boxShadow: '0 0 0 3px var(--cg)', transform: 'scale(1.02)' } : {}}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid var(--c3)', color: '#fff' }}>
                  {item.span}
                </span>
                <div className="p-2 rounded-xl border-2 transition-all"
                  style={active ? { background: 'var(--c0)', borderColor: 'var(--c0)', color: '#fff' } : { background: 'rgba(255,255,255,0.10)', borderColor: 'var(--c3)', color: 'var(--c0)' }}>
                  <Volume2 size={16} className={active ? 'animate-pulse' : ''} />
                </div>
              </div>
              <p className={`font-black text-3xl tracking-tight transition-colors ${active ? '' : 'text-white'}`}
                style={active ? { color: 'var(--c0)' } : {}}>
                {item.word}
              </p>
              {active && (
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-1 rounded-full animate-bounce"
                      style={{ background: 'var(--c0)', height: `${8 + (i % 3) * 6}px`, animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Gallery;
