const SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;

export const speech = {
  supported: SUPPORTED,

  speak(text, { rate = 0.85, lang = 'en-GB', onEnd, onError } = {}) {
    if (!SUPPORTED) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang;
    utt.rate = rate;
    if (onEnd)   utt.onend   = onEnd;
    if (onError) utt.onerror = e => { if (e.error !== 'interrupted') onError(e); };
    window.speechSynthesis.speak(utt);
    return utt;
  },

  cancel() {
    if (SUPPORTED) window.speechSynthesis.cancel();
  },

  pause() {
    if (SUPPORTED) window.speechSynthesis.pause();
  },

  resume() {
    if (SUPPORTED) window.speechSynthesis.resume();
  },

  get speaking() {
    return SUPPORTED && window.speechSynthesis.speaking;
  },
};
