import React, { useState, useCallback, useId } from 'react';
import { CheckCircle, XCircle, Unlock, Languages, Lightbulb } from 'lucide-react';
import { normalize } from '../../utils/normalize';

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
      <button
        onClick={() => setVisible(true)}
        className="flex items-center gap-1.5 w-fit text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"
        style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)', color: '#fbbf24' }}>
        <Lightbulb size={11} /> Hint
      </button>
    );
};

const isCorrect = (input, ans) => {
  const cleaned = normalize(input);
  return ans.split('|').map(a => normalize(a.trim())).some(a => a === cleaned);
};

export const TranslateItem = React.memo(({ item, onResult }) => {
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState(null);
  const id = useId();
  const locked = !!status;

  const check = useCallback(() => {
    if (!input.trim()) return;
    const ok = isCorrect(input, item.ans);
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [input, item.ans, onResult]);

  const reveal = useCallback(() => {
    setInput(item.ans.split('|')[0].trim());
    setStatus('revealed');
    onResult(false);
  }, [item.ans, onResult]);

  const borderColor = status === 'correct' ? 'var(--ok-border)' : status === 'revealed' ? 'var(--warn-border)' : status === 'wrong' ? 'var(--fail-border)' : 'var(--c3)';

  return (
    <div className="space-y-3">
      <div className="flex gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)' }}>
        <Languages size={18} style={{ color: 'var(--c0)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--c0)' }}>🇪🇸 Translate to English:</p>
          <p className="text-xl font-black text-white leading-snug">{item.q}</p>
        </div>
      </div>
      <HintToggle hint={item.hint} locked={locked} />
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>🇬🇧</span>
          <input
            id={id} disabled={locked} value={input}
            placeholder="Write in English…" aria-label="English translation"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !locked) check(); }}
            className="input-base pl-10"
            style={status ? { borderColor } : {}}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {!locked
            ? <><button onClick={check}  className="btn-tool">Check</button>
                 <button onClick={reveal} className="btn-ghost">Reveal</button>
                 <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block"
                   style={{ color: 'var(--text-3)' }}>↵ Enter</span></>
            : (
              <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest
                ${status === 'correct' ? 'badge-correct' : status === 'revealed' ? 'badge-revealed' : 'badge-wrong'}`}>
                {status === 'correct'  && <><CheckCircle size={14} /> Correct!</>}
                {status === 'revealed' && <><Unlock      size={14} /> Revealed</>}
                {status === 'wrong'    && <><XCircle     size={14} /> Wrong</>}
              </div>
            )}
        </div>
      </div>

      {locked && status !== 'correct' && (
        <div className="px-4 py-3 rounded-xl animate-in slide-in-from-top-2 badge-revealed">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--warn-text)' }}>Accepted answers:</p>
          <p className="font-black text-base">{item.ans.split('|').join(' / ')}</p>
        </div>
      )}
    </div>
  );
});

export default TranslateItem;