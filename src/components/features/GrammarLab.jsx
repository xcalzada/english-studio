import React, { useState } from 'react';
import { BookOpen, PenTool, CheckCircle, XCircle, Unlock, AlertTriangle, ChevronRight, Flame, RotateCcw, Trophy, ChevronDown, ChevronUp, Star } from 'lucide-react';

const normalize = v => v?.toString().trim().toLowerCase() || '';

/* Cada bloque de teoría rota por estos suffijos de clase Tailwind-safe
   que a su vez mapean a los tokens de CSS del tema activo */
const BLOCK_ACCENTS = [
  { ring: 'ring-blue-400',   num: 'bg-blue-500'   },
  { ring: 'ring-emerald-400',num: 'bg-emerald-500' },
  { ring: 'ring-violet-400', num: 'bg-violet-500'  },
  { ring: 'ring-rose-400',   num: 'bg-rose-500'    },
  { ring: 'ring-amber-400',  num: 'bg-amber-500'   },
  { ring: 'ring-sky-400',    num: 'bg-sky-500'     },
];

/* ── Renderers de teoría ─────────────────────────────────────────────── */
const Ex = ({ en, es }) => (
  <div className="card-inner p-4 space-y-1">
    <p className="font-bold text-[var(--text-primary)] text-base leading-snug" dangerouslySetInnerHTML={{ __html: en }}/>
    <p className="text-[var(--text-secondary)] italic text-sm">{es}</p>
  </div>
);

const Rule = ({ text, warn }) => (
  <div className={`flex gap-3 p-3 rounded-2xl border-2 text-sm font-semibold ${warn ? 'badge-wrong' : 'badge-correct'}`}>
    <span className="text-xl shrink-0">{warn ? '⚠️' : '✅'}</span>
    <span dangerouslySetInnerHTML={{ __html: text }}/>
  </div>
);

const Grid = ({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {items.map((it, i) => (
      <div key={i} className="card-inner p-3 text-center hover:scale-105 transition-transform">
        {it.emoji && <p className="text-3xl mb-2">{it.emoji}</p>}
        <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wide mb-1">{it.base}</p>
        <p className="text-[var(--c-text)] font-black text-lg">→ {it.comp}</p>
      </div>
    ))}
  </div>
);

const Teacher = ({ text }) => (
  <div className="flex gap-3 p-3 rounded-2xl bg-[var(--warn-bg)] border-2 border-[var(--warn-border)]">
    <span className="text-2xl shrink-0">👨‍🏫</span>
    <p className="text-[var(--warn-text)] text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: text }}/>
  </div>
);

const Tip = ({ emoji, text }) => (
  <div className="flex gap-3 p-3 rounded-2xl card-inner">
    <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
    <p className="text-[var(--text-secondary)] text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: text }}/>
  </div>
);

const Table = ({ rows, headers }) => (
  <div className="overflow-x-auto rounded-2xl border-2 border-[var(--surface-border)] overflow-hidden">
    <table className="w-full text-sm">
      {headers && <thead><tr className="bg-[var(--surface)] border-b-2 border-[var(--surface-border)]">
        {headers.map((h,i) => <th key={i} className="px-4 py-3 text-left font-black uppercase text-[11px] tracking-widest text-[var(--text-secondary)]">{h}</th>)}
      </tr></thead>}
      <tbody>{rows.map((row,i) => (
        <tr key={i} className={`border-b border-[var(--surface-border)] ${i%2===0?'bg-[var(--surface-raised)]':'bg-[var(--surface)]'}`}>
          {row.map((cell,j) => <td key={j} className="px-4 py-3 text-[var(--text-primary)] font-semibold" dangerouslySetInnerHTML={{__html:cell}}/>)}
        </tr>
      ))}</tbody>
    </table>
  </div>
);

const Subtitle = ({ text }) => (
  <p className="text-[var(--c-text)] font-black text-xs uppercase tracking-widest flex items-center gap-2 mt-1">
    <span className="w-2 h-2 rounded-full bg-[var(--c-border)] inline-block"/>
    {text}
  </p>
);

const RenderItem = ({ item }) => {
  if (typeof item === 'string') return (
    <div className="item-surface px-4 py-3 flex gap-3">
      <span className="text-[var(--c-main)] shrink-0 mt-0.5">
        {item.includes('❌') ? <AlertTriangle size={15}/> : item.includes('✅') ? <CheckCircle size={15}/> : <ChevronRight size={15}/>}
      </span>
      <span className="text-[var(--text-secondary)] text-sm leading-relaxed font-semibold" dangerouslySetInnerHTML={{__html:item}}/>
    </div>
  );
  switch(item.type) {
    case 'example':  return <Ex en={item.en} es={item.es}/>;
    case 'rule':     return <Rule text={item.text} warn={item.warn}/>;
    case 'grid':     return <Grid items={item.items}/>;
    case 'teacher':  return <Teacher text={item.text}/>;
    case 'tip':      return <Tip emoji={item.emoji} text={item.text}/>;
    case 'table':    return <Table rows={item.rows} headers={item.headers}/>;
    case 'subtitle': return <Subtitle text={item.text}/>;
    case 'text':     return <p className="text-[var(--text-secondary)] text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{__html:item.text}}/>;
    default:         return null;
  }
};

/* ── Theory Section ──────────────────────────────────────────────────── */
const TheorySection = ({ theory }) => {
  const [open, setOpen] = useState({});
  const blocks  = Object.entries(theory || {});
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="space-y-3">
      {blocks.map(([key, block], idx) => {
        const acc    = BLOCK_ACCENTS[idx % BLOCK_ACCENTS.length];
        const isOpen = open[key] !== false;
        return (
          <div key={key} className="card-tool overflow-hidden">
            <button onClick={() => setOpen(p => ({...p, [key]: !isOpen}))}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              style={{background:'rgba(255,255,255,0.30)'}}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${acc.num} flex items-center justify-center font-black text-white text-lg shrink-0 shadow-md`}>
                  {letters[idx]}
                </div>
                <span className="font-black text-[var(--c-dark)] text-base">{block.title}</span>
              </div>
              <span className="text-[var(--c-text)] shrink-0">
                {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-4 space-y-3" style={{borderTop:'2px solid rgba(255,255,255,0.4)'}}>
                {(block.content||[]).map((item,i) => <RenderItem key={i} item={item}/>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ── Badges ──────────────────────────────────────────────────────────── */
const TYPE_LABEL = { fill:'✏️ Fill in', choice:'🔘 Choice', error:'🔧 Fix it', order:'🔀 Reorder' };

const TypeBadge = ({type}) => (
  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl border-2
    bg-[var(--c-soft)] border-[var(--c-border)] text-[var(--c-text)]">
    {TYPE_LABEL[type]||type}
  </span>
);

const StatusBadge = ({status}) => (
  <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black uppercase text-xs tracking-widest
    ${status==='correct'?'badge-correct':status==='revealed'?'badge-revealed':'badge-wrong'}`}>
    {status==='correct'?<><CheckCircle size={14}/> Correct!</>:status==='revealed'?<><Unlock size={14}/> Revealed</>:<><XCircle size={14}/> Wrong</>}
  </div>
);

/* ── Fill ────────────────────────────────────────────────────────────── */
const FillItem = ({item, onResult}) => {
  const [answers, setAnswers] = useState({});
  const [status,  setStatus]  = useState(null);

  const check = () => {
    const gaps = item.q.split('______').length - 1;
    const list = item.ans.includes(',') ? item.ans.split(',').map(s=>s.trim().toLowerCase()) : [item.ans.trim().toLowerCase()];
    let ok = true;
    for (let i=0; i<gaps; i++) {
      const v = normalize(answers[i]);
      if (!v) { ok=false; break; }
      if (list.length===gaps) { if(v!==list[i]){ok=false;break;} }
      else { if(!list.includes(v)){ok=false;break;} }
    }
    setStatus(ok?'correct':'wrong'); onResult(ok);
  };

  const reveal = () => {
    const parts = item.ans.includes(',') ? item.ans.split(',') : [item.ans];
    const f={}; parts.forEach((p,i)=>{f[i]=p.trim();}); setAnswers(f); setStatus('revealed'); onResult(false);
  };

  const parts  = item.q.split('______');
  const locked = !!status;
  const borderColor = status==='correct'?'var(--ok-border)':status==='revealed'?'var(--warn-border)':status==='wrong'?'var(--fail-border)':'var(--c-border)';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-grow text-lg font-bold text-[var(--text-primary)] leading-loose">
        {parts.map((part,pIdx) => (
          <React.Fragment key={pIdx}>
            <span dangerouslySetInnerHTML={{__html:part}}/>
            {pIdx < parts.length-1 && (
              <input disabled={locked} value={answers[pIdx]||''} placeholder="?"
                onChange={e=>setAnswers(p=>({...p,[pIdx]:e.target.value}))}
                onKeyDown={e=>{if(e.key==='Enter'&&!locked)check();}}
                className="mx-2 inline-block w-32 px-3 py-1 text-center font-black uppercase rounded-xl outline-none transition-all text-base"
                style={{background:'var(--c-soft)',borderBottom:`4px solid ${borderColor}`,color:'var(--text-primary)'}}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="shrink-0 flex gap-2">
        {!locked
          ? <><button onClick={check}  className="btn-tool">Check</button>
               <button onClick={reveal} className="btn-ghost">Reveal</button></>
          : <StatusBadge status={status}/>}
      </div>
    </div>
  );
};

/* ── Choice ──────────────────────────────────────────────────────────── */
const ChoiceItem = ({item, onResult}) => {
  const [selected, setSelected] = useState(null);
  const [locked,   setLocked]   = useState(false);

  const check = opt => {
    if (locked) return;
    setSelected(opt); setLocked(true);
    onResult(normalize(opt)===normalize(item.ans));
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-[var(--text-primary)] leading-snug" dangerouslySetInnerHTML={{__html:item.q}}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {item.options.map(opt => {
          const isOk  = normalize(opt)===normalize(item.ans);
          const isSel = selected===opt;
          let cls = 'p-3 rounded-2xl border-2 font-bold text-sm text-left transition-all flex items-center gap-2 cursor-pointer ';
          if (locked && isOk)              cls += 'badge-correct scale-[1.02]';
          else if (locked && isSel && !isOk) cls += 'badge-wrong';
          else if (locked)                 cls += 'opacity-40 item-surface';
          else                             cls += 'item-surface hover:border-[var(--c-border)] hover:bg-[var(--c-soft)] hover:scale-[1.01]';
          return (
            <button key={opt} onClick={()=>check(opt)} disabled={locked} className={cls}>
              {locked&&isOk       && <CheckCircle size={15} className="shrink-0 text-[var(--ok-text)]"/>}
              {locked&&isSel&&!isOk && <XCircle    size={15} className="shrink-0 text-[var(--fail-text)]"/>}
              {opt}
            </button>
          );
        })}
      </div>
      {locked && <StatusBadge status={normalize(selected)===normalize(item.ans)?'correct':'wrong'}/>}
    </div>
  );
};

/* ── Error ───────────────────────────────────────────────────────────── */
const ErrorItem = ({item, onResult}) => {
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState(null);
  const locked = !!status;
  const check  = () => { const ok=normalize(input)===normalize(item.ans); setStatus(ok?'correct':'wrong'); onResult(ok); };
  const reveal = () => { setInput(item.ans); setStatus('revealed'); onResult(false); };

  return (
    <div className="space-y-4">
      <div className="badge-wrong p-3 rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--fail-text)] mb-1">🔍 Find and fix the error:</p>
        <p className="text-base font-bold text-[var(--text-primary)]" dangerouslySetInnerHTML={{__html:item.q}}/>
      </div>
      <div className="flex items-center gap-2">
        <input disabled={locked} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&!locked)check();}}
          placeholder="Write the correct sentence…"
          className="input-base flex-1"
          style={status?{borderColor:status==='correct'?'var(--ok-border)':status==='revealed'?'var(--warn-border)':'var(--fail-border)'}:{}}
        />
        <div className="flex gap-2 shrink-0">
          {!locked
            ? <><button onClick={check}  className="btn-tool px-5 py-3">Check</button>
                 <button onClick={reveal} className="btn-ghost px-4 py-3">Reveal</button></>
            : <StatusBadge status={status}/>}
        </div>
      </div>
    </div>
  );
};

/* ── Order ───────────────────────────────────────────────────────────── */
const OrderItem = ({item, onResult}) => {
  const [available, setAvailable] = useState(()=>item.words.map((w,i)=>({w,i,used:false})));
  const [chosen,    setChosen]    = useState([]);
  const [status,    setStatus]    = useState(null);
  const locked = !!status;

  const pick   = t => { if(locked||t.used)return; setAvailable(p=>p.map(x=>x.i===t.i?{...x,used:true}:x)); setChosen(p=>[...p,t]); };
  const unpick = t => { if(locked)return; setChosen(p=>p.filter(x=>x.i!==t.i)); setAvailable(p=>p.map(x=>x.i===t.i?{...x,used:false}:x)); };
  const check  = () => { const ok=normalize(chosen.map(t=>t.w).join(' '))===normalize(item.ans); setStatus(ok?'correct':'wrong'); onResult(ok); };
  const reset  = () => { setAvailable(item.words.map((w,i)=>({w,i,used:false}))); setChosen([]); setStatus(null); };

  const dropBorder = status==='correct'?'var(--ok-border)':status==='revealed'?'var(--warn-border)':status==='wrong'?'var(--fail-border)':'var(--c-border)';
  const dropBg     = status==='correct'?'var(--ok-bg)':status==='wrong'?'var(--fail-bg)':'var(--c-soft)';

  return (
    <div className="space-y-3">
      <div className="min-h-[56px] flex flex-wrap gap-2 p-3 rounded-2xl border-2 transition-all"
        style={{background:dropBg, borderColor:dropBorder}}>
        {chosen.length===0 && <span className="text-[var(--text-muted)] text-sm italic self-center pl-1">👆 Tap words to build your sentence…</span>}
        {chosen.map(t => (
          <button key={t.i} onClick={()=>unpick(t)} disabled={locked}
            className="px-3 py-1.5 rounded-xl font-bold text-sm transition-all"
            style={{background:'var(--c-main)',color:'#fff',border:'2px solid var(--c-border)'}}>
            {t.w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {available.map(t => (
          <button key={t.i} onClick={()=>pick(t)} disabled={t.used||locked}
            className={`px-3 py-1.5 rounded-xl border-2 font-bold text-sm transition-all ${t.used?'opacity-20 cursor-not-allowed':''}`}
            style={t.used?{}:{background:'var(--surface-raised)',borderColor:'var(--surface-border)',color:'var(--text-primary)'}}>
            {t.w}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {!locked
          ? <><button onClick={check} disabled={chosen.length===0} className="btn-tool disabled:opacity-30">Check</button>
               <button onClick={reset} className="btn-ghost">Reset</button></>
          : <div className="flex items-center gap-3"><StatusBadge status={status}/>
              {status!=='correct' && <button onClick={reset} className="text-[10px] font-black uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"><RotateCcw size={11}/> Try again</button>}
            </div>}
      </div>
    </div>
  );
};

/* ── Practice Section ────────────────────────────────────────────────── */
const PracticeSection = ({quiz}) => {
  const [results,   setResults]   = useState({});
  const [streak,    setStreak]    = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score,     setScore]     = useState(0);
  const [key,       setKey]       = useState(0);

  const handleResult = (id, ok) => {
    if (results[id]!==undefined) return;
    setResults(p=>({...p,[id]:ok}));
    if (ok) { const ns=streak+1; setStreak(ns); setMaxStreak(m=>Math.max(m,ns)); setScore(s=>s+1); } else setStreak(0);
  };

  const checkedCount = Object.keys(results).length;
  const allChecked   = checkedCount===quiz.length;
  const pct          = quiz.length>0?Math.round((score/quiz.length)*100):0;
  const restart      = ()=>{ setResults({}); setStreak(0); setMaxStreak(0); setScore(0); setKey(k=>k+1); };

  return (
    <div className="card-tool p-6 md:p-10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6"
        style={{borderBottom:'2px solid rgba(255,255,255,0.35)'}}>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl" style={{background:'rgba(255,255,255,0.4)',border:'2px solid var(--c-border)'}}>
            <PenTool size={22} className="text-[var(--c-dark)]"/>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[var(--c-dark)] uppercase tracking-tight">✏️ Practice Zone</h3>
            <p className="text-[var(--c-text)] font-bold text-[10px] uppercase tracking-widest">Mixed exercises</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {streak>=2 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl animate-in zoom-in badge-revealed">
              <Flame size={14}/><span className="font-black text-sm">{streak} 🔥</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl" style={{background:'rgba(255,255,255,0.4)',border:'2px solid var(--c-border)'}}>
            <Star size={14} className="text-[var(--c-dark)]"/>
            <span className="font-black text-base text-[var(--c-dark)]">{score}<span className="text-[var(--c-text)] text-sm">/{quiz.length}</span></span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {quiz.map(item => (
              <div key={item.id} className={`w-3 h-3 rounded-full transition-all ${results[item.id]===true?'dot-correct':results[item.id]===false?'dot-wrong':'dot-pending'}`}/>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div key={key} className="space-y-4">
        {quiz.map((item, idx) => {
          const checked = results[item.id]!==undefined;
          const ok      = results[item.id]===true;
          return (
            <div key={item.id} className={`p-5 md:p-6 rounded-2xl border-2 transition-all ${checked&&ok?'state-correct':checked&&!ok?'state-wrong':'item-surface'}`}
              style={!checked?{borderColor:'var(--surface-border)'}:{}}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base border-2 shrink-0 ${checked&&ok?'badge-correct':checked&&!ok?'badge-wrong':''}`}
                  style={!checked?{background:'var(--c-main)',color:'#fff',border:'2px solid var(--c-border)'}:{}}>
                  {checked?(ok?<CheckCircle size={16}/>:<XCircle size={16}/>):idx+1}
                </div>
                <TypeBadge type={item.type}/>
              </div>
              {item.type==='fill'   && <FillItem   item={item} onResult={ok=>handleResult(item.id,ok)}/>}
              {item.type==='choice' && <ChoiceItem item={item} onResult={ok=>handleResult(item.id,ok)}/>}
              {item.type==='error'  && <ErrorItem  item={item} onResult={ok=>handleResult(item.id,ok)}/>}
              {item.type==='order'  && <OrderItem  item={item} onResult={ok=>handleResult(item.id,ok)}/>}
              {checked && item.explanation && (
                <div className="mt-4 item-surface px-4 py-3 animate-in slide-in-from-top-2">
                  <p className="text-[var(--text-secondary)] italic text-sm font-semibold">💡 {item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allChecked && (
        <div className={`mt-8 p-8 rounded-3xl border-2 text-center animate-in zoom-in ${pct===100?'badge-correct':pct>=70?'':'badge-wrong'}`}
          style={pct>=40&&pct<100?{background:'var(--c-soft)',border:'2px solid var(--c-border)'}:{}}>
          <p className="text-5xl mb-3">{pct===100?'🏆':pct>=70?'🌟':pct>=40?'💪':'🔄'}</p>
          <p className="text-6xl font-black text-[var(--text-primary)] mb-1">{score}<span className="text-2xl text-[var(--text-muted)]">/{quiz.length}</span></p>
          <div className="flex justify-center gap-8 mt-5 mb-6">
            <div><p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Score</p><p className="font-black text-xl text-[var(--text-primary)]">{pct}%</p></div>
            <div><p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Best Streak</p><p className="font-black text-xl text-[var(--warn-text)]">{maxStreak} 🔥</p></div>
          </div>
          <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto"><RotateCcw size={16}/> Try Again</button>
        </div>
      )}
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────────── */
const GrammarLab = ({data}) => (
  <div className="space-y-10 animate-in fade-in duration-500 pb-20">
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-2xl border-2" style={{background:'var(--c-soft)',borderColor:'var(--c-border)'}}>
          <BookOpen size={20} className="text-[var(--c-main)]"/>
        </div>
        <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">📖 Theory</h2>
        <div className="flex-1 h-0.5 rounded-full" style={{background:'linear-gradient(to right, var(--surface-border), transparent)'}}/>
      </div>
      <TheorySection theory={data.theoryBlock}/>
    </div>
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-2xl border-2" style={{background:'var(--c-soft)',borderColor:'var(--c-border)'}}>
          <PenTool size={20} className="text-[var(--c-main)]"/>
        </div>
        <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">🎯 Practice</h2>
        <div className="flex-1 h-0.5 rounded-full" style={{background:'linear-gradient(to right, var(--surface-border), transparent)'}}/>
      </div>
      <PracticeSection quiz={data.theoryQuiz||[]}/>
    </div>
  </div>
);

export default GrammarLab;