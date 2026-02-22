import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

/* item.pairs = [{ left: 'faster', right: 'más rápido' }, …] */
export const MatchPairsItem = React.memo(({ item, onResult }) => {
  const build = useCallback(() => ({
    left:  item.pairs.map((p, i) => ({ id: i, text: p.left })),
    right: [...item.pairs.map((p, i) => ({ id: i, text: p.right }))].sort(() => Math.random() - 0.5),
  }), [item.pairs]);

  const [cols,     setCols]     = useState(build);
  const [selLeft,  setSelLeft]  = useState(null);
  const [matched,  setMatched]  = useState({});      // { leftId: rightId }
  const [wrong,    setWrong]    = useState(null);
  const [locked,   setLocked]   = useState(false);
  const [checked,  setChecked]  = useState(false);

  const totalPairs = item.pairs.length;
  const matchCount = Object.keys(matched).length;
  const allMatched = matchCount === totalPairs;

  const pickLeft = useCallback((id) => {
    if (locked) return;
    setSelLeft(p => p === id ? null : id);
    setWrong(null);
  }, [locked]);

  const pickRight = useCallback((rightItem) => {
    if (locked || selLeft === null) return;
    if (rightItem.id === selLeft) {
      setMatched(p => ({ ...p, [selLeft]: rightItem.id }));
      setSelLeft(null);
    } else {
      setWrong(rightItem.id);
      setTimeout(() => setWrong(null), 600);
    }
  }, [locked, selLeft]);

  const handleCheck = useCallback(() => {
    setLocked(true);
    setChecked(true);
    onResult(allMatched);
  }, [allMatched, onResult]);

  const restart = useCallback(() => {
    setCols(build());
    setSelLeft(null); setMatched({}); setWrong(null); setLocked(false); setChecked(false);
  }, [build]);

  const leftState = (id) => {
    if (matched[id] !== undefined) return 'matched';
    if (selLeft === id)            return 'selected';
    return 'idle';
  };

  const rightState = (item) => {
    const isMatched = Object.values(matched).includes(item.id);
    if (isMatched)          return 'matched';
    if (wrong === item.id)  return 'wrong';
    if (selLeft !== null && item.id === selLeft) return 'hint';
    return 'idle';
  };

  const leftCls = (state) => ({
    matched:  'badge-correct cursor-default',
    selected: 'item-surface border-[var(--c0)] scale-[1.02] shadow-[0_0_0_3px_var(--cg)]',
    idle:     'item-surface hover:scale-[1.01] cursor-pointer',
  }[state]);

  const rightCls = (state) => ({
    matched: 'badge-correct cursor-default opacity-70',
    wrong:   'badge-wrong scale-95',
    hint:    'item-surface border-[var(--c0)] opacity-80',
    idle:    selLeft !== null ? 'item-surface hover:border-[var(--c0)] cursor-pointer hover:scale-[1.01]' : 'item-surface opacity-60 cursor-default',
  }[state]);

  return (
    <div className="space-y-4">
      {item.q && (
        <p className="text-base font-bold text-white leading-snug" dangerouslySetInnerHTML={{ __html: item.q }} />
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-center" style={{ color: 'var(--text-3)' }}>
            {item.leftLabel || 'English'}
          </p>
          {cols.left.map(l => (
            <button key={l.id} onClick={() => pickLeft(l.id)} disabled={matched[l.id] !== undefined}
              className={`w-full p-3 rounded-xl border-2 font-bold text-sm text-left text-white transition-all ${leftCls(leftState(l.id))}`}>
              {matched[l.id] !== undefined && <CheckCircle size={13} className="inline mr-1.5" style={{ color: 'var(--ok-text)' }} />}
              {l.text}
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-center" style={{ color: 'var(--text-3)' }}>
            {item.rightLabel || 'Español'}
          </p>
          {cols.right.map(r => (
            <button key={r.id} onClick={() => pickRight(r)} disabled={Object.values(matched).includes(r.id)}
              className={`w-full p-3 rounded-xl border-2 font-bold text-sm text-left text-white transition-all ${rightCls(rightState(r))}`}>
              {Object.values(matched).includes(r.id) && <CheckCircle size={13} className="inline mr-1.5" style={{ color: 'var(--ok-text)' }} />}
              {r.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!checked
          ? <button onClick={handleCheck} className="btn-tool" disabled={!allMatched}>
              Check ({matchCount}/{totalPairs})
            </button>
          : (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest
              ${allMatched ? 'badge-correct' : 'badge-wrong'}`}>
              {allMatched ? <><CheckCircle size={14} /> All matched!</> : <><XCircle size={14} /> Incomplete</>}
            </div>
          )}
        <button onClick={restart} className="btn-ghost flex items-center gap-1.5 text-xs">
          <RotateCcw size={12} /> Reset
        </button>
        {selLeft !== null && !checked && (
          <span className="text-xs italic" style={{ color: 'var(--text-3)' }}>Now pick the matching word →</span>
        )}
      </div>
    </div>
  );
});

export default MatchPairsItem;
