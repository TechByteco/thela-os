import React, { useState } from 'react';
import { Compass, X, ArrowRight, ArrowLeft, CheckCircle2, Cpu, Radio, ShoppingBag, Sparkles, Activity } from 'lucide-react';
import { sfx } from '../utils/sfx';

const TOUR_STEPS = [
  {
    step: 1,
    tab: 'vision',
    title: '1. Zero-Shot Vision Cart Scanner',
    desc: 'Watch Gemini 1.5 Flash detect produce in real time, grade cellular turgor, and dynamically alter pricing before the 4:30 PM heatwave decay cliff.',
    actionText: 'Next: Indic Voice Soundbox',
    icon: Cpu
  },
  {
    step: 2,
    tab: 'voice',
    title: '2. Gemini Live Indic Voice Console',
    desc: 'Illiterate vendors speak in Hindi, Tamil, or Marathi. Test speech recognition with your microphone and listen to Gemini\'s street-smart advice.',
    actionText: 'Next: P2P Barter Radar',
    icon: Radio
  },
  {
    step: 3,
    tab: 'barter',
    title: '3. Hyperlocal Thela Barter Swarm',
    desc: 'Surplus perishable inventory trades with complementary deficit thelas within 500m to eliminate waste with zero cash required.',
    actionText: 'Next: Mandi Drop Flash Deals',
    icon: ShoppingBag
  },
  {
    step: 4,
    tab: 'mandi-drop',
    title: '4. "Mandi Drop" Community Flash Broadcast',
    desc: 'Liquidate evening stock by broadcasting 35% markdowns directly to nearby gated apartment WhatsApp groups with UPI payments.',
    actionText: 'Next: Macro Impact Simulator',
    icon: Sparkles
  },
  {
    step: 5,
    tab: 'impact',
    title: '5. Macro Economic & Landfill Simulator',
    desc: 'Model the compounding impact of 10 million Indian pushcarts saving ₹48,000/year per household and preventing thousands of tons of methane emissions.',
    actionText: 'Next: Official Competition Dossier',
    icon: Activity
  },
  {
    step: 6,
    tab: 'pitch',
    title: '6. Google "Fund My Crazy" Pitch Dossier',
    desc: 'Review the official Unstop submission answers, Gemini Imagen 3 prompt, and IIT Delhi judging rubric alignment.',
    actionText: 'Finish Tour',
    icon: CheckCircle2
  }
];

export default function GuidedTourModal({ isOpen, onClose, setActiveTab }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const Icon = currentStep.icon;

  const handleNext = () => {
    sfx.click();
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setActiveTab(TOUR_STEPS[nextIndex].tab);
    } else {
      sfx.success();
      onClose();
    }
  };

  const handlePrev = () => {
    sfx.click();
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setActiveTab(TOUR_STEPS[prevIndex].tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-carbon-900 border border-mandi-emerald/40 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative glow-emerald">
        {/* Close Button */}
        <button
          onClick={() => { sfx.click(); onClose(); }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Step Indicator Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-mandi-emerald/15 text-mandi-emerald border border-mandi-emerald/30">
            Step {currentStep.step} of {TOUR_STEPS.length}
          </span>
          <span className="text-xs font-mono text-zinc-500">Interactive Walkthrough</span>
        </div>

        {/* Step Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-mandi-emerald/15 text-mandi-emerald flex items-center justify-center border border-mandi-emerald/30">
              <Icon className="size-5" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{currentStep.title}</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {currentStep.desc}
          </p>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-1.5 pt-2">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStepIndex === i ? 'w-8 bg-mandi-emerald' : 'w-2 bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-mandi-emerald/20 active:scale-95"
          >
            <span>{currentStep.actionText}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
