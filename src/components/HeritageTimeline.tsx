import React, { useState } from 'react';
import { HERITAGE_TIMELINE } from '../data/timeline';
import { Odometer } from './ui/Odometer';
import { History, Wrench } from 'lucide-react';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

export const HeritageTimeline: React.FC = () => {
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<string>('1960');

  const activeMilestone = HERITAGE_TIMELINE.find(m => m.year === selectedMilestoneYear) || HERITAGE_TIMELINE[0];

  return (
    <section id="heritage-timeline" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-canvas-alabaster border-b border-hairline-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
              <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
              <span>
                <TechnicalDecryptedText text="INDEX 04 // 66-YEAR ARCHIVAL CHRONOLOGY" duration={280} />
              </span>
            </div>
            <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
              1960 — 2026 HERITAGE TIMELINE
            </MaskedHeading>
            <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl">
              Six decades of automotive stewardship at 56, M.G. Marg. From the manual metal coachbuilding of the classical Indian motoring era to state-of-the-art European luxury diagnostics and high-voltage hybrid engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-ink-graphite">
            <History className="w-4 h-4 text-crimson" />
            <span>
              <TechnicalDecryptedText text="CONTINUOUS FACILITY SINCE 1960" duration={260} delay={80} />
            </span>
          </div>
        </div>

        {/* TABULAR MECHANICAL ODOMETER ROLL-UP METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14">
          <div className="double-bezel p-3.5 sm:p-5 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-1 truncate">
              YEARS IN SERVICE
            </span>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-ink-carbon tabular-nums tracking-tight">
              <Odometer value={66} suffix="+" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-crimson mt-1 block truncate">Est. 1960 at M.G. Marg</span>
          </div>

          <div className="double-bezel p-3.5 sm:p-5 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-1 truncate">
              VEHICLES MASTERED
            </span>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-ink-carbon tabular-nums tracking-tight">
              <Odometer value={48500} suffix="+" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-ink-graphite mt-1 block truncate">Under One Roof</span>
          </div>

          <div className="double-bezel p-3.5 sm:p-5 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-1 truncate">
              CASHLESS INSURERS
            </span>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-ink-carbon tabular-nums tracking-tight">
              <Odometer value={18} suffix="+" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-ink-graphite mt-1 block truncate">Direct Em-panelment</span>
          </div>

          <div className="double-bezel p-3.5 sm:p-5 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-1 truncate">
              GENUINE OEM GUARANTEE
            </span>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-cobalt tabular-nums tracking-tight">
              <Odometer value={100} suffix="%" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-cobalt mt-1 block truncate">Speed Parts Hub</span>
          </div>
        </div>

        {/* Interactive Milestone Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono touch-pan-x">
          {HERITAGE_TIMELINE.map((milestone) => (
            <button
              key={milestone.year}
              onClick={() => setSelectedMilestoneYear(milestone.year)}
              className={`px-4 py-2.5 rounded-spec uppercase tracking-spec border transition-all whitespace-nowrap min-h-[44px] ${
                selectedMilestoneYear === milestone.year
                  ? 'bg-crimson text-white border-crimson font-bold shadow-sm'
                  : 'bg-surface-white text-ink-carbon border-hairline-grid hover:border-ink-carbon'
              }`}
            >
              {milestone.year} · {milestone.eraTitle.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Milestone Archival Deep-Dive Card */}
        <div className="double-bezel p-5 sm:p-8 bg-surface-white rounded-spec shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Cols: Year Badge & Archival Facts */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-hairline-grid pb-6 lg:pb-0 lg:pr-8">
              <div className="text-5xl sm:text-6xl font-display font-bold text-crimson tracking-tighter mb-2">
                {activeMilestone.year}
              </div>
              <MaskedHeading key={activeMilestone.year} as="h3" className="font-display font-bold text-lg text-ink-carbon uppercase tracking-tight mb-4">
                {activeMilestone.eraTitle}
              </MaskedHeading>

              <div className="p-4 bg-canvas-alabaster border border-hairline-grid rounded-spec text-xs font-mono text-ink-graphite space-y-2">
                <span className="text-[10px] uppercase text-ink-muted tracking-spec block font-bold">
                  ARCHIVAL RECORD
                </span>
                <p className="leading-relaxed font-sans text-xs">
                  {activeMilestone.archivalFact}
                </p>
              </div>
            </div>

            {/* Right 8 Cols: Narrative & Technologies Introduced */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Historical Archival Photographic Stage */}
                {activeMilestone.imageUrl && (
                  <div className="relative w-full h-56 sm:h-72 mb-6 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group">
                    <img 
                      src={activeMilestone.imageUrl} 
                      alt={activeMilestone.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-ink-carbon/80 backdrop-blur-sm border border-black text-white text-[10px] font-mono tracking-spec uppercase rounded-spec">
                      ARCHIVAL EVIDENCE // {activeMilestone.year}
                    </div>
                  </div>
                )}

                <MaskedHeading key={`${activeMilestone.year}-headline`} as="h4" className="font-display font-bold text-xl sm:text-2xl text-ink-carbon uppercase tracking-tight mb-4">
                  {activeMilestone.headline}
                </MaskedHeading>

                <p className="text-sm sm:text-base text-ink-graphite font-sans leading-relaxed mb-6">
                  {activeMilestone.description}
                </p>
              </div>

              {/* Technologies Introduced Pills */}
              <div className="pt-4 border-t border-hairline-grid">
                <span className="text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-2 font-bold">
                  PRECISION PROTOCOLS COMMISSIONED
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.technologiesIntroduced.map((tech, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon flex items-center gap-1.5"
                    >
                      <Wrench className="w-3 h-3 text-crimson" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
