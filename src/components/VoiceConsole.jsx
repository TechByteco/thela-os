import React, { useState, useEffect, useRef } from 'react';
import { VOICE_LANGUAGES, VOICE_DIALOGUES } from '../data/voiceDialogues';
import { Mic, MicOff, Volume2, Radio, Play, Pause, Sparkles, Check, ArrowRight, Languages, Settings2, Sliders } from 'lucide-react';
import { sfx } from '../utils/sfx';

export default function VoiceConsole({ t, lang }) {
  const [selectedLang, setSelectedLang] = useState('hi');
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [persona, setPersona] = useState('chalak'); // 'chalak' | 'mentor' | 'telemetry'
  const [speechRate, setSpeechRate] = useState(1.0);
  
  // Real Speech Recognition (STT) State
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef(null);

  const dialogues = VOICE_DIALOGUES[selectedLang] || VOICE_DIALOGUES['hi'];
  const activeDialogue = dialogues[activeDialogueIndex] || dialogues[0];

  useEffect(() => {
    // Setup Web Speech Recognition API if available
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setLiveTranscript('');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(res => res[0].transcript)
          .join('');
        setLiveTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (liveTranscript) {
          sfx.success();
          // Generate synthetic response
          setTimeout(() => {
            speakResponse(`राम प्रसाद जी, मैंने सुना: "${liveTranscript}"। जेमिनी सलाह देता है कि शाम 5 बजे से पहले इसे बार्टर करें या ₹35 में मंडी ड्रॉप भेजें।`);
          }, 600);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLang, liveTranscript]);

  const toggleListening = () => {
    sfx.click();
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
          recognitionRef.current.start();
        } catch {
          recognitionRef.current?.stop();
        }
      } else {
        alert("Speech Recognition is not supported on this browser version. You can still test with simulated vendor queries below!");
      }
    }
  };

  const speakResponse = (text) => {
    sfx.click();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      
      // Pitch/voice tuning based on persona
      if (persona === 'chalak') utterance.pitch = 1.1;
      else if (persona === 'mentor') utterance.pitch = 0.95;
      else utterance.pitch = 1.0;

      if (selectedLang === 'hi') utterance.lang = 'hi-IN';
      else if (selectedLang === 'ta') utterance.lang = 'ta-IN';
      else if (selectedLang === 'mr') utterance.lang = 'mr-IN';
      else if (selectedLang === 'bn') utterance.lang = 'bn-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const stopSpeaking = () => {
    sfx.click();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const executeAction = (actionName) => {
    sfx.success();
    setActionSuccess(actionName);
    setTimeout(() => {
      setActionSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.voice.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; Zero-Keyboard Vernacular Agent</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.voice.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.voice.desc}</p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-carbon-900 border border-white/10 overflow-x-auto">
          {VOICE_LANGUAGES.map((langItem) => (
            <button
              key={langItem.id}
              onClick={() => {
                sfx.click();
                setSelectedLang(langItem.id);
                setActiveDialogueIndex(0);
                stopSpeaking();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLang === langItem.id
                  ? 'bg-mandi-emerald text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>{langItem.flag}</span>
              <span>{langItem.nativeName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Persona & Speech Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-carbon-800/80 border border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <Sliders className="size-4 text-mandi-cyan" />
          <span className="text-zinc-400 font-mono text-[11px] uppercase">AI Persona:</span>
          <div className="flex items-center gap-1">
            {[
              { id: 'chalak', label: 'चालाक व्यापारी (Street Smart)' },
              { id: 'mentor', label: 'Polite Mentor' },
              { id: 'telemetry', label: 'Telemetry Only' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => { sfx.click(); setPersona(p.id); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  persona === p.id
                    ? 'bg-mandi-emerald/20 text-mandi-emerald border border-mandi-emerald/40'
                    : 'text-zinc-400 hover:text-white bg-white/[0.03]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-[11px] uppercase">{t.voice.voiceSpeed}:</span>
          {[0.85, 1.0, 1.2].map((s) => (
            <button
              key={s}
              onClick={() => { sfx.click(); setSpeechRate(s); }}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                speechRate === s
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Soundbox Hardware & Waveform (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="tactile-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-carbon-850 to-carbon-900 shadow-2xl relative overflow-hidden space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-mandi-emerald/20 border border-white/15 flex items-center justify-center text-white shadow-inner">
                  <Radio className="size-5 text-mandi-emerald" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.voice.smartSoundbox}</span>
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">Bluetooth 5.3 &bull; Gemini Live Indic Direct</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-zinc-400">{t.voice.latency}: <strong className="text-mandi-emerald">{activeDialogue.latencyMs}ms</strong></span>
                <span className="text-zinc-400">{t.voice.confidence}: <strong className="text-white">{activeDialogue.confidence}%</strong></span>
              </div>
            </div>

            {/* Waveform Visualizer */}
            <div className="p-6 rounded-2xl bg-carbon-950/80 border border-white/[0.06] flex flex-col items-center justify-center gap-4 relative">
              <div className="flex items-center justify-center gap-1.5 h-16 w-full">
                {[...Array(24)].map((_, i) => {
                  const height = isPlaying
                    ? Math.max(10, Math.sin(i * 0.4 + Date.now() / 200) * 36 + 24)
                    : (i % 3 === 0 ? 12 : i % 2 === 0 ? 8 : 16);
                  return (
                    <div
                      key={i}
                      style={{ height: `${height}px` }}
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        isPlaying ? 'bg-gradient-to-t from-mandi-emerald to-mandi-cyan' : 'bg-zinc-700'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Controls: Real Microphone Button & Playback */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Real Live Mic Toggle */}
                <button
                  onClick={toggleListening}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-lg active:scale-95 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
                      : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15'
                  }`}
                >
                  {isListening ? <MicOff className="size-4" /> : <Mic className="size-4 text-mandi-emerald" />}
                  <span>{isListening ? t.voice.listening : t.voice.speakYourself}</span>
                </button>

                {isPlaying ? (
                  <button
                    onClick={stopSpeaking}
                    className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
                  >
                    <Pause className="size-4" />
                    <span>{t.voice.stopVoice}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => speakResponse(activeDialogue.geminiResponse)}
                    className="px-4 py-2.5 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-mandi-emerald/20 active:scale-95"
                  >
                    <Play className="size-4 fill-black" />
                    <span>{t.voice.simulateVoice}</span>
                  </button>
                )}

                <button
                  onClick={() => speakResponse(activeDialogue.vendorQuery)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 font-medium text-xs border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <Volume2 className="size-3.5 text-zinc-400" />
                  <span>{t.voice.hearVendor}</span>
                </button>
              </div>

              {/* Live Speech Recognition Transcript display if active */}
              {liveTranscript && (
                <div className="w-full p-2.5 rounded-xl bg-carbon-900 border border-mandi-emerald/40 text-center text-xs text-mandi-emerald font-medium animate-pulse">
                  "{liveTranscript}"
                </div>
              )}
            </div>

            {/* Dialogue View */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-carbon-900/90 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Mic className="size-3.5" /> {t.voice.micQuery}
                  </span>
                  <span>Audio In</span>
                </div>
                <p className="text-sm font-medium text-white italic pl-2 border-l-2 border-amber-400/50">
                  "{activeDialogue.vendorQuery}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-carbon-900/90 border border-mandi-emerald/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-mandi-emerald font-semibold">
                    <Sparkles className="size-3.5" /> {t.voice.geminiResponse}
                  </span>
                  <span>Audio Out</span>
                </div>
                <p className="text-sm text-zinc-100 leading-relaxed pl-2 border-l-2 border-mandi-emerald">
                  "{activeDialogue.geminiResponse}"
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => executeAction(activeDialogue.action)}
                    disabled={actionSuccess !== null}
                    className="px-3.5 py-1.5 rounded-lg bg-mandi-emerald/15 hover:bg-mandi-emerald/25 text-mandi-emerald border border-mandi-emerald/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {actionSuccess ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span>Action Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <span>{t.voice.executeAction}: <strong>{activeDialogue.action}</strong></span>
                        <ArrowRight className="size-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Curated Scenarios (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Languages className="size-4 text-mandi-emerald" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300">{t.voice.curatedScenarios}</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">{dialogues.length} Scenarios</span>
            </div>

            <div className="space-y-2.5">
              {dialogues.map((dialogue, idx) => (
                <div
                  key={dialogue.id}
                  onClick={() => {
                    sfx.click();
                    setActiveDialogueIndex(idx);
                    stopSpeaking();
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    activeDialogueIndex === idx
                      ? 'bg-white/[0.08] border-mandi-emerald shadow-lg'
                      : 'bg-carbon-900/60 border-white/[0.06] hover:bg-white/[0.04] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-white">{dialogue.title}</h4>
                    <span className="text-[10px] font-mono text-mandi-emerald font-semibold">
                      {dialogue.latencyMs}ms
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 italic">
                    "{dialogue.vendorQuery}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
