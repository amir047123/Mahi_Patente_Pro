export default function textToSpeech(
  text,
  audio,
  audioRef,
  isSpeaking,
  setIsSpeaking,
  lang = "en-US",
  rate = 1,
  pitch = 1
) {
  if (!window.speechSynthesis) {
    alert("Speech Synthesis API is not supported in this browser.");
    return;
  }

  const synth = window.speechSynthesis;
  const audioElement = audioRef.current;

  const speakText = () => {
    const voices = synth.getVoices();
    if (voices.length === 0) {
      alert("No voices available for speech synthesis.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = voices.find((v) => v.lang.startsWith(lang)) || voices[0];

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  if (audio) {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    }

    if (isSpeaking) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsSpeaking(false);
    } else {
      audioElement.play();
      setIsSpeaking(true);

      audioElement.onended = () => {
        setIsSpeaking(false);
      };
    }
  } else if (synth.speaking) {
    synth.cancel();
    setIsSpeaking(false);
  } else {
    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = () => {
        synth.onvoiceschanged = null;
        synth.cancel();
        speakText();
      };
    } else {
      synth.cancel();
      speakText();
    }
  }
}
