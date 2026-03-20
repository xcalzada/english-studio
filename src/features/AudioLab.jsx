import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

// ── Web Speech API hook ───────────────────────────────────────────────
function useSpeech(text, lang = 'en-GB') {
  const [speaking, setSpeaking]   = useState(false);
  const [supported, setSupported] = useState(true);
  const uttRef = useRef(null);

  useEffect(() => {
    if (!window.speechSynthesis) setSupported(false);
    return () => window.speechSynthesis?.cancel();
  }, []);

  const speak = useCallback((fragment) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(fragment ?? text);
    utt.lang  = lang;
    utt.rate  = 0.85;
    utt.pitch = 1;
    utt.onstart = () => setSpeaking(true);
    utt.onend   = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [text, lang]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking, supported };
}

// ── Botón reproducir reutilizable ────────────────────────────────────
const PlayButton = ({ onPlay, onStop, speaking, size = 'md', label = 'Escuchar' }) => {
  const s = size === 'sm' ? 14 : 18;
  return (
    <button
      onClick={speaking ? onStop : onPlay}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm transition-all"
      style={{
        background: speaking ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.08)',
        border:     speaking ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.15)',
        color:      speaking ? '#fbbf24' : 'var(--text-2)',
      }}>
      {speaking ? <Pause size={s} /> : <Volume2 size={s} />}
      {speaking ? 'Pausar' : label}
    </button>
  );
};

// ── MODO 1: Spot the Word ─────────────────────────────────────────────
const SpotTheWord = ({ listening, onComplete, token, unitId }) => {
  const { text, options = [], correctItems = [] } = listening;
  const { speak, stop, speaking } = useSpeech(text);
  const [selected,  setSelected]  = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [revealed,  setRevealed]  = useState(false);

  const toggle = (word) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      return next;
    });
  };

  const submit = () => {
    setSubmitted(true);
    const correct = correctItems.every(w => selected.has(w)) &&
      [...selected].every(w => correctItems.includes(w));
    onComplete('spot', correct);
  };

  const correctSet = new Set(correctItems);

  return (
    <div className="space-y-5">
      <div className="card-tool p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
              Spot the word
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>
              Escucha y marca las palabras que aparecen en el audio
            </p>
          </div>
          <PlayButton onPlay={() => speak()} onStop={stop} speaking={speaking} />
        </div>

        {/* Texto revelable */}
        <div className="relative">
          <div className={`px-4 py-4 rounded-xl text-sm leading-relaxed font-semibold transition-all duration-500 ${revealed ? '' : 'select-none'}`}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: revealed ? 'var(--text-2)' : 'transparent',
              textShadow: revealed ? 'none' : '0 0 12px rgba(255,255,255,0.5)',
              filter: revealed ? 'none' : 'blur(4px)',
            }}>
            {text}
          </div>
          {!revealed && (
            <button onClick={() => setRevealed(true)}
              className="absolute inset-0 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest"
              style={{ color: 'var(--text-3)' }}>
              <CheckCircle size={14} /> Mostrar texto
            </button>
          )}
        </div>
      </div>

      {/* Opciones */}
      <div className="card-tool p-6 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Marca las palabras que escuchas
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map(word => {
            const isSel   = selected.has(word);
            const isRight = submitted && correctSet.has(word);
            const isWrong = submitted && isSel && !correctSet.has(word);
            const isMiss  = submitted && !isSel && correctSet.has(word);
            return (
              <button key={word} onClick={() => toggle(word)}
                className="px-4 py-2 rounded-xl font-black text-sm transition-all"
                style={{
                  background: isRight ? 'rgba(74,222,128,0.15)' : isWrong ? 'rgba(248,113,113,0.15)' : isMiss ? 'rgba(251,191,36,0.15)' : isSel ? 'rgba(var(--c0-rgb,96,165,250),0.2)' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${isRight ? 'rgba(74,222,128,0.5)' : isWrong ? 'rgba(248,113,113,0.5)' : isMiss ? 'rgba(251,191,36,0.5)' : isSel ? 'var(--c0)' : 'rgba(255,255,255,0.10)'}`,
                  color: isRight ? '#4ade80' : isWrong ? '#f87171' : isMiss ? '#fbbf24' : isSel ? 'white' : 'var(--text-2)',
                }}>
                {word}
                {isRight && ' ✓'}{isWrong && ' ✗'}{isMiss && ' ←'}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="px-4 py-3 rounded-xl text-sm font-black"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-2)' }}>
            ✅ Correctas: {correctItems.join(', ')}
          </div>
        )}

        {!submitted && (
          <button onClick={submit} disabled={selected.size === 0}
            className="btn-tool w-full justify-center">
            Comprobar
          </button>
        )}
      </div>
    </div>
  );
};

// ── MODO 2: Dictado ───────────────────────────────────────────────────
const normalize = s => s.trim().toLowerCase()
  .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e')
  .replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u')
  .replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ');

const Dictation = ({ listening, onComplete }) => {
  const { text } = listening;

  // Partir el texto en frases (por punto o por longitud máxima)
  const sentences = useMemo(() => {
    const raw = text.match(/[^.!?]+[.!?]?/g) ?? [text];
    return raw.map(s => s.trim()).filter(Boolean);
  }, [text]);

  const [cursor,    setCursor]    = useState(0);
  const [input,     setInput]     = useState('');
  const [result,    setResult]    = useState(null);
  const [results,   setResults]   = useState([]);
  const [finished,  setFinished]  = useState(false);
  const [attempts,  setAttempts]  = useState(0);

  const current   = sentences[cursor];
  const { speak, stop, speaking } = useSpeech(current);

  useEffect(() => { speak(); }, [cursor]);

  const check = () => {
    const ok = normalize(input) === normalize(current);
    setResult(ok);
    setAttempts(a => a + 1);
    if (ok) setResults(r => [...r, true]);
  };

  const next = () => {
    if (result === false && attempts < 2) {
      // Dar otra oportunidad
      setInput('');
      setResult(null);
      return;
    }
    if (result === false) setResults(r => [...r, false]);
    setInput('');
    setResult(null);
    setAttempts(0);
    if (cursor + 1 >= sentences.length) {
      setFinished(true);
      const score = results.filter(Boolean).length + (result ? 1 : 0);
      onComplete('dictation', score >= sentences.length * 0.6);
    } else {
      setCursor(c => c + 1);
    }
  };

  const restart = () => {
    setCursor(0); setInput(''); setResult(null);
    setResults([]); setFinished(false); setAttempts(0);
  };

  if (finished) {
    const score = results.filter(Boolean).length;
    return (
      <div className="card-tool p-8 text-center space-y-4">
        <p className="text-5xl">{score === sentences.length ? '🏆' : '💪'}</p>
        <p className="text-4xl font-black text-white">{score}/{sentences.length}</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>frases correctas</p>
        <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto">
          <RotateCcw size={16} /> Repetir
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Frase {cursor + 1} / {sentences.length}
        </span>
        <div className="flex-1 mx-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div className="h-full rounded-full transition-all"
            style={{ width: `${(cursor / sentences.length) * 100}%`, background: 'var(--c0)' }} />
        </div>
      </div>

      <div className="card-tool p-6 space-y-5">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
            Escucha y escribe lo que oyes
          </p>
          <PlayButton onPlay={() => speak()} onStop={stop} speaking={speaking} label="Escuchar frase" />
        </div>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={result !== null}
          rows={2}
          placeholder="Escribe la frase aquí..."
          className="w-full px-4 py-3 rounded-xl font-semibold text-white resize-none outline-none transition-all"
          style={{
            background: result === null ? 'rgba(255,255,255,0.08)' : result ? 'rgba(74,222,128,0.10)' : 'rgba(248,113,113,0.10)',
            border: result === null ? '2px solid rgba(255,255,255,0.15)' : result ? '2px solid rgba(74,222,128,0.4)' : '2px solid rgba(248,113,113,0.4)',
          }}
        />

        {result !== null && (
          <div className={`px-4 py-3 rounded-xl text-sm font-black ${result ? 'badge-correct' : 'badge-wrong'}`}>
            {result ? '¡Perfecto! 🎉' : attempts < 2 ? '❌ Inténtalo de nuevo' : `✓ La frase era: "${current}"`}
          </div>
        )}

        <div className="flex justify-end">
          {result === null ? (
            <button onClick={check} disabled={!input.trim()} className="btn-tool">
              Comprobar
            </button>
          ) : (
            <button onClick={next} className="btn-tool flex items-center gap-2">
              {cursor + 1 >= sentences.length ? '¡Finalizar! 🏆' : result === false && attempts < 2 ? 'Reintentar' : 'Siguiente'}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── MODO 3: Comprensión ───────────────────────────────────────────────
const Comprehension = ({ listening, onComplete }) => {
  const { text, options = [], correctItems = [] } = listening;
  const { speak, stop, speaking } = useSpeech(text);
  const [phase,     setPhase]     = useState('listen'); // 'listen' | 'questions'
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Generamos preguntas básicas desde correctItems
  const questions = useMemo(() => correctItems.map((word, i) => ({
    id:  `q${i}`,
    q:   `¿Aparece la palabra "${word}" en el texto?`,
    ans: true,
  })).concat(
    options.filter(w => !correctItems.includes(w)).slice(0, 2).map((word, i) => ({
      id:  `d${i}`,
      q:   `¿Aparece la palabra "${word}" en el texto?`,
      ans: false,
    }))
  ).sort(() => Math.random() - 0.5), [correctItems, options]);

  const submit = () => {
    setSubmitted(true);
    const correct = questions.every(q => answers[q.id] === q.ans);
    onComplete('comprehension', correct);
  };

  if (phase === 'listen') return (
    <div className="card-tool p-8 flex flex-col items-center gap-6 text-center">
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <Volume2 size={40} style={{ color: 'var(--c0)' }} />
      </div>
      <div>
        <p className="font-black text-white text-xl mb-2">Escucha el texto</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
          Escucha con atención antes de responder las preguntas
        </p>
      </div>
      <PlayButton onPlay={() => speak()} onStop={stop} speaking={speaking} label="Reproducir texto" size="md" />
      <button onClick={() => setPhase('questions')} className="btn-tool flex items-center gap-2">
        Ir a las preguntas <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="card-tool p-4 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Preguntas de comprensión
        </p>
        <PlayButton onPlay={() => speak()} onStop={stop} speaking={speaking} size="sm" label="Repetir" />
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={q.id} className="card-tool p-4 space-y-3">
            <p className="text-sm font-black text-white">{i + 1}. {q.q}</p>
            <div className="flex gap-3">
              {[true, false].map(val => {
                const picked = answers[q.id] === val;
                const isRight = submitted && val === q.ans;
                const isWrong = submitted && picked && val !== q.ans;
                return (
                  <button key={String(val)}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: val }))}
                    className="flex-1 py-2.5 rounded-xl font-black text-sm transition-all"
                    style={{
                      background: isRight ? 'rgba(74,222,128,0.15)' : isWrong ? 'rgba(248,113,113,0.15)' : picked ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${isRight ? 'rgba(74,222,128,0.5)' : isWrong ? 'rgba(248,113,113,0.5)' : picked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: isRight ? '#4ade80' : isWrong ? '#f87171' : 'var(--text-2)',
                    }}>
                    {val ? 'Sí' : 'No'}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button onClick={submit}
          disabled={Object.keys(answers).length < questions.length}
          className="btn-tool w-full justify-center">
          Comprobar respuestas
        </button>
      ) : (
        <div className={`px-4 py-3 rounded-xl text-center font-black text-sm ${
          questions.every(q => answers[q.id] === q.ans) ? 'badge-correct' : 'badge-wrong'}`}>
          {questions.every(q => answers[q.id] === q.ans)
            ? '¡Todo correcto! 🏆'
            : `${questions.filter(q => answers[q.id] === q.ans).length}/${questions.length} correctas`}
        </div>
      )}
    </div>
  );
};

// ── AudioLab principal ────────────────────────────────────────────────
const MODES = [
  { id: 'spot',          label: '🎯 Spot the word' },
  { id: 'dictation',     label: '✏️ Dictado'        },
  { id: 'comprehension', label: '🧠 Comprensión'    },
];

export const AudioLab = ({ data, token }) => {
  const listening = data?.listening;
  const unitId    = data?.id ?? '';
  const { record: saveProgress } = useProgress(unitId, 'listening', token);

  const [mode,      setMode]      = useState('spot');
  const [completed, setCompleted] = useState({});

  const handleComplete = useCallback((modeId, correct) => {
    setCompleted(p => ({ ...p, [modeId]: correct }));
    saveProgress(`audio_${modeId}`, correct, { phase: 'practice' });
  }, [saveProgress]);

  if (!listening?.text) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🎧</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">Sin contenido de audio</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        Esta unidad no tiene ejercicios de listening todavía.
      </p>
    </div>
  );

  if (!window.speechSynthesis) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🔇</span>
      <p className="font-black text-white text-lg">Navegador no compatible</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        Tu navegador no soporta síntesis de voz. Prueba con Chrome o Edge.
      </p>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative"
            style={{
              background: mode === m.id ? 'var(--c0)' : 'rgba(255,255,255,0.06)',
              color:      mode === m.id ? '#000'       : 'var(--text-3)',
              border:     mode === m.id ? 'none'        : '1px solid rgba(255,255,255,0.10)',
            }}>
            {m.label}
            {completed[m.id] !== undefined && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-black"
                style={{ background: completed[m.id] ? '#4ade80' : '#f87171', color: '#000' }}>
                {completed[m.id] ? '✓' : '✗'}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modo activo */}
      {mode === 'spot'          && <SpotTheWord   key="spot"   listening={listening} onComplete={handleComplete} />}
      {mode === 'dictation'     && <Dictation      key="dict"   listening={listening} onComplete={handleComplete} />}
      {mode === 'comprehension' && <Comprehension  key="comp"   listening={listening} onComplete={handleComplete} />}
    </div>
  );
};

export default AudioLab;