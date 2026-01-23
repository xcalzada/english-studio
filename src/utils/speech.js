let speechUtterance = null;

export const speakUK = (text, speed = 0.85) => {
  window.speechSynthesis.cancel();
  const textWithPause = text + " ."; 
  speechUtterance = new SpeechSynthesisUtterance(textWithPause);
  const voices = window.speechSynthesis.getVoices();
  const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('United Kingdom'));
  if (ukVoice) speechUtterance.voice = ukVoice;
  speechUtterance.lang = 'en-GB';
  speechUtterance.rate = speed;
  speechUtterance.pitch = 1;
  window.speechSynthesis.speak(speechUtterance);
};