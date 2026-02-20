import React, { useState } from 'react';
import { Layers, Crown, Zap, BookOpen, Lightbulb, Headphones, FileText, PenTool, Hammer } from 'lucide-react';
import { UNITS_DATA }      from './data';
import { TOOLS_CONFIG }    from './toolsConfig';          // ← fuente única
import { UnitMenu }        from './components/ui/UnitMenu';
import GrammarLab          from './components/features/GrammarLab';
import VocabLab            from './components/features/VocabLab';
import AudioLab            from './components/features/AudioLab';
import WritingDraft        from './components/features/WritingDraft';
import ReadingRoom         from './components/features/ReadingRoom';
import ActiveGrammarLab    from './components/features/ActiveGrammarLab';

/* Mapa id → componente — se construye aquí para no meter JSX en toolsConfig */
const TOOL_COMPONENTS = {
  grammar:   GrammarLab,
  vocab:     VocabLab,
  listening: AudioLab,
  reading:   ReadingRoom,
  writing:   WritingDraft,
  discovery: ActiveGrammarLab,
};

const App = () => {
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeTab,    setActiveTab]    = useState(null);
  const currentUnit = activeUnitId ? UNITS_DATA[activeUnitId] : null;

  const handleBack = () => setActiveTab(null);
  const handleHome = () => { setActiveUnitId(null); setActiveTab(null); };

  /* ── HERRAMIENTA ACTIVA ── */
  if (activeUnitId && currentUnit && activeTab) {
    const ContentComponent = TOOL_COMPONENTS[activeTab];

    return (
      <div
        className={`tool-${activeTab} page-transition`}
        style={{ minHeight: '100vh', background: 'var(--page-bg)' }}
      >
        {/* Navbar */}
        <div className="nav-bar w-full sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <button onClick={handleBack} className="btn-ghost shrink-0">← Back</button>

            <div className="nav-scroll-container flex-1 w-full md:w-auto flex justify-center py-1">
              {TOOLS_CONFIG.map(tool => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`nav-tab tool-${tool.id} ${activeTab === tool.id ? 'active' : ''}`}
                  >
                    <Icon size={15} />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:block text-right shrink-0">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1"
                style={{ color: 'var(--text-3)' }}>Unit</p>
              <p className="text-sm font-bold truncate max-w-[180px] leading-none"
                style={{ color: 'var(--text-2)' }}>{currentUnit.title}</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-7xl mx-auto w-full px-4 pt-8 pb-24">
          {ContentComponent && <ContentComponent data={currentUnit} />}
        </div>
      </div>
    );
  }

  /* ── MENÚ DE HERRAMIENTAS ── */
  if (activeUnitId && currentUnit) {
    return (
      <div className="tool-grammar page-transition" style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
        <UnitMenu unit={currentUnit} onSelectTab={setActiveTab} onBack={handleHome} />
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }} className="font-sans p-6">

      {/* Logo */}
      <nav className="flex justify-center mb-14 mt-6">
        <div className="relative cursor-pointer hover:scale-105 transition-transform">
          <div className="absolute inset-0 blur-2xl opacity-40 rounded-full"
            style={{ background: 'rgba(147,197,253,.6)' }} />
          <div className="relative p-4 md:p-5 rounded-3xl flex items-center gap-4"
            style={{
              background: 'var(--surface)',
              border: '2px solid var(--surface-border)',
              boxShadow: '0 8px 30px rgba(0,0,0,.10)',
            }}>
            <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg,#3b82f6,#6d28d9)' }}>
              <Layers className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none display-font"
                style={{ color: 'var(--text-1)' }}>
                English
                <span style={{
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(135deg,#3b82f6,#6d28d9)',
                  backgroundClip: 'text',
                }}>Studio</span>
              </h1>
              <p className="font-bold text-[10px] uppercase tracking-[.3em] text-right mt-0.5"
                style={{ color: 'var(--text-3)' }}>Kids Edition ⭐</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Grid de unidades */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(UNITS_DATA).map((unit, index) => {
          const themes = ['tool-grammar', 'tool-vocab', 'tool-listening', 'tool-reading', 'tool-discovery', 'tool-writing'];
          const themeClass = themes[index % themes.length];
          return (
            <button
              key={unit.id}
              onClick={() => { setActiveUnitId(unit.id); setActiveTab(null); }}
              className={`${themeClass} home-card group text-left p-7 h-72 flex flex-col justify-between`}
            >
              <div className="unit-badge absolute top-5 right-5 z-20">UNIT {index + 1}</div>

              <div className="absolute -bottom-3 -right-3 opacity-[.08] rotate-12 group-hover:scale-110 transition-transform duration-500">
                <Crown size={150} style={{ color: 'var(--c0)' }} />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,.58)', border: '1.5px solid var(--c3)', color: 'var(--ct)' }}>
                  Grammar Focus
                </span>
                <h2 className="text-3xl font-black uppercase italic leading-none mt-3 mb-1 display-font"
                  style={{ color: 'var(--ct)' }}>
                  {unit.grammarTitle}
                </h2>
                <p className="font-bold text-base leading-tight" style={{ color: 'var(--ct)', opacity: .78 }}>
                  {unit.title}
                </p>
              </div>

              <div className="relative z-10 self-start mt-3 btn-primary">
                Start <Zap size={13} className="fill-current" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;