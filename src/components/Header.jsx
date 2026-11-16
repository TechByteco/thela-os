import React from 'react';
import { Sparkles, ShoppingBag, Radio, Cpu, FileText, Activity, Sun, Moon, Volume2, VolumeX, HelpCircle, Wrench, Compass, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MANDI_TICKER } from '../data/mandiTicker';
import { sfx } from '../utils/sfx';

export default function Header({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme,
  setTheme,
  isMuted,
  setIsMuted,
  onStartTour,
  t
}) {
  const navItems = [
    { id: 'vision', label: t.nav.vision, icon: Cpu, badge: 'Multimodal' },
    { id: 'voice', label: t.nav.voice, icon: Radio, badge: 'Gemini Live' },
    { id: 'barter', label: t.nav.barter, icon: ShoppingBag, badge: 'Live Grid' },
    { id: 'mandi-drop', label: t.nav.mandiDrop, icon: Sparkles, badge: 'Flash' },
    { id: 'impact', label: t.nav.impact, icon: Activity, badge: 'Macro' },
    { id: 'hardware', label: t.nav.hardware, icon: Wrench, badge: 'Blueprint' },
    { id: 'faq', label: t.nav.faq, icon: HelpCircle, badge: 'Defense' },
    { id: 'pitch', label: t.nav.pitch, icon: FileText, badge: 'IIT Delhi' },
  ];

  const handleNavClick = (id) => {
    sfx.click();
    setActiveTab(id);
  };

  const handleToggleMute = () => {
    const next = sfx.toggleMute();
    setIsMuted(next);
    if (!next) sfx.click();
  };

  const handleToggleTheme = () => {
    sfx.click();
    setTheme(theme === 'oled' ? 'sunlight' : 'oled');
  };

  const handleToggleLang = () => {
    sfx.click();
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-carbon-950/90 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
      {/* 1. Live Mandi Wholesale Ticker Bar */}
      <div className="bg-carbon-900 border-b border-white/[0.05] overflow-hidden whitespace-nowrap py-1 px-4 text-[11px] font-mono text-zinc-400 flex items-center">
        <div className="flex items-center gap-1.5 font-bold text-mandi-emerald mr-4 shrink-0">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AGMARKNET APMC LIVE:</span>
        </div>
        <div className="flex items-center gap-6 animate-marquee shrink-0">
          {MANDI_TICKER.concat(MANDI_TICKER).map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-1.5">
              <span className="text-zinc-300 font-semibold">{item.mandi}</span>
              <span className="text-zinc-400">{item.commodity}:</span>
              <span className="text-white font-bold">{item.price}</span>
              <span className={`flex items-center text-[10px] font-bold ${
                item.trend === 'up' ? 'text-red-400' : item.trend === 'down' ? 'text-emerald-400' : 'text-zinc-500'
              }`}>
                {item.trend === 'up' ? <TrendingUp className="size-3" /> : item.trend === 'down' ? <TrendingDown className="size-3" /> : null}
                {item.delta}
              </span>
              <span className="text-zinc-700 ml-2">&bull;</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => handleNavClick('vision')}
              className="cursor-pointer relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-mandi-emerald/20 via-mandi-emerald/10 to-transparent border border-mandi-emerald/40 text-mandi-emerald shadow-lg shadow-mandi-emerald/10 active:scale-95 transition-transform"
            >
              <span className="font-mono font-black text-lg tracking-tighter">ठे</span>
              <div className="absolute -top-1 -right-1 size-2.5 rounded-full bg-mandi-emerald animate-ping" />
              <div className="absolute -top-1 -right-1 size-2.5 rounded-full bg-mandi-emerald" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">Thela<span className="text-mandi-emerald font-mono">OS</span></span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.06] text-zinc-300 border border-white/10">
                  <Sparkles className="size-3 text-mandi-emerald" /> Google Gemini
                </span>
              </div>
              <p className="hidden md:block text-xs text-zinc-400">
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Center: Swarm Status Telemetry */}
          <div className="hidden xl:flex items-center gap-4 py-1.5 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.gridStatus}</span>
            </div>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Delhi &bull; 1,420 Active Carts</span>
            <span className="text-zinc-600">|</span>
            <span className="text-mandi-emerald font-semibold">{t.spoilagePrevented}: 3,410 kg</span>
          </div>

          {/* Right Action Tools: Sunlight, Language, Sound, Guided Tour, Pitch */}
          <div className="flex items-center gap-2">
            {/* Guided Tour Trigger */}
            <button
              onClick={() => { sfx.click(); onStartTour(); }}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10 text-xs font-medium transition-all flex items-center gap-1.5"
              title="Launch Guided Interactive Tour"
            >
              <Compass className="size-3.5 text-mandi-cyan" />
              <span className="hidden sm:inline">{t.guidedTour}</span>
            </button>

            {/* Sunlight / OLED Mode Toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10 text-xs transition-all"
              title={theme === 'oled' ? 'Switch to Sunlight High-Contrast Mode' : 'Switch to OLED Dark Mode'}
            >
              {theme === 'oled' ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-zinc-200" />}
            </button>

            {/* Bilingual Language Switcher (EN ⟷ HI) */}
            <button
              onClick={handleToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10 text-xs font-bold font-mono transition-all"
              title="Switch Language"
            >
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10 text-xs transition-all"
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="size-4 text-zinc-500" /> : <Volume2 className="size-4 text-mandi-emerald" />}
            </button>

            {/* Pitch Dossier Button */}
            <button
              onClick={() => handleNavClick('pitch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'pitch'
                  ? 'bg-mandi-emerald text-black font-semibold shadow-lg shadow-mandi-emerald/20'
                  : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] border border-white/10'
              }`}
            >
              <FileText className="size-3.5" />
              <span className="hidden sm:inline">{t.pitchDossier}</span>
            </button>
          </div>
        </div>

        {/* 3. Horizontal Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-white/[0.04]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'text-white bg-white/[0.08] border border-white/15 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? 'text-mandi-emerald' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-mandi-emerald/20 text-mandi-emerald' : 'bg-white/[0.05] text-zinc-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute inset-x-2 -bottom-2 h-0.5 bg-mandi-emerald rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
