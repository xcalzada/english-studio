import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, PenTool, Hammer, Unlock, Lock,
  Eye, ArrowRight, PlayCircle 
} from 'lucide-react';

const ActiveGrammarLab = ({ data }) => {
  // --- ESTADOS FASE 1 (REGLAS) ---
  const [ruleAnswers, setRuleAnswers] = useState({});
  const [ruleStatus, setRuleStatus] = useState({}); // { id: 'correct' | 'incorrect' | 'revealed' }
  const [isPracticeUnlocked, setIsPracticeUnlocked] = useState(false);

  // --- ESTADOS FASE 2 (PRÁCTICA) ---
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [checkedPracticeIds, setCheckedPracticeIds] = useState([]);
  const [revealedPracticeIds, setRevealedPracticeIds] = useState([]); // Para revelar en la práctica también

  // --- LÓGICA DE VALIDACIÓN ---
  const normalize = (txt) => txt?.toString().trim().toLowerCase() || "";

  // 1. CHEQUEAR UNA REGLA INDIVIDUAL
  const handleCheckRule = (step) => {
    const userAns = normalize(ruleAnswers[step.id]);
    const correctAns = normalize(step.ans);

    if (userAns === correctAns) {
      setRuleStatus(prev => ({ ...prev, [step.id]: 'correct' }));
    } else {
      setRuleStatus(prev => ({ ...prev, [step.id]: 'incorrect' }));
    }
  };

  // 2. REVELAR UNA REGLA (SOLUCIÓN)
  const handleRevealRule = (step) => {
    setRuleAnswers(prev => ({ ...prev, [step.id]: step.ans })); // Rellena el input
    setRuleStatus(prev => ({ ...prev, [step.id]: 'revealed' })); // Marca como revelado
  };

  // 3. EFECTO: DESBLOQUEAR PRÁCTICA SI TODO ESTÁ HECHO
  useEffect(() => {
    const totalRules = data.activeRules?.steps.length || 0;
    // Contamos cuántas reglas están en estado 'correct' o 'revealed'
    const completedRules = data.activeRules?.steps.filter(step => 
      ruleStatus[step.id] === 'correct' || ruleStatus[step.id] === 'revealed'
    ).length;

    if (completedRules === totalRules && totalRules > 0) {
      setIsPracticeUnlocked(true);
    }
  }, [ruleStatus, data.activeRules]);


  // --- LÓGICA PRÁCTICA (Fase 2) ---
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
        const userVal = normalize(itemState[i]);
        if (userVal === "") return false;
        if (correctAnswers.length === gapCount) {
            if (userVal !== correctAnswers[i]) return false;
        } else {
            if (!correctAnswers.includes(userVal)) return false;
        }
    }
    return true;
  };

  // Función para revelar respuesta en la práctica si se atascan
  const revealPracticeItem = (item) => {
    const correctParts = item.ans.includes(',') ? item.ans.split(',') : [item.ans];
    // Rellenamos todos los huecos
    const newAnswers = {};
    correctParts.forEach((part, idx) => {
        newAnswers[idx] = part.trim();
    });
    
    setPracticeAnswers(prev => ({ ...prev, [item.id]: newAnswers }));
    setCheckedPracticeIds(prev => [...prev, item.id]); // Lo marcamos como chequeado
    setRevealedPracticeIds(prev => [...prev, item.id]); // Lo marcamos como revelado (trampa)
  };


  const quizData = data.activeQuiz || data.theoryQuiz;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* --- FASE 1: BLUEPRINT (REGLAS) --- */}
      <section className="bg-slate-900 text-white rounded-[2.5rem] p-6 md:p-8 border-4 border-slate-900 shadow-[12px_12px_0px_0px_#1e293b] relative overflow-hidden">
        
        {/* Fondo Decorativo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b-2 border-slate-700 pb-6">
             <div className="bg-blue-600 p-3 rounded-xl rotate-3 shadow-lg border-2 border-blue-400"><Hammer className="text-white" size={28}/></div>
             <div>
               <h3 className="text-3xl font-black uppercase italic tracking-tighter">Theory Workshop</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Build the rules to unlock practice</p>
             </div>
          </div>

          <div className="space-y-6">
            {data.activeRules?.steps.map((step, idx) => {
              const status = ruleStatus[step.id] || 'idle'; // idle, correct, incorrect, revealed
              const parts = step.text.split('______');
              const isDone = status === 'correct' || status === 'revealed';

              return (
                <div key={step.id} className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-4
                    ${status === 'correct' ? 'bg-emerald-900/30 border-emerald-500/50' : ''}
                    ${status === 'revealed' ? 'bg-amber-900/30 border-amber-500/50' : ''}
                    ${status === 'incorrect' ? 'bg-rose-900/20 border-rose-500/50' : ''}
                    ${status === 'idle' ? 'bg-slate-800/50 border-slate-700' : ''}
                `}>
                   
                   <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                       {/* Número */}
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border shrink-0 
                           ${isDone ? 'bg-slate-700 border-slate-500 text-slate-300' : 'bg-blue-600 text-white border-blue-400'}`}>
                         {idx + 1}
                       </div>
                       
                       {/* Texto e Input */}
                       <div className="font-bold text-lg leading-relaxed flex-grow text-slate-200">
                          {parts.map((part, pIdx) => (
                            <React.Fragment key={pIdx}>
                              <span dangerouslySetInnerHTML={{__html: part}} />
                              {pIdx < parts.length - 1 && (
                                <input 
                                  disabled={isDone}
                                  value={ruleAnswers[step.id] || ''}
                                  onChange={(e) => {
                                      setRuleAnswers({...ruleAnswers, [step.id]: e.target.value});
                                      setRuleStatus({...ruleStatus, [step.id]: 'idle'}); // Reset si escribe de nuevo
                                  }}
                                  className={`
                                    mx-2 border-b-4 text-center font-black uppercase w-32 outline-none transition-all bg-transparent
                                    ${status === 'correct' ? 'border-emerald-500 text-emerald-400' : ''}
                                    ${status === 'revealed' ? 'border-amber-500 text-amber-400' : ''}
                                    ${status === 'incorrect' ? 'border-rose-500 text-rose-400' : ''}
                                    ${status === 'idle' ? 'border-slate-500 focus:border-blue-400 text-white' : ''}
                                  `}
                                  placeholder="?"
                                  autoComplete="off"
                                />
                              )}
                            </React.Fragment>
                          ))}
                       </div>

                        {/* Botones de Acción (Check / Reveal) */}
                        <div className="flex items-center gap-2 shrink-0">
                            {!isDone ? (
                                <>
                                    <button 
                                        onClick={() => handleCheckRule(step)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-black uppercase text-xs tracking-wide shadow-md active:scale-95 transition-all"
                                    >
                                        Check
                                    </button>
                                    <button 
                                        onClick={() => handleRevealRule(step)}
                                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 p-2 rounded-lg transition-all"
                                        title="Reveal Answer"
                                    >
                                        <Eye size={18}/>
                                    </button>
                                </>
                            ) : (
                                <div className={`flex items-center gap-2 font-black uppercase text-xs px-3 py-1 rounded-lg border 
                                    ${status === 'correct' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-500/50' : 'bg-amber-900/50 text-amber-400 border-amber-500/50'}`}>
                                    {status === 'correct' ? <CheckCircle size={16}/> : <Eye size={16}/>}
                                    {status === 'correct' ? 'Correct' : 'Revealed'}
                                </div>
                            )}
                        </div>
                   </div>

                   {/* Hint en caso de error */}
                   {status === 'incorrect' && (
                       <div className="text-xs font-bold text-rose-400 bg-rose-900/20 p-2 rounded-lg border border-rose-900/50 flex items-center gap-2 animate-in slide-in-from-top-1">
                           <XCircle size={14}/> Hint: {step.hint}
                       </div>
                   )}
                </div>
              );
            })}
          </div>
          
          {/* Mensaje de desbloqueo */}
          {isPracticeUnlocked && (
             <div className="mt-8 bg-emerald-600 text-white p-4 rounded-xl font-black uppercase text-center flex items-center justify-center gap-3 animate-in zoom-in border-4 border-emerald-800 shadow-lg">
                <Unlock size={24}/> 
                <span>Practice Unlocked!</span>
                <ArrowRight size={24} className="animate-pulse"/>
             </div>
          )}
        </div>
      </section>

      {/* --- FASE 2: PRÁCTICA --- */}
      <section 
        id="practice-section"
        className={`transition-all duration-700 ${isPracticeUnlocked ? 'opacity-100 translate-y-0' : 'opacity-50 blur-sm pointer-events-none grayscale'}`}
      >
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border-4 border-slate-200 shadow-xl relative">
            
            {!isPracticeUnlocked && (
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
                const isRevealed = revealedPracticeIds.includes(item.id);
                // Si fue revelado, lo consideramos "incorrecto" visualmente (ámbar) o "revelado"
                const isCorrect = isChecked && !isRevealed ? checkPracticeItem(item) : false;
                
                const sentenceParts = item.q.split('______');

                return (
                  <div key={item.id} className={`p-6 rounded-2xl border-2 transition-colors ${isChecked ? (isCorrect ? 'bg-emerald-50 border-emerald-200' : (isRevealed ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200')) : 'bg-slate-50 border-slate-200'}`}>
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
                                            ? (isCorrect ? 'border-emerald-500 text-emerald-900' : (isRevealed ? 'border-amber-500 text-amber-900' : 'border-rose-500 text-rose-900'))
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

                        <div className="shrink-0 flex items-center gap-2">
                            {!isChecked ? (
                                <>
                                    <button 
                                        onClick={() => setCheckedPracticeIds([...checkedPracticeIds, item.id])} 
                                        className="bg-white border-2 border-slate-300 text-slate-900 px-6 py-2 rounded-lg font-black uppercase text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                    >
                                        CHECK
                                    </button>
                                    {/* Opción para revelar si se rinden en práctica */}
                                    {/* <button onClick={() => revealPracticeItem(item)} className="text-slate-400 hover:text-amber-500"><Eye size={20}/></button> */}
                                </>
                            ) : (
                                <div className="flex flex-col items-end gap-2">
                                    <div className={`flex items-center gap-2 font-bold uppercase text-xs px-4 py-2 rounded-lg border 
                                        ${isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : (isRevealed ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-rose-100 text-rose-800 border-rose-200')}`}>
                                        {isCorrect ? <CheckCircle size={16}/> : (isRevealed ? <Eye size={16}/> : <XCircle size={16}/>)} 
                                        {isCorrect ? 'Correct' : (isRevealed ? 'Revealed' : 'Error')}
                                    </div>
                                    
                                    {/* Botón de ayuda si fallaron */}
                                    {!isCorrect && !isRevealed && (
                                        <button 
                                            onClick={() => revealPracticeItem(item)}
                                            className="text-[10px] font-black uppercase text-slate-400 hover:text-amber-600 flex items-center gap-1 underline"
                                        >
                                            <Eye size={12}/> Show Answer
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                      </div>
                      
                      {/* Feedback de respuesta */}
                      {(isChecked && !isCorrect && !isRevealed) && (
                         <div className="mt-3 pl-8 text-xs font-bold text-rose-600 flex gap-2 animate-in slide-in-from-top-1">
                             <span>Try again or click 'Show Answer'</span>
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