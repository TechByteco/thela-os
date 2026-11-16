import React, { useState } from 'react';
import { Activity, DollarSign, Trash2, Leaf, Shield, Award } from 'lucide-react';
import { sfx } from '../utils/sfx';

export default function ImpactCalculator({ t, lang }) {
  const [vendorCount, setVendorCount] = useState(2500);
  const [spoilageSavedKg, setSpoilageSavedKg] = useState(6.5);
  const [producePricePerKg, setProducePricePerKg] = useState(38);

  // Calculations
  const dailyProduceSavedKg = vendorCount * spoilageSavedKg;
  const annualProduceSavedTons = ((dailyProduceSavedKg * 365) / 1000).toFixed(1);
  const dailyIncomeUpliftTotal = Math.round(dailyProduceSavedKg * producePricePerKg);
  const dailyIncomePerVendor = Math.round(spoilageSavedKg * producePricePerKg);
  const annualIncomePerVendor = Math.round(dailyIncomePerVendor * 300);
  const co2eSavedTons = ((annualProduceSavedTons * 1.9)).toFixed(1);
  const dailyMealsSaved = Math.round(dailyProduceSavedKg / 0.35);

  return (
    <div className="space-y-6">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.impact.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; 10 Million Indian Hawkers</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.impact.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.impact.desc}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-mandi-emerald/10 border border-mandi-emerald/30 text-xs font-mono text-mandi-emerald font-semibold">
            Google "10x Impact" Metric
          </span>
        </div>
      </div>

      {/* Main Grid: Controls + Impact KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Sliders (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-800 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Activity className="size-4 text-mandi-emerald" />
              <span>{t.impact.params}</span>
            </h3>

            {/* Slider 1: Number of Carts */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{t.impact.deployedCarts}</span>
                <span className="text-white font-bold">{vendorCount.toLocaleString()} Carts</span>
              </div>
              <input
                type="range"
                min="200"
                max="25000"
                step="100"
                value={vendorCount}
                onChange={(e) => { sfx.click(); setVendorCount(parseInt(e.target.value)); }}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-mandi-emerald"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>200 (Pilot Ward)</span>
                <span>2,500 (Sub-City)</span>
                <span>25,000 (Metro)</span>
              </div>
            </div>

            {/* Slider 2: Spoilage Saved */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{t.impact.spoilagePerCart}</span>
                <span className="text-mandi-emerald font-bold">{spoilageSavedKg} kg / day</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="15.0"
                step="0.5"
                value={spoilageSavedKg}
                onChange={(e) => { sfx.click(); setSpoilageSavedKg(parseFloat(e.target.value)); }}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-mandi-emerald"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>2 kg (Conservative)</span>
                <span>6.5 kg (Realistic)</span>
                <span>12 kg (Peak Summer)</span>
              </div>
            </div>

            {/* Slider 3: Produce Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{t.impact.realizedPrice}</span>
                <span className="text-white font-bold">₹{producePricePerKg} / kg</span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="2"
                value={producePricePerKg}
                onChange={(e) => { sfx.click(); setProducePricePerKg(parseInt(e.target.value)); }}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-mandi-emerald"
              />
            </div>

            {/* Presets */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">Presets:</span>
              <button
                onClick={() => { sfx.click(); setVendorCount(500); setSpoilageSavedKg(5); }}
                className="px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-zinc-300 font-mono transition-colors"
              >
                South Delhi
              </button>
              <button
                onClick={() => { sfx.click(); setVendorCount(10000); setSpoilageSavedKg(7); }}
                className="px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-zinc-300 font-mono transition-colors"
              >
                Bengaluru
              </button>
            </div>
          </div>
        </div>

        {/* Right: Impact Bento Grid (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] relative overflow-hidden space-y-2 glow-emerald">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-mandi-emerald">
                <Trash2 className="size-4" /> {t.impact.foodWasteSaved}
              </span>
              <span>Annual</span>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {Number(annualProduceSavedTons).toLocaleString()} <span className="text-sm text-zinc-400 font-sans font-normal">Metric Tons</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Organic decomposition prevented from rotting in municipal open landfills.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] relative overflow-hidden space-y-2 glow-amber">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <DollarSign className="size-4" /> {t.impact.householdUplift}
              </span>
              <span>Net Profit</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
              +₹{annualIncomePerVendor.toLocaleString()} <span className="text-sm text-zinc-400 font-sans font-normal">/ Year</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Direct daily take-home increase of +₹{dailyIncomePerVendor}/day per hawker family.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-mandi-cyan">
                <Leaf className="size-4" /> {t.impact.nutritionSaved}
              </span>
              <span>Daily</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">
              {dailyMealsSaved.toLocaleString()} <span className="text-xs text-zinc-400 font-sans font-normal">Servings</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Fresh vegetable portions redistributed to citizens before rotting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Shield className="size-4" /> {t.impact.carbonOffset}
              </span>
              <span>EPA Standards</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tracking-tight">
              {Number(co2eSavedTons).toLocaleString()} <span className="text-xs text-zinc-400 font-sans font-normal">tCO₂e</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Greenhouse gas emissions averted from open municipal dumps.
            </p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-carbon-900 to-carbon-850 border border-mandi-emerald/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">{t.impact.cityEconomicPool}</span>
              <div className="text-xl font-bold text-white font-mono">
                ₹{dailyIncomeUpliftTotal.toLocaleString()} <span className="text-xs font-normal text-zinc-400">/ day across {vendorCount.toLocaleString()} carts</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-mandi-emerald/10 text-mandi-emerald text-xs font-mono font-semibold border border-mandi-emerald/20">
              <Award className="size-4" /> ₹1 Cr Pool Justified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
