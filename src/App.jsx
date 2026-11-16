import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VisionScanner from './components/VisionScanner';
import VoiceConsole from './components/VoiceConsole';
import BarterRadar from './components/BarterRadar';
import MandiDrop from './components/MandiDrop';
import ImpactCalculator from './components/ImpactCalculator';
import ThelaHardware from './components/ThelaHardware';
import JudgeFaq from './components/JudgeFaq';
import PitchDossier from './components/PitchDossier';
import GuidedTourModal from './components/GuidedTourModal';
import { translations } from './utils/i18n';
import { getStoredPreferences, saveStoredPreferences } from './utils/storage';
import { sfx } from './utils/sfx';

export default function App() {
  const initialPrefs = getStoredPreferences();
  const [activeTab, setActiveTab] = useState('vision');
  const [lang, setLang] = useState(initialPrefs.lang || 'en');
  const [theme, setTheme] = useState(initialPrefs.theme || 'oled');
  const [isMuted, setIsMuted] = useState(initialPrefs.muted || false);
  const [showTour, setShowTour] = useState(false);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    saveStoredPreferences({ lang, theme, muted: isMuted });
  }, [lang, theme, isMuted]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'sunlight'
        ? 'bg-[#fef08a] text-zinc-950 selection:bg-amber-400 selection:text-black'
        : 'bg-carbon-900 text-zinc-100 selection:bg-mandi-emerald/20 selection:text-mandi-emerald'
    }`}>
      {/* Top Banner Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onStartTour={() => setShowTour(true)}
        t={t}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-300">
          {activeTab === 'vision' && <VisionScanner t={t} lang={lang} />}
          {activeTab === 'voice' && <VoiceConsole t={t} lang={lang} />}
          {activeTab === 'barter' && <BarterRadar t={t} lang={lang} />}
          {activeTab === 'mandi-drop' && <MandiDrop t={t} lang={lang} />}
          {activeTab === 'impact' && <ImpactCalculator t={t} lang={lang} />}
          {activeTab === 'hardware' && <ThelaHardware t={t} lang={lang} />}
          {activeTab === 'faq' && <JudgeFaq t={t} lang={lang} />}
          {activeTab === 'pitch' && <PitchDossier t={t} lang={lang} />}
        </div>
      </main>

      {/* Guided Interactive Tour Modal */}
      <GuidedTourModal
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        setActiveTab={setActiveTab}
      />

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-carbon-950 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-tight">Thela<span className="text-mandi-emerald font-mono">OS</span></span>
            <span className="text-zinc-600">&bull;</span>
            <span>Google Fund My Crazy 2026 AI Competition Entry</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <button onClick={() => { sfx.click(); setActiveTab('pitch'); }} className="hover:text-white transition-colors">
              {t.nav.pitch}
            </button>
            <button onClick={() => { sfx.click(); setActiveTab('hardware'); }} className="hover:text-white transition-colors">
              {t.nav.hardware}
            </button>
            <button onClick={() => { sfx.click(); setActiveTab('faq'); }} className="hover:text-white transition-colors">
              {t.nav.faq}
            </button>
            <button onClick={() => { sfx.click(); setShowTour(true); }} className="hover:text-white transition-colors text-mandi-cyan font-medium">
              {t.guidedTour}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
