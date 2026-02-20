import React, { useState } from 'react';
import { Hammer, PenTool, CheckCircle, XCircle, Unlock, Lock, ArrowRight, Star, RotateCcw, BookOpen, Trophy, ChevronRight, Bookmark, AlertTriangle, Flame } from 'lucide-react';

const normalize = v => v?.toString().trim().toLowerCase() || '';

/* ── Fase 1: Tarjetas de reglas ──────────────────────────────────────── */
const RuleCards = ({theory, onComplete}) => {
  const [understood, setUnderstood] = useState({});
  const blocks  = Object.entries(theory||{});
  const done    = Object.values(understood).filter(Boolean).length;
  const allDone = blocks.length>0 && done===blocks.length;

  return (
    <div className="card-tool p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6"
        style={{borderBottom:'2px solid rgba(255,255,255,0.35)'}}>
        <span className="card-title">Study the Rules</span>
        <div className="md:ml-auto flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--c-text)]">{done}/{blocks.length}</span>
          <div className="flex gap-1">
            {blocks.map(([key])=>(
              <div key={key} className={`w-6 h-2 rounded-full transition-all ${understood[key]?'':'dot-pending'}`}
                style={understood[key]?{background:'var(--c-main)'}:{}}/>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map(([key, block]) => {
          const isDone = understood[key];
          return (
            <div key={key} className="rounded-2xl border-2 overflow-hidden transition-all"
              style={{background:isDone?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.15)',borderColor:isDone?'var(--c-main)':'rgba(255,255,255,0.4)'}}>
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-2 shrink-0"
                    style={isDone?{background:'var(--c-main)',borderColor:'var(--c-main)',color:'#fff'}:{background:'rgba(255,255,255,0.4)',borderColor:'rgba(255,255,255,0.5)',color:'var(--c-text)'}}>
                    {isDone?<CheckCircle size={16}/>:<Bookmark size={14}/>}
                  </div>
                  <p className="font-black text-sm text-[var(--c-dark)] uppercase tracking-wide">{block.title}</p>
                </div>
                <button onClick={()=>setUnderstood(p=>({...p,[key]:!p[key]}))}
                  className="shrink-0 btn-ghost text-[11px]" style={isDone?{background:'var(--c-soft)',borderColor:'var(--c-main)',color:'var(--c-main)'}:{}}>
                  {isDone?'✓ Got it':'Got it!'}
                </button>
              </div>
              <div className={`px-5 pb-4 space-y-2 transition-all ${isDone?'opacity-40':''}`}>
                {block.content.map((line,i)=>(
                  <div key={i} className="text-sm text-[var(--text-secondary)] px-4 py-2.5 rounded-xl flex gap-3 leading-relaxed"
                    style={{background:'rgba(255,255,255,0.40)',border:'1.5px solid rgba(255,255,255,0.5)'}}>
                    <span className="text-[var(--c-main)] shrink-0 mt-0.5">
                      {line.includes('❌')?<AlertTriangle size={14}/>:<ChevronRight size={14}/>}
                    </span>
                    <span dangerouslySetInnerHTML={{__html:line}}/>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {allDone&&(
        <button onClick={onComplete} className="btn-tool w-full mt-8 flex items-center justify-center gap-3 py-4 text-sm">
          <Unlock size={20}/> Start Practice <ArrowRight size={20} className="animate-pulse"/>
        </button>
      )}
    </div>
  );
};

/* ── Fase 2: Práctica fill-in ────────────────────────────────────────── */
const FillPractice = ({quiz}) => {
  const [answers,   setAnswers]  = useState({});
  const [statuses,  setStatuses] = useState({});
  const [streak,    setStreak]   = useState(0);
  const [maxStreak, setMaxStreak]= useState(0);
  const [score,     setScore]    = useState(0);

  const isItemCorrect = item => {
    const state = answers[item.id]||{};
    const gaps  = item.q.split('______').length-1;
    const list  = item.ans.includes(',')?item.ans.split(',').map(s=>s.trim().toLowerCase()):[item.ans.trim().toLowerCase()];
    for (let i=0;i<gaps;i++) {
      const v=normalize(state[i]); if(!v)return false;
      if(list.length===gaps){if(v!==list[i])return false;}
      else{if(!list.includes(v))return false;}
    }
    return true;
  };

  const handleCheck = item => {
    if (statuses[item.id]) return;
    const ok = isItemCorrect(item);
    setStatuses(p=>({...p,[item.id]:ok?'correct':'wrong'}));
    if(ok){const ns=streak+1;setStreak(ns);setMaxStreak(m=>Math.max(m,ns));setScore(s=>s+1);}else setStreak(0);
  };

  const handleReveal = item => {
    const parts = item.ans.includes(',')?item.ans.split(','):[item.ans];
    const f={};parts.forEach((p,i)=>{f[i]=p.trim();});
    setAnswers(prev=>({...prev,[item.id]:f}));
    setStatuses(p=>({...p,[item.id]:'revealed'})); setStreak(0);
  };

  const checkedCount = Object.keys(statuses).length;
  const allChecked   = checkedCount===quiz.length;
  const pct          = quiz.length>0?Math.round((score/quiz.length)*100):0;
  const restart      = ()=>{ setAnswers({}); setStatuses({}); setStreak(0); setMaxStreak(0); setScore(0); };

  return (
    <div className="card-tool p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6"
        style={{borderBottom:'2px solid rgba(255,255,255,0.35)'}}>
        <span className="card-title">Active Practice</span>
        <div className="md:ml-auto flex items-center gap-3 flex-wrap">
          {streak>=2&&<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-revealed animate-in zoom-in"><Flame size={14}/><span className="font-black text-xs">{streak} streak!</span></div>}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{background:'rgba(255,255,255,0.4)',border:'2px solid rgba(255,255,255,0.5)'}}>
            <Star size={14} className="text-[var(--c-dark)]"/>
            <span className="font-black text-xs text-[var(--c-dark)]">{score}<span className="opacity-60">/{quiz.length}</span></span>
          </div>
          <div className="flex gap-1">
            {quiz.map(item=>(
              <div key={item.id} className={`w-2.5 h-2.5 rounded-full transition-all ${statuses[item.id]==='correct'?'dot-correct':statuses[item.id]?'dot-wrong':'dot-pending'}`}/>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {quiz.map((item,idx)=>{
          const status  = statuses[item.id];
          const correct = status==='correct';
          const locked  = !!status;
          const parts   = item.q.split('______');
          const borderC = correct?'var(--ok-border)':status==='revealed'?'var(--warn-border)':status==='wrong'?'var(--fail-border)':'rgba(255,255,255,0.4)';
          const bgC     = correct?'var(--ok-bg)':status==='revealed'?'var(--warn-bg)':status==='wrong'?'var(--fail-bg)':'rgba(255,255,255,0.20)';

          return (
            <div key={item.id} className="p-5 md:p-6 rounded-2xl border-2 transition-all" style={{background:bgC,borderColor:borderC}}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm border-2 shrink-0"
                  style={locked?{background:correct?'var(--ok-bg)':status==='revealed'?'var(--warn-bg)':'var(--fail-bg)',
                                  borderColor:correct?'var(--ok-border)':status==='revealed'?'var(--warn-border)':'var(--fail-border)',
                                  color:correct?'var(--ok-text)':status==='revealed'?'var(--warn-text)':'var(--fail-text)'}
                              :{background:'var(--c-main)',borderColor:'transparent',color:'#fff'}}>
                  {locked?(correct?<CheckCircle size={16}/>:status==='revealed'?<Unlock size={16}/>:<XCircle size={16}/>):idx+1}
                </div>
                <div className="flex-grow text-lg md:text-xl font-medium text-[var(--text-primary)] leading-loose">
                  {parts.map((part,pIdx)=>(
                    <React.Fragment key={pIdx}>
                      <span dangerouslySetInnerHTML={{__html:part}}/>
                      {pIdx<parts.length-1&&(
                        <input disabled={locked} value={answers[item.id]?.[pIdx]||''} placeholder="?"
                          onChange={e=>{ setAnswers(p=>({...p,[item.id]:{...(p[item.id]||{}),[pIdx]:e.target.value}})); if(statuses[item.id]==='wrong')setStatuses(p=>({...p,[item.id]:undefined})); }}
                          onKeyDown={e=>{if(e.key==='Enter'&&!locked)handleCheck(item);}}
                          className="mx-2 inline-block w-36 px-3 py-1 text-center font-black uppercase rounded-xl outline-none transition-all text-base"
                          style={{background:'rgba(255,255,255,0.55)',borderBottom:`4px solid ${borderC}`,color:'var(--text-primary)'}}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {!locked?(
                    <><button onClick={()=>handleCheck(item)} className="btn-tool">Check</button>
                      <button onClick={()=>handleReveal(item)} className="btn-ghost">Reveal</button></>
                  ):(
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-black uppercase text-xs tracking-widest ${correct?'badge-correct':status==='revealed'?'badge-revealed':'badge-wrong'}`}>
                      {correct?<CheckCircle size={14}/>:status==='revealed'?<Unlock size={14}/>:<XCircle size={14}/>}
                      {correct?'Correct':status==='revealed'?'Revealed':'Wrong'}
                    </div>
                  )}
                </div>
              </div>
              {locked&&!correct&&(
                <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2" style={{background:'rgba(255,255,255,0.45)',border:'1.5px solid rgba(255,255,255,0.6)'}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Answer:</span>
                    <span className="text-[var(--text-primary)] font-black">{item.ans}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] italic text-xs">{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allChecked&&(
        <div className={`mt-8 p-8 rounded-2xl border-2 text-center animate-in zoom-in ${pct===100?'badge-correct':pct>=40?'':'badge-wrong'}`}
          style={pct>=40&&pct<100?{background:'var(--c-soft)',borderColor:'var(--c-border)'}:{}}>
          <p className="text-5xl mb-3">{pct===100?'🏆':pct>=70?'🌟':pct>=40?'💪':'🔄'}</p>
          <p className="text-6xl font-black text-[var(--text-primary)] mb-1">{score}<span className="text-2xl text-[var(--text-muted)]">/{quiz.length}</span></p>
          <div className="flex justify-center gap-6 mb-6">
            <div><p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Score</p><p className="font-black text-lg text-[var(--text-primary)]">{pct}%</p></div>
            <div><p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Best Streak</p><p className="font-black text-lg text-[var(--warn-text)]">{maxStreak} 🔥</p></div>
          </div>
          <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto"><RotateCcw size={16}/> Try Again</button>
        </div>
      )}
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────────── */
const ActiveGrammarLab = ({data}) => {
  const [phase, setPhase] = useState('rules');
  const quiz = data.activeQuiz||data.theoryQuiz||[];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-center gap-3">
        {[{id:'rules',label:'Study',icon:<BookOpen size={14}/>},{id:'practice',label:'Practice',icon:<Hammer size={14}/>}].map((p,i)=>(
          <React.Fragment key={p.id}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest border-2 transition-all ${phase===p.id?'btn-tool':''}`}
              style={phase!==p.id?{background:'var(--surface)',borderColor:'var(--surface-border)',color:'var(--text-muted)'}:{}}>
              {p.icon} {p.label}
              {phase==='practice'&&p.id==='rules'&&<CheckCircle size={12}/>}
              {phase==='rules'&&p.id==='practice'&&<Lock size={12}/>}
            </div>
            {i===0&&<ArrowRight size={14} className="text-[var(--text-muted)] shrink-0"/>}
          </React.Fragment>
        ))}
      </div>
      {phase==='rules'?<RuleCards theory={data.theoryBlock} onComplete={()=>setPhase('practice')}/>:<FillPractice quiz={quiz}/>}
    </div>
  );
};
export default ActiveGrammarLab;