import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Square, RotateCcw, 
  Gauge, Headphones, CheckCircle, XCircle 
} from 'lucide-react';
import { Card, Button3D } from '../ui/Neubrutal';

const AudioLab = ({ data }) => {
  // --- ESTADOS ---
  const [selected, setSelected] = useState([]);
  const [validated, setValidated] = useState(false);
  const [speed, setSpeed] = useState(0.9);
  
  // Control de Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); 
  
  // REFS PARA EL TRUCO DE VELOCIDAD
  const utteranceRef = useRef(null);
  const intervalRef = useRef(null); // Para la barra visual
  const currentTextOffsetRef = useRef(0); // Dónde empieza el fragmento actual
  const lastCharIndexRef = useRef(0); // Último carácter leído en este fragmento

  const isPerfect = selected.length === data.listening.correctItems.length && 
                    selected.every(i => data.listening.correctItems.includes(i));

  // Limpieza
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopProgressSimulation();
    };
  }, []);

  // --- LÓGICA CORE DE REPRODUCCIÓN ---
  
  // Esta función reproduce desde un punto específico (offset)
  const playAudioChunk = (offset = 0, newSpeed = speed) => {
    window.speechSynthesis.cancel();
    stopProgressSimulation();

    const fullText = data.listening.text;
    const remainingText = fullText.slice(offset); // Cortamos el texto

    if (!remainingText.trim()) {
        setIsPlaying(false);
        setProgress(100);
        return;
    }

    const utt = new SpeechSynthesisUtterance(remainingText);
    utt.lang = 'en-GB';
    utt.rate = newSpeed;

    // Actualizamos referencias
    currentTextOffsetRef.current = offset;
    
    utt.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      // Iniciamos la barra visual simulada ajustada al texto restante
      startProgressSimulation(remainingText.length, newSpeed, fullText.length, offset);
    };

    utt.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressSimulation();
      setProgress(100);
      currentTextOffsetRef.current = 0;
      lastCharIndexRef.current = 0;
    };

    // Rastreamos palabra por palabra para saber dónde cortar si cambiamos velocidad
    utt.onboundary = (event) => {
      if (event.name === 'word') {
        lastCharIndexRef.current = event.charIndex;
      }
    };

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      // Recalcular simulación desde el punto actual
      const fullText = data.listening.text;
      const currentGlobalIndex = currentTextOffsetRef.current + lastCharIndexRef.current;
      const remainingLen = fullText.length - currentGlobalIndex;
      startProgressSimulation(remainingLen, speed, fullText.length, currentGlobalIndex);
      
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    // Play desde cero
    currentTextOffsetRef.current = 0;
    lastCharIndexRef.current = 0;
    setProgress(0);
    playAudioChunk(0, speed);
  };

  // --- CAMBIO DE VELOCIDAD EN TIEMPO REAL ---
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);

    if (isPlaying) {
      // 1. Calculamos dónde estamos en el texto GLOBAL
      // (Donde empezó este fragmento + lo que ha avanzado este fragmento)
      const globalCurrentIndex = currentTextOffsetRef.current + lastCharIndexRef.current;
      
      // 2. Reproducimos el nuevo fragmento desde ese punto con la nueva velocidad
      playAudioChunk(globalCurrentIndex, newSpeed);
    }
  };

  // --- SIMULACIÓN VISUAL DE LA BARRA ---
  const startProgressSimulation = (chunkLength, currentSpeed, totalLength, startOffset) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Estimación: 15 chars/seg a 1.0x
    const estimatedDurationMs = (chunkLength / 15) * 1000 * (1 / currentSpeed);
    const updateInterval = 50; 
    
    let localElapsed = 0;

    intervalRef.current = setInterval(() => {
      localElapsed += updateInterval;
      // Porcentaje del fragmento actual completado
      const chunkPercent = Math.min(localElapsed / estimatedDurationMs, 1);
      
      // Convertir a caracteres teóricos leídos del fragmento actual
      const charsReadInChunk = chunkLength * chunkPercent;
      
      // Sumar al offset inicial para obtener progreso global
      const totalCharsRead = startOffset + charsReadInChunk;
      const globalPercentage = (totalCharsRead / totalLength) * 100;

      setProgress(Math.min(globalPercentage, 99)); // Topamos en 99 hasta onend
    }, updateInterval);
  };

  const stopProgressSimulation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    stopProgressSimulation();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    stopProgressSimulation();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    currentTextOffsetRef.current = 0;
    lastCharIndexRef.current = 0;
  };

  const handleRestart = () => {
    handleStop();
    setTimeout(handlePlay, 100);
  };

  const toggleOption = (opt) => {
    if (validated) return; 
    if (selected.includes(opt)) {
        setSelected(selected.filter(x => x !== opt));
    } else {
        setSelected([...selected, opt]);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* 1. REPRODUCTOR */}
      <div className="bg-violet-700 text-white rounded-[2.5rem] border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden relative p-8">
        
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Headphones size={150} />
        </div>

        <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-violet-500 pb-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2 text-white">Audio Lab</h3>
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]' : 'bg-red-500'}`}></span>
                        <p className="text-violet-200 font-bold text-xs uppercase tracking-widest">
                            {isPlaying ? 'Now Playing' : 'Ready'}
                        </p>
                    </div>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-3 bg-violet-900/40 p-3 rounded-2xl border-2 border-violet-500 shadow-inner backdrop-blur-sm">
                    <button 
                        onClick={handleRestart}
                        className="p-3 text-white hover:bg-white hover:text-violet-900 rounded-xl transition-all active:scale-95"
                        title="Restart"
                    >
                        <RotateCcw size={22}/>
                    </button>

                    <button 
                        onClick={isPlaying ? handlePause : handlePlay}
                        className="bg-white text-violet-900 p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-none transition-all border-2 border-slate-900 mx-2"
                    >
                        {isPlaying ? <Pause fill="currentColor" size={32}/> : <Play fill="currentColor" size={32} className="ml-1"/>}
                    </button>

                    <button 
                        onClick={handleStop}
                        className="p-3 text-white hover:bg-rose-500 hover:text-white rounded-xl transition-all active:scale-95"
                        title="Stop"
                    >
                        <Square fill="currentColor" size={20}/>
                    </button>
                </div>
            </div>

            {/* Barra de Progreso */}
            <div className="space-y-2 mb-8">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-violet-200">
                    <span>Start</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-6 bg-violet-900 rounded-full border-2 border-violet-500 overflow-hidden shadow-inner relative cursor-pointer">
                    <div 
                        className="h-full bg-yellow-400 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 mix-blend-overlay"></div>
                </div>
            </div>

            {/* Control de Velocidad (REAL-TIME) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/10 w-full md:w-fit mx-auto backdrop-blur-md">
                <div className="flex items-center gap-2 text-yellow-400">
                    <Gauge size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-white w-24">
                        Speed: {speed.toFixed(1)}x
                    </span>
                </div>
                
                <div className="relative flex items-center w-full md:w-48 group">
                    <input 
                        type="range" min="0.5" max="2.0" step="0.1" value={speed} 
                        onChange={handleSpeedChange} // <--- AQUÍ ESTÁ LA MAGIA
                        className="w-full h-2 bg-violet-900 rounded-lg appearance-none cursor-pointer accent-yellow-400 z-10"
                    />
                    <div className="absolute w-full flex justify-between px-1 pointer-events-none opacity-50">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. QUIZ INTERACTIVO */}
      <Card color="border-slate-300">
         <div className="flex items-center gap-3 mb-8 border-b-4 border-slate-100 pb-4">
             <div className="bg-slate-900 text-white p-2 rounded-lg -rotate-3"><Headphones size={24}/></div>
             <h4 className="font-black text-slate-900 uppercase text-lg tracking-tight">Select what you hear</h4>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
            {data.listening.options.map(opt => {
                const isSelected = selected.includes(opt);
                return (
                    <button 
                        key={opt}
                        onClick={() => toggleOption(opt)}
                        disabled={validated}
                        className={`
                            p-5 rounded-2xl border-4 font-black text-lg transition-all relative overflow-hidden group
                            ${isSelected 
                                ? 'border-violet-600 bg-violet-100 text-violet-900 shadow-none translate-y-1' 
                                : 'border-slate-200 bg-white text-slate-500 hover:border-violet-400 hover:text-slate-800 hover:-translate-y-1 hover:shadow-lg shadow-sm'
                            }
                            ${validated && isSelected && !data.listening.correctItems.includes(opt) ? '!border-rose-500 !bg-rose-100 !text-rose-900 opacity-70' : ''}
                            ${validated && data.listening.correctItems.includes(opt) && !isSelected ? '!border-emerald-500 !bg-white !text-emerald-700 border-dashed !opacity-100' : ''}
                        `}
                    >
                        {opt}
                        {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-violet-600 rounded-full animate-in zoom-in"></div>}
                    </button>
                );
            })}
         </div>

         {!validated ? (
             <Button3D 
                onClick={() => setValidated(true)} 
                color="bg-slate-900 text-white"
                className="w-full py-4 text-xl"
             >
                Check Answers
             </Button3D>
         ) : (
             <div className={`p-8 rounded-[2rem] border-4 animate-in zoom-in duration-300 ${isPerfect ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}>
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6 text-center md:text-left">
                    {isPerfect ? <CheckCircle size={48} className="text-emerald-600"/> : <XCircle size={48} className="text-rose-600"/>}
                    <div>
                        <h4 className={`font-black uppercase text-2xl md:text-3xl ${isPerfect ? 'text-emerald-800' : 'text-rose-800'}`}>
                            {isPerfect ? 'Perfect Hearing!' : 'Keep Practicing'}
                        </h4>
                        <p className="text-base font-bold opacity-70 mt-1">
                            {isPerfect ? 'You identified all keywords correctly.' : 'Listen again and try to catch all the details.'}
                        </p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border-2 border-black/10 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-widest mb-3 opacity-40">Audio Transcript:</p>
                    <p className="font-serif italic text-xl leading-relaxed text-slate-800">
                        "{data.listening.text}"
                    </p>
                </div>
                
                {!isPerfect && (
                    <button 
                        onClick={() => { setValidated(false); setSelected([]); setProgress(0); currentTextOffsetRef.current = 0; }}
                        className="mt-6 w-full py-4 bg-white border-4 border-slate-900 text-slate-900 font-black uppercase rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        Try Again
                    </button>
                )}
             </div>
         )}
      </Card>
    </div>
  );
};

export default AudioLab;