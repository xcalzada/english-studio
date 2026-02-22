import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PenTool, Save, Trash2, BookOpen, Lightbulb, ChevronDown, ChevronUp, X, CheckCircle, AlertCircle, Clock, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useTimer }   from '../hooks/useTimer';
import { useStorageJSON, useStorage } from '../hooks/useStorage';

const PROMPTS      = [
  "Describe your morning routine using at least 5 frequency adverbs.",
  "Write about what a typical day looks like for your best friend.",
  "Describe the habits of a fictional character you admire.",
  "Write 5 sentences about your family's daily routines.",
  "What does your ideal Saturday look like? Use present simple.",
];
const TARGET       = 80;
const countWords   = t => t.trim() ? t.trim().split(/\s+/).length : 0;
const formatTime   = d => d?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatTimer  = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const SaveStatus = ({ isSaving, saveStatus, savedAt }) => {
  if (isSaving)               return <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}><Clock size={13} className="inline mr-1 animate-spin" />Saving…</span>;
  if (saveStatus === 'error') return <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--fail-text)' }}><AlertCircle size={13} className="inline mr-1" />Save failed</span>;
  if (savedAt)                return <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--ok-text)' }}><CheckCircle size={13} className="inline mr-1" />Saved {formatTime(savedAt)}</span>;
  return <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}><Clock size={13} className="inline mr-1" />Not saved</span>;
};

const WritingDraft = ({ data }) => {
  const [text,        setText]        = useState('');
  const [activePrompt,setActivePrompt]= useState(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [clearConfirm,setClearConfirm]= useState(false);
  const [focusMode,   setFocusMode]   = useState(false);
  const { value: history, save: saveHistory } = useStorageJSON('writingdraft:history', []);
  const { value: savedText, save: saveDraft, remove: removeDraft, status: saveStatus } = useStorage('writingdraft:savedText');
  const [savedAt,  setSavedAt]  = useState(null);
  const [isSaving,  setIsSaving]  = useState(false);
  const clearingRef = useRef(false);
  const timer        = useTimer(300);
  const textareaRef  = useRef(null);
  const autoSaveRef  = useRef(null);
  const mounted      = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(autoSaveRef.current); };
  }, []);

  // Sync initial draft from storage hook (fires once when hook resolves)
  const savedTextRef = useRef(false);
  useEffect(() => {
    if (savedText && !savedTextRef.current) {
      savedTextRef.current = true;
      setText(savedText);
    }
  }, [savedText]);

  // Auto-save
  useEffect(() => {
    if (!text) return;
    clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(async () => {
      if (!mounted.current) return;
      await saveDraft(text);
      if (mounted.current) setSavedAt(new Date());
    }, 2000);
    return () => clearTimeout(autoSaveRef.current);
  }, [text, saveDraft]);

  // Escape focus mode
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') setFocusMode(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const words    = countWords(text);
  const progress = Math.min((words / TARGET) * 100, 100);
  const isGoal   = words >= TARGET;

  const handleClear = useCallback(async () => {
    if (clearingRef.current) return;
    clearingRef.current = true;
    if (words >= 5) {
      const entry = { id: Date.now(), text, words, date: new Date().toLocaleDateString() };
      await saveHistory([entry, ...(history || []).slice(0, 4)]);
    }
    setText(''); setActivePrompt(null); setClearConfirm(false); timer.reset();
    await removeDraft();
    clearingRef.current = false;
  }, [text, words, history, saveHistory, removeDraft, timer]);



  if (focusMode) return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 md:p-16 animate-in fade-in" style={{ background: '#060a18' }}>
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        {activePrompt !== null && <p className="text-slate-500 italic text-sm max-w-md truncate">{PROMPTS[activePrompt]}</p>}
        <div className="ml-auto flex items-center gap-4">
          <span className={`text-xs font-black uppercase tracking-widest ${isGoal ? 'text-emerald-400' : 'text-slate-600'}`}>{words}/{TARGET} words</span>
          <button onClick={() => setFocusMode(false)} className="text-slate-600 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <Minimize2 size={16} /> Exit <span className="opacity-50">(Esc)</span>
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl h-0.5 bg-slate-900 rounded-full mb-8 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: isGoal ? '#34d399' : 'var(--c0)' }} />
      </div>
      <textarea autoFocus value={text} onChange={e => setText(e.target.value)}
        className="w-full max-w-3xl flex-1 bg-transparent text-xl md:text-2xl font-medium text-slate-200 outline-none resize-none leading-loose placeholder:text-slate-800"
        placeholder="Write freely…" style={{ minHeight: '60vh', caretColor: 'var(--c0)' }} />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 max-w-3xl mx-auto">
      <div className="card-tool p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl btn-tool" style={{ padding: '.75rem' }}><PenTool size={24} /></div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter display-font text-white">Writing Studio</h2>
            <p className="text-[10px] font-black uppercase tracking-[.25em] mt-0.5" style={{ color: 'var(--c0)' }}>{data.title}</p>
          </div>
        </div>
        <SaveStatus isSaving={isSaving} saveStatus={saveStatus} savedAt={savedAt} />
      </div>

      {/* Prompt selector */}
      <div className="card-inner overflow-hidden">
        <button onClick={() => setShowPrompts(p => !p)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/10 transition-colors text-left">
          <div className="flex items-center gap-3">
            <Lightbulb size={18} style={{ color: 'var(--c0)' }} />
            <span className="font-black uppercase text-xs tracking-widest text-white">Writing Prompt</span>
            {activePrompt !== null && <span className="badge-correct text-[9px]" style={{ padding: '2px 8px', borderRadius: '999px' }}>Active</span>}
          </div>
          {showPrompts ? <ChevronUp size={16} style={{ color: 'var(--c0)' }} /> : <ChevronDown size={16} style={{ color: 'var(--c0)' }} />}
        </button>
        {showPrompts && (
          <div className="px-4 pb-4 space-y-2" style={{ borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '.75rem' }}>
            {PROMPTS.map((p, i) => (
              <button key={i} onClick={() => { setActivePrompt(i); setShowPrompts(false); textareaRef.current?.focus(); }}
                className="w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm leading-snug font-semibold"
                style={activePrompt === i
                  ? { borderColor: 'var(--c0)', background: 'rgba(255,255,255,0.15)', color: '#fff' }
                  : { borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'var(--text-3)' }}>
                <span className="font-black mr-2 text-xs" style={{ color: 'var(--c0)' }}>#{i + 1}</span>{p}
              </button>
            ))}
          </div>
        )}
      </div>

      {activePrompt !== null && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl animate-in fade-in" style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
          <Lightbulb size={16} style={{ color: 'var(--c0)', flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm font-semibold flex-1 leading-relaxed text-white">{PROMPTS[activePrompt]}</p>
          <button onClick={() => setActivePrompt(null)}><X size={14} style={{ color: 'var(--text-3)' }} /></button>
        </div>
      )}

      {/* Timer */}
      <div className="card-inner px-5 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className={`font-black text-xl tabular-nums tracking-tight ${timer.active ? 'text-white' : 'opacity-40 text-white'}`}>{formatTimer(timer.remaining)}</span>
          <div className="flex items-center gap-2">
            {[5, 10, 15].map(min => (
              <button key={min} onClick={() => timer.setLimit(min * 60)}
                className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border-2 transition-all"
                style={timer.limit === min * 60 ? { borderColor: 'var(--c0)', background: 'var(--c2)', color: 'var(--c0)' } : { borderColor: 'var(--c3)', background: 'transparent', color: 'var(--text-2)' }}>
                {min}m
              </button>
            ))}
            <button onClick={() => timer.active ? timer.pause() : timer.start()}
              className="px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border-2 transition-all"
              style={timer.active ? { background: 'var(--fail-bg)', borderColor: 'var(--fail-border)', color: 'var(--fail-text)' } : { background: 'var(--c2)', borderColor: 'var(--c0)', color: 'var(--c0)' }}>
              {timer.active ? 'Pause' : 'Start'}
            </button>
            <button onClick={timer.reset} style={{ color: 'var(--text-3)' }}><RotateCcw size={14} /></button>
          </div>
        </div>
        {timer.done && <div className="mt-3 badge-correct text-xs font-black uppercase tracking-widest animate-in fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><CheckCircle size={13} /> Time's up! Great session.</div>}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea ref={textareaRef} value={text} onChange={e => setText(e.target.value)}
          className="w-full h-80 rounded-[1.75rem] border-2 text-lg font-medium outline-none resize-none leading-[1.85] text-white"
          style={{ padding: '1.75rem 1.75rem 3.5rem', background: 'rgba(255,255,255,0.09)', borderColor: text.length ? 'var(--c0)' : 'var(--c3)', boxShadow: text.length ? '0 0 0 3px var(--cg)' : 'none', transition: 'border-color .2s, box-shadow .2s', caretColor: 'var(--c0)' }}
          placeholder="Start writing here… auto-saved as you type." />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-3 flex items-center justify-between pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 60%, transparent)', borderRadius: '0 0 1.75rem 1.75rem' }}>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
            <span style={{ color: isGoal ? 'var(--ok-text)' : 'var(--text-3)' }}>{words}/{TARGET} words</span>
            <span style={{ color: 'var(--text-3)' }}>{text.length} chars</span>
          </div>
          <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: isGoal ? '#059669' : 'var(--c0)' }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => { setFocusMode(true); setTimeout(() => textareaRef.current?.focus(), 100); }} className="btn-ghost flex items-center gap-2"><Maximize2 size={16} /> Focus Mode</button>
        <button
          disabled={!text || isSaving}
          onClick={async () => {
            if (isSaving) return;
            setIsSaving(true);
            await saveDraft(text);
            setSavedAt(new Date());
            setIsSaving(false);
          }}
          className="btn-tool flex items-center gap-2 disabled:opacity-40">
          <Save size={16} /> {isSaving ? 'Saving…' : 'Save'}
        </button>
        <div className="ml-auto">
          {!clearConfirm
            ? <button onClick={() => setClearConfirm(true)} disabled={!text} className="btn-ghost flex items-center gap-2" style={{ color: 'var(--fail-text)', borderColor: 'var(--fail-border)' }}><Trash2 size={16} /> Clear</button>
            : <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl badge-wrong">
                <span className="font-bold text-[11px] uppercase tracking-widest">Sure?</span>
                <button onClick={handleClear} className="px-3 py-1 rounded-lg text-[11px] font-black uppercase" style={{ background: 'var(--fail-border)', color: '#fff' }}>Yes</button>
                <button onClick={() => setClearConfirm(false)} className="text-[11px] font-black uppercase px-2" style={{ color: 'var(--text-2)' }}>No</button>
              </div>}
        </div>
      </div>

      {history?.length > 0 && (
        <div className="card-inner overflow-hidden">
          <button onClick={() => setShowHistory(p => !p)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <BookOpen size={16} style={{ color: 'var(--c0)' }} />
              <span className="font-black uppercase text-xs tracking-widest text-white">Previous Drafts <span style={{ opacity: .5 }}>({history.length})</span></span>
            </div>
            {showHistory ? <ChevronUp size={16} style={{ color: 'var(--c0)' }} /> : <ChevronDown size={16} style={{ color: 'var(--c0)' }} />}
          </button>
          {showHistory && (
            <div className="px-4 pb-4 space-y-2" style={{ borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '.75rem' }}>
              {history.map(e => (
                <div key={e.id} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{e.date} · {e.words} words</span>
                    <button onClick={() => setText(e.text)} className="text-[10px] font-black uppercase" style={{ color: 'var(--c0)' }}>Restore</button>
                  </div>
                  <p className="text-sm truncate" style={{ color: 'var(--text-2)' }}>{e.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WritingDraft;
