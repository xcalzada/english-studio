import React, { useState } from 'react';
import { CheckCircle, XCircle, BookOpen, HelpCircle, PenTool } from 'lucide-react';

const ReadingRoom = ({data}) => {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const normalize = txt => txt?.toString().trim().toLowerCase() || '';
  const checkAnswer = (qId, ans) => normalize(answers[qId])===normalize(ans);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">

      {/* Texto */}
      <div className="card-tool relative p-8 md:p-12 overflow-hidden">
        <div className="absolute top-4 left-6 z-20"><span className="card-title">Reading Passage</span></div>
        <div className="absolute top-4 right-4 opacity-[0.07]"><BookOpen size={140} className="text-[var(--c-main)]"/></div>
        <div className="relative z-10 mt-14">
          <h3 className="font-black text-[var(--c-dark)] text-2xl mb-6 uppercase italic tracking-tighter display-font">
            {data.title||'Read Carefully'}
          </h3>
          <p className="text-lg md:text-xl leading-loose text-[var(--text-primary)] italic p-6 rounded-2xl"
            style={{borderLeft:'4px solid var(--c-main)',background:'rgba(255,255,255,0.40)'}}>
            "{data.reading.text}"
          </p>
        </div>
      </div>

      {/* Preguntas */}
      <div className="space-y-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl" style={{background:'var(--c-soft)',border:'2px solid var(--c-border)'}}>
            <PenTool size={22} className="text-[var(--c-main)]"/>
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase italic">Comprehension Check</h3>
        </div>

        {data.reading.questions.map((q, idx) => {
          const isCorrect = showResults && checkAnswer(q.id, q.ans);
          return (
            <div key={q.id} className="card-inner p-6 md:p-8 transition-all hover:border-[var(--c-main)]">
              <div className="flex gap-4 mb-5">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2"
                  style={{background:'var(--c-soft)',borderColor:'var(--c-border)',color:'var(--c-main)'}}>
                  {idx+1}
                </span>
                <p className="font-bold text-lg text-[var(--text-primary)] leading-snug pt-1">{q.q}</p>
              </div>
              <div className="relative">
                <input disabled={showResults} value={answers[q.id]||''}
                  onChange={e=>setAnswers({...answers,[q.id]:e.target.value})}
                  className="input-base"
                  placeholder="Type your answer here..."
                  style={showResults?{borderColor:isCorrect?'var(--ok-border)':'var(--fail-border)',background:isCorrect?'var(--ok-bg)':'var(--fail-bg)',color:isCorrect?'var(--ok-text)':'var(--fail-text)'}:{}}
                />
                {showResults&&(
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in zoom-in">
                    {isCorrect?<CheckCircle className="text-[var(--ok-text)]" size={26}/>:<XCircle className="text-[var(--fail-text)]" size={26}/>}
                  </div>
                )}
              </div>
              {showResults&&!isCorrect&&(
                <div className="mt-3 animate-in slide-in-from-top-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl badge-revealed">
                    <HelpCircle size={15}/><span className="text-xs font-black uppercase tracking-widest">Answer:</span><span className="font-bold">{q.ans}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={()=>setShowResults(!showResults)}
          className={showResults?'btn-ghost w-full md:w-auto px-12 py-4 text-lg':'btn-tool w-full md:w-auto px-12 py-4 text-lg'}>
          {showResults?'Reset Reading':'Check Comprehension'}
        </button>
      </div>
    </div>
  );
};
export default ReadingRoom;