import React, { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Trophy, Zap, Clock } from 'lucide-react';

const shuffled = arr => [...arr].sort(() => Math.random() - 0.5);

const buildCards = (vocab) => {
  const pairs = vocab.slice(0, 8);
  return shuffled([
    ...pairs.map(v => ({ id: `en-${v.id}`, text: v.word, pairId: v.id, lang: 'en' })),
    ...pairs.map(v => ({ id: `es-${v.id}`, text: v.span, pairId: v.id, lang: 'es' })),
  ]);
};

export const MatchGame = React.memo(({ vocab }) => {
  if (!vocab?.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">📭</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No vocabulary yet</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no words to match.</p>
    </div>
  );

  const [cards,    setCards]    = useState(() => buildCards(vocab));
  const [selected, setSelected] = useState([]);
  const [matched,  setMatched]  = useState(new Set());
  const [wrong,    setWrong]    = useState([]);
  const [moves,    setMoves]    = useState(0);
  const [seconds,  setSeconds]  = useState(0);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const pick = useCallback((card) => {
    if (matched.has(card.id) || wrong.includes(card.id)) return;
    if (selected.find(c => c.id === card.id)) return;
    if (selected.length === 2) return;

    const next = [...selected, card];
    setSelected(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next;
      if (a.pairId === b.pairId && a.lang !== b.lang) {
        const newMatched = new Set([...matched, a.id, b.id]);
        setMatched(newMatched);
        setSelected([]);
        if (newMatched.size === cards.length) setDone(true);
      } else {
        setWrong([a.id, b.id]);
        setTimeout(() => { setSelected([]); setWrong([]); }, 700);
      }
    }
  }, [selected, matched, wrong, cards.length]);

  const restart = useCallback(() => {
    setCards(buildCards(vocab)); setSelected([]); setMatched(new Set());
    setWrong([]); setMoves(0); setSeconds(0); setDone(false);
  }, [vocab]);

  const getState = (card) => {
    if (matched.has(card.id))  return 'matched';
    if (wrong.includes(card.id)) return 'wrong';
    if (selected.find(c => c.id === card.id)) return 'selected';
    return 'idle';
  };

  const clsMap = {
    matched:  'badge-correct cursor-default opacity-60 scale-95',
    wrong:    'badge-wrong animate-pulse',
    selected: 'item-surface border-[var(--c0)] scale-105 shadow-[0_0_0_3px_var(--cg)]',
    idle:     'item-surface hover:scale-105 cursor-pointer hover:border-[var(--c3)]',
  };

  if (done) return (
    <div className="flex flex-col items-center gap-8 py-12 animate-in zoom-in">
      <Trophy size={64} style={{ color: 'var(--c0)' }} />
      <h2 className="display-font text-4xl text-white text-center">All Matched! 🎉</h2>
      <div className="flex gap-6">
        <div className="card-tool p-5 text-center">
          <p className="text-3xl font-black text-white">{moves}</p>
          <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>Moves</p>
        </div>
        <div className="card-tool p-5 text-center">
          <p className="text-3xl font-black text-white">{fmt(seconds)}</p>
          <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>Time</p>
        </div>
      </div>
      <button onClick={restart} className="btn-tool flex items-center gap-2"><RotateCcw size={16} /> Play Again</button>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl item-surface">
        <div className="flex items-center gap-2">
          <Zap size={15} style={{ color: 'var(--c0)' }} />
          <span className="font-black uppercase text-xs tracking-widest" style={{ color: 'var(--text-2)' }}>
            {matched.size / 2}/{cards.length / 2} matched
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
            {moves} moves
          </span>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-3)' }}>
            <Clock size={13} />
            <span className="font-black text-xs tabular-nums">{fmt(seconds)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map(card => (
          <button key={card.id} onClick={() => pick(card)}
            className={`p-4 rounded-2xl border-2 font-bold text-sm text-white transition-all ${clsMap[getState(card)]}`}
            style={{ minHeight: 72 }}>
            <span className="block text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">
              {card.lang === 'en' ? '🇬🇧 EN' : '🇪🇸 ES'}
            </span>
            {card.text}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={restart} className="btn-ghost flex items-center gap-2 text-xs">
          <RotateCcw size={12} /> New game
        </button>
      </div>
    </div>
  );
});

export default MatchGame;
