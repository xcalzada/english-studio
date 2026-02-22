import React, { useState } from 'react';
import { CheckCircle, Bookmark, Unlock, ArrowRight, AlertTriangle, ChevronRight } from 'lucide-react';

export const RuleCards = React.memo(({ theory, onComplete }) => {
  const [understood, setUnderstood] = useState({});
  const blocks  = Object.entries(theory || {});
  const done    = Object.values(understood).filter(Boolean).length;
  const allDone = blocks.length > 0 && done === blocks.length;

  const toggle = (key) => setUnderstood(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="card-tool p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6" style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
        <span className="card-title">Study the Rules</span>
        <div className="md:ml-auto flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-white">{done}/{blocks.length}</span>
          <div className="flex gap-1">
            {blocks.map(([key]) => (
              <div key={key} className={`w-6 h-2 rounded-full transition-all ${understood[key] ? '' : 'dot-pending'}`}
                style={understood[key] ? { background: 'var(--c0)' } : {}} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map(([key, block]) => {
          const isDone = understood[key];
          return (
            <div key={key} className="rounded-2xl border-2 overflow-hidden transition-all"
              style={{ background: isDone ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)', borderColor: isDone ? 'var(--c0)' : 'rgba(255,255,255,0.20)' }}>
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-2 shrink-0"
                    style={isDone ? { background: 'var(--c0)', borderColor: 'var(--c0)', color: '#fff' } : { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                    {isDone ? <CheckCircle size={16} /> : <Bookmark size={14} />}
                  </div>
                  <p className="font-black text-sm text-white uppercase tracking-wide">{block.title}</p>
                </div>
                <button onClick={() => toggle(key)} className="shrink-0 btn-ghost text-[11px]"
                  style={isDone ? { background: 'rgba(255,255,255,0.10)', borderColor: 'var(--c0)', color: 'var(--c0)' } : {}}>
                  {isDone ? '✓ Got it' : 'Got it!'}
                </button>
              </div>
              <div className={`px-5 pb-4 space-y-2 transition-all ${isDone ? 'opacity-40' : ''}`}>
                {block.content.map((line, i) => (
                  <div key={`${key}-${i}`} className="text-sm px-4 py-2.5 rounded-xl flex gap-3 leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--c0)', flexShrink: 0, marginTop: 2 }}>
                      {typeof line === 'string' && line.includes('❌') ? <AlertTriangle size={14} /> : <ChevronRight size={14} />}
                    </span>
                    {typeof line === 'string'
                      ? <span dangerouslySetInnerHTML={{ __html: line }} />
                      : <span>{line.text || line.en || JSON.stringify(line)}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {allDone && (
        <button onClick={onComplete} className="btn-tool w-full mt-8 flex items-center justify-center gap-3 py-4 text-sm">
          <Unlock size={20} /> Start Practice <ArrowRight size={20} className="animate-pulse" />
        </button>
      )}
    </div>
  );
});

export default RuleCards;
