import React from 'react';
import { BookOpen, PenTool, ChevronRight } from 'lucide-react';
import { TheorySection }   from '../components/grammar/TheorySection';
import { PracticeSection } from '../components/grammar/PracticeSection';

// ── Section header with step badge ───────────────────────────────────
const SectionHeader = ({ step, icon: Icon, label, sub, badge }) => (
  <div className="flex items-center gap-4 mb-6">
    {/* Step number */}
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 text-white"
      style={{ background: 'linear-gradient(135deg, var(--c0), var(--c1, var(--c0)))' }}
    >
      {step}
    </div>

    <div
      className="p-2.5 rounded-xl shrink-0"
      style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
    >
      <Icon size={18} style={{ color: 'var(--c0)' }} />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className="display-font text-2xl text-white leading-none">{label}</h2>
        {badge != null && (
          <span
            className="text-[10px] font-black px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            {badge}
          </span>
        )}
      </div>
      {sub && (
        <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-3)' }}>{sub}</p>
      )}
    </div>

    <div
      className="h-px flex-1 max-w-xs hidden md:block"
      style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }}
    />
  </div>
);

// ── Divider arrow between Theory and Practice ─────────────────────────
const StepDivider = () => (
  <div className="flex items-center justify-center gap-3 py-2">
    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
    <div
      className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.35)' }}
    >
      <ChevronRight size={11} />
      ahora practica
      <ChevronRight size={11} />
    </div>
    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────
const GrammarLab = ({ data }) => {
  const exerciseCount = (data.theoryQuiz || []).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <section>
        <SectionHeader
          step="1"
          icon={BookOpen}
          label="Theory"
          sub="Lee cada bloque y luego practica abajo"
        />
        <TheorySection theory={data.theoryBlock} />
      </section>

      <StepDivider />

      <section>
        <SectionHeader
          step="2"
          icon={PenTool}
          label="Practice Zone"
          sub="Pon a prueba lo que has aprendido"
          badge={`${exerciseCount} ejercicios`}
        />
        <PracticeSection quiz={data.theoryQuiz || []} />
      </section>
    </div>
  );
};

export default GrammarLab;