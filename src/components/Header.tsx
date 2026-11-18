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
    { number: '03', label: 'Booking', href: '#booking-terminal' },
    { number: '04', label: 'Speed Parts', href: '#speed-parts', isSpeedParts: true, badge: 'B2B' },
    { number: '05', label: 'Heritage', href: '#heritage-timeline' },
    { number: '06', label: 'Journal', href: '#journal-hub' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full bg-canvas-alabaster/95 backdrop-blur-md border-b border-hairline-grid transition-all duration-300 ${
      isScrolled ? 'shadow-[0_4px_24px_rgba(17,18,21,0.06)] bg-surface-white/95' : 'shadow-none'
    }`}>
      {/* 01. Top Technical Metadata Ticker Bar */}
      <div className={`w-full bg-surface-white border-b border-hairline-grid px-3 sm:px-6 lg:px-8 text-[9px] sm:text-[9.5px] font-mono uppercase text-ink-graphite flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'py-1 opacity-90' : 'py-1.5 opacity-100'
      }`}>
        {/* Left: Foundation & Central Facility */}
        <div className="flex items-center truncate">
          <div className="flex items-center gap-1.5 font-bold text-ink-carbon shrink-0 tracking-[0.06em]">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson shrink-0" />
            <TechnicalDecryptedText text="EST. 1960" duration={220} />
          </div>

          <span className="inline-block w-[1px] h-2.5 bg-hairline-grid mx-2.5 sm:mx-3 shrink-0" />

          <span className="hidden md:inline truncate tracking-[0.04em] text-ink-graphite">
            <TechnicalDecryptedText text="CENTRAL WORKSHOP: 56, M.G. MARG, CIVIL LINES, PRAYAGRAJ" duration={280} delay={60} />
          </span>
          <span className="hidden xs:inline md:hidden truncate tracking-[0.04em]">56, M.G. MARG, CIVIL LINES</span>
          <span className="xs:hidden truncate tracking-[0.04em]">56, M.G. MARG</span>
        </div>

        {/* Right: Telemetry Status Beacon & Motto */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Status Beacon embedded in top telemetry bar on desktop */}
          <div className="hidden lg:flex items-center">
            <StatusBeacon className="bg-transparent border-0 shadow-none px-0 py-0 text-[9px] sm:text-[9.5px]" compactOnMobile={false} />
            <span className="inline-block w-[1px] h-2.5 bg-hairline-grid mx-2.5 sm:mx-3 shrink-0" />
          </div>

          <span className="hidden xl:inline text-ink-graphite tracking-[0.04em]">
            <TechnicalDecryptedText text="SPEED PARTS DEPOT: MEDICAL CHAURAHA, GEORGE TOWN" duration={280} delay={100} />
          </span>

          <span className="hidden xl:inline-block w-[1px] h-2.5 bg-hairline-grid mx-2.5 sm:mx-3 shrink-0" />

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-crimson-tint border border-crimson-border rounded-[2px] text-crimson font-bold text-[8.5px] tracking-[0.06em]">
            <span className="w-1 h-1 rounded-full bg-crimson" />
            <span>ALL WORK UNDER ONE ROOF</span>
          </div>
        </div>
      </div>

      {/* 02. Main Architectural Navigation Island */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[64px] sm:h-[68px] flex items-center justify-between gap-3 lg:gap-4">
        
        {/* Brand Mark & Institutional Monogram */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group shrink-0 min-h-[44px] focus:outline-none"
          aria-label="Hindustan Garage Home"
        >
          {/* Monogram Stamp */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-ink-carbon border border-ink-carbon rounded-spec flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-105 shrink-0 shadow-sm">
            <div className="w-full h-full border border-white/20 flex flex-col items-center justify-center relative">
              <span className="text-white font-mono font-bold text-[11px] sm:text-xs tracking-tight">HG</span>
              <span className="text-[7px] text-crimson font-mono font-bold absolute -bottom-0.5 tracking-tighter">1960</span>
            </div>
          </div>

          {/* Brand Titles with Crisp Compact Typography */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-[15px] sm:text-base text-ink-carbon tracking-tight uppercase leading-none group-hover:text-crimson transition-colors whitespace-nowrap">
                Hindustan Garage
              </span>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-[0.04em] bg-crimson-tint text-crimson border border-crimson-border rounded-[2px] shrink-0">
                EST. 1960
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-[9.5px] font-mono text-ink-muted uppercase tracking-[0.04em]">
              <span className="hidden xs:inline whitespace-nowrap">Prayagraj</span>
              <span className="hidden xs:inline text-hairline-grid">·</span>
              <span className="whitespace-nowrap">Civil Lines</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links (>= xl) */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
          {navItems.map((item) => {
            const isCobalt = item.isSpeedParts;
            return (
              <a
                key={item.number}
                href={item.href}
                data-cursor={isCobalt ? 'cobalt' : 'pointer'}
                className={`relative px-2.5 py-1.5 rounded-spec text-[13px] font-sans font-medium transition-all duration-150 flex items-center gap-1.5 group hover:bg-ink-carbon/[0.04] ${
                  isCobalt
                    ? 'text-cobalt font-semibold'
                    : 'text-ink-graphite hover:text-ink-carbon'
                }`}
              >
                {/* Micro Index Number */}
                <span className={`text-[10px] font-mono tabular-nums transition-colors ${
                  isCobalt 
                    ? 'text-cobalt/70 group-hover:text-cobalt' 
                    : 'text-ink-muted/80 group-hover:text-crimson'
                }`}>
                  {item.number}
                </span>

                <span className="text-[9px] text-hairline-grid font-mono select-none">/</span>

                {/* Nav Label in High-Legibility Proportional Sans */}
                <span className="whitespace-nowrap tracking-[-0.01em]">{item.label}</span>

                {/* B2B Wholesale Pill Badge */}
                {item.badge && (
                  <span className="px-1.5 py-0.2 bg-cobalt-tint text-cobalt border border-cobalt-border rounded-[2px] text-[8px] font-mono font-bold tracking-wider shrink-0">
                    {item.badge}
                  </span>
                )}

                {/* Bottom Hairline Draw on Hover */}
                <span className={`absolute bottom-0 left-2 right-2 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center ${
                  isCobalt ? 'bg-cobalt' : 'bg-crimson'
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Actions Cluster: Quick Actions (>= xl) */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 shrink-0">
          {/* Direct Telephone Helpline */}
          <a
            href="tel:+918796576868"
            data-cursor="pointer"
            className="press-feedback inline-flex items-center gap-2 px-3 py-1.5 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon hover:bg-surface-hover hover:border-ink-carbon transition-colors shrink-0 min-h-[40px] shadow-sm"
            title="Immediate Breakdown & Towing Helpline"
          >
            <div className="w-5 h-5 rounded-[2px] bg-crimson-tint flex items-center justify-center shrink-0">
              <PhoneCall className="w-3 h-3 text-crimson" />
            </div>
            <span className="hidden 2xl:inline font-semibold text-xs whitespace-nowrap">+91 8796576868</span>
            <span className="2xl:hidden font-semibold text-xs whitespace-nowrap">Helpline</span>
          </a>

          {/* Book Bay Primary CTA */}
          <button
            onClick={onOpenBooking}
            data-cursor="pointer"
            className="press-feedback group inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1 bg-ink-carbon hover:bg-black text-white rounded-spec text-xs font-mono uppercase tracking-[0.04em] font-semibold transition-all shrink-0 min-h-[40px] shadow-sm"
          >
            <span>Book Bay</span>
            <div className="w-6 h-6 rounded-[2px] bg-white/10 flex items-center justify-center group-hover:bg-crimson transition-colors shrink-0">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile & Tablet Controls (< xl) */}
        <div className="flex xl:hidden items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Status Beacon on Tablet & Mobile */}
          <StatusBeacon compactOnMobile={true} />

          {/* Telephone button on Tablet (>= md) */}
          <a
            href="tel:+918796576868"
            className="press-feedback hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-white border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon hover:bg-surface-hover hover:border-ink-carbon transition-colors shrink-0 min-h-[40px]"
            title="Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-crimson" />
            <span className="font-semibold">Helpline</span>
          </a>

          {/* Book Bay on Tablet (>= sm) */}
          <button
            onClick={onOpenBooking}
            className="press-feedback group hidden sm:inline-flex items-center gap-2 pl-3 pr-1.5 py-1 bg-ink-carbon text-white rounded-spec text-xs font-mono uppercase tracking-[0.04em] font-semibold hover:bg-black transition-all shrink-0 min-h-[40px]"
          >
            <span>Book Bay</span>
            <div className="w-6 h-6 rounded-[2px] bg-white/10 flex items-center justify-center group-hover:bg-crimson transition-colors">
              <Calendar className="w-3 h-3 text-white" />
            </div>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[40px] min-w-[40px] p-2 border border-hairline-grid bg-surface-white hover:bg-surface-hover rounded-spec text-ink-carbon flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-crimson" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 03. Mobile / Tablet Staggered Slide-Over Drawer (< xl) */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-surface-white border-b border-hairline-grid px-4 sm:px-6 py-6 shadow-elevated max-h-[calc(100vh-5rem)] overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-3">
            {/* Drawer Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline-grid text-[10px] font-mono tracking-[0.08em] uppercase text-ink-muted">
              <span className="flex items-center gap-1.5 font-bold text-ink-carbon">
                <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
                INDEX DIRECTORY
              </span>
              <span>56, M.G. MARG & GEORGE TOWN</span>
            </div>

            {/* Navigation Item Stack */}
            <div className="divide-y divide-hairline-grid">
              {navItems.map((item) => {
                const isCobalt = item.isSpeedParts;
                return (
                  <a
                    key={item.number}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-sm font-sans font-medium text-ink-carbon hover:text-crimson min-h-[44px] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono tabular-nums ${isCobalt ? 'text-cobalt font-bold' : 'text-ink-muted'}`}>
                        {item.number}.
                      </span>
                      <span className={isCobalt ? 'text-cobalt font-bold' : 'font-semibold'}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 bg-cobalt-tint text-cobalt border border-cobalt-border rounded-[2px] text-[8px] font-mono font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>

            {/* Quick Contact & Action Buttons in Drawer */}
            <div className="pt-4 mt-2 border-t border-hairline-grid flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+918796576868"
                className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 bg-canvas-alabaster border border-hairline-grid rounded-spec text-xs font-mono uppercase font-bold text-ink-carbon hover:bg-surface-hover min-h-[44px] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-crimson" />
                <span>Helpline: +91 8796576868</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 bg-ink-carbon hover:bg-black text-white rounded-spec text-xs font-mono uppercase tracking-[0.04em] font-bold min-h-[44px] transition-colors shadow-sm"
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
