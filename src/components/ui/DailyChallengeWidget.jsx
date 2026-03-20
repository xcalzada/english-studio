import React, { useState } from 'react';
import { Zap, CheckCircle, ChevronRight } from 'lucide-react';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { FillItem }          from '../grammar/FillItem';
import { ChoiceItem }        from '../grammar/ChoiceItem';
import { ErrorItem }         from '../grammar/ExerciseItems';

const TYPE_LABEL = {
  fill:   '✏️ Completa la frase',
  choice: '🔘 Elige la opción correcta',
  error:  '🔧 Corrige el error',
};

const ChallengeCard = ({ exercise, onResult }) => {
  const [result, setResult] = useState(null);

  const handleResult = (ok) => {
    if (result !== null) return;
    setResult(ok);
    onResult(ok);
  };

  return (
    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
      <div className="p-5 rounded-2xl border-2 transition-all"
        style={{
          borderColor: result === true ? 'var(--ok-border)' : result === false ? 'var(--fail-border)' : 'rgba(255,255,255,0.18)',
          background:  result === true ? 'rgba(74,222,128,0.08)' : result === false ? 'rgba(248,113,113,0.08)' : 'rgba(255,255,255,0.05)',
        }}>
        <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c0)' }}>
          {TYPE_LABEL[exercise.type] || '📝 Ejercicio'}
        </p>
        <div key={exercise.id}>
          {exercise.type === 'fill'   && <FillItem   item={exercise} onResult={handleResult} />}
          {exercise.type === 'choice' && <ChoiceItem item={exercise} onResult={handleResult} />}
          {exercise.type === 'error'  && <ErrorItem  item={exercise} onResult={handleResult} />}
        </div>
        {result !== null && exercise.explanation && (
          <div className="mt-4 px-4 py-3 rounded-xl animate-in slide-in-from-top-2"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <p className="text-sm italic font-semibold"
              style={{ color: 'var(--text-2)' }}
              dangerouslySetInnerHTML={{ __html: `💡 ${exercise.explanation}` }} />
          </div>
        )}
      </div>
      {result !== null && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl w-fit font-black text-xs uppercase tracking-widest animate-in zoom-in
          ${result ? 'badge-correct' : 'badge-wrong'}`}>
          {result ? <><CheckCircle size={13} /> ¡Correcto! +15 XP 🎉</> : <>❌ Incorrecto — sigue practicando</>}
        </div>
      )}
    </div>
  );
};

export const DailyChallengeWidget = ({ token }) => {
  const { challenge, exercise, loading, complete } = useDailyChallenge(token);
  const [open, setOpen] = useState(false);

  if (loading) return <div className="skeleton h-20 rounded-2xl" />;
  if (!challenge || !exercise) return null;

  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  // Ya completado
  if (challenge.completed) return (
    <div className="card-tool p-5 flex items-center gap-4"
      style={{ border: `2px solid ${challenge.correct ? 'var(--ok-border)' : 'var(--fail-border)'}` }}>
      <div className="p-3 rounded-xl shrink-0"
        style={{ background: challenge.correct ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)' }}>
        {challenge.correct
          ? <CheckCircle size={20} style={{ color: 'var(--ok-text)' }} />
          : <span className="text-xl">🔄</span>}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-3)' }}>
          Reto del día — {today}
        </p>
        <p className="text-sm font-black text-white">
          {challenge.correct ? '¡Reto completado! +15 XP 🏆' : 'Reto intentado — ¡mañana habrá uno nuevo!'}
        </p>
      </div>
    </div>
  );

  // Pendiente
  return (
    <div className="card-tool p-5" style={{ border: '2px solid var(--c0)', background: 'rgba(99,102,241,0.08)' }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 text-left">
        <div className="p-3 rounded-xl shrink-0"
          style={{ background: 'rgba(99,102,241,0.20)', border: '1px solid rgba(99,102,241,0.35)' }}>
          <Zap size={20} style={{ color: 'var(--c0)' }} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--c0)' }}>
            🎯 Reto del día
          </p>
          <p className="text-sm font-black text-white capitalize">{today}</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-3)' }}>
            Complétalo para conseguir +15 XP extra ⭐
          </p>
        </div>
        <ChevronRight size={18}
          style={{ color: 'var(--c0)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>

      {open && <ChallengeCard exercise={exercise} onResult={ok => complete(ok)} />}
    </div>
  );
};

export default DailyChallengeWidget;