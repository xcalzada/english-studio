import React, { useState, useEffect } from 'react';
import { Home, Layers, ArrowLeft, ChevronRight, BookOpen, Sofa, Headphones, FileText, PenTool } from 'lucide-react';

import { UNITS_DATA } from './data/units';
import TheorySection from './components/TheorySection';
import VocabSection from './components/VocabSection';
import ListeningSection from './components/ListeningSection';
import ReadingSection from './components/ReadingSection';
import WritingSection from './components/WritingSection';

const App = () => {
  const [view, setView] = useState('topic-selector'); 
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [theoryState, setTheoryState] = useState({});
  const [vocabTestState, setVocabTestState] = useState({});
  const [readingState, setReadingState] = useState({});
  const [writingState, setWritingState] = useState("");

  const currentUnit = UNITS_DATA[selectedUnitId];

  useEffect(() => {
    setTheoryState({}); setVocabTestState({}); setReadingState({}); setWritingState("");
  }, [selectedUnitId]);

  useEffect(() => { window.speechSynthesis.getVoices(); }, []);

  const renderNavHeader = (title) => (
    <div className="flex items-center space-x-4 mb-6">
      <button onClick={() => setView('unit-menu')} className="p-4 bg-white border-2 border-slate-200 hover:border-blue-400 rounded-2xl shadow-md text-slate-600 transition-all active:scale-95"><ArrowLeft size={28} /></button>
      <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter uppercase italic">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 pb-20">
      <nav className="bg-white/80 backdrop-blur-md border-b-2 border-slate-200 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('topic-selector')}>
          <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-xl"><Layers className="text-white" size={26} /></div>
          <span className="font-black text-3xl tracking-tighter text-slate-800 uppercase italic">English<span className="text-blue-600">Studio</span></span>
        </div>
        <div className="hidden md:flex bg-white px-5 py-2.5 rounded-2xl border-2 border-slate-200 shadow-sm items-center font-black text-xs text-slate-500 uppercase italic">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-3"></div>
          {currentUnit ? `Unit: ${currentUnit.title}` : 'Select Lesson'}
        </div>
      </nav>

      <main className="container mx-auto px-4 mt-8">
        {view === 'topic-selector' && (
          <div className="flex flex-col items-center justify-center min-h-[500px] p-4 max-w-4xl mx-auto animate-in fade-in duration-700">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-black text-slate-800 tracking-tighter uppercase italic">English <span className="text-blue-600">Studio</span></h1>
              <p className="text-slate-500 mt-2 font-medium text-lg uppercase tracking-widest italic">Selecciona una lección para empezar</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {Object.values(UNITS_DATA).map((unit) => (
                <button key={unit.id} onClick={() => { setSelectedUnitId(unit.id); setView('unit-menu'); }} 
                  className="bg-white border-4 border-slate-200 p-8 rounded-[40px] text-left transition-all relative overflow-hidden group shadow-lg hover:border-blue-500 hover:shadow-2xl hover:translate-y-[-8px] active:scale-95">
                  <div className="flex justify-between items-start mb-6"><div className="p-5 bg-slate-100 rounded-2xl group-hover:bg-blue-50 transition-all text-blue-600"><Home size={32}/></div><ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" /></div>
                  <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tighter">{unit.title}</h3><p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4">{unit.grammarTitle}</p>
                </button>
              ))}
              <div className="bg-slate-100 border-4 border-dashed border-slate-300 p-8 rounded-[40px] flex flex-col items-center justify-center text-slate-400 font-black uppercase italic tracking-widest text-center shadow-inner">
                <Layers className="mb-4 opacity-50" size={40}/>
                <span>Nueva Lección<br/>(Próximamente)</span>
              </div>
            </div>
          </div>
        )}

        {view === 'unit-menu' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
            <button onClick={() => setView('topic-selector')} className="flex items-center space-x-2 text-slate-400 hover:text-blue-600 font-black text-xs uppercase tracking-widest italic transition-colors">
              <ArrowLeft size={16} /> <span>Volver a unidades</span>
            </button>
            <div className="text-center mb-4"><h2 className="text-5xl font-black text-slate-800 uppercase italic tracking-tighter">{currentUnit.title}</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {currentUnit.theoryBlock && <UnitModuleButton icon={<BookOpen/>} title="1. Teoría" color="bg-blue-600" onClick={() => setView('theory')} />}
              {currentUnit.vocabulary && currentUnit.vocabulary.length > 0 && <UnitModuleButton icon={<Sofa/>} title="2. Vocabulario" color="bg-pink-600" onClick={() => setView('vocab')} />}
              {currentUnit.listening && <UnitModuleButton icon={<Headphones/>} title="3. Listening" color="bg-purple-600" onClick={() => setView('listening')} />}
              {currentUnit.reading && <UnitModuleButton icon={<FileText/>} title="4. Reading" color="bg-emerald-600" onClick={() => setView('reading')} />}
              <UnitModuleButton icon={<PenTool/>} title="5. Writing" color="bg-orange-600" onClick={() => setView('writing')} />
            </div>
          </div>
        )}

        {view === 'theory' && <div className="max-w-5xl mx-auto">{renderNavHeader("1. Grammar Blueprint")}<TheorySection data={currentUnit} state={theoryState} setState={setTheoryState} /></div>}
        {view === 'vocab' && <div className="max-w-5xl mx-auto">{renderNavHeader("2. Vocabulary Lab")}<VocabSection data={currentUnit} state={vocabTestState} setState={setVocabTestState} /></div>}
        {view === 'listening' && <div className="max-w-5xl mx-auto">{renderNavHeader("3. Listening Lab")}<ListeningSection data={currentUnit} /></div>}
        {view === 'reading' && <div className="max-w-5xl mx-auto">{renderNavHeader("4. Reading Master")}<ReadingSection data={currentUnit} state={readingState} setState={setReadingState} /></div>}
        {view === 'writing' && <div className="max-w-5xl mx-auto">{renderNavHeader("5. Final Writing")}<WritingSection data={currentUnit} state={writingState} setState={setWritingState} /></div>}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] z-40">English Studio • UK Accent Edition</footer>
    </div>
  );
};

const UnitModuleButton = ({ icon, title, color, onClick }) => (
  <button onClick={onClick} className="flex flex-col p-6 bg-white border-b-8 border-slate-200 rounded-[32px] hover:translate-y-[-5px] hover:border-blue-400 hover:shadow-xl transition-all text-left group shadow-lg active:border-b-0 active:translate-y-1">
    <div className={`${color} text-white p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform w-fit`}>{icon}</div>
    <h3 className="font-black text-xl text-slate-800 uppercase italic tracking-tighter leading-tight">{title}</h3>
  </button>
);

export default App;