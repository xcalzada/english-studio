import React, { useState } from 'react';
import { 
  FileText, CheckCircle, XCircle, BookOpen, 
  HelpCircle, PenTool 
} from 'lucide-react';
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
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* 1. ZONA DE LECTURA (Estilo Página de Libro) */}
      <div className="relative bg-[#fffdf5] border-4 border-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        
        {/* Decoración: Badge Flotante */}
        <div className="absolute -top-1 left-10 bg-teal-600 text-white px-6 py-3 rounded-b-xl border-x-4 border-b-4 border-slate-900 font-black uppercase text-xs tracking-widest shadow-sm z-10">
           Reading Passage
        </div>

        {/* Decoración: Icono de fondo */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-slate-900">
            <BookOpen size={180} />
        </div>

        {/* Texto Principal */}
        <div className="relative z-10 mt-8">
            <h3 className="font-black text-slate-900 text-3xl mb-6 uppercase italic tracking-tighter">
                {data.title || "Read Carefully"}
            </h3>
            <p className="font-serif text-xl md:text-2xl leading-loose text-slate-800 border-l-4 border-teal-500 pl-6 italic">
                "{data.reading.text}"
            </p>
        </div>
      </div>

      {/* 2. ZONA DE COMPRENSIÓN (Cuestionario) */}
      <div className="relative">
          
        {/* Línea conectora visual (Opcional) */}
        <div className="absolute left-8 -top-12 bottom-0 w-1 bg-slate-200 -z-10 hidden md:block"></div>

        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-slate-900 text-white p-3 rounded-xl rotate-3 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                    <PenTool size={24}/>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic">Comprehension Check</h3>
            </div>

            {data.reading.questions.map((q, idx) => {
            const isCorrect = showResults && checkAnswer(q.id, q.ans);
            
            return (
            <div 
              key={q.id} 
              className="
                bg-white p-6 md:p-8 rounded-[2.5rem] 
                border-4 border-slate-900 
                shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]
                transition-all group
                hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)]
              "
            >
                    {/* Pregunta */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                        <span className="bg-slate-100 text-slate-500 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2 border-slate-900">
                            {idx + 1}
                        </span>
                        <p className="font-bold text-lg text-slate-800 leading-snug pt-1">
                            {q.q}
                        </p>
                    </div>

                    {/* Input de Respuesta */}
                    <div className="relative">
                        <input 
                            disabled={showResults}
                            value={answers[q.id] || ''}
                            onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                            className={`
                                w-full p-4 pl-6 rounded-2xl border-4 font-black text-lg outline-none transition-all
                                ${showResults 
                                    ? (isCorrect 
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[4px_4px_0px_0px_#10b981]' 
                                        : 'border-rose-500 bg-rose-50 text-rose-900 shadow-[4px_4px_0px_0px_#f43f5e]')
                                    : 'border-slate-200 bg-slate-50 text-slate-600 focus:border-teal-500 focus:bg-white focus:text-slate-900 focus:shadow-[4px_4px_0px_0px_#14b8a6]'}
                            `}
                            placeholder="Type your answer here..."
                        />
                        
                        {/* Icono de Feedback Absoluto */}
                        {showResults && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in zoom-in">
                                {isCorrect 
                                    ? <CheckCircle className="text-emerald-600" size={28} /> 
                                    : <XCircle className="text-rose-600" size={28} />
                                }
                            </div>
                        )}
                    </div>

                    {/* Respuesta Correcta (si falló) */}
                    {showResults && !isCorrect && (
                        <div className="mt-4 ml-2 animate-in slide-in-from-top-2">
                            <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-lg border border-rose-200">
                                <HelpCircle size={16} className="text-rose-600"/>
                                <span className="text-xs font-black uppercase text-rose-800 tracking-widest">Answer:</span>
                                <span className="text-rose-900 font-bold">{q.ans}</span>
                            </div>
                        </div>
                    )}
                </div>
            );
            })}
        </div>

        {/* Botón de Acción */}
        <div className="mt-12 flex justify-end">
            <Button3D 
                onClick={() => setShowResults(!showResults)}
                color={showResults ? "bg-slate-800 text-white" : "bg-teal-600 text-white"}
                className="w-full md:w-auto px-12 py-4 text-lg"
            >
                {showResults ? "Reset Reading" : "Check Comprehension"}
            </Button3D>
        </div>
      </div>
    </div>
  );
};

export default ReadingRoom;