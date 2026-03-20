import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp, Lightbulb, Clock } from 'lucide-react';

const normalize = s => s.trim().toLowerCase()
  .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e')
  .replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u')
  .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();

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
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
      onClick={() => setActive(p => !p)}>
      <Clock size={13} style={{ color: active ? '#4ade80' : 'var(--text-3)' }} />
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
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ borderBottom: expanded ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
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
        <div className="px-6 pb-6 pt-4">
          <div className="space-y-4">
            {passage.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-[1.9] font-medium"
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
          let style = {
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'var(--text-2)',
            opacity: 1,
          };
          if (locked && isCorrect)                style = { background: 'rgba(74,222,128,0.12)', border: '2px solid rgba(74,222,128,0.4)', color: '#4ade80' };
          else if (locked && isSelected)          style = { background: 'rgba(248,113,113,0.12)', border: '2px solid rgba(248,113,113,0.4)', color: '#f87171' };
          else if (locked)                        style = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-3)', opacity: 0.5 };
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={locked}
              className="p-3 rounded-xl text-sm font-semibold text-left transition-all flex items-center gap-2"
              style={style}>
              {locked && isCorrect                && <CheckCircle size={14} className="shrink-0" />}
              {locked && isSelected && !isCorrect && <XCircle     size={14} className="shrink-0" />}
              {opt}
            </button>
          );
        })}
      </div>
      {locked && item.explanation && (
        <div className="ml-10 px-4 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '3px solid var(--c0)' }}>
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
    const ok = answers.some(a => normalize(input).includes(a));
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [input, item.ans, onResult]);

  const reveal = useCallback(() => {
    setInput(item.ans.split('|')[0]);
    setStatus('revealed');
    onResult(false);
  }, [item.ans, onResult]);

  const borderColor = !status ? 'rgba(255,255,255,0.15)'
    : status === 'correct'  ? 'rgba(74,222,128,0.4)'
    : status === 'revealed' ? 'rgba(251,191,36,0.4)'
    : 'rgba(248,113,113,0.4)';

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
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', border: `2px solid ${borderColor}` }} />
        {!locked ? (
          <>
            <button onClick={check} disabled={!input.trim()} className="btn-tool disabled:opacity-30">Check</button>
            <button onClick={reveal}
              className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-3)' }}>
              Reveal
            </button>
          </>
        ) : (
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-black uppercase text-xs tracking-widest whitespace-nowrap
            ${status === 'correct' ? 'badge-correct' : status === 'revealed' ? '' : 'badge-wrong'}`}
            style={status === 'revealed' ? { background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' } : {}}>
            {status === 'correct'  && <><CheckCircle size={13} /> Correct!</>}
            {status === 'revealed' && <><Lightbulb   size={13} /> Revealed</>}
            {status === 'wrong'    && <><XCircle     size={13} /> Wrong</>}
          </div>
        )}
      </div>
      {locked && status !== 'correct' && (
        <div className="ml-10 px-4 py-2.5 rounded-xl"
          style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#fbbf24' }}>Model answer:</p>
          <p className="text-sm font-semibold text-white">{item.ans.split('|')[0]}</p>
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

  const restart = useCallback(() => { setResults({}); setKey(k => k + 1); }, []);
  const score   = Object.values(results).filter(Boolean).length;
  const checked = Object.keys(results).length;
  const allDone = checked === questions.length && questions.length > 0;

  return (
    <div className="card-tool p-6 md:p-8">
      <div className="flex items-center justify-between mb-8 pb-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="display-font text-2xl text-white">Comprehension</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-3)' }}>
            {checked}/{questions.length}
          </span>
          {allDone && (
            <button onClick={restart}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-3)' }}>
              <RotateCcw size={12} /> Retry
            </button>
          )}
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
          ${score === questions.length ? 'badge-correct' : score < questions.length * 0.6 ? 'badge-wrong' : ''}`}
          style={score >= questions.length * 0.6 && score < questions.length
            ? { background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)' } : {}}>
          <p className="text-5xl mb-3">{score === questions.length ? '🏆' : score >= questions.length * 0.6 ? '📚' : '🔄'}</p>
          <p className="text-5xl font-black text-white mb-1">
            {score}<span className="text-xl opacity-50">/{questions.length}</span>
          </p>
          <p className="font-bold text-sm mt-1" style={{ color: 'var(--text-3)' }}>
            {Math.round((score / questions.length) * 100)}% comprehension
          </p>
        </div>
      )}
    </div>
  );
};

const ReadingLab = ({ data }) => {
  const reading = data?.reading;
  const [totalScore, setTotalScore] = useState(0);
  const handleScore = useCallback(ok => { if (ok) setTotalScore(s => s + 1); }, []);

  if (!reading) return <NoReading />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="display-font text-3xl text-white leading-none">Reading Lab</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-3)' }}>
            Read the passage, then answer the questions
          </p>
        </div>
        <ReadingTimer />
      </div>
      <Passage passage={reading.passage} title={reading.title} source={reading.source} />
      {reading.questions?.length > 0 && <Questions questions={reading.questions} onScore={handleScore} />}
    </div>
  );
};

export default ReadingLab;