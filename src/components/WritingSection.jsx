import React from 'react';
import { Award, CheckCircle, Pencil } from 'lucide-react';

const WritingSection = ({ data, state, setState }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-[32px] shadow-lg border-2 border-slate-50 sticky top-28">
        <h4 className="font-black text-slate-800 uppercase text-xs mb-4 flex items-center tracking-widest italic"><Award size={16} className="mr-2 text-orange-500" /> Palabras para usar:</h4>
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
          {data.vocabulary.map(v => (
            <div key={v.id} className={`p-3 rounded-2xl text-[10px] font-black border-2 transition-all flex items-center justify-between ${state.toLowerCase().includes(v.word.toLowerCase()) ? 'bg-emerald-500 border-emerald-600 text-white shadow-md' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
              <span className="uppercase tracking-tighter">{v.word}</span>
              {state.toLowerCase().includes(v.word.toLowerCase()) && <CheckCircle size={12} />}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="lg:col-span-2 space-y-4">
      <div className="bg-orange-600 p-8 rounded-[40px] text-white shadow-xl mb-4">
        <h3 className="text-3xl font-black italic mb-2 uppercase tracking-tighter">My Project</h3>
        <p className="text-orange-100 font-medium italic">Escribe tu borrador y las palabras se pondrán en verde. ¡Luego pásalo al papel!</p>
      </div>
      <textarea className="w-full h-80 p-10 rounded-[40px] border-4 border-slate-100 focus:border-orange-400 outline-none text-xl text-slate-700 shadow-inner bg-white font-bold italic leading-relaxed" placeholder="Start writing here..." value={state} onChange={(e) => setState(e.target.value)} />
      <div className="p-8 bg-blue-600 text-white rounded-[32px] shadow-xl text-center flex flex-col items-center space-y-3"><Pencil size={32} /><h4 className="text-2xl font-black italic uppercase tracking-tighter">¡Pásalo al papel!</h4></div>
    </div>
  </div>
);
export default WritingSection;
