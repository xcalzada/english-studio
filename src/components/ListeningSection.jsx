import React, { useState } from 'react';
import { Play, Gauge } from 'lucide-react';
import { speakUK } from '../utils/speech';

const ListeningSection = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [validated, setValidated] = useState(false);
  const [speed, setSpeed] = useState(0.85); 
  const isPerfect = selected.length === data.listening.correctItems.length && selected.every(i => data.listening.correctItems.includes(i));
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-purple-600 p-8 rounded-[40px] text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          <div className="text-center md:text-left"><h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">The Audio Tour</h3><p className="text-purple-100 font-medium italic">Escucha con acento británico y marca las opciones.</p></div>
          <button onClick={() => speakUK(data.listening.text, speed)} className="bg-white text-purple-600 px-12 py-5 rounded-3xl font-black text-2xl flex items-center space-x-3 shadow-xl active:scale-95 transition-all"><Play fill="currentColor" /> <span>PLAY (UK)</span></button>
        </div>
        <div className="bg-purple-700/50 p-4 rounded-2xl flex items-center justify-center space-x-4 max-w-md mx-auto">
          <Gauge size={20} className="text-purple-200" /><span className="text-xs font-bold text-purple-200 uppercase tracking-widest">Velocidad: {speed}x</span>
          <input type="range" min="0.5" max="1.5" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-32 accent-white cursor-pointer" />
        </div>
      </div>
      <section className="bg-white p-8 rounded-[40px] border-2 border-purple-50 shadow-sm text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.listening.options.map(o => (
            <button key={o} onClick={() => setSelected(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o])} className={`p-4 rounded-2xl border-2 font-black text-sm transition-all ${selected.includes(o) ? 'bg-purple-500 border-purple-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>{o}</button>
          ))}
        </div>
        <button onClick={() => setValidated(true)} className="w-full mt-8 bg-purple-600 text-white py-4 rounded-2xl font-black uppercase shadow-xl">Comprobar</button>
      </section>
      {validated && <div className={`p-6 rounded-3xl border-2 animate-in slide-in-from-top-4 ${isPerfect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}><h4 className="font-black uppercase italic mb-2">{isPerfect ? '✓ ¡Perfecto! Texto desbloqueado:' : '✗ Hay errores. Escucha otra vez.'}</h4>{isPerfect && <p className="text-xl text-emerald-900 leading-relaxed font-bold italic mt-4 animate-in fade-in">"{data.listening.text}"</p>}</div>}
    </div>
  );
};
export default ListeningSection;