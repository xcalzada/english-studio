/**
 * usePronunciation
 *
 * Real-time pronunciation assessment using the Web Speech Recognition API.
 * Works in Chrome (webkitSpeechRecognition). No backend or API key required.
 *
 * Algorithm:
 *  1. SpeechRecognition runs continuously with interimResults enabled.
 *  2. Interim results → advance the active word cursor for real-time karaoke follow.
 *  3. Final results → score each recognized word against expected using Levenshtein.
 *  4. Per-word grades: 'correct' | 'close' | 'wrong' | 'skipped'
 *  5. An overall 0–100 score is computed from grades.
 *
 * Returns:
 *  wordStates     — array parallel to tokens, each: { word, grade, recognized }
 *  activeIdx      — current word being spoken (real-time cursor)
 *  score          — 0–100 overall score (null until done)
 *  isListening
 *  phase          — 'idle' | 'countdown' | 'listening' | 'done'
 *  countdown      — 3-2-1 value
 *  start / stop / reset
 *  supported      — false if browser doesn't have SpeechRecognition
 */

// ── Levenshtein distance (bounded for performance) ───────────────────────────
function editDistance(a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 4) return 99; // fast reject
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function normalizeWord(w) {
  return w.toLowerCase().replace(/[^a-z']/g, '');
}

function gradeWord(expected, recognized) {
  const e = normalizeWord(expected);
  const r = normalizeWord(recognized);
  if (!r) return 'skipped';
  const d = editDistance(e, r);
  if (d === 0) return 'correct';
  if (d <= 1 || (d === 2 && e.length >= 6)) return 'close';
  return 'wrong';
}

// ── Align recognized tokens to expected tokens ────────────────────────────────
// Greedy forward alignment: for each recognized word, try to match from cursor.
// Allows up to 2 skipped expected words before marking as wrong.
function alignTokens(expectedTokens, recognizedWords) {
  const states = expectedTokens.map(t => ({ word: t, grade: 'pending', recognized: '' }));
  let cursor = 0;

  for (const recWord of recognizedWords) {
    if (cursor >= states.length) break;

    // Try to match within a window of 3 from cursor
    let bestIdx = -1;
    let bestDist = 99;
    for (let i = cursor; i < Math.min(cursor + 3, states.length); i++) {
      const d = editDistance(normalizeWord(states[i].word), normalizeWord(recWord));
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    }

    if (bestIdx !== -1 && bestDist <= 3) {
      // Mark any skipped words between cursor and bestIdx
      for (let i = cursor; i < bestIdx; i++) {
        states[i].grade      = 'skipped';
        states[i].recognized = '';
      }
      states[bestIdx].grade      = gradeWord(states[bestIdx].word, recWord);
      states[bestIdx].recognized = recWord;
      cursor = bestIdx + 1;
    } else {
      // Word doesn't match anything nearby — mark current as wrong
      states[cursor].grade      = 'wrong';
      states[cursor].recognized = recWord;
      cursor++;
    }
  }

  return states;
}

function computeScore(wordStates) {
  const graded = wordStates.filter(s => s.grade !== 'pending');
  if (graded.length === 0) return null;
  const points = graded.reduce((sum, s) => {
    if (s.grade === 'correct') return sum + 1;
    if (s.grade === 'close')   return sum + 0.6;
    return sum;
  }, 0);
  return Math.round((points / wordStates.length) * 100);
}

// ── Hook ──────────────────────────────────────────────────────────────────────
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export function usePronunciation(fullText = '') {
  const supported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const tokens = useMemo(() => {
    const result = [];
    const re = /\S+/g;
    let m;
    while ((m = re.exec(fullText)) !== null)
      result.push(m[0]);
    return result;
  }, [fullText]);

  const [phase,      setPhase]      = useState('idle');     // idle | countdown | listening | done
  const [countdown,  setCountdown]  = useState(0);
  const [wordStates, setWordStates] = useState(() => tokens.map(w => ({ word: w, grade: 'pending', recognized: '' })));
  const [activeIdx,  setActiveIdx]  = useState(-1);
  const [score,      setScore]      = useState(null);
  const [interimText, setInterimText] = useState('');

  // Reset wordStates when text changes
  useEffect(() => {
    setWordStates(tokens.map(w => ({ word: w, grade: 'pending', recognized: '' })));
    setActiveIdx(-1);
    setScore(null);
    setPhase('idle');
    setInterimText('');
  }, [fullText]); // eslint-disable-line

  const recognizerRef    = useRef(null);
  const finalWordsRef    = useRef([]);  // accumulated final words across restarts
  const countdownRef     = useRef(null);
  const mounted          = useRef(true);
  const isListeningRef   = useRef(false);

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; _stop(); }; }, []);

  const _buildRecognizer = useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang            = 'en-US';
    rec.continuous      = true;
    rec.interimResults  = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      if (!mounted.current) return;

      let interimAccum = '';
      const newFinalWords = [...finalWordsRef.current];

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        const text   = result[0].transcript.trim();
        if (result.isFinal) {
          // Split into words and add to final buffer
          const words = text.toLowerCase().split(/\s+/).filter(Boolean);
          newFinalWords.push(...words);
        } else {
          interimAccum += text + ' ';
        }
      }

      finalWordsRef.current = newFinalWords;

      // Real-time cursor from total recognized words so far
      const allWords     = [...newFinalWords, ...interimAccum.trim().split(/\s+/).filter(Boolean)];
      const newActiveIdx = Math.min(allWords.length - 1, tokens.length - 1);
      setActiveIdx(Math.max(0, newActiveIdx));
      setInterimText(interimAccum.trim());

      // Update word states from final words
      const newStates = alignTokens(
        tokens.map(w => ({ word: w })),
        newFinalWords,
      );
      setWordStates(newStates);
    };

    rec.onerror = (e) => {
      // 'no-speech' is normal — just restart if still listening
      if (e.error === 'no-speech' && isListeningRef.current) {
        try { rec.start(); } catch (_) {}
        return;
      }
      if (e.error === 'aborted') return;
      console.warn('[usePronunciation]', e.error);
    };

    rec.onend = () => {
      // Auto-restart while still in listening phase
      if (isListeningRef.current && mounted.current) {
        try { rec.start(); } catch (_) {}
      }
    };

    return rec;
  }, [tokens]);

  const _stop = () => {
    isListeningRef.current = false;
    clearInterval(countdownRef.current);
    if (recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch (_) {}
      recognizerRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (!supported) return;
    _stop();
    finalWordsRef.current = [];
    setWordStates(tokens.map(w => ({ word: w, grade: 'pending', recognized: '' })));
    setActiveIdx(-1);
    setScore(null);
    setInterimText('');
    setPhase('countdown');

    let count = 3;
    setCountdown(count);
    countdownRef.current = setInterval(() => {
      count--;
      if (!mounted.current) return;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownRef.current);
        setCountdown(0);
        setPhase('listening');
        isListeningRef.current = true;
        recognizerRef.current = _buildRecognizer();
        try { recognizerRef.current.start(); } catch (e) { console.error(e); }
      }
    }, 1000);
  }, [supported, tokens, _buildRecognizer]);

  const stop = useCallback(() => {
    _stop();
    if (!mounted.current) return;
    setPhase('done');

    // Final alignment and score
    const finalStates = alignTokens(
      tokens.map(w => ({ word: w })),
      finalWordsRef.current,
    );
    // Mark remaining pending as skipped
    finalStates.forEach(s => { if (s.grade === 'pending') s.grade = 'skipped'; });
    setWordStates(finalStates);
    setActiveIdx(-1);
    setInterimText('');
    setScore(computeScore(finalStates));
  }, [tokens]);

  const reset = useCallback(() => {
    _stop();
    setPhase('idle');
    setCountdown(0);
    setWordStates(tokens.map(w => ({ word: w, grade: 'pending', recognized: '' })));
    setActiveIdx(-1);
    setScore(null);
    setInterimText('');
    finalWordsRef.current = [];
  }, [tokens]);

  return {
    supported,
    phase,
    countdown,
    wordStates,
    activeIdx,
    score,
    interimText,
    isListening: phase === 'listening',
    start,
    stop,
    reset,
  };
}
