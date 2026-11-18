import React, { useState, useEffect } from 'react';
import { SPEED_PARTS_CATALOG } from '../data/parts';
import { SpeedPart } from '../types';
import { generateTradeInquiryWhatsAppUrl, HINDUSTAN_GARAGE_WHATSAPP } from '../utils/whatsapp';
import { Package, Search, MessageSquare, ArrowRight, Truck, MapPin, X } from 'lucide-react';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';
import { Odometer } from './ui/Odometer';

export const SpeedPartsCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPartForTrade, setSelectedPartForTrade] = useState<SpeedPart | null>(null);
  const [tradeQuantity, setTradeQuantity] = useState<number>(2);
  const [garageName, setGarageName] = useState<string>('');

  // Handle modal escape key and prevent body scroll while active
  useEffect(() => {
    if (!selectedPartForTrade) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPartForTrade(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPartForTrade]);

  const filteredParts = SPEED_PARTS_CATALOG.filter((part) => {
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery = 
      part.name.toLowerCase().includes(query) ||
      part.oePartNumber.toLowerCase().includes(query) ||
      part.hsnCode.includes(query) ||
      part.compatibleModels.some(m => m.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const categories = [
    { id: 'all', label: 'All Catalog Spares' },
    { id: 'hyundai-oem', label: 'Hyundai Genuine OEM (Mobis)' },
    { id: 'suspension', label: 'Suspension & Steering' },
    { id: 'braking', label: 'Braking & Friction' },
    { id: 'transmission', label: 'Clutch & Transmission' },
    { id: 'electrical', label: 'Electrical & Sensors' },
    { id: 'body', label: 'Body & Cooling' }
  ];

  const handleOpenTradeModal = (part: SpeedPart) => {
    setSelectedPartForTrade(part);
    setTradeQuantity(part.moq || 2);
  };

  const handleDispatchTradeWhatsApp = () => {
    if (!selectedPartForTrade) return;
    const url = generateTradeInquiryWhatsAppUrl(
      selectedPartForTrade,
      tradeQuantity,
      garageName || 'Trade Buyer / Independent Workshop'
    );
    window.open(url, '_blank');
    setSelectedPartForTrade(null);
  };

  return (
    <section id="speed-parts" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface-white border-b border-hairline-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Cobalt Thematic Shift Architectural Banner */}
        <div className="double-bezel p-6 sm:p-8 bg-gradient-to-r from-cobalt-tint via-surface-white to-cobalt-tint border-cobalt-border rounded-spec shadow-elevated mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cobalt text-white rounded-spec text-[10px] font-mono uppercase tracking-spec font-bold mb-3">
                <Package className="w-3.5 h-3.5" />
                <span>
                  <TechnicalDecryptedText text="SUB-VENTURE B2B WHOLESALE // EST. 2012" duration={280} />
                </span>
              </div>

              <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
                SPEED PARTS <span className="text-cobalt">PRAYAGRAJ</span>
              </MaskedHeading>

              <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl leading-relaxed">
                Prayagraj’s specialized wholesale and retail distribution center for <strong className="text-ink-carbon font-semibold">Hyundai Genuine (Mobis) OEM Parts</strong> and multi-brand mechanical components. Supplying 120+ registered garages across a 100–150 km Eastern UP radius at direct wholesale prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="p-3 bg-surface-white border border-cobalt-border rounded-spec text-xs font-mono">
                <div className="flex items-center gap-1.5 text-cobalt font-bold mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>CENTRAL DEPOT LOCATION</span>
                </div>
                <span className="text-ink-carbon font-medium">Medical Chauraha, George Town, Prayagraj</span>
              </div>

              <div className="p-3 bg-cobalt text-white rounded-spec text-xs font-mono flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase text-cobalt-tint block">REGIONAL LOGISTICS</span>
                  <span className="font-bold">100–150 KM Same-Day Dispatch</span>
                </div>
                <Truck className="w-5 h-5 text-cobalt-tint" />
              </div>
            </div>
          </div>
        </div>

        {/* Speed Parts Architectural Depot Visual Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7 relative h-64 sm:h-80 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group">
            <img 
              src="/images/speed_parts_warehouse_racks.jpg" 
              alt="Speed Parts George Town Central Wholesale Warehouse" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-spec text-cobalt-tint block">CENTRAL LOGISTICS DEPOT</span>
                <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight">Medical Chauraha, George Town</span>
              </div>
              <span className="px-2.5 py-1 bg-cobalt text-white text-[9px] font-mono uppercase font-bold rounded-spec inline-flex items-center gap-1">
                <Odometer value={4000} suffix="+" duration={1200} /> SKUs ON-SHELF
              </span>
            </div>
          </div>

          <div className="md:col-span-5 relative h-64 sm:h-80 rounded-spec overflow-hidden border border-hairline-grid bg-canvas-alabaster group">
            <img 
              src="/images/speed_parts_genuine_components.jpg" 
              alt="Speed Parts Hyundai Genuine OEM Spares with Hologram" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-spec text-cobalt-tint block">OEM AUTHENTICITY</span>
                <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight">Mobis Security Hologram Guaranteed</span>
              </div>
              <span className="px-2 py-1 bg-surface-white/90 text-cobalt text-[9px] font-mono uppercase font-bold rounded-spec">
                100% GENUINE
              </span>
            </div>
          </div>
        </div>

        {/* Catalog Control Bar: Search & Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Live Search Input with Instant Clear */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Part Name, Model (e.g. Creta), OE Part No, or HSN Code..."
              className="w-full pl-10 pr-9 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-xs font-mono text-ink-carbon focus:border-cobalt focus:outline-none min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-ink-muted hover:text-ink-carbon"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-ink-muted self-end md:self-center">
            SHOWING: <strong className="text-ink-carbon">{filteredParts.length}</strong> VERIFIED SKUs
          </div>
        </div>

        {/* Category Filter Pills - min 44px accessible touch targets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono tracking-spec uppercase touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2.5 rounded-spec whitespace-nowrap transition-colors border min-h-[44px] flex items-center justify-center ${
                selectedCategory === cat.id
                  ? 'bg-cobalt text-white border-cobalt font-semibold shadow-sm'
                  : 'bg-canvas-alabaster text-ink-graphite border-hairline-grid hover:border-ink-carbon'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Zero-E-Commerce Click-to-WhatsApp Product Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part: SpeedPart, idx: number) => (
            <RevealOnScroll key={part.id} delay={(idx % 6) * 50} direction="up" distance={20} className="h-full">
              <div
                className="double-bezel p-5 sm:p-6 bg-surface-white rounded-spec flex flex-col justify-between hover:border-cobalt transition-colors duration-200 shadow-bezel group h-full"
              >
              <div>
                {/* Top Badge: Category & Stock Indicator */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-grid">
                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-spec rounded-spec font-bold ${
                    part.category === 'hyundai-oem'
                      ? 'bg-cobalt-tint text-cobalt border border-cobalt-border'
                      : 'bg-canvas-alabaster text-ink-carbon border border-hairline-grid'
                  }`}>
                    {part.categoryLabel}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    IN STOCK
                  </span>
                </div>

                {/* Part Name */}
                <h3 className="font-display font-bold text-base text-ink-carbon uppercase tracking-tight mb-2 group-hover:text-cobalt transition-colors">
                  {part.name}
                </h3>

                {/* Technical Identifiers: OE Part Number & HSN Code */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec mb-3 text-[10px] font-mono">
                  <div>
                    <span className="text-ink-muted uppercase block">OE PART NUMBER</span>
                    <span className="font-bold text-ink-carbon truncate block">{part.oePartNumber}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted uppercase block">HSN CODE</span>
                    <span className="font-bold text-ink-carbon">{part.hsnCode}</span>
                  </div>
                </div>

                {/* Compatibility List */}
                <div className="mb-4">
                  <span className="text-[9px] font-mono uppercase text-ink-muted tracking-spec block mb-1">
                    VERIFIED COMPATIBLE MODELS
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {part.compatibleModels.map((model, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono text-ink-graphite"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Spec Notes */}
                <p className="text-xs text-ink-graphite font-sans leading-relaxed mb-4">
                  {part.specNotes}
                </p>
              </div>

              {/* Bottom: Wholesale Rate, Retail Price & Inquire on WhatsApp CTA */}
              <div className="pt-4 border-t border-hairline-grid">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <div>
                    <span className="text-[9px] uppercase text-ink-muted block">WHOLESALE TRADE (MOQ: {part.moq})</span>
                    <span className="text-base font-bold text-cobalt">{part.wholesalePriceFormatted}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase text-ink-muted block">RETAIL MRP</span>
                    <span className="text-ink-muted line-through">{part.retailPriceFormatted}</span>
                  </div>
                </div>

                {/* Click-to-WhatsApp Trade Inquiry Button */}
                <button
                  onClick={() => handleOpenTradeModal(part)}
                  data-cursor="cobalt"
                  className="press-feedback w-full flex items-center justify-center gap-2 py-3 bg-cobalt hover:bg-cobalt-hover text-white rounded-spec text-xs font-mono uppercase tracking-spec font-bold transition-colors shadow-sm min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Inquire on WhatsApp →</span>
                </button>
              </div>

            </div>
          </RevealOnScroll>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredParts.length === 0 && (
          <div className="p-8 sm:p-12 text-center bg-canvas-alabaster border border-hairline-grid rounded-spec">
            <Package className="w-8 h-8 text-ink-muted mx-auto mb-3" />
            <h4 className="font-display font-bold text-base text-ink-carbon uppercase">NO MATCHING PART NUMBER FOUND</h4>
            <p className="text-xs font-mono text-ink-graphite mt-1 max-w-md mx-auto">
              Our George Town depot stocks over 4,000 SKUs. If your specific OE part is not listed above, contact our WhatsApp trade desk directly for manual warehouse check.
            </p>
            <a
              href={`https://wa.me/${HINDUSTAN_GARAGE_WHATSAPP}?text=${encodeURIComponent(`Hello Speed Parts, I am looking for a spare part not listed in the digital catalog: ${searchQuery}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press-feedback inline-flex items-center gap-2 mt-4 px-4 py-3 bg-cobalt text-white text-xs font-mono uppercase rounded-spec min-h-[44px]"
            >
              <span>Query Warehouse on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>

      {/* TRADE INQUIRY MODAL */}
      {selectedPartForTrade && (
        <div 
          onClick={() => setSelectedPartForTrade(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="double-bezel max-w-md w-full max-h-[90vh] overflow-y-auto bg-surface-white rounded-spec p-5 sm:p-6 shadow-modal animate-scaleIn"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cobalt" />
                <h4 className="font-display font-bold text-base text-ink-carbon uppercase tracking-tight">
                  SPEED PARTS TRADE INQUIRY
                </h4>
              </div>
              <button
                onClick={() => setSelectedPartForTrade(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs font-mono text-ink-muted hover:text-ink-carbon p-1"
                aria-label="Close Trade Inquiry"
              >
                [CANCEL]
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono mb-5">
              <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec">
                <span className="text-[10px] text-ink-muted block uppercase">COMPONENT SPEC</span>
                <span className="font-bold text-ink-carbon block">{selectedPartForTrade.name}</span>
                <span className="text-[11px] text-cobalt font-semibold mt-0.5 block">
                  OE: {selectedPartForTrade.oePartNumber} · HSN: {selectedPartForTrade.hsnCode}
                </span>
              </div>

              <div>
                <label className="block text-[11px] uppercase text-ink-graphite mb-1 font-semibold">
                  Workshop / Buyer Name
                </label>
                <input
                  type="text"
                  value={garageName}
                  onChange={(e) => setGarageName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleDispatchTradeWhatsApp(); }}
                  placeholder="e.g. Apex Auto Services, Naini"
                  className="w-full px-3 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-cobalt focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase text-ink-graphite mb-1 font-semibold">
                  Requisition Quantity (MOQ: {selectedPartForTrade.moq})
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    min={selectedPartForTrade.moq}
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleDispatchTradeWhatsApp(); }}
                    className="w-24 px-3 py-2 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-mono text-ink-carbon focus:border-cobalt focus:outline-none min-h-[44px]"
                  />
                  <span className="text-[11px] text-ink-muted">
                    Estimated Trade Value: <strong className="text-cobalt">₹{((parseInt(selectedPartForTrade.wholesalePriceFormatted.replace(/[^\d]/g, ''), 10) || 0) * tradeQuantity).toLocaleString('en-IN')}</strong>{' '}
                    <span className="text-[10px] text-ink-muted">({selectedPartForTrade.wholesalePriceFormatted} × {tradeQuantity})</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-cobalt-tint border border-cobalt-border rounded-spec text-cobalt text-[11px] font-sans">
                Launches pre-populated WhatsApp requisition format to Speed Parts Trade Desk at Medical Chauraha, George Town.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedPartForTrade(null)}
                className="press-feedback flex-1 py-3 border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec font-medium min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDispatchTradeWhatsApp}
                className="press-feedback flex-1 flex items-center justify-center gap-2 py-3 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-mono uppercase tracking-spec font-bold rounded-spec min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Launch WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
