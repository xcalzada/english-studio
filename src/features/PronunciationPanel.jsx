/**
 * PronunciationPanel
 *
 * Self-contained panel that integrates into AudioLab.
 * Shows the text with real-time word highlighting as the user speaks,
 * color-coded by pronunciation quality, plus a final score card.
 *
 * Grade colors:
 *  correct  → green   (exact or 1 char edit)
 *  close    → amber   (2 char edit on long word)
 *  wrong    → red     (>2 edit distance)
 *  skipped  → slate   (word not said)
 *  active   → white + pulse (currently being spoken)
 *  pending  → dim white
 */
import React, { useRef, useEffect, memo } from 'react';
import { Mic, Square, RotateCcw } from 'lucide-react';
import { usePronunciation } from '../hooks/usePronunciation';

// ── Grade config ───────────────────────────────────────────────────────────────
const GRADE = {
  correct: {
    color:      '#34d399',
    background: 'rgba(52,211,153,.22)',
    glow:       '0 0 18px rgba(52,211,153,.8)',
    label:      '✓',
  },
  close: {
    color:      '#fbbf24',
    background: 'rgba(251,191,36,.18)',
    glow:       '0 0 14px rgba(251,191,36,.6)',
    label:      '~',
  },
  wrong: {
    color:      '#f87171',
    background: 'rgba(248,113,113,.18)',
    glow:       '0 0 14px rgba(248,113,113,.6)',
    label:      '✗',
  },
  skipped: {
    color:      'rgba(255,255,255,.25)',
    background: 'transparent',
    glow:       'none',
    label:      '–',
  },
  pending: {
    color:      'rgba(255,255,255,.55)',
    background: 'transparent',
    glow:       'none',
    label:      '',
  },
};

// ── ScoreRing ──────────────────────────────────────────────────────────────────
const ScoreRing = memo(({ score }) => {
  const r   = 36;
  const circ = 2 * Math.PI * r;
  const dash  = circ - (circ * score) / 100;

  const color = score >= 85 ? '#34d399'
              : score >= 60 ? '#fbbf24'
              : '#f87171';

  const label = score >= 85 ? 'Excellent!' : score >= 60 ? 'Good job' : 'Keep going';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 88 88">
        {/* Track */}
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7"/>
        {/* Progress */}
        <circle cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 1s ease, stroke .5s' }}
        />
        {/* Score number */}
        <text x="44" y="44" dominantBaseline="central" textAnchor="middle"
          style={{ fill: color, fontSize: '18px', fontWeight: 900, fontFamily: 'inherit' }}>
          {score}
        </text>
      </svg>
      <p className="text-xs font-black uppercase tracking-wider" style={{ color }}>{label}</p>
    </div>
  );
});
ScoreRing.displayName = 'ScoreRing';

// ── GradeBreakdown ────────────────────────────────────────────────────────────
const GradeBreakdown = memo(({ wordStates }) => {
  const counts = wordStates.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex gap-3 flex-wrap">
      {[['correct','✓ Correct','#34d399'], ['close','~ Close','#fbbf24'], ['wrong','✗ Wrong','#f87171'], ['skipped','– Skipped','#64748b']].map(([grade, label, color]) => (
        counts[grade] ? (
          <div key={grade} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
               style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
            <span className="text-[11px] font-black" style={{ color }}>{label}</span>
            <span className="text-[11px] font-black" style={{ color: '#94a3b8' }}>×{counts[grade]}</span>
          </div>
        ) : null
      ))}
    </div>
  );
});
GradeBreakdown.displayName = 'GradeBreakdown';

// ── PronunciationKaraoke ──────────────────────────────────────────────────────
const PronunciationKaraoke = memo(({ wordStates, activeIdx, phase, interimText }) => {
  const containerRef = useRef(null);
  const wordRefs     = useRef([]);

  // Auto-scroll active word into view
  useEffect(() => {
    if (activeIdx < 0) return;
    const el  = wordRefs.current[activeIdx];
    const con = containerRef.current;
    if (!el || !con) return;
    const target = el.getBoundingClientRect().top - con.getBoundingClientRect().top
      - con.clientHeight / 2 + el.clientHeight / 2;
    con.scrollBy({ top: target, behavior: 'smooth' });
  }, [activeIdx]);

  const isActive = phase === 'listening';

  return (
    <div ref={containerRef}
         style={{ maxHeight: '160px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', padding: '4px 0' }}>
      <p className="font-serif italic text-xl leading-[2.6] tracking-wide text-center select-none"
         aria-live="off">
        {wordStates.map(({ word, grade, recognized }, i) => {
          const isCurrentlyActive = isActive && i === activeIdx;
          const cfg = GRADE[grade] ?? GRADE.pending;
          return (
            <React.Fragment key={i}>
              <span
                ref={el => { wordRefs.current[i] = el; }}
                title={recognized && recognized !== word.toLowerCase() ? `You said: "${recognized}"` : ''}
                style={{
                  display:      'inline-block',
                  padding:      '0 3px',
                  borderRadius: '5px',
                  transition:   'all .15s',
                  position:     'relative',
                  ...(isCurrentlyActive ? {
                    color:      '#fff',
                    background: 'rgba(255,255,255,.15)',
                    fontWeight: 900,
                    transform:  'scale(1.1)',
                    animation:  'pulse 0.8s infinite',
                  } : {
                    color:       cfg.color,
                    background:  cfg.background,
                    fontWeight:  grade === 'correct' || grade === 'close' ? 700 : 400,
                    textShadow:  grade !== 'pending' && grade !== 'skipped' ? cfg.glow : 'none',
                  }),
                }}
              >
                {word}
                {/* Grade indicator badge */}
                {grade !== 'pending' && grade !== 'skipped' && !isCurrentlyActive && (
                  <span style={{
                    position:   'absolute',
                    top:        '-8px',
                    right:      '-2px',
                    fontSize:   '8px',
                    fontWeight: 900,
                    color:      cfg.color,
                    lineHeight: 1,
                  }}>
                    {cfg.label}
                  </span>
                )}
              </span>
              {' '}
            </React.Fragment>
          );
        })}
      </p>

      {/* Interim text indicator */}
      {interimText && (
        <p className="text-center text-xs italic mt-1" style={{ color: 'rgba(255,255,255,.3)' }}>
          hearing: "{interimText}"
        </p>
      )}
    </div>
  );
});
PronunciationKaraoke.displayName = 'PronunciationKaraoke';

// ── PronunciationPanel (main export) ─────────────────────────────────────────
const PronunciationPanel = ({ text }) => {
  const {
    supported, phase, countdown, wordStates,
    activeIdx, score, interimText,
    isListening, start, stop, reset,
  } = usePronunciation(text);

  if (!supported) return (
    <div className="p-4 text-center text-xs" style={{ color: '#64748b' }}>
      Speech recognition not supported. Use Chrome or Edge.
    </div>
  );

  const idleOrDone = phase === 'idle' || phase === 'done';

  return (
    <div className="space-y-4">

      {/* ── Status bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mic indicator */}
          <div style={{
            width:      '36px',
            height:     '36px',
            borderRadius: '50%',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: isListening
              ? 'rgba(239,68,68,.2)'
              : phase === 'countdown'
              ? 'rgba(251,191,36,.15)'
              : 'rgba(255,255,255,.06)',
            border: `2px solid ${isListening ? 'rgba(239,68,68,.5)' : phase === 'countdown' ? 'rgba(251,191,36,.4)' : 'rgba(255,255,255,.1)'}`,
            boxShadow: isListening ? '0 0 16px rgba(239,68,68,.4)' : 'none',
            transition: 'all .3s',
          }}>
            {phase === 'countdown'
              ? <span style={{ fontSize: '16px', fontWeight: 900, color: '#fbbf24' }}>{countdown}</span>
              : <Mic size={16} style={{ color: isListening ? '#f87171' : '#64748b' }}/>}
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-widest"
               style={{ color: isListening ? '#f87171' : phase === 'countdown' ? '#fbbf24' : phase === 'done' ? '#34d399' : '#64748b' }}>
              {phase === 'idle'      ? 'Ready to practice'
               : phase === 'countdown' ? 'Get ready…'
               : phase === 'listening' ? '● Recording'
               : 'Done'}
            </p>
            <p className="text-[10px]" style={{ color: '#475569' }}>
              {phase === 'idle'      ? 'Read the sentence aloud as it highlights'
               : phase === 'countdown' ? `Starting in ${countdown}…`
               : phase === 'listening' ? 'Speak the text — words will light up'
               : 'See your results below'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-shrink-0">
          {(phase === 'idle' || phase === 'done') && (
            <button onClick={start}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105"
              style={{ background: 'rgba(239,68,68,.2)', border: '1px solid rgba(239,68,68,.4)', color: '#f87171' }}>
              <Mic size={13}/> {phase === 'done' ? 'Try again' : 'Start'}
            </button>
          )}
          {isListening && (
            <button onClick={stop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black"
              style={{ background: 'rgba(239,68,68,.2)', border: '1px solid rgba(239,68,68,.4)', color: '#f87171' }}>
              <Square size={13} fill="currentColor"/> Done
            </button>
          )}
          {phase === 'done' && (
            <button onClick={reset}
              className="p-2 rounded-xl text-xs font-black transition-colors"
              style={{ background: 'rgba(255,255,255,.05)', color: '#64748b', border: '1px solid rgba(255,255,255,.07)' }}>
              <RotateCcw size={13}/>
            </button>
          )}
        </div>
      </div>

      {/* ── Live / result karaoke ─────────────────────────────────────── */}
      <div className="rounded-2xl px-4 py-3"
           style={{ background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.05)' }}>
        <PronunciationKaraoke
          wordStates={wordStates}
          activeIdx={activeIdx}
          phase={phase}
          interimText={interimText}
        />
      </div>

      {/* ── Score card (shown after done) ─────────────────────────────── */}
      {phase === 'done' && score !== null && (
        <div className="rounded-2xl p-5 animate-in fade-in zoom-in duration-500"
             style={{
               background: score >= 85 ? 'rgba(52,211,153,.07)'
                         : score >= 60 ? 'rgba(251,191,36,.07)'
                         : 'rgba(248,113,113,.07)',
               border: `1px solid ${score >= 85 ? 'rgba(52,211,153,.25)'
                                  : score >= 60 ? 'rgba(251,191,36,.25)'
                                  : 'rgba(248,113,113,.25)'}`,
             }}>
          <div className="flex items-center gap-6 mb-4">
            <ScoreRing score={score}/>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                Pronunciation Score
              </p>
              <GradeBreakdown wordStates={wordStates}/>
            </div>
          </div>

          {/* Word-by-word breakdown — only show errors/close */}
          {wordStates.some(s => s.grade === 'wrong' || s.grade === 'close') && (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                Review
              </p>
              <div className="flex flex-wrap gap-2">
                {wordStates
                  .filter(s => s.grade === 'wrong' || s.grade === 'close')
                  .map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                         style={{
                           background: s.grade === 'wrong' ? 'rgba(248,113,113,.1)' : 'rgba(251,191,36,.1)',
                           border:     `1px solid ${s.grade === 'wrong' ? 'rgba(248,113,113,.3)' : 'rgba(251,191,36,.3)'}`,
                         }}>
                      <span className="text-xs font-black" style={{ color: '#f1f5f9' }}>{s.word}</span>
                      {s.recognized && (
                        <span className="text-[10px]" style={{ color: '#64748b' }}>
                          → "{s.recognized}"
                        </span>
                      )}
                      <span className="text-[10px] font-black"
                            style={{ color: s.grade === 'wrong' ? '#f87171' : '#fbbf24' }}>
                        {GRADE[s.grade].label}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      {phase !== 'idle' && (
        <div className="flex gap-3 flex-wrap">
          {[['#34d399','Correct'], ['#fbbf24','Close'], ['#f87171','Wrong'], ['rgba(255,255,255,.25)','Skipped']].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }}/>
              <span className="text-[10px]" style={{ color: '#64748b' }}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PronunciationPanel;
