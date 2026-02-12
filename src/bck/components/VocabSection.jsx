import React, { useState } from 'react';
import { Layout, Languages, Volume2, Download, CheckCircle, Pencil, XCircle } from 'lucide-react';
import { speakUK } from '../utils/speech';

/**
 * VocabSection Component
 * Gestiona el aprendizaje de vocabulario y la exportación a Anki.
 * Se ha eliminado la dependencia de imágenes externas para garantizar estabilidad.
 */
const VocabSection = ({ data, state, setState }) => {
  const [phase, setPhase] = useState('study');
  const [showResults, setShowResults] = useState(false);

  /**
   * Genera y descarga un archivo .txt compatible con el importador de Anki.
   * Formato: Inglés {tab} Español
   */
  const exportToAnki = () => {
    // Cabecera básica para Anki (separador por tabulador)
    let content = "#separator:tab\n#html:true\n#tags:EnglishStudio\n";
    
    data.vocabulary.forEach(item => {
      const english = item.word;
      const spanish = item.span;
      
      // Estilo simple para el reverso en Anki
      const backSide = `<div style='text-align:center; font-family:Arial; padding: 20px;'><b style='font-size:32px; color:#e91e63; text-transform:uppercase;'>${spanish}</b></div>`;
      
      // Estructura: Frente [TAB] Reverso
      content += `${english}\t${backSide}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Anki_${data.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* PANEL DE CONTROL SUPERIOR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-[2.5rem] border-4 border-slate-100 shadow-xl">
        <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-slate-200 shadow-inner">
          <button 
            onClick={() => { setPhase('study'); setShowResults(false); }} 
            className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${phase === 'study' ? 'bg-pink-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Estudiar
          </button>
          <button 
            onClick={() => setPhase('test')} 
            className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${phase === 'test' ? 'bg-pink-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Test
          </button>
        </div>

        <button 
          onClick={exportToAnki}
          className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-8 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-600 hover:text-white transition-all border-b-4 border-emerald-200 active:translate-y-1 active:border-b-0 shadow-md"
        >
          <Download size={20} /> Exportar para Anki
        </button>
      </div>

      {phase === 'study' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.vocabulary.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border-4 border-slate-100 shadow-lg group hover:border-pink-300 transition-all hover:-translate-y-1 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-black text-2xl text-slate-800 uppercase italic tracking-tighter leading-none">
                  {item.word}
                </span>
                <span className="text-pink-500 font-bold text-sm uppercase tracking-widest mt-2 flex items-center gap-1">
                  <Languages size={14} /> {item.span}
                </span>
              </div>
              <button 
                onClick={() => speakUK(item.word)} 
                className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:bg-pink-600 hover:text-white transition-all shadow-inner group-active:scale-90"
              >
                <Volume2 size={24} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[56px] border-4 border-pink-100 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-pink-100 p-3 rounded-2xl text-pink-600">
              <Pencil size={24} />
            </div>
            <h4 className="font-black text-3xl text-slate-800 uppercase italic tracking-tighter">Vocabulary Test</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.vocabulary.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2 group">
                <div className="flex justify-between items-center px-2">
                   <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{item.span}</span>
                   {showResults && (
                     state[item.id]?.toLowerCase().trim() === item.word 
                     ? <CheckCircle size={16} className="text-emerald-500" />
                     : <XCircle size={16} className="text-red-400" />
                   )}
                </div>
                <input 
                  value={state[item.id] || ''}
                  className={`p-4 rounded-2xl border-4 text-lg font-black uppercase transition-all outline-none ${showResults ? (state[item.id]?.toLowerCase().trim() === item.word ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700 shadow-inner') : 'border-slate-100 focus:border-pink-500 focus:bg-pink-50/10'}`}
                  placeholder="..."
                  onChange={(e) => setState({...state, [item.id]: e.target.value})}
                />
                {showResults && state[item.id]?.toLowerCase().trim() !== item.word && (
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest pl-2">Correcto: {item.word}</span>
                )}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowResults(true)} 
            className="w-full mt-12 bg-pink-600 text-white py-6 rounded-[2.5rem] font-black uppercase text-xl shadow-2xl border-b-8 border-pink-900 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-4"
          >
             Verify Results
          </button>
        </div>
      )}
      
      {/* PIE DE PÁGINA INFORMATIVO */}
      <div className="bg-slate-100/50 p-6 rounded-3xl border-2 border-slate-100 text-[10px] text-slate-400 font-bold uppercase text-center tracking-[0.2em] leading-loose">
        ✅ Exportación a Anki simplificada (Solo texto). <br/>
        💡 TIP: Al importar el archivo .txt en Anki, usa el tipo de nota "Básico" para que aparezca la palabra en inglés delante y la traducción detrás.
      </div>
    </div>
  );
};

export default VocabSection;