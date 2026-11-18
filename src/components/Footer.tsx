import React from 'react';
import { StatusBeacon } from './ui/StatusBeacon';
import { MapPin, PhoneCall, Clock, ExternalLink, Navigation } from 'lucide-react';
import { HINDUSTAN_GARAGE_WHATSAPP } from '../utils/whatsapp';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-canvas-alabaster border-t border-hairline-grid text-ink-carbon">
      
      {/* Top Architectural Blueprint Coordinates Strip */}
      <div className="border-b border-hairline-grid py-2.5 px-3 sm:px-6 lg:px-8 text-[9px] sm:text-[10px] font-mono tracking-spec uppercase text-ink-graphite flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 bg-surface-white">
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1">
          <span className="font-semibold text-ink-carbon">
            <TechnicalDecryptedText text="LAT/LONG: 25.4528° N, 81.8349° E" duration={260} />
          </span>
          <span className="text-hairline-grid hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            <TechnicalDecryptedText text="ELEVATION: 98 M ASL" duration={240} delay={60} />
          </span>
          <span className="text-hairline-grid hidden sm:inline">|</span>
          <span>DISTRICT: PRAYAGRAJ, UP</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-crimson font-bold">MON–SAT: 10:00–20:00 IST</span>
          <span className="text-hairline-grid">|</span>
          <span>SUN: CLOSED (BREAKDOWN ON-CALL)</span>
        </div>
      </div>

      {/* Main Dual-Facility Blueprint Grid */}
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Facility 1: Central Workshop (56, M.G. Marg) */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={0} direction="up" distance={20} className="h-full">
              <div className="double-bezel p-5 sm:p-7 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
                    <span className="px-2 py-0.5 bg-crimson-tint text-crimson border border-crimson-border text-[10px] font-mono font-bold tracking-spec uppercase rounded-spec">
                      FACILITY 01 // CENTRAL WORKSHOP
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted">EST. 1960</span>
                  </div>

                  <MaskedHeading as="h3" className="font-display font-bold text-xl text-ink-carbon uppercase tracking-tight mb-2">
                    HINDUSTAN GARAGE
                  </MaskedHeading>
                  <p className="text-xs text-ink-graphite font-mono mb-4">
                Full-Service Multi-Brand Mechanical, ECM Diagnostics, Sunroof Cleanroom & 60°C Cashless Paint Booth.
              </p>

              {/* Facility 01 Architectural Exterior Image */}
              <div className="relative w-full h-44 mb-4 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group">
                <img 
                  src="/images/facility_01_mg_marg.jpg" 
                  alt="Hindustan Garage 56 M.G. Marg Civil Lines Facade" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-white/90 backdrop-blur-sm border border-hairline-grid text-ink-carbon text-[9px] font-mono tracking-spec uppercase rounded-spec">
                  CIVIL LINES CENTRAL WORKSHOP
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-ink-graphite">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                  <span>56, Mahatma Gandhi Marg, Civil Lines, Prayagraj, UP 211001 (Near High Court)</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-crimson shrink-0" />
                  <a href="tel:+918796576868" className="hover:text-crimson font-bold min-h-[44px] inline-flex items-center">+91 8796576868</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-crimson shrink-0" />
                  <span>Operating Mon–Sat: 10:00 – 20:00 IST</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline-grid flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://maps.google.com/?q=56+Mahatma+Gandhi+Marg+Civil+Lines+Prayagraj"
                target="_blank"
                rel="noopener noreferrer"
                className="press-feedback inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-spec font-semibold text-ink-carbon hover:text-crimson min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-crimson" />
                <span>Navigate to M.G. Marg</span>
                <ExternalLink className="w-3 h-3 text-ink-muted" />
              </a>

              <StatusBeacon />
            </div>
          </div>
        </RevealOnScroll>
      </div>

          {/* Facility 2: Speed Parts Depot (Medical Chauraha) */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={100} direction="up" distance={20} className="h-full">
              <div className="double-bezel p-4 sm:p-7 bg-surface-white rounded-spec shadow-bezel flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
                    <span className="px-2 py-0.5 bg-cobalt-tint text-cobalt border border-cobalt-border text-[10px] font-mono font-bold tracking-spec uppercase rounded-spec">
                      FACILITY 02 // WHOLESALE DEPOT
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted">EST. 2012</span>
                  </div>

                  <MaskedHeading as="h3" className="font-display font-bold text-xl text-ink-carbon uppercase tracking-tight mb-2">
                    SPEED PARTS PRAYAGRAJ
                  </MaskedHeading>
              <p className="text-xs text-ink-graphite font-mono mb-4">
                Wholesale Genuine Hyundai (Mobis) OEM Spares & Multi-Brand Regional Trade Supply Hub.
              </p>

              {/* Facility 02 Warehouse Architectural Image */}
              <div className="relative w-full h-44 mb-4 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group">
                <img 
                  src="/images/speed_parts_warehouse_racks.jpg" 
                  alt="Speed Parts George Town Spares Depot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-white/90 backdrop-blur-sm border border-hairline-grid text-ink-carbon text-[9px] font-mono tracking-spec uppercase rounded-spec">
                  GEORGE TOWN WHOLESALE DEPOT
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-ink-graphite">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
                  <span>Medical Chauraha, George Town, Prayagraj, UP 211002</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-cobalt shrink-0" />
                  <a href={`https://wa.me/${HINDUSTAN_GARAGE_WHATSAPP}`} className="hover:text-cobalt font-bold min-h-[44px] inline-flex items-center">
                    +91 8796576868 (Trade Desk)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cobalt shrink-0" />
                  <span>Trade Desk Mon–Sat: 10:00 – 20:00 IST</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline-grid flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://maps.google.com/?q=Medical+Chauraha+George+Town+Prayagraj"
                target="_blank"
                rel="noopener noreferrer"
                className="press-feedback inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-spec font-semibold text-ink-carbon hover:text-cobalt min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-cobalt" />
                <span>Navigate to George Town Depot</span>
                <ExternalLink className="w-3 h-3 text-ink-muted" />
              </a>

              <span className="px-2 py-0.5 bg-cobalt text-white text-[9px] font-mono uppercase rounded-spec font-bold">
                WHOLESALE & RETAIL
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>

          {/* Quick Indices & Legal Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-3 font-bold">
                SYSTEM INDEX
              </span>
              <ul className="space-y-1 sm:space-y-2 text-xs font-mono uppercase tracking-spec text-ink-graphite">
                <li><a href="#service-matrix" className="hover:text-crimson min-h-[36px] inline-flex items-center">01. Service Matrix</a></li>
                <li><a href="#portfolio" className="hover:text-crimson min-h-[36px] inline-flex items-center">02. Mastered Marques</a></li>
                <li><a href="#booking-terminal" className="hover:text-crimson min-h-[36px] inline-flex items-center">03. Slot Terminal</a></li>
                <li><a href="#speed-parts" className="hover:text-cobalt min-h-[36px] inline-flex items-center">04. Speed Parts B2B</a></li>
                <li><a href="#heritage-timeline" className="hover:text-crimson min-h-[36px] inline-flex items-center">05. 1960 Heritage</a></li>
                <li><a href="#journal-hub" className="hover:text-crimson min-h-[36px] inline-flex items-center">06. Technical Journal</a></li>
              </ul>
            </div>

            <div className="pt-6 border-t border-hairline-grid text-[10px] font-mono text-ink-muted">
              <span>EST. 1960 // PRAYAGRAJ</span>
              <span className="block mt-1">ALL RIGHTS RESERVED</span>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-14 pt-6 border-t border-hairline-grid flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-spec text-ink-muted">
          <div>
            © 1960 – 2026 HINDUSTAN GARAGE & SPEED PARTS. 56, M.G. MARG, CIVIL LINES, PRAYAGRAJ.
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>ARCHITECTURAL LIGHT MODE SYSTEM</span>
            <span className="text-hairline-grid hidden xs:inline">|</span>
            <span className="text-crimson">66 YEARS OF CONTINUOUS STEWARDSHIP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
