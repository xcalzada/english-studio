import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle, XCircle, RotateCcw, Keyboard } from 'lucide-react';

const VocabLab = ({ data }) => {
  const [mode, setMode] = useState('study'); // 'study' | 'test'
  
  // Reseteamos estados al cambiar de unidad
  useEffect(() => {
    setMode('study');
  }, [data.id]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Selector de Modo */}
      <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1 border-2 border-slate-200">
              <button 
                onClick={() => setMode('study')} 
                className={`px-6 py-2 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${mode === 'study' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Study Mode
              </button>
              <button 
                onClick={() => setMode('test')} 
                className={`px-6 py-2 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${mode === 'test' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Test Mode
              </button>
          </div>
      </div>

      {/* 2. Rejilla de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    // Reseteamos la tarjeta si cambia el modo
    useEffect(() => {
        setInput('');
        setStatus('idle');
    }, [mode]);

    const handleCheck = () => {
        const normalize = (txt) => txt.toLowerCase().trim();
        if (normalize(input) === normalize(item.word)) {
            setStatus('correct');
            onSpeak(); // Pronuncia si acierta
        } else {
            setStatus('incorrect');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleCheck();
    };

    // --- RENDERIZADO MODO ESTUDIO (Solo lectura) ---
    if (mode === 'study') {
        return (
            <div className="bg-white border-4 border-slate-200 rounded-[2rem] p-6 shadow-lg hover:border-pink-300 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-pink-100">
                        Esp: {item.span}
                    </span>
                    <button onClick={onSpeak} className="p-3 bg-slate-50 rounded-full text-slate-400 hover:bg-pink-500 hover:text-white transition-all active:scale-90">
                        <Volume2 size={20}/>
                    </button>
                </div>
                <div className="text-center py-6">
                    <p className="font-black text-3xl text-slate-800 capitalize tracking-tight">{item.word}</p>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO MODO TEST (Input de escritura) ---
    return (
        <div className={`
            border-4 rounded-[2rem] p-6 shadow-lg transition-all relative overflow-hidden
            ${status === 'correct' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}
            ${status === 'incorrect' ? 'border-rose-300' : ''}
        `}>
            {/* Header: Palabra en Español */}
            <div className="flex justify-between items-center mb-6 border-b-2 border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-slate-400">
                    <Keyboard size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Translate this</span>
                </div>
                {status !== 'idle' && (
                    <button onClick={() => { setStatus('idle'); setInput(''); }} className="text-slate-300 hover:text-slate-600">
                        <RotateCcw size={16}/>
                    </button>
                )}
            </div>

            {/* Palabra Objetivo (Español) */}
            <p className="text-center font-black text-2xl text-slate-800 mb-6 capitalize italic">
                "{item.span}"
            </p>

            {/* Zona de Input */}
            <div className="relative">
                {status === 'correct' ? (
                    // Estado Correcto
                    <div className="text-center animate-in zoom-in duration-300">
                         <div className="inline-flex items-center gap-2 bg-emerald-200 text-emerald-900 px-4 py-2 rounded-xl font-black uppercase text-sm mb-2">
                             <CheckCircle size={18}/> Correct
                         </div>
                         <p className="text-emerald-700 font-bold text-lg capitalize">{item.word}</p>
                    </div>
                ) : (
                    // Input de Texto
                    <>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`
                                w-full bg-slate-50 border-b-4 text-center py-3 font-bold text-lg outline-none uppercase placeholder:normal-case transition-colors
                                ${status === 'incorrect' 
                                    ? 'border-rose-400 text-rose-700 bg-rose-50' 
                                    : 'border-slate-300 focus:border-indigo-600 text-slate-800 focus:bg-white'}
                            `}
                            placeholder="Type in English..."
                            autoComplete="off"
                        />
                        
                        {/* Botón Flotante Check */}
                        <button 
                            onClick={handleCheck}
                            className="absolute right-2 top-2 p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                        >
                            <CheckCircle size={20} />
                        </button>

                        {/* Mensaje de error */}
                        {status === 'incorrect' && (
                            <div className="mt-4 text-center animate-in slide-in-from-top-2">
                                <p className="text-xs font-black text-rose-500 uppercase mb-1">Incorrect. Answer:</p>
                                <p className="text-slate-800 font-bold">{item.word}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VocabLab;