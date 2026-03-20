import React, { useState, useCallback, useMemo } from 'react';
import { PenTool, Star, Flame, RotateCcw, CheckCircle, XCircle, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import { FillItem }             from './FillItem';
import { ChoiceItem }           from './ChoiceItem';
import { ErrorItem, OrderItem } from './ExerciseItems';
import { TranslateItem }        from './TranslateItem';
import { MatchPairsItem }       from './MatchPairsItem';
import { useStreak }            from '../../hooks/useStreak';
import { GuestGate }            from '../ui/GuestGate';
import { useXp, getLevelInfo }  from '../../hooks/useXp';
import { useProgress }          from '../../hooks/useProgress';
import { useSR }               from '../../hooks/useSR';

const TYPE_LABEL = {
  fill:       '✏️ Completa',
  choice:     '🔘 Elige',
  error:      '🔧 Corrige',
  order:      '🔀 Ordena',
  translate:  '🌍 Traduce',
  matchpairs: '🔗 Empareja',
};

const TypeBadge = ({ type }) => (
  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl border-2"
    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--c3)', color: 'var(--c0)' }}>
    {TYPE_LABEL[type] || type}
  </span>
);

const XpToast = ({ gain }) => {
  if (!gain) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 zoom-in"
      style={{ pointerEvents: 'none' }}>
      <div className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-white shadow-2xl"
        style={{ background: gain.levelUp ? 'var(--c0)' : 'rgba(99,102,241,0.95)', border: '2px solid rgba(255,255,255,0.2)' }}>
        <Zap size={16} />
        <span>+{gain.amount} XP</span>
        {gain.levelUp && <span className="ml-1">🎉 Level up!</span>}
      </div>
    </div>
  );
};

const LevelBar = ({ totalXp }) => {
  const { current, progress } = getLevelInfo(totalXp);
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)', minWidth: 140 }}>
      <span className="text-base">{current.emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--c0)' }}>
            {current.name}
          </span>
          <span className="text-[10px] font-black" style={{ color: 'var(--text-3)' }}>
            {totalXp} XP
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'var(--c0)' }} />
        </div>
      </div>
    </div>
  );
};

const FinishScreen = ({ score, total, maxStreak, totalXp, onRestart, quiz, results, guestMode, onRegister }) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <div className="space-y-6 animate-in zoom-in">
      <div className={`p-8 rounded-3xl border-2 text-center
        ${pct === 100 ? 'badge-correct' : pct < 40 ? 'badge-wrong' : ''}`}
        style={pct >= 40 && pct < 100 ? { background: 'rgba(255,255,255,0.08)', border: '2px solid var(--c3)' } : {}}>
        <p className="text-5xl mb-3">{pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '🔄'}</p>
        <p className="text-6xl font-black text-white mb-1">
          {score}<span className="text-2xl opacity-50">/{total}</span>
        </p>
        <div className="flex justify-center gap-8 mt-4 mb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Score</p>
            <p className="font-black text-xl text-white">{pct}%</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Mejor racha</p>
            <p className="font-black text-xl" style={{ color: 'var(--warn-text)' }}>{maxStreak} 🔥</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>Total XP</p>
            <p className="font-black text-xl" style={{ color: 'var(--c0)' }}>{totalXp} ⭐</p>
          </div>
        </div>
        <button onClick={onRestart} className="btn-tool flex items-center gap-2 mx-auto">
          <RotateCcw size={16} /> Repetir
        </button>
      </div>

      {/* Invitado: banner de registro tras completar */}
      {guestMode && onRegister && (
        <GuestGate inline onRegister={onRegister} />
      )}

      {/* Resumen ejercicio por ejercicio */}
      {quiz.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
            Resumen de ejercicios
          </p>
          {quiz.map((item, idx) => {
            const ok      = results[item.id];
            const skipped = ok === undefined;
            return (
              <div key={item.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: skipped ? 'rgba(255,255,255,0.04)'
                    : ok ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                  border: `1px solid ${skipped ? 'rgba(255,255,255,0.08)'
                    : ok ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
                }}>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-xs
                  ${skipped ? '' : ok ? 'badge-correct' : 'badge-wrong'}`}
                  style={skipped ? { background: 'rgba(255,255,255,0.08)', color: 'var(--text-3)' } : {}}>
                  {skipped ? '—' : ok ? <CheckCircle size={14} /> : <XCircle size={14} />}
                </div>
                <p className="text-sm font-semibold text-white flex-1 leading-snug line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: item.q?.replace('______', '___') ?? item.id }} />
                {!skipped && !ok && item.ans && (
                  <span className="text-xs font-black shrink-0" style={{ color: '#4ade80' }}>
                    ✓ {item.ans.split('|')[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const PracticeSection = ({
  quiz,
  unitId    = '',
  toolId    = 'grammar',
  token     = null,
  guestMode = false,
  onRegister = null,
}) => {
  const { progress, loading: progressLoading, record: saveProgress } = useProgress(unitId, toolId, token);
  const { sortQuiz, record: recordSR } = useSR(unitId, toolId, token);

  const [pendingResult,     setPendingResult]     = useState(null);
  const [committedResults,  setCommittedResults]  = useState({});
  const [cursor,            setCursor]            = useState(0);
  const [finished,          setFinished]          = useState(false);
  const [key,               setKey]               = useState(0);
  const [repeating,         setRepeating]         = useState(false); // ignorar filtro progress

  // sessionQuiz: se fija UNA VEZ cuando el progreso carga — no cambia durante la sesión
  const [sessionQuiz, setSessionQuiz] = React.useState(null);

  React.useEffect(() => {
    if (!progressLoading && sessionQuiz === null) {
      const done = new Set(progress?.completed_ids || []);
      const filtered = repeating ? sortQuiz(quiz) : sortQuiz(quiz.filter(item => !done.has(item.id)));
      // Invitado: máximo 3 ejercicios
      setSessionQuiz(guestMode ? filtered.slice(0, 3) : filtered);
      setCursor(0);
      setPendingResult(null);
      setFinished(false);
    }
  }, [progressLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Al repetir, forzar nueva sesión con todos los ejercicios
  React.useEffect(() => {
    if (repeating) {
      setSessionQuiz(sortQuiz(quiz));
      setCursor(0);
      setPendingResult(null);
      setFinished(false);
    }
  }, [repeating]); // eslint-disable-line react-hooks/exhaustive-deps

  const pendingQuiz = sessionQuiz ?? [];

  const { streak, maxStreak, score, record: recordStreak, reset: resetStreak } = useStreak(token);
  const { totalXp, lastGain, award } = useXp(token);

  const currentItem   = pendingQuiz[cursor];
  const totalPending  = pendingQuiz.length;
  // El ejercicio está respondido si tiene pendingResult (hijo ya informó) o ya estaba committed
  const hasResult     = pendingResult !== null || committedResults[currentItem?.id] !== undefined;
  const resultOk      = pendingResult !== null
    ? pendingResult.ok
    : committedResults[currentItem?.id];

  // El hijo llama esto — solo registramos, NO avanzamos
  const handleResult = useCallback((ok) => {
    // Evitar doble llamada (ej: Reveal llama onResult, luego Check también)
    setPendingResult(prev => prev === null ? { ok } : prev);
  }, []);

  // El alumno pulsa "Siguiente" — aquí comprometemos el resultado y avanzamos
  const goNext = useCallback(() => {
    if (pendingResult !== null && currentItem) {
      const { ok } = pendingResult;
      const isNew  = committedResults[currentItem.id] === undefined;
      if (isNew) {
        const newStreak = ok ? streak + 1 : 0;
        recordStreak(ok);
        award(ok, newStreak, true).then(xpGained => {
          recordSR(currentItem.id, ok, { xp: xpGained ?? 0, streak: newStreak });
        });
        saveProgress(currentItem.id, ok, { phase: 'practice' });
        setCommittedResults(p => ({ ...p, [currentItem.id]: ok }));
      }
    }
    setPendingResult(null);
    if (cursor + 1 >= totalPending) setFinished(true);
    else setCursor(c => c + 1);
  }, [pendingResult, currentItem, committedResults, cursor, totalPending, streak, recordStreak, award, saveProgress, recordSR]);

  // Saltar sin guardar resultado
  const skip = useCallback(() => {
    setPendingResult(null);
    if (cursor + 1 >= totalPending) setFinished(true);
    else setCursor(c => c + 1);
  }, [cursor, totalPending]);

  // Ir al ejercicio anterior (solo navega, no cambia resultados)
  const goBack = useCallback(() => {
    if (cursor === 0) return;
    const prevItem = pendingQuiz[cursor - 1];
    const prevCommitted = prevItem ? committedResults[prevItem.id] : undefined;
    // Si el ejercicio anterior ya fue respondido, restaurar pendingResult
    // para que hasResult sea true y aparezca el botón Siguiente
    setPendingResult(prevCommitted !== undefined ? { ok: prevCommitted } : null);
    setCursor(c => c - 1);
  }, [cursor, pendingQuiz, committedResults]);

  const restart = useCallback(() => {
    setPendingResult(null);
    setCommittedResults({});
    setCursor(0);
    setFinished(false);
    setRepeating(true);
    resetStreak();
    setKey(k => k + 1);
  }, [resetStreak]);

  // Cargando progreso del servidor
  if (progressLoading) return (
    <div className="card-tool p-10 space-y-4">
      <div className="skeleton h-8 w-48 rounded-xl" />
      <div className="skeleton h-32 rounded-2xl" />
      <div className="skeleton h-12 w-32 rounded-xl" />
    </div>
  );

  if (!quiz.length) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">✏️</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No hay ejercicios</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>Los ejercicios de esta unidad llegan pronto.</p>
    </div>
  );

  if (!finished && pendingQuiz.length === 0) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🏆</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">¡Ya completaste todos los ejercicios!</p>
      <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-3)' }}>Puedes repetirlos si quieres repasar.</p>
      <button onClick={restart} className="btn-tool flex items-center gap-2">
        <RotateCcw size={16} /> Repetir todos
      </button>
    </div>
  );

  return (
    <div className="card-tool p-6 md:p-10" key={key}>
      <XpToast gain={lastGain} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6"
        style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <PenTool size={22} style={{ color: 'var(--c0)' }} />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">✏️ Practice Zone</h3>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {streak >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl badge-revealed animate-in zoom-in">
              <Flame size={14} /><span className="font-black text-sm">{streak} 🔥</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.10)', border: '2px solid var(--c3)' }}>
            <Star size={14} style={{ color: 'var(--c0)' }} />
            <span className="font-black text-base text-white">
              {score}<span className="opacity-50 text-sm">/{totalPending}</span>
            </span>
          </div>
          <LevelBar totalXp={totalXp} />
        </div>
      </div>

      {/* Contenido */}
      {finished ? (
        <FinishScreen
          score={score}
          total={totalPending}
          maxStreak={maxStreak}
          totalXp={totalXp}
          onRestart={restart}
          quiz={pendingQuiz}
          results={committedResults}
          guestMode={guestMode}
          onRegister={onRegister}
        />
      ) : currentItem ? (
        <div className="animate-in fade-in duration-300">
          {/* Contador y tipo */}
          <div className="flex items-center justify-between mb-4">
            <TypeBadge type={currentItem.type} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              {cursor + 1} / {totalPending}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="h-1.5 rounded-full overflow-hidden mb-6" style={{ background: 'rgba(255,255,255,0.10)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(cursor / totalPending) * 100}%`, background: 'var(--c0)' }} />
          </div>

          {/* Tarjeta ejercicio */}
          <div className={`p-5 md:p-6 rounded-2xl border-2 transition-all
            ${hasResult && resultOk ? 'state-correct' : hasResult ? 'state-wrong' : 'item-surface'}`}
            style={!hasResult ? { borderColor: 'rgba(255,255,255,0.18)' } : {}}>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base shrink-0
                ${hasResult && resultOk ? 'badge-correct' : hasResult ? 'badge-wrong' : ''}`}
                style={!hasResult ? { background: 'var(--c0)', color: '#fff' } : {}}>
                {hasResult
                  ? (resultOk ? <CheckCircle size={16} /> : <XCircle size={16} />)
                  : cursor + 1}
              </div>
            </div>

            {/* Ejercicio — key={cursor} fuerza remount al cambiar carta */}
            <div key={cursor}>
              {(() => {
                // savedResult: committed en esta sesión > guardado en BD > undefined
                const saved = committedResults[currentItem.id] !== undefined
                  ? committedResults[currentItem.id]
                  : progress?.correct_ids?.includes(currentItem.id)
                    ? true
                    : progress?.completed_ids?.includes(currentItem.id)
                      ? false
                      : undefined;

                const props = { item: currentItem, onResult: handleResult, savedResult: saved };
                if (currentItem.type === 'fill')       return <FillItem       {...props} />;
                if (currentItem.type === 'choice')     return <ChoiceItem     {...props} />;
                if (currentItem.type === 'error')      return <ErrorItem      {...props} />;
                if (currentItem.type === 'order')      return <OrderItem      {...props} />;
                if (currentItem.type === 'translate')  return <TranslateItem  {...props} />;
                if (currentItem.type === 'matchpairs') return <MatchPairsItem {...props} />;
                return null;
              })()}
            </div>

            {/* Explicación — aparece tras responder, correcto O incorrecto */}
            {hasResult && currentItem.explanation && (
              <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <p className="text-sm italic font-semibold"
                  style={{ color: 'var(--text-2)' }}
                  dangerouslySetInnerHTML={{ __html: `💡 ${currentItem.explanation}` }} />
              </div>
            )}
          </div>

          {/* Navegación */}
          <div className="mt-5 flex items-center justify-between gap-3">
            {/* Izquierda: Anterior */}
            {cursor > 0 ? (
              <button onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-xl transition-all"
                style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                <ChevronLeft size={13} /> Anterior
              </button>
            ) : <div />}

            {/* Derecha: Saltar o Siguiente */}
            <div className="flex items-center gap-2 ml-auto">
              {!hasResult && (
                <button onClick={skip}
                  className="text-xs font-black uppercase tracking-widest px-3 py-2 rounded-xl transition-all"
                  style={{ color: 'var(--text-3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                  Saltar →
                </button>
              )}
              {hasResult && (
                <button onClick={goNext} className="btn-tool flex items-center gap-2">
                  {cursor + 1 >= totalPending ? '¡Finalizar! 🏆' : 'Siguiente'}
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PracticeSection;