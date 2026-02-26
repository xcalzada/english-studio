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

export const WriteTest = React.memo(({ vocab }) => {
  if (!vocab?.length) return <EmptyVocab />;
  const [deck,    setDeck]    = useState(() => shuffled(vocab));
  const [index,   setIndex]   = useState(0);
  const [input,   setInput]   = useState('');
  const [status,  setStatus]  = useState('idle');
  const [done,    setDone]    = useState(false);
  const { streak, maxStreak, score, record, reset: resetStreak } = useStreak();
  const inputRef = useRef(null);
  const card = deck[index];

  useEffect(() => { inputRef.current?.focus(); }, [index]);

  const check = useCallback(() => {
    if (!input.trim()) return;
    const ok = input.trim().toLowerCase() === card.word.toLowerCase();
    setStatus(ok ? 'correct' : 'wrong');
    if (ok) speech.speak(card.word, { rate: 0.85 });
    record(ok);
  }, [input, card, record]);

  const next = useCallback(() => {
    setInput(''); setStatus('idle');
    if (index + 1 >= deck.length) setDone(true);
    else setIndex(i => i + 1);
  }, [index, deck.length]);

  const restart = useCallback(() => {
    setDeck(shuffled(vocab)); setIndex(0); setInput('');
    setStatus('idle'); setDone(false); resetStreak();
  }, [vocab, resetStreak]);

  const pct = Math.round((score / deck.length) * 100);

  if (done) return (
    <div className="flex flex-col items-center gap-8 py-10 animate-in zoom-in">
      <Trophy size={56} style={{ color: 'var(--c0)' }} />
      <div className="text-center">
        <p className="text-6xl font-black text-white">{pct}<span className="text-2xl opacity-50">%</span></p>
        <p className="font-bold uppercase tracking-widest text-xs mt-2" style={{ color: 'var(--text-3)' }}>{score}/{deck.length} correct</p>
      </div>
      <div className="p-4 px-6 rounded-2xl text-center badge-revealed">
        <p className="text-2xl font-black">{maxStreak}🔥</p>
        <p className="text-[10px] font-black uppercase tracking-widest mt-1">Best streak</p>
      </div>
      <button onClick={restart} className="btn-tool flex items-center gap-2"><RotateCcw size={16} /> Try Again</button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {streak >= 2 && <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-revealed animate-in zoom-in"><Flame size={14} /><span className="font-black text-xs">{streak}🔥</span></div>}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl item-surface">
            <CheckCircle size={14} style={{ color: 'var(--ok-border)' }} />
            <span className="font-black text-xs text-white">{score}/{deck.length}</span>
          </div>
        </div>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{index + 1}/{deck.length}</span>
      </div>

      <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(index / deck.length) * 100}%`, background: 'var(--c0)' }} />
      </div>

      <div className="w-full card-tool p-10 flex flex-col items-center gap-6 border-2 transition-all duration-300"
        style={status !== 'idle' ? { borderColor: status === 'correct' ? 'var(--ok-border)' : 'var(--fail-border)' } : {}}>
        <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--c0)' }}>Translate to English</p>
        <p className="text-5xl font-black text-white text-center">"{card.span}"</p>
        {status === 'idle' ? (
          <div className="w-full relative">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && check()}
              placeholder="Type in English…" autoComplete="off"
              aria-label="English translation"
              className="input-base text-center text-2xl font-black uppercase" />
            <button onClick={check} className="btn-tool absolute right-3 top-1/2 -translate-y-1/2 p-2.5"><ArrowRight size={20} /></button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-3 animate-in zoom-in">
            {status === 'correct'
              ? <div className="flex items-center gap-3 badge-correct p-4 rounded-2xl"><CheckCircle size={32} /><p className="text-3xl font-black uppercase">{card.word}</p></div>
              : <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 badge-wrong p-3 rounded-2xl"><XCircle size={24} /><p className="font-bold text-lg line-through opacity-60">{input}</p></div>
                  <p className="text-2xl font-black text-white">{card.word}</p>
                </div>}
            <button onClick={next} className={`mt-2 btn-ghost flex items-center gap-2 ${status === 'correct' ? 'badge-correct' : ''}`}>Next <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
});
