import React from 'react';
import { BookOpen, PenTool } from 'lucide-react';
import { TheorySection }   from '../components/grammar/TheorySection';
import { PracticeSection } from '../components/grammar/PracticeSection';

const SectionHeader = ({ icon: Icon, label, sub }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="p-2.5 rounded-xl shrink-0"
      style={{ background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.15)' }}>
      <Icon size={18} style={{ color:'var(--c0)' }} />
    </div>
    <div className="flex-1">
      <h2 className="display-font text-2xl text-white leading-none">{label}</h2>
      {sub && <p className="text-xs font-semibold mt-0.5" style={{ color:'var(--text-3)' }}>{sub}</p>}
    </div>
    <div className="h-px flex-1 max-w-xs hidden md:block"
      style={{ background:'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
  </div>
);

const GrammarLab = ({ data }) => (
  <div className="space-y-12 animate-in fade-in duration-500 pb-20">
    <section>
      <SectionHeader icon={BookOpen} label="Theory" sub="Read each block, then practice below" />
      <TheorySection theory={data.theoryBlock} />
    </section>
    <section>
      <SectionHeader icon={PenTool} label="Practice Zone" sub="Test what you learned" />
      <PracticeSection quiz={data.theoryQuiz || []} />
    </section>
  </div>
);

export default GrammarLab;
