import React, { useState, useCallback } from 'react';
import { BookOpen, Hammer, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { RuleCards }       from '../components/grammar/RuleCards';
import { PracticeSection } from '../components/grammar/PracticeSection';

const ActiveGrammarLab = ({ data }) => {
  const [phase, setPhase] = useState('rules');
  const quiz = data.activeQuiz || data.theoryQuiz || [];
  const goToPractice = useCallback(() => setPhase('practice'), []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Phase stepper */}
      <div className="flex items-center justify-center gap-3">
        {[
          { id: 'rules',    label: 'Study',    icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Practice', icon: <Hammer   size={14} /> },
        ].map((p, i) => (
          <React.Fragment key={p.id}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest border-2 transition-all
              ${phase === p.id ? 'btn-tool' : 'btn-ghost'}`}>
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
        : <PracticeSection quiz={quiz} showExplanation />}
    </div>
  );
};

export default ActiveGrammarLab;
