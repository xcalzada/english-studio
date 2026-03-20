import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { BookOpen, PenTool, Shuffle, CheckCircle, XCircle, RotateCcw, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { useSR }       from '../hooks/useSR';
import { useProgress } from '../hooks/useProgress';

// ── Helpers ──────────────────────────────────────────────────────────
const normalize = s => s.trim().toLowerCase().replace(/[áàä]/g,'a').replace(/[éèë]/g,'e')
  .replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n');

// ── WordList — fase 1: lista de palabras ─────────────────────────────
const WordList = ({ vocab, onPractice }) => (
  <div className="space-y-4">
    <div className="card-tool p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
            Vocabulario
          </p>
          <h2 className="display-font text-2xl text-white">{vocab.length} palabras</h2>
        </div>
        <button onClick={onPractice} className="btn-tool flex items-center gap-2">
          Practicar <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {vocab.map(item => (
          <div key={item.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <span className="font-black text-white text-sm">{item.word}</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>{item.span}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── FlashcardMode ────────────────────────────────────────────────────
const FlashcardMode = ({ vocab, onRecord }) => {
  const [cursor,   setCursor]   = useState(0);
  const [flipped,  setFlipped]  = useState(false);
  const [results,  setResults]  = useState({});
  const [finished, setFinished] = useState(false);

  const current = vocab[cursor];
  const total   = vocab.length;
  const score   = Object.values(results).filter(Boolean).length;

  const answer = useCallback((ok) => {
    setResults(p => ({ ...p, [current.id]: ok }));
    onRecord(current.id, ok);
    setFlipped(false);
    setTimeout(() => {
      if (cursor + 1 >= total) setFinished(true);
      else setCursor(c => c + 1);
    }, 200);
  }, [current, cursor, total, onRecord]);

  const restart = () => { setCursor(0); setFlipped(false); setResults({}); setFinished(false); };
  const goBack  = () => { if (cursor > 0) { setCursor(c => c - 1); setFlipped(false); } };

  if (finished) return (
    <div className="card-tool p-8 text-center space-y-4">
      <p className="text-5xl">{score === total ? '🏆' : score >= total * 0.7 ? '🌟' : '💪'}</p>
      <p className="text-4xl font-black text-white">{score}/{total}</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        {score === total ? '¡Perfecto!' : `Sigue repasando las que fallaste.`}
      </p>
      <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto">
        <RotateCcw size={16} /> Repetir
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Progreso */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          {cursor + 1} / {total}
        </span>
        <div className="flex-1 mx-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((cursor) / total) * 100}%`, background: 'var(--c0)' }} />
        </div>
        <span className="text-xs font-black" style={{ color: '#4ade80' }}>{score} ✓</span>
      </div>

      {/* Tarjeta */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="card-tool p-10 flex flex-col items-center justify-center text-center cursor-pointer select-none min-h-48 transition-all duration-300"
        style={{ border: flipped ? '2px solid var(--c0)' : '2px solid rgba(255,255,255,0.10)' }}>
        {!flipped ? (
          <>
            <p className="text-3xl font-black text-white mb-3">{current.word}</p>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              Toca para ver la traducción
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl font-black mb-2" style={{ color: 'var(--c0)' }}>{current.span}</p>
            <p className="text-sm font-semibold text-white opacity-60">{current.word}</p>
          </>
        )}
      </div>

      {/* Botones */}
      <div className="flex items-center gap-3 justify-between">
        {cursor > 0 ? (
          <button onClick={goBack}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-xl"
            style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <ChevronLeft size={13} /> Anterior
          </button>
        ) : <div />}

        {flipped && (
          <div className="flex gap-3 ml-auto">
            <button onClick={() => answer(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all"
              style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.35)', color: '#f87171' }}>
              <XCircle size={16} /> No la sabía
            </button>
            <button onClick={() => answer(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all"
              style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.35)', color: '#4ade80' }}>
              <CheckCircle size={16} /> ¡La sabía!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── WrittenMode ──────────────────────────────────────────────────────
const WrittenMode = ({ vocab, onRecord }) => {
  const [cursor,   setCursor]   = useState(0);
  const [input,    setInput]    = useState('');
  const [result,   setResult]   = useState(null); // null | true | false
  const [results,  setResults]  = useState({});
  const [finished, setFinished] = useState(false);

  const current = vocab[cursor];
  const total   = vocab.length;
  const score   = Object.values(results).filter(Boolean).length;

  const check = () => {
    if (result !== null) return;
    const ok = normalize(input) === normalize(current.span);
    setResult(ok);
    setResults(p => ({ ...p, [current.id]: ok }));
    onRecord(current.id, ok);
  };

  const next = () => {
    setInput('');
    setResult(null);
    if (cursor + 1 >= total) setFinished(true);
    else setCursor(c => c + 1);
  };

  const goBack = () => {
    if (cursor === 0) return;
    setInput('');
    setResult(null);
    setCursor(c => c - 1);
  };

  const restart = () => { setCursor(0); setInput(''); setResult(null); setResults({}); setFinished(false); };

  if (finished) return (
    <div className="card-tool p-8 text-center space-y-4">
      <p className="text-5xl">{score === total ? '🏆' : score >= total * 0.7 ? '🌟' : '💪'}</p>
      <p className="text-4xl font-black text-white">{score}/{total}</p>
      <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto">
        <RotateCcw size={16} /> Repetir
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          {cursor + 1} / {total}
        </span>
        <div className="flex-1 mx-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(cursor / total) * 100}%`, background: 'var(--c0)' }} />
        </div>
        <span className="text-xs font-black" style={{ color: '#4ade80' }}>{score} ✓</span>
      </div>

      <div className="card-tool p-8 space-y-6">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
            ¿Cómo se dice en español?
          </p>
          <p className="text-3xl font-black text-white">{current.word}</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (result === null ? check() : next())}
            disabled={result !== null}
            placeholder="Escribe la traducción..."
            className="w-full px-4 py-3 rounded-xl font-semibold text-white text-center text-lg outline-none transition-all"
            style={{
              background: result === null ? 'rgba(255,255,255,0.08)' : result ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
              border: result === null ? '2px solid rgba(255,255,255,0.15)' : result ? '2px solid rgba(74,222,128,0.4)' : '2px solid rgba(248,113,113,0.4)',
            }}
            autoFocus
          />

          {result !== null && (
            <div className={`px-4 py-3 rounded-xl text-center font-black text-sm ${result ? 'badge-correct' : 'badge-wrong'}`}>
              {result ? '¡Correcto! 🎉' : `La respuesta es: ${current.span}`}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {cursor > 0 ? (
          <button onClick={goBack}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-xl"
            style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <ChevronLeft size={13} /> Anterior
          </button>
        ) : <div />}

        <div className="ml-auto">
          {result === null ? (
            <button onClick={check} className="btn-tool" disabled={!input.trim()}>
              Comprobar
            </button>
          ) : (
            <button onClick={next} className="btn-tool flex items-center gap-2">
              {cursor + 1 >= total ? '¡Finalizar! 🏆' : 'Siguiente'} <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── MatchingMode ─────────────────────────────────────────────────────
const MatchingMode = ({ vocab, onRecord }) => {
  const SIZE = 6; // parejas por ronda
  const [round,    setRound]    = useState(0);
  const [selected, setSelected] = useState(null); // { id, side }
  const [matched,  setMatched]  = useState(new Set());
  const [errors,   setErrors]   = useState(new Set());
  const [finished, setFinished] = useState(false);

  const pool = useMemo(() => {
    const start = (round * SIZE) % vocab.length;
    return vocab.slice(start, start + SIZE).concat(
      start + SIZE > vocab.length ? vocab.slice(0, (start + SIZE) % vocab.length) : []
    ).slice(0, SIZE);
  }, [vocab, round]);

  const [lefts, rights] = useMemo(() => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return [pool, shuffled];
  }, [pool]);

  const totalRounds = Math.ceil(vocab.length / SIZE);

  const handleSelect = (id, side) => {
    if (matched.has(id)) return;

    if (!selected) {
      setSelected({ id, side });
      return;
    }

    if (selected.side === side) {
      setSelected({ id, side });
      return;
    }

    const ok = selected.id === id;
    if (ok) {
      const newMatched = new Set(matched);
      newMatched.add(id);
      setMatched(newMatched);
      onRecord(id, true);
      setSelected(null);
      if (newMatched.size === pool.length) {
        setTimeout(() => {
          if (round + 1 >= totalRounds) setFinished(true);
          else { setRound(r => r + 1); setMatched(new Set()); setSelected(null); setErrors(new Set()); }
        }, 600);
      }
    } else {
      setErrors(new Set([selected.id, id]));
      onRecord(id, false);
      onRecord(selected.id, false);
      setTimeout(() => { setErrors(new Set()); setSelected(null); }, 700);
    }
  };

  const restart = () => { setRound(0); setMatched(new Set()); setSelected(null); setErrors(new Set()); setFinished(false); };

  if (finished) return (
    <div className="card-tool p-8 text-center space-y-4">
      <p className="text-5xl">🏆</p>
      <p className="text-2xl font-black text-white">¡Todas las parejas completadas!</p>
      <button onClick={restart} className="btn-tool flex items-center gap-2 mx-auto">
        <RotateCcw size={16} /> Repetir
      </button>
    </div>
  );

  const cardStyle = (id, side) => {
    const isSelected = selected?.id === id && selected?.side === side;
    const isMatched  = matched.has(id);
    const isError    = errors.has(id);
    return {
      background: isMatched ? 'rgba(74,222,128,0.12)' : isError ? 'rgba(248,113,113,0.12)' : isSelected ? 'rgba(var(--c0-rgb,96,165,250),0.15)' : 'rgba(255,255,255,0.06)',
      border: `2px solid ${isMatched ? 'rgba(74,222,128,0.4)' : isError ? 'rgba(248,113,113,0.4)' : isSelected ? 'var(--c0)' : 'rgba(255,255,255,0.10)'}`,
      opacity: isMatched ? 0.5 : 1,
      cursor: isMatched ? 'default' : 'pointer',
      transition: 'all 0.2s',
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Ronda {round + 1} / {totalRounds}
        </span>
        <span className="text-xs font-black" style={{ color: '#4ade80' }}>{matched.size}/{pool.length} ✓</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-center mb-2" style={{ color: 'var(--text-3)' }}>English</p>
          {lefts.map(item => (
            <div key={item.id} onClick={() => handleSelect(item.id, 'left')}
              className="px-4 py-3 rounded-xl text-center font-black text-sm text-white"
              style={cardStyle(item.id, 'left')}>
              {item.word}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-center mb-2" style={{ color: 'var(--text-3)' }}>Español</p>
          {rights.map(item => (
            <div key={item.id} onClick={() => handleSelect(item.id, 'right')}
              className="px-4 py-3 rounded-xl text-center font-semibold text-sm text-white"
              style={cardStyle(item.id, 'right')}>
              {item.span}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── VocabLab principal ───────────────────────────────────────────────
const MODES = [
  { id: 'flashcard', label: '🃏 Flashcards' },
  { id: 'written',   label: '✏️ Test escrito' },
  { id: 'matching',  label: '🔗 Matching' },
];

export const VocabLab = ({ data, token }) => {
  const vocab   = data?.vocabulary ?? [];
  const unitId  = data?.id ?? '';
  const toolId  = 'vocab';

  const { sortQuiz, record: recordSR } = useSR(unitId, toolId, token);
  const { record: saveProgress }       = useProgress(unitId, toolId, token);

  const [phase, setPhase] = useState('list'); // 'list' | 'practice'
  const [mode,  setMode]  = useState('flashcard');

  // Convertir vocab a formato compatible con useSR (mismo contrato que quiz items)
  const vocabAsQuiz = useMemo(() => vocab.map(v => ({ id: v.id })), [vocab]);
  const sortedVocab = useMemo(() => {
    const sorted = sortQuiz(vocabAsQuiz);
    return sorted.map(q => vocab.find(v => v.id === q.id)).filter(Boolean);
  }, [vocab, vocabAsQuiz, sortQuiz]);

  const handleRecord = useCallback((itemId, correct) => {
    recordSR(itemId, correct);
    saveProgress(itemId, correct, { phase: 'practice' });
  }, [recordSR, saveProgress]);

  if (!vocab.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">💡</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">Sin vocabulario</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        Esta unidad no tiene palabras de vocabulario todavía.
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {phase === 'list' ? (
        <WordList vocab={vocab} onPractice={() => setPhase('practice')} />
      ) : (
        <div className="space-y-5">
          {/* Header con volver */}
          <div className="flex items-center gap-3">
            <button onClick={() => setPhase('list')}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-xl"
              style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <ChevronLeft size={13} /> Lista
            </button>
            <h2 className="display-font text-2xl text-white">Practicar</h2>
          </div>

          {/* Tabs de modo */}
          <div className="flex gap-2 flex-wrap">
            {MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                style={{
                  background: mode === m.id ? 'var(--c0)' : 'rgba(255,255,255,0.06)',
                  color:      mode === m.id ? '#000'       : 'var(--text-3)',
                  border:     mode === m.id ? 'none'        : '1px solid rgba(255,255,255,0.10)',
                }}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Modo activo */}
          {mode === 'flashcard' && <FlashcardMode key="flashcard" vocab={sortedVocab} onRecord={handleRecord} />}
          {mode === 'written'   && <WrittenMode   key="written"   vocab={sortedVocab} onRecord={handleRecord} />}
          {mode === 'matching'  && <MatchingMode  key="matching"  vocab={vocab}       onRecord={handleRecord} />}
        </div>
      )}
    </div>
  );
};

export default VocabLab;