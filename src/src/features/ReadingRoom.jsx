import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp, Lightbulb, Clock } from 'lucide-react';
import { normalize } from '../utils/normalize';

const NoReading = () => (
  <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
    <span className="text-5xl">📖</span>
    <p className="font-black text-white text-lg uppercase tracking-tight">No reading content</p>
    <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
      This unit has no reading passage yet.
    </p>
  </div>
);

const ReadingTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [active,  setActive]  = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (active) ref.current = setInterval(() => setSeconds(s => s + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [active]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl item-surface cursor-pointer"
      onClick={() => setActive(p => !p)}>
      <Clock size={13} style={{ color: active ? 'var(--ok-border)' : 'var(--text-3)' }} />
      <span className="text-xs font-black tabular-nums" style={{ color: active ? 'var(--text-2)' : 'var(--text-3)' }}>
        {fmt(seconds)}
      </span>
    </div>
  );
};

const Passage = React.memo(({ passage, title, source }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="card-tool overflow-hidden">
      <button onClick={() => setExpanded(p => !p)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <BookOpen size={16} style={{ color: 'var(--c0)' }} />
          </div>
          <div>
            <p className="font-black text-white text-sm">{title || 'Reading Passage'}</p>
            {source && <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>{source}</p>}
          </div>
        </div>
        <span style={{ color: 'var(--text-3)' }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {expanded && (
        <div className="px-6 pb-6 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="prose max-w-none">
            {passage.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-[1.9] mb-4 last:mb-0 font-medium"
                style={{ color: 'rgba(255,255,255,0.82)' }}>
                {para.trim()}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const MCQuestion = React.memo(({ item, idx, onResult }) => {
  const [selected, setSelected] = useState(null);
  const locked = selected !== null;

  const choose = useCallback(opt => {
    if (locked) return;
    setSelected(opt);
    onResult(normalize(opt) === normalize(item.ans));
  }, [locked, item.ans, onResult]);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 text-white"
          style={{ background: 'var(--c0)', minWidth: 28 }}>{idx + 1}</span>
        <p className="text-base font-bold text-white leading-snug pt-0.5">{item.q}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-10">
        {item.options.map(opt => {
          const isCorrect  = normalize(opt) === normalize(item.ans);
          const isSelected = selected === opt;
          let cls = 'p-3 rounded-xl border text-sm font-semibold text-left transition-all flex items-center gap-2 ';
          if (locked && isCorrect)                cls += 'badge-correct';
          else if (locked && isSelected)          cls += 'badge-wrong';
          else if (locked)                        cls += 'item-surface opacity-40';
          else                                    cls += 'item-surface hover:bg-white/10 cursor-pointer';
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={locked} className={cls}>
              {locked && isCorrect                && <CheckCircle size={14} className="shrink-0" />}
              {locked && isSelected && !isCorrect && <XCircle     size={14} className="shrink-0" />}
              {opt}
            </button>
          );
        })}
      </div>
      {locked && item.explanation && (
        <div className="ml-10 px-4 py-2.5 rounded-xl item-surface">
          <p className="text-xs font-semibold italic" style={{ color: 'var(--text-3)' }}>💡 {item.explanation}</p>
        </div>
      )}
    </div>
  );
});

const SAQuestion = React.memo(({ item, idx, onResult }) => {
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState(null);
  const locked = !!status;

  const check = useCallback(() => {
    if (!input.trim()) return;
    const answers = item.ans.split('|').map(a => normalize(a));
    const ok = answers.some(a => normalize(input).includes(a) || a.includes(normalize(input)));
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [input, item.ans, onResult]);

  const reveal = useCallback(() => {
    setInput(item.ans.split('|')[0]);
    setStatus('revealed');
    onResult(false);
  }, [item.ans, onResult]);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 text-white"
          style={{ background: 'var(--c0)', minWidth: 28 }}>{idx + 1}</span>
        <p className="text-base font-bold text-white leading-snug pt-0.5">{item.q}</p>
      </div>
      <div className="pl-10 flex gap-2">
        <input value={input} disabled={locked} placeholder="Your answer…"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !locked) check(); }}
          aria-label="Short answer" className="input-base flex-1 text-sm"
          style={status ? { borderColor: status === 'correct' ? 'var(--ok-border)' : status === 'revealed' ? 'var(--warn-border)' : 'var(--fail-border)' } : {}} />
        {!locked
          ? <><button onClick={check} disabled={!input.trim()} className="btn-tool disabled:opacity-30">Check</button>
               <button onClick={reveal} className="btn-ghost">Reveal</button></>
          : (
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-black uppercase text-xs tracking-widest whitespace-nowrap
              ${status === 'correct' ? 'badge-correct' : status === 'revealed' ? 'badge-revealed' : 'badge-wrong'}`}>
              {status === 'correct'  && <><CheckCircle size={13} /> Correct!</>}
              {status === 'revealed' && <><Lightbulb   size={13} /> Revealed</>}
              {status === 'wrong'    && <><XCircle     size={13} /> Wrong</>}
            </div>
          )}
      </div>
      {locked && status !== 'correct' && (
        <div className="ml-10 px-4 py-2.5 rounded-xl badge-revealed">
          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--warn-text)' }}>Model answer:</p>
          <p className="text-sm font-semibold">{item.ans.split('|')[0]}</p>
        </div>
      )}
    </div>
  );
});

const Questions = ({ questions, onScore }) => {
  const [results, setResults] = useState({});
  const [key,     setKey]     = useState(0);

  const handleResult = useCallback((id, ok) => {
    setResults(p => { if (p[id] !== undefined) return p; onScore(ok); return { ...p, [id]: ok }; });
  }, [onScore]);

  const restart  = useCallback(() => { setResults({}); setKey(k => k + 1); }, []);
  const score    = Object.values(results).filter(Boolean).length;
  const checked  = Object.keys(results).length;
  const allDone  = checked === questions.length && questions.length > 0;

  return (
    <div className="card-tool p-6 md:p-8">
      <div className="flex items-center justify-between mb-8 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="display-font text-2xl text-white">Comprehension</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full item-surface" style={{ color: 'var(--text-3)' }}>
            {checked}/{questions.length}
          </span>
          {allDone && <button onClick={restart} className="btn-ghost flex items-center gap-1.5 text-xs"><RotateCcw size={12} /> Retry</button>}
        </div>
      </div>
      <div key={key} className="space-y-8">
        {questions.map((q, idx) => (
          <div key={q.id} className="pb-8 last:pb-0"
            style={{ borderBottom: idx < questions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            {q.type === 'mc' || !q.type
              ? <MCQuestion item={q} idx={idx} onResult={ok => handleResult(q.id, ok)} />
              : <SAQuestion item={q} idx={idx} onResult={ok => handleResult(q.id, ok)} />}
          </div>
        ))}
      </div>
      {allDone && (
        <div className={`mt-8 p-8 rounded-2xl border text-center animate-in zoom-in
          ${score === questions.length ? 'badge-correct' : score >= questions.length * 0.6 ? '' : 'badge-wrong'}`}
          style={score >= questions.length * 0.6 && score < questions.length
            ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' } : {}}>
          <p className="text-5xl mb-3">{score === questions.length ? '🏆' : score >= questions.length * 0.6 ? '📚' : '🔄'}</p>
          <p className="text-5xl font-black text-white mb-1">{score}<span className="text-xl opacity-50">/{questions.length}</span></p>
          <p className="font-bold text-sm mt-1" style={{ color: 'var(--text-3)' }}>{Math.round((score / questions.length) * 100)}% comprehension</p>
        </div>
      )}
    </div>
  );
};

const ReadingRoom = ({ data }) => {
  const reading = data?.reading;
  const [totalScore, setTotalScore] = useState(0);
  const handleScore = useCallback(ok => { if (ok) setTotalScore(s => s + 1); }, []);

  if (!reading) return <NoReading />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="display-font text-3xl text-white leading-none">Reading Room</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-3)' }}>Read the passage, then answer the questions</p>
        </div>
        <ReadingTimer />
      </div>
      <Passage passage={reading.passage} title={reading.title} source={reading.source} />
      {reading.questions?.length > 0 && <Questions questions={reading.questions} onScore={handleScore} />}
    </div>
  );
};

export default ReadingRoom;
