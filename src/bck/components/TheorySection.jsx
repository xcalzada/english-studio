import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, MessageCircle } from 'lucide-react';

const TheorySection = ({ data, state, setState }) => {
  const [showResults, setShowResults] = useState(false);
  const theory = data.theoryBlock || { affirmative: { title: "", content: [] }, negative: { title: "", content: [] }, question: { title: "", content: [] }, shortAnswer: null };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className={`grid grid-cols-1 ${theory.shortAnswer ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
        <div className="bg-emerald-500 p-5 rounded-3xl text-white shadow-lg">
          <h4 className="font-black italic mb-3 uppercase text-xs flex items-center"><CheckCircle className="mr-2" size={16}/> {theory.affirmative.title}</h4>
          {theory.affirmative.content.map((l, i) => <div key={i} className="text-xs font-bold mb-1" dangerouslySetInnerHTML={{__html: l}}/>)}
        </div>
        <div className="bg-red-500 p-5 rounded-3xl text-white shadow-lg">
          <h4 className="font-black italic mb-3 uppercase text-xs flex items-center"><XCircle className="mr-2" size={16}/> {theory.negative.title}</h4>
          {theory.negative.content.map((l, i) => <div key={i} className="text-xs font-bold mb-1" dangerouslySetInnerHTML={{__html: l}}/>)}
        </div>
        <div className="bg-blue-500 p-5 rounded-3xl text-white shadow-lg">
          <h4 className="font-black italic mb-3 uppercase text-xs flex items-center"><HelpCircle className="mr-2" size={16}/> {theory.question.title}</h4>
          {theory.question.content.map((l, i) => <div key={i} className="text-xs font-bold mb-1" dangerouslySetInnerHTML={{__html: l}}/>)}
        </div>
        {theory.shortAnswer && (
          <div className="bg-purple-500 p-5 rounded-3xl text-white shadow-lg">
            <h4 className="font-black italic mb-3 uppercase text-xs flex items-center"><MessageCircle className="mr-2" size={16}/> Short Answers</h4>
            {theory.shortAnswer.content.map((l, i) => <div key={i} className="text-xs font-bold mb-1" dangerouslySetInnerHTML={{__html: l}}/>)}
          </div>
        )}
      </div>
      <section className="bg-white p-8 rounded-[40px] border-2 border-slate-50 shadow-sm">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase italic tracking-tighter">Grammar Quiz</h3>
        <div className="space-y-4">
          {data.theoryQuiz.map((item, idx) => (
            <div key={item.id} className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="font-black text-blue-500">{idx + 1}.</span>
              <p className="font-bold text-slate-700 w-full md:w-auto">
                {item.q.split('______')[0]}
                <input value={state[item.id] || ''} className="mx-2 border-b-2 border-blue-300 w-48 text-center focus:outline-none focus:border-blue-600 font-black text-blue-600 bg-transparent uppercase" placeholder="???" onChange={(e) => setState({...state, [item.id]: e.target.value})} />
                {item.q.split('______')[1]}
              </p>
            </div>
          ))}
        </div>
        <button onClick={() => setShowResults(true)} className="w-full mt-8 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl transition-all">Verificar</button>
        {showResults && (
          <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-slate-500">
            {data.theoryQuiz.map((q, i) => (<div key={i} className="flex justify-between border-b border-blue-100 pb-1"><span>{i+1}.</span> <span className="text-blue-600 font-black uppercase">{q.ans}</span></div>))}
          </div>
        )}
      </section>
    </div>
  );
};
export default TheorySection;