import React, { useState, useMemo } from 'react';
import { useErrorDna }  from '../../hooks/useErrorDna';
import { UNITS_DATA }   from '../../data';
import { PracticeSection } from '../grammar/PracticeSection';
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, Target,
  Calendar, BarChart2, BookOpen, X, ChevronLeft, ChevronRight,
} from 'lucide-react';

// ─── Constantes ───────────────────────────────────────────────────────────────
const TREND_CONFIG = {
  improving:  { icon: TrendingUp,   color: '#4ade80', label: '📈 Mejorando' },
  stable:     { icon: Minus,        color: '#fbbf24', label: '➡️ Estable'   },
  needs_work: { icon: TrendingDown, color: '#f87171', label: '📉 A mejorar' },
  no_data:    { icon: Minus,        color: 'var(--text-3)', label: '— Sin datos' },
};

const TYPE_LABELS = {
  grammar:   '✏️ Grammar',
  discovery: '🔍 Discovery',
  vocab:     '📚 Vocab',
  audio:     '🎧 Audio',
  reading:   '📖 Reading',
  writing:   '✍️ Writing',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const accColor = (v) => v >= 80 ? '#4ade80' : v >= 50 ? '#fbbf24' : '#f87171';

const AccuracyBar = ({ accuracy, label, sublabel }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <div>
        <span className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>{label}</span>
        {sublabel && <span className="text-[10px] ml-1.5" style={{ color: 'var(--text-3)' }}>{sublabel}</span>}
      </div>
      <span className="text-xs font-black" style={{ color: accColor(accuracy) }}>{accuracy}%</span>
    </div>
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${accuracy}%`, background: accColor(accuracy) }} />
    </div>
  </div>
);

// ─── Calendario ───────────────────────────────────────────────────────────────
const CalendarView = ({ history }) => {
  const [viewYear,  setViewYear]  = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [selected,  setSelected]  = useState(null);

  // Índice de datos por fecha
  const dataByDate = useMemo(() => {
    const map = {};
    for (const row of history ?? []) map[row.stat_date] = row;
    return map;
  }, [history]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Celdas del mes
  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startDow = (first.getDay() + 6) % 7; // lunes=0
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result = [];
    for (let i = 0; i < startDow; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      result.push({ day: d, iso, data: dataByDate[iso] ?? null });
    }
    return result;
  }, [viewYear, viewMonth, dataByDate]);

  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  const cellBg = (data) => {
    if (!data) return 'rgba(255,255,255,0.04)';
    const acc = data.exercises > 0 ? (data.correct / data.exercises) : 0;
    if (acc >= 0.8) return 'rgba(74,222,128,0.25)';
    if (acc >= 0.5) return 'rgba(251,191,36,0.25)';
    return 'rgba(248,113,113,0.25)';
  };
  const cellBorder = (data, iso) => {
    if (selected === iso) return '2px solid var(--c0)';
    if (!data) return '1px solid rgba(255,255,255,0.06)';
    const acc = data.exercises > 0 ? (data.correct / data.exercises) : 0;
    if (acc >= 0.8) return '1px solid rgba(74,222,128,0.40)';
    if (acc >= 0.5) return '1px solid rgba(251,191,36,0.40)';
    return '1px solid rgba(248,113,113,0.40)';
  };

  const selData = selected ? dataByDate[selected] : null;

  return (
    <div className="card-tool p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={15} style={{ color: 'var(--c0)' }} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Calendario de actividad
        </p>
      </div>

      {/* Navegación mes */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronLeft size={14} style={{ color: 'var(--text-3)' }} />
        </button>
        <span className="text-sm font-black text-white">{monthNames[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronRight size={14} style={{ color: 'var(--text-3)' }} />
        </button>
      </div>

      {/* Cabecera días */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['L','M','X','J','V','S','D'].map(d => (
          <div key={d} className="text-center text-[9px] font-black uppercase tracking-widest py-1"
            style={{ color: 'var(--text-3)' }}>{d}</div>
        ))}
      </div>

      {/* Celdas */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`empty-${i}`} />;
          return (
            <button key={cell.iso}
              onClick={() => setSelected(s => s === cell.iso ? null : cell.iso)}
              className="aspect-square rounded-lg flex items-center justify-center text-[11px] font-black transition-all hover:scale-105"
              style={{
                background: cellBg(cell.data),
                border: cellBorder(cell.data, cell.iso),
                color: cell.data ? 'white' : 'var(--text-3)',
              }}>
              {cell.day}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        {[['rgba(74,222,128,0.25)', '≥80%'], ['rgba(251,191,36,0.25)', '50–79%'], ['rgba(248,113,113,0.25)', '<50%']].map(([bg, label]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: bg }} />
            <span className="text-[9px] font-bold" style={{ color: 'var(--text-3)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* KPIs del día seleccionado */}
      {selected && (
        <div className="mt-4 p-4 rounded-2xl animate-in slide-in-from-top-2"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-xs font-black text-white mb-3">{selected}</p>
          {selData ? (
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Ejercicios', selData.exercises],
                ['Precisión',  selData.exercises > 0 ? `${Math.round((selData.correct / selData.exercises) * 100)}%` : '—'],
                ['XP ganado',  `+${selData.xp_earned} ⭐`],
                ['Racha',      `${selData.streak_end} 🔥`],
              ].map(([label, val]) => (
                <div key={label} className="px-3 py-2 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-base font-black text-white">{val}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest mt-0.5"
                    style={{ color: 'var(--text-3)' }}>{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-center" style={{ color: 'var(--text-3)' }}>
              Sin actividad este día
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Gráfica semanal ──────────────────────────────────────────────────────────
const WeeklyChart = ({ weekly }) => {
  if (!weekly?.length) return null;

  const last8 = weekly.slice(-8);
  const maxEx  = Math.max(...last8.map(w => w.exercises), 1);

  const weekLabel = (iso) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  return (
    <div className="card-tool p-6">
      <div className="flex items-center gap-2 mb-5">
        <BarChart2 size={15} style={{ color: 'var(--c0)' }} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Evolución semanal
        </p>
      </div>

      <div className="flex items-end gap-2 h-28">
        {last8.map((w) => (
          <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] font-black" style={{ color: accColor(w.accuracy) }}>
              {w.accuracy}%
            </span>
            <div className="w-full rounded-t-lg transition-all duration-700 relative group"
              style={{
                height: `${Math.max((w.exercises / maxEx) * 80, 4)}px`,
                background: accColor(w.accuracy),
                opacity: 0.85,
              }}>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded-lg text-[9px] font-black text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
                style={{ background: 'rgba(0,0,0,0.8)' }}>
                {w.exercises} ejercicios · +{w.xp} XP
              </div>
            </div>
            <span className="text-[8px] font-bold" style={{ color: 'var(--text-3)' }}>
              {weekLabel(w.week)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Modal de repaso ──────────────────────────────────────────────────────────
const RepasarModal = ({ weakExercises, token, onClose }) => {
  // Recopilamos los ejercicios débiles del UNITS_DATA
  const quizItems = useMemo(() => {
    const result = [];
    for (const ex of weakExercises) {
      const unit = UNITS_DATA[ex.unit_id];
      if (!unit) continue;
      const allItems = [
        ...(unit.quiz       ?? []),
        ...(unit.theoryQuiz ?? []),
        ...(unit.activeQuiz ?? []),
      ];
      const found = allItems.find(i => i.id === ex.exercise_id);
      if (found) result.push(found);
    }
    return result;
  }, [weakExercises]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: 'var(--bg-card)', border: '2px solid rgba(255,255,255,0.12)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
              Modo repaso
            </p>
            <h3 className="text-xl font-black text-white">Ejercicios débiles</h3>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-3)' }}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {quizItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🎉</p>
              <p className="font-black text-white">No se encontraron ejercicios</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
                Los ejercicios pueden ser de unidades aún no cargadas.
              </p>
            </div>
          ) : (
            <PracticeSection
              quiz={quizItems}
              unitId="error_dna_review"
              toolId="grammar"
              token={token}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Panel principal ──────────────────────────────────────────────────────────
export const ErrorDnaPanel = ({ token }) => {
  const { dna, history, loading } = useErrorDna(token);
  const [tab,          setTab]          = useState('overview'); // overview | calendar | chart | types
  const [repasarOpen,  setRepasarOpen]  = useState(false);

  if (loading) return (
    <div className="space-y-3">
      <div className="skeleton h-24 rounded-2xl" />
      <div className="skeleton h-32 rounded-2xl" />
      <div className="skeleton h-48 rounded-2xl" />
    </div>
  );

  if (!dna || dna.total_attempts === 0) return (
    <div className="card-tool p-8 flex flex-col items-center gap-3 text-center">
      <span className="text-4xl">🧬</span>
      <p className="font-black text-white">Sin datos todavía</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
        Completa algunos ejercicios y aquí verás tu perfil de errores.
      </p>
    </div>
  );

  const trend    = TREND_CONFIG[dna.trend] ?? TREND_CONFIG.no_data;
  const TrendIcon = trend.icon;

  const tabs = [
    { id: 'overview', label: '🧬 Resumen'   },
    { id: 'calendar', label: '📅 Calendario' },
    { id: 'chart',    label: '📈 Evolución'  },
    { id: 'types',    label: '🔠 Por tipo'   },
  ];

  return (
    <>
      {repasarOpen && (
        <RepasarModal
          weakExercises={dna.weak_exercises}
          token={token}
          onClose={() => setRepasarOpen(false)}
        />
      )}

      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 text-[10px] font-black uppercase tracking-widest px-2 py-2 rounded-xl transition-all"
              style={{
                background: tab === t.id ? 'var(--c0)' : 'transparent',
                color:      tab === t.id ? '#fff' : 'var(--text-3)',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Resumen ── */}
        {tab === 'overview' && (
          <div className="space-y-4">
            {/* KPIs globales */}
            <div className="card-tool p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
                  <Target size={18} style={{ color: '#a78bfa' }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Error DNA</p>
                  <h3 className="display-font text-2xl text-white leading-none">Tu perfil de errores</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  [dna.overall_accuracy + '%', 'Precisión'],
                  [dna.total_attempts, 'Intentos'],
                  [dna.total_errors, 'Errores'],
                ].map(([val, label]) => (
                  <div key={label} className="text-center px-3 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <p className="text-3xl font-black text-white">{val}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <TrendIcon size={15} style={{ color: trend.color }} />
                <span className="text-sm font-black" style={{ color: trend.color }}>{trend.label}</span>
                <span className="text-xs font-semibold ml-1" style={{ color: 'var(--text-3)' }}>esta semana</span>
              </div>
            </div>

            {/* Por unidad */}
            {dna.by_unit.length > 0 && (
              <div className="card-tool p-6">
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                  Precisión por unidad
                </p>
                <div className="space-y-4">
                  {dna.by_unit.map(u => {
                    const unit  = UNITS_DATA[u.unit_id];
                    const label = unit?.grammarTitle ?? u.unit_id;
                    return <AccuracyBar key={u.unit_id} accuracy={u.accuracy} label={label}
                      sublabel={`${u.attempts} intentos`} />;
                  })}
                </div>
              </div>
            )}

            {/* Ejercicios débiles + botón Repasar */}
            {dna.weak_exercises.length > 0 && (
              <div className="card-tool p-6">
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle size={15} style={{ color: '#fbbf24' }} />
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                    Ejercicios a repasar
                  </p>
                </div>

                {/* Stats compactas */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center px-3 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <p className="text-3xl font-black text-white">{dna.total_attempts}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>Realizados</p>
                  </div>
                  <div className="text-center px-3 py-4 rounded-2xl" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.20)' }}>
                    <p className="text-3xl font-black" style={{ color: '#f87171' }}>{dna.weak_exercises.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>Con errores</p>
                  </div>
                  <div className="text-center px-3 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <p className="text-3xl font-black" style={{ color: accColor(dna.overall_accuracy) }}>{dna.overall_accuracy}%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: 'var(--text-3)' }}>Precisión</p>
                  </div>
                </div>

                {/* Botón repasar grande */}
                <button onClick={() => setRepasarOpen(true)}
                  className="btn-tool w-full flex items-center justify-center gap-2 py-3 text-sm">
                  <BookOpen size={16} /> Repasar {dna.weak_exercises.length} ejercicios
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Calendario ── */}
        {tab === 'calendar' && (
          <CalendarView history={history?.history} />
        )}

        {/* ── Evolución semanal ── */}
        {tab === 'chart' && (
          <WeeklyChart weekly={history?.weekly} />
        )}

        {/* ── Por tipo ── */}
        {tab === 'types' && (
          <div className="card-tool p-6">
            <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
              Precisión por tipo de actividad
            </p>
            {dna.by_type?.length > 0 ? (
              <div className="space-y-4">
                {dna.by_type.map(t => (
                  <AccuracyBar key={t.type}
                    accuracy={t.accuracy}
                    label={TYPE_LABELS[t.type] ?? t.type}
                    sublabel={`${t.attempts} intentos · ${t.errors} errores`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm font-semibold text-center py-4" style={{ color: 'var(--text-3)' }}>
                Sin datos suficientes
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ErrorDnaPanel;