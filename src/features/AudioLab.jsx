/**
 * AudioLab — Language Learning Audio Player
 *
 * Features:
 *  • Waveform visualizer (rAF, 60fps)
 *  • Karaoke with word-by-word highlight (rAF timing model)
 *  • Clickable words → seek to that position
 *  • Auto-scroll karaoke
 *  • A-B loop — set start/end points, repeats that section
 *  • Loop mode — infinite repeat
 *  • Shadowing mode — record yourself, compare with TTS
 *  • Word definition tooltip on hover (Free Dictionary API)
 *  • Fullscreen karaoke overlay
 *  • Voice selector with gender/accent filters
 *  • Seekable progress bar (drag before or during playback)
 *  • Speed presets
 */
import React, {
  useState, useEffect, useRef, useCallback, useMemo, memo,
} from 'react';
import ReactDOM from 'react-dom';
import {
  Play, Pause, Square, RotateCcw, Gauge,
  Headphones, CheckCircle, XCircle,
  ChevronDown, ChevronUp, Mic2, Repeat, Maximize2, X,
  Mic, BookOpen,
} from 'lucide-react';
import { useSpeech }    from '../hooks/useSpeech';
import { useVoices }    from '../hooks/useVoices';
import { useShadowing }      from '../hooks/useShadowing';
import PronunciationPanel      from './PronunciationPanel';

// ─── Word definition cache (module-level, survives re-renders) ─────────────────
const DEF_CACHE = new Map();

async function fetchDefinition(word) {
  const clean = word.toLowerCase().replace(/[^a-z'-]/g, '');
  if (!clean || DEF_CACHE.has(clean)) return DEF_CACHE.get(clean) ?? null;
  DEF_CACHE.set(clean, null); // prevent duplicate in-flight requests
  try {
    const res  = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${clean}`);
    if (!res.ok) { DEF_CACHE.set(clean, null); return null; }
    const data = await res.json();
    const entry = data?.[0];
    const ipa   = entry?.phonetics?.find(p => p.text)?.text ?? null;
    const def   = entry?.meanings?.[0]?.definitions?.[0]?.definition ?? null;
    const partOfSpeech = entry?.meanings?.[0]?.partOfSpeech ?? null;
    const result = ipa || def ? { ipa, def, partOfSpeech } : null;
    DEF_CACHE.set(clean, result);
    return result;
  } catch {
    DEF_CACHE.set(clean, null);
    return null;
  }
}

// ─── WordTooltip ──────────────────────────────────────────────────────────────
const WordTooltip = memo(({ word, anchorRect, onClose }) => {
  const [info, setInfo] = useState(DEF_CACHE.has(word.toLowerCase()) ? DEF_CACHE.get(word.toLowerCase()) : 'loading');
  const ref = useRef(null);

  useEffect(() => {
    if (info !== 'loading') return;
    fetchDefinition(word).then(result => {
      setInfo(result ?? null);
    });
  }, [word, info]);

  // Close on outside click
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', h, true);
    return () => document.removeEventListener('mousedown', h, true);
  }, [onClose]);

  if (!anchorRect) return null;

  const tooltipW = 220;
  const margin   = 8;
  let left = anchorRect.left + anchorRect.width / 2 - tooltipW / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tooltipW - margin));
  const top = anchorRect.top - 8; // above the word

  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{
        position:     'fixed',
        top,
        left,
        width:        tooltipW,
        zIndex:       99997,
        background:   '#0f172a',
        border:       '1.5px solid rgba(52,211,153,.35)',
        borderRadius: '12px',
        padding:      '10px 14px',
        boxShadow:    '0 16px 40px rgba(0,0,0,.8)',
        transform:    'translateY(-100%)',
        pointerEvents: 'auto',
      }}
    >
      {info === 'loading' ? (
        <p style={{ color: '#64748b', fontSize: '11px', fontStyle: 'italic' }}>Loading…</p>
      ) : !info ? (
        <p style={{ color: '#64748b', fontSize: '11px' }}>No definition found</p>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontWeight: 900, fontSize: '13px', color: '#f1f5f9' }}>{word}</span>
            {info.partOfSpeech && (
              <span style={{ fontSize: '10px', color: 'var(--main,#34d399)', fontStyle: 'italic' }}>
                {info.partOfSpeech}
              </span>
            )}
          </div>
          {info.ipa && (
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', letterSpacing: '0.05em' }}>
              {info.ipa}
            </p>
          )}
          {info.def && (
            <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: 1.5 }}>{info.def}</p>
          )}
        </>
      )}
      {/* Arrow */}
      <div style={{
        position:    'absolute',
        bottom:      '-6px',
        left:        '50%',
        transform:   'translateX(-50%)',
        width:       '12px',
        height:      '12px',
        background:  '#0f172a',
        border:      '1.5px solid rgba(52,211,153,.35)',
        borderTop:   'none',
        borderLeft:  'none',
        rotate:      '45deg',
      }} />
    </div>,
    document.body,
  );
});
WordTooltip.displayName = 'WordTooltip';

// ─── WaveformViz ──────────────────────────────────────────────────────────────
const BAR_COUNT = 40;

const WaveformViz = memo(({ text, energy, playing, height = 48 }) => {
  const baseHeights = useMemo(() => {
    const h = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      let v = 0;
      for (let j = 0; j < text.length; j++) v += text.charCodeAt(j) * (i + 1) * (j + 1);
      const center = 1 - Math.abs((i / (BAR_COUNT - 1)) - 0.5) * 1.3;
      h.push(0.1 + ((v % 100) / 100) * 0.55 + center * 0.35);
    }
    return h;
  }, [text]);

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${BAR_COUNT * 6} ${height}`} preserveAspectRatio="none">
      {baseHeights.map((base, i) => {
        const phase  = i * 0.38;
        const osc    = playing ? Math.abs(Math.sin(energy * Math.PI * 3.5 + phase)) : 0;
        const barH   = playing ? Math.max(2, (base * 0.35 + osc * base * 0.65) * height) : 2;
        const x      = i * 6 + 1;
        const y      = (height - barH) / 2;
        const t      = 1 - Math.abs((i / (BAR_COUNT - 1)) - 0.5) * 2;
        const r      = Math.round(52  + (139 - 52)  * (1 - t));
        const g      = Math.round(211 + (92  - 211) * (1 - t));
        const b      = Math.round(153 + (246 - 153) * (1 - t));
        return (
          <rect key={i} x={x} y={y} width={4} height={barH} rx={2}
            fill={`rgb(${r},${g},${b})`}
            opacity={playing ? 0.8 + t * 0.2 : 0.2}
            style={{ transition: playing ? 'none' : 'height .5s, y .5s, opacity .5s' }}
          />
        );
      })}
    </svg>
  );
});
WaveformViz.displayName = 'WaveformViz';

// ─── KaraokeDisplay ───────────────────────────────────────────────────────────
const KaraokeDisplay = memo(({ text, karaokeCharPos, playing, onWordClick, compact = false }) => {
  const containerRef = useRef(null);
  const wordRefs     = useRef([]);
  const [tooltip, setTooltip] = useState(null); // { word, rect }

  const tokens = useMemo(() => {
    const result = [];
    const re = /\S+/g;
    let m;
    while ((m = re.exec(text)) !== null)
      result.push({ word: m[0], start: m.index, end: m.index + m[0].length });
    return result;
  }, [text]);

  // Binary search — O(log n)
  const activeIdx = useMemo(() => {
    if (karaokeCharPos < 0 || tokens.length === 0) return -1;
    let lo = 0, hi = tokens.length - 1, best = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (tokens[mid].start <= karaokeCharPos) { best = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    return best;
  }, [tokens, karaokeCharPos]);

  // Auto-scroll active word into center
  useEffect(() => {
    if (activeIdx < 0 || !playing) return;
    const el  = wordRefs.current[activeIdx];
    const con = containerRef.current;
    if (!el || !con) return;
    const target = el.getBoundingClientRect().top - con.getBoundingClientRect().top
      - con.clientHeight / 2 + el.clientHeight / 2;
    con.scrollBy({ top: target, behavior: 'smooth' });
  }, [activeIdx, playing]);

  const handleWordClick = (e, token) => {
    // Left click → seek
    onWordClick?.(token.start);
  };

  const handleWordRightClick = (e, token) => {
    e.preventDefault();
    const rawWord = token.word.replace(/[^a-zA-Z'-]/g, '');
    if (!rawWord) return;
    setTooltip({ word: rawWord, rect: e.currentTarget.getBoundingClientRect() });
  };

  const fontSize = compact ? '1.1rem' : '1.5rem';

  return (
    <>
      <div ref={containerRef}
           style={{ maxHeight: compact ? '130px' : '220px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', padding: '4px 0' }}>
        <p className="font-serif italic tracking-wide select-none text-center"
           style={{ fontSize, lineHeight: 2.5 }} aria-live="off">
          {tokens.map((token, i) => {
            const isActive = i === activeIdx;
            const isPast   = activeIdx > -1 && i < activeIdx;
            return (
              <React.Fragment key={i}>
                <span
                  ref={el => { wordRefs.current[i] = el; }}
                  onClick={e => handleWordClick(e, token)}
                  onContextMenu={e => handleWordRightClick(e, token)}
                  title="Click to play from here · Right-click for definition"
                  style={{
                    display:      'inline-block',
                    padding:      '0 3px',
                    borderRadius: '5px',
                    cursor:       'pointer',
                    transition:   'color .06s, background .06s, transform .08s, text-shadow .06s',
                    ...(isActive ? {
                      color:      'var(--main,#34d399)',
                      background: 'rgba(52,211,153,.22)',
                      fontWeight: 900,
                      transform:  'scale(1.14)',
                      textShadow: '0 0 22px rgba(52,211,153,.9), 0 0 50px rgba(52,211,153,.3)',
                    } : isPast ? {
                      color: 'rgba(255,255,255,.28)',
                    } : {
                      color: 'rgba(255,255,255,.8)',
                    }),
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.background = 'rgba(255,255,255,.07)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.background = '';
                    }
                  }}
                >
                  {token.word}
                </span>
                {' '}
              </React.Fragment>
            );
          })}
        </p>
      </div>

      {tooltip && (
        <WordTooltip
          word={tooltip.word}
          anchorRect={tooltip.rect}
          onClose={() => setTooltip(null)}
        />
      )}
    </>
  );
});
KaraokeDisplay.displayName = 'KaraokeDisplay';

// ─── ABSeekBar ────────────────────────────────────────────────────────────────
/**
 * Seek bar with optional A-B loop markers.
 * - Normal thumb: current playback position
 * - A marker (green): loop start
 * - B marker (violet): loop end
 * - Highlighted region between A and B when AB mode active
 */
const ABSeekBar = memo(({ progress, onSeek, isActive, abLoop, onSetA, onSetB }) => {
  const [dragging, setDragging]     = useState(null); // null | 'pos' | 'a' | 'b'
  const [localPos, setLocalPos]     = useState(progress);
  const [localA,   setLocalA]       = useState(abLoop.a);
  const [localB,   setLocalB]       = useState(abLoop.b);
  const trackRef = useRef(null);

  useEffect(() => { if (dragging !== 'pos') setLocalPos(progress); }, [progress, dragging]);
  useEffect(() => { if (dragging !== 'a')   setLocalA(abLoop.a); }, [abLoop.a, dragging]);
  useEffect(() => { if (dragging !== 'b')   setLocalB(abLoop.b); }, [abLoop.b, dragging]);

  const displayPos = dragging === 'pos' ? localPos : progress;
  const displayA   = dragging === 'a'   ? localA   : abLoop.a;
  const displayB   = dragging === 'b'   ? localB   : abLoop.b;

  const pctFromEvent = (e) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  };

  const handleMouseDown = (type) => (e) => {
    e.stopPropagation();
    setDragging(type);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const pct = pctFromEvent(e);
      if (dragging === 'pos') setLocalPos(pct);
      if (dragging === 'a')   setLocalA(Math.min(pct, displayB - 5));
      if (dragging === 'b')   setLocalB(Math.max(pct, displayA + 5));
    };
    const onUp = (e) => {
      const pct = pctFromEvent(e);
      if (dragging === 'pos') { onSeek(pct); }
      if (dragging === 'a')   { onSetA(Math.min(pct, abLoop.b - 5)); }
      if (dragging === 'b')   { onSetB(Math.max(pct, abLoop.a + 5)); }
      setDragging(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, [dragging, displayA, displayB, abLoop, onSeek, onSetA, onSetB]);

  const TRACK_H = 10;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"
           style={{ color: 'var(--main,#34d399)' }}>
        <span>{abLoop.enabled ? `A ${Math.round(displayA)}%` : '0%'}</span>
        <span>
          {Math.round(displayPos)}%
          {dragging === 'pos' && <span className="ml-1.5 font-semibold normal-case tracking-normal" style={{ color: '#64748b' }}>release to seek</span>}
        </span>
        <span style={{ color: abLoop.enabled ? '#8b5cf6' : 'var(--main,#34d399)' }}>
          {abLoop.enabled ? `B ${Math.round(displayB)}%` : '100%'}
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative flex items-center"
        style={{ height: '20px', cursor: 'pointer' }}
        onMouseDown={e => {
          const pct = pctFromEvent(e);
          setLocalPos(pct);
          setDragging('pos');
        }}
      >
        {/* Base track */}
        <div className="absolute inset-x-0 rounded-full pointer-events-none"
             style={{ height: TRACK_H, background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.07)', top: '50%', transform: 'translateY(-50%)' }}>
          {/* Playback fill */}
          <div className="h-full rounded-full"
               style={{
                 width: `${displayPos}%`,
                 background: 'linear-gradient(90deg, var(--main,#34d399), rgba(139,92,246,.8))',
                 boxShadow: dragging === 'pos' ? '0 0 14px rgba(52,211,153,.5)' : '0 0 6px rgba(52,211,153,.2)',
                 transition: dragging === 'pos' ? 'none' : 'width .08s',
               }} />
          {/* A-B region highlight */}
          {abLoop.enabled && (
            <div className="absolute h-full pointer-events-none"
                 style={{
                   left:       `${displayA}%`,
                   width:      `${displayB - displayA}%`,
                   background: 'rgba(139,92,246,.35)',
                   top: 0,
                   borderRadius: '0 4px 4px 0',
                 }} />
          )}
        </div>

        {/* A marker */}
        {abLoop.enabled && (
          <div
            onMouseDown={e => { e.stopPropagation(); setDragging('a'); }}
            style={{
              position:    'absolute',
              left:        `${displayA}%`,
              top:         '50%',
              transform:   'translate(-50%, -50%)',
              width:       '14px',
              height:      '22px',
              background:  'var(--main,#34d399)',
              borderRadius: '4px',
              cursor:      'ew-resize',
              zIndex:      3,
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
              boxShadow:   dragging === 'a' ? '0 0 14px rgba(52,211,153,.8)' : '0 0 6px rgba(52,211,153,.5)',
            }}
            title="Drag to set loop start (A)"
          >
            <span style={{ fontSize: '8px', fontWeight: 900, color: '#0f172a' }}>A</span>
          </div>
        )}

        {/* B marker */}
        {abLoop.enabled && (
          <div
            onMouseDown={e => { e.stopPropagation(); setDragging('b'); }}
            style={{
              position:    'absolute',
              left:        `${displayB}%`,
              top:         '50%',
              transform:   'translate(-50%, -50%)',
              width:       '14px',
              height:      '22px',
              background:  '#8b5cf6',
              borderRadius: '4px',
              cursor:      'ew-resize',
              zIndex:      3,
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
              boxShadow:   dragging === 'b' ? '0 0 14px rgba(139,92,246,.8)' : '0 0 6px rgba(139,92,246,.5)',
            }}
            title="Drag to set loop end (B)"
          >
            <span style={{ fontSize: '8px', fontWeight: 900, color: '#fff' }}>B</span>
          </div>
        )}

        {/* Playback thumb */}
        <div
          onMouseDown={e => { e.stopPropagation(); setDragging('pos'); }}
          style={{
            position:    'absolute',
            left:        `${displayPos}%`,
            top:         '50%',
            transform:   'translate(-50%, -50%)',
            width:       dragging === 'pos' ? '18px' : '14px',
            height:      dragging === 'pos' ? '18px' : '14px',
            background:  '#fff',
            borderRadius: '50%',
            border:      '3px solid var(--main,#34d399)',
            cursor:      'ew-resize',
            zIndex:      4,
            boxShadow:   `0 0 ${dragging === 'pos' ? 18 : 8}px rgba(52,211,153,.8)`,
            transition:  'width .1s, height .1s',
          }}
        />
      </div>

      {!isActive && displayPos === 0 && (
        <p className="text-[10px] text-center" style={{ color: '#334155' }}>
          drag to set start · click any word to seek · right-click word for definition
        </p>
      )}
    </div>
  );
});
ABSeekBar.displayName = 'ABSeekBar';

// ─── ShadowingPanel ───────────────────────────────────────────────────────────
const ShadowingPanel = memo(({
  shadowState, countdown, audioUrl, duration, supported,
  onStart, onPlayTTS, onPlayRecording, onStop, onReset,
  playing, waveformEnergy, text,
}) => {
  if (!supported) return (
    <div className="p-4 text-center text-xs" style={{ color: '#64748b' }}>
      Microphone not supported in this browser.
    </div>
  );

  const stateConfig = {
    idle: {
      icon:  '🎙',
      label: 'Shadow Mode',
      desc:  'Record yourself saying the same sentence and compare with the TTS voice.',
    },
    countdown: {
      icon:  `${countdown}`,
      label: 'Get ready…',
      desc:  'Starting in a moment — read the text above',
    },
    recording: {
      icon:  '🔴',
      label: 'Recording',
      desc:  'Speak along with the voice. Recording automatically stops when audio ends.',
    },
    recorded: {
      icon:  '✅',
      label: 'Recording saved',
      desc:  `${Math.round(duration)}s recorded. Compare your pronunciation:`,
    },
    'playing-tts': {
      icon:  '🔊',
      label: 'Playing TTS',
      desc:  'Listening to the reference voice…',
    },
    'playing-shadow': {
      icon:  '🎙',
      label: 'Playing your recording',
      desc:  'Listening to yourself…',
    },
  };

  const cfg = stateConfig[shadowState] ?? stateConfig.idle;
  const isActive = ['countdown','recording','playing-tts','playing-shadow'].includes(shadowState);

  return (
    <div className="rounded-2xl overflow-hidden"
         style={{ border: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.25)' }}>

      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-3"
           style={{ borderBottom: isActive ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
        <span style={{
          fontSize:   shadowState === 'countdown' ? '24px' : '16px',
          minWidth:   '24px',
          textAlign:  'center',
          fontWeight: 900,
          color:      shadowState === 'recording' ? '#ef4444' : 'var(--main,#34d399)',
          ...(shadowState === 'recording' ? { animation: 'pulse 1s infinite' } : {}),
        }}>
          {cfg.icon}
        </span>
        <div className="flex-1">
          <p className="text-[11px] font-black uppercase tracking-widest"
             style={{ color: 'var(--main,#34d399)' }}>{cfg.label}</p>
          <p className="text-[10px]" style={{ color: '#64748b' }}>{cfg.desc}</p>
        </div>
        {shadowState === 'idle' && (
          <button onClick={onStart}
            className="px-3 py-1.5 rounded-xl text-[11px] font-black transition-all hover:scale-105"
            style={{ background: 'rgba(52,211,153,.15)', border: '1px solid rgba(52,211,153,.35)', color: 'var(--main,#34d399)' }}>
            Start →
          </button>
        )}
        {isActive && shadowState !== 'countdown' && (
          <button onClick={onStop}
            className="px-3 py-1.5 rounded-xl text-[11px] font-black"
            style={{ background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.3)', color: '#ef4444' }}>
            Stop
          </button>
        )}
      </div>

      {/* Countdown display */}
      {shadowState === 'countdown' && (
        <div className="flex items-center justify-center py-6">
          <div style={{
            fontSize:   '64px',
            fontWeight: 900,
            color:      'var(--main,#34d399)',
            textShadow: '0 0 40px rgba(52,211,153,.6)',
            lineHeight: 1,
          }}>
            {countdown}
          </div>
        </div>
      )}

      {/* Recording waveform */}
      {shadowState === 'recording' && (
        <div className="px-5 pb-4 pt-2">
          <WaveformViz text={text} energy={waveformEnergy} playing={true} height={36} />
        </div>
      )}

      {/* Comparison buttons */}
      {['recorded','playing-tts','playing-shadow'].includes(shadowState) && (
        <div className="px-5 pb-4 pt-3 flex gap-3">
          <button onClick={onPlayTTS}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all"
            style={{
              background:  shadowState === 'playing-tts' ? 'rgba(52,211,153,.2)' : 'rgba(255,255,255,.06)',
              border:      `1px solid ${shadowState === 'playing-tts' ? 'rgba(52,211,153,.4)' : 'rgba(255,255,255,.1)'}`,
              color:       shadowState === 'playing-tts' ? 'var(--main,#34d399)' : '#94a3b8',
            }}>
            🔊 TTS Voice
          </button>
          <button onClick={onPlayRecording}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all"
            style={{
              background:  shadowState === 'playing-shadow' ? 'rgba(139,92,246,.2)' : 'rgba(255,255,255,.06)',
              border:      `1px solid ${shadowState === 'playing-shadow' ? 'rgba(139,92,246,.4)' : 'rgba(255,255,255,.1)'}`,
              color:       shadowState === 'playing-shadow' ? '#c4b5fd' : '#94a3b8',
            }}>
            🎙 Your Voice
          </button>
          <button onClick={onReset}
            className="px-4 py-3 rounded-xl text-xs font-black transition-colors"
            style={{ background: 'rgba(255,255,255,.05)', color: '#64748b', border: '1px solid rgba(255,255,255,.07)' }}>
            ↺
          </button>
        </div>
      )}
    </div>
  );
});
ShadowingPanel.displayName = 'ShadowingPanel';

// ─── FullscreenKaraoke ────────────────────────────────────────────────────────
const FullscreenKaraoke = memo(({ text, karaokeCharPos, playing, waveformEnergy, onClose, onWordClick }) => {
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      background: 'radial-gradient(ellipse at 50% 65%, #0d1f1a 0%, #030712 65%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '3rem 2rem', gap: '2rem',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)',
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#94a3b8',
      }}>
        <X size={18}/>
      </button>
      <p style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(52,211,153,.5)' }}>
        ▶ karaoke · click any word to jump
      </p>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        <WaveformViz text={text} energy={waveformEnergy} playing={playing} height={64}/>
      </div>
      <div style={{ width: '100%', maxWidth: '740px' }}>
        <KaraokeDisplay text={text} karaokeCharPos={karaokeCharPos} playing={playing} onWordClick={onWordClick} compact={false}/>
      </div>
      <div style={{
        position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(52,211,153,.07) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(30px)',
        opacity: playing ? 1 : 0, transition: 'opacity .8s',
      }}/>
    </div>,
    document.body,
  );
});
FullscreenKaraoke.displayName = 'FullscreenKaraoke';

// ─── VoiceDropdown portal ─────────────────────────────────────────────────────
const VoiceDropdown = memo(({ triggerRef, grouped, filterAccent, filterGender, onAccent, onGender, filtered, selectedVoice, onSelect, onClose }) => {
  const dropRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 300 });
  useEffect(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const w = 300;
    setPos({ top: r.bottom + 6, left: Math.max(8, Math.min(r.left, window.innerWidth - w - 8)), width: w });
  }, [triggerRef]);
  useEffect(() => {
    const onDown   = (e) => { if (dropRef.current && !dropRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) onClose(); };
    const onScroll = () => onClose();
    document.addEventListener('mousedown', onDown, true);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => { document.removeEventListener('mousedown', onDown, true); window.removeEventListener('scroll', onScroll, true); };
  }, [onClose, triggerRef]);
  const accentKeys = Object.keys(grouped);
  const gI = { female: '♀', male: '♂', unknown: '◈' };
  const gC = { female: '#f472b6', male: '#60a5fa', unknown: '#94a3b8' };
  const clean = n => n.replace(/^(Google|Microsoft|Apple)\s+/i, '');
  return ReactDOM.createPortal(
    <div ref={dropRef} style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width, maxHeight: '360px', zIndex: 99999, display: 'flex', flexDirection: 'column', background: '#0f172a', border: '1.5px solid rgba(255,255,255,.15)', borderRadius: '16px', boxShadow: '0 24px 56px rgba(0,0,0,.9)', overflow: 'hidden' }}>
      <div className="flex gap-2 p-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,.07)', background: '#0f172a' }}>
        <select value={filterAccent} onChange={e => onAccent(e.target.value)} className="flex-1 text-xs font-bold rounded-lg px-2 py-1.5 appearance-none" style={{ background: '#1e293b', color: '#cbd5e1', border: '1px solid rgba(255,255,255,.1)' }}>
          <option value="all">All accents</option>
          {accentKeys.map(a => <option key={a} value={a}>{grouped[a].flag} {a}</option>)}
        </select>
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.1)' }}>
          {['all','female','male'].map(g => (
            <button key={g} onClick={() => onGender(g)} className="px-2.5 py-1 text-xs font-black"
              style={filterGender === g ? { background: 'var(--main,#34d399)', color: '#0f172a' } : { background: '#1e293b', color: '#94a3b8' }}>
              {g === 'all' ? 'All' : g === 'female' ? '♀' : '♂'}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto p-2" style={{ background: '#0f172a', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,.1) transparent' }}>
        {filtered.length === 0 ? <p className="text-xs text-center py-6" style={{ color: '#64748b' }}>No voices match</p>
          : filtered.map(v => {
              const isSel = selectedVoice?.name === v.name;
              return (
                <button key={v.name} onClick={() => { onSelect(v); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left mb-px"
                  style={isSel ? { background: 'rgba(52,211,153,.15)', border: '1px solid rgba(52,211,153,.3)' } : { border: '1px solid transparent' }}
                  onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'rgba(255,255,255,.07)'; }}
                  onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}>
                  <span className="text-sm">{v.accent?.flag ?? '🌐'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: '#f1f5f9' }}>{clean(v.name)}</p>
                    <p className="text-[10px]" style={{ color: '#64748b' }}>{v.accent?.label ?? v.lang}</p>
                  </div>
                  <span className="text-xs" style={{ color: gC[v.gender ?? 'unknown'] }}>{gI[v.gender ?? 'unknown']}</span>
                  <span className="text-[11px]" title={v.localService ? 'Local' : 'Network'}>{v.localService ? '⚡' : '🌐'}</span>
                  {isSel && <span className="text-[10px] font-black" style={{ color: 'var(--main,#34d399)' }}>✓</span>}
                </button>
              );
            })}
      </div>
    </div>,
    document.body,
  );
});
VoiceDropdown.displayName = 'VoiceDropdown';

const VoiceSelector = memo(({ selectedVoice, onSelect, grouped }) => {
  const [open,         setOpen]         = useState(false);
  const [filterGender, setFilterGender] = useState('all');
  const [filterAccent, setFilterAccent] = useState('all');
  const triggerRef = useRef(null);
  const filtered = useMemo(() => {
    const all = [];
    for (const [label, group] of Object.entries(grouped)) {
      if (filterAccent !== 'all' && label !== filterAccent) continue;
      for (const v of group.voices) {
        if (filterGender !== 'all' && v.gender !== filterGender) continue;
        all.push(v);
      }
    }
    return all;
  }, [grouped, filterAccent, filterGender]);
  const gI = { female: '♀', male: '♂', unknown: '◈' };
  const gC = { female: '#f472b6', male: '#60a5fa', unknown: '#94a3b8' };
  const clean = n => n.replace(/^(Google|Microsoft|Apple)\s+/i, '');
  return (
    <div className="flex flex-col items-end gap-1">
      <button ref={triggerRef} onClick={() => setOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
        style={{ background: open ? 'rgba(52,211,153,.12)' : 'rgba(255,255,255,.07)', border: `1px solid ${open ? 'rgba(52,211,153,.35)' : 'rgba(255,255,255,.1)'}`, color: '#cbd5e1', flexShrink: 0 }}>
        <span>🎙</span>
        <span className="max-w-[140px] truncate">{selectedVoice ? `${selectedVoice.accent?.flag ?? ''} ${clean(selectedVoice.name)}` : 'Select voice'}</span>
        {selectedVoice && <><span style={{ color: gC[selectedVoice.gender ?? 'unknown'], fontSize: '11px' }}>{gI[selectedVoice.gender ?? 'unknown']}</span><span style={{ fontSize: '11px' }}>{selectedVoice.localService ? '⚡' : '🌐'}</span></>}
        {open ? <ChevronUp size={11}/> : <ChevronDown size={11}/>}
      </button>
      {open && <VoiceDropdown triggerRef={triggerRef} grouped={grouped} filterAccent={filterAccent} filterGender={filterGender} onAccent={setFilterAccent} onGender={setFilterGender} filtered={filtered} selectedVoice={selectedVoice} onSelect={onSelect} onClose={() => setOpen(false)}/>}
    </div>
  );
});
VoiceSelector.displayName = 'VoiceSelector';

// ─── SpeedControl ─────────────────────────────────────────────────────────────
const SPEED_PRESETS = [0.5, 0.75, 1.0, 1.25, 1.5];
const SpeedControl = memo(({ speed, onChange }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <Gauge size={13} style={{ color: 'var(--main,#34d399)' }}/>
    <div className="flex gap-1">
      {SPEED_PRESETS.map(s => (
        <button key={s} onClick={() => onChange(s)} className="px-2 py-0.5 rounded-lg text-[11px] font-black transition-colors"
          style={Math.abs(speed - s) < 0.01 ? { background: 'var(--main,#34d399)', color: '#0f172a' } : { background: 'rgba(255,255,255,.07)', color: '#94a3b8' }}>
          {s}×
        </button>
      ))}
    </div>
  </div>
));
SpeedControl.displayName = 'SpeedControl';

// ─── OptionButton ─────────────────────────────────────────────────────────────
const OptionButton = memo(({ opt, isSelected, isCorrect, validated, onClick }) => {
  let style = {};
  if (validated) {
    if (isSelected  && isCorrect)  style = { background: 'var(--ok-bg)',   borderColor: 'var(--ok-border)',   color: 'var(--ok-text)' };
    if (isSelected  && !isCorrect) style = { background: 'var(--fail-bg)', borderColor: 'var(--fail-border)', color: 'var(--fail-text)', opacity: .75 };
    if (!isSelected && isCorrect)  style = { borderStyle: 'dashed', borderColor: 'var(--c0)', color: 'var(--c0)', opacity: .55 };
    if (!isSelected && !isCorrect) style = { opacity: .3 };
  } else if (isSelected) {
    style = { background: 'var(--c0)', borderColor: 'var(--c0)', color: '#fff', boxShadow: '0 0 14px var(--cg)', transform: 'scale(1.05)' };
  }
  return (
    <button onClick={onClick} disabled={validated} aria-pressed={isSelected}
      className="p-5 rounded-2xl border-2 font-black text-lg transition-all item-surface" style={style}>
      {validated && isSelected && (isCorrect ? '✓ ' : '✗ ')}{opt}
    </button>
  );
});
OptionButton.displayName = 'OptionButton';

// ─── AudioLab ─────────────────────────────────────────────────────────────────
const AudioLab = ({ data }) => {
  const listening = data?.listening;

  const { voices, grouped } = useVoices();
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [karaokeOpen,   setKaraokeOpen]   = useState(false);
  const [shadowOpen,    setShadowOpen]    = useState(false);
  const [pracOpen,      setPracOpen]      = useState(false);
  const [fullscreen,    setFullscreen]    = useState(false);
  const [selected,      setSelected]      = useState([]);
  const [validated,     setValidated]     = useState(false);

  // A-B loop state
  const [abLoop, setAbLoop] = useState({ enabled: false, a: 20, b: 80 });

  useEffect(() => {
    if (selectedVoice || !voices.length) return;
    const best =
      voices.find(v => v.localService && v.gender === 'female' && v.accent?.label === 'American') ??
      voices.find(v => v.localService && v.gender === 'female') ??
      voices.find(v => v.localService) ??
      voices[0];
    if (best) setSelectedVoice(best);
  }, [voices, selectedVoice]);

  const {
    playing, paused, progress, speed, loopMode, supported,
    karaokeCharPos, waveformEnergy,
    handlePlay, handlePause, stop, restart, changeSpeed, seekTo, toggleLoop,
  } = useSpeech(listening?.text ?? '', selectedVoice);

  // ── A-B loop trigger — component watches progress ──────────────────────────
  useEffect(() => {
    if (!abLoop.enabled || !playing) return;
    if (progress >= abLoop.b) {
      seekTo(abLoop.a, true); // jump back to A and continue playing
    }
  }, [progress, abLoop, playing, seekTo]);

  // ── Shadowing ──────────────────────────────────────────────────────────────
  const shadow = useShadowing(
    () => { restart(); },           // onStartTTS: restart TTS for shadowing
    () => {},                       // onStopTTS
  );

  // When TTS ends during shadowing recording, stop the recording
  useEffect(() => {
    if (shadow.shadowState === 'recording' && !playing && progress === 100) {
      shadow.onTTSEnded();
    }
  }, [playing, progress, shadow]);

  // When shadowing triggers TTS comparison playback
  const handleShadowPlayTTS = useCallback(() => {
    shadow.playTTS();
  }, [shadow]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isPerfect =
    selected.length === (listening?.correctItems?.length ?? 0) &&
    selected.every(i => listening?.correctItems?.includes(i));

  const toggle = useCallback((opt) => {
    if (validated) return;
    setSelected(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt]);
  }, [validated]);

  const handleReset = useCallback(() => {
    setValidated(false); setSelected([]); stop();
  }, [stop]);

  const handleSeek = useCallback((pct) => {
    seekTo(pct, playing || paused);
  }, [seekTo, playing, paused]);

  const handleWordClick = useCallback((charStart) => {
    const pct = (charStart / (listening?.text?.length ?? 1)) * 100;
    seekTo(pct, true);
  }, [seekTo, listening?.text?.length]);

  if (!listening) return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <span className="text-5xl">🎧</span>
      <p className="font-black text-white text-lg uppercase tracking-tight">No audio content</p>
    </div>
  );
  if (!supported) return (
    <div className="card-tool p-8 text-center">
      <p className="text-white font-bold">🔇 Speech synthesis not supported.</p>
    </div>
  );

  const statusLabel = playing ? 'Now Playing' : paused ? 'Paused' : progress > 0 ? 'Stopped' : 'Ready';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">

      {/* Fullscreen overlay */}
      {fullscreen && (
        <FullscreenKaraoke
          text={listening.text}
          karaokeCharPos={karaokeCharPos}
          playing={playing}
          waveformEnergy={waveformEnergy}
          onClose={() => setFullscreen(false)}
          onWordClick={handleWordClick}
        />
      )}

      {/* ══ PLAYER CARD ════════════════════════════════════════════════════ */}
      <div className="card-base rounded-[2.5rem] relative"
           style={{ background: '#080d1a', border: '2px solid rgba(255,255,255,.07)' }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 p-8" style={{ opacity: .04, color: 'var(--main,#34d399)' }}><Headphones size={180}/></div>
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '40%', background: 'radial-gradient(ellipse, rgba(52,211,153,.05) 0%, transparent 70%)', opacity: playing ? 1 : 0, transition: 'opacity 1.5s' }}/>
        </div>

        <div className="relative z-10 p-8 space-y-5">

          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white display-font">Audio Lab</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${playing ? 'animate-pulse' : ''}`}
                  style={{ background: playing ? 'var(--main,#34d399)' : paused ? '#f59e0b' : '#475569', boxShadow: playing ? '0 0 8px var(--main,#34d399)' : 'none', transition: 'background .3s' }}/>
                <span className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: playing ? 'var(--main,#34d399)' : paused ? '#f59e0b' : '#475569' }}>
                  {statusLabel}
                </span>
                {abLoop.enabled && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(139,92,246,.2)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,.3)' }}>
                    A-B loop
                  </span>
                )}
              </div>
            </div>
            {Object.keys(grouped).length > 0 && (
              <VoiceSelector selectedVoice={selectedVoice} onSelect={setSelectedVoice} grouped={grouped}/>
            )}
          </div>

          {/* Waveform */}
          <div style={{ borderRadius: '14px', background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.04)', padding: '10px 14px' }}>
            <WaveformViz text={listening.text} energy={waveformEnergy} playing={playing}/>
          </div>

          {/* Transport */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={restart} title="Restart" className="p-3 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,.05)', color: '#64748b' }}>
              <RotateCcw size={18}/>
            </button>
            <button onClick={playing ? handlePause : handlePlay}
              className="p-4 rounded-xl text-white hover:scale-105 transition-transform"
              style={{ background: 'var(--main,#34d399)', boxShadow: '0 0 20px rgba(52,211,153,.45)' }}>
              {playing ? <Pause fill="currentColor" size={28}/> : <Play fill="currentColor" size={28} className="ml-0.5"/>}
            </button>
            <button onClick={stop} title="Stop" className="p-3 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,.05)', color: '#64748b' }}>
              <Square fill="currentColor" size={17}/>
            </button>

            {/* Loop */}
            <button onClick={toggleLoop} title={loopMode ? 'Loop on' : 'Loop off'}
              className="p-3 rounded-xl transition-all"
              style={{ background: loopMode ? 'rgba(52,211,153,.18)' : 'rgba(255,255,255,.05)', border: `1px solid ${loopMode ? 'rgba(52,211,153,.4)' : 'rgba(255,255,255,.07)'}`, color: loopMode ? 'var(--main,#34d399)' : '#475569' }}>
              <Repeat size={17}/>
            </button>

            {/* A-B loop toggle */}
            <button
              onClick={() => setAbLoop(v => ({ ...v, enabled: !v.enabled }))}
              title={abLoop.enabled ? 'Disable A-B loop' : 'Enable A-B loop (drag markers on bar)'}
              className="px-3 py-3 rounded-xl text-[11px] font-black transition-all"
              style={{ background: abLoop.enabled ? 'rgba(139,92,246,.18)' : 'rgba(255,255,255,.05)', border: `1px solid ${abLoop.enabled ? 'rgba(139,92,246,.4)' : 'rgba(255,255,255,.07)'}`, color: abLoop.enabled ? '#c4b5fd' : '#475569' }}>
              A↔B
            </button>

            {/* Fullscreen */}
            <button onClick={() => setFullscreen(true)} title="Fullscreen karaoke" className="p-3 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,.05)', color: '#475569' }}>
              <Maximize2 size={17}/>
            </button>

            <div className="flex-1 min-w-[180px]">
              <SpeedControl speed={speed} onChange={changeSpeed}/>
            </div>
          </div>

          {/* Seek bar with A-B markers */}
          <ABSeekBar
            progress={progress}
            onSeek={handleSeek}
            isActive={playing || paused}
            abLoop={abLoop}
            onSetA={(a) => setAbLoop(v => ({ ...v, a }))}
            onSetB={(b) => setAbLoop(v => ({ ...v, b }))}
          />

          {/* ── Karaoke panel ─────────────────────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.2)' }}>
            <button onClick={() => setKaraokeOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2">
                <Mic2 size={13} style={{ color: 'var(--main,#34d399)' }}/>
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--main,#34d399)' }}>Karaoke</span>
                {!karaokeOpen && playing && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--main,#34d399)', display: 'inline-block' }}/>}
                <span className="text-[10px]" style={{ color: '#334155' }}>· left-click seeks · right-click defines</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={e => { e.stopPropagation(); setFullscreen(true); }} className="p-1 rounded" style={{ color: '#475569' }}><Maximize2 size={11}/></button>
                <span style={{ color: '#475569', fontSize: '11px' }}>{karaokeOpen ? '▲' : '▼'}</span>
              </div>
            </button>
            {karaokeOpen && (
              <div className="px-5 pb-5 pt-1">
                {(playing || paused || karaokeCharPos >= 0) ? (
                  <KaraokeDisplay text={listening.text} karaokeCharPos={karaokeCharPos} playing={playing} onWordClick={handleWordClick} compact={true}/>
                ) : (
                  <p className="font-serif italic text-xl leading-loose text-center select-none py-2" style={{ color: 'rgba(255,255,255,.18)' }}>
                    {listening.text}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Shadowing panel ────────────────────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.2)' }}>
            <button onClick={() => setShadowOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2">
                <Mic size={13} style={{ color: '#8b5cf6' }}/>
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#8b5cf6' }}>Shadow me</span>
                {shadow.shadowState === 'recording' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ef4444', display: 'inline-block' }}/>}
                {shadow.shadowState === 'recorded' && <span className="text-[10px]" style={{ color: '#64748b' }}>· recording ready</span>}
              </div>
              <span style={{ color: '#475569', fontSize: '11px' }}>{shadowOpen ? '▲' : '▼'}</span>
            </button>
            {shadowOpen && (
              <div className="px-4 pb-4 pt-1">
                <ShadowingPanel
                  shadowState={shadow.shadowState}
                  countdown={shadow.countdown}
                  audioUrl={shadow.audioUrl}
                  duration={shadow.duration}
                  supported={shadow.supported}
                  playing={playing}
                  waveformEnergy={waveformEnergy}
                  text={listening.text}
                  onStart={shadow.startShadowing}
                  onPlayTTS={handleShadowPlayTTS}
                  onPlayRecording={shadow.playRecording}
                  onStop={shadow.stopPlayback}
                  onReset={shadow.reset}
                />
              </div>
            )}
          </div>

          {/* ── Pronunciation practice ─────────────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.2)' }}>
            <button onClick={() => setPracOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '13px' }}>🗣</span>
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f472b6' }}>Speak & Score</span>
                <span className="text-[10px]" style={{ color: '#334155' }}>· speak the text, get graded word by word</span>
              </div>
              <span style={{ color: '#475569', fontSize: '11px' }}>{pracOpen ? '▲' : '▼'}</span>
            </button>
            {pracOpen && (
              <div className="px-5 pb-5 pt-2">
                <PronunciationPanel text={listening.text}/>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ══ EXERCISE ═══════════════════════════════════════════════════════ */}
      <div className="card-tool p-8">
        <h4 className="font-black uppercase text-lg tracking-tight text-white mb-1">🎯 Select what you hear</h4>
        <p className="text-xs font-semibold mb-6" style={{ color: 'var(--text-3)' }}>
          {listening.correctItems.length} correct answer{listening.correctItems.length !== 1 ? 's' : ''}
          {!validated && selected.length > 0 && ` · ${selected.length} selected`}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {listening.options.map(opt => (
            <OptionButton key={opt} opt={opt} isSelected={selected.includes(opt)} isCorrect={listening.correctItems.includes(opt)} validated={validated} onClick={() => toggle(opt)}/>
          ))}
        </div>
        {!validated ? (
          <button onClick={() => setValidated(true)} disabled={selected.length === 0} className="btn-tool w-full py-4 text-base justify-center disabled:opacity-40">Check Answers</button>
        ) : (
          <div className={`animate-in zoom-in border-2 ${isPerfect ? 'badge-correct' : 'badge-wrong'}`} style={{ padding: '2rem', borderRadius: '1.5rem' }}>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              {isPerfect ? <CheckCircle size={48} style={{ color: 'var(--ok-text)' }}/> : <XCircle size={48} style={{ color: 'var(--fail-text)' }}/>}
              <div>
                <h4 className="font-black uppercase text-2xl">{isPerfect ? 'Perfect Hearing! 🎉' : 'Keep Practicing 💪'}</h4>
                <p className="text-base font-bold opacity-70 mt-1">
                  {isPerfect ? 'You identified all keywords correctly.' : `${selected.filter(s => listening.correctItems.includes(s)).length} of ${listening.correctItems.length} correct.`}
                </p>
              </div>
            </div>
            {!isPerfect && (
              <div className="flex flex-wrap gap-2 mb-5">
                {listening.correctItems.map(item => (
                  <span key={item} className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: 'var(--ok-bg)', color: 'var(--ok-text)', border: '1px solid var(--ok-border)' }}>✓ {item}</span>
                ))}
              </div>
            )}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,0,0,.12)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--c0)' }}>Transcript</p>
              <p className="font-serif italic text-xl leading-relaxed">"{listening.text}"</p>
            </div>
            {!isPerfect && <button onClick={handleReset} className="btn-ghost mt-5 w-full py-4 justify-center">Try Again</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLab;
