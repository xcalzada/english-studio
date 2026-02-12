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
      
      {/* 1. SELECTOR DE MODO */}
      <div className="flex justify-center">
          <div className="bg-white p-2 rounded-full flex gap-2 border-4 border-indigo-100 shadow-xl">
              <button 
                onClick={() => setMode('study')} 
                className={`
                    px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2
                    ${mode === 'study' 
                        ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                        : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-50'}
                `}
              >
                <Languages size={18}/> Study
              </button>
              <button 
                onClick={() => setMode('test')} 
                className={`
                    px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2
                    ${mode === 'test' 
                        ? 'bg-fuchsia-600 text-white shadow-lg scale-105' 
                        : 'text-slate-400 hover:text-fuchsia-500 hover:bg-fuchsia-50'}
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

    // --- MODO ESTUDIO ---
    if (mode === 'study') {
        return (
            <div 
                onClick={onSpeak}
                className="group relative bg-white border-4 border-indigo-600 rounded-[2.5rem] shadow-[8px_8px_0px_0px_#4f46e5] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#4f46e5] transition-all cursor-pointer overflow-hidden h-72 flex flex-col items-center justify-center"
            >
                {/* Badge Español (Flotante) */}
                <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest border-2 border-yellow-500 shadow-sm rotate-3 group-hover:rotate-6 transition-transform z-10">
                    {item.span}
                </div>

                {/* Badge Decorativo (Icono) */}
                <div className="absolute top-6 left-6 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                    <Sparkles size={28} />
                </div>

                {/* Palabra Principal */}
                <div className="text-center px-4 relative z-10 mb-8">
                    <p className="font-black text-4xl text-indigo-950 tracking-tight group-hover:scale-110 transition-transform duration-300">
                        {item.word}
                    </p>
                </div>

                {/* --- NUEVO BOTÓN DE PLAY (ANIMADO) --- */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                        <Volume2 size={24} strokeWidth={3} className="group-hover:animate-pulse" />
                    </div>
                </div>

                {/* Fondo Decorativo Sutil */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        );
    }

    // --- MODO TEST (Sin cambios, ya estaba bien) ---
    return (
        <div className={`
            relative rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] transition-all overflow-hidden flex flex-col h-72 border-4
            ${status === 'correct' ? 'bg-emerald-50 border-emerald-500 shadow-[8px_8px_0px_0px_#10b981]' : ''}
            ${status === 'incorrect' ? 'bg-rose-50 border-rose-500 shadow-[8px_8px_0px_0px_#f43f5e]' : ''}
            ${status === 'idle' ? 'bg-white border-fuchsia-600 shadow-[8px_8px_0px_0px_#c026d3]' : ''}
        `}>
            
            {/* Header del Test */}
            <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-10">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${status === 'idle' ? 'bg-fuchsia-100 text-fuchsia-800' : 'bg-white/50'}`}>
                    Translate
                </span>
                {status !== 'idle' && (
                    <button onClick={() => { setStatus('idle'); setInput(''); }} className="text-slate-400 hover:text-slate-800 hover:rotate-180 transition-all p-1">
                        <RotateCcw size={18}/>
                    </button>
                )}
            </div>

            {/* Cuerpo del Test */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 mt-4">
                
                {/* Pregunta */}
                <p className="text-2xl font-black text-slate-700 mb-6 bg-slate-100 px-4 py-1 rounded-xl border-2 border-slate-200">
                    "{item.span}"
                </p>

                {/* Zona de Respuesta */}
                <div className="w-full relative">
                    {status === 'correct' ? (
                        <div className="text-center animate-in zoom-in duration-300">
                             <p className="text-emerald-600 font-black text-3xl capitalize drop-shadow-sm">{item.word}</p>
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
                                        w-full bg-transparent border-b-4 text-center py-2 font-black text-xl outline-none uppercase placeholder:normal-case transition-all
                                        ${status === 'incorrect' 
                                            ? 'border-rose-400 text-rose-800 placeholder:text-rose-300' 
                                            : 'border-slate-200 focus:border-fuchsia-500 text-slate-800 placeholder:text-slate-300'}
                                    `}
                                    placeholder="..."
                                    autoComplete="off"
                                />
                                <button 
                                    onClick={handleCheck}
                                    className="absolute right-2 top-2 text-slate-300 hover:text-fuchsia-600 transition-colors"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            </div>

                            {/* Mensaje de Error */}
                            {status === 'incorrect' && (
                                <div className="absolute -bottom-10 left-0 w-full text-center animate-in fade-in slide-in-from-top-1">
                                    <p className="text-xs font-bold text-rose-500 bg-white/80 inline-block px-2 rounded">
                                        Ans: {item.word}
                                    </p>
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