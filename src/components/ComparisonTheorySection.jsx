import React, { useState } from 'react';
import { 
  Sparkles, Zap, Star, Award, 
  CheckCircle, HelpCircle, ArrowRight,
  Info, XCircle, Lightbulb, Trophy, BookOpen
} from 'lucide-react';

/**
 * ComparisonTheorySection (Versión Genérica)
 * Este componente es ahora universal. Funciona con cualquier unidad gramatical.
 * - Asigna colores automáticamente por orden de aparición.
 * - Limpia el HTML para garantizar legibilidad.
 * - Layout responsivo automático (2 columnas en desktop).
 * - Feedback de Quiz con CONTRASTE MÁXIMO en los FONDOS de respuesta.
 */
const ComparisonTheorySection = ({ data, state, setState }) => {
  const [checkedIds, setCheckedIds] = useState([]);
  const theory = data.theoryBlock || {};

  const handleCheckAnswer = (id) => {
    if (!checkedIds.includes(id)) {
      setCheckedIds([...checkedIds, id]);
    }
  };

  // Paletas de colores profesionales de alto contraste (se asignan por orden)
  const palettes = [
    {
      container: "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-2xl",
      header: "bg-emerald-700 text-white shadow-md",
      item: "bg-emerald-200/90 border-emerald-500 text-slate-950 shadow-sm",
      icon: <CheckCircle className="text-white" size={18} />
    },
    {
      container: "bg-sky-100 border-sky-600 text-sky-950 shadow-2xl",
      header: "bg-sky-700 text-white shadow-md",
      item: "bg-sky-200/90 border-sky-500 text-slate-950 shadow-sm",
      icon: <Star className="text-white" size={18} />
    },
    {
      container: "bg-rose-100 border-rose-600 text-rose-950 shadow-2xl",
      header: "bg-rose-700 text-white shadow-md",
      item: "bg-rose-200/90 border-rose-500 text-slate-950 shadow-sm",
      icon: <Zap className="text-white" size={18} />
    },
    {
      container: "bg-amber-100 border-amber-600 text-amber-950 shadow-2xl",
      header: "bg-amber-700 text-white shadow-md",
      item: "bg-amber-200/90 border-amber-500 text-slate-950 shadow-sm",
      icon: <Award className="text-white" size={18} />
    },
    {
      container: "bg-purple-100 border-purple-600 text-purple-950 shadow-2xl",
      header: "bg-purple-700 text-white shadow-md",
      item: "bg-purple-200/90 border-purple-500 text-slate-950 shadow-sm",
      icon: <Sparkles className="text-white" size={18} />
    },
    {
      container: "bg-indigo-100 border-indigo-600 text-indigo-950 shadow-2xl",
      header: "bg-indigo-700 text-white shadow-md",
      icon: <BookOpen className="text-white" size={18} />,
      item: "bg-indigo-200/90 border-indigo-500 text-slate-950 shadow-sm"
    }
  ];

  const cleanHtml = (html) => {
    return html
      .replace(/text-(emerald|blue|orange|red|white|purple|teal|sky|rose|amber|violet)-[12]00/g, 'text-slate-950 font-black')
      .replace(/text-emerald-700|text-rose-700|text-blue-700|text-indigo-700/g, 'text-slate-950 font-black underline');
  };

  // Convertimos el objeto de teoría en un array para poder usar el índice
  const theoryEntries = Object.entries(theory);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      
      {/* 1. SECCIÓN DE TEORÍA DINÁMICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {theoryEntries.map(([key, block], index) => {
          const style = palettes[index % palettes.length];
          
          return (
            <div 
              key={key} 
              className={`${style.container} rounded-[2.5rem] border-4 flex flex-col overflow-hidden transition-all shadow-2xl hover:scale-[1.01]`}
            >
              <div className={`${style.header} p-6 flex items-center justify-between border-b-2 border-black/10`}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-black/20 rounded-xl shadow-inner border border-white/20">
                    {style.icon}
                  </div>
                  <h4 className="font-black italic uppercase text-xs tracking-[0.1em] leading-none">
                    {block.title}
                  </h4>
                </div>
                <Lightbulb size={20} className="opacity-50" />
              </div>

              <div className="p-6 md:p-8 flex-grow space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {block.content.map((line, i) => (
                    <div 
                      key={i} 
                      className={`${style.item} flex items-center gap-4 p-5 rounded-[1.8rem] border-2 transition-all shadow-md`}
                    >
                      <ArrowRight size={16} className="opacity-80 shrink-0 text-slate-800" />
                      <div 
                        className="text-base font-bold leading-tight text-slate-950" 
                        dangerouslySetInnerHTML={{ __html: cleanHtml(line) }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. LABORATORIO INTERACTIVO (QUIZ) */}
      <section className="bg-white p-6 md:p-12 rounded-[4rem] border-4 border-slate-300 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] -rotate-12 pointer-events-none">
          <Zap size={350} />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div className="flex items-center gap-5">
            <div className="bg-indigo-700 p-6 rounded-[2rem] text-white shadow-2xl rotate-3 border-b-8 border-indigo-900">
              <Sparkles size={36} />
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                Interactive Lab
              </h3>
              <p className="text-slate-600 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                Valida tus respuestas en tiempo real
              </p>
            </div>
          </div>
          
          <div className="bg-slate-200 px-8 py-5 rounded-[1.8rem] border-2 border-slate-400 shadow-inner flex items-center gap-4">
             <span className="text-sm font-black uppercase text-slate-700 tracking-widest">
               Progreso: {checkedIds.length}/{data.theoryQuiz.length}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {data.theoryQuiz.map((item, idx) => {
            const isChecked = checkedIds.includes(item.id);
            const userAns = (state[item.id] || '').toLowerCase().trim();
            const isCorrect = userAns === item.ans.toLowerCase().trim();

            return (
              <div 
                key={item.id} 
                className={`p-1 rounded-[2.5rem] transition-all duration-500 border-2 ${
                  isChecked 
                    ? (isCorrect ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500') 
                    : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 shadow-md transition-all ${
                      isChecked 
                        ? (isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') 
                        : 'bg-slate-900 text-white border-b-4 border-black'
                    }`}>
                      {idx + 1}
                    </div>
                    
                    <div className="flex-grow">
                      <p className="font-black text-slate-900 text-base md:text-lg flex flex-wrap items-center gap-4">
                        {item.q.split('______')[0]}
                        <input 
                          disabled={isChecked}
                          value={state[item.id] || ''} 
                          className={`border-4 rounded-xl px-4 py-2 w-56 text-center focus:outline-none font-black uppercase transition-all shadow-inner text-sm md:text-base ${
                            isChecked 
                              ? (isCorrect ? 'border-emerald-600 bg-emerald-200 text-emerald-900' : 'border-rose-600 bg-rose-200 text-rose-900')
                              : 'border-slate-800 bg-slate-100 text-indigo-950 focus:border-indigo-600 focus:bg-white placeholder:text-slate-400'
                          }`} 
                          placeholder="..."
                          onChange={(e) => setState({...state, [item.id]: e.target.value})} 
                        />
                        {item.q.split('______')[1]}
                      </p>
                    </div>

                    {!isChecked ? (
                      <button 
                        onClick={() => handleCheckAnswer(item.id)}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:bg-indigo-700 border-b-4 border-black active:translate-y-1 active:border-b-0 transition-all"
                      >
                        Check
                      </button>
                    ) : (
                      <div className={`flex items-center gap-3 font-black uppercase text-[10px] px-5 py-3 rounded-xl shadow-sm border-2 ${isCorrect ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700'}`}>
                        {isCorrect ? <CheckCircle size={18}/> : <XCircle size={18}/>} 
                        {isCorrect ? 'PERFECT' : 'INCORRECT'}
                      </div>
                    )}
                  </div>

                  {/* FEEDBACK REFORZADO CON FONDOS SÓLIDOS (MÁXIMO CONTRASTE) */}
                  {isChecked && (
                    <div className={`mt-5 p-5 rounded-3xl animate-in slide-in-from-top-3 duration-500 border-l-[10px] shadow-lg flex flex-col md:flex-row md:items-center gap-4 ${
                      isCorrect ? 'bg-emerald-200 border-emerald-600' : 'bg-rose-200 border-rose-600'
                    }`}>
                      <div className={`p-2 rounded-xl shadow-inner ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                        {isCorrect ? <CheckCircle size={20} /> : <HelpCircle size={20} />}
                      </div>
                      
                      {!isCorrect && (
                        <div className="flex items-center gap-3 mr-4 bg-white px-4 py-2 rounded-2xl border-2 border-rose-400 shadow-md">
                          <span className="text-[11px] font-black uppercase text-rose-600 tracking-tighter">Target:</span>
                          <span className="text-slate-950 font-black text-lg uppercase underline decoration-rose-500 decoration-4 underline-offset-2 italic">{item.ans}</span>
                        </div>
                      )}
                      
                      <p className={`text-sm font-black leading-tight flex-grow ${isCorrect ? 'text-emerald-950' : 'text-rose-950'}`}>
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {checkedIds.length === data.theoryQuiz.length && (
          <div className="mt-16 p-12 bg-slate-950 rounded-[3.5rem] text-center text-white shadow-[0_40px_80px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-1000 border-t-[8px] border-indigo-600">
             <Trophy size={80} className="mx-auto mb-6 text-yellow-400 animate-bounce" />
             <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-4">Mastery Achieved!</h4>
             <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] italic">¡Unidad completada con éxito!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ComparisonTheorySection;