import React, { useState } from 'react';
import { FileText, CheckCircle, HelpCircle } from 'lucide-react';
import { Card, Button3D } from '../ui/Neubrutal';

const ReadingRoom = ({ data }) => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Normalizar respuesta (quitar mayúsculas y espacios extra)
  const normalize = (txt) => txt?.toString().trim().toLowerCase() || "";

  const checkAnswer = (qId, correctAns) => {
    const userAns = answers[qId];
    return normalize(userAns) === normalize(correctAns);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Texto de Lectura */}
      <Card color="border-emerald-600" className="relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-900">
            <FileText size={80} />
        </div>
        <h3 className="text-emerald-800 font-black uppercase tracking-widest mb-4 border-b-2 border-emerald-100 pb-2">
            Read Carefully
        </h3>
        <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed italic font-serif">
            "{data.reading.text}"
        </p>
      </Card>

      {/* 2. Preguntas de Comprensión */}
      <div className="grid gap-6">
        {data.reading.questions.map((q, idx) => {
          const isCorrect = showResults && checkAnswer(q.id, q.ans);
          
          return (
            <div key={q.id} className="bg-white p-6 rounded-[2rem] border-4 border-slate-200 shadow-lg flex flex-col gap-4">
               <div className="flex items-start gap-4">
                  <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0">
                      {idx + 1}
                  </span>
                  <p className="font-black text-lg text-slate-800">{q.q}</p>
               </div>

               <div className="relative">
                   <input 
                      disabled={showResults}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                      className={`
                        w-full p-4 rounded-xl border-4 font-bold outline-none transition-all uppercase
                        ${showResults 
                            ? (isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-rose-500 bg-rose-50 text-rose-900')
                            : 'border-slate-200 bg-slate-50 focus:border-emerald-500 focus:bg-white'}
                      `}
                      placeholder="Type your answer..."
                   />
                   {showResults && (
                       <div className="absolute right-4 top-4">
                           {isCorrect ? <CheckCircle className="text-emerald-600"/> : <HelpCircle className="text-rose-600"/>}
                       </div>
                   )}
               </div>

               {showResults && !isCorrect && (
                   <div className="text-xs font-black text-rose-500 uppercase tracking-widest pl-2">
                       Answer: {q.ans}
                   </div>
               )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
          <Button3D 
            onClick={() => setShowResults(!showResults)}
            color={showResults ? "bg-slate-800 text-white" : "bg-emerald-600 text-white"}
          >
              {showResults ? "Reset Reading" : "Check Comprehension"}
          </Button3D>
      </div>
    </div>
  );
};

export default ReadingRoom;