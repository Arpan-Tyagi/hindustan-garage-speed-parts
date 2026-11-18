import React, { useState } from 'react';
import { MASTERED_VEHICLES } from '../data/portfolio';
import { VehicleCategory, VehicleMastered } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Clock, MapPin, Wrench, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

interface PortfolioProps {
  onBookMake: (make: string, model: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBookMake }) => {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('all');

  const filteredVehicles = MASTERED_VEHICLES.filter((veh) => {
    if (activeCategory === 'all') return true;
    return veh.category === activeCategory;
  });

  return (
    <section id="portfolio" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-canvas-alabaster border-b border-hairline-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
              <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
              <span>
                <TechnicalDecryptedText text="INDEX 02 // ARCHITECTURAL REPAIR LOGS" duration={280} />
              </span>
            </div>
            <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
              CARS WE HAVE MASTERED
            </MaskedHeading>
            <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl">
              An institutional registry of vehicles restored across our 6 bays. From German luxury air-suspension rebuilds to daily four-wheeler sunroof tracks and cashless insurance paint booth finishes.
            </p>
          </div>

          {/* Category Filter Tabs - min 44px accessible touch targets */}
          <div className="flex flex-wrap sm:inline-flex p-1 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono uppercase tracking-spec shadow-bezel gap-1 max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2.5 rounded-spec transition-colors min-h-[44px] flex items-center justify-center ${
                activeCategory === 'all'
                  ? 'bg-ink-carbon text-white font-semibold'
                  : 'text-ink-graphite hover:text-ink-carbon'
              }`}
            >
              All Marques ({MASTERED_VEHICLES.length})
            </button>
            <button
              onClick={() => setActiveCategory('luxury')}
              className={`px-3.5 py-2.5 rounded-spec transition-colors min-h-[44px] flex items-center justify-center ${
                activeCategory === 'luxury'
                  ? 'bg-ink-carbon text-white font-semibold'
                  : 'text-ink-graphite hover:text-ink-carbon'
              }`}
            >
              Luxury Marques ({MASTERED_VEHICLES.filter(v => v.category === 'luxury').length})
            </button>
            <button
              onClick={() => setActiveCategory('daily')}
              className={`px-3.5 py-2.5 rounded-spec transition-colors min-h-[44px] flex items-center justify-center ${
                activeCategory === 'daily'
                  ? 'bg-ink-carbon text-white font-semibold'
                  : 'text-ink-graphite hover:text-ink-carbon'
              }`}
            >
              Everyday 4-Wheelers ({MASTERED_VEHICLES.filter(v => v.category === 'daily').length})
            </button>
          </div>
        </div>

        {/* INTERACTIVE BEFORE/AFTER SLIDER MODULE */}
        <div className="mb-14">
          <BeforeAfterSlider />
        </div>

        {/* Mastered Vehicles Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVehicles.map((vehicle: VehicleMastered, idx: number) => (
            <RevealOnScroll key={vehicle.id} delay={(idx % 4) * 60} direction="up" distance={20} className="h-full">
              <div
                className="double-bezel p-5 sm:p-6 bg-surface-white rounded-spec flex flex-col justify-between hover:border-ink-carbon transition-colors duration-200 shadow-bezel h-full"
              >
              <div>
                {/* Header: Make, Model, Year & Tag */}
                <div className="flex items-start justify-between gap-4 pb-3 mb-3 border-b border-hairline-grid">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xl text-ink-carbon tracking-tight uppercase">
                        {vehicle.make} {vehicle.model}
                      </span>
                      <span className="text-xs font-mono font-medium text-ink-muted">
                        ({vehicle.year})
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-ink-graphite mt-0.5 block">
                      POWERTRAIN: {vehicle.engineSpec}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-spec rounded-spec font-bold ${
                    vehicle.category === 'luxury' 
                      ? 'bg-crimson-tint text-crimson border border-crimson-border' 
                      : 'bg-canvas-alabaster text-ink-carbon border border-hairline-grid'
                  }`}>
                    {vehicle.tag}
                  </span>
                </div>

                {/* Vehicle Photographic Visual Stage */}
                {vehicle.imageUrl && (
                  <div className="relative w-full h-48 mb-4 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group/img">
                    <img 
                      src={vehicle.imageUrl} 
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-white/90 backdrop-blur-sm border border-hairline-grid text-ink-carbon text-[9px] font-mono tracking-spec uppercase rounded-spec">
                      MASTERED AT 56, M.G. MARG
                    </div>
                  </div>
                )}

                {/* Scope of Work */}
                <div className="mb-4">
                  <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec block mb-1">
                    PRIMARY DIAGNOSTIC & REPAIR SCOPE
                  </span>
                  <p className="text-sm font-semibold text-ink-carbon font-sans">
                    {vehicle.scope}
                  </p>
                </div>

                {/* Replaced OEM Components Spec Box */}
                <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec mb-4">
                  <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec block mb-1.5">
                    PARTS DEPLOYED & CALIBRATED
                  </span>
                  <ul className="space-y-1">
                    {vehicle.replacedComponents.map((part, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] font-mono text-ink-carbon">
                        <Wrench className="w-3 h-3 text-crimson shrink-0" />
                        <span className="truncate">{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Customer Feedback Snippet */}
                <div className="mb-4 p-3 bg-surface-white border-l-2 border-crimson text-xs italic text-ink-graphite font-sans leading-relaxed">
                  {vehicle.customerSnippet}
                </div>
              </div>

              {/* Card Footer: Metadata & Booking Link */}
              <div className="pt-3 border-t border-hairline-grid flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] font-mono text-ink-muted">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-crimson" />
                    <span>{vehicle.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-ink-carbon" />
                    <span>{vehicle.ownerCity}</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookMake(vehicle.make, vehicle.model)}
                  data-cursor="pointer"
                  className="press-feedback inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-spec font-semibold text-crimson hover:text-crimson-hover min-h-[44px]"
                >
                  <span>Book {vehicle.make} Inspection</span>
                  <ChevronRight className="w-3.5 h-3.5" />
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
