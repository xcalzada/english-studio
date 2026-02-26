import React, { useState, useCallback, useMemo } from 'react';
import { BookOpen, Hammer, CheckCircle, Lock, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { RuleCards }       from '../components/grammar/RuleCards';
import { PracticeSection } from '../components/grammar/PracticeSection';

function deriveCheckQuestions(quiz, theoryBlock) {
  const choices = quiz.filter(q => q.type === 'choice');
  const fills   = quiz.filter(q => q.type === 'fill');
  const pool    = [...choices, ...fills].slice(0, 20);
  const step    = Math.max(1, Math.floor(pool.length / 6));
  const chosen  = [];
  for (let i = 0; i < 6 && i * step < pool.length; i++) {
    const q = pool[i * step];
    if (q && !chosen.find(c => c.id === q.id)) chosen.push(q);
  }
  return chosen.slice(0, 6);
}

const Step = ({ icon, label, active, done, locked }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest border-2 transition-all select-none
    ${active ? 'btn-tool' : done ? 'btn-ghost' : 'btn-ghost opacity-40'}`}
    style={done && !active ? { borderColor: 'var(--c0)', color: 'var(--c0)' } : {}}>
    {done && !active ? <CheckCircle size={13} /> : locked ? <Lock size={13} /> : icon}
    {label}
  </div>
);

const ScoreBadge = ({ score, total }) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const ok  = pct >= 60;
  return (
    <div className={`rounded-2xl p-6 text-center animate-in zoom-in border-2 ${ok ? 'badge-correct' : 'badge-wrong'}`}>
      <p className="text-4xl mb-2">{pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📖'}</p>
      <p className="text-5xl font-black text-white mb-1">{score}<span className="text-xl opacity-50">/{total}</span></p>
      <p className="font-black text-sm mb-4" style={{ color: ok ? 'var(--ok-text, #86efac)' : 'var(--fail-text, #fca5a5)' }}>
        {pct === 100 ? 'Perfect! All rules mastered.' : pct >= 60 ? 'Good — ready for full practice!' : 'Review the theory, then try again.'}
      </p>
    </div>
  );
};

const QuickCheck = ({ questions, onPass, onRetry }) => {
  const [answers,   setAnswers]  = useState({});
  const [submitted, setSubmit]   = useState(false);

  const score   = Object.values(answers).filter(Boolean).length;
  const allDone = Object.keys(answers).length === questions.length;
  const passed  = score >= Math.ceil(questions.length * 0.6);

  const handleResult = useCallback((id, ok) => {
    setAnswers(p => p[id] !== undefined ? p : { ...p, [id]: ok });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="card-tool p-5 md:p-7">
        <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
          <Star size={18} style={{ color: 'var(--c0)' }} />
          <div>
            <p className="font-black text-white text-base">Quick Check</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>{questions.length} questions · prove you understood the theory</p>
          </div>
          {allDone && <div className="ml-auto font-black text-sm text-white">{score}/{questions.length}</div>}
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const result  = answers[q.id];
            const checked = result !== undefined;
            const ok      = result === true;
            const borderC = checked ? (ok ? 'var(--ok-border, #86efac)' : 'var(--fail-border, #f87171)') : 'rgba(255,255,255,0.18)';
            const bgC     = checked ? (ok ? 'var(--ok-bg, rgba(134,239,172,0.08))' : 'var(--fail-bg, rgba(248,113,113,0.08))') : 'rgba(255,255,255,0.05)';

            return (
              <div key={q.id} className="rounded-2xl border-2 p-5 transition-all" style={{ background: bgC, borderColor: borderC }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                    style={!checked ? { background: 'var(--c0)', color: '#fff' }
                         : ok      ? { background: 'rgba(134,239,172,0.20)', color: '#86efac', border: '2px solid #86efac' }
                                   : { background: 'rgba(248,113,113,0.20)', color: '#f87171', border: '2px solid #f87171' }}>
                    {checked ? (ok ? '✓' : '✗') : i + 1}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--c0)' }}>
                    {q.type === 'choice' ? '🔘 Choice' : q.type === 'fill' ? '✏️ Fill' : q.type}
                  </span>
                </div>
                {q.type === 'choice' && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: q.q }} />
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map(opt => {
                        const isCorrect = opt === q.ans;
                        const style = !checked
                          ? { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-2)' }
                          : isCorrect
                            ? { background: 'rgba(134,239,172,0.12)', borderColor: '#86efac', color: '#86efac' }
                            : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.30)' };
                        return (
                          <button key={opt} disabled={checked}
                            onClick={() => handleResult(q.id, opt === q.ans)}
                            className="text-left px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all" style={style}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {q.type !== 'choice' && (
                  <p className="text-sm font-semibold text-white mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: q.q || q.sentence }} />
                )}
                {checked && q.explanation && (
                  <p className="mt-3 text-xs italic" style={{ color: 'var(--text-3)' }}>💡 {q.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {allDone && (
        <div className="space-y-3 animate-in zoom-in">
          <ScoreBadge score={score} total={questions.length} />
          <div className="flex gap-3">
            <button onClick={onRetry} className="btn-ghost flex items-center gap-2 px-5 py-3 text-sm">
              <RotateCcw size={16} /> Review theory
            </button>
            {passed
              ? <button onClick={onPass} className="btn-tool flex-1 flex items-center justify-center gap-2 py-3 text-sm font-black">
                  <Hammer size={18} /> Start Full Practice
                </button>
              : <button onClick={onRetry} className="btn-tool flex-1 flex items-center justify-center gap-2 py-3 text-sm font-black">
                  <BookOpen size={18} /> Study again — then retry
                </button>}
          </div>
        </div>
      )}
    </div>
  );
};

const ActiveGrammarLab = ({ data }) => {
  const [phase, setPhase] = useState('study');
  const quiz      = data.activeQuiz || data.theoryQuiz || [];
  const checkQuiz = useMemo(() => deriveCheckQuestions(quiz, data.theoryBlock), [quiz, data.theoryBlock]);

  const goCheck    = useCallback(() => setPhase('check'),    []);
  const goStudy    = useCallback(() => setPhase('study'),    []);
  const goPractice = useCallback(() => setPhase('practice'), []);

  const steps = [
    { id: 'study',    label: 'Study',    icon: <BookOpen size={13} /> },
    { id: 'check',    label: 'Check',    icon: <Star     size={13} /> },
    { id: 'practice', label: 'Practice', icon: <Hammer   size={13} /> },
  ];
  const phaseIdx = steps.findIndex(s => s.id === phase);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <Step icon={s.icon} label={s.label} active={phase === s.id} done={phaseIdx > i} locked={phaseIdx < i} />
            {i < steps.length - 1 && <ArrowRight size={14} style={{ color: 'var(--text-3)', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>

      {phase === 'study'    && <RuleCards theory={data.theoryBlock} onComplete={goCheck} />}
      {phase === 'check'    && <QuickCheck questions={checkQuiz} onPass={goPractice} onRetry={goStudy} />}
      {phase === 'practice' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <Hammer size={18} style={{ color: 'var(--c0)' }} />
            <div>
              <p className="font-black text-white text-sm">Full Practice — {quiz.length} exercises</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>All types · easy → hard · explanations on wrong answers</p>
            </div>
            <button onClick={goStudy} className="ml-auto btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
              <BookOpen size={12} /> Review
            </button>
          </div>
          <PracticeSection quiz={quiz} showExplanation />
        </div>
      )}
    </div>
  );
};

export default ActiveGrammarLab;
