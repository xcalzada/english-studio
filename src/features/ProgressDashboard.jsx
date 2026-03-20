import React from 'react';
import { Flame, Zap, Trophy, ArrowLeft, Star } from 'lucide-react';
import { UNITS_DATA }    from '../data';
import { TOOLS_CONFIG }  from '../toolsConfig';
import { useStreak }     from '../hooks/useStreak';
import { ErrorDnaPanel } from '../components/ui/ErrorDnaPanel';
import { useXp, getLevelInfo } from '../hooks/useXp';
import { useProgress }   from '../hooks/useProgress';

// ── Tarjeta de racha diaria ───────────────────────────────────────
const StreakCard = ({ currentStreak, serverMax }) => {
  const days = Array.from({ length: 7 }, (_, i) => i < currentStreak % 7 || currentStreak >= 7);
  return (
    <div className="card-tool p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.25)' }}>
          <Flame size={18} style={{ color: '#fb923c' }} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Daily Streak</p>
          <h3 className="display-font text-2xl text-white leading-none">Racha diaria</h3>
        </div>
      </div>

      <div className="flex items-end gap-4 mb-5">
        <p className="text-6xl font-black text-white leading-none">{currentStreak}</p>
        <div className="pb-1">
          <p className="text-sm font-black" style={{ color: '#fb923c' }}>días seguidos 🔥</p>
          <p className="text-[10px] font-semibold" style={{ color: 'var(--text-3)' }}>Récord: {serverMax} días</p>
        </div>
      </div>

      {/* Últimos 7 días */}
      <div className="flex gap-2">
        {['L','M','X','J','V','S','D'].map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full h-8 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: days[i] ? 'rgba(251,146,60,0.25)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${days[i] ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}>
              {days[i] ? '🔥' : '·'}
            </div>
            <span className="text-[9px] font-black uppercase" style={{ color: 'var(--text-3)' }}>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Tarjeta de XP y nivel ─────────────────────────────────────────
const XpCard = ({ totalXp, level }) => {
  const { current, next, progress } = getLevelInfo(totalXp);
  return (
    <div className="card-tool p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <Zap size={18} style={{ color: 'var(--c0)' }} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Experience</p>
          <h3 className="display-font text-2xl text-white leading-none">Experiencia</h3>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <span className="text-5xl">{current.emoji}</span>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-black text-white leading-none">{totalXp}</p>
            <p className="text-sm font-black" style={{ color: 'var(--c0)' }}>XP</p>
          </div>
          <p className="text-sm font-black" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Nivel {level} — {current.name}
          </p>
        </div>
      </div>

      {/* Barra de progreso al siguiente nivel */}
      {next && (
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              Próximo nivel
            </span>
            <span className="text-[10px] font-black" style={{ color: 'var(--c0)' }}>
              {next.emoji} {next.name} — {next.minXp} XP
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--c0), #a78bfa)' }} />
          </div>
          <p className="text-[10px] font-semibold mt-1 text-right" style={{ color: 'var(--text-3)' }}>
            {next.minXp - totalXp} XP para el siguiente nivel
          </p>
        </div>
      )}
      {!next && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <Trophy size={14} style={{ color: 'var(--c0)' }} />
          <p className="text-xs font-black" style={{ color: 'var(--c0)' }}>¡Nivel máximo alcanzado! 🥇</p>
        </div>
      )}
    </div>
  );
};

// ── Tarjeta de progreso por unidad ────────────────────────────────
const UnitProgressCard = ({ unit, token }) => {
  const { progress } = useProgress(unit.id, 'grammar', token);
  const total     = (unit.theoryQuiz || []).length;
  const completed = progress?.completed_ids?.length ?? 0;
  const correct   = progress?.correct_ids?.length ?? 0;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="card-tool p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-3)' }}>
            Grammar
          </p>
          <h4 className="display-font text-lg text-white leading-tight">{unit.grammarTitle}</h4>
        </div>
        <div className="text-2xl font-black text-white ml-3">{pct}%</div>
      </div>

      {/* Barra de progreso */}
      <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.10)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? '#4ade80' : 'linear-gradient(90deg, var(--c0), #a78bfa)',
          }} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Star size={11} style={{ color: '#fbbf24' }} />
          <span className="text-[10px] font-black" style={{ color: 'var(--text-3)' }}>
            {correct}/{total} correctos
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: pct === 100 ? '#4ade80' : 'var(--c0)' }} />
          <span className="text-[10px] font-black" style={{ color: 'var(--text-3)' }}>
            {completed}/{total} hechos
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────
const ProgressDashboard = ({ token, onBack }) => {
  const { currentStreak, serverMax }  = useStreak(token);
  const { totalXp, level }            = useXp(token);
  const units = Object.values(UNITS_DATA);

  return (
    <div className="tool-grammar page-transition" style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <nav className="nav-bar w-full sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBack} className="btn-ghost flex items-center gap-2 text-xs">
            <ArrowLeft size={15} /> Home
          </button>
          <span className="text-sm font-black text-white uppercase tracking-tight">Mi Progreso</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-24 space-y-8">

        {/* Header */}
        <div>
          <h1 className="display-font text-4xl md:text-5xl text-white mb-1">Mi Progreso 🏆</h1>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
            ¡Sigue así y llegarás al nivel Champion!
          </p>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StreakCard currentStreak={currentStreak} serverMax={serverMax} />
          <XpCard totalXp={totalXp} level={level} />
        </div>

        {/* Progreso por unidad */}
        {units.length > 0 && (
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.25em] mb-4" style={{ color: 'var(--text-3)' }}>
              Progreso por unidad
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {units.map(unit => (
                <UnitProgressCard key={unit.id} unit={unit} token={token} />
              ))}
            </div>
          </div>
        )}


        {/* Error DNA */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.25em] mb-4" style={{ color: 'var(--text-3)' }}>
            🧬 Perfil de errores
          </p>
          <ErrorDnaPanel token={token} />
        </div>

      </div>
    </div>
  );
};

export default ProgressDashboard;