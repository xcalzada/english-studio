import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, Unlock, RotateCcw, Lightbulb } from 'lucide-react';
import { normalize } from '../../utils/normalize';

// ── Shared UI ─────────────────────────────────────────────────────
const HintBox = ({ hint }) => {
  if (!hint) return null;
  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-xl"
      style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)' }}>
      <Lightbulb size={13} className="shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
      <p className="text-xs font-semibold leading-snug" style={{ color: '#fbbf24' }}>{hint}</p>
    </div>
  );
};

const HintToggle = ({ hint, locked }) => {
  const [visible, setVisible] = useState(false);
  if (!hint || locked) return null;
  return visible
    ? <HintBox hint={hint} />
    : (
      <button onClick={() => setVisible(true)}
        className="flex items-center gap-1.5 w-fit text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"
        style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)', color: '#fbbf24' }}>
        <Lightbulb size={11} /> Hint
      </button>
    );
};

const StatusBadge = ({ status }) => (
  <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest
    ${status === 'correct' ? 'badge-correct' : status === 'revealed' ? 'badge-revealed' : 'badge-wrong'}`}>
    {status === 'correct'  && <><CheckCircle size={14} /> Correct!</>}
    {status === 'revealed' && <><Unlock      size={14} /> Revealed</>}
    {status === 'wrong'    && <><XCircle     size={14} /> Wrong</>}
  </div>
);

// ── ErrorItem ─────────────────────────────────────────────────────
export const ErrorItem = React.memo(({ item, onResult, savedResult }) => {
  const initialInput  = savedResult !== undefined ? item.ans : '';
  const initialStatus = savedResult === true ? 'correct' : savedResult === false ? 'wrong' : null;

  const [input,  setInput]  = useState(initialInput);
  const [status, setStatus] = useState(initialStatus);
  const locked = !!status;

  const check = useCallback(() => {
    // 1. Dividimos la respuesta del JSON por el símbolo "|"
    // 2. Quitamos espacios sobrantes con .trim()
    const possibleAnswers = item.ans.split('|').map(a => normalize(a.trim()));
    
    // 3. Vemos si lo que escribió el usuario está en esa lista
    const ok = possibleAnswers.includes(normalize(input.trim()));
    
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [input, item.ans, onResult]);

  const reveal = useCallback(() => {
    setInput(item.ans);
    setStatus('revealed');
    onResult(false);
  }, [item.ans, onResult]);

  return (
    <div className="space-y-3">
      <div className="badge-wrong p-3 rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--fail-text)' }}>
          🔍 Find and fix the error:
        </p>
        <p className="text-base font-bold text-white" dangerouslySetInnerHTML={{ __html: item.q }} />
      </div>
      <HintToggle hint={item.hint} locked={locked} />
      <div className="flex items-center gap-2">
        <input
          disabled={locked} value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !locked) check(); }}
          placeholder="Write the correct sentence…"
          aria-label="Corrected sentence"
          className="input-base flex-1"
          style={status ? { borderColor: status === 'correct' ? 'var(--ok-border)' : status === 'revealed' ? 'var(--warn-border)' : 'var(--fail-border)' } : {}}
        />
        <div className="flex gap-2 shrink-0">
          {!locked
            ? <>
                <button onClick={check} disabled={!input.trim()} className="btn-tool px-5 py-3 disabled:opacity-30">Check</button>
                <button onClick={reveal} className="btn-ghost px-4 py-3">Reveal</button>
                <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block"
                  style={{ color: 'var(--text-3)' }}>↵ Enter</span>
              </>
            : <StatusBadge status={status} />}
        </div>
      </div>
    </div>
  );
});

// ── OrderItem ─────────────────────────────────────────────────────
export const OrderItem = React.memo(({ item, onResult, savedResult }) => {
  // Si savedResult está definido, mostramos directamente la respuesta correcta bloqueada
  const initialChosen = savedResult !== undefined
    ? item.ans.split(' ').map((w, i) => ({ w, i, used: true }))
    : [];
  const initialAvailable = savedResult !== undefined
    ? item.words.map((w, i) => ({ w, i, used: true }))
    : item.words.map((w, i) => ({ w, i, used: false }));
  const initialStatus = savedResult === true ? 'correct' : savedResult === false ? 'wrong' : null;

  const [available, setAvailable] = useState(initialAvailable);
  const [chosen,    setChosen]    = useState(initialChosen);
  const [status,    setStatus]    = useState(initialStatus);
  const locked = !!status;

  const pick = useCallback(t => {
    if (locked || t.used) return;
    setAvailable(p => p.map(x => x.i === t.i ? { ...x, used: true } : x));
    setChosen(p => [...p, t]);
  }, [locked]);

  const unpick = useCallback(t => {
    if (locked) return;
    setChosen(p => p.filter(x => x.i !== t.i));
    setAvailable(p => p.map(x => x.i === t.i ? { ...x, used: false } : x));
  }, [locked]);

  const check = useCallback(() => {
    const ok = normalize(chosen.map(t => t.w).join(' ')) === normalize(item.ans);
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [chosen, item.ans, onResult]);

  const reset = useCallback(() => {
    setAvailable(item.words.map((w, i) => ({ w, i, used: false })));
    setChosen([]);
    setStatus(null);
  }, [item.words]);

  const borderColor = status === 'correct' ? 'var(--ok-border)'
                    : status === 'wrong'   ? 'var(--fail-border)'
                    : 'var(--c3)';

  return (
    <div className="space-y-3">
      <HintToggle hint={item.hint} locked={locked} />

      {/* Sentence builder */}
      <div className="min-h-[56px] flex flex-wrap gap-2 p-3 rounded-2xl border-2 transition-all"
        style={{ background: 'rgba(255,255,255,0.08)', borderColor }}>
        {chosen.length === 0 && (
          <span className="text-sm italic self-center pl-1" style={{ color: 'var(--text-3)' }}>
            👆 Tap words to build your sentence…
          </span>
        )}
        {chosen.map(t => (
          <button key={t.i} onClick={() => unpick(t)} disabled={locked}
            className="px-3 py-1.5 rounded-xl font-bold text-sm text-white transition-all"
            style={{ background: 'var(--c0)', border: '2px solid var(--c3)' }}>
            {t.w}
          </button>
        ))}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        {available.map(t => (
          <button key={t.i} onClick={() => pick(t)} disabled={t.used || locked}
            className={`px-3 py-1.5 rounded-xl border-2 font-bold text-sm transition-all ${t.used ? 'opacity-20 cursor-not-allowed' : ''}`}
            style={!t.used ? { background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.22)', color: '#fff' } : {}}>
            {t.w}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!locked
          ? <>
              <button onClick={check} disabled={chosen.length === 0} className="btn-tool disabled:opacity-30">Check</button>
              <button onClick={reset} className="btn-ghost">Reset</button>
            </>
          : <div className="flex items-center gap-3">
              <StatusBadge status={status} />
              {status !== 'correct' && (
                <button onClick={reset}
                  className="text-[10px] font-black uppercase flex items-center gap-1 transition-colors"
                  style={{ color: 'var(--text-3)' }}>
                  <RotateCcw size={11} /> Try again
                </button>
              )}
            </div>}
      </div>
    </div>
  );
});