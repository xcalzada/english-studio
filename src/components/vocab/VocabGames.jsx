import React, { useState, useCallback } from 'react';
import { BookOpen, Hammer, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { RuleCards }    from '../../features/RuleCards';
import { FillItem }     from '../grammar/FillItem';
import { useStreak }    from '../../hooks/useStreak';
import { Star, Flame, RotateCcw, XCircle } from 'lucide-react';

const FillPractice = ({ quiz }) => {
  const [statuses, setStatuses] = useState({});
  const [key,      setKey]      = useState(0);
  const { streak, maxStreak, score, record, reset: resetStreak } = useStreak();

  const handleResult = useCallback((id, ok) => {
    setStatuses(p => { if (p[id]) return p; return { ...p, [id]: ok ? 'correct' : 'wrong' }; });
    record(ok);
  }, [record]);

  const restart = useCallback(() => { setStatuses({}); resetStreak(); setKey(k => k + 1); }, [resetStreak]);

  const checkedCount = Object.keys(statuses).length;
  const allChecked   = checkedCount === quiz.length;
  const pct          = quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 0;

  return (
    <div className="card-tool p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6" style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
        <span className="card-title">Active Practice</span>
        <div className="md:ml-auto flex items-center gap-3 flex-wrap">
          {streak >= 2 && <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-revealed animate-in zoom-in"><Flame size={14} /><span className="font-black text-xs">{streak} streak!</span></div>}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <Star size={14} style={{ color: 'var(--c0)' }} />
            <span className="font-black text-xs text-white">{score}<span className="opacity-50">/{quiz.length}</span></span>
          </div>
        </div>
      </div>

      <div key={key} className="space-y-4">
        {quiz.map((item, idx) => {
          const status = statuses[item.id];
          const borderC = status === 'correct' ? 'var(--ok-border)' : status === 'wrong' ? 'var(--fail-border)' : 'rgba(255,255,255,0.18)';
          const bgC     = status === 'correct' ? 'var(--ok-bg)'     : status === 'wrong' ? 'var(--fail-bg)'     : 'rgba(255,255,255,0.08)';
          return (
            <div key={item.id} className="p-5 md:p-6 rounded-2xl border-2 transition-all" style={{ background: bgC, borderColor: borderC }}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm border-2 shrink-0 ${status ? (status === 'correct' ? 'badge-correct' : 'badge-wrong') : ''}`}
                  style={!status ? { background: 'var(--c0)', color: '#fff', border: 'none' } : {}}>
                  {status ? (status === 'correct' ? <CheckCircle size={16} /> : <XCircle size={16} />) : idx + 1}
                </div>
              </div>
              <FillItem item={item} onResult={ok => handleResult(item.id, ok)} />
              {status && status !== 'correct' && item.explanation && (
                <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2" style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Answer:</span>
                    <span className="text-white font-black">{item.ans}</span>
                  </div>
                  <p className="italic text-xs" style={{ color: 'var(--text-2)' }}>{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allChecked && (
        <div className={`mt-8 p-8 rounded-2xl border-2 text-center animate-in zoom-in ${pct === 100 ? 'badge-correct' : pct < 40 ? 'badge-wrong' : ''}`}
          style={pct >= 40 && pct < 100 ? { background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)' } : {}}>
          <p className="text-5xl mb-3">{pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '🔄'}</p>
          <p className="text-6xl font-black text-white mb-1">{score}<span className="text-2xl opacity-50">/{quiz.length}</span></p>
          <div className="flex justify-center gap-6 mb-6">
            <div><p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Score</p><p className="font-black text-lg text-white">{pct}%</p></div>
            <div><p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Best Streak</p><p className="font-black text-lg" style={{ color: 'var(--warn-text)' }}>{maxStreak} 🔥</p></div>
          </div>
          <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto"><RotateCcw size={16} /> Try Again</button>
        </div>
      )}
    </div>
  );
};

const ActiveGrammarLab = ({ data }) => {
  const [phase, setPhase] = useState('rules');
  const quiz = data.activeQuiz || data.theoryQuiz || [];
  const goToPractice = useCallback(() => setPhase('practice'), []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-center gap-3">
        {[{ id: 'rules', label: 'Study', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Practice', icon: <Hammer size={14} /> }].map((p, i) => (
          <React.Fragment key={p.id}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest border-2 transition-all ${phase === p.id ? 'btn-tool' : 'btn-ghost'}`}>
              {p.icon} {p.label}
              {phase === 'practice' && p.id === 'rules'    && <CheckCircle size={12} />}
              {phase === 'rules'    && p.id === 'practice' && <Lock         size={12} />}
            </div>
            {i === 0 && <ArrowRight size={14} style={{ color: 'var(--text-3)', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>
      {phase === 'rules'
        ? <RuleCards theory={data.theoryBlock} onComplete={goToPractice} />
        : <FillPractice quiz={quiz} />}
    </div>
  );
};

export default ActiveGrammarLab;