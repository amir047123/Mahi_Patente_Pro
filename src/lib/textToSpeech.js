export default function textToSpeech(
  text,
  lang = "en-US",
  rate = 1,
  pitch = 1
) {
  if (!window.speechSynthesis) {
    alert.error("Speech Synthesis API is not supported in this browser.");
    return;
  }

  const speakText = () => {
    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      console.warn("No voices available for speech synthesis.");
      // setTimeout(speakText, 500);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = voices.find((v) => v.lang.startsWith(lang)) || voices[0];

    window.speechSynthesis.speak(utterance);
  };

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
      speakText();
    };
  } else {
    speechSynthesis.cancel();
    speakText();
  }
}
