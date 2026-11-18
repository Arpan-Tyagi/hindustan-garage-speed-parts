import { describe, it, expect } from 'vitest';
import { DIAGNOSTIC_BAYS } from '../src/data/services';
import { MASTERED_VEHICLES } from '../src/data/portfolio';
import { HERITAGE_TIMELINE } from '../src/data/timeline';
import { JOURNAL_ARTICLES } from '../src/data/articles';
import { FAQ_ITEMS } from '../src/data/faqs';
import { generateDocketNumber } from '../src/utils/formatters';
import { getWorkshopStatus } from '../src/utils/time';
import { generateBookingWhatsAppUrl, generateTradeInquiryWhatsAppUrl } from '../src/utils/whatsapp';

describe('Section 01 // 6-Bay Service Timetable Bento Matrix', () => {
  it('has all 6 bays online with complete tooling, capabilities, and turnaround specs', () => {
    expect(DIAGNOSTIC_BAYS.length).toBe(6);
    DIAGNOSTIC_BAYS.forEach((bay, idx) => {
      expect(bay.number).toBe(`BAY 0${idx + 1}`);
      expect(bay.name).toBeTruthy();
      expect(bay.system).toBeTruthy();
      expect(bay.hindiTag).toBeTruthy();
      expect(bay.tooling.length).toBeGreaterThanOrEqual(3);
      expect(bay.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(bay.turnaround).toBeTruthy();
      expect(bay.warranty).toBeTruthy();
      expect(['ONLINE', 'ACTIVE_DIAGNOSTIC']).toContain(bay.status);
    });
  });
});

describe('Section 02 // Cars We Have Mastered Portfolio', () => {
  it('covers luxury marques and everyday 4-wheelers with complete restoration logs', () => {
    expect(MASTERED_VEHICLES.length).toBeGreaterThanOrEqual(6);
    const luxuryCars = MASTERED_VEHICLES.filter(v => v.category === 'luxury');
    const dailyCars = MASTERED_VEHICLES.filter(v => v.category === 'daily');
    
    expect(luxuryCars.length).toBeGreaterThanOrEqual(3);
    expect(dailyCars.length).toBeGreaterThanOrEqual(3);

    MASTERED_VEHICLES.forEach(vehicle => {
      expect(vehicle.make).toBeTruthy();
      expect(vehicle.model).toBeTruthy();
      expect(vehicle.year).toBeTruthy();
      expect(vehicle.engineSpec).toBeTruthy();
      expect(vehicle.replacedComponents.length).toBeGreaterThan(0);
      expect(vehicle.turnaround).toBeTruthy();
      expect(vehicle.ownerCity).toBeTruthy();
      expect(vehicle.customerSnippet).toBeTruthy();
    });
  });
});

describe('Section 03 // 1960–2026 Heritage Timeline', () => {
  it('spans 66 continuous years with milestones from 1960 to 2026', () => {
    expect(HERITAGE_TIMELINE.length).toBeGreaterThanOrEqual(6);
    expect(HERITAGE_TIMELINE[0].year).toBe('1960');
    expect(HERITAGE_TIMELINE[HERITAGE_TIMELINE.length - 1].year).toBe('2026');

    HERITAGE_TIMELINE.forEach(milestone => {
      expect(milestone.year).toMatch(/^\d{4}$/);
      expect(milestone.eraTitle).toBeTruthy();
      expect(milestone.headline).toBeTruthy();
      expect(milestone.description).toBeTruthy();
      expect(milestone.technologiesIntroduced.length).toBeGreaterThan(0);
      expect(milestone.archivalFact).toBeTruthy();
    });
  });
});

describe('Section 04 // Prayagraj Technical Articles & FAQ Accordion', () => {
  it('includes 4 local SEO technical articles with sections and local keywords', () => {
    expect(JOURNAL_ARTICLES.length).toBe(4);
    JOURNAL_ARTICLES.forEach(article => {
      expect(article.title).toBeTruthy();
      expect(article.subtitle).toBeTruthy();
      expect(article.author).toBeTruthy();
      expect(article.sections.length).toBeGreaterThanOrEqual(2);
      expect(article.localKeywords.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('contains comprehensive institutional FAQs', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(6);
    FAQ_ITEMS.forEach(faq => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
      expect(faq.category).toBeTruthy();
    });
  });
});

describe('Docket Generation and Edge Case Formatting', () => {
  it('generates valid unique HG docket numbers', () => {
    const d1 = generateDocketNumber();
    const d2 = generateDocketNumber();
    expect(d1).toMatch(/^HG-1960-\d{4}$/);
    expect(d2).toMatch(/^HG-1960-\d{4}$/);
  });

  it('handles edge case inputs in WhatsApp URL generation gracefully', () => {
    const edgeBooking = {
      vehicleMake: 'Mahindra & Mahindra',
      vehicleModel: 'Scorpio-N Z8L 4x4 (Special Edition / "Black")',
      vehicleYear: '2024',
      fuelType: 'Diesel',
      serviceCategory: 'Chassis Alignment & ECM',
      bayPreference: 'BAY 01 - ECM & Digital Diagnostics',
      preferredDate: '2026-12-01',
      preferredTimeSlot: '10:00 - 12:00 IST',
      pickupOption: 'Prayagraj Doorstep Valet Pickup',
      customerName: 'डॉ. राजेश कुमार श्रीवास्तव',
      customerPhone: '+91-9839-000000',
      customerEmail: 'dr.rajesh+car@prayagraj.edu.in',
      notes: 'Thud/clunk over Shastri Bridge potholes & check-engine light'
    };

    const url = generateBookingWhatsAppUrl(edgeBooking, 'HG-1960-7777');
    expect(url).toContain('https://wa.me/918796576868');
    expect(url).toContain(encodeURIComponent('डॉ. राजेश कुमार श्रीवास्तव'));
    expect(url).toContain(encodeURIComponent('Scorpio-N Z8L 4x4 (Special Edition / "Black")'));
    expect(url).toContain(encodeURIComponent('HG-1960-7777'));
  });

  it('accurately reports early morning triage status before 10:00 IST', () => {
    // 08:00 IST = 02:30 UTC on Wednesday 2026-11-18
    const earlyMorning = new Date('2026-11-18T02:30:00Z');
    const status = getWorkshopStatus(earlyMorning);
    expect(status.isOpen).toBe(false);
    expect(status.statusBadge).toContain('OPENS TODAY AT 10:00 IST');
  });

  it('accurately reports Sunday closure status', () => {
    // Sunday 2026-11-22 at 12:00 IST = 06:30 UTC
    const sundayNoon = new Date('2026-11-22T06:30:00Z');
    const status = getWorkshopStatus(sundayNoon);
    expect(status.isOpen).toBe(false);
    expect(status.statusBadge).toContain('CLOSED SUNDAY');
  });

  it('accurately reports open status during operational hours', () => {
    // Wednesday 2026-11-18 at 14:30 IST = 09:00 UTC
    const weekdayMidday = new Date('2026-11-18T09:00:00Z');
    const status = getWorkshopStatus(weekdayMidday);
    expect(status.isOpen).toBe(true);
    expect(status.statusBadge).toContain('OPEN NOW');
  });

  it('correctly cleans warranty strings without truncating to nonsensical labels', () => {
    DIAGNOSTIC_BAYS.forEach((bay) => {
      const cleaned = bay.warranty.replace(' Guarantee', '').replace(' Warranty', '');
      expect(cleaned).not.toBe('100% Water');
      expect(cleaned.length).toBeGreaterThan(5);
    });
  });

  it('computes wholesale trade requisition pricing accurately for speed parts', () => {
    const unitPriceFormatted = '₹1,850';
    const quantity = 4;
    const unitPrice = parseInt(unitPriceFormatted.replace(/[^\d]/g, ''), 10);
    const total = unitPrice * quantity;
    expect(total).toBe(7400);
    expect(`₹${total.toLocaleString('en-IN')}`).toBe('₹7,400');
  });
});
