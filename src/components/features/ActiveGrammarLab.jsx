import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, PenTool, Hammer, Unlock, Lock
} from 'lucide-react';

const ActiveGrammarLab = ({ data }) => {
  // Estado para la Teoría Activa (Fase 1)
  const [ruleAnswers, setRuleAnswers] = useState({});
  const [rulesVerified, setRulesVerified] = useState(false);

  // Estado para los Ejercicios (Fase 2)
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [checkedPracticeIds, setCheckedPracticeIds] = useState([]);

  // --- LÓGICA DE VALIDACIÓN FASE 1 (REGLAS) ---
  const checkGap = (userVal, correctVal) => {
    const cleanUser = userVal?.toString().trim().toLowerCase() || "";
    const cleanCorrect = correctVal.trim().toLowerCase();
    return cleanUser === cleanCorrect;
  };

  const handleRuleInput = (id, val) => {
    setRuleAnswers(prev => ({ ...prev, [id]: val }));
  };

  const validateRules = () => {
    // Comprobamos si todas las reglas están bien
    const allCorrect = data.activeRules.steps.every(step => 
      checkGap(ruleAnswers[step.id], step.ans)
    );

    if (allCorrect) {
      setRulesVerified(true);
      // Efecto de scroll suave hacia la práctica
      setTimeout(() => {
        document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      alert("Oops! Some rules are incorrect. Check the hints.");
    }
  };

  // --- LÓGICA DE VALIDACIÓN FASE 2 (PRÁCTICA) ---
  const handlePracticeInput = (itemId, boxIndex, val) => {
    setPracticeAnswers(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [boxIndex]: val }
    }));
  };

  const checkPracticeItem = (item) => {
    const itemState = practiceAnswers[item.id] || {};
    const gapCount = item.q.split('______').length - 1;
    
    const correctAnswers = item.ans.includes(',') 
        ? item.ans.split(',').map(s => s.trim().toLowerCase()) 
        : [item.ans.trim().toLowerCase()];

    for (let i = 0; i < gapCount; i++) {
        const userVal = (itemState[i] || "").toString().trim().toLowerCase();
        
        // Si está vacío, error inmediato
        if (userVal === "") return false;

        if (correctAnswers.length === gapCount) {
            if (userVal !== correctAnswers[i]) return false;
        } else {
            if (!correctAnswers.includes(userVal)) return false;
        }
    }
    return true;
  };

  // Seleccionamos qué quiz usar: el específico 'activeQuiz' o el fallback 'theoryQuiz'
  const quizData = data.activeQuiz || data.theoryQuiz;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* --- FASE 1: CONSTRUCCIÓN DE REGLAS (Estilo Blueprint) --- */}
      <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 border-4 border-slate-900 shadow-2xl relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-700 pb-6">
             <div className="bg-blue-600 p-3 rounded-xl rotate-3 shadow-lg"><Hammer className="text-white" size={24}/></div>
             <div>
               <h3 className="text-2xl font-black uppercase italic tracking-tighter">Theory Workshop</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Complete the blueprint to unlock practice</p>
             </div>
          </div>

          <div className="space-y-6">
            {data.activeRules?.steps.map((step, idx) => {
              const isFilled = ruleAnswers[step.id]?.length > 0;
              const isCorrect = rulesVerified && checkGap(ruleAnswers[step.id], step.ans);
              const parts = step.text.split('______');

              return (
                <div key={step.id} className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 flex flex-col md:flex-row gap-4 items-start md:items-center">
                   <div className="bg-blue-900/50 text-blue-200 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border border-blue-800 shrink-0">
                     {idx + 1}
                   </div>
                   
                   <div className="font-bold text-lg leading-relaxed flex-grow">
                      {parts.map((part, pIdx) => (
                        <React.Fragment key={pIdx}>
                          <span dangerouslySetInnerHTML={{__html: part}} />
                          {pIdx < parts.length - 1 && (
                            <input 
                              disabled={rulesVerified}
                              value={ruleAnswers[step.id] || ''}
                              onChange={(e) => handleRuleInput(step.id, e.target.value)}
                              className={`
                                mx-2 bg-slate-900 border-b-4 text-center font-black uppercase w-32 outline-none transition-all
                                ${rulesVerified 
                                   ? (isCorrect ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400')
                                   : 'border-slate-500 focus:border-blue-400 text-white'
                                }
                              `}
                              placeholder="..."
                              autoComplete="off"
                            />
                          )}
                        </React.Fragment>
                      ))}
                   </div>
                   
                   {/* Hint Icon */}
                   {!rulesVerified && (
                     <div className="group relative">
                        <div className="cursor-help text-slate-500 hover:text-yellow-400 transition-colors font-black border-2 border-slate-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">?</div>
                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-yellow-100 text-yellow-900 text-xs font-bold p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                           Hint: {step.hint}
                        </div>
                     </div>
                   )}

                   {rulesVerified && isCorrect && <CheckCircle className="text-emerald-400 shrink-0" size={24} />}
                </div>
              );
            })}
          </div>

          {!rulesVerified ? (
            <button 
              onClick={validateRules}
              className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              Verify Rules & Unlock Practice
            </button>
          ) : (
             <div className="mt-8 bg-emerald-900/30 border-2 border-emerald-500/50 p-4 rounded-xl text-emerald-400 font-black uppercase text-center flex items-center justify-center gap-2 animate-in zoom-in">
                <Unlock size={20}/> Rules Verified - Practice Unlocked
             </div>
          )}
        </div>
      </section>

      {/* --- FASE 2: PRÁCTICA (Bloqueada hasta verificar reglas) --- */}
      <section 
        id="practice-section"
        className={`transition-all duration-700 ${rulesVerified ? 'opacity-100 translate-y-0' : 'opacity-50 blur-sm pointer-events-none grayscale'}`}
      >
        <div className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-200 shadow-xl relative">
            
            {/* Candado visual si está bloqueado */}
            {!rulesVerified && (
               <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-4 border-slate-700 animate-in zoom-in">
                     <Lock size={48} />
                     <span className="font-black uppercase tracking-widest text-sm">Finish Theory First</span>
                  </div>
               </div>
            )}

            <div className="mb-10 flex items-center gap-4 border-b-4 border-slate-100 pb-6">
                <div className="bg-slate-900 text-white p-3 rounded-xl"><PenTool size={24}/></div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic">Active Practice</h3>
            </div>

            <div className="space-y-4">
              {quizData.map((item, idx) => {
                const isChecked = checkedPracticeIds.includes(item.id);
                const isCorrect = isChecked ? checkPracticeItem(item) : false;
                const sentenceParts = item.q.split('______');

                return (
                  <div key={item.id} className={`p-6 rounded-2xl border-2 transition-colors ${isChecked ? (isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200') : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        
                        <div className="text-slate-400 font-black text-lg select-none">{idx + 1}.</div>
                        
                        <div className="flex-grow font-bold text-slate-800 text-lg leading-loose">
                            {sentenceParts.map((part, pIdx) => (
                              <React.Fragment key={pIdx}>
                                <span dangerouslySetInnerHTML={{__html: part}} />
                                {pIdx < sentenceParts.length - 1 && (
                                  <input 
                                    disabled={isChecked}
                                    value={practiceAnswers[item.id]?.[pIdx] || ''} 
                                    className={`
                                        mx-2 border-b-4 bg-transparent text-center focus:outline-none font-black uppercase w-32 transition-colors
                                        ${isChecked 
                                            ? (isCorrect ? 'border-emerald-500 text-emerald-900' : 'border-rose-500 text-rose-900')
                                            : 'border-slate-300 focus:border-blue-600 text-blue-900'
                                        }
                                    `} 
                                    placeholder="?"
                                    autoComplete="off"
                                    onChange={(e) => handlePracticeInput(item.id, pIdx, e.target.value)}
                                  />
                                )}
                              </React.Fragment>
                            ))}
                        </div>

                        <div className="shrink-0">
                            {!isChecked ? (
                                <button 
                                    onClick={() => setCheckedPracticeIds([...checkedPracticeIds, item.id])} 
                                    className="bg-white border-2 border-slate-300 text-slate-900 px-6 py-2 rounded-lg font-black uppercase text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                >
                                    CHECK
                                </button>
                            ) : (
                                <div className={`flex items-center gap-2 font-bold uppercase text-xs px-4 py-2 rounded-lg border ${isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}`}>
                                    {isCorrect ? <CheckCircle size={16}/> : <XCircle size={16}/>} 
                                    {isCorrect ? 'Correct' : 'Error'}
                                </div>
                            )}
                        </div>
                      </div>
                      
                      {isChecked && !isCorrect && (
                         <div className="mt-3 pl-8 text-xs font-bold text-rose-600 flex gap-2">
                             <span>Answer:</span>
                             <span className="uppercase underline">{item.ans}</span>
                         </div>
                      )}
                  </div>
                );
              })}
            </div>
        </div>
      </section>
    </div>
  );
};

export default ActiveGrammarLab;