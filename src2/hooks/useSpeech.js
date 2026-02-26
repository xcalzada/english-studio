import { useState, useRef, useCallback, useEffect } from 'react';

const CHARS_PER_SEC = 13; // fallback only — onboundary overrides when available
const synth = () => window.speechSynthesis;

export function useSpeech(fullText = '', selectedVoice = null) {
  const [playing,           setPlaying]          = useState(false);
  const [paused,            setPaused]           = useState(false);
  const [progress,          setProgress]         = useState(0);
  const [speed,             setSpeed]            = useState(0.9);
  const [currentCharIndex,  setCurrentCharIndex] = useState(-1);
  const [currentCharLength, setCurrentCharLength]= useState(0);

  const intervalRef  = useRef(null);
  const offsetRef    = useRef(0);
  const lastCharRef  = useRef(0);
  const chromeFixRef = useRef(null);
  const mounted      = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; _cancel(); };
  }, []);

  const _cancel = () => {
    synth().cancel();
    clearInterval(intervalRef.current);
    clearInterval(chromeFixRef.current);
    intervalRef.current = null;
    chromeFixRef.current = null;
  };

  // Interval is only a fallback for when onboundary never fires (network voices).
  // It caps at 98% — onend or onboundary correct the final value.
  const startSim = useCallback((chunkLen, spd, totalLen, startOff) => {
    clearInterval(intervalRef.current);
    const ms       = (chunkLen / (CHARS_PER_SEC * spd)) * 1000;
    const t0       = Date.now();
    const startPct = (startOff / totalLen) * 100;
    const endPct   = (totalLen / totalLen) * 100; // 100
    intervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      const frac = Math.min((Date.now() - t0) / ms, 1);
      const pct  = startPct + frac * (endPct - startPct);
      // Cap at 98 — onend will set 100. Avoids the "jumps to 100 early" problem.
      setProgress(p => Math.max(p, Math.min(pct, 98)));
      if (frac >= 1) clearInterval(intervalRef.current);
    }, 80);
  }, []);

  const resetKaraoke = useCallback(() => {
    setCurrentCharIndex(-1);
    setCurrentCharLength(0);
  }, []);

  const play = useCallback((offset = 0, spd = speed) => {
    _cancel();
    const remaining = fullText.slice(offset);
    if (!remaining.trim()) { setProgress(100); return; }

    const utt = new SpeechSynthesisUtterance(remaining);
    utt.rate  = spd;
    if (selectedVoice?.voice) utt.voice = selectedVoice.voice;

    utt.onboundary = (e) => {
      if (e.name !== 'word' || !mounted.current) return;
      lastCharRef.current = e.charIndex;

      const absPos = offset + e.charIndex;
      const len    = e.charLength > 0
        ? e.charLength
        : (remaining.slice(e.charIndex).match(/^\S+/)?.[0]?.length ?? 1);

      setCurrentCharIndex(absPos);
      setCurrentCharLength(len);

      // onboundary gives us ground truth — override the interval estimate
      const exactPct = (absPos / fullText.length) * 100;
      setProgress(exactPct);
    };

    utt.onstart = () => {
      if (!mounted.current) return;
      setPlaying(true);
      setPaused(false);
      startSim(remaining.length, spd, fullText.length, offset);
      chromeFixRef.current = setInterval(() => {
        if (synth().speaking) { synth().pause(); synth().resume(); }
      }, 12_000);
    };

    utt.onend = () => {
      if (!mounted.current) return;
      clearInterval(intervalRef.current);
      clearInterval(chromeFixRef.current);
      setPlaying(false);
      setPaused(false);
      setProgress(100); // guaranteed 100% on natural completion
      resetKaraoke();
      offsetRef.current   = 0;
      lastCharRef.current = 0;
    };

    utt.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.error('[useSpeech]', e.error);
    };

    offsetRef.current = offset;
    synth().speak(utt);
  }, [fullText, speed, selectedVoice, startSim, resetKaraoke]);

  const handlePlay = useCallback(() => {
    if (paused) {
      play(offsetRef.current + lastCharRef.current, speed);
      return;
    }
    // If there's a pending seek offset (user dragged before playing), start from there
    const startOffset = offsetRef.current;
    lastCharRef.current = 0;
    resetKaraoke();
    play(startOffset, speed);
  }, [paused, speed, play, resetKaraoke]);

  const handlePause = useCallback(() => {
    _cancel();
    resetKaraoke();
    setPaused(true);
    setPlaying(false);
  }, [resetKaraoke]);

  const stop = useCallback(() => {
    _cancel();
    setPlaying(false);
    setPaused(false);
    setProgress(0);
    resetKaraoke();
    offsetRef.current   = 0;
    lastCharRef.current = 0;
  }, [resetKaraoke]);

  const restart = useCallback(() => {
    _cancel();
    setProgress(0);
    resetKaraoke();
    offsetRef.current   = 0;
    lastCharRef.current = 0;
    setTimeout(() => play(0, speed), 80);
  }, [play, speed, resetKaraoke]);

  const changeSpeed = useCallback((s) => {
    setSpeed(s);
    if (playing) play(offsetRef.current + lastCharRef.current, s);
  }, [playing, play]);

  /**
   * seekTo(pct, autoPlay?)
   *
   * autoPlay = true  (default when already playing/paused): seeks and starts playback
   * autoPlay = false (user drags before pressing play): just repositions, no playback
   */
  const seekTo = useCallback((pct, autoPlay) => {
    const clamp  = Math.max(0, Math.min(100, pct));
    const offset = Math.floor((clamp / 100) * fullText.length);
    const shouldPlay = autoPlay ?? (playing || paused);

    if (shouldPlay) {
      resetKaraoke();
      setTimeout(() => play(offset, speed), 80);
    } else {
      // Just reposition — user will press play manually
      _cancel();
      setPlaying(false);
      setPaused(false);
      setProgress(clamp);
      resetKaraoke();
      offsetRef.current   = offset;
      lastCharRef.current = 0;
    }
  }, [fullText, speed, playing, paused, play, resetKaraoke]);

  return {
    playing, paused, progress, speed,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    currentCharIndex, currentCharLength,
    handlePlay, handlePause, stop, restart, changeSpeed, seekTo,
  };
}