import React, { useState } from 'react';
import { Layout, Languages, Volume2 } from 'lucide-react';
import { speakUK } from '../utils/speech';

const VocabSection = ({ data, state, setState }) => {
  const [phase, setPhase] = useState('study');
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex bg-slate-100 p-2 rounded-2xl w-fit mx-auto">
        <button onClick={() => setPhase('study')} className={`px-6 py-2 rounded-xl font-black text-xs uppercase ${phase === 'study' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}>Estudiar</button>
        <button onClick={() => setPhase('test')} className={`px-6 py-2 rounded-xl font-black text-xs uppercase ${phase === 'test' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'}`}>Test (Traducir)</button>
      </div>
      {phase === 'study' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.vocabulary.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex items-center justify-between shadow-sm group hover:border-pink-300 transition-colors">
              <div className="flex items-center space-x-4">
                <button onClick={() => speakUK(item.word)} className="bg-pink-50 p-3 rounded-xl text-pink-500 hover:bg-pink-600 hover:text-white transition-all"><Volume2 size={20} /></button>
                <div className="flex flex-col"><span className="font-black text-xl text-slate-800 uppercase italic tracking-tighter leading-tight">{item.word}</span><span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{item.span}</span></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[40px] border-2 border-pink-50 shadow-sm">
          <h4 className="font-black text-slate-800 mb-6 uppercase italic flex items-center"><Languages className="mr-2 text-pink-600"/> Traduce al Inglés:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.vocabulary.map((item) => (
              <div key={item.id} className="flex flex-col space-y-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.span}</span>
                <input value={state[item.id] || ''} className={`p-3 rounded-xl border-2 focus:outline-none font-bold uppercase ${showResults ? (state[item.id]?.toLowerCase().trim() === item.word ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50') : 'border-slate-100 focus:border-pink-400'}`} placeholder="???" onChange={(e) => setState({...state, [item.id]: e.target.value})} />
              </div>
            ))}
          </div>
          <button onClick={() => setShowResults(true)} className="w-full mt-10 bg-pink-600 text-white py-5 rounded-2xl font-black uppercase shadow-xl">Comprobar</button>
        </div>
      )}
    </div>
  );
};
export default VocabSection;