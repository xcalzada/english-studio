import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  PenTool, Save, Trash2, BookOpen, Lightbulb,
  ChevronDown, ChevronUp, X, Clock, CheckCircle,
  AlertCircle, Maximize2, Minimize2, Timer, RotateCcw
} from 'lucide-react';

const WRITING_PROMPTS = [
  "Describe your morning routine using at least 5 frequency adverbs.",
  "Write about what a typical day looks like for your best friend.",
  "Describe the habits of a fictional character you admire.",
  "Write 5 sentences about your family's daily routines.",
  "What does your ideal Saturday look like? Use present simple.",
];

const STORAGE_KEY  = 'writingdraft:savedText';
const HISTORY_KEY  = 'writingdraft:history';
const TARGET_WORDS = 80;

const countWords     = t => (t.trim() === '' ? 0 : t.trim().split(/\s+/).length);
const countSentences = t => t.split(/[.!?]+/).filter(s => s.trim().length > 2).length;
const formatTime     = d => d?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatTimer    = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

const WritingDraft = ({ data }) => {
  const [text,             setText]             = useState('');
  const [savedAt,          setSavedAt]          = useState(null);
  const [isSaving,         setIsSaving]         = useState(false);
  const [saveError,        setSaveError]        = useState(false);
  const [activePrompt,     setActivePrompt]     = useState(null);
  const [showPrompts,      setShowPrompts]      = useState(false);
  const [showHistory,      setShowHistory]      = useState(false);
  const [history,          setHistory]          = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [focusMode,        setFocusMode]        = useState(false);
  const [timerActive,      setTimerActive]      = useState(false);
  const [timerSeconds,     setTimerSeconds]     = useState(0);
  const [timerLimit,       setTimerLimit]       = useState(5 * 60);

  const textareaRef    = useRef(null);
  const autoSaveTimer  = useRef(null);
  const timerRef       = useRef(null);
  /* CORRECCIÓN: guardamos si el componente está montado para evitar
     llamar a setState después del desmonte (memory leak). */
  const mountedRef     = useRef(true);

  const words     = countWords(text);
  const sentences = countSentences(text);
  const progress  = Math.min((words / TARGET_WORDS) * 100, 100);
  const isGoalMet = words >= TARGET_WORDS;

  /* ── Marcar como montado/desmontado ── */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(autoSaveTimer.current);
      clearInterval(timerRef.current);
    };
  }, []);

  /* ── Cargar desde storage ── */
  useEffect(() => {
    (async () => {
      try { const s = await window.storage.get(STORAGE_KEY); if (s && mountedRef.current) setText(s.value); } catch (_) {}
      try { const h = await window.storage.get(HISTORY_KEY); if (h && mountedRef.current) setHistory(JSON.parse(h.value)); } catch (_) {}
    })();
  }, []);

  /* ── Auto-save ────────────────────────────────────────────────────────
     CORRECCIÓN: la versión anterior perdía el timeout al re-renderizar.
     Ahora limpiamos correctamente y no llamamos setState si desmontado.
  ────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (text === '') return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      if (!mountedRef.current) return;
      try {
        await window.storage.set(STORAGE_KEY, text);
        if (mountedRef.current) { setSavedAt(new Date()); setSaveError(false); }
      } catch (_) {
        /* CORRECCIÓN: antes el auto-save fallaba silenciosamente.
           Ahora mostramos el error también en auto-save. */
        if (mountedRef.current) setSaveError(true);
      }
    }, 2000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [text]);

  /* ── Timer de escritura ── */
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        if (!mountedRef.current) return;
        setTimerSeconds(s => {
          if (s + 1 >= timerLimit) {
            setTimerActive(false);
            clearInterval(timerRef.current);
            return timerLimit;
          }
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, timerLimit]);

  /* ── Escape sale de focus mode ── */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setFocusMode(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Acciones ── */
  const handleSave = useCallback(async (isAuto = false) => {
    if (!isAuto) setIsSaving(true);
    try {
      await window.storage.set(STORAGE_KEY, text);
      if (mountedRef.current) { setSavedAt(new Date()); setSaveError(false); }
    } catch (_) {
      if (mountedRef.current) setSaveError(true);
    } finally {
      if (!isAuto && mountedRef.current) setIsSaving(false);
    }
  }, [text]);

  const saveToHistory = async () => {
    if (words < 5) return;
    const entry = { id: Date.now(), text, words, date: new Date().toLocaleDateString(), prompt: activePrompt };
    const next  = [entry, ...history.slice(0, 4)];
    if (mountedRef.current) setHistory(next);
    try { await window.storage.set(HISTORY_KEY, JSON.stringify(next)); } catch (_) {}
  };

  const handleClear = async () => {
    await saveToHistory();
    if (!mountedRef.current) return;
    setText(''); setActivePrompt(null); setShowClearConfirm(false);
    setTimerActive(false); setTimerSeconds(0);
    try { await window.storage.delete(STORAGE_KEY); } catch (_) {}
  };

  const resetTimer = () => { setTimerActive(false); setTimerSeconds(0); };
  const timerLeft  = timerLimit - timerSeconds;
  const timerPct   = (timerSeconds / timerLimit) * 100;

  /* ── FOCUS MODE ── */
  if (focusMode) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 md:p-16 animate-in fade-in duration-300"
        style={{ background: '#060a18' }}>
        <div className="w-full max-w-3xl flex items-center justify-between mb-6">
          {activePrompt !== null && (
            <p className="text-slate-500 italic text-sm max-w-md truncate">
              {WRITING_PROMPTS[activePrompt]}
            </p>
          )}
          <div className="ml-auto flex items-center gap-4">
            <span className={`text-xs font-black uppercase tracking-widest ${isGoalMet ? 'text-emerald-400' : 'text-slate-600'}`}>
              {words} / {TARGET_WORDS} words
            </span>
            <button onClick={() => setFocusMode(false)}
              className="text-slate-600 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Minimize2 size={16}/> Exit <span className="opacity-50">(Esc)</span>
            </button>
          </div>
        </div>
        <div className="w-full max-w-3xl h-0.5 bg-slate-900 rounded-full mb-8 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: isGoalMet ? '#34d399' : 'var(--c-main)' }}/>
        </div>
        <textarea
          autoFocus value={text} onChange={e => setText(e.target.value)}
          className="w-full max-w-3xl flex-1 bg-transparent text-xl md:text-2xl font-medium text-slate-200 outline-none resize-none leading-loose placeholder:text-slate-800"
          style={{ minHeight: '60vh', caretColor: 'var(--c-main)' }}
          placeholder="Write freely…"
        />
      </div>
    );
  }

  /* ── VISTA NORMAL ── */
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 max-w-3xl mx-auto">

      {/* Header */}
      <div className="card-tool p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl" style={{ background: 'var(--c-soft)', border: '2px solid var(--c-main)' }}>
            <PenTool size={26} style={{ color: 'var(--c-main)' }}/>
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter display-font"
              style={{ color: 'var(--c-dark)' }}>Writing Studio</h2>
            <p className="text-[10px] font-black uppercase tracking-[.25em] mt-0.5"
              style={{ color: 'var(--c-main)' }}>{data.title}</p>
          </div>
        </div>
        {/* Save status */}
        <div className="text-[11px] font-black uppercase tracking-widest">
          {saveError
            ? <span className="flex items-center gap-1.5" style={{ color: 'var(--err-tx)' }}>
                <AlertCircle size={13}/> Save failed — check storage
              </span>
            : savedAt
            ? <span className="flex items-center gap-1.5" style={{ color: 'var(--ok-tx)' }}>
                <CheckCircle size={13}/> Saved {formatTime(savedAt)}
              </span>
            : <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Clock size={13}/> Not saved yet
              </span>}
        </div>
      </div>

      {/* Prompt selector */}
      <div className="card-inner overflow-hidden">
        <button onClick={() => setShowPrompts(!showPrompts)}
          className="w-full flex items-center justify-between px-5 py-4 transition-colors text-left hover:opacity-80">
          <div className="flex items-center gap-3">
            <Lightbulb size={18} style={{ color: 'var(--c-main)' }}/>
            <span className="font-black uppercase text-xs tracking-widest" style={{ color: 'var(--c-dark)' }}>
              Writing Prompt
            </span>
            {activePrompt !== null && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider"
                style={{ background: 'var(--c-main)', color: '#fff' }}>
                Active
              </span>
            )}
          </div>
          {showPrompts
            ? <ChevronUp   size={16} style={{ color: 'var(--text-muted)' }}/>
            : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }}/>}
        </button>

        {showPrompts && (
          <div className="px-4 pb-4 space-y-2 pt-3" style={{ borderTop: '2px solid var(--c-border)' }}>
            {WRITING_PROMPTS.map((prompt, idx) => (
              <button key={idx}
                onClick={() => { setActivePrompt(idx); setShowPrompts(false); textareaRef.current?.focus(); }}
                className="w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm leading-snug"
                style={{
                  borderColor: activePrompt === idx ? 'var(--c-main)' : 'var(--c-border)',
                  background:  activePrompt === idx ? 'var(--c-soft)' : 'var(--surface-raised)',
                  color:       activePrompt === idx ? 'var(--c-dark)' : 'var(--text-secondary)',
                  fontWeight:  activePrompt === idx ? 700 : 600,
                }}>
                <span className="font-black mr-2 text-xs" style={{ color: 'var(--c-main)' }}>#{idx + 1}</span>
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prompt activo */}
      {activePrompt !== null && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl animate-in fade-in"
          style={{ background: 'var(--c-soft)', border: '2px solid var(--c-border)' }}>
          <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--c-main)' }}/>
          <p className="text-sm flex-1 leading-relaxed" style={{ color: 'var(--c-dark)' }}>
            {WRITING_PROMPTS[activePrompt]}
          </p>
          <button onClick={() => setActivePrompt(null)} className="shrink-0 mt-0.5 hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}>
            <X size={14}/>
          </button>
        </div>
      )}

      {/* Timer */}
      <div className="card-inner px-5 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Timer size={16} style={{ color: timerActive ? 'var(--c-main)' : 'var(--text-muted)' }}/>
            <span className="font-black text-xl tabular-nums tracking-tight"
              style={{ color: timerActive ? 'var(--c-dark)' : 'var(--text-muted)' }}>
              {formatTimer(timerLeft)}
            </span>
            {timerActive && (
              <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-border)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${timerPct}%`, background: 'var(--c-main)' }}/>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {[5, 10, 15].map(min => (
              <button key={min}
                onClick={() => { setTimerLimit(min * 60); resetTimer(); }}
                className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border-2 transition-all"
                style={{
                  borderColor: timerLimit === min * 60 ? 'var(--c-main)' : 'var(--c-border)',
                  background:  timerLimit === min * 60 ? 'var(--c-soft)' : 'var(--surface)',
                  color:       timerLimit === min * 60 ? 'var(--c-main)' : 'var(--text-muted)',
                }}>
                {min}m
              </button>
            ))}
            <button onClick={() => setTimerActive(t => !t)} className="btn-ghost px-4 py-1.5 text-xs"
              style={timerActive ? { background: 'var(--err-bg)', borderColor: 'var(--err-bd)', color: 'var(--err-tx)' } : {}}>
              {timerActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer} className="p-1 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-muted)' }}>
              <RotateCcw size={14}/>
            </button>
          </div>
        </div>
        {timerSeconds >= timerLimit && timerLimit > 0 && (
          <div className="mt-3 text-xs font-black uppercase tracking-widest flex items-center gap-2 animate-in fade-in"
            style={{ color: 'var(--ok-tx)' }}>
            <CheckCircle size={13}/> Time's up! Great session.
          </div>
        )}
      </div>

      {/* Textarea principal */}
      <div className="relative">
        <textarea
          ref={textareaRef} value={text} onChange={e => setText(e.target.value)}
          className="w-full h-80 p-7 pb-14 border-2 text-lg font-medium outline-none resize-none shadow-inner leading-[1.85] transition-all duration-300"
          style={{
            borderRadius:    '1.75rem',
            borderColor:     'var(--c-border)',
            background:      'var(--c-soft)',
            color:           'var(--text-primary)',
            caretColor:      'var(--c-main)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--c-main)'; e.target.style.boxShadow = '0 0 0 3px var(--c-glow)'; }}
          onBlur={e =>  { e.target.style.borderColor = 'var(--c-border)'; e.target.style.boxShadow = 'none'; }}
          placeholder="Start writing here… auto-saved as you type."
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-3 flex items-center justify-between pointer-events-none"
          style={{
            background:    'linear-gradient(to top, rgba(255,255,255,.7) 0%, transparent 100%)',
            borderRadius:  '0 0 1.75rem 1.75rem',
          }}>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
            <span style={{ color: isGoalMet ? 'var(--ok-tx)' : 'var(--text-muted)' }}>
              {words}<span style={{ color: 'var(--text-muted)' }}> / {TARGET_WORDS} words</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{sentences} sent.</span>
            <span style={{ color: 'var(--text-muted)' }}>{text.length} chars</span>
          </div>
          <div className="flex items-center gap-2">
            {isGoalMet && <span className="text-[9px] font-black uppercase tracking-widest animate-in fade-in"
              style={{ color: 'var(--ok-tx)' }}>Goal!</span>}
            <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-border)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width:      `${progress}%`,
                  background:  isGoalMet ? 'var(--ok-bd)' : 'var(--c-main)',
                  boxShadow:   `0 0 6px ${isGoalMet ? 'var(--ok-bd)' : 'var(--c-glow)'}`,
                }}/>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setFocusMode(true)} className="btn-ghost flex items-center gap-2">
          <Maximize2 size={16}/> Focus Mode
        </button>
        <button onClick={() => handleSave(false)} disabled={isSaving || text === ''} className="btn-tool flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed">
          <Save size={16}/> {isSaving ? 'Saving…' : 'Save'}
        </button>
        <div className="ml-auto">
          {!showClearConfirm ? (
            <button onClick={() => setShowClearConfirm(true)} disabled={text === ''}
              className="btn-ghost flex items-center gap-2 disabled:opacity-20"
              style={{ color: 'var(--err-tx)', borderColor: 'var(--err-bd)' }}>
              <Trash2 size={16}/> Clear
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ background: 'var(--err-bg)', border: '2px solid var(--err-bd)' }}>
              <span className="font-bold text-[11px] uppercase tracking-widest" style={{ color: 'var(--err-tx)' }}>
                Sure?
              </span>
              <button onClick={handleClear} className="px-3 py-1 rounded-lg text-[11px] font-black uppercase text-white"
                style={{ background: 'var(--err-bd)' }}>Yes</button>
              <button onClick={() => setShowClearConfirm(false)} className="px-2 py-1 text-[11px] font-black uppercase hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}>No</button>
            </div>
          )}
        </div>
      </div>

      {/* Historial */}
      {history.length > 0 && (
        <div className="card-inner overflow-hidden">
          <button onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between px-5 py-4 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3">
              <BookOpen size={16} style={{ color: 'var(--text-muted)' }}/>
              <span className="font-black uppercase text-xs tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                Previous Drafts <span style={{ color: 'var(--text-muted)' }}>({history.length})</span>
              </span>
            </div>
            {showHistory
              ? <ChevronUp   size={16} style={{ color: 'var(--text-muted)' }}/>
              : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }}/>}
          </button>
          {showHistory && (
            <div className="px-4 pb-4 space-y-2 pt-3" style={{ borderTop: '2px solid var(--c-border)' }}>
              {history.map(entry => (
                <div key={entry.id} className="rounded-xl p-4 group"
                  style={{ background: 'var(--surface-raised)', border: '1.5px solid var(--surface-border)' }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {entry.date} · {entry.words} words
                    </span>
                    <button onClick={() => setText(entry.text)}
                      className="text-[10px] font-black uppercase hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--c-main)' }}>
                      Restore
                    </button>
                  </div>
                  <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                    {entry.text}
                  </p>
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