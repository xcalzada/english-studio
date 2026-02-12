import React, { useState, useEffect } from 'react';
import { 
  Volume2, RotateCcw, Keyboard, Sparkles, ArrowRight, Languages
} from 'lucide-react';

const VocabLab = ({ data }) => {
  const [mode, setMode] = useState('study'); // 'study' | 'test'
  
  useEffect(() => {
    setMode('study');
  }, [data.id]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* 1. SELECTOR DE MODO (Estilo Reading) */}
      <div className="flex justify-center">
          <div className="bg-white p-2 rounded-full flex gap-2 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <button 
                onClick={() => setMode('study')} 
                className={`
                    px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2 border-4
                    ${mode === 'study' 
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] scale-105' 
                        : 'text-slate-400 border-transparent hover:text-indigo-500 hover:bg-indigo-50'}
                `}
              >
                <Languages size={18}/> Study
              </button>
              <button 
                onClick={() => setMode('test')} 
                className={`
                    px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2 border-4
                    ${mode === 'test' 
                        ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-[4px_4px_0px_0px_rgba(192,38,211,1)] scale-105' 
                        : 'text-slate-400 border-transparent hover:text-fuchsia-500 hover:bg-fuchsia-50'}
                `}
              >
                <Keyboard size={18}/> Test
              </button>
          </div>
      </div>

      {/* 2. GRID DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.vocabulary.map(item => (
          <VocabCard 
            key={item.id} 
            item={item} 
            mode={mode} 
            onSpeak={() => speak(item.word)} 
          />
        ))}
      </div>
    </div>
  );
};

/* --- Componente Individual de Tarjeta --- */
const VocabCard = ({ item, mode, onSpeak }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'

    useEffect(() => {
        setInput('');
        setStatus('idle');
    }, [mode]);

    const handleCheck = () => {
        const normalize = (txt) => txt.toLowerCase().trim();
        if (normalize(input) === normalize(item.word)) {
            setStatus('correct');
            onSpeak(); 
        } else {
            setStatus('incorrect');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleCheck();
    };

    // --- MODO ESTUDIO (Estilo Reading) ---
    if (mode === 'study') {
        return (
            <div 
                onClick={onSpeak}
                className="group relative bg-[#fffdf5] border-4 border-slate-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-center"
            >
                {/* Badge Español (Flotante - Estilo Reading) */}
                <div className="absolute -top-1 right-10 bg-amber-400 text-amber-900 px-4 py-2 rounded-b-xl border-x-4 border-b-4 border-slate-900 font-black uppercase text-[10px] tracking-widest rotate-3 group-hover:rotate-6 transition-transform z-10">
                    {item.span}
                </div>

                {/* Icono de fondo decorativo */}
                <div className="absolute top-0 left-0 p-8 opacity-5 pointer-events-none text-slate-900">
                    <Sparkles size={120} />
                </div>

                {/* Palabra Principal */}
                <div className="text-center px-4 relative z-10 mb-8">
                    <p className="font-black text-4xl text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300 border-l-4 border-indigo-500 pl-4">
                        {item.word}
                    </p>
                </div>

                {/* --- BOTÓN DE PLAY (Estilo Reading) --- */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white text-indigo-600 p-4 rounded-full border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-700 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">
                        <Volume2 size={24} strokeWidth={3} className="group-hover:animate-pulse" />
                    </div>
                </div>

                {/* Fondo Decorativo Sutil */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        );
    }

    // --- MODO TEST (Estilo Reading) ---
    return (
        <div className={`
            relative rounded-[2.5rem] transition-all overflow-hidden flex flex-col min-h-[220px] md:min-h-[260px] border-4 border-slate-900
            ${status === 'correct' ? 'bg-emerald-50 shadow-[12px_12px_0px_0px_#10b981]' : ''}
            ${status === 'incorrect' ? 'bg-rose-50 shadow-[12px_12px_0px_0px_#f43f5e]' : ''}
            ${status === 'idle' ? 'bg-[#fffdf5] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]' : ''}
        `}>
            
            {/* Badge Flotante (Estilo Reading) */}
            <div className="absolute -top-1 left-10 z-10">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl border-x-4 border-b-4 border-slate-900 ${status === 'idle' ? 'bg-fuchsia-600 text-white' : status === 'correct' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                    Translate
                </span>
            </div>
            
            {/* Header del Test */}
            <div className="absolute top-0 right-0 w-full p-5 flex justify-end items-center z-10">
                {status !== 'idle' && (
                    <button onClick={() => { setStatus('idle'); setInput(''); }} className="bg-white border-4 border-slate-900 p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-slate-400 hover:text-slate-800 hover:rotate-180 hover:-translate-y-1 transition-all">
                        <RotateCcw size={18}/>
                    </button>
                )}
            </div>

            {/* Cuerpo del Test */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 mt-4">
                
                {/* Pregunta (Estilo Reading) */}
                <p className="text-2xl font-black text-slate-700 mb-6 bg-white px-4 py-2 rounded-xl border-l-4 border-slate-900">
                    "{item.span}"
                </p>

                {/* Zona de Respuesta */}
                <div className="w-full relative">
                    {status === 'correct' ? (
                        <div className="text-center animate-in zoom-in duration-300">
                             <p className="text-emerald-600 font-black text-3xl capitalize">{item.word}</p>
                             <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1">Correct!</div>
                        </div>
                    ) : (
                        <>
                            <div className="relative group">
                                <input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className={`
                                        w-full bg-white border-4 text-center py-3 px-4 rounded-xl font-black text-xl outline-none uppercase placeholder:normal-case transition-all
                                        ${status === 'incorrect' 
                                            ? 'border-rose-500 text-rose-800 placeholder:text-rose-300 shadow-[4px_4px_0px_0px_#f43f5e]' 
                                            : 'border-slate-300 focus:border-fuchsia-500 focus:shadow-[4px_4px_0px_0px_#c026d3] text-slate-800 placeholder:text-slate-300'}
                                    `}
                                    placeholder="..."
                                    autoComplete="off"
                                />
                                <button 
                                    onClick={handleCheck}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-fuchsia-600 text-white p-2 rounded-lg border-4 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-all"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Mensaje de Error (Estilo Reading) */}
                            {status === 'incorrect' && (
                                <div className="absolute -bottom-12 left-0 w-full text-center animate-in fade-in slide-in-from-top-1">
                                    <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-300">
                                        <span className="text-xs font-black uppercase text-rose-800 tracking-widest">Ans:</span>
                                        <span className="text-rose-900 font-bold">{item.word}</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VocabLab;