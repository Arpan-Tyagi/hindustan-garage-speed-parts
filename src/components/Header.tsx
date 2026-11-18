import React, { useState } from 'react';
import { StatusBeacon } from './ui/StatusBeacon';
import { PhoneCall, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollProgress();

  const navItems = [
    { number: '01', label: 'Services', href: '#service-matrix' },
    { number: '02', label: 'Portfolio', href: '#portfolio' },
    { number: '03', label: 'Slot Booking', href: '#booking-terminal' },
    { number: '04', label: 'Speed Parts B2B', href: '#speed-parts', isSpeedParts: true },
    { number: '05', label: '1960 Legacy', href: '#heritage-timeline' },
    { number: '06', label: 'Journal', href: '#journal-hub' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full bg-canvas-alabaster/95 backdrop-blur-md border-b border-hairline-grid transition-all duration-300 ${
      isScrolled ? 'shadow-[0_4px_20px_rgba(17,18,21,0.06)] bg-surface-white/95' : 'shadow-none'
    }`}>
      {/* Top Technical Metadata Bar */}
      <div className={`w-full bg-surface-white border-b border-hairline-grid px-3 sm:px-6 lg:px-8 text-[9px] sm:text-[10px] font-mono tracking-spec uppercase text-ink-graphite flex flex-wrap items-center justify-between gap-x-3 gap-y-1 transition-all duration-300 ${
        isScrolled ? 'py-1 opacity-90' : 'py-1.5 opacity-100'
      }`}>
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <span className="font-semibold text-ink-carbon shrink-0">
            <TechnicalDecryptedText text="EST. 1960" duration={220} />
          </span>
          <span className="text-hairline-grid shrink-0">|</span>
          <span className="hidden md:inline truncate">
            <TechnicalDecryptedText text="CENTRAL WORKSHOP: 56, M.G. MARG, CIVIL LINES, PRAYAGRAJ" duration={280} delay={60} />
          </span>
          <span className="hidden xs:inline md:hidden truncate">56, M.G. MARG, CIVIL LINES</span>
          <span className="xs:hidden truncate">56, M.G. MARG</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="hidden lg:inline">
            <TechnicalDecryptedText text="SPEED PARTS DEPOT: MEDICAL CHAURAHA, GEORGE TOWN" duration={280} delay={100} />
          </span>
          <span className="text-hairline-grid hidden lg:inline">|</span>
          <span className="text-crimson font-semibold">ALL WORK UNDER ONE ROOF</span>
        </div>
      </div>

      {/* Main Navigation Island */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Brand Mark & Monogram */}
        <a href="#" className="flex items-center gap-2 sm:gap-3.5 group shrink-0 min-h-[44px]">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-ink-carbon border border-ink-carbon rounded-spec flex items-center justify-center p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-105 shrink-0">
            <div className="w-full h-full border border-white/20 flex flex-col items-center justify-center relative">
              <span className="text-white font-mono font-bold text-[11px] sm:text-xs tracking-tighter">HG</span>
              <span className="text-[7px] text-crimson font-mono absolute -bottom-0.5 tracking-tighter">1960</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-sm xs:text-base sm:text-lg text-ink-carbon tracking-tight uppercase leading-none">
                Hindustan Garage
              </span>
              <span className="hidden xs:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-crimson-tint text-crimson border border-crimson-border rounded-spec font-medium shrink-0">
                EST. 1960
              </span>
            </div>
            <span className="hidden xs:block text-[10px] sm:text-[11px] font-mono text-ink-graphite tracking-tight uppercase mt-0.5">
              Prayagraj's Automotive Institution
            </span>
            <span className="xs:hidden text-[9px] font-mono text-ink-muted uppercase mt-0.5">
              EST. 1960 · CIVIL LINES
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (>= xl) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
          {navItems.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className={`text-xs font-mono uppercase tracking-spec transition-colors duration-150 flex items-center gap-1.5 py-2 group ${
                item.isSpeedParts 
                  ? 'text-cobalt font-semibold hover:text-cobalt-hover' 
                  : 'text-ink-graphite hover:text-ink-carbon'
              }`}
            >
              <span className="text-[10px] text-ink-muted group-hover:text-crimson transition-colors">
                {item.number}.
              </span>
              <span>{item.label}</span>
              {item.isSpeedParts && (
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Status Beacon & CTAs (>= xl) */}
        <div className="hidden xl:flex items-center gap-2.5 sm:gap-3">
          <StatusBeacon />

          {/* Emergency Telephone */}
          <a
            href="tel:+918796576868"
            className="press-feedback inline-flex items-center gap-2 px-3 py-2 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon hover:bg-surface-hover hover:border-ink-carbon transition-colors shrink-0 min-h-[44px]"
            title="Immediate Breakdown & Towing Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-crimson" />
            <span className="hidden 2xl:inline font-medium">+91 8796576868</span>
            <span className="2xl:hidden font-medium">Helpline</span>
          </a>

          {/* Book Inspection CTA */}
          <button
            onClick={onOpenBooking}
            className="press-feedback group inline-flex items-center gap-2.5 pl-3.5 pr-1.5 py-1.5 bg-ink-carbon text-white rounded-spec text-xs font-mono uppercase tracking-spec font-medium hover:bg-black transition-all shrink-0 min-h-[44px]"
          >
            <span>Book Bay</span>
            <div className="w-7 h-7 rounded-spec bg-white/10 flex items-center justify-center group-hover:bg-crimson transition-colors">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Controls (< xl) */}
        <div className="flex xl:hidden items-center gap-2 sm:gap-3">
          {/* Single status beacon visible on mobile & tablet without overflow */}
          <StatusBeacon />

          {/* Emergency Telephone (visible on tablet >= md) */}
          <a
            href="tel:+918796576868"
            className="press-feedback hidden md:inline-flex items-center gap-2 px-3 py-2 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon hover:bg-surface-hover hover:border-ink-carbon transition-colors shrink-0 min-h-[44px]"
            title="Immediate Breakdown & Towing Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-crimson" />
            <span className="font-medium">Helpline</span>
          </a>

          {/* Book Bay button (visible on tablet >= md) */}
          <button
            onClick={onOpenBooking}
            className="press-feedback group hidden md:inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-ink-carbon text-white rounded-spec text-xs font-mono uppercase tracking-spec font-medium hover:bg-black transition-all shrink-0 min-h-[44px]"
          >
            <span>Book Bay</span>
            <div className="w-7 h-7 rounded-spec bg-white/10 flex items-center justify-center group-hover:bg-crimson transition-colors">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 border border-hairline-grid bg-surface-white hover:bg-surface-hover rounded-spec text-ink-carbon flex items-center justify-center transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-crimson" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Staggered Slide Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-canvas-alabaster border-b border-hairline-grid px-4 sm:px-6 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-grid text-[10px] font-mono tracking-spec uppercase text-ink-muted">
              <span>INDEX NAVIGATION</span>
              <span>56, M.G. MARG & GEORGE TOWN</span>
            </div>

            {navItems.map((item) => (
              <a
                key={item.number}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-hairline-grid text-sm font-mono uppercase tracking-tight text-ink-carbon hover:text-crimson min-h-[44px] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-muted font-mono">{item.number}.</span>
                  <span className={item.isSpeedParts ? 'text-cobalt font-bold' : 'font-medium'}>
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-muted" />
              </a>
            ))}

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+918796576868"
                className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono uppercase font-semibold text-ink-carbon hover:bg-surface-hover min-h-[44px] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-crimson" />
                <span>Hotline: +91 8796576868</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-ink-carbon hover:bg-black text-white rounded-spec text-xs font-mono uppercase tracking-spec font-semibold min-h-[44px] transition-colors"
              >
                <Calendar className="w-4 h-4 text-crimson" />
                <span>Book Diagnostic Bay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
