import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import { RenderItem } from './TheoryRenderers';

export const RuleCards = React.memo(({ theory, onComplete }) => {
  const blocks  = Object.entries(theory || {});
  const total   = blocks.length;
  const [idx, setIdx]        = useState(0);
  const [confirmed, setConf] = useState({});

  const [key, block] = blocks[idx] || ['', {}];
  const isConfirmed  = !!confirmed[key];
  const allDone      = blocks.every(([k]) => confirmed[k]);

  const confirm = useCallback(() => {
    setConf(p => ({ ...p, [key]: true }));
  }, [key]);

  const goNext = useCallback(() => {
    if (idx < total - 1) setIdx(i => i + 1);
    else if (allDone) onComplete?.();
  }, [idx, total, allDone, onComplete]);

  const goPrev = useCallback(() => setIdx(i => Math.max(0, i - 1)), []);

  // FIX: was returning null — blocked ActiveGrammarLab flow and showed nothing to user
  if (!blocks.length) return (
    <div className="card-tool p-10 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">📭</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No theory blocks</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no theory content yet.</p>
      {onComplete && (
        <button onClick={onComplete} className="btn-tool flex items-center gap-2 mt-2">
          <CheckCircle size={16} /> Continue to Practice
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <BookOpen size={16} style={{ color: 'var(--c0)', flexShrink: 0 }} />
        <div className="flex-1 flex gap-2">
          {blocks.map(([k], i) => (
            <button key={k} onClick={() => setIdx(i)} title={blocks[i][1].title}
              className="flex-1 h-2 rounded-full transition-all"
              style={{
                background: confirmed[k] ? 'var(--c0)' : i === idx ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.12)',
              }} />
          ))}
        </div>
        <span className="text-xs font-black text-white shrink-0">
          {idx + 1}<span style={{ color: 'var(--text-3)' }}>/{total}</span>
        </span>
      </div>

      {/* Block title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
          style={{ background: isConfirmed ? 'var(--c0)' : 'rgba(255,255,255,0.12)', color: '#fff' }}>
          {isConfirmed ? <CheckCircle size={18} /> : idx + 1}
        </div>
        <h2 className="font-black text-white text-base leading-tight">{block.title}</h2>
      </div>

      {/* Content */}
      <div className="card-tool p-5 md:p-8 space-y-4">
        {(block.content || []).map((item, i) => (
          <RenderItem key={i} item={item} />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button onClick={goPrev} disabled={idx === 0}
          className="btn-ghost flex items-center gap-2 px-4 py-2.5 text-sm disabled:opacity-30">
          <ChevronLeft size={16} /> Back
        </button>

        {!isConfirmed ? (
          <button onClick={confirm}
            className="btn-tool flex-1 flex items-center justify-center gap-2 py-3 font-black text-sm">
            <CheckCircle size={18} /> Got it — I understand this unit
          </button>
        ) : (
          <button onClick={goNext}
            className="btn-tool flex-1 flex items-center justify-center gap-2 py-3 font-black text-sm">
            {idx < total - 1 ? <><ChevronRight size={18} /> Next unit</> : allDone ? <><CheckCircle size={18} /> Start Practice</> : <><ChevronRight size={18} /> Next unit</>}
          </button>
        )}
      </div>

      {/* All done CTA */}
      {allDone && idx === total - 1 && (
        <div className="rounded-2xl p-5 text-center animate-in zoom-in"
          style={{ background: 'rgba(var(--c0-rgb, 99,102,241),0.15)', border: '2px solid var(--c0)' }}>
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-black text-white text-sm mb-3">
            You've studied all {total} units — time to practice!
          </p>
          <button onClick={onComplete}
            className="btn-tool mx-auto flex items-center gap-2 px-8 py-3 text-sm font-black">
            <CheckCircle size={18} /> Start Practice
          </button>
        </div>
      )}
    </div>
  );
});

export default RuleCards;
