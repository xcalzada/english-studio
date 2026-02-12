import React, { useState } from 'react';
import { 
  Layers, Home, BookOpen, Sofa, Headphones, FileText, PenTool, Lightbulb 
} from 'lucide-react';
import { UNITS_DATA } from './data'; // Importa desde el index.js

// Components
import { UnitMenu } from './components/ui/UnitMenu'; 
import GrammarLab from './components/features/GrammarLab';
import VocabLab from './components/features/VocabLab';
import AudioLab from './components/features/AudioLab';
import WritingDraft from './components/features/WritingDraft';
import ReadingRoom from './components/features/ReadingRoom';
import ActiveGrammarLab from './components/features/ActiveGrammarLab'; // Importamos el nuevo componente
import { SectionHeader } from './components/ui/Neubrutal';

const App = () => {
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // NULL significa "Muestra el Menú de Unidad"

  const currentUnit = activeUnitId ? UNITS_DATA[activeUnitId] : null;

  // Lógica de navegación inteligente
  const handleBack = () => {
    if (activeTab) {
      // Si estamos en un ejercicio (Grammar, Vocab...), volvemos al Menú de Unidad
      setActiveTab(null);
    } else {
      // Si estamos en el Menú de Unidad, volvemos al Home
      setActiveUnitId(null);
    }
  };

  const renderContent = () => {
    if (!currentUnit) return null;
    
    // Si no hay tab seleccionado, mostramos el Dashboard de la Unidad
    if (!activeTab) {
        return <UnitMenu unit={currentUnit} onSelectTab={setActiveTab} onBack={handleBack} />;
    }

    // Si hay tab, mostramos el ejercicio correspondiente
    let ContentComponent;
    switch(activeTab) {
      case 'grammar': ContentComponent = GrammarLab; break;
      case 'vocab': ContentComponent = VocabLab; break;
      case 'listening': ContentComponent = AudioLab; break;
      case 'reading': ContentComponent = ReadingRoom; break;
      case 'writing': ContentComponent = WritingDraft; break;
      case 'discovery': ContentComponent = ActiveGrammarLab; break; // <--- CASO PARA DISCOVERY
      default: return null;
    }

    return (
        <div className="max-w-5xl mx-auto pt-10 px-4 animate-in slide-in-from-right duration-500">
            {/* Header Interno con pestañas */}
            <SectionHeader 
                title={currentUnit.title} 
                color="border-slate-800" 
                onBack={handleBack} 
            />
            
            {/* Barra de pestañas rápida (Opcional, para cambiar sin volver al menú) */}
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-6 mb-4 no-scrollbar items-center">
                <TabButton active={activeTab === 'grammar'} onClick={() => setActiveTab('grammar')} icon={<BookOpen size={18}/>} label="Grammar" />
                <TabButton active={activeTab === 'vocab'} onClick={() => setActiveTab('vocab')} icon={<Sofa size={18}/>} label="Vocab" />
                <TabButton active={activeTab === 'listening'} onClick={() => setActiveTab('listening')} icon={<Headphones size={18}/>} label="Audio" />
                <TabButton active={activeTab === 'reading'} onClick={() => setActiveTab('reading')} icon={<FileText size={18}/>} label="Reading" />
                <TabButton active={activeTab === 'writing'} onClick={() => setActiveTab('writing')} icon={<PenTool size={18}/>} label="Project" />
                
                {/* --- BOTÓN DISCOVERY (SOLO SI EXISTE activeRules) --- */}
                {currentUnit.activeRules && (
                    <>
                        <div className="w-px h-8 bg-slate-300 mx-2 hidden md:block"></div>
                        <TabButton 
                            active={activeTab === 'discovery'} 
                            onClick={() => setActiveTab('discovery')} 
                            icon={<Lightbulb size={18} className={activeTab === 'discovery' ? "text-yellow-300" : "text-amber-600"}/>} 
                            label="Discovery" 
                        />
                    </>
                )}
            </div>

            <ContentComponent data={currentUnit} />
        </div>
    );
  };

  /* --- VISTA: HOME (Selector de Unidades) --- */
  if (!activeUnitId) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
        <nav className="flex justify-center mb-12 mt-6">
            <div className="flex items-center gap-2 group cursor-default">
                <div className="bg-blue-700 p-2 rounded-xl rotate-3 shadow-lg"><Layers className="text-white" size={24} /></div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">English<span className="text-blue-700">Studio</span></h1>
            </div>
        </nav>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-700">
          {Object.values(UNITS_DATA).map((unit) => (
            <button 
                key={unit.id} 
                onClick={() => { setActiveUnitId(unit.id); setActiveTab(null); }} // Al entrar, vamos al menú (null)
                className="bg-white border-4 border-slate-200 p-8 rounded-[2.5rem] text-left hover:border-blue-700 hover:-translate-y-2 active:scale-95 transition-all shadow-xl group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Home size={80}/></div>
                <div className="flex items-start justify-between mb-4">
                   <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">{unit.id.split('-')[0]}</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-none mb-2">{unit.title}</h2>
                <p className="text-slate-500 font-bold text-sm">{unit.grammarTitle}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* --- VISTA: UNIDAD ACTIVA (Menú o Ejercicio) --- */
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
         {renderContent()}
    </div>
  );
};

// Botón de pestaña pequeño
const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl border-b-4 transition-all font-black uppercase text-xs tracking-widest whitespace-nowrap
        ${active 
            ? 'bg-slate-900 text-white border-black scale-105 shadow-lg' 
            : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300'}
        `}
    >
        {icon} {label}
    </button>
);

export default App;