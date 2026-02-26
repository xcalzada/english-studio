import { useState, useRef, useCallback, useEffect } from 'react';
import { speech } from '../utils/speech';

const CHARS_PER_SEC = 13;

export function useSpeech(fullText = '') {
  const [playing,  setPlaying]  = useState(false);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed,    setSpeed]    = useState(0.9);

  const intervalRef       = useRef(null);
  const offsetRef         = useRef(0);
  const lastCharRef       = useRef(0);
  const pausedProgressRef = useRef(0);
  const chromeFixRef      = useRef(null);
  const mounted           = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; stop(); };
  }, []);

  const stopSim = useCallback(() => {
    clearInterval(intervalRef.current); intervalRef.current = null;
  }, []);

  const startSim = useCallback((chunkLen, spd, totalLen, startOff) => {
    stopSim();
    const ms       = (chunkLen / (CHARS_PER_SEC * spd)) * 1000;
    const start    = Date.now();
    const startPct = (startOff / totalLen) * 100;

    intervalRef.current = setInterval(() => {
      const frac = Math.min((Date.now() - start) / ms, 1);
      const pct  = startPct + frac * ((totalLen - startOff) / totalLen * 100);
      if (mounted.current) setProgress(Math.min(pct, 99));
      if (frac >= 1) stopSim();
    }, 80);
  }, [stopSim]);

  const play = useCallback((offset = 0, spd = speed) => {
    speech.cancel(); stopSim();
    clearInterval(chromeFixRef.current);
    const remaining = fullText.slice(offset);
    if (!remaining.trim()) { setProgress(100); return; }

    const utt = speech.speak(remaining, {
      rate: spd,
      onEnd: () => {
        if (!mounted.current) return;
        setPlaying(false); setPaused(false); stopSim();
        clearInterval(chromeFixRef.current);
        setProgress(100); offsetRef.current = 0; lastCharRef.current = 0;
      },
    });
    if (utt) {
      utt.onboundary = e => { if (e.name === 'word') lastCharRef.current = e.charIndex; };
      utt.onstart    = () => {
        if (mounted.current) { setPlaying(true); setPaused(false); }
        startSim(remaining.length, spd, fullText.length, offset);
        chromeFixRef.current = setInterval(() => {
          if (speech.speaking) { speech.pause(); speech.resume(); }
        }, 12000);
      };
    }
    offsetRef.current = offset;
  }, [fullText, speed, startSim, stopSim]);

  const handlePlay = useCallback(() => {
    if (paused) { play(offsetRef.current + lastCharRef.current, speed); return; }
    offsetRef.current = 0; lastCharRef.current = 0; setProgress(0); play(0, speed);
  }, [paused, speed, play]);

  const handlePause = useCallback(() => {
    pausedProgressRef.current = progress;
    speech.cancel(); stopSim(); clearInterval(chromeFixRef.current);
    setPaused(true); setPlaying(false);
  }, [progress, stopSim]);

  const stop = useCallback(() => {
    speech.cancel(); stopSim(); clearInterval(chromeFixRef.current);
    setPlaying(false); setPaused(false); setProgress(0);
    offsetRef.current = 0; lastCharRef.current = 0;
  }, [stopSim]);

  const restart = useCallback(() => { stop(); setTimeout(() => play(0, speed), 120); }, [stop, play, speed]);

  const changeSpeed = useCallback((s) => {
    setSpeed(s);
    if (playing) play(offsetRef.current + lastCharRef.current, s);
  }, [playing, play]);

  return { playing, paused, progress, speed, supported: speech.supported, handlePlay, handlePause, stop, restart, changeSpeed };
}
