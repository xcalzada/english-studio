import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { PenTool, Star, Flame, RotateCcw, CheckCircle, XCircle, Volume2, Timer, TimerOff } from 'lucide-react';
import { sanitize } from '../../utils/sanitize';
import { FillItem }             from './FillItem';
import { ChoiceItem }           from './ChoiceItem';
import { ErrorItem, OrderItem } from './ExerciseItems';
import { TranslateItem }        from './TranslateItem';
import { MatchPairsItem }       from './MatchPairsItem';
import { useStreak }            from '../../hooks/useStreak';
import { useTimer }             from '../../hooks/useTimer';
import { speech }               from '../../utils/speech';

// ── Type labels ───────────────────────────────────────────────────
const TYPE_LABEL = {
  fill:       '✏️ Fill in',
  choice:     '🔘 Choice',
  error:      '🔧 Fix it',
  order:      '🔀 Reorder',
  translate:  '🌍 Translate',
  matchpairs: '🔗 Match',
};

// ── Difficulty badge ──────────────────────────────────────────────
const TYPE_DIFFICULTY = {
  fill:       { label: 'Easy',   color: '#4ade80', bg: 'rgba(74,222,128,0.10)'  },
  choice:     { label: 'Easy',   color: '#4ade80', bg: 'rgba(74,222,128,0.10)'  },
  matchpairs: { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.10)'  },
  error:      { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.10)'  },
  order:      { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.10)'  },
  translate:  { label: 'Hard',   color: '#f87171', bg: 'rgba(248,113,113,0.10)' },
};

// Numeric order for sorting easy → hard
const DIFFICULTY_ORDER = { fill: 0, choice: 1, matchpairs: 2, error: 3, order: 4, translate: 5 };

const DifficultyBadge = ({ type }) => {
  const d = TYPE_DIFFICULTY[type];
  if (!d) return null;
  return (
    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
      style={{ color: d.color, background: d.bg, border: `1px solid ${d.color}30` }}>
      {d.label}
    </span>
  );
};

// ── Sort easy → hard, shuffle within each difficulty tier ─────────
function sortByDifficulty(items) {
  const tiers = {};
  items.forEach(item => {
    const key = DIFFICULTY_ORDER[item.type] ?? 99;
    if (!tiers[key]) tiers[key] = [];
    tiers[key].push(item);
  });
  // Shuffle within each tier so same-difficulty items aren't always in the same order
  return Object.keys(tiers)
    .sort((a, b) => Number(a) - Number(b))
    .flatMap(key => tiers[key].sort(() => Math.random() - 0.5));
}

// ── Audio button ──────────────────────────────────────────────────
function stripHtml(str) {
  return str ? str.replace(/<[^>]*>/g, '').replace(/______/g, 'blank') : '';
}

const AudioButton = ({ text }) => {
  const [active, setActive] = useState(false);
  if (!speech.supported || !text?.trim()) return null;
  const handleClick = () => {
    if (active) { speech.cancel(); setActive(false); return; }
    setActive(true);
    speech.speak(stripHtml(text), {
      rate: 0.88,
      onEnd: () => setActive(false),
    });
  };
  return (
    <button
      onClick={handleClick}
      title={active ? 'Stop' : 'Listen'}
      className="flex items-center justify-center w-7 h-7 rounded-lg transition-all"
      style={{
        background: active ? 'var(--c0)' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${active ? 'var(--c0)' : 'rgba(255,255,255,0.18)'}`,
        color: active ? '#fff' : 'var(--text-3)',
      }}>
      <Volume2 size={13} />
    </button>
  );
};

// ── TypeBadge ─────────────────────────────────────────────────────
const TypeBadge = ({ type }) => (
  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl border-2"
    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--c3)', color: 'var(--c0)' }}>
    {TYPE_LABEL[type] || type}
  </span>
);

// ── ExerciseItem ──────────────────────────────────────────────────
const ExerciseItem = React.memo(({ item, idx, result, onResult, showExplanation = false }) => {
  const checked = result !== undefined;
  const ok      = result === true;

  return (
    <div className={`p-5 md:p-6 rounded-2xl border-2 transition-all ${checked && ok ? 'state-correct' : checked ? 'state-wrong' : 'item-surface'}`}
      style={!checked ? { borderColor: 'rgba(255,255,255,0.18)' } : {}}>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base border-2 shrink-0
          ${checked && ok ? 'badge-correct' : checked ? 'badge-wrong' : ''}`}
          style={!checked ? { background: 'var(--c0)', color: '#fff', border: 'none' } : {}}>
          {checked ? (ok ? <CheckCircle size={16} /> : <XCircle size={16} />) : idx + 1}
        </div>
        <TypeBadge type={item.type} />
        <DifficultyBadge type={item.type} />
        <div className="ml-auto">
          <AudioButton text={item.q} />
        </div>
      </div>

      {item.type === 'fill'       && <FillItem       item={item} onResult={onResult} />}
      {item.type === 'choice'     && <ChoiceItem     item={item} onResult={onResult} />}
      {item.type === 'error'      && <ErrorItem      item={item} onResult={onResult} />}
      {item.type === 'order'      && <OrderItem      item={item} onResult={onResult} />}
      {item.type === 'translate'  && <TranslateItem  item={item} onResult={onResult} />}
      {item.type === 'matchpairs' && <MatchPairsItem item={item} onResult={onResult} />}

      {checked && !ok && item.ans && (
        <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Correct answer:</p>
            <AudioButton text={item.ans.split('|')[0]} />
          </div>
          <p className="font-black text-white text-sm mb-1">{item.ans.split('|')[0]}</p>
          {item.explanation && <p className="italic text-xs mt-1" style={{ color: 'var(--text-2)' }}>💡 <span dangerouslySetInnerHTML={{ __html: sanitize(item.explanation) }} /></p>}
        </div>
      )}
      {checked && ok && item.explanation && (
        <div className="mt-4 item-surface px-4 py-3 animate-in slide-in-from-top-2">
          <p className="text-sm italic font-semibold" style={{ color: 'var(--text-2)' }}>💡 <span dangerouslySetInnerHTML={{ __html: sanitize(item.explanation) }} /></p>
        </div>
      )}
    </div>
  );
});

// ── Timer ─────────────────────────────────────────────────────────
const TIMED_SECONDS = 30;

const TimerBar = ({ remaining, pct, done }) => {
  const color = done ? '#f87171' : remaining <= 10 ? '#fbbf24' : '#4ade80';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${Math.max(0, 100 - pct)}%`, background: color }} />
      </div>
      <span className="text-[10px] font-black tabular-nums" style={{ color, minWidth: 28 }}>
        {remaining}s
      </span>
    </div>
  );
};

// ── PracticeSection ───────────────────────────────────────────────
export const PracticeSection = ({ quiz, showExplanation = false }) => {
  const [results,   setResults]   = useState({});
  const [key,       setKey]       = useState(0);
  const [timedMode, setTimedMode] = useState(false);
  const [timedIdx,  setTimedIdx]  = useState(0);

  const { streak, maxStreak, score, record, reset: resetStreak } = useStreak();
  const timer = useTimer(TIMED_SECONDS);

  // Sort easy → hard on every restart
  const sorted = useMemo(() => sortByDifficulty(quiz), [quiz, key]); // eslint-disable-line

  useEffect(() => {
    if (!timedMode) return;
    timer.reset();
    timer.start();
  }, [timedMode, timedIdx]); // eslint-disable-line

  useEffect(() => {
    if (!timedMode || !timer.done) return;
    const current = sorted[timedIdx];
    if (current && results[current.id] === undefined) {
      setResults(p => ({ ...p, [current.id]: false }));
      record(false);
    }
  }, [timer.done]); // eslint-disable-line

  const handleResult = useCallback((id, ok) => {
    setResults(p => {
      if (p[id] !== undefined) return p;
      record(ok);
      setTimedIdx(i => i + 1);
      return { ...p, [id]: ok };
    });
  }, [record]);

  const restart = useCallback(() => {
    setResults({});
    resetStreak();
    setKey(k => k + 1);
    setTimedIdx(0);
    timer.reset();
  }, [resetStreak, timer]);

  const toggleTimedMode = useCallback(() => {
    setTimedMode(t => !t);
    setTimedIdx(0);
    timer.reset();
  }, [timer]);

  const checkedCount = Object.keys(results).length;
  const allChecked   = sorted.length > 0 && checkedCount === sorted.length;
  const pct          = sorted.length > 0 ? Math.round((score / sorted.length) * 100) : 0;

  if (!quiz.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">✏️</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No exercises yet</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>Exercises for this unit are coming soon.</p>
    </div>
  );

  return (
    <div className="card-tool p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6"
        style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <PenTool size={22} style={{ color: 'var(--c0)' }} />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">✏️ Practice Zone</h3>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={toggleTimedMode}
            title={timedMode ? 'Disable timed mode' : 'Enable timed mode (30s per exercise)'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
            style={{
              background: timedMode ? 'rgba(248,113,113,0.18)' : 'rgba(255,255,255,0.08)',
              border: `2px solid ${timedMode ? '#f87171' : 'var(--c3)'}`,
              color: timedMode ? '#f87171' : 'var(--text-3)',
            }}>
            {timedMode ? <><TimerOff size={13} /> Timed</> : <><Timer size={13} /> Timed</>}
          </button>
          {streak >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl badge-revealed animate-in zoom-in">
              <Flame size={14} /><span className="font-black text-sm">{streak} 🔥</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <Star size={14} style={{ color: 'var(--c0)' }} />
            <span className="font-black text-base text-white">{score}<span className="opacity-50 text-sm">/{sorted.length}</span></span>
          </div>
        </div>
      </div>

      {/* Exercises sorted easy → hard */}
      <div className="space-y-4">
        {sorted.map((item, idx) => (
          <div key={`${key}-${item.id}`}>
            {timedMode && idx === timedIdx && results[item.id] === undefined && !allChecked && (
              <div className="mb-2 px-1">
                <TimerBar remaining={timer.remaining} pct={timer.pct} done={timer.done} />
              </div>
            )}
            <ExerciseItem item={item} idx={idx} result={results[item.id]}
              onResult={ok => handleResult(item.id, ok)}
              showExplanation={showExplanation} />
          </div>
        ))}
      </div>

      {/* Results panel */}
      {allChecked && (
        <div className={`mt-8 p-8 rounded-3xl border-2 text-center animate-in zoom-in
          ${pct === 100 ? 'badge-correct' : pct < 40 ? 'badge-wrong' : ''}`}
          style={pct >= 40 && pct < 100 ? { background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)' } : {}}>
          <p className="text-5xl mb-3">{pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '🔄'}</p>
          <p className="text-6xl font-black text-white mb-1">{score}<span className="text-2xl opacity-50">/{sorted.length}</span></p>
          <div className="flex justify-center gap-8 mt-4 mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Score</p>
              <p className="font-black text-xl text-white">{pct}%</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Best Streak</p>
              <p className="font-black text-xl" style={{ color: 'var(--warn-text)' }}>{maxStreak} 🔥</p>
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