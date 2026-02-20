import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCcw, ArrowRight, ArrowLeft, CheckCircle, XCircle, Shuffle, Trophy, Flame, Layers, Keyboard, Eye, Zap, Play, Square } from 'lucide-react';

const speak = (text, rate=0.85) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-GB'; u.rate=rate; window.speechSynthesis.speak(u);
};
const shuffled = arr => [...arr].sort(()=>Math.random()-0.5);

/* ── Gallery ─────────────────────────────────────────────────────────── */
const Gallery = ({vocab}) => {
  const [playing,  setPlaying]  = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!autoPlay) { window.speechSynthesis.cancel(); return; }
    const next = () => {
      if (indexRef.current >= vocab.length) { setAutoPlay(false); setPlaying(null); indexRef.current=0; return; }
      const item = vocab[indexRef.current];
      setPlaying(item.id);
      const u = new SpeechSynthesisUtterance(item.word);
      u.lang='en-GB'; u.rate=0.8;
      u.onend = () => { setPlaying(null); indexRef.current++; autoRef.current=setTimeout(next,900); };
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    };
    indexRef.current=0; next();
    return ()=>{ window.speechSynthesis.cancel(); clearTimeout(autoRef.current); };
  }, [autoPlay]);

  const handleSpeak = item => {
    if (autoPlay) return;
    setPlaying(item.id);
    const u = new SpeechSynthesisUtterance(item.word);
    u.lang='en-GB'; u.rate=0.8; u.onend=()=>setPlaying(null);
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl"
        style={{background:'var(--surface)',border:'2px solid var(--surface-border)'}}>
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-[var(--c-main)]"/>
          <span className="font-black uppercase text-xs tracking-widest text-[var(--text-secondary)]">{vocab.length} words</span>
          <span className="text-[var(--text-muted)] text-xs">· click to hear</span>
        </div>
        <button onClick={()=>setAutoPlay(p=>!p)} className={autoPlay?'btn-ghost':'btn-tool'} style={autoPlay?{color:'var(--fail-text)',background:'var(--fail-bg)',borderColor:'var(--fail-border)'}:{}}>
          {autoPlay?<><Square size={13} fill="currentColor" style={{display:'inline',marginRight:'4px'}}/> Stop</>:<><Play size={13} fill="currentColor" style={{display:'inline',marginRight:'4px'}}/> Listen All</>}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocab.map(item => {
          const active = playing===item.id;
          return (
            <div key={item.id} onClick={()=>handleSpeak(item)}
              className="card-tool p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300"
              style={active?{borderColor:'var(--c-main)',boxShadow:'0 0 0 3px var(--c-glow)',transform:'scale(1.02)'}:{}}> 
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                  style={{background:'rgba(255,255,255,0.55)',border:'1.5px solid var(--c-border)',color:'var(--c-dark)'}}>
                  {item.span}
                </span>
                <div className="p-2 rounded-xl border-2 transition-all"
                  style={active?{background:'var(--c-main)',borderColor:'var(--c-main)',color:'#fff'}:{background:'rgba(255,255,255,0.4)',borderColor:'var(--c-border)',color:'var(--c-main)'}}>
                  <Volume2 size={16} className={active?'animate-pulse':''}/>
                </div>
              </div>
              <p className={`font-black text-3xl tracking-tight transition-colors ${active?'text-[var(--c-dark)]':'text-[var(--text-primary)]'}`}>{item.word}</p>
              {active && (
                <div className="flex items-center gap-1.5">
                  {[0,1,2,3].map(i=>(
                    <div key={i} className="w-1 rounded-full animate-bounce" style={{background:'var(--c-main)',height:`${8+(i%3)*6}px`,animationDelay:`${i*0.12}s`}}/>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Flashcards ──────────────────────────────────────────────────────── */
const Flashcards = ({vocab}) => {
  const [index,    setIndex]    = useState(0);
  const [flipped,  setFlipped]  = useState(false);
  const [known,    setKnown]    = useState(new Set());
  const [learning, setLearning] = useState(new Set());
  const [deck,     setDeck]     = useState(()=>shuffled(vocab));
  const card  = deck[index];
  const total = deck.length;
  const next  = () => { setFlipped(false); setTimeout(()=>setIndex(i=>Math.min(i+1,total-1)),150); };
  const restart = () => { setDeck(shuffled(vocab)); setIndex(0); setFlipped(false); setKnown(new Set()); setLearning(new Set()); };

  const finished = known.size+learning.size===total;
  if (finished) return (
    <div className="flex flex-col items-center gap-8 py-12 animate-in zoom-in">
      <Trophy size={64} className="text-[var(--c-main)]"/>
      <div className="text-center">
        <p className="text-5xl font-black text-[var(--text-primary)]">{Math.round((known.size/total)*100)}%</p>
        <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs mt-2">Known on first pass</p>
      </div>
      <div className="flex gap-6">
        <div className="text-center p-4 px-6 rounded-2xl badge-correct">
          <p className="text-2xl font-black">{known.size}</p><p className="text-[10px] font-black uppercase tracking-widest mt-1">Known ✓</p>
        </div>
        <div className="text-center p-4 px-6 rounded-2xl badge-revealed">
          <p className="text-2xl font-black">{learning.size}</p><p className="text-[10px] font-black uppercase tracking-widest mt-1">Studying</p>
        </div>
      </div>
      <button onClick={restart} className="btn-tool flex items-center gap-2"><RotateCcw size={16}/> Again</button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full" style={{background:'var(--surface-border)'}}>
          <div className="h-full rounded-full transition-all duration-500" style={{width:`${(known.size/total)*100}%`,background:'var(--ok-border)'}}/>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] shrink-0">{index+1}/{total}</span>
      </div>

      <div onClick={()=>{ setFlipped(f=>!f); if(!flipped)speak(card.word); }}
        className="w-full max-w-lg cursor-pointer select-none" style={{perspective:'1000px'}}>
        <div className="relative w-full transition-all duration-500"
          style={{transformStyle:'preserve-3d',transform:flipped?'rotateY(180deg)':'rotateY(0deg)',minHeight:'260px'}}>
          <div className="absolute inset-0 card-tool rounded-[2rem] flex flex-col items-center justify-center gap-4 p-8"
            style={{backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden'}}>
            <p className="text-5xl md:text-6xl font-black text-[var(--c-dark)] tracking-tight text-center">{card.word}</p>
            <div className="flex items-center gap-2 text-[var(--c-text)]">
              <Volume2 size={18}/>
              <span className="text-xs font-black uppercase tracking-widest opacity-70">Tap to flip</span>
            </div>
          </div>
          <div className="absolute inset-0 card-inner rounded-[2rem] flex flex-col items-center justify-center gap-4 p-8"
            style={{backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',transform:'rotateY(180deg)'}}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--c-text)] mb-2">Translation</p>
            <p className="text-5xl md:text-6xl font-black text-[var(--c-dark)] text-center">{card.span}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full max-w-lg">
        <button onClick={()=>{setFlipped(false);setTimeout(()=>setIndex(i=>Math.max(i-1,0)),150);}} disabled={index===0}
          className="btn-ghost p-3 disabled:opacity-20"><ArrowLeft size={20}/></button>
        <button onClick={()=>{setLearning(p=>new Set([...p,card.id]));next();}}
          className="flex-1 btn-ghost flex items-center justify-center gap-2 py-3 badge-revealed">
          <RotateCcw size={15}/> Still learning</button>
        <button onClick={()=>{speak(card.word);setKnown(p=>new Set([...p,card.id]));next();}}
          className="flex-1 btn-ghost flex items-center justify-center gap-2 py-3 badge-correct">
          <CheckCircle size={15}/> Got it!</button>
        <button onClick={()=>{setFlipped(false);setTimeout(()=>setIndex(i=>Math.min(i+1,total-1)),150);}} disabled={index===total-1}
          className="btn-ghost p-3 disabled:opacity-20"><ArrowRight size={20}/></button>
      </div>

      <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
        {deck.map((v,i)=>(
          <div key={v.id} className={`rounded-full transition-all ${known.has(v.id)?'w-2.5 h-2.5 dot-correct':learning.has(v.id)?'w-2.5 h-2.5 dot-wrong':i===index?'w-4 h-2.5':'w-2.5 h-2.5 dot-pending'}`}
            style={i===index&&!known.has(v.id)&&!learning.has(v.id)?{background:'var(--c-main)'}:{}}/>
        ))}
      </div>
    </div>
  );
};

/* ── Write ───────────────────────────────────────────────────────────── */
const WriteTest = ({vocab}) => {
  const [deck,      setDeck]     = useState(()=>shuffled(vocab));
  const [index,     setIndex]    = useState(0);
  const [input,     setInput]    = useState('');
  const [status,    setStatus]   = useState('idle');
  const [streak,    setStreak]   = useState(0);
  const [maxStreak, setMaxStreak]= useState(0);
  const [score,     setScore]    = useState(0);
  const [done,      setDone]     = useState(false);
  const inputRef = useRef(null);
  const card = deck[index];
  useEffect(()=>{ inputRef.current?.focus(); },[index]);

  const check = () => {
    if (!input.trim()) return;
    const ok = input.trim().toLowerCase()===card.word.toLowerCase();
    setStatus(ok?'correct':'wrong');
    if (ok) { speak(card.word); const ns=streak+1; setStreak(ns); setMaxStreak(m=>Math.max(m,ns)); setScore(s=>s+1); } else setStreak(0);
  };
  const next    = () => { setInput(''); setStatus('idle'); if(index+1>=deck.length)setDone(true); else setIndex(i=>i+1); };
  const restart = () => { setDeck(shuffled(vocab)); setIndex(0); setInput(''); setStatus('idle'); setStreak(0); setMaxStreak(0); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score/deck.length)*100);
    return (
      <div className="flex flex-col items-center gap-8 py-10 animate-in zoom-in">
        <Trophy size={56} className="text-[var(--c-main)]"/>
        <div className="text-center">
          <p className="text-6xl font-black text-[var(--text-primary)]">{pct}<span className="text-2xl text-[var(--text-muted)]">%</span></p>
          <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs mt-2">{score}/{deck.length} correct</p>
        </div>
        <div className="p-4 px-6 rounded-2xl text-center badge-revealed">
          <p className="text-2xl font-black">{maxStreak}🔥</p>
          <p className="text-[10px] font-black uppercase tracking-widest mt-1">Best streak</p>
        </div>
        <button onClick={restart} className="btn-tool flex items-center gap-2"><RotateCcw size={16}/> Try Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {streak>=2&&<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-revealed animate-in zoom-in"><Flame size={14}/><span className="font-black text-xs">{streak}🔥</span></div>}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{background:'var(--surface)',border:'2px solid var(--surface-border)'}}>
            <CheckCircle size={14} className="text-[var(--ok-border)]"/>
            <span className="font-black text-xs text-[var(--text-primary)]">{score}/{deck.length}</span>
          </div>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{index+1}/{deck.length}</span>
      </div>
      <div className="w-full h-2 rounded-full" style={{background:'var(--surface-border)'}}>
        <div className="h-full rounded-full transition-all duration-500" style={{width:`${(index/deck.length)*100}%`,background:'var(--c-main)'}}/>
      </div>
      <div className="w-full card-tool p-10 flex flex-col items-center gap-6 border-2 transition-all duration-300"
        style={status!=='idle'?{borderColor:status==='correct'?'var(--ok-border)':'var(--fail-border)'}:{}}>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--c-text)]">Translate to English</p>
        <p className="text-5xl font-black text-[var(--c-dark)] text-center">"{card.span}"</p>
        {status==='idle'?(
          <div className="w-full relative">
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&check()}
              placeholder="Type in English…" autoComplete="off"
              className="input-base text-center text-2xl font-black uppercase"/>
            <button onClick={check} className="btn-tool absolute right-3 top-1/2 -translate-y-1/2 p-2.5"><ArrowRight size={20}/></button>
          </div>
        ):(
          <div className="w-full flex flex-col items-center gap-3 animate-in zoom-in">
            {status==='correct'
              ?<div className="flex items-center gap-3 badge-correct p-4 rounded-2xl"><CheckCircle size={32}/><p className="text-3xl font-black uppercase">{card.word}</p></div>
              :<div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 badge-wrong p-3 rounded-2xl"><XCircle size={24}/><p className="font-bold text-lg line-through opacity-60">{input}</p></div>
                <p className="text-2xl font-black text-[var(--text-primary)]">{card.word}</p>
              </div>}
            <button onClick={next} className={`mt-2 btn-ghost flex items-center gap-2 ${status==='correct'?'badge-correct':''}`}>Next <ArrowRight size={16}/></button>
          </div>
        )}
      </div>
      <button onClick={()=>speak(card.word)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--c-main)] transition-colors">
        <Volume2 size={14}/> Hear the word
      </button>
    </div>
  );
};

/* ── Match ───────────────────────────────────────────────────────────── */
const MatchGame = ({vocab}) => {
  const buildPairs = () => {
    const pool  = shuffled(vocab).slice(0,Math.min(5,vocab.length));
    return { pool, left:shuffled(pool.map(v=>({id:v.id,text:v.word}))), right:shuffled(pool.map(v=>({id:v.id,text:v.span}))) };
  };
  const [pairs,    setPairs]    = useState(buildPairs);
  const [selected, setSelected] = useState(null);
  const [matched,  setMatched]  = useState(new Set());
  const [wrong,    setWrong]    = useState(null);
  const allDone = matched.size===pairs.pool.length;

  const handleSelect = (id,side) => {
    if (matched.has(id)) return;
    if (!selected) { setSelected({id,side}); return; }
    if (selected.id===id && selected.side!==side) {
      speak(pairs.pool.find(v=>v.id===id)?.word||'');
      setMatched(p=>new Set([...p,id])); setSelected(null);
    } else if (selected.id===id && selected.side===side) { setSelected(null); }
    else { setWrong(id); setTimeout(()=>setWrong(null),600); setSelected({id,side}); }
  };
  const restart = () => { setPairs(buildPairs()); setSelected(null); setMatched(new Set()); setWrong(null); };

  const btnStyle = (id,side) => {
    const isMatched=matched.has(id), isSel=selected?.id===id, isWrong=wrong===id;
    if (isMatched) return { className:'badge-correct opacity-60 cursor-default', style:{} };
    if (isWrong)   return { className:'badge-wrong scale-95', style:{} };
    if (isSel)     return { className:'', style:{background:'var(--c-medium)',border:'2px solid var(--c-main)',color:'var(--c-dark)',boxShadow:'0 0 0 3px var(--c-glow)',transform:'scale(1.02)'} };
    return { className:'item-surface hover:scale-[1.01]', style:{cursor:'pointer'} };
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Match the pairs — {matched.size}/{pairs.pool.length}</p>
        <button onClick={restart} className="btn-ghost flex items-center gap-1.5 text-xs"><Shuffle size={13}/> Shuffle</button>
      </div>
      {allDone?(
        <div className="text-center py-10 space-y-4 animate-in zoom-in">
          <Trophy size={48} className="text-[var(--c-main)] mx-auto"/>
          <p className="text-3xl font-black text-[var(--text-primary)]">All matched! 🎉</p>
          <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto"><RotateCcw size={16}/> Play Again</button>
        </div>
      ):(
        <div className="grid grid-cols-2 gap-3">
          {['left','right'].map(side=>(
            <div key={side} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-center text-[var(--text-muted)] mb-2">{side==='left'?'English':'Español'}</p>
              {pairs[side].map(item=>{
                const {className,style}=btnStyle(item.id,side.charAt(0).toUpperCase());
                return (
                  <button key={item.id+side} onClick={()=>handleSelect(item.id,side.charAt(0).toUpperCase())}
                    disabled={matched.has(item.id)}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${className}`} style={style}>
                    {matched.has(item.id)&&<CheckCircle size={14} className="inline mr-2"/>}{item.text}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────────────── */
const MODES = [
  {id:'gallery',label:'Study',      icon:<Eye size={15}/>},
  {id:'flash',  label:'Flashcards', icon:<Layers size={15}/>},
  {id:'write',  label:'Write',      icon:<Keyboard size={15}/>},
  {id:'match',  label:'Match',      icon:<Zap size={15}/>},
];

const VocabLab = ({data}) => {
  const [mode, setMode] = useState('gallery');
  useEffect(()=>setMode('gallery'),[data.id]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-center">
        <div className="p-2 rounded-2xl flex gap-1.5 flex-wrap justify-center" style={{background:'var(--surface)',border:'2px solid var(--surface-border)'}}>
          {MODES.map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all border-2 ${mode===m.id?'btn-tool':'btn-ghost'}`}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>
      <div key={mode} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {mode==='gallery' && <Gallery    vocab={data.vocabulary}/>}
        {mode==='flash'   && <Flashcards vocab={data.vocabulary}/>}
        {mode==='write'   && <WriteTest  vocab={data.vocabulary}/>}
        {mode==='match'   && <MatchGame  vocab={data.vocabulary}/>}
      </div>
    </div>
  );
};
export default VocabLab;