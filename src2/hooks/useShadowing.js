import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useShadowing
 *
 * Records the user's voice while TTS plays, then lets them compare
 * their recording against the original. Core of any language-learning
 * shadowing practice flow.
 *
 * States:
 *   'idle'       → nothing recorded yet
 *   'countdown'  → 3-2-1 before TTS + recording starts
 *   'recording'  → TTS is playing AND mic is recording
 *   'recorded'   → recording done, ready to compare
 *   'playing-tts'    → replaying TTS for comparison
 *   'playing-shadow' → replaying user's recording
 */
export function useShadowing(onStartTTS, onStopTTS) {
  const [shadowState,  setShadowState]  = useState('idle');
  const [countdown,    setCountdown]    = useState(0);
  const [audioUrl,     setAudioUrl]     = useState(null);
  const [permission,   setPermission]   = useState(null); // null | 'granted' | 'denied'
  const [duration,     setDuration]     = useState(0);    // seconds recorded

  const mediaRecorderRef = useRef(null);
  const chunksRef        = useRef([]);
  const streamRef        = useRef(null);
  const shadowAudioRef   = useRef(null); // <audio> element for playback
  const countdownRef     = useRef(null);
  const startTimeRef     = useRef(0);
  const mounted          = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      _cleanup();
    };
  }, []);

  const _cleanup = () => {
    clearInterval(countdownRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch (_) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (shadowAudioRef.current) {
      shadowAudioRef.current.pause();
      shadowAudioRef.current = null;
    }
  };

  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop()); // just checking permission
      if (mounted.current) setPermission('granted');
      return true;
    } catch (e) {
      if (mounted.current) setPermission('denied');
      return false;
    }
  }, []);

  const startShadowing = useCallback(async () => {
    // Request permission if not yet granted
    if (permission !== 'granted') {
      const ok = await requestPermission();
      if (!ok) return;
    }

    // Get fresh stream
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (e) {
      setPermission('denied');
      return;
    }
    streamRef.current = stream;

    // Revoke previous recording
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }
    chunksRef.current = [];
    setShadowState('countdown');

    // 3-second countdown then start
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
        _startRecording(stream);
      }
    }, 1000);
  }, [permission, audioUrl, requestPermission]);

  const _startRecording = (stream) => {
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      if (!mounted.current) return;
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url  = URL.createObjectURL(blob);
      setAudioUrl(url);
      setDuration((Date.now() - startTimeRef.current) / 1000);
      setShadowState('recorded');
      // Stop mic stream
      stream.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    };

    recorder.start(100); // collect data every 100ms
    startTimeRef.current = Date.now();
    setShadowState('recording');

    // Tell parent to start TTS — parent calls stopTTS when TTS ends
    onStartTTS?.();
  };

  // Called by parent when TTS finishes — stop recording
  const onTTSEnded = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    onStopTTS?.();
  }, [onStopTTS]);

  const playTTS = useCallback(() => {
    if (shadowAudioRef.current) {
      shadowAudioRef.current.pause();
      shadowAudioRef.current = null;
    }
    setShadowState('playing-tts');
    onStartTTS?.();
  }, [onStartTTS]);

  const playRecording = useCallback(() => {
    if (!audioUrl) return;
    if (shadowAudioRef.current) {
      shadowAudioRef.current.pause();
    }
    setShadowState('playing-shadow');
    const audio = new Audio(audioUrl);
    shadowAudioRef.current = audio;
    audio.onended = () => {
      if (mounted.current) setShadowState('recorded');
    };
    audio.play().catch(console.error);
  }, [audioUrl]);

  const stopPlayback = useCallback(() => {
    if (shadowAudioRef.current) {
      shadowAudioRef.current.pause();
      shadowAudioRef.current = null;
    }
    onStopTTS?.();
    if (mounted.current) setShadowState('recorded');
  }, [onStopTTS]);

  const reset = useCallback(() => {
    _cleanup();
    if (audioUrl) { URL.revokeObjectURL(audioUrl); }
    setAudioUrl(null);
    setCountdown(0);
    setDuration(0);
    setShadowState('idle');
  }, [audioUrl]);

  // When parent signals TTS finished during comparison
  const onTTSComparisonEnded = useCallback(() => {
    if (mounted.current) setShadowState('recorded');
  }, []);

  const supported = typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia;

  return {
    shadowState,
    countdown,
    audioUrl,
    permission,
    duration,
    supported,
    startShadowing,
    onTTSEnded,
    playTTS,
    playRecording,
    stopPlayback,
    reset,
    onTTSComparisonEnded,
  };
}
