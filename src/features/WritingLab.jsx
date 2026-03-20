import React, { useState, useCallback, useMemo } from 'react';
import { PenTool, CheckCircle, XCircle, Eye, RotateCcw } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { normalize }   from '../utils/normalize';

// ── Corrección automática por frases clave ────────────────────────
const checkKeyPhrases = (text, keyPhrases) => {
  const normText = normalize(text);
  return keyPhrases.map(phrase => ({
    phrase,
    found: normalize(phrase).split('|').some(p => normText.includes(p)),
  }));
};

// ── WritingPrompt ─────────────────────────────────────────────────
const WritingPrompt = ({ prompt, onComplete }) => {
  const [text,        setText]        = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [showExample, setShowExample] = useState(false);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minWords  = prompt.minWords ?? 30;

  const results = useMemo(() =>
    submitted ? checkKeyPhrases(text, prompt.keyPhrases ?? []) : [],
  [text, submitted, prompt.keyPhrases]);

  const score = results.filter(r => r.found).length;
  const total = results.length;
  const pct   = total > 0 ? Math.round((score / total) * 100) : 100;

  const handleSubmit = () => { setSubmitted(true); onComplete(pct >= 60); };
  const restart      = () => { setText(''); setSubmitted(false); setShowExample(false); };

  return (
    <div className="space-y-4">

      {/* Task card */}
      <div className="card-tool p-6 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl shrink-0"
            style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}>
            <PenTool size={16} style={{ color: '#60a5fa' }} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
              Writing task
            </p>
            <p className="text-base font-black text-white leading-snug">{prompt.task}</p>
          </div>
        </div>

        {prompt.tips?.length > 0 && (
          <div className="px-4 py-3 rounded-xl space-y-1"
            style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#fbbf24' }}>
              💡 Usa estas estructuras
            </p>
            {prompt.tips.map((tip, i) => (
              <p key={i} className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>• {tip}</p>
            ))}
          </div>
        )}

        <p className="text-[10px] font-semibold" style={{ color: 'var(--text-3)' }}>
          Mínimo {minWords} palabras
        </p>
      </div>

      {/* Textarea */}
      <div className="card-tool p-6 space-y-4">
        <textarea
          value={text}
          onChange={e => !submitted && setText(e.target.value)}
          disabled={submitted}
          rows={8}
          placeholder="Escribe tu respuesta aquí..."
          className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white resize-none outline-none transition-all leading-relaxed"
          style={{
            background: submitted ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
            border: submitted
              ? pct >= 60 ? '2px solid rgba(74,222,128,0.3)' : '2px solid rgba(248,113,113,0.3)'
              : '2px solid rgba(255,255,255,0.15)',
          }}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs font-black tabular-nums"
            style={{ color: wordCount >= minWords ? '#4ade80' : 'var(--text-3)' }}>
            {wordCount} / {minWords} palabras
          </span>
          {!submitted ? (
            <button onClick={handleSubmit} disabled={wordCount < minWords}
              className="btn-tool disabled:opacity-40">
              Enviar
            </button>
          ) : (
            <button onClick={restart}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-3)' }}>
              <RotateCcw size={14} /> Reescribir
            </button>
          )}
        </div>
      </div>

      {/* Corrección */}
      {submitted && results.length > 0 && (
        <div className="card-tool p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              Corrección automática
            </p>
            <span className="text-sm font-black" style={{ color: pct >= 60 ? '#4ade80' : '#f87171' }}>
              {score}/{total} elementos ✓
            </span>
          </div>

          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  background: r.found ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                  border: `1px solid ${r.found ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                }}>
                {r.found
                  ? <CheckCircle size={14} className="shrink-0" style={{ color: '#4ade80' }} />
                  : <XCircle     size={14} className="shrink-0" style={{ color: '#f87171' }} />}
                <span className="text-xs font-semibold flex-1"
                  style={{ color: r.found ? '#4ade80' : '#f87171' }}>
                  {r.phrase.split('|')[0]}
                </span>
                {!r.found && (
                  <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>no encontrado</span>
                )}
              </div>
            ))}
          </div>

          <div className={`px-4 py-3 rounded-xl text-center font-black text-sm ${pct >= 60 ? 'badge-correct' : 'badge-wrong'}`}>
            {pct >= 60
              ? `¡Buen trabajo! ${pct}% de los elementos clave incluidos.`
              : `Faltan algunos elementos clave. ${pct}% incluido.`}
          </div>
        </div>
      )}

      {/* Ejemplo de respuesta */}
      {submitted && prompt.example && (
        <div className="card-tool p-6 space-y-3">
          <button onClick={() => setShowExample(s => !s)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest w-full"
            style={{ color: 'var(--text-3)' }}>
            <Eye size={14} /> {showExample ? 'Ocultar ejemplo' : 'Ver ejemplo de respuesta'}
          </button>
          {showExample && (
            <div className="px-4 py-4 rounded-xl text-sm leading-relaxed font-semibold"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-2)', borderLeft: '3px solid var(--c0)' }}>
              {prompt.example}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── WritingLab ────────────────────────────────────────────────────
const WritingLab = ({ data, token }) => {
  const writing = data?.writing ?? [];
  const unitId  = data?.id ?? '';
  const { record: saveProgress } = useProgress(unitId, 'writing', token);

  const [cursor,    setCursor]    = useState(0);
  const [completed, setCompleted] = useState({});

  const handleComplete = useCallback((idx, ok) => {
    setCompleted(p => ({ ...p, [idx]: ok }));
    saveProgress(`writing_${idx}`, ok, { phase: 'practice' });
  }, [saveProgress]);

  if (!writing.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">✏️</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">Sin tareas de escritura</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        Esta unidad no tiene ejercicios de escritura todavía.
      </p>
    </div>
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-20">
      <div>
        <h2 className="display-font text-3xl text-white leading-none">Writing Lab</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-3)' }}>
          Practica escribiendo en inglés
        </p>
      </div>

      {/* Tabs */}
      {writing.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {writing.map((_, i) => (
            <button key={i} onClick={() => setCursor(i)}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative"
              style={{
                background: cursor === i ? 'var(--c0)' : 'rgba(255,255,255,0.06)',
                color:      cursor === i ? '#000'      : 'var(--text-3)',
                border:     cursor === i ? 'none'      : '1px solid rgba(255,255,255,0.10)',
              }}>
              Tarea {i + 1}
              {completed[i] !== undefined && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-black"
                  style={{ background: completed[i] ? '#4ade80' : '#f87171', color: '#000' }}>
                  {completed[i] ? '✓' : '✗'}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <WritingPrompt
        key={cursor}
        prompt={writing[cursor]}
        onComplete={ok => handleComplete(cursor, ok)}
      />
    </div>
  );
};

export default WritingLab;