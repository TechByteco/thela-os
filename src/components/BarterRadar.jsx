import React, { useState } from 'react';
import { MapPin, ArrowLeftRight, Navigation, Zap, CheckCircle2, ShoppingBag, ShieldCheck, Flame, History, Award } from 'lucide-react';
import { sfx } from '../utils/sfx';
import { getStoredLedger, addLedgerTransaction } from '../utils/storage';

const NEIGHBORHOOD_VENDORS = [
  {
    id: 'vendor-1',
    name: 'Ram Prasad (Cart #01)',
    location: 'Gali 4, Central Market',
    x: 42,
    y: 38,
    surplus: { item: 'Soft Tomatoes', qtyKg: 4.0, valueRs: 160, decayHours: 2.2 },
    deficit: { item: 'Dry Onions', qtyKg: 3.0, needScore: 92 },
    status: 'Seeking Swap'
  },
  {
    id: 'vendor-2',
    name: 'Suresh Kumar (Cart #02)',
    location: 'Block C Corner, 180m away',
    x: 65,
    y: 52,
    surplus: { item: 'Dry Onions', qtyKg: 6.5, valueRs: 195, decayHours: 48.0 },
    deficit: { item: 'Tomatoes', qtyKg: 4.0, needScore: 95 },
    status: 'Complementary Match Found'
  },
  {
    id: 'vendor-3',
    name: 'Sunita Devi (Cart #03)',
    location: 'Metro Gate 2, 290m away',
    x: 28,
    y: 68,
    surplus: { item: 'Methi & Palak', qtyKg: 3.5, valueRs: 120, decayHours: 2.0 },
    deficit: { item: 'Potatoes', qtyKg: 5.0, needScore: 84 },
    status: 'Seeking Swap'
  },
  {
    id: 'vendor-4',
    name: 'Anand Rao (Cart #04)',
    location: 'Park Lane, 340m away',
    x: 75,
    y: 25,
    surplus: { item: 'Potatoes', qtyKg: 10.0, valueRs: 250, decayHours: 72.0 },
    deficit: { item: 'Leafy Greens', qtyKg: 3.0, needScore: 88 },
    status: 'Complementary Match Found'
  }
];

export const BARTER_MATCHES = [
  {
    id: 'match-1',
    from: 'Ram Prasad',
    to: 'Suresh Kumar',
    give: '3.0 kg Ripe Tomatoes',
    receive: '2.2 kg Dry Onions',
    distanceMeters: 180,
    spoilageValueSaved: 140,
    matchScore: 98,
  },
  {
    id: 'match-2',
    from: 'Sunita Devi',
    to: 'Anand Rao',
    give: '2.5 kg Methi Bundles',
    receive: '3.5 kg Potatoes',
    distanceMeters: 290,
    spoilageValueSaved: 110,
    matchScore: 94,
  }
];

export default function BarterRadar({ t, lang }) {
  const [selectedVendorId, setSelectedVendorId] = useState('vendor-1');
  const [activeMatch, setActiveMatch] = useState(BARTER_MATCHES[0]);
  const [confirmedMatchId, setConfirmedMatchId] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [ledger, setLedger] = useState(getStoredLedger());

  const selectedVendor = NEIGHBORHOOD_VENDORS.find(v => v.id === selectedVendorId) || NEIGHBORHOOD_VENDORS[0];

  const handleConfirmTrade = (match) => {
    sfx.success();
    setConfirmedMatchId(match.id);
    
    // Add to persistent ledger
    const updated = addLedgerTransaction({
      type: 'Barter Swap',
      description: `Swapped ${match.give} for ${match.receive}`,
      valueSaved: match.spoilageValueSaved,
      weightSavedKg: parseFloat(match.give) || 3.0
    });
    setLedger(updated);

    setTimeout(() => {
      setConfirmedMatchId(null);
    }, 4000);
  };

  const totalValueSaved = ledger.reduce((acc, tx) => acc + (tx.valueSaved || 0), 0);
  const totalKgSaved = ledger.reduce((acc, tx) => acc + (tx.weightSavedKg || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.barter.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; Zero-Cash Micro-Logistics Network</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.barter.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.barter.desc}</p>
        </div>

        {/* Heatmap Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sfx.click(); setShowHeatmap(!showHeatmap); }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHeatmap
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-carbon-900 text-zinc-400 hover:text-white border-white/10'
            }`}
          >
            <Flame className="size-3.5 text-amber-400" />
            <span>{t.barter.showHeatmap}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Canvas + Live Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 2D Swarm Map Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-carbon-950 aspect-[4/3] p-4 shadow-2xl flex flex-col justify-between">
            {/* Map Header */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-carbon-900/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Navigation className="size-3.5 text-mandi-emerald" />
                <span>Sector Map: Lajpat Nagar Market, Delhi</span>
              </div>
              <span className="text-[11px] font-mono text-mandi-emerald">
                {NEIGHBORHOOD_VENDORS.length} {t.barter.detectedCarts}
              </span>
            </div>

            {/* Simulated Radar Map Graphic */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="absolute size-96 rounded-full border border-white/[0.04]" />
              <div className="absolute size-72 rounded-full border border-white/[0.06]" />
              <div className="absolute size-48 rounded-full border border-emerald-500/10" />
              <div className="absolute size-24 rounded-full border border-emerald-500/20" />

              {/* Demand Heatmap Layer if toggled */}
              {showHeatmap && (
                <>
                  <div className="absolute top-[20%] left-[30%] size-40 rounded-full bg-red-500/15 blur-2xl animate-pulse" />
                  <div className="absolute top-[50%] right-[25%] size-48 rounded-full bg-amber-500/15 blur-2xl animate-pulse" />
                  <div className="absolute bottom-[20%] left-[45%] size-36 rounded-full bg-emerald-500/15 blur-2xl" />
                </>
              )}

              {/* Animated Trade Pathways */}
              <svg className="absolute inset-0 size-full">
                <line
                  x1="42%"
                  y1="38%"
                  x2="65%"
                  y2="52%"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Vendor Nodes on Map */}
            <div className="absolute inset-0 z-10">
              {NEIGHBORHOOD_VENDORS.map((v) => {
                const isSelected = selectedVendorId === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => { sfx.click(); setSelectedVendorId(v.id); }}
                    style={{ left: `${v.x}%`, top: `${v.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    <div className="absolute -inset-2 rounded-full bg-mandi-emerald/20 animate-ping" />
                    <div className={`size-9 rounded-full flex items-center justify-center transition-all border shadow-lg ${
                      isSelected
                        ? 'bg-mandi-emerald text-black border-white scale-125 z-30 shadow-mandi-emerald/30'
                        : 'bg-carbon-900 text-white border-white/20 hover:border-mandi-emerald z-20'
                    }`}>
                      <ShoppingBag className="size-4" />
                    </div>

                    <div className="absolute left-1/2 -bottom-9 -translate-x-1/2 px-2 py-1 rounded bg-carbon-900/90 border border-white/10 text-[10px] font-mono whitespace-nowrap text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-40">
                      {v.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-carbon-900/80 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-mandi-emerald" /> High Synergy Match
                </span>
                {showHeatmap && (
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="size-2 rounded-full bg-red-500" /> High Buyer Density
                  </span>
                )}
              </div>
              <span>Algorithmic Fair-Value: <strong>Active</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Swap Opportunity & Ledger (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Trade Opportunity Card */}
          <div className="p-5 rounded-2xl bg-carbon-800 border border-mandi-emerald/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="size-4 text-mandi-emerald" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-white">{t.barter.recommendedSwap}</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-mandi-emerald/20 text-mandi-emerald border border-mandi-emerald/30">
                {activeMatch.matchScore}% {t.barter.synergy}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-carbon-900/80 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{t.barter.youGive} (From {activeMatch.from})</span>
                <p className="text-sm font-bold text-red-400">{activeMatch.give}</p>
                <span className="text-[11px] text-zinc-400">Decay window: 2.2 hrs remaining</span>
              </div>

              <div className="flex justify-center -my-1">
                <div className="size-7 rounded-full bg-carbon-950 border border-white/10 flex items-center justify-center text-mandi-emerald shadow">
                  <ArrowLeftRight className="size-3.5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-carbon-900/80 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{t.barter.youReceive} (From {activeMatch.to})</span>
                <p className="text-sm font-bold text-emerald-400">{activeMatch.receive}</p>
                <span className="text-[11px] text-zinc-400">Stable inventory (48 hrs shelf-life)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-carbon-900 border border-white/[0.06]">
                <span className="text-zinc-500 text-[10px] block">{t.barter.produceSaved}</span>
                <strong className="text-mandi-emerald text-sm">₹{activeMatch.spoilageValueSaved}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-carbon-900 border border-white/[0.06]">
                <span className="text-zinc-500 text-[10px] block">{t.barter.walkingDist}</span>
                <strong className="text-white text-sm">{activeMatch.distanceMeters} m</strong>
              </div>
            </div>

            <button
              onClick={() => handleConfirmTrade(activeMatch)}
              disabled={confirmedMatchId !== null}
              className="w-full py-3 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-mandi-emerald/20 disabled:opacity-75"
            >
              {confirmedMatchId === activeMatch.id ? (
                <>
                  <CheckCircle2 className="size-4 text-black" />
                  <span>Swap Logged to Ledger & Confirmed!</span>
                </>
              ) : (
                <>
                  <Zap className="size-4 fill-black" />
                  <span>{t.barter.executeBarter}</span>
                </>
              )}
            </button>
          </div>

          {/* Today's Persistent Transaction Ledger */}
          <div className="p-4 rounded-2xl bg-carbon-800 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <History className="size-3.5 text-mandi-cyan" />
                <span>{t.barter.ledgerTitle}</span>
              </span>
              <span className="text-mandi-emerald font-bold">Total: ₹{totalValueSaved} saved</span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {ledger.map((item) => (
                <div key={item.id} className="p-2 rounded-lg bg-carbon-900 border border-white/[0.04] text-[11px] flex items-center justify-between">
                  <div>
                    <strong className="text-white block">{item.type}</strong>
                    <span className="text-zinc-400 text-[10px]">{item.description}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-mandi-emerald font-mono font-bold">+₹{item.valueSaved}</span>
                    <span className="text-zinc-500 text-[9px] block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
