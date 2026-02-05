import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, Layers, ArrowLeft, ChevronRight, BookOpen, 
  Sofa, Headphones, FileText, PenTool, Zap, User, 
  Award, Sparkles
} from 'lucide-react';

/**
 * IMPORTACIONES MODULARES
 * --------------------------------------------------------------------------
 * Estos archivos deben residir en tu carpeta 'src' local de VS Code.
 * El sistema de previsualización de Canvas no puede verlos, pero tu entorno
 * local los resolverá sin problemas siempre que los archivos existan.
 */
import { UNITS_DATA } from './data/units';
import TheorySection from './components/TheorySection';
import ComparisonTheorySection from './components/ComparisonTheorySection';
import VocabSection from './components/VocabSection';
import ListeningSection from './components/ListeningSection';
import ReadingSection from './components/ReadingSection';
import WritingSection from './components/WritingSection';

/**
 * COMPONENTE PRINCIPAL: App
 */
const App = () => {
  // --- ESTADOS DE NAVEGACIÓN ---
  const [view, setView] = useState('topic-selector'); 
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  
  // --- SISTEMA DE PROGRESO (XP y Nivel) ---
  const [userStats] = useState({
    xp: 1250,
    level: 5
  });

  // --- PERSISTENCIA DE ESTADOS POR SESIÓN (Respuestas del usuario) ---
  const [theoryState, setTheoryState] = useState({});
  const [vocabTestState, setVocabTestState] = useState({});
  const [readingState, setReadingState] = useState({});
  const [writingState, setWritingState] = useState("");

  const currentUnit = UNITS_DATA[selectedUnitId] || null;

  /**
   * Limpia el progreso y detiene el audio al cambiar de lección.
   */
  useEffect(() => {
    setTheoryState({});
    setVocabTestState({});
    setReadingState({});
    setWritingState("");
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [selectedUnitId]);

  /**
   * Detiene globalmente cualquier síntesis de voz al navegar entre secciones.
   */
  const handleGlobalStopAudio = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  /**
   * Renderiza el encabezado estilizado para cada módulo de ejercicio.
   */
  const renderModuleHeader = (title, icon) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-in slide-in-from-left duration-500">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setView('unit-menu')} 
          className="p-4 bg-white border-4 border-slate-200 hover:border-blue-400 rounded-2xl shadow-md text-slate-600 transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md mb-1 inline-block">
            {currentUnit?.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter uppercase italic flex items-center gap-3 leading-none">
            {icon} {title}
          </h2>
        </div>
      </div>

      <div className="flex items-center bg-white px-5 py-3 rounded-2xl border-4 border-slate-100 shadow-sm space-x-4">
        <div className="flex items-center gap-2">
          <Zap className="text-orange-500 fill-orange-500" size={16} />
          <span className="font-black text-sm">{userStats.xp} XP</span>
        </div>
        <div className="w-px h-6 bg-slate-100"></div>
        <div className="flex items-center gap-2">
          <Award className="text-yellow-500" size={16} />
          <span className="font-black text-sm">Lvl {userStats.level}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-blue-200 selection:text-blue-900">
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav className="bg-white/80 backdrop-blur-xl border-b-4 border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => { setView('topic-selector'); handleGlobalStopAudio(); }}
        >
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
            <Layers className="text-white" size={22} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-800 uppercase italic">
            English<span className="text-blue-600">Studio</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {currentUnit && (
            <div className="hidden md:flex bg-slate-50 px-4 py-1.5 rounded-xl border-2 border-slate-200 items-center font-black text-[9px] text-slate-500 uppercase tracking-widest gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               {currentUnit.title}
            </div>
          )}
          <div className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-400">
            <User size={20} />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 mt-10">
        
        {/* VISTA 1: SELECTOR DE LECCIONES (TARJETAS COMPACTAS) */}
        {view === 'topic-selector' && (
          <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-12 space-y-3">
              <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">
                Learning <span className="text-blue-600">Portal</span>
              </h1>
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em] italic flex items-center justify-center gap-4">
                <span className="w-8 h-0.5 bg-slate-200 rounded-full"></span>
                Selecciona una Aventura
                <span className="w-8 h-0.5 bg-slate-200 rounded-full"></span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(UNITS_DATA).map((unit) => (
                <button 
                  key={unit.id} 
                  onClick={() => { setSelectedUnitId(unit.id); setView('unit-menu'); }} 
                  className="bg-white border-4 border-slate-200 p-6 rounded-[2rem] text-left transition-all relative overflow-hidden group shadow-md hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 active:scale-95 border-b-[8px] active:border-b-4 active:translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                      <Home size={24}/>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-1 tracking-tighter leading-none uppercase">
                    {unit.title}
                  </h3>
                  <p className="text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] mb-3 italic opacity-70 underline underline-offset-4 decoration-blue-100">
                    {unit.grammarTitle}
                  </p>
                  <p className="text-slate-400 font-medium text-[11px] leading-relaxed line-clamp-2">
                    {unit.description}
                  </p>
                </button>
              ))}

              <div className="bg-slate-100 border-4 border-dashed border-slate-300 p-6 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 font-black uppercase italic tracking-[0.2em] text-center shadow-inner group">
                <div className="mb-3 p-3 bg-slate-200 rounded-full opacity-30 group-hover:animate-bounce">
                  <Layers size={32}/>
                </div>
                <span className="text-sm">Próximamente</span>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: MENÚ DE MÓDULOS DE LA UNIDAD */}
        {view === 'unit-menu' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-12 p-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col items-center space-y-3">
              <button 
                onClick={() => setView('topic-selector')} 
                className="group flex items-center space-x-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] italic transition-all bg-white px-5 py-2 rounded-full shadow-md border border-slate-100"
              >
                <ArrowLeft size={14} /> <span>Regresar al Portal</span>
              </button>
              <h2 className="text-6xl font-black text-slate-800 uppercase italic tracking-tighter text-center leading-none">
                {currentUnit.title}
              </h2>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <UnitModuleButton icon={<BookOpen size={40}/>} title="1. Teoría" color="bg-blue-600" onClick={() => setView('theory')} />
              <UnitModuleButton icon={<Sofa size={40}/>} title="2. Vocabulario" color="bg-pink-600" onClick={() => setView('vocab')} />
              <UnitModuleButton icon={<Headphones size={40}/>} title="3. Listening" color="bg-purple-600" onClick={() => setView('listening')} />
              <UnitModuleButton icon={<FileText size={40}/>} title="4. Reading" color="bg-emerald-600" onClick={() => setView('reading')} />
              <UnitModuleButton icon={<PenTool size={40}/>} title="5. Proyecto" color="bg-orange-600" onClick={() => setView('writing')} />
              
              <div className="bg-slate-800 flex flex-col items-center justify-center p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group border-b-[16px] border-black opacity-40 cursor-not-allowed">
                <Sparkles size={48} className="mb-4 opacity-20" />
                <h3 className="font-black text-xl uppercase italic tracking-tighter">Bonus Lab</h3>
                <span className="text-[9px] mt-1 font-bold opacity-40 uppercase tracking-[0.3em]">Locked</span>
              </div>
            </div>
          </div>
        )}

        {/* --- SECCIÓN DE TEORÍA: LÓGICA DE COMPONENTE DINÁMICO --- */}
        {view === 'theory' && (
          <div className="max-w-7xl mx-auto">
            {renderModuleHeader("Grammar Blueprint", <BookOpen size={40}/>)}
            
            {/* Lógica de Selección de Componente:
                Detecta la ID de la lección para cargar el componente especializado.
            */}
            {selectedUnitId === 'superlatives-world-records' ? (
              <ComparisonTheorySection 
                data={currentUnit} 
                state={theoryState} 
                setState={setTheoryState} 
              />
            ) : (
              <TheorySection 
                data={currentUnit} 
                state={theoryState} 
                setState={setTheoryState} 
              />
            )}
          </div>
        )}

        {/* RESTO DE SECCIONES MODULARES */}
        {view === 'vocab' && (
          <div className="max-w-7xl mx-auto">
            {renderModuleHeader("Vocab Lab", <Sofa size={40}/>)}
            <VocabSection data={currentUnit} state={vocabTestState} setState={setVocabTestState} />
          </div>
        )}

        {view === 'listening' && (
          <div className="max-w-7xl mx-auto">
            {renderModuleHeader("Listening Center", <Headphones size={40}/>)}
            <ListeningSection data={currentUnit} />
          </div>
        )}

        {view === 'reading' && (
          <div className="max-w-7xl mx-auto">
            {renderModuleHeader("Reading Room", <FileText size={40}/>)}
            <ReadingSection data={currentUnit} state={readingState} setState={setReadingState} />
          </div>
        )}

        {view === 'writing' && (
          <div className="max-w-7xl mx-auto">
            {renderModuleHeader("Writing Project", <PenTool size={40}/>)}
            <WritingSection data={currentUnit} state={writingState} setState={setWritingState} />
          </div>
        )}

      </main>

      {/* FOOTER LIMPIO (SIN NÚMEROS) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-[6px] border-slate-200 py-5 px-10 flex justify-between items-center z-40 shadow-lg">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-black text-[9px] uppercase tracking-[0.4em]">Engine Active v2.0</span>
        </div>
        <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] italic text-center ml-auto mr-auto hidden md:block">
          English Studio • UK Accent Synthesis • 2026
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
             <div className="h-full bg-blue-500 w-[65%]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * Sub-componente para los botones del menú de módulos.
 */
const UnitModuleButton = ({ icon, title, color, onClick }) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center justify-center p-10 bg-white border-b-[16px] border-slate-200 rounded-[3rem] hover:translate-y-[-8px] hover:border-blue-400 hover:shadow-xl transition-all text-center group shadow-md active:border-b-4 active:translate-y-1 relative overflow-hidden"
  >
    <div className={`absolute top-4 right-6 text-slate-100 group-hover:text-blue-50 transition-colors`}>
      <ChevronRight size={24} />
    </div>
    <div className={`${color} text-white p-6 rounded-[1.5rem] mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
      {icon}
    </div>
    <h3 className="font-black text-2xl text-slate-800 uppercase italic tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
  </button>
);

export default App;