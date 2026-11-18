import React from 'react';
import { DIAGNOSTIC_BAYS } from '../data/services';
import { DiagnosticBay } from '../types';
import { Clock, ShieldCheck, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

interface ServiceMatrixProps {
  onSelectBay: (bayId: string) => void;
}

export const ServiceMatrix: React.FC<ServiceMatrixProps> = ({ onSelectBay }) => {
  return (
    <section id="service-matrix" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-canvas-alabaster">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
              <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
              <span>
                <TechnicalDecryptedText text="INDEX 01 // 6-BAY TECHNICAL SPECIFICATION" duration={280} />
              </span>
            </div>
            <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
              THE 6-BAY "UNDER ONE ROOF" SERVICE MATRIX
            </MaskedHeading>
            <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl">
              Engineered as a transparent technical timetable. Each bay is equipped with certified master tooling, dedicated diagnostic telemetry, and calibrated turnaround SLAs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-ink-graphite">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>BAYS ONLINE: 6/6</span>
            </div>
            <span className="text-hairline-grid hidden xs:inline">|</span>
            <span className="shrink-0">
              <TechnicalDecryptedText text="CENTRAL WORKSHOP: 56, M.G. MARG" duration={260} delay={100} />
            </span>
          </div>
        </div>

        {/* 6-Bay Bento Timetable Grid (Cascading Staggered Entrance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIAGNOSTIC_BAYS.map((bay: DiagnosticBay, idx: number) => (
            <RevealOnScroll key={bay.id} delay={idx * 60} direction="up" distance={20} className="h-full">
              <div
                className="group double-bezel p-5 sm:p-6 bg-surface-white rounded-spec flex flex-col justify-between hover:border-ink-carbon transition-all duration-300 shadow-bezel h-full"
              >
                {/* Card Top: Bay Number & Telemetry Metric */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-[11px] font-mono font-bold text-crimson">
                        {bay.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-ink-muted">
                        {bay.status}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-ink-graphite tracking-spec">
                      {bay.hindiTag}
                    </span>
                  </div>

                  {/* Bay Photographic Stage */}
                  {bay.imageUrl && (
                    <div className="relative w-full h-44 mb-4 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster">
                      <img 
                        src={bay.imageUrl} 
                        alt={bay.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-white/90 backdrop-blur-sm border border-hairline-grid text-ink-carbon text-[9px] font-mono tracking-spec uppercase rounded-spec">
                        {bay.telemetryMetric}: <strong className="text-crimson font-bold">{bay.telemetryValue}</strong>
                      </div>
                    </div>
                  )}

                  {/* Bay Name & System */}
                  <h3 className="font-display font-bold text-lg text-ink-carbon tracking-tight uppercase mb-1">
                    {bay.name}
                  </h3>
                  <span className="text-[11px] font-mono text-crimson font-medium block mb-3">
                    SYSTEM: {bay.system}
                  </span>

                  <p className="text-xs text-ink-graphite leading-relaxed mb-4 font-sans">
                    {bay.description}
                  </p>

                  {/* Tooling Spec Box */}
                  <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec mb-4">
                    <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec block mb-1.5">
                      DIAGNOSTIC BENCH & TOOLING
                    </span>
                    <ul className="space-y-1">
                      {bay.tooling.map((tool, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5 text-[11px] font-mono text-ink-carbon">
                          <Wrench className="w-3 h-3 text-crimson shrink-0 mt-0.5" />
                          <span className="truncate">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Capabilities */}
                  <div className="mb-4">
                    <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec block mb-1.5">
                      KEY CAPABILITIES
                    </span>
                    <ul className="space-y-1">
                      {bay.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-1.5 text-xs text-ink-graphite font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Turnaround SLA, Warranty, and Booking Action */}
                <div className="pt-4 border-t border-hairline-grid flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 bg-canvas-alabaster border border-hairline-grid rounded-spec">
                      <div className="flex items-center gap-1 text-ink-muted mb-0.5">
                        <Clock className="w-3 h-3 text-crimson" />
                        <span>TURNAROUND</span>
                      </div>
                      <span className="font-bold text-ink-carbon">{bay.turnaround}</span>
                    </div>

                    <div className="p-2 bg-canvas-alabaster border border-hairline-grid rounded-spec">
                      <div className="flex items-center gap-1 text-ink-muted mb-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>GUARANTEE</span>
                      </div>
                      <span className="font-bold text-ink-carbon truncate block text-[10px] leading-tight" title={bay.warranty}>
                        {bay.warranty.replace(' Guarantee', '').replace(' Warranty', '')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectBay(bay.id)}
                    data-cursor="pointer"
                    className="press-feedback w-full flex items-center justify-between px-3.5 py-3 bg-surface-white hover:bg-ink-carbon text-ink-carbon hover:text-white border border-hairline-grid hover:border-ink-carbon rounded-spec text-[11px] font-mono uppercase tracking-spec transition-colors group/btn min-h-[44px]"
                  >
                    <span className="font-medium">Reserve {bay.number}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-crimson group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
};
