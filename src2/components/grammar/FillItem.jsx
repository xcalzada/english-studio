import React, { useState, useCallback, useId } from 'react';
import { CheckCircle, XCircle, Unlock } from 'lucide-react';
import { normalize } from '../../utils/normalize';

const StatusBadge = ({ status }) => (
  <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest
    ${status === 'correct' ? 'badge-correct' : status === 'revealed' ? 'badge-revealed' : 'badge-wrong'}`}>
    {status === 'correct'  && <><CheckCircle size={14} /> Correct!</>}
    {status === 'revealed' && <><Unlock      size={14} /> Revealed</>}
    {status === 'wrong'    && <><XCircle     size={14} /> Wrong</>}
  </div>
);

export const FillItem = React.memo(({ item, onResult }) => {
  const [answers, setAnswers] = useState({});
  const [status,  setStatus]  = useState(null);
  const id = useId();

  const check = useCallback(() => {
    const gaps = item.q.split('______').length - 1;
    const list = item.ans.includes(',')
      ? item.ans.split(',').map(s => s.trim().toLowerCase())
      : [item.ans.trim().toLowerCase()];
    let ok = true;
    for (let i = 0; i < gaps; i++) {
      const v = normalize(answers[i]);
      if (!v) { ok = false; break; }
      if (list.length === gaps) { if (v !== list[i]) { ok = false; break; } }
      else if (!list.includes(v)) { ok = false; break; }
    }
    setStatus(ok ? 'correct' : 'wrong');
    onResult(ok);
  }, [answers, item, onResult]);

  const reveal = useCallback(() => {
    const parts = item.ans.includes(',') ? item.ans.split(',') : [item.ans];
    setAnswers(Object.fromEntries(parts.map((p, i) => [i, p.trim()])));
    setStatus('revealed');
    onResult(false);
  }, [item, onResult]);

  const parts  = item.q.split('______');
  const locked = !!status;
  const gaps = parts.length - 1;
  const allFilled = Array.from({ length: gaps }, (_, i) => normalize(answers[i])).every(Boolean);
  const borderColor = status === 'correct' ? 'var(--ok-border)' : status === 'revealed' ? 'var(--warn-border)' : status === 'wrong' ? 'var(--fail-border)' : 'var(--c3)';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-grow text-lg font-bold text-white leading-loose">
        {parts.map((part, pIdx) => (
          <React.Fragment key={pIdx}>
            <span dangerouslySetInnerHTML={{ __html: part }} />
            {pIdx < parts.length - 1 && (
              <input
                id={`${id}-${pIdx}`}
                disabled={locked}
                value={answers[pIdx] || ''}
                placeholder="?"
                aria-label={`Gap ${pIdx + 1}`}
                onChange={e => setAnswers(p => ({ ...p, [pIdx]: e.target.value }))}
                onKeyDown={e => { if (e.key === 'Enter' && !locked) check(); }}
                className="mx-2 inline-block w-32 px-3 py-1 text-center font-black uppercase rounded-xl outline-none text-base"
                style={{ background: 'rgba(255,255,255,0.12)', borderBottom: `4px solid ${borderColor}`, color: '#fff' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="shrink-0 flex gap-2">
        {!locked
          ? <><button onClick={check} disabled={!allFilled} className="btn-tool disabled:opacity-30">Check</button>
               <button onClick={reveal} className="btn-ghost">Reveal</button></>
          : <StatusBadge status={status} />}
      </div>
    </div>
  );
});

export default FillItem;
