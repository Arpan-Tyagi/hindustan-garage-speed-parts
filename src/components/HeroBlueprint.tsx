import React, { useState } from 'react';
import { Cpu, ShieldCheck, Paintbrush, Activity, Gauge, PackageCheck, ArrowRight } from 'lucide-react';

interface HotspotPin {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  system: string;
  xPercent: number; // Position on SVG canvas
  yPercent: number;
  metric: string;
  tolerance: string;
  tooling: string;
  bayId: string;
  color: 'crimson' | 'cobalt';
  icon: React.ReactNode;
}

interface HeroBlueprintProps {
  onSelectBay: (bayId: string) => void;
}

export const HeroBlueprint: React.FC<HeroBlueprintProps> = ({ onSelectBay }) => {
  const [activePinId, setActivePinId] = useState<string>('pin-1');
  const [viewMode, setViewMode] = useState<'photo' | 'cad'>('photo');

  const pins: HotspotPin[] = [
    {
      id: 'pin-1',
      number: '01',
      title: 'ECM & OBD-II Scanner',
      subtitle: 'Engine & Sensor Network',
      system: 'Bosch KTS 590 / Launch PAD VII',
      xPercent: 28,
      yPercent: 32,
      metric: '0 FAULT CODES / LIVE DTC',
      tolerance: '±0.01V CAN-Bus Bus-Line',
      tooling: 'Bosch Diagnostics J2534 Online Coding',
      bayId: 'bay-01',
      color: 'crimson',
      icon: <Cpu className="w-3.5 h-3.5" />
    },
    {
      id: 'pin-2',
      number: '02',
      title: 'Luxury Marques Calibration',
      subtitle: 'BMW, Mercedes, Audi, Land Rover',
      system: 'Adaptive Suspension & DDE Unit',
      xPercent: 48,
      yPercent: 25,
      metric: 'AIR STRUT COMPRESSION 100%',
      tolerance: 'Height Variance < 1.0 mm',
      tooling: 'ZF Transmission & Air Spring Calibrator',
      bayId: 'bay-01',
      color: 'crimson',
      icon: <ShieldCheck className="w-3.5 h-3.5" />
    },
    {
      id: 'pin-3',
      number: '03',
      title: 'Cashless Paint & Denting',
      subtitle: '60°C Sealed Baking Chamber',
      system: 'Blowtherm Positive-Pressure Booth',
      xPercent: 78,
      yPercent: 42,
      metric: '60°C INFRARED HIGH-BAKE',
      tolerance: 'BYK Spectro Match: ΔE < 0.2',
      tooling: 'Cromax / PPG High-Solid Clearcoat',
      bayId: 'bay-06',
      color: 'crimson',
      icon: <Paintbrush className="w-3.5 h-3.5" />
    },
    {
      id: 'pin-4',
      number: '04',
      title: 'Suspension & Shocker Rebuild',
      subtitle: 'Underchassis MacPherson & Arms',
      system: '30-Ton Press & Corghi 3D Alignment',
      xPercent: 25,
      yPercent: 72,
      metric: 'DAMPING EFFICIENCY 99.4%',
      tolerance: 'Camber/Toe: 0.00° Precision',
      tooling: 'Monroe / Bilstein Dynamic Testing Rig',
      bayId: 'bay-03',
      color: 'crimson',
      icon: <Activity className="w-3.5 h-3.5" />
    },
    {
      id: 'pin-5',
      number: '05',
      title: 'EPS Steering & HVAC Flush',
      subtitle: 'Rack, Pinion & Cabin Climate',
      system: 'MTS Electric Column Calibration',
      xPercent: 52,
      yPercent: 68,
      metric: 'CABIN DELTA T: -14.6°C',
      tolerance: 'Steering Backlash: 0.00 mm',
      tooling: 'Robinair Dual-Gas R134a/R1234yf Station',
      bayId: 'bay-02',
      color: 'crimson',
      icon: <Gauge className="w-3.5 h-3.5" />
    },
    {
      id: 'pin-6',
      number: '06',
      title: 'Speed Parts Wholesale Spares',
      subtitle: 'Hyundai Genuine & Multi-Brand',
      system: 'George Town Central Spares Hub',
      xPercent: 82,
      yPercent: 75,
      metric: '4,000+ OEM SKUs ON-SHELF',
      tolerance: '100% Mobis Hologram Verified',
      tooling: 'HSN Standardized Wholesale Trade Desk',
      bayId: 'speed-parts',
      color: 'cobalt',
      icon: <PackageCheck className="w-3.5 h-3.5" />
    }
  ];

  const activePin = pins.find((p) => p.id === activePinId) || pins[0];

  return (
    <div className="relative w-full double-bezel p-4 sm:p-6 bg-surface-white rounded-spec overflow-hidden shadow-elevated">
      {/* Blueprint Header Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-hairline-grid text-[9px] sm:text-[10px] font-mono uppercase tracking-spec gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shrink-0" />
          <span className="font-semibold text-ink-carbon truncate">CHASSIS DIAGNOSTIC TELEMETRY</span>
          <span className="text-ink-muted hidden xs:inline">· STAGE: DAYLIGHT STUDIO</span>
        </div>
        
        {/* View Mode Toggle: Photo Stage vs CAD Blueprint */}
        <div className="flex items-center gap-1 bg-canvas-alabaster p-0.5 rounded-spec border border-hairline-grid">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded-spec text-[9px] font-mono transition-colors min-h-[24px] cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-crimson text-white font-bold shadow-sm'
                : 'text-ink-graphite hover:text-ink-carbon'
            }`}
          >
            PHOTO STAGE
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cad')}
            className={`px-2.5 py-1 rounded-spec text-[9px] font-mono transition-colors min-h-[24px] cursor-pointer ${
              viewMode === 'cad'
                ? 'bg-ink-carbon text-white font-bold shadow-sm'
                : 'text-ink-graphite hover:text-ink-carbon'
            }`}
          >
            CAD BLUEPRINT
          </button>
        </div>
      </div>

      {/* Interactive Blueprint Canvas Stage */}
      <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] bg-canvas-alabaster rounded-spec border border-hairline-grid flex items-center justify-center overflow-hidden grid-hairline">
        
        {viewMode === 'photo' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
            <img 
              src="/images/hero_workshop_stage.jpg" 
              alt="Hindustan Garage Cleanroom Daylight Inspection Stage" 
              className="w-full h-full object-cover select-none"
              loading="eager"
            />
            {/* Ambient vignette so telemetry hotspots pop crisp and legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25 pointer-events-none" />
            <div className="absolute top-2.5 left-2.5 xs:top-3 xs:left-3 px-2 py-1 bg-surface-white/90 backdrop-blur-sm border border-hairline-grid rounded-spec text-[8px] xs:text-[9px] font-mono uppercase tracking-spec text-ink-carbon shadow-sm pointer-events-none">
              PHOTOGRAPHIC TELEMETRY STAGE // 56, M.G. MARG
            </div>
            <div className="absolute bottom-2.5 right-2.5 xs:bottom-3 xs:right-3 px-2 py-1 bg-ink-carbon/80 backdrop-blur-sm border border-white/20 rounded-spec text-[8px] xs:text-[9px] font-mono uppercase tracking-spec text-white shadow-sm pointer-events-none hidden xs:block">
              CLICK HOTSPOTS TO INSPECT 6 BAYS
            </div>
          </div>
        ) : (
          <>
            {/* Subtle Architectural Dimension Overlays */}
            <div className="absolute top-2.5 left-2.5 xs:top-3 xs:left-3 text-[8px] xs:text-[9px] font-mono text-ink-muted tracking-spec flex flex-col gap-0.5 pointer-events-none">
              <span>WHEELBASE: 2,975 MM</span>
              <span className="hidden xs:inline">TRACK WIDTH: 1,605 MM</span>
              <span className="hidden sm:inline">GROUND CLEARANCE: 165 MM</span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 xs:bottom-3 xs:right-3 text-[8px] xs:text-[9px] font-mono text-ink-muted tracking-spec text-right pointer-events-none">
              <span className="hidden xs:inline">CHASSIS: HIGH-TENSILE MONOCOQUE</span>
              <span className="block">EST. 1960 // PRECISION BENCH</span>
            </div>

            {/* Vector Automotive Wireframe Chassis (Daylight Stylized SVG) */}
            <svg 
              viewBox="0 0 800 450" 
              className="w-full h-full max-h-[360px] opacity-90 select-none pointer-events-none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Car Body Silhouette (Precision Architectural Wireframe) */}
              <path 
                d="M 120 280 C 120 240, 160 210, 210 200 L 290 190 L 390 130 C 440 100, 560 100, 610 130 L 690 190 L 730 200 C 760 210, 770 240, 770 280 L 770 300 C 770 310, 760 320, 750 320 L 710 320 C 700 290, 660 270, 630 270 C 600 270, 560 290, 550 320 L 290 320 C 280 290, 240 270, 210 270 C 180 270, 140 290, 130 320 L 100 320 C 90 320, 80 310, 80 300 Z" 
                stroke="#111215" 
                strokeWidth="1.75" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="#FFFFFF"
                fillOpacity="0.4"
              />

              {/* Roof & Greenhouse Structure */}
              <path 
                d="M 300 190 L 395 138 C 430 115, 545 115, 580 138 L 665 190 Z" 
                stroke="#52565E" 
                strokeWidth="1.2" 
                strokeDasharray="4 3" 
                fill="none" 
              />

              {/* Windows / Pillars */}
              <line x1="490" y1="120" x2="490" y2="190" stroke="#52565E" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="395" y1="138" x2="385" y2="190" stroke="#52565E" strokeWidth="1" />
              <line x1="580" y1="138" x2="590" y2="190" stroke="#52565E" strokeWidth="1" />

              {/* Front Wheel Assembly with Disc Brake Wireframe */}
              <circle cx="210" cy="320" r="48" stroke="#111215" strokeWidth="2" fill="#F6F5F0" />
              <circle cx="210" cy="320" r="30" stroke="#52565E" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="210" cy="320" r="12" stroke="#B81D13" strokeWidth="1.5" />
              <line x1="180" y1="320" x2="240" y2="320" stroke="#52565E" strokeWidth="1" />
              <line x1="210" y1="290" x2="210" y2="350" stroke="#52565E" strokeWidth="1" />

              {/* Rear Wheel Assembly */}
              <circle cx="630" cy="320" r="48" stroke="#111215" strokeWidth="2" fill="#F6F5F0" />
              <circle cx="630" cy="320" r="30" stroke="#52565E" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="630" cy="320" r="12" stroke="#0F4C81" strokeWidth="1.5" />
              <line x1="600" y1="320" x2="660" y2="320" stroke="#52565E" strokeWidth="1" />
              <line x1="630" y1="290" x2="630" y2="350" stroke="#52565E" strokeWidth="1" />

              {/* Engine Bay Block Lines (Front Left) */}
              <rect x="140" y="225" width="75" height="45" stroke="#B81D13" strokeWidth="1" strokeDasharray="2 2" fill="none" />
              <line x1="140" y1="225" x2="215" y2="270" stroke="#B81D13" strokeWidth="0.75" />
              <line x1="140" y1="270" x2="215" y2="225" stroke="#B81D13" strokeWidth="0.75" />

              {/* Underchassis Exhaust & Multi-Link Axle Lines */}
              <path d="M 220 280 L 380 280 L 580 280 L 730 285" stroke="#DCD9D0" strokeWidth="1.5" />
              <circle cx="490" cy="280" r="8" stroke="#52565E" strokeWidth="1" strokeDasharray="2 2" />

              {/* Precision Centerlines */}
              <line x1="50" y1="320" x2="790" y2="320" stroke="#DCD9D0" strokeWidth="0.75" strokeDasharray="6 4" />
            </svg>
          </>
        )}

        {/* 6 Interactive Hotspot Diagnostic Pins with Accessible Touch Targets (min 44x44px) */}
        {pins.map((pin, idx) => {
          const isActive = activePinId === pin.id;
          const isCobalt = pin.color === 'cobalt';
          const radarAnimation = idx % 3 === 0 ? 'animate-radar' : idx % 3 === 1 ? 'animate-radar-offset-1' : 'animate-radar-offset-2';

          return (
            <button
              key={pin.id}
              type="button"
              data-cursor="inspect"
              onClick={() => setActivePinId(pin.id)}
              onMouseEnter={() => setActivePinId(pin.id)}
              style={{
                left: `${pin.xPercent}%`,
                top: `${pin.yPercent}%`
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none w-11 h-11 flex items-center justify-center p-0 transition-transform duration-200 cursor-pointer ${
                isActive ? 'scale-125' : 'hover:scale-110'
              }`}
              title={pin.title}
              aria-label={`Select ${pin.title}`}
            >
              {/* Radar Pulse Rings (asynchronous calibrated wave) */}
              <span className="relative flex items-center justify-center w-8 h-8 pointer-events-none">
                <span 
                  className={`${radarAnimation} absolute inline-flex h-full w-full rounded-full opacity-70 ${
                    isCobalt ? 'bg-cobalt' : 'bg-crimson'
                  }`} 
                />
                
                {/* Core Pin Disc */}
                <span 
                  className={`relative flex items-center justify-center w-6 h-6 rounded-full border shadow-sm transition-colors duration-150 ${
                    isActive
                      ? isCobalt
                        ? 'bg-cobalt text-white border-cobalt-dark shadow-md'
                        : 'bg-crimson text-white border-crimson-hover shadow-md'
                      : 'bg-surface-white text-ink-carbon border-hairline-grid hover:border-ink-carbon'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">
                    {pin.number}
                  </span>
                </span>
              </span>

              {/* Pin Hover Pill Tag (edge-safe alignment so it never clips past canvas boundaries) */}
              <span className={`hidden sm:block absolute top-full mt-1 px-2 py-0.5 bg-ink-carbon text-white text-[8px] font-mono uppercase tracking-wider rounded-spec whitespace-nowrap pointer-events-none transition-opacity shadow-sm ${
                pin.xPercent > 70 
                  ? 'right-0' 
                  : pin.xPercent < 30 
                  ? 'left-0' 
                  : 'left-1/2 -translate-x-1/2'
              } ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {pin.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Pin High-Contrast HUD Readout Module */}
      <div className="mt-4 p-3.5 sm:p-4 bg-canvas-alabaster border border-hairline-grid rounded-spec">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-spec flex items-center justify-center shrink-0 ${
              activePin.color === 'cobalt' 
                ? 'bg-cobalt text-white' 
                : 'bg-crimson text-white'
            }`}>
              {activePin.icon}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-spec uppercase px-1.5 py-0.5 bg-surface-white border border-hairline-grid rounded-spec">
                  PIN #{activePin.number}
                </span>
                <h4 className="font-display font-bold text-sm text-ink-carbon uppercase tracking-tight">
                  {activePin.title}
                </h4>
              </div>
              <p className="text-xs text-ink-graphite font-mono mt-0.5">
                {activePin.subtitle} · {activePin.system}
              </p>
            </div>
          </div>

          {/* Telemetry Metrics & Action Button */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-hairline-grid">
            <div className="flex flex-col text-left xs:text-right">
              <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec">
                TELEMETRY TOLERANCE
              </span>
              <span className="text-xs font-mono font-bold text-ink-carbon tabular-nums">
                {activePin.metric}
              </span>
            </div>

            <button
              onClick={() => {
                if (activePin.bayId === 'speed-parts') {
                  const element = document.getElementById('speed-parts');
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onSelectBay(activePin.bayId);
                }
              }}
              className="press-feedback inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-ink-carbon hover:bg-black text-white text-[11px] font-mono uppercase tracking-spec rounded-spec shrink-0 font-medium transition-colors min-h-[44px]"
            >
              <span>{activePin.bayId === 'speed-parts' ? 'Trade Catalog' : 'Book Bay'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-crimson" />
            </button>
          </div>
        </div>

        {/* Diagnostic Tool Spec */}
        <div className="mt-2.5 pt-2 border-t border-hairline-grid text-[10px] font-mono text-ink-muted flex flex-wrap items-center justify-between gap-1">
          <span className="truncate">DEPLOYED TOOL: {activePin.tooling}</span>
          <span className="hidden sm:inline">TOLERANCE: {activePin.tolerance}</span>
        </div>
      </div>
    </div>
  );
};
