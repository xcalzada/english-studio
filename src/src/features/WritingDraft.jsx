import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PenTool, Save, Clock, RotateCcw, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';
import { useStorage, useStorageJSON } from '../hooks/useStorage';
import { useTimer } from '../hooks/useTimer';

const PROMPTS_DEFAULT = [
  'Write 3 sentences comparing two things using comparatives.',
  'Describe your best friend using at least 5 adjectives.',
  'Write about a place that is bigger, better, and more beautiful than your home.',
  'Compare summer and winter. Which is better for you and why?',
  'Describe your dream house. Is it bigger than your current home?',
];

const WordCounter = ({ text }) => {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  return (
    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
      <span>{words} words</span>
      <span>{chars} chars</span>
    </div>
  );
};

const TimerDisplay = ({ seconds, remaining, pct, done, active, start, pause }) => {
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none"
            stroke={done ? 'var(--ok-border)' : 'var(--c0)'} strokeWidth="3"
            strokeDasharray="100" strokeDashoffset={100 - pct} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white">
          {fmt(remaining)}
        </span>
      </div>
      <button onClick={active ? pause : start}
        className="btn-ghost text-xs flex items-center gap-1.5 px-3 py-1.5">
        {active ? <><Clock size={11} /> Pause</> : <><Clock size={11} /> {seconds > 0 ? 'Resume' : 'Start'}</>}
      </button>
    </div>
  );
};

const WritingDraft = ({ data }) => {
  const prompts = data?.writingPrompts || PROMPTS_DEFAULT;
  const [promptIdx, setPromptIdx] = useState(0);
  const { value: savedText, setValue: setLocalText, save, status } = useStorage(`writing:${data?.id || 'draft'}`, '');
  const { value: history,   save: saveHistory } = useStorageJSON(`writing:${data?.id || 'draft'}:history`, []);
  const timer  = useTimer(300); // 5 min default
  const textRef = useRef('');

  // Keep ref in sync for save on unmount
  useEffect(() => { textRef.current = savedText; }, [savedText]);

  const handleChange = useCallback((e) => {
    setLocalText(e.target.value);
    textRef.current = e.target.value;
    if (!timer.active && timer.seconds === 0) timer.start();
  }, [timer, setLocalText]);

  const handleSave = useCallback(async () => {
    const text = textRef.current;
    if (!text.trim()) return;
    await save(text);
    const entry = { text, date: new Date().toISOString(), prompt: prompts[promptIdx] };
    const newHistory = [entry, ...(history || [])].slice(0, 10);
    await saveHistory(newHistory);
  }, [save, history, saveHistory, prompts, promptIdx]);

  const handleClear = useCallback(() => {
    setLocalText(''); textRef.current = '';
    timer.reset();
  }, [setLocalText, timer]);

  const nextPrompt = useCallback(() => setPromptIdx(i => (i + 1) % prompts.length), [prompts.length]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="display-font text-3xl text-white leading-none">Writing Draft</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-3)' }}>
            Write freely, save your draft
          </p>
        </div>
        <TimerDisplay {...timer} />
      </div>

      {/* Writing prompt */}
      <div className="card-tool p-5 flex items-start gap-4">
        <div className="p-2.5 rounded-xl shrink-0"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <Lightbulb size={18} style={{ color: 'var(--c0)' }} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--c0)' }}>Writing Prompt</p>
          <p className="font-bold text-white text-base leading-snug">{prompts[promptIdx]}</p>
        </div>
        <button onClick={nextPrompt} title="Next prompt"
          className="btn-ghost shrink-0 text-xs px-3 py-2 flex items-center gap-1.5">
          <RotateCcw size={12} /> Next
        </button>
      </div>

      {/* Text area */}
      <div className="card-tool p-0 overflow-hidden">
        <textarea
          value={savedText}
          onChange={handleChange}
          placeholder="Start writing here…"
          aria-label="Writing area"
          className="w-full min-h-[280px] bg-transparent text-white font-medium text-base leading-[1.85] outline-none resize-none p-6"
          style={{ color: 'rgba(255,255,255,0.88)' }}
        />
        <div className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <WordCounter text={savedText} />
          <div className="flex items-center gap-2">
            {savedText.trim() && (
              <button onClick={handleClear} className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
                <RotateCcw size={11} /> Clear
              </button>
            )}
            <button onClick={handleSave} disabled={!savedText.trim()}
              className="btn-tool flex items-center gap-1.5 text-xs px-4 py-2 disabled:opacity-30">
              {status === 'saved' ? <><CheckCircle size={13} /> Saved!</> : <><Save size={13} /> Save</>}
            </button>
          </div>
        </div>
      </div>

      {/* Past drafts */}
      {history?.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={15} style={{ color: 'var(--c0)' }} />
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              Past drafts
            </p>
          </div>
          <div className="space-y-3">
            {history.slice(0, 5).map((entry, i) => (
              <button key={i} onClick={() => setLocalText(entry.text)}
                className="w-full text-left card-tool p-4 hover:border-[var(--c3)] transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
                  {new Date(entry.date).toLocaleDateString()} · {entry.text.trim().split(/\s+/).length} words
                </p>
                <p className="text-sm font-medium text-white leading-snug line-clamp-2 opacity-70">{entry.text}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingDraft;
