import React, { useState, lazy, Suspense } from 'react';
import { Layers, Crown, Zap, Trophy } from 'lucide-react';
import { UNITS_DATA }        from './data';
import { TOOLS_CONFIG }      from './toolsConfig';
import { UnitMenu }          from './components/ui/UnitMenu';
import { ErrorBoundary }     from './components/ErrorBoundary';
import { useSession }        from './hooks/useSession';
import AuthScreen               from './features/AuthScreen';
import ProgressDashboard        from './features/ProgressDashboard';
import { DailyChallengeWidget } from './components/ui/DailyChallengeWidget';

const TOOL_COMPONENTS = {
  grammar:   lazy(() => import('./features/GrammarLab')),
  vocab:     lazy(() => import('./features/VocabLab')),
  listening: lazy(() => import('./features/AudioLab')),
  reading:   lazy(() => import('./features/ReadingLab')),
  writing:   lazy(() => import('./features/WritingLab')),
  discovery: lazy(() => import('./features/DiscoveryLab')),
};

const ToolLoader = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="skeleton w-full max-w-2xl h-64 rounded-[2rem]" />
  </div>
);

const UNIT_THEMES = ['tool-grammar', 'tool-vocab', 'tool-listening', 'tool-reading', 'tool-discovery', 'tool-writing'];

const App = () => {
  const [activeUnitId,    setActiveUnitId]    = useState(null);
  const [activeTab,       setActiveTab]       = useState(null);
  const [showProgress,    setShowProgress]    = useState(false);
  const [showAuth,        setShowAuth]        = useState(false);

  // ── Sesión anónima — se inicializa una vez al arrancar ──────────
  const { userId, token, email, ready, signOut } = useSession();



  const currentUnit = activeUnitId ? UNITS_DATA[activeUnitId] : null;

  const handleBack = () => setActiveTab(null);
  const handleHome = () => { setActiveUnitId(null); setActiveTab(null); setShowProgress(false); };

  // Modal de login/registro
  if (showAuth && !token) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && setShowAuth(false)}>
      <div className="relative w-full max-w-sm">
        <button onClick={() => setShowAuth(false)}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>✕</button>
        <AuthScreen onSuccess={() => setShowAuth(false)} />
      </div>
    </div>
  );

  // Esperar a que la sesión esté lista antes de renderizar
  if (!ready) return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton w-32 h-8 rounded-xl" />
    </div>
  );

  // Sin sesión → pantalla de login (salvo modo invitado)
  // Sin login → acceso libre (sin guardar progreso)

  /* ── PROGRESS DASHBOARD ── */
  if (showProgress) {
    return (
      <ProgressDashboard
        token={token}
        onBack={handleHome}
      />
    );
  }

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
              <ContentComponent data={currentUnit} unitId={activeUnitId} toolId={activeTab} token={token} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  /* ── UNIT TOOL MENU ── */
  if (activeUnitId && currentUnit) {
    return (
      <div className={`${UNIT_THEMES[Object.keys(UNITS_DATA).indexOf(activeUnitId) % UNIT_THEMES.length]} page-transition`}
        style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
        <nav className="nav-bar w-full sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            <button onClick={handleHome} className="btn-ghost">← Home</button>
            <span className="text-sm font-black text-white uppercase tracking-tight truncate">{currentUnit.grammarTitle}</span>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto w-full px-4 pt-8 pb-24">
          <UnitMenu unit={currentUnit} onSelectTab={setActiveTab} />
        </div>
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div className="page-transition" style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <nav className="nav-bar w-full sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={20} style={{ color: 'var(--c0)' }} />
            <span className="text-base font-black text-white uppercase tracking-tight">English Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProgress(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <Trophy size={13} /> Mi progreso
            </button>
            {email ? (
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg hidden sm:block"
                  style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.06)' }}>
                  {email}
                </span>
                <button onClick={signOut}
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg transition-all"
                  style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                  Salir
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)}
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"
                style={{ background: 'var(--c0)', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Entrar
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto w-full px-4 pt-12 pb-24">
        <div className="mb-12 text-center">
          <h1 className="display-font text-5xl md:text-7xl text-white mb-3">English Studio</h1>
          <p className="text-base font-semibold" style={{ color: 'var(--text-3)' }}>Choose a unit to start learning</p>
        </div>

        {/* Daily Challenge */}
        <div className="max-w-2xl mx-auto mb-8">
          <DailyChallengeWidget token={token} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(UNITS_DATA).map(([id, unit], i) => {
            const theme = UNIT_THEMES[i % UNIT_THEMES.length];
            return (
              <button key={id} onClick={() => setActiveUnitId(id)}
                className={`${theme} card-tool p-6 text-left hover:scale-[1.02] transition-transform`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.10)' }}>
                    <Crown size={20} style={{ color: 'var(--c0)' }} />
                  </div>
                  <Zap size={14} style={{ color: 'var(--text-3)' }} />
                </div>
                <h2 className="display-font text-2xl text-white mb-1">{unit.grammarTitle}</h2>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>{unit.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;