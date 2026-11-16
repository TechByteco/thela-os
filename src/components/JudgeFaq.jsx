import React, { useState } from 'react';
import { JUDGE_FAQS } from '../data/hardwareData';
import { HelpCircle, Search, ChevronDown, ChevronUp, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { sfx } from '../utils/sfx';

export default function JudgeFaq({ t, lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = JUDGE_FAQS.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx) => {
    sfx.click();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-carbon-800 via-carbon-850 to-carbon-900 border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {t.faq.tag}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.06] border border-white/10">
            Defense & Technical Feasibility
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.faq.title}</h2>
          <p className="text-sm text-zinc-400 mt-1">{t.faq.desc}</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search judge inquiries (e.g. offline connectivity, fraud, unit economics)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-mandi-emerald"
          />
        </div>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`tactile-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-carbon-800 border-mandi-emerald/40 shadow-xl' : 'bg-carbon-850 border-white/[0.08] hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="size-6 rounded-full bg-white/[0.06] text-mandi-emerald font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white leading-snug">{faq.q}</span>
                </div>
                <div className="text-zinc-400 shrink-0">
                  {isOpen ? <ChevronUp className="size-4 text-mandi-emerald" /> : <ChevronDown className="size-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-white/[0.06] pl-14">
                  <p className="bg-carbon-900/60 p-4 rounded-xl border border-white/[0.04]">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
