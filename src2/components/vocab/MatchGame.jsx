import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy, Shuffle, Flame } from 'lucide-react';
import { speech } from '../../utils/speech';
import { useStreak } from '../../hooks/useStreak';

const shuffled = arr => [...arr].sort(() => Math.random() - 0.5);

const EmptyVocab = () => (
  <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
    <span className="text-5xl">📭</span>
    <p className="font-black text-white text-lg uppercase tracking-tight">No vocabulary yet</p>
    <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no words to study.</p>
  </div>
);

export const MatchGame = React.memo(({ vocab }) => {
  if (!vocab?.length || vocab.length < 2) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🃏</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">Not enough words</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>Need at least 2 vocabulary words to play.</p>
    </div>
  );
  const build = useCallback(() => {
    const pool = shuffled(vocab).slice(0, Math.min(5, vocab.length));
    return { pool, left: shuffled(pool.map(v => ({ id: v.id, text: v.word }))), right: shuffled(pool.map(v => ({ id: v.id, text: v.span }))) };
  }, [vocab]);

  const [pairs,    setPairs]    = useState(build);
  const [selected, setSelected] = useState(null);
  const [matched,  setMatched]  = useState(() => new Set());
  const [wrong,    setWrong]    = useState(null);
  const allDone = matched.size === pairs.pool.length;

  const restart = useCallback(() => { setPairs(build()); setSelected(null); setMatched(new Set()); setWrong(null); }, [build]);

  const handleSelect = useCallback((id, side) => {
    if (matched.has(id)) return;
    if (!selected) { setSelected({ id, side }); return; }
    if (selected.id === id && selected.side !== side) {
      speech.speak(pairs.pool.find(v => v.id === id)?.word || '', { rate: 0.8 });
      setMatched(p => new Set([...p, id])); setSelected(null);
    } else if (selected.id === id) {
      setSelected(null);
    } else {
      setWrong(id); setTimeout(() => setWrong(null), 600); setSelected({ id, side });
    }
  }, [matched, selected, pairs.pool]);

  if (allDone) return (
    <div className="text-center py-10 space-y-4 animate-in zoom-in">
      <p className="text-5xl">🎉</p>
      <p className="text-3xl font-black text-white">All matched!</p>
      <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto"><RotateCcw size={16} /> Play Again</button>
    </div>
  );

  const btnStyle = (id, side) => {
    const isMatched = matched.has(id), isSel = selected?.id === id && selected?.side === side, isWrong = wrong === id;
    if (isMatched) return 'badge-correct opacity-60 cursor-default';
    if (isWrong)   return 'badge-wrong scale-95';
    if (isSel)     return 'item-surface border-[var(--c0)] scale-[1.02] shadow-[0_0_0_3px_var(--cg)]';
    return 'item-surface hover:scale-[1.01] cursor-pointer';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Match the pairs — {matched.size}/{pairs.pool.length}</p>
        <button onClick={restart} className="btn-ghost flex items-center gap-1.5 text-xs"><Shuffle size={13} /> Shuffle</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {['left', 'right'].map(side => (
          <div key={side} className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-center mb-2" style={{ color: 'var(--text-3)' }}>{side === 'left' ? 'English' : 'Español'}</p>
            {pairs[side].map(item => (
              <button key={item.id + side} onClick={() => handleSelect(item.id, side)} disabled={matched.has(item.id)}
                className={`w-full p-4 rounded-2xl border-2 font-bold text-sm text-left text-white transition-all ${btnStyle(item.id, side)}`}>
                {matched.has(item.id) && <CheckCircle size={14} className="inline mr-2" />}{item.text}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
