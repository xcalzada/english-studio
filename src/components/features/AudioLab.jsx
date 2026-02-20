import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Gauge, Headphones, CheckCircle, XCircle } from 'lucide-react';

const AudioLab = ({ data }) => {
  const [selected,   setSelected]   = useState([]);
  const [validated,  setValidated]  = useState(false);
  const [speed,      setSpeed]      = useState(0.9);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [isPaused,   setIsPaused]   = useState(false);
  const [progress,   setProgress]   = useState(0);

  const utteranceRef        = useRef(null);
  const intervalRef         = useRef(null);
  const currentTextOffsetRef = useRef(0);
  const lastCharIndexRef    = useRef(0);

  const isPerfect =
    selected.length === data.listening.correctItems.length &&
    selected.every(i => data.listening.correctItems.includes(i));

  /* Limpieza al desmontar */
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopProgressSimulation();
    };
  }, []);

  /* ── Simulación de progreso ────────────────────────────────────────────
     CORRECCIÓN: antes estaba vacía (/* Tu lógica visual *\/).
     Estimamos la duración basándonos en longitud del texto y velocidad.
     ~15 caracteres/segundo a rate=1.0 (ajustado empíricamente).
  ──────────────────────────────────────────────────────────────────────── */
  const startProgressSimulation = (chunkLen, spd, totalLen, startOff) => {
    const charsPerSec       = 15 * spd;
    const estimatedMs       = (chunkLen / charsPerSec) * 1000;
    const startPct          = (startOff / Math.max(totalLen, 1)) * 100;
    const remainingPct      = 100 - startPct;
    const startTime         = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed  = Date.now() - startTime;
      const fraction = Math.min(elapsed / estimatedMs, 0.99); // nunca llega a 100% aquí
      setProgress(startPct + fraction * remainingPct);
      if (fraction >= 0.99) stopProgressSimulation();
    }, 150);
  };

  const stopProgressSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const playAudioChunk = (offset = 0, newSpeed = speed) => {
    window.speechSynthesis.cancel();
    stopProgressSimulation();

    const fullText      = data.listening.text;
    const remainingText = fullText.slice(offset);
    if (!remainingText.trim()) { setIsPlaying(false); setProgress(100); return; }

    const utt   = new SpeechSynthesisUtterance(remainingText);
    utt.lang    = 'en-GB';
    utt.rate    = newSpeed;
    currentTextOffsetRef.current = offset;

    utt.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      startProgressSimulation(remainingText.length, newSpeed, fullText.length, offset);
    };
    utt.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressSimulation();
      setProgress(100);
      currentTextOffsetRef.current = 0;
      lastCharIndexRef.current     = 0;
    };
    utt.onboundary = event => {
      if (event.name === 'word') lastCharIndexRef.current = event.charIndex;
    };
    /* CORRECCIÓN: pause/resume en Chrome puede fallar silenciosamente.
       Añadimos onerror para dar feedback al usuario. */
    utt.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressSimulation();
    };

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    currentTextOffsetRef.current = 0;
    lastCharIndexRef.current     = 0;
    setProgress(0);
    playAudioChunk(0, speed);
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
    lastCharIndexRef.current     = 0;
  };

  const handleRestart = () => { handleStop(); setTimeout(handlePlay, 100); };

  const handleSpeedChange = e => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (isPlaying) {
      playAudioChunk(
        currentTextOffsetRef.current + lastCharIndexRef.current,
        newSpeed,
      );
    }
  };

  const toggleOption = opt => {
    if (validated) return;
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt],
    );
  };

  /* ── RENDER ────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">

      {/* 1. REPRODUCTOR — usa vars del tema activo */}
      <div className="card-tool relative overflow-hidden p-8">

        {/* Icono decorativo */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none"
          style={{ color: 'var(--c-border)', opacity: .18 }}>
          <Headphones size={140}/>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6"
            style={{ borderBottom: '2px solid var(--c-border)' }}>
            <div>
              <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2 display-font"
                style={{ color: 'var(--c-dark)' }}>
                Audio Lab
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full transition-all"
                  style={{
                    background:  isPlaying ? 'var(--c-main)' : 'var(--err-bd)',
                    boxShadow:   isPlaying ? '0 0 8px var(--c-glow)' : 'none',
                    animation:   isPlaying ? 'pulse 1.5s infinite' : 'none',
                  }}/>
                <p className="font-bold text-xs uppercase tracking-widest"
                  style={{ color: 'var(--c-main)' }}>
                  {isPlaying ? 'Now Playing' : isPaused ? 'Paused' : 'Ready'}
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,.45)', border: '2px solid var(--c-border)' }}>
              <button onClick={handleRestart} title="Restart"
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{ color: 'var(--c-text)' }}>
                <RotateCcw size={22}/>
              </button>
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="p-4 rounded-xl transition-all hover:scale-105 mx-2"
                style={{
                  background: 'var(--c-main)',
                  color:      '#fff',
                  boxShadow:  '0 4px 16px var(--c-glow)',
                }}>
                {isPlaying
                  ? <Pause fill="currentColor" size={32}/>
                  : <Play  fill="currentColor" size={32} className="ml-1"/>}
              </button>
              <button onClick={handleStop} title="Stop"
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{ color: 'var(--err-bd)' }}>
                <Square fill="currentColor" size={20}/>
              </button>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest"
              style={{ color: 'var(--c-main)' }}>
              <span>Start</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,.4)', border: '2px solid var(--c-border)' }}>
              <div
                className="h-full rounded-full transition-all duration-150 ease-linear"
                style={{
                  width:     `${progress}%`,
                  background: 'var(--c-main)',
                  boxShadow:  '0 0 10px var(--c-glow)',
                }}
              />
            </div>
          </div>

          {/* Control de velocidad */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-2xl w-full md:w-fit mx-auto"
            style={{ background: 'rgba(255,255,255,.35)', border: '2px solid var(--c-border)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--c-main)' }}>
              <Gauge size={20}/>
              <span className="text-xs font-black uppercase tracking-widest w-24"
                style={{ color: 'var(--c-dark)' }}>
                Speed: {speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range" min="0.5" max="2.0" step="0.1" value={speed}
              onChange={handleSpeedChange}
              className="w-full md:w-48 h-2 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: 'var(--c-main)' }}
            />
          </div>
        </div>
      </div>

      {/* 2. QUIZ */}
      <div className="card-inner p-8">
        <div className="flex items-center gap-3 mb-8 pb-4"
          style={{ borderBottom: '2px solid var(--c-border)' }}>
          <div className="p-2 rounded-lg -rotate-3"
            style={{ background: 'var(--c-main)', color: '#fff', boxShadow: '0 4px 12px var(--c-glow)' }}>
            <Headphones size={24}/>
          </div>
          <h4 className="font-black uppercase text-lg tracking-tight"
            style={{ color: 'var(--c-dark)' }}>
            Select what you hear
          </h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {data.listening.options.map(opt => {
            const isSelected = selected.includes(opt);
            const isCorrect  = data.listening.correctItems.includes(opt);
            let bg, border, color, scale;

            if (validated) {
              if (isSelected && isCorrect)  { bg = 'var(--ok-bg)';   border = 'var(--ok-bd)';   color = 'var(--ok-tx)';   scale = '1.05'; }
              else if (isSelected && !isCorrect) { bg = 'var(--err-bg)'; border = 'var(--err-bd)'; color = 'var(--err-tx)'; scale = '1'; }
              else if (!isSelected && isCorrect) { bg = 'var(--warn-bg)'; border = 'var(--warn-bd)'; color = 'var(--warn-tx)'; scale = '1'; }
              else { bg = 'rgba(255,255,255,.3)'; border = 'var(--c-border)'; color = 'var(--text-muted)'; scale = '1'; }
            } else {
              bg     = isSelected ? 'var(--c-main)' : 'rgba(255,255,255,.4)';
              border = isSelected ? 'var(--c-main)' : 'var(--c-border)';
              color  = isSelected ? '#fff' : 'var(--c-dark)';
              scale  = isSelected ? '1.05' : '1';
            }

            return (
              <button
                key={opt}
                onClick={() => toggleOption(opt)}
                disabled={validated}
                className="p-5 rounded-2xl border-2 font-black text-lg transition-all"
                style={{ background: bg, borderColor: border, color, transform: `scale(${scale})` }}>
                {opt}
              </button>
            );
          })}
        </div>

        {!validated ? (
          <button
            onClick={() => setValidated(true)}
            className="btn-tool w-full py-4 text-xl justify-center">
            Check Answers
          </button>
        ) : (
          <div
            className="p-8 rounded-[2rem] border-2 animate-in zoom-in duration-300"
            style={{
              background:   isPerfect ? 'var(--ok-bg)'  : 'var(--err-bg)',
              borderColor:  isPerfect ? 'var(--ok-bd)'  : 'var(--err-bd)',
            }}>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 text-center md:text-left">
              {isPerfect
                ? <CheckCircle size={48} style={{ color: 'var(--ok-tx)' }}/>
                : <XCircle    size={48} style={{ color: 'var(--err-tx)' }}/>}
              <div>
                <h4 className="font-black uppercase text-2xl md:text-3xl"
                  style={{ color: isPerfect ? 'var(--ok-tx)' : 'var(--err-tx)' }}>
                  {isPerfect ? 'Perfect Hearing! 🎉' : 'Keep Practicing 💪'}
                </h4>
                <p className="text-base font-bold opacity-70 mt-1"
                  style={{ color: 'var(--text-secondary)' }}>
                  {isPerfect
                    ? 'You identified all keywords correctly.'
                    : 'Listen again and try to catch all the details.'}
                </p>
              </div>
            </div>

            {/* Transcript */}
            <div className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,.5)', border: '1.5px solid var(--c-border)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3"
                style={{ color: 'var(--c-main)' }}>
                Audio Transcript:
              </p>
              <p className="font-serif italic text-xl leading-relaxed"
                style={{ color: 'var(--text-primary)' }}>
                "{data.listening.text}"
              </p>
            </div>

            {!isPerfect && (
              <button
                onClick={() => { setValidated(false); setSelected([]); setProgress(0); handleStop(); }}
                className="btn-ghost w-full mt-6 py-4 justify-center">
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLab;