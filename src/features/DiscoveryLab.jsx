import React, { useState, useCallback, useMemo } from 'react';
import { BookOpen, Hammer, CheckCircle, Lock, ArrowRight, RotateCcw, Star, XCircle } from 'lucide-react';
import { RuleCards }       from '../components/grammar/RuleCards';
import { PracticeSection } from '../components/grammar/PracticeSection';
import { normalize }       from '../utils/normalize';

// ── Derive check questions grouped by theory block ────────────────
function deriveBlockCheck(quiz, theoryBlock) {
  const blocks = Object.entries(theoryBlock || {});
  const byBlock = {};
  blocks.forEach(([key]) => { byBlock[key] = []; });

  quiz.forEach(q => {
    if (q.type === 'choice' && q.block && byBlock[q.block] !== undefined) {
      byBlock[q.block].push(q);
    }
  });

  return blocks.map(([key, block]) => ({
    key,
    title: block.title,
    questions: byBlock[key].sort(() => Math.random() - 0.5).slice(0, 3),
  })).filter(b => b.questions.length > 0);
}

// ── Step indicator ────────────────────────────────────────────────
const Step = ({ icon, label, active, done, locked }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest border-2 transition-all select-none
    ${active ? 'btn-tool' : done ? 'btn-ghost' : 'btn-ghost opacity-40'}`}
    style={done && !active ? { borderColor: 'var(--c0)', color: 'var(--c0)' } : {}}>
    {done && !active ? <CheckCircle size={13} /> : locked ? <Lock size={13} /> : icon}
    {label}
  </div>
);

// ── Single choice question ────────────────────────────────────────
const CheckQuestion = React.memo(({ q, idx, onResult }) => {
  const [selected, setSelected] = useState(null);
  const locked = selected !== null;

  const choose = (opt) => {
    if (locked) return;
    setSelected(opt);
    onResult(q.id, normalize(opt) === normalize(q.ans));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
          style={!locked
            ? { background: 'var(--c0)', color: '#fff' }
            : normalize(selected) === normalize(q.ans)
              ? { background: 'rgba(134,239,172,0.20)', color: '#86efac', border: '2px solid #86efac' }
              : { background: 'rgba(248,113,113,0.20)', color: '#f87171', border: '2px solid #f87171' }}>
          {locked ? (normalize(selected) === normalize(q.ans) ? '✓' : '✗') : idx + 1}
        </div>
        <p className="text-sm font-bold text-white leading-snug"
          dangerouslySetInnerHTML={{ __html: q.q }} />
      </div>
      <div className="grid grid-cols-1 gap-2 pl-8">
        {q.options.map(opt => {
          const isCorrect  = normalize(opt) === normalize(q.ans);
          const isSelected = selected === opt;
          let style = {};
          if (!locked) {
            style = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-2)' };
          } else if (isCorrect) {
            style = { background: 'rgba(134,239,172,0.12)', borderColor: '#86efac', color: '#86efac' };
          } else if (isSelected) {
            style = { background: 'rgba(248,113,113,0.10)', borderColor: '#f87171', color: '#f87171', opacity: 0.8 };
          } else {
            style = { opacity: 0.25 };
          }
          return (
            <button key={opt} disabled={locked} onClick={() => choose(opt)}
              className="text-left px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all"
              style={style}>
              {opt}
            </button>
          );
        })}
      </div>
      {locked && q.explanation && (
        <p className="pl-8 text-xs italic" style={{ color: 'var(--text-3)' }}
          dangerouslySetInnerHTML={{ __html: `💡 ${q.explanation}` }} />
      )}
    </div>
  );
});

// ── Block section ─────────────────────────────────────────────────
const ACCENTS = ['#60a5fa', '#34d399', '#a78bfa', '#f472b6', '#fbbf24', '#fb923c'];

const BlockSection = React.memo(({ block, blockIdx, answers, onResult }) => {
  const color   = ACCENTS[blockIdx % ACCENTS.length];
  const total   = block.questions.length;
  const checked = block.questions.filter(q => answers[q.id] !== undefined).length;
  const correct = block.questions.filter(q => answers[q.id] === true).length;
  const allDone = checked === total;

  return (
    <div className="overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.20)',
      }}>
      <div className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
          style={{ background: `${color}28`, border: `1.5px solid ${color}55`, color }}>
          {allDone
            ? correct === total ? <CheckCircle size={15} /> : <XCircle size={15} />
            : String.fromCharCode(65 + blockIdx)}
        </div>
        <span className="font-black text-white text-sm tracking-tight flex-1">{block.title}</span>
        {allDone && (
          <span className="text-xs font-black tabular-nums" style={{ color }}>
            {correct}/{total}
          </span>
        )}
      </div>
      <div className="px-5 py-5 space-y-6">
        {block.questions.map((q, i) => (
          <div key={q.id} className={i < block.questions.length - 1 ? 'pb-5' : ''}
            style={i < block.questions.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}}>
            <CheckQuestion q={q} idx={i} onResult={onResult} />
          </div>
        ))}
      </div>
    </div>
  );
});

// ── QuickCheck ────────────────────────────────────────────────────
const QuickCheck = ({ blockSections, theoryBlock, onPass, onGoBlock }) => {
  const [answers, setAnswers] = useState({});

  const handleResult = useCallback((id, ok) => {
    setAnswers(p => p[id] !== undefined ? p : { ...p, [id]: ok });
  }, []);

  const allQuestions = blockSections.flatMap(b => b.questions);
  const total        = allQuestions.length;
  const score        = Object.values(answers).filter(Boolean).length;
  const allDone      = Object.keys(answers).length === total;
  const passed       = score >= Math.ceil(total * 0.6);

  const failedBlocks = blockSections.filter(b =>
    b.questions.every(q => answers[q.id] !== undefined) &&
    b.questions.some(q => answers[q.id] === false)
  );

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
        <Star size={16} style={{ color: 'var(--c0)' }} />
        <div>
          <p className="font-black text-white text-sm">Quick Check</p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            {total} preguntas · una por cada bloque que acabas de estudiar
          </p>
        </div>
        {allDone && (
          <div className="ml-auto font-black text-sm text-white">{score}/{total}</div>
        )}
      </div>

      {blockSections.map((block, i) => (
        <BlockSection key={block.key} block={block} blockIdx={i} answers={answers} onResult={handleResult} />
      ))}

      {allDone && (
        <div className={`rounded-2xl p-6 text-center animate-in zoom-in border-2 ${passed ? 'badge-correct' : 'badge-wrong'}`}>
          <p className="text-4xl mb-2">{score === total ? '🏆' : passed ? '👍' : '📖'}</p>
          <p className="text-5xl font-black text-white mb-1">
            {score}<span className="text-xl opacity-50">/{total}</span>
          </p>
          <p className="font-black text-sm mt-2" style={{ color: passed ? 'var(--ok-text)' : 'var(--fail-text)' }}>
            {score === total ? 'Perfecto — todos los bloques dominados.'
              : passed      ? 'Bien — listo para practicar.'
              :               'Repasa los bloques marcados abajo.'}
          </p>

          {!passed && failedBlocks.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {failedBlocks.map(b => (
                <button key={b.key} onClick={() => onGoBlock(b.key)}
                  className="btn-ghost flex items-center gap-2 justify-center text-xs px-4 py-2.5">
                  <BookOpen size={13} /> Repasar: {b.title}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-4 justify-center">
            {passed
              ? <button onClick={onPass} className="btn-tool flex items-center gap-2 px-8 py-3 text-sm font-black">
                  <Hammer size={18} /> Empezar práctica
                </button>
              : <button onClick={() => onGoBlock(null)} className="btn-ghost flex items-center gap-2 px-5 py-3 text-sm">
                  <RotateCcw size={14} /> Repasar todo
                </button>}
          </div>
        </div>
      )}
    </div>
  );
};

// ── DiscoveryLab ──────────────────────────────────────────────────
const DiscoveryLab = ({ data, token, guestMode = false, onRegister }) => {
  const [phase,      setPhase]      = useState('study');
  const [startBlock, setStartBlock] = useState(null);

  const quiz          = data.activeQuiz || data.theoryQuiz || [];
  const blockSections = useMemo(
    () => deriveBlockCheck(quiz, data.theoryBlock),
    [quiz, data.theoryBlock]
  );

  const goCheck    = useCallback(() => setPhase('check'), []);
  const goPractice = useCallback(() => setPhase('practice'), []);
  const goStudy    = useCallback((blockKey = null) => {
    setStartBlock(blockKey);
    setPhase('study');
  }, []);

  const steps = [
    { id: 'study',    label: 'Study',    icon: <BookOpen size={13} /> },
    { id: 'check',    label: 'Check',    icon: <Star     size={13} /> },
    { id: 'practice', label: 'Practice', icon: <Hammer   size={13} /> },
  ];
  const phaseIdx = steps.findIndex(s => s.id === phase);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">

      {/* Step bar */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <Step icon={s.icon} label={s.label}
              active={phase === s.id}
              done={phaseIdx > i}
              locked={phaseIdx < i} />
            {i < steps.length - 1 && (
              <ArrowRight size={14} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {phase === 'study' && (
        <RuleCards
          theory={data.theoryBlock}
          initialBlock={startBlock}
          onComplete={goCheck}
        />
      )}

      {phase === 'check' && (
        <QuickCheck
          blockSections={blockSections}
          theoryBlock={data.theoryBlock}
          onPass={goPractice}
          onGoBlock={goStudy}
        />
      )}

      {phase === 'practice' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <Hammer size={18} style={{ color: 'var(--c0)' }} />
            <div>
              <p className="font-black text-white text-sm">Práctica completa — {quiz.length} ejercicios</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Fácil → difícil · explicaciones en los errores
              </p>
            </div>
            <button onClick={() => goStudy(null)}
              className="ml-auto btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
              <BookOpen size={12} /> Repasar
            </button>
          </div>
          <PracticeSection
            quiz={quiz}
            unitId={data?.id ?? ''}
            toolId="discovery"
            token={token}
            guestMode={guestMode}
            onRegister={onRegister}
          />
        </div>
      )}
    </div>
  );
};

export default DiscoveryLab;