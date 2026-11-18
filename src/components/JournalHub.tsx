import React, { useState, useEffect } from 'react';
import { JOURNAL_ARTICLES } from '../data/articles';
import { Article } from '../types';
import { Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { RevealOnScroll } from './motion/RevealOnScroll';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

export const JournalHub: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Handle modal escape key and prevent body scroll while active
  useEffect(() => {
    if (!selectedArticle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedArticle]);

  return (
    <section id="journal-hub" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-canvas-alabaster border-b border-hairline-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
              <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
              <span>
                <TechnicalDecryptedText text="INDEX 05 // LOCAL TECHNICAL KNOWLEDGE BASE" duration={280} />
              </span>
            </div>
            <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
              PRAYAGRAJ AUTOMOTIVE JOURNAL
            </MaskedHeading>
            <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl">
              Engineering intelligence, local road topography advisories, and insurance claim workflows authored by our master technicians at 56, M.G. Marg and Speed Parts George Town.
            </p>
          </div>

          <div className="text-xs font-mono text-ink-graphite">
            ARCHIVED ARTICLES: 4 TECHNICAL GUIDES
          </div>
        </div>

        {/* 4 Technical SEO Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {JOURNAL_ARTICLES.map((article: Article, idx: number) => (
            <RevealOnScroll key={article.id} delay={idx * 80} direction="up" distance={20} className="h-full">
              <div
                className="double-bezel p-5 sm:p-7 bg-surface-white rounded-spec flex flex-col justify-between hover:border-ink-carbon transition-colors duration-200 shadow-bezel group h-full"
              >
              <div>
                {/* Meta Top: Category, Date, Read Time */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-grid text-[10px] font-mono tracking-spec uppercase">
                  <span className="px-2 py-0.5 bg-canvas-alabaster border border-hairline-grid rounded-spec font-bold text-crimson">
                    {article.category}
                  </span>

                  <div className="flex items-center gap-3 text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-ink-carbon uppercase tracking-tight mb-2 group-hover:text-crimson transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Subtitle / Excerpt */}
                <p className="text-xs text-ink-graphite font-sans leading-relaxed mb-4">
                  {article.subtitle}
                </p>

                {/* Technical Abstract */}
                <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec mb-4 text-[11px] font-mono text-ink-graphite leading-relaxed">
                  <span className="text-[9px] uppercase text-ink-muted tracking-spec block mb-1 font-bold">
                    TECHNICAL ABSTRACT
                  </span>
                  {article.summary}
                </div>
              </div>

              {/* Bottom: Author & Read Full Article Trigger */}
              <div className="pt-4 border-t border-hairline-grid flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-ink-muted uppercase">
                  BY {article.author}
                </span>

                <button
                  onClick={() => setSelectedArticle(article)}
                  data-cursor="pointer"
                  className="press-feedback inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-spec font-bold text-crimson hover:text-crimson-hover min-h-[44px]"
                >
                  <span>Read Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </RevealOnScroll>
          ))}
        </div>

      </div>

      {/* FULL ARTICLE READING DRAWER MODAL */}
      {selectedArticle && (
        <div 
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="double-bezel max-w-3xl w-full max-h-[90vh] bg-surface-white rounded-spec overflow-y-auto p-5 sm:p-8 md:p-10 shadow-modal animate-scaleIn"
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 mb-6 border-b border-hairline-grid gap-4">
              <div>
                <span className="px-2 py-0.5 bg-crimson-tint text-crimson text-[10px] font-mono font-bold tracking-spec uppercase rounded-spec mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-carbon uppercase tracking-tight">
                  {selectedArticle.title}
                </h3>
                <span className="text-xs font-mono text-ink-muted mt-1 block">
                  {selectedArticle.publishDate} · {selectedArticle.readTime} · By {selectedArticle.author}
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 border border-hairline-grid rounded-spec text-ink-carbon hover:bg-canvas-alabaster shrink-0"
                aria-label="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content Sections */}
            <div className="space-y-6 text-sm text-ink-carbon font-sans leading-relaxed">
              <p className="text-base text-ink-graphite font-normal italic border-l-2 border-crimson pl-4">
                {selectedArticle.subtitle}
              </p>

              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-display font-bold text-base text-ink-carbon uppercase tracking-tight">
                    {sec.heading}
                  </h4>
                  <p className="text-ink-graphite leading-relaxed">
                    {sec.body}
                  </p>

                  {sec.technicalSpec && (
                    <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec font-mono text-xs text-ink-carbon">
                      <span className="text-[9px] uppercase text-ink-muted tracking-spec block mb-0.5 font-bold">
                        ENGINEERING TELEMETRY SPEC
                      </span>
                      {sec.technicalSpec}
                    </div>
                  )}
                </div>
              ))}

              {/* Local SEO Keywords Tag Strip */}
              <div className="pt-6 border-t border-hairline-grid">
                <span className="text-[10px] font-mono uppercase text-ink-muted tracking-spec block mb-2 font-bold">
                  INDEXED GEOGRAPHIC SUBJECTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.localKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-canvas-alabaster border border-hairline-grid text-[10px] font-mono text-ink-graphite rounded-spec"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-4 border-t border-hairline-grid flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="press-feedback px-5 py-3 bg-ink-carbon hover:bg-black text-white text-xs font-mono uppercase tracking-spec rounded-spec font-bold min-h-[44px] transition-colors"
              >
                Close Technical Reader
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
