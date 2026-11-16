import React, { useState } from 'react';
import { COMPETITION_DOSSIER } from '../data/competitionDossier';
import { Copy, Check, Sparkles, Award, FileText, Download, Printer, HelpCircle } from 'lucide-react';
import { sfx } from '../utils/sfx';

export default function PitchDossier({ t, lang }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (key, text) => {
    sfx.click();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrint = () => {
    sfx.click();
    window.print();
  };

  const downloadMarkdown = () => {
    sfx.click();
    const content = `# ${COMPETITION_DOSSIER.projectTitle} - ${COMPETITION_DOSSIER.competitionName}\n\n` +
      `Theme: ${COMPETITION_DOSSIER.selectedTheme}\n\n` +
      `## Problem:\n${COMPETITION_DOSSIER.answers.problem.answer}\n\n` +
      `## Crazy Solution:\n${COMPETITION_DOSSIER.answers.crazySolution.answer}\n\n` +
      `## Gemini Architecture:\n${COMPETITION_DOSSIER.answers.geminiTech.answer}\n\n` +
      `## Gemini Imagen Prompt:\n"${COMPETITION_DOSSIER.geminiVisualPrompt.promptText}"\n`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ThelaOS_Google_FundMyCrazy_Submission.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto print:bg-white print:text-black">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-carbon-800 via-carbon-850 to-carbon-900 border border-white/[0.08] shadow-2xl relative overflow-hidden print:border-none print:bg-transparent">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-mandi-emerald/15 text-mandi-emerald border border-mandi-emerald/30">
                {COMPETITION_DOSSIER.competitionName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.06] border border-white/10">
                National Prize Pool: {COMPETITION_DOSSIER.prizePool}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
                Theme: {COMPETITION_DOSSIER.selectedTheme}
              </span>
            </div>

            {/* Print & Download Actions */}
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Printer className="size-3.5" />
                <span>Print Pitch Deck</span>
              </button>
              <button
                onClick={downloadMarkdown}
                className="px-3 py-1.5 rounded-xl bg-mandi-emerald/15 hover:bg-mandi-emerald/25 text-mandi-emerald border border-mandi-emerald/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Download className="size-3.5" />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
              {COMPETITION_DOSSIER.projectTitle}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 mt-1 font-medium print:text-zinc-700">
              {COMPETITION_DOSSIER.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Official Unstop Submission Q&A Sections */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 print:text-black">
          <FileText className="size-5 text-mandi-emerald" />
          <span>Official Submission Answers (Ready to Paste into Form)</span>
        </h2>

        {Object.entries(COMPETITION_DOSSIER.answers).map(([key, item]) => {
          const isCopied = copiedKey === key;
          return (
            <div key={key} className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-800 space-y-3 print:bg-transparent print:border-zinc-300">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 print:border-zinc-300">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 print:text-black">
                  <span className="size-2 rounded-full bg-mandi-emerald" />
                  <span>{item.question}</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(key, item.answer)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/10 transition-all flex items-center gap-1.5 print:hidden"
                >
                  {isCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-zinc-400" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Answer'}</span>
                </button>
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-sans pl-2 border-l-2 border-white/10 print:text-zinc-800 print:border-zinc-400">
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      {/* Required Visual Concept Generation Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-carbon-850 to-carbon-900 border border-mandi-emerald/30 shadow-xl space-y-4 print:border-zinc-300 print:bg-transparent">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 print:border-zinc-300">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-mandi-emerald" />
            <div>
              <h3 className="text-sm font-bold text-white print:text-black">{COMPETITION_DOSSIER.geminiVisualPrompt.title}</h3>
              <p className="text-xs text-zinc-400 print:text-zinc-600">{COMPETITION_DOSSIER.geminiVisualPrompt.description}</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard('visual-prompt', COMPETITION_DOSSIER.geminiVisualPrompt.promptText)}
            className="px-3.5 py-1.5 rounded-lg bg-mandi-emerald hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow print:hidden"
          >
            {copiedKey === 'visual-prompt' ? <Check className="size-3.5 text-black" /> : <Copy className="size-3.5 text-black" />}
            <span>{copiedKey === 'visual-prompt' ? 'Copied Prompt!' : 'Copy Prompt'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-carbon-950/80 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed print:text-zinc-800 print:bg-zinc-100">
          "{COMPETITION_DOSSIER.geminiVisualPrompt.promptText}"
        </div>
      </div>

      {/* Evaluation Rubric Alignment Matrix */}
      <div className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-800 space-y-4 print:border-zinc-300 print:bg-transparent">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 print:border-zinc-300">
          <div className="flex items-center gap-2">
            <Award className="size-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white print:text-black">IIT Delhi Grand Finale Judging Rubric Alignment</h3>
          </div>
          <span className="text-xs font-mono text-mandi-emerald font-semibold">Tier 1 Target: ₹20 Lakhs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPETITION_DOSSIER.rubricChecklist.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-carbon-900/70 border border-white/[0.06] space-y-1.5 print:border-zinc-300 print:bg-zinc-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white print:text-black">{item.criterion}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-mandi-emerald/15 text-mandi-emerald border border-mandi-emerald/20">
                  {item.score}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed print:text-zinc-600">
                {item.justification}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
