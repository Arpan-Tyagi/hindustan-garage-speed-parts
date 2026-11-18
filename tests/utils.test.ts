import { describe, it, expect } from 'vitest';
import { getWorkshopStatus } from '../src/utils/time';
import { generateBookingWhatsAppUrl, generateTradeInquiryWhatsAppUrl } from '../src/utils/whatsapp';
import { BookingData, SpeedPart } from '../src/types';

describe('time.ts - getWorkshopStatus', () => {
  it('identifies open workshop on Wednesday at 14:00 IST', () => {
    // 2026-11-18 is Wednesday. 14:00 IST = 08:30 UTC
    const date = new Date('2026-11-18T08:30:00Z');
    const status = getWorkshopStatus(date);
    expect(status.isOpen).toBe(true);
    expect(status.currentDay).toBe('WEDNESDAY');
    expect(status.statusBadge).toContain('OPEN NOW');
  });

  it('identifies closed workshop on Sunday at 12:00 IST', () => {
    // 2026-11-15 is Sunday. 12:00 IST = 06:30 UTC
    const date = new Date('2026-11-15T06:30:00Z');
    const status = getWorkshopStatus(date);
    expect(status.isOpen).toBe(false);
    expect(status.currentDay).toBe('SUNDAY');
    expect(status.statusBadge).toContain('CLOSED SUNDAY');
  });

  it('identifies closed workshop after 20:00 IST on Friday', () => {
    // 2026-11-20 is Friday. 21:00 IST = 15:30 UTC
    const date = new Date('2026-11-20T15:30:00Z');
    const status = getWorkshopStatus(date);
    expect(status.isOpen).toBe(false);
    expect(status.statusBadge).toContain('CLOSED FOR THE DAY');
  });
});

describe('whatsapp.ts - URL Generators', () => {
  it('generates valid WhatsApp URL for service booking docket', () => {
    const booking: BookingData = {
      vehicleMake: 'BMW',
      vehicleModel: '530d M Sport',
      vehicleYear: '2022',
      fuelType: 'Diesel',
      serviceCategory: 'Suspension & ECM Diagnostics',
      bayPreference: 'Bay 01 - ECM & Digital Diagnostics',
      preferredDate: '2026-11-25',
      preferredTimeSlot: '10:00 - 12:00',
      pickupOption: 'Workshop Walk-In (M.G. Marg)',
      customerName: 'Aditya Srivastava',
      customerPhone: '9839000000',
      customerEmail: 'aditya@example.com',
      notes: 'Thud noise from front right shocker over Civil Lines potholes'
    };

    const url = generateBookingWhatsAppUrl(booking, 'HG-1960-9999');
    expect(url).toContain('https://wa.me/918796576868');
    expect(url).toContain(encodeURIComponent('BMW 530d M Sport'));
    expect(url).toContain(encodeURIComponent('HG-1960-9999'));
    expect(url).toContain(encodeURIComponent('Aditya Srivastava'));
  });

  it('generates valid WhatsApp URL for Speed Parts B2B trade inquiry', () => {
    const part: SpeedPart = {
      id: 'sp-01',
      name: 'Hyundai Creta Front Lower Arm Assembly (L/R)',
      category: 'hyundai-oem',
      categoryLabel: 'Hyundai Genuine OEM',
      hsnCode: '8708.80.00',
      oePartNumber: '54500-A0000',
      compatibleModels: ['Creta 1st Gen', 'Creta 2nd Gen', 'Kia Seltos'],
      wholesalePriceFormatted: '₹2,850',
      retailPriceFormatted: '₹3,600',
      moq: 2,
      inStock: true,
      stockLocation: 'George Town Central Depot',
      specNotes: 'High-tensile forged steel'
    };

    const url = generateTradeInquiryWhatsAppUrl(part, 4, 'Royal Motors Naini');
    expect(url).toContain('https://wa.me/918796576868');
    expect(url).toContain(encodeURIComponent('54500-A0000'));
    expect(url).toContain(encodeURIComponent('Royal Motors Naini'));
    expect(url).toContain(encodeURIComponent('4 Unit(s)'));
  });
});
