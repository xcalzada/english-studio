import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Gauge } from 'lucide-react';

const ListeningSection = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [validated, setValidated] = useState(false);
  const [speed, setSpeed] = useState(0.85);
  
  // Estados de control de audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); 
  
  // Referencia al objeto de voz para controlarlo entre renders
  const utteranceRef = useRef(null);

  const isPerfect = selected.length === data.listening.correctItems.length && selected.every(i => data.listening.correctItems.includes(i));

  // Limpiar cualquier audio al cerrar el componente
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Si no está pausado, empezamos de cero
    window.speechSynthesis.cancel();
    
    const utt = new SpeechSynthesisUtterance(data.listening.text + " .");
    utt.lang = 'en-GB';
    utt.rate = speed;
    
    utt.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utt.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    // Actualizar la barra de progreso palabra por palabra
    utt.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const totalChars = data.listening.text.length;
        const currentProgress = (charIndex / totalChars) * 100;
        setProgress(currentProgress);
      }
    };

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handleRestart = () => {
    handleStop();
    // Pequeño retardo para asegurar que el navegador limpie la cola antes de reiniciar
    setTimeout(handlePlay, 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* PANEL DE CONTROL DE AUDIO */}
      <div className="bg-purple-600 p-8 rounded-[40px] text-white shadow-2xl border-b-8 border-purple-800">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Advanced Audio Lab</h3>
            <p className="text-purple-100 font-medium italic text-sm">Controla la lectura del texto en tiempo real.</p>
          </div>
          
          <div className="flex items-center space-x-3 bg-purple-700 p-3 rounded-3xl shadow-inner border border-purple-500">
            <button 
              onClick={isPlaying ? handlePause : handlePlay}
              className="bg-white text-purple-600 p-4 rounded-2xl shadow-lg hover:scale-110 transition-all active:scale-90"
            >
              {isPlaying ? <Pause fill="currentColor" size={28}/> : <Play fill="currentColor" size={28}/>}
            </button>
            <button 
              onClick={handleStop}
              className="bg-purple-500 text-white p-4 rounded-2xl hover:bg-red-500 transition-all active:scale-90"
            >
              <Square fill="currentColor" size={20}/>
            </button>
            <button 
              onClick={handleRestart}
              className="bg-purple-500 text-white p-4 rounded-2xl hover:bg-blue-500 transition-all active:scale-90"
            >
              <RotateCcw size={20}/>
            </button>
          </div>
        </div>

        {/* BARRA DE PROGRESO VISUAL */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-purple-200">
            <span>Inicio</span>
            <span>Progreso: {Math.round(progress)}%</span>
            <span>Final</span>
          </div>
          <div className="relative h-4 bg-purple-800 rounded-full overflow-hidden border border-purple-500 shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* CONTROL DE VELOCIDAD */}
        <div className="mt-8 bg-purple-700/50 p-4 rounded-2xl flex items-center justify-center space-x-4 max-w-md mx-auto border border-purple-500">
          <Gauge size={20} className="text-purple-200" />
          <span className="text-xs font-bold text-purple-200 uppercase tracking-widest">Speed: {speed}x</span>
          <input 
            type="range" min="0.5" max="1.5" step="0.1" value={speed} 
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32 accent-white cursor-pointer"
          />
        </div>
      </div>

      {/* EJERCICIO DE SELECCIÓN */}
      <section className="bg-white p-8 rounded-[40px] border-4 border-slate-200 shadow-xl text-center">
        <h4 className="text-slate-400 font-black uppercase text-xs mb-6 tracking-widest italic">¿Qué has escuchado? Marca las correctas:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.listening.options.map(o => (
            <button 
              key={o} 
              onClick={() => setSelected(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o])}
              className={`p-5 rounded-2xl border-4 font-black text-sm transition-all ${selected.includes(o) ? 'bg-purple-100 border-purple-500 text-purple-700 shadow-inner translate-y-1' : 'bg-white border-slate-100 text-slate-400 hover:border-purple-200 shadow-md'}`}
            >
              {o}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setValidated(true)} 
          className="w-full mt-10 bg-purple-600 text-white py-5 rounded-2xl font-black uppercase shadow-xl border-b-8 border-purple-800 active:translate-y-1 active:border-b-0 transition-all"
        >
          Comprobar Resultado
        </button>
      </section>

      {validated && (
        <div className={`p-8 rounded-[32px] border-4 animate-in slide-in-from-top-4 ${isPerfect ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
          <h4 className={`font-black uppercase italic mb-2 text-xl ${isPerfect ? 'text-emerald-700' : 'text-red-700'}`}>
            {isPerfect ? '✓ ¡Excelente oído! Texto desbloqueado:' : '✗ Casi... prueba a escuchar otra vez.'}
          </h4>
          {isPerfect && <p className="text-xl text-slate-700 leading-relaxed font-medium italic mt-4">"{data.listening.text}"</p>}
        </div>
      )}
    </div>
  );
};

export default ListeningSection;