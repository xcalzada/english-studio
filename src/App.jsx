import React, { useState, lazy, Suspense } from 'react';
import { Layers, Crown, Zap } from 'lucide-react';
import { UNITS_DATA }     from './data';
import { TOOLS_CONFIG }   from './toolsConfig';
import { UnitMenu }       from './components/ui/UnitMenu';
import { ErrorBoundary }  from './components/ErrorBoundary';

const TOOL_COMPONENTS = {
  grammar:   lazy(() => import('./features/GrammarLab')),
  vocab:     lazy(() => import('./features/VocabLab')),
  listening: lazy(() => import('./features/AudioLab')),
  reading:   lazy(() => import('./features/ReadingRoom')),
  writing:   lazy(() => import('./features/WritingDraft')),
  discovery: lazy(() => import('./features/ActiveGrammarLab')),
};

const ToolLoader = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="skeleton w-full max-w-2xl h-64 rounded-[2rem]" />
  </div>
);

const UNIT_THEMES = ['tool-grammar', 'tool-vocab', 'tool-listening', 'tool-reading', 'tool-discovery', 'tool-writing'];

const App = () => {
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeTab,    setActiveTab]    = useState(null);

  const currentUnit = activeUnitId ? UNITS_DATA[activeUnitId] : null;

  const handleBack = () => setActiveTab(null);
  const handleHome = () => { setActiveUnitId(null); setActiveTab(null); };

  /* ── TOOL VIEW ── */
  if (activeUnitId && currentUnit && activeTab) {
    const ContentComponent = TOOL_COMPONENTS[activeTab];
    return (
      <div className={`tool-${activeTab} page-transition`} style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
        <nav className="nav-bar w-full sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <button onClick={handleBack} className="btn-ghost shrink-0">← Back</button>
            <div className="nav-scroll-container flex-1 w-full md:w-auto flex justify-center py-1">
              {TOOLS_CONFIG.map(tool => {
                const Icon = tool.icon;
                return (
                  <button key={tool.id} onClick={() => setActiveTab(tool.id)}
                    className={`nav-tab tool-${tool.id} ${activeTab === tool.id ? 'active' : ''}`}>
                    <Icon size={15} />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="hidden md:block text-right shrink-0">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: 'var(--text-3)' }}>Unit</p>
              <p className="text-sm font-bold truncate max-w-[180px] leading-none" style={{ color: 'var(--text-2)' }}>{currentUnit.title}</p>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto w-full px-4 pt-8 pb-24">
          <ErrorBoundary>
            <Suspense fallback={<ToolLoader />}>
              <ContentComponent data={currentUnit} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  /* ── UNIT MENU ── */
  if (activeUnitId && currentUnit) {
    return (
      <div className="tool-grammar page-transition" style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
        <ErrorBoundary>
          <UnitMenu unit={currentUnit} onSelectTab={setActiveTab} onBack={handleHome} />
        </ErrorBoundary>
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }} className="font-sans p-6">
      <nav className="flex justify-center mb-14 mt-6">
        <div className="relative cursor-pointer hover:scale-105 transition-transform">
          <div className="absolute inset-0 blur-2xl opacity-40 rounded-full" style={{ background: 'rgba(147,197,253,.6)' }} />
          <div className="relative p-4 md:p-5 rounded-3xl flex items-center gap-4 card-base">
            <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg,#3b82f6,#6d28d9)' }}>
              <Layers className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none display-font text-white">
                English
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg,#3b82f6,#a78bfa)', backgroundClip: 'text' }}>Studio</span>
              </h1>
              <p className="font-bold text-[10px] uppercase tracking-[.3em] text-right mt-0.5" style={{ color: 'var(--text-3)' }}>Kids Edition ⭐</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(UNITS_DATA).map((unit, index) => (
          <button
            key={unit.id}
            onClick={() => { setActiveUnitId(unit.id); setActiveTab(null); }}
            className={`${UNIT_THEMES[index % UNIT_THEMES.length]} home-card group text-left p-7 h-72 flex flex-col justify-between`}
          >
            <div className="unit-badge absolute top-5 right-5 z-20">UNIT {index + 1}</div>
            <div className="absolute -bottom-3 -right-3 opacity-[.08] rotate-12 group-hover:scale-110 transition-transform duration-500">
              <Crown size={150} style={{ color: 'var(--c0)' }} />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                style={{ background: 'rgba(255,255,255,.18)', border: '1.5px solid var(--c3)', color: '#fff' }}>
                Grammar Focus
              </span>
              <h2 className="text-3xl font-black uppercase italic leading-none mt-3 mb-1 display-font text-white">{unit.grammarTitle}</h2>
              <p className="font-bold text-base leading-tight text-white opacity-75">{unit.title}</p>
            </div>
            <div className="relative z-10 self-start mt-3 btn-primary">
              Start <Zap size={13} className="fill-current" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
