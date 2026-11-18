import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceMatrix } from './components/ServiceMatrix';
import { Portfolio } from './components/Portfolio';
import { BookingTerminal } from './components/BookingTerminal';
import { SpeedPartsCatalog } from './components/SpeedPartsCatalog';
import { HeritageTimeline } from './components/HeritageTimeline';
import { JournalHub } from './components/JournalHub';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { HairlineDivider } from './components/ui/HairlineDivider';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/motion/CustomCursor';
import { ScrollProgress } from './components/motion/ScrollProgress';

export function App() {
  const [selectedBayId, setSelectedBayId] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  // Initialize Lenis hardware-accelerated momentum scroll
  useLenis({ lerp: 0.1, duration: 1.2 });

  const scrollToBooking = () => {
    const terminal = document.getElementById('booking-terminal');
    terminal?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectBay = (bayId: string) => {
    setSelectedBayId(bayId);
    scrollToBooking();
  };

  const handleBookVehicle = (make: string, model: string) => {
    setSelectedMake(make);
    setSelectedModel(model);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-canvas-alabaster text-ink-carbon font-sans flex flex-col selection:bg-crimson selection:text-white overflow-x-hidden w-full relative">
      {/* 00. ARCHITECTURAL PRECISION MOTION INSTRUMENTS */}
      <CustomCursor />
      <ScrollProgress />

      {/* 01. TOP SPECIFICATION HEADER */}
      <Header onOpenBooking={scrollToBooking} />

      <main className="flex-grow w-full overflow-x-hidden">
        {/* 02. ARCHITECTURAL HERO SECTION & DAYLIGHT BLUEPRINT STAGE */}
        <Hero 
          onOpenBooking={scrollToBooking} 
          onSelectBay={handleSelectBay} 
        />

        <HairlineDivider label="SYSTEM SECTION 01 // 6-BAY TIMETABLE MATRIX" sublabel="ALL WORK UNDER ONE ROOF" />

        {/* 03. 6-BAY SERVICE TIMETABLE BENTO MATRIX */}
        <ServiceMatrix onSelectBay={handleSelectBay} />

        <HairlineDivider label="SYSTEM SECTION 02 // MASTERED VEHICLES & BEFORE/AFTER BENCH" sublabel="CASHLESS BODY BOOTH RESTORATION" />

        {/* 04. "CARS WE HAVE MASTERED" PORTFOLIO & BEFORE/AFTER DRAG SLIDER */}
        <Portfolio onBookMake={handleBookVehicle} />

        <HairlineDivider label="SYSTEM SECTION 03 // DAYLIGHT DIGITAL BOOKING TERMINAL" sublabel="4-STEP RECEPTOR DOCKET" />

        {/* 05. DAYLIGHT SLOT BOOKING TERMINAL (WHATSAPP + EMAIL PIPELINE) */}
        <BookingTerminal 
          key={`${selectedBayId}-${selectedMake}-${selectedModel}`}
          initialBayId={selectedBayId}
          initialMake={selectedMake}
          initialModel={selectedModel}
        />

        <HairlineDivider label="SYSTEM SECTION 04 // SPEED PARTS B2B WHOLESALE DEPOT" sublabel="MEDICAL CHAURAHA, GEORGE TOWN" />

        {/* 06. SPEED PARTS B2B & RETAIL CATALOG (#0F4C81 COBALT SHIFT) */}
        <SpeedPartsCatalog />

        <HairlineDivider label="SYSTEM SECTION 05 // 66-YEAR ARCHIVAL CHRONOLOGY" sublabel="1960 — 2026 HERITAGE" />

        {/* 07. 1960–2026 HERITAGE TIMELINE & ODOMETER ROLL-UPS */}
        <HeritageTimeline />

        <HairlineDivider label="SYSTEM SECTION 06 // PRAYAGRAJ AUTOMOTIVE TECHNICAL JOURNAL" sublabel="KNOWLEDGE BASE" />

        {/* 08. TECHNICAL SEO BLOG HUB (4 LOCAL ARTICLES) */}
        <JournalHub />

        <HairlineDivider label="SYSTEM SECTION 07 // INSTITUTIONAL SPECIFICATION FAQ" sublabel="COMPLIANCE & PROTOCOLS" />

        {/* FAQ ACCORDION */}
        <FaqAccordion />
      </main>

      {/* 09. DUAL-LOCATION CONTACT FOOTER & ARCHITECTURAL BLUEPRINT */}
      <Footer />
    </div>
  );
}

export default App;
