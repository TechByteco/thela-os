import React, { useState } from 'react';
import { HARDWARE_SPEC, JANTA_COOLER_STEPS } from '../data/hardwareData';
import { Wrench, BatteryCharging, Radio, Droplets, Wind, ShieldCheck, DollarSign, Layers } from 'lucide-react';
import { sfx } from '../utils/sfx';

export default function ThelaHardware({ t, lang }) {
  const [activeTab, setActiveTab] = useState('blueprint'); // 'blueprint' | 'cooler'

  return (
    <div className="space-y-6">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.hardware.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; Frugal Indian Engineering (₹1,380 / $16)</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.hardware.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.hardware.desc}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-carbon-900 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => { sfx.click(); setActiveTab('blueprint'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'blueprint' ? 'bg-mandi-emerald text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.hardware.soundboxSpec}
          </button>
          <button
            onClick={() => { sfx.click(); setActiveTab('cooler'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'cooler' ? 'bg-mandi-cyan text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.hardware.jantaCooler}
          </button>
        </div>
      </div>

      {activeTab === 'blueprint' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Blueprint Graphic (7 Cols) */}
          <div className="lg:col-span-7 tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-850 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Layers className="size-4 text-mandi-emerald" />
              <span>Smart Thela Exploded Blueprint</span>
            </h3>

            {/* Synthetic Vector Blueprint of Wooden Pushcart with Sensors */}
            <div className="relative aspect-[16/10] bg-carbon-950 rounded-xl border border-white/[0.06] p-4 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 700 450" className="size-full">
                {/* Blueprint grid lines */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Wooden Pushcart Frame */}
                <rect x="100" y="180" width="500" height="140" rx="8" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <line x1="100" y1="250" x2="600" y2="250" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Large Wooden Wheels */}
                <circle cx="200" cy="360" r="50" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle cx="200" cy="360" r="8" fill="#10b981" />
                <circle cx="500" cy="360" r="50" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle cx="500" cy="360" r="8" fill="#10b981" />

                {/* Bamboo Phone Rig & Camera */}
                <line x1="150" y1="180" x2="150" y2="60" stroke="#06b6d4" strokeWidth="3" />
                <rect x="135" y="40" width="30" height="50" rx="4" fill="none" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="150" cy="55" r="4" fill="#06b6d4" />
                <text x="175" y="65" fill="#06b6d4" fontSize="12" fontFamily="monospace">Gemini Vision Rig (₹140)</text>

                {/* Solar Panel Canopy */}
                <path d="M 80 40 L 620 40 L 590 20 L 110 20 Z" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="2" />
                <text x="350" y="15" fill="#f59e0b" fontSize="12" fontFamily="monospace" textAnchor="middle">10W Flexible Solar Sheet (₹620)</text>

                {/* ThelaOS Soundbox */}
                <rect x="520" y="140" width="55" height="40" rx="6" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
                <circle cx="547" cy="160" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <text x="490" y="130" fill="#10b981" fontSize="11" fontFamily="monospace">Soundbox (₹380)</text>

                {/* Evaporative Liner */}
                <rect x="110" y="300" width="480" height="15" fill="rgba(6,182,212,0.3)" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                <text x="350" y="335" fill="#06b6d4" fontSize="11" fontFamily="monospace" textAnchor="middle">Janta Wet Jute Sub-Bed (₹240)</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-carbon-900 p-3 rounded-xl border border-white/[0.04]">
              <span>Retrofit Time: <strong>45 Minutes</strong></span>
              <span>Total Bill of Materials: <strong className="text-mandi-emerald">₹{HARDWARE_SPEC.totalRetrofitCostInr} (~$16)</strong></span>
            </div>
          </div>

          {/* Bill of Materials (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="tactile-card p-5 rounded-2xl border border-white/10 bg-carbon-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
                <DollarSign className="size-4 text-mandi-emerald" />
                <span>BOM (Bill of Materials) Breakdown</span>
              </h3>

              <div className="space-y-3">
                {HARDWARE_SPEC.components.map((comp) => (
                  <div key={comp.id} className="p-3 rounded-xl bg-carbon-900/80 border border-white/[0.05] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-white font-semibold">{comp.name}</strong>
                      <span className="font-mono text-mandi-emerald font-bold">{comp.cost}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{comp.description}</p>
                    <span className="text-[10px] font-mono text-zinc-500 block">Source: {comp.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Janta Cooler Physical Guide */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JANTA_COOLER_STEPS.map((step) => (
            <div key={step.step} className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-800 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="size-8 rounded-full bg-mandi-cyan/15 text-mandi-cyan font-bold font-mono text-sm flex items-center justify-center border border-mandi-cyan/30">
                  0{step.step}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-mandi-emerald/15 text-mandi-emerald font-bold">
                  -{step.tempDrop} Temp Drop
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="text-xs text-mandi-cyan font-medium">{step.hindiTitle}</p>
              <p className="text-xs text-zinc-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
