import React, { useState, useCallback } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, RotateCcw, Trophy, Volume2 } from 'lucide-react';
import { speech } from '../../utils/speech';

const shuffled = arr => [...arr].sort(() => Math.random() - 0.5);

export const Flashcards = React.memo(({ vocab }) => {
  const [deck,     setDeck]     = useState(() => shuffled(vocab || []));
  const [index,    setIndex]    = useState(0);
  const [flipped,  setFlipped]  = useState(false);
  const [known,    setKnown]    = useState(() => new Set());
  const [learning, setLearning] = useState(() => new Set());

  React.useEffect(() => () => { speech.cancel(); }, []);

  if (!vocab?.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">📭</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No vocabulary yet</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no words to study.</p>
    </div>
  );

  const card  = deck[index];
  const total = deck.length;

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setIndex(i => Math.min(i + 1, total - 1)), 150);
  }, [total]);

  const restart = useCallback(() => {
    setDeck(shuffled(vocab)); setIndex(0);
    setFlipped(false); setKnown(new Set()); setLearning(new Set());
  }, [vocab]);

  const markKnown = useCallback(() => {
    speech.speak(card.word, { rate: 0.8 });
    setKnown(p => new Set([...p, card.id])); next();
  }, [card, next]);

  const markLearning = useCallback(() => {
    setLearning(p => new Set([...p, card.id])); next();
  }, [card, next]);

  if (known.size + learning.size === total) return (
    <div className="flex flex-col items-center gap-8 py-12 animate-in zoom-in">
      <Trophy size={64} style={{ color: 'var(--c0)' }} />
      <div className="text-center">
        <p className="text-5xl font-black text-white">{Math.round((known.size / total) * 100)}%</p>
        <p className="font-bold uppercase tracking-widest text-xs mt-2" style={{ color: 'var(--text-3)' }}>Known on first pass</p>
      </div>
      <div className="flex gap-6">
        <div className="text-center p-4 px-6 rounded-2xl badge-correct"><p className="text-2xl font-black">{known.size}</p><p className="text-[10px] font-black uppercase tracking-widest mt-1">Known ✓</p></div>
        <div className="text-center p-4 px-6 rounded-2xl badge-revealed"><p className="text-2xl font-black">{learning.size}</p><p className="text-[10px] font-black uppercase tracking-widest mt-1">Studying</p></div>
      </div>
      <button onClick={restart} className="btn-tool flex items-center gap-2"><RotateCcw size={16} /> Again</button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(known.size / total) * 100}%`, background: 'var(--ok-border)' }} />
        </div>
        <span className="text-xs font-black uppercase tracking-widest shrink-0" style={{ color: 'var(--text-3)' }}>{index + 1}/{total}</span>
      </div>
      <div onClick={() => { setFlipped(f => !f); if (!flipped) speech.speak(card.word, { rate: 0.8 }); }}
        className="w-full max-w-lg cursor-pointer select-none" style={{ perspective: '1000px' }}>
        <div className="relative w-full transition-all duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: '260px' }}>
          <div className="absolute inset-0 card-tool rounded-[2rem] flex flex-col items-center justify-center gap-4 p-8"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <p className="text-5xl md:text-6xl font-black text-white tracking-tight text-center">{card.word}</p>
            <div className="flex items-center gap-2" style={{ color: 'var(--c0)' }}>
              <Volume2 size={18} /><span className="text-xs font-black uppercase tracking-widest opacity-70">Tap to flip</span>
            </div>
          </div>
          <div className="absolute inset-0 card-inner rounded-[2rem] flex flex-col items-center justify-center gap-4 p-8"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--c0)' }}>Translation</p>
            <p className="text-5xl md:text-6xl font-black text-white text-center">{card.span}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full max-w-lg">
        <button onClick={() => { setFlipped(false); setTimeout(() => setIndex(i => Math.max(i - 1, 0)), 150); }}
          disabled={index === 0} className="btn-ghost p-3 disabled:opacity-20"><ArrowLeft size={20} /></button>
        <button onClick={markLearning} className="flex-1 btn-ghost flex items-center justify-center gap-2 py-3 badge-revealed">
          <RotateCcw size={15} /> Still learning
        </button>
        <button onClick={markKnown} className="flex-1 btn-ghost flex items-center justify-center gap-2 py-3 badge-correct">
          <CheckCircle size={15} /> Got it!
        </button>
        <button onClick={() => { setFlipped(false); setTimeout(() => setIndex(i => Math.min(i + 1, total - 1)), 150); }}
          disabled={index === total - 1} className="btn-ghost p-3 disabled:opacity-20"><ArrowRight size={20} /></button>
      </div>
    </div>
  );
});

export default Flashcards;
