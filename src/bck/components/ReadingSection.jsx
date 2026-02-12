import React, { useState } from 'react';

const ReadingSection = ({ data, state, setState }) => {
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[40px] border-l-[12px] border-emerald-500 shadow-xl italic text-xl text-slate-700 leading-relaxed italic font-medium"><p>{data.reading.text}</p></div>
      <section className="bg-white p-8 rounded-[40px] border-2 border-emerald-50 shadow-sm">
        <h4 className="font-black text-emerald-700 uppercase mb-8 text-2xl italic">Comprehension Check</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.reading.questions.map((q) => (
            <div key={q.id} className="space-y-2"><p className="font-black text-slate-800 text-sm italic">{q.q}</p><input value={state[q.id] || ''} className="w-full bg-slate-50 border-2 border-slate-100 p-3 rounded-2xl text-sm focus:border-emerald-400 outline-none font-bold" placeholder="Tu respuesta..." onChange={(e) => setState({...state, [q.id]: e.target.value})} /></div>
          ))}
        </div>
        <button onClick={() => setShowResults(true)} className="w-full mt-10 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase shadow-xl">Confirmar</button>
        {showResults && <div className="mt-6 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-black text-slate-500 italic uppercase">{data.reading.questions.map(q => <div key={q.id}>{q.id}: {q.ans}</div>)}</div>}
      </section>
    </div>
  );
};
export default ReadingSection;
