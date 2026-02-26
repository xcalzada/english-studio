import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Gauge, Headphones, CheckCircle, XCircle } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';

const AudioLab = ({ data }) => {
  const listening = data?.listening;
  // FIX: guard missing sub-fields to prevent map/includes crashes
  const options      = listening?.options      ?? [];
  const correctItems = listening?.correctItems ?? [];
  const { playing, paused, progress, speed, supported, handlePlay, handlePause, stop, restart, changeSpeed } = useSpeech(listening?.text || '');
  const [selected,  setSelected]  = useState([]);
  const [validated, setValidated] = useState(false);

  const isPerfect = selected.length === correctItems.length &&
    selected.every(i => correctItems.includes(i));

  const toggle = (opt) => {
    if (validated) return;
    setSelected(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt]);
  };

  const handleReset = () => { setValidated(false); setSelected([]); stop(); };

  if (!listening) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🎧</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No audio content</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>This unit has no listening exercise yet.</p>
    </div>
  );

  if (!supported) return (
    <div className="card-tool p-8 text-center">
      <p className="text-white font-bold">🔇 Speech synthesis not supported in this browser.</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="card-base rounded-[2.5rem] overflow-hidden relative p-8" style={{ background: '#0f172a', border: '2px solid rgba(255,255,255,.08)' }}>
        <div className="absolute top-0 right-0 p-8 pointer-events-none" style={{ opacity: .07, color: 'var(--main, #34d399)' }}>
          <Headphones size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-white display-font">Audio Lab</h3>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full transition-all ${playing ? 'animate-pulse' : ''}`}
                  style={{ background: playing ? 'var(--main,#34d399)' : '#ef4444', boxShadow: playing ? '0 0 10px var(--main,#34d399)' : 'none' }} />
                <p className="font-bold text-xs uppercase tracking-widest" style={{ color: playing ? 'var(--main,#34d399)' : '#94a3b8' }}>
                  {playing ? 'Now Playing' : paused ? 'Paused' : 'Ready'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.10)' }}>
              <button onClick={restart} className="p-3 rounded-xl text-slate-400 hover:text-white transition-all"><RotateCcw size={22} /></button>
              <button onClick={playing ? handlePause : handlePlay}
                className="p-4 rounded-xl text-white mx-1 hover:scale-105 transition-all"
                style={{ background: 'var(--main,#34d399)', boxShadow: '0 0 20px var(--glow,rgba(52,211,153,.35))' }}>
                {playing ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} className="ml-0.5" />}
              </button>
              <button onClick={stop} className="p-3 rounded-xl text-slate-400 hover:text-rose-400 transition-all"><Square fill="currentColor" size={20} /></button>
            </div>
          </div>
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--main,#34d399)' }}>
              <span>Start</span><span>{Math.round(progress)}%</span>
            </div>
            <div className="h-5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.08)' }}>
              <div className="h-full rounded-full transition-all duration-100" style={{ width: `${progress}%`, background: 'var(--main,#34d399)', boxShadow: '0 0 14px var(--glow,rgba(52,211,153,.35))' }} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-2xl mx-auto" style={{ background: 'rgba(0,0,0,.2)', border: '1px solid rgba(255,255,255,.08)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--main,#34d399)' }}>
              <Gauge size={20} /><span className="text-xs font-black uppercase tracking-widest text-white w-24">Speed: {speed.toFixed(1)}x</span>
            </div>
            <input type="range" min="0.5" max="2.0" step="0.1" value={speed} onChange={e => changeSpeed(parseFloat(e.target.value))}
              className="w-full sm:w-48 h-2 rounded-lg appearance-none cursor-pointer" style={{ accentColor: 'var(--main,#34d399)' }} />
          </div>
        </div>
      </div>

      <div className="card-tool p-8">
        <h4 className="font-black uppercase text-lg tracking-tight text-white mb-6">Select what you hear</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {options.map(opt => {
            const isSelected = selected.includes(opt);
            const isCorrect  = correctItems.includes(opt);
            let style = {};
            if (validated) {
              if (isSelected && isCorrect)   style = { background: 'var(--ok-bg)',   borderColor: 'var(--ok-border)',   color: 'var(--ok-text)' };
              if (isSelected && !isCorrect)  style = { background: 'var(--fail-bg)', borderColor: 'var(--fail-border)', color: 'var(--fail-text)', opacity: .75 };
              if (!isSelected && isCorrect)  style = { borderStyle: 'dashed', borderColor: 'var(--c0)', color: 'var(--c0)', opacity: .55 };
              if (!isSelected && !isCorrect) style = { opacity: .3 };
            } else {
              style = isSelected ? { background: 'var(--c0)', borderColor: 'var(--c0)', color: '#fff', boxShadow: '0 0 14px var(--cg)', transform: 'scale(1.05)' } : {};
            }
            return (
              <button key={opt} onClick={() => toggle(opt)} disabled={validated}
                className="p-5 rounded-2xl border-2 font-black text-lg transition-all item-surface" style={style}>
                {opt}
              </button>
            );
          })}
        </div>
        {!validated
          ? <button onClick={() => setValidated(true)} disabled={selected.length === 0} className="btn-tool w-full py-4 text-base justify-center disabled:opacity-40">Check Answers</button>
          : <div className={`p-8 rounded-[2rem] border-2 animate-in zoom-in ${isPerfect ? 'badge-correct' : 'badge-wrong'}`}>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                {isPerfect ? <CheckCircle size={48} style={{ color: 'var(--ok-text)' }} /> : <XCircle size={48} style={{ color: 'var(--fail-text)' }} />}
                <div>
                  <h4 className="font-black uppercase text-2xl">{isPerfect ? 'Perfect Hearing! 🎉' : 'Keep Practicing 💪'}</h4>
                  <p className="text-base font-bold opacity-70 mt-1">{isPerfect ? 'You identified all keywords correctly.' : 'Listen again and try to catch all the details.'}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,0,0,.12)' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c0)' }}>Transcript:</p>
                <p className="font-serif italic text-xl leading-relaxed">"{listening.text}"</p>
              </div>
              {!isPerfect && <button onClick={handleReset} className="btn-ghost mt-6 w-full py-4 justify-center">Try Again</button>}
            </div>}
      </div>
    </div>
  );
};

export default AudioLab;
