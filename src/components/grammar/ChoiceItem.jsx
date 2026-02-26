import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { normalize } from '../../utils/normalize';

const HintBox = ({ hint }) => {
  if (!hint) return null;
  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-xl mb-3"
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
        className="flex items-center gap-1.5 w-fit mb-3 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"
        style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)', color: '#fbbf24' }}>
        <Lightbulb size={11} /> Hint
      </button>
    );
};

export const ChoiceItem = React.memo(({ item, onResult }) => {
  const [selected, setSelected] = useState(null);
  const [locked,   setLocked]   = useState(false);

  const choose = useCallback((opt) => {
    if (locked) return;
    setSelected(opt);
    setLocked(true);
    onResult(normalize(opt) === normalize(item.ans));
  }, [locked, item.ans, onResult]);

  return (
    <div className="space-y-3">
      <HintToggle hint={item.hint} locked={locked} />
      <p className="text-lg font-bold text-white leading-snug" dangerouslySetInnerHTML={{ __html: item.q }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {item.options.map(opt => {
          const isCorrect  = normalize(opt) === normalize(item.ans);
          const isSelected = selected === opt;
          let cls = 'p-3 rounded-2xl border-2 font-bold text-sm text-left transition-all flex items-center gap-2 cursor-pointer ';
          if (locked && isCorrect)                cls += 'badge-correct scale-[1.02]';
          else if (locked && isSelected)          cls += 'badge-wrong';
          else if (locked)                        cls += 'opacity-40 item-surface';
          else                                    cls += 'item-surface hover:border-[var(--c3)] hover:bg-white/10 hover:scale-[1.01]';
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={locked} className={cls}>
              {locked && isCorrect                && <CheckCircle size={15} className="shrink-0" style={{ color: 'var(--ok-text)' }} />}
              {locked && isSelected && !isCorrect && <XCircle     size={15} className="shrink-0" style={{ color: 'var(--fail-text)' }} />}
              {opt}
            </button>
          );
        })}
      </div>
      {locked && (
        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest w-fit
          ${normalize(selected) === normalize(item.ans) ? 'badge-correct' : 'badge-wrong'}`}>
          {normalize(selected) === normalize(item.ans) ? <><CheckCircle size={14} /> Correct!</> : <><XCircle size={14} /> Wrong</>}
        </div>
      )}
    </div>
  );
});

export default ChoiceItem;