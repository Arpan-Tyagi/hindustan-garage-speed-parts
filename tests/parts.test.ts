import { describe, it, expect } from 'vitest';
import { SPEED_PARTS_CATALOG } from '../src/data/parts';

describe('parts.ts - SPEED_PARTS_CATALOG', () => {
  it('contains comprehensive parts with required institutional properties', () => {
    expect(SPEED_PARTS_CATALOG.length).toBeGreaterThanOrEqual(10);
    
    SPEED_PARTS_CATALOG.forEach(part => {
      expect(part.hsnCode).toBeDefined();
      expect(part.oePartNumber).toBeDefined();
      expect(part.compatibleModels.length).toBeGreaterThan(0);
      expect(part.wholesalePriceFormatted).toContain('₹');
      expect(part.retailPriceFormatted).toContain('₹');
      expect(part.moq).toBeGreaterThan(0);
    });
  });

  it('filters Hyundai Genuine parts accurately', () => {
    const hyundaiParts = SPEED_PARTS_CATALOG.filter(p => p.category === 'hyundai-oem');
    expect(hyundaiParts.length).toBeGreaterThanOrEqual(3);
    hyundaiParts.forEach(p => {
      expect(p.categoryLabel).toBe('Hyundai Genuine OEM');
    });
  });

  it('filters parts by model compatibility keyword (Creta)', () => {
    const query = 'Creta'.toLowerCase();
    const matches = SPEED_PARTS_CATALOG.filter(p => 
      p.compatibleModels.some(m => m.toLowerCase().includes(query)) ||
      p.name.toLowerCase().includes(query)
    );
    expect(matches.length).toBeGreaterThanOrEqual(4);
  });
});
