import React, { useEffect, useState } from 'react';
import { HeroBlueprint } from './HeroBlueprint';
import { ArrowRight, MessageSquare, Shield, Award, Wrench } from 'lucide-react';
import { HINDUSTAN_GARAGE_WHATSAPP } from '../utils/whatsapp';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

interface HeroProps {
  onOpenBooking: () => void;
  onSelectBay: (bayId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSelectBay }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-hairline-grid bg-canvas-alabaster">
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow Institutional Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon shadow-bezel">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span>PRAYAGRAJ'S AUTOMOTIVE LANDMARK · EST. 1960</span>
          </div>

          <div 
            data-cursor="cobalt"
            className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 bg-cobalt-tint border border-cobalt-border rounded-spec text-[10px] font-mono uppercase tracking-spec text-cobalt"
          >
            <span>OFFICIAL B2B HUB: SPEED PARTS (GEORGE TOWN)</span>
          </div>
        </div>

        {/* 12-Column Responsive Grid Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left 7 Columns: Swiss Typography & Institutional Value Mandate */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Masked Split-Line Typography Reveal */}
            <h1 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-ink-carbon tracking-tighter uppercase leading-[1.08] mb-6">
              <span className="overflow-mask block">
                <span className={`mask-line-inner ${isRevealed ? 'is-revealed' : ''}`} style={{ transitionDelay: '80ms' }}>
                  ALL WORK UNDER ONE ROOF.
                </span>
              </span>
              <span className="overflow-mask block">
                <span className={`mask-line-inner ${isRevealed ? 'is-revealed' : ''}`} style={{ transitionDelay: '160ms' }}>
                  <span className="text-crimson font-bold">PRAYAGRAJ'S</span> AUTOMOTIVE INSTITUTION
                </span>
              </span>
              <span className="overflow-mask block">
                <span className={`mask-line-inner ${isRevealed ? 'is-revealed' : ''}`} style={{ transitionDelay: '240ms' }}>
                  SINCE 1960.
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-ink-graphite leading-relaxed mb-8 max-w-2xl font-sans font-normal">
              For 66 continuous years at <strong className="text-ink-carbon font-semibold">56, M.G. Marg (Civil Lines)</strong>, Hindustan Garage has engineered precision multi-brand vehicle care—from computerized ECM diagnostics and German luxury chassis calibration to 60°C cashless paint baking and wholesale genuine OEM spare parts.
            </p>

            {/* D2D2C Institutional Trust Badges (Staggered Entrance) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <RevealOnScroll delay={100} direction="up" distance={16}>
                <div className="p-3 bg-surface-white border border-hairline-grid rounded-spec shadow-bezel flex flex-col hover:border-ink-carbon transition-colors duration-200">
                  <div className="flex items-center gap-2 text-crimson mb-1.5">
                    <Shield className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-spec uppercase">CASHLESS TIE-UPS</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-carbon">18+ National Insurers</span>
                  <span className="text-[10px] font-mono text-ink-muted mt-0.5">3-Hour Survey Approvals</span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={180} direction="up" distance={16}>
                <div className="p-3 bg-surface-white border border-hairline-grid rounded-spec shadow-bezel flex flex-col hover:border-ink-carbon transition-colors duration-200">
                  <div className="flex items-center gap-2 text-ink-carbon mb-1.5">
                    <Award className="w-4 h-4 text-crimson shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-spec uppercase">MULTIPLE MARQUES</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-carbon">German & Daily 4W</span>
                  <span className="text-[10px] font-mono text-ink-muted mt-0.5">BMW · Merc · Hyundai · Tata</span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={260} direction="up" distance={16}>
                <div 
                  data-cursor="cobalt"
                  className="p-3 bg-surface-white border border-hairline-grid rounded-spec shadow-bezel flex flex-col hover:border-cobalt transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 text-cobalt mb-1.5">
                    <Wrench className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-spec uppercase">SPEED PARTS B2B</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-carbon">100% Genuine OEM</span>
                  <span className="text-[10px] font-mono text-ink-muted mt-0.5">Wholesale Depot George Town</span>
                </div>
              </RevealOnScroll>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              {/* Primary Slot Booking CTA */}
              <button
                onClick={onOpenBooking}
                data-cursor="pointer"
                className="press-feedback group inline-flex items-center gap-3 pl-5 pr-2 py-2.5 bg-crimson hover:bg-crimson-hover text-white text-xs font-mono uppercase tracking-spec font-semibold rounded-spec shadow-sm transition-all min-h-[44px]"
              >
                <span>Book Diagnostic Bay</span>
                <div className="w-8 h-8 rounded-spec bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Direct WhatsApp Quick Triage Link */}
              <a
                href={`https://wa.me/${HINDUSTAN_GARAGE_WHATSAPP}?text=${encodeURIComponent('Hello Hindustan Garage, I would like to inquire about vehicle service and diagnosis at your 56 M.G. Marg workshop.')}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="press-feedback inline-flex items-center gap-2.5 px-4 py-2.5 bg-surface-white hover:bg-surface-hover border border-hairline-grid text-xs font-mono uppercase tracking-spec font-medium text-ink-carbon rounded-spec shadow-bezel transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Workshop</span>
              </a>
            </div>

            {/* Architectural Micro-Specs */}
            <div className="pt-4 border-t border-hairline-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-[10px] font-mono text-ink-graphite tracking-spec">
              <div>
                <span className="text-ink-muted block uppercase truncate">WORKSHOP FOUNDED</span>
                <span className="text-ink-carbon font-semibold text-xs truncate block">
                  <TechnicalDecryptedText text="1960 (66 YRS)" duration={240} delay={100} />
                </span>
              </div>
              <div>
                <span className="text-ink-muted block uppercase truncate">LOCATION</span>
                <span className="text-ink-carbon font-semibold text-xs truncate block">
                  <TechnicalDecryptedText text="CIVIL LINES" duration={240} delay={140} />
                </span>
              </div>
              <div>
                <span className="text-ink-muted block uppercase truncate">ACTIVE BAYS</span>
                <span className="text-ink-carbon font-semibold text-xs truncate block">
                  <TechnicalDecryptedText text="6 LANES ONLINE" duration={240} delay={180} />
                </span>
              </div>
              <div>
                <span className="text-ink-muted block uppercase truncate">PARTS WHOLESALE</span>
                <span className="text-cobalt font-semibold text-xs truncate block">
                  <TechnicalDecryptedText text="GEORGE TOWN HUB" duration={240} delay={220} />
                </span>
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Daylight Studio Diagnostic Blueprint */}
          <div className="lg:col-span-5">
            <HeroBlueprint onSelectBay={onSelectBay} />
          </div>

        </div>

      </div>
    </section>
  );
};
