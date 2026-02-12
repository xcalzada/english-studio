import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, ArrowRight, BookOpen, PenTool, Zap, Star, Layout 
} from 'lucide-react';

const GrammarLab = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  
  const theory = data.theoryBlock || {};

  // --- PALETAS DE COLOR (Para que no sea todo blanco) ---
  const palettes = [
    { 
      bg: 'bg-emerald-100', border: 'border-emerald-600', 
      header: 'bg-emerald-600', text: 'text-emerald-900', 
      icon: <CheckCircle className="text-white" size={20} /> 
    },
    { 
      bg: 'bg-blue-100', border: 'border-blue-600', 
      header: 'bg-blue-600', text: 'text-blue-900', 
      icon: <Layout className="text-white" size={20} /> 
    },
    { 
      bg: 'bg-rose-100', border: 'border-rose-600', 
      header: 'bg-rose-600', text: 'text-rose-900', 
      icon: <Zap className="text-white" size={20} /> 
    },
    { 
      bg: 'bg-amber-100', border: 'border-amber-600', 
      header: 'bg-amber-600', text: 'text-amber-900', 
      icon: <Star className="text-white" size={20} /> 
    }
  ];

  // --- LÓGICA DE TEXTO ---
  // Forzamos que los colores internos del HTML (span) sean oscuros para leerse bien sobre fondo de color
  const cleanHtml = (html) => {
    return html
      .replace(/text-(emerald|blue|orange|red|white|purple|teal|sky|rose|amber|violet)-[12]00/g, 'text-slate-950 font-black')
      .replace(/text-emerald-700|text-rose-700|text-blue-700|text-indigo-700/g, 'text-slate-950 font-black underline decoration-2 underline-offset-4');
  };

  // --- LÓGICA DE VALIDACIÓN (La robusta que hicimos antes) ---
  const isItemCorrect = (item) => {
    const itemState = userAnswers[item.id] || {};
    const gapCount = item.q.split('______').length - 1;
    const correctAnswers = item.ans.includes(',') 
        ? item.ans.split(',').map(s => s.trim().toLowerCase()) 
        : [item.ans.trim().toLowerCase()];

    for (let i = 0; i < gapCount; i++) {
        const userVal = (itemState[i] || "").toString().trim().toLowerCase();
        if (userVal === "") return false;
        if (correctAnswers.length === gapCount) {
            if (userVal !== correctAnswers[i]) return false;
        } else {
            if (!correctAnswers.includes(userVal)) return false;
        }
    }
    return true;
  };

  const handleInputChange = (itemId, boxIndex, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [boxIndex]: value }
    }));
  };

  const handleCheck = (id) => {
    if (!checkedIds.includes(id)) setCheckedIds([...checkedIds, id]);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* 1. SECCIÓN DE TEORÍA: TARJETAS DE COLORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(theory).map(([key, block], index) => {
            // Asignamos una paleta rotativa basada en el índice
            const style = palettes[index % palettes.length];
            
            return (
                <div key={key} className={`${style.bg} border-4 ${style.border} rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform duration-300`}>
                  {/* Cabecera de la tarjeta */}
                  <div className={`${style.header} p-5 border-b-4 ${style.border} flex items-center gap-3 text-white`}>
                    <div className="bg-black/20 p-2 rounded-lg">{style.icon}</div>
                    <h4 className="font-black uppercase text-sm tracking-[0.2em]">{block.title}</h4>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6 space-y-4">
                    {block.content.map((line, i) => (
                      <div key={i} className="bg-white/60 p-4 rounded-xl border-2 border-black/5 flex items-start gap-3 shadow-sm">
                        <ArrowRight size={18} className={`mt-1 ${style.text} opacity-50 shrink-0`} />
                        <span className={`font-bold text-slate-800 leading-relaxed`} dangerouslySetInnerHTML={{ __html: cleanHtml(line) }} />
                      </div>
                    ))}
                  </div>
                </div>
            );
        })}
      </div>

      {/* 2. EJERCICIOS: ZONA DE PRÁCTICA */}
      <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-slate-100 pb-6">
            <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white p-4 rounded-2xl rotate-3 shadow-lg"><PenTool size={28}/></div>
                <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Practice Zone</h3>
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Challenge yourself</p>
                </div>
            </div>
            {/* Pequeño contador discreto */}
            <div className="bg-slate-100 px-4 py-2 rounded-lg font-black text-slate-500 text-xs uppercase tracking-widest border-2 border-slate-200">
                {checkedIds.length} / {data.theoryQuiz.length} Completed
            </div>
        </div>

        <div className="space-y-6">
          {data.theoryQuiz.map((item, idx) => {
            const isChecked = checkedIds.includes(item.id);
            const isCorrect = isChecked ? isItemCorrect(item) : false;
            const sentenceParts = item.q.split('______');

            return (
              <div key={item.id} className={`p-6 rounded-[1.5rem] border-2 transition-all duration-300 ${isChecked ? (isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500') : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-md'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    
                    {/* Número */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${isChecked ? (isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-white border-2 border-slate-300 text-slate-400'}`}>
                        {idx + 1}
                    </div>
                    
                    {/* Frase e Inputs */}
                    <div className="flex-grow font-bold text-slate-800 text-lg leading-loose">
                        {sentenceParts.map((part, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <span dangerouslySetInnerHTML={{__html: part}} />
                            {pIdx < sentenceParts.length - 1 && (
                              <input 
                                disabled={isChecked}
                                value={userAnswers[item.id]?.[pIdx] || ''} 
                                className={`
                                    mx-2 border-b-4 px-2 py-1 text-center focus:outline-none font-black uppercase w-36 md:w-48 transition-all rounded-t-lg
                                    ${isChecked 
                                        ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900 line-through decoration-rose-900')
                                        : 'border-slate-300 bg-white focus:border-indigo-600 focus:bg-indigo-50 text-indigo-900 placeholder:text-slate-300 shadow-sm'
                                    }
                                `} 
                                placeholder="?"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(item.id, pIdx, e.target.value)}
                              />
                            )}
                          </React.Fragment>
                        ))}
                    </div>

                    {/* Botón Acción */}
                    <div className="shrink-0 mt-4 lg:mt-0">
                        {!isChecked ? (
                            <button 
                                onClick={() => handleCheck(item.id)} 
                                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all border-2 border-transparent"
                            >
                                CHECK
                            </button>
                        ) : (
                            <div className={`flex items-center gap-2 font-black uppercase text-xs px-5 py-3 rounded-xl border-2 shadow-sm ${isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}`}>
                                {isCorrect ? <CheckCircle size={18}/> : <XCircle size={18}/>} 
                                {isCorrect ? 'CORRECT' : 'ERROR'}
                            </div>
                        )}
                    </div>
                  </div>

                  {/* Feedback Técnico */}
                  {isChecked && !isCorrect && (
                    <div className="mt-4 bg-rose-100/50 p-4 rounded-xl border-l-4 border-rose-500 animate-in slide-in-from-top-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
                             <span className="font-black text-rose-700 uppercase text-xs tracking-widest">Correct Answer:</span> 
                             <span className="bg-white px-3 py-1 rounded-md border border-rose-200 font-black text-slate-800 shadow-sm">{item.ans}</span>
                        </div>
                        <p className="mt-2 text-slate-600 italic text-sm border-t border-rose-200/50 pt-2">{item.explanation}</p>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GrammarLab;