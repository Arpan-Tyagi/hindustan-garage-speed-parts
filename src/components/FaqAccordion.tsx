import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqs';
import { FaqItem } from '../types';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

export const FaqAccordion: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-01');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface-white border-b border-hairline-grid">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-canvas-alabaster border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-crimson" />
            <span>
              <TechnicalDecryptedText text="INSTITUTIONAL FAQ // OPERATIONS & COMPLIANCE" duration={280} />
            </span>
          </div>
          <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
            FREQUENTLY ASKED TECHNICAL QUESTIONS
          </MaskedHeading>
          <p className="text-sm text-ink-graphite font-sans mt-2 max-w-xl mx-auto">
            Clear, transparent answers regarding our cashless insurance tie-ups, 60°C booth paint warranties, genuine Mobis spares, and workshop triage.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq: FaqItem) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="double-bezel rounded-spec border border-hairline-grid bg-canvas-alabaster overflow-hidden transition-colors"
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 focus:outline-none min-h-[48px] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-1">
                    <span className="text-[10px] font-mono uppercase tracking-spec text-crimson font-bold px-1.5 py-0.5 bg-surface-white border border-hairline-grid rounded-spec shrink-0 mt-0.5 sm:mt-0">
                      <span className="hidden sm:inline">{faq.category}</span>
                      <span className="sm:hidden">{faq.category.split(' ')[0]}</span>
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-ink-carbon uppercase tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-7 h-7 rounded-spec border border-hairline-grid bg-surface-white flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 sm:mt-0 ${
                    isOpen ? 'rotate-180 bg-ink-carbon text-white border-ink-carbon' : 'text-ink-carbon'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Answer Content with GPU CSS Grid Smooth Collapse */}
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-3 border-t border-hairline-grid bg-surface-white">
                      <p className="text-sm text-ink-graphite font-sans leading-relaxed mb-3">
                        {faq.answer}
                      </p>

                      {faq.specReference && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-canvas-alabaster border border-hairline-grid rounded-spec text-[10px] font-mono text-ink-muted">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>SPEC REF: {faq.specReference}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
