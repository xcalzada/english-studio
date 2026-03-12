import React, { useState, useCallback } from 'react';
import { PenTool, Star, Flame, RotateCcw, CheckCircle, XCircle, Zap } from 'lucide-react';
import { FillItem }             from './FillItem';
import { ChoiceItem }           from './ChoiceItem';
import { ErrorItem, OrderItem } from './ExerciseItems';
import { TranslateItem }        from './TranslateItem';
import { MatchPairsItem }       from './MatchPairsItem';
import { useStreak }            from '../../hooks/useStreak';
import { useXp, getLevelInfo }  from '../../hooks/useXp';

const TYPE_LABEL = {
  fill:       '✏️ Fill in',
  choice:     '🔘 Choice',
  error:      '🔧 Fix it',
  order:      '🔀 Reorder',
  translate:  '🌍 Translate',
  matchpairs: '🔗 Match',
};

const TypeBadge = ({ type }) => (
  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl border-2"
    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--c3)', color: 'var(--c0)' }}>
    {TYPE_LABEL[type] || type}
  </span>
);

// Badge flotante "+15 XP" que aparece al responder correctamente
const XpToast = ({ gain }) => {
  if (!gain) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 zoom-in"
      style={{ pointerEvents: 'none' }}>
      <div className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-white shadow-2xl"
        style={{ background: gain.levelUp ? 'var(--c0)' : 'rgba(99,102,241,0.95)', border: '2px solid rgba(255,255,255,0.2)' }}>
        <Zap size={16} />
        <span>+{gain.amount} XP</span>
        {gain.levelUp && <span className="ml-1">🎉 Level up!</span>}
      </div>
    </div>
  );
};

// Barra de nivel en el header
const LevelBar = ({ totalXp, level }) => {
  const { current, next, progress } = getLevelInfo(totalXp);
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)', minWidth: 140 }}>
      <span className="text-base">{current.emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--c0)' }}>
            {current.name}
          </span>
          <span className="text-[10px] font-black" style={{ color: 'var(--text-3)' }}>
            {totalXp} XP
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'var(--c0)' }} />
        </div>
      </div>
    </div>
  );
};

const ExerciseItem = React.memo(({ item, idx, result, onResult, showExplanation = false }) => {
  const checked = result !== undefined;
  const ok      = result === true;

  return (
    <div className={`p-5 md:p-6 rounded-2xl border-2 transition-all ${checked && ok ? 'state-correct' : checked ? 'state-wrong' : 'item-surface'}`}
      style={!checked ? { borderColor: 'rgba(255,255,255,0.18)' } : {}}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base border-2 shrink-0
          ${checked && ok ? 'badge-correct' : checked ? 'badge-wrong' : ''}`}
          style={!checked ? { background: 'var(--c0)', color: '#fff', border: 'none' } : {}}>
          {checked ? (ok ? <CheckCircle size={16} /> : <XCircle size={16} />) : idx + 1}
        </div>
        <TypeBadge type={item.type} />
      </div>

      {item.type === 'fill'       && <FillItem       item={item} onResult={onResult} />}
      {item.type === 'choice'     && <ChoiceItem     item={item} onResult={onResult} />}
      {item.type === 'error'      && <ErrorItem      item={item} onResult={onResult} />}
      {item.type === 'order'      && <OrderItem      item={item} onResult={onResult} />}
      {item.type === 'translate'  && <TranslateItem  item={item} onResult={onResult} />}
      {item.type === 'matchpairs' && <MatchPairsItem item={item} onResult={onResult} />}

      {checked && !ok && showExplanation && item.ans && (
        <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Correct answer:</p>
          <p className="font-black text-white text-sm mb-1">{item.ans.split('|')[0]}</p>
          {item.explanation && <p className="italic text-xs mt-1" style={{ color: 'var(--text-2)' }}>💡 {item.explanation}</p>}
        </div>
      )}
      {checked && ok && item.explanation && (
        <div className="mt-4 item-surface px-4 py-3 animate-in slide-in-from-top-2">
          <p className="text-sm italic font-semibold" style={{ color: 'var(--text-2)' }}>💡 {item.explanation}</p>
        </div>
      )}
    </div>
  );
});

export const PracticeSection = ({ quiz, showExplanation = false, unitId = '', toolId = 'grammar', token = null }) => {
  const [results, setResults] = useState({});
  const [key,     setKey]     = useState(0);

  const { streak, maxStreak, score, record, reset: resetStreak } = useStreak(token);
  const { totalXp, level, lastGain, award }                      = useXp(token);

  const handleResult = useCallback((id, ok) => {
    setResults(p => {
      if (p[id] !== undefined) return p;
      const newStreak = ok ? streak + 1 : 0;
      record(ok);
      award(ok, newStreak, true);
      return { ...p, [id]: ok };
    });
  }, [record, award, streak]);

  const restart = useCallback(() => {
    setResults({});
    resetStreak();
    setKey(k => k + 1);
  }, [resetStreak]);

  const checkedCount = Object.keys(results).length;
  const allChecked   = quiz.length > 0 && checkedCount === quiz.length;
  const pct          = quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 0;

  if (!quiz.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">✏️</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No exercises yet</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>Exercises for this unit are coming soon.</p>
    </div>
  );

  return (
    <div className="card-tool p-6 md:p-10">
      <XpToast gain={lastGain} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6"
        style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <PenTool size={22} style={{ color: 'var(--c0)' }} />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">✏️ Practice Zone</h3>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {streak >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl badge-revealed animate-in zoom-in">
              <Flame size={14} /><span className="font-black text-sm">{streak} 🔥</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <Star size={14} style={{ color: 'var(--c0)' }} />
            <span className="font-black text-base text-white">{score}<span className="opacity-50 text-sm">/{quiz.length}</span></span>
          </div>
          <LevelBar totalXp={totalXp} level={level} />
        </div>
      </div>

      <div key={key} className="space-y-4">
        {quiz.map((item, idx) => (
          <ExerciseItem key={item.id} item={item} idx={idx} result={results[item.id]}
            onResult={ok => handleResult(item.id, ok)}
            showExplanation={showExplanation} />
        ))}
      </div>

      {allChecked && (
        <div className={`mt-8 p-8 rounded-3xl border-2 text-center animate-in zoom-in
          ${pct === 100 ? 'badge-correct' : pct < 40 ? 'badge-wrong' : ''}`}
          style={pct >= 40 && pct < 100 ? { background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)' } : {}}>
          <p className="text-5xl mb-3">{pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '🔄'}</p>
          <p className="text-6xl font-black text-white mb-1">{score}<span className="text-2xl opacity-50">/{quiz.length}</span></p>
          <div className="flex justify-center gap-8 mt-4 mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Score</p>
              <p className="font-black text-xl text-white">{pct}%</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Best Streak</p>
              <p className="font-black text-xl" style={{ color: 'var(--warn-text)' }}>{maxStreak} 🔥</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Total XP</p>
              <p className="font-black text-xl" style={{ color: 'var(--c0)' }}>{totalXp} ⭐</p>
            </div>
          </div>
          <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto">
            <RotateCcw size={16} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeSection;