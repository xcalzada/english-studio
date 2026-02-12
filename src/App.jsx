import React, { useState } from 'react';
import { 
  Layers, Home, BookOpen, Sofa, Headphones, FileText, PenTool, Lightbulb 
} from 'lucide-react';
import { UNITS_DATA } from './data'; 

// Components
import { UnitMenu } from './components/ui/UnitMenu'; 
import GrammarLab from './components/features/GrammarLab';
import VocabLab from './components/features/VocabLab';
import AudioLab from './components/features/AudioLab';
import WritingDraft from './components/features/WritingDraft';
import ReadingRoom from './components/features/ReadingRoom';
import ActiveGrammarLab from './components/features/ActiveGrammarLab'; 
import { SectionHeader } from './components/ui/Neubrutal';

const App = () => {
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeTab, setActiveTab] = useState(null); 

  const currentUnit = activeUnitId ? UNITS_DATA[activeUnitId] : null;

  const handleBack = () => {
    if (activeTab) {
      setActiveTab(null);
    } else {
      setActiveUnitId(null);
    }
  };

  const renderContent = () => {
    if (!currentUnit) return null;
    
    if (!activeTab) {
        return <UnitMenu unit={currentUnit} onSelectTab={setActiveTab} onBack={handleBack} />;
    }

    let ContentComponent;
    switch(activeTab) {
      case 'grammar': ContentComponent = GrammarLab; break;
      case 'vocab': ContentComponent = VocabLab; break;
      case 'listening': ContentComponent = AudioLab; break;
      case 'reading': ContentComponent = ReadingRoom; break;
      case 'writing': ContentComponent = WritingDraft; break;
      case 'discovery': ContentComponent = ActiveGrammarLab; break; 
      default: return null;
    }

    return (
        // CAMBIO 1: ANCHO MÁS GRANDE (max-w-7xl en lugar de 5xl)
        <div className="max-w-7xl mx-auto pt-10 px-6 animate-in slide-in-from-right duration-500">
            <SectionHeader 
                title={currentUnit.title} 
                color="border-slate-800" 
                onBack={handleBack} 
            />
            
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-6 mb-4 no-scrollbar items-center">
                <TabButton active={activeTab === 'grammar'} onClick={() => setActiveTab('grammar')} icon={<BookOpen size={18}/>} label="Grammar" />
                <TabButton active={activeTab === 'vocab'} onClick={() => setActiveTab('vocab')} icon={<Sofa size={18}/>} label="Vocab" />
                <TabButton active={activeTab === 'listening'} onClick={() => setActiveTab('listening')} icon={<Headphones size={18}/>} label="Audio" />
                <TabButton active={activeTab === 'reading'} onClick={() => setActiveTab('reading')} icon={<FileText size={18}/>} label="Reading" />
                <TabButton active={activeTab === 'writing'} onClick={() => setActiveTab('writing')} icon={<PenTool size={18}/>} label="Project" />
                
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

  /* --- VISTA: HOME --- */
  if (!activeUnitId) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
        <nav className="flex justify-center mb-16 mt-8">
            <div className="flex items-center gap-2 group cursor-default">
                <div className="bg-blue-700 p-3 rounded-2xl rotate-3 shadow-lg"><Layers className="text-white" size={32} /></div>
                <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-900">English<span className="text-blue-700">Studio</span></h1>
            </div>
        </nav>
        
        {/* CAMBIO 2: ANCHO DE HOME Y COLUMNAS (max-w-7xl y lg:grid-cols-3) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
          {Object.values(UNITS_DATA).map((unit) => (
            <button 
                key={unit.id} 
                onClick={() => { setActiveUnitId(unit.id); setActiveTab(null); }} 
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
         {renderContent()}
    </div>
  );
};

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