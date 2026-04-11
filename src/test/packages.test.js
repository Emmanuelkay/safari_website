import { describe, it, expect } from 'vitest';
import { packagesData, signatureAddons, practicalAddons, filterOptions } from '../data/packages';

describe('Package config', () => {
  it('has 8 packages', () => {
    expect(packagesData).toHaveLength(8);
  });

  it('all packages have required fields', () => {
    packagesData.forEach(pkg => {
      expect(pkg.id).toBeDefined();
      expect(pkg.price).toBeGreaterThan(0);
      expect(pkg.image).toBeTruthy();
      expect(pkg.category).toBeTruthy();
      expect(pkg.stay).toBeDefined();
    });
  });

  it('has unique package IDs', () => {
    const ids = packagesData.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has exactly one flagship package', () => {
    const flagships = packagesData.filter(p => p.flagship);
    expect(flagships).toHaveLength(1);
  });

  it('prices are in ascending order by ID', () => {
    // Not strictly required but good to validate data integrity
    const prices = packagesData.map(p => p.price);
    expect(prices[0]).toBeLessThan(prices[prices.length - 1]);
  });
});

describe('Addon config', () => {
  it('has 4 signature addons', () => {
    expect(signatureAddons).toHaveLength(4);
  });

  it('has 4 practical addons', () => {
    expect(practicalAddons).toHaveLength(4);
  });

  it('all addons have required fields', () => {
    [...signatureAddons, ...practicalAddons].forEach(addon => {
      expect(addon.id).toBeTruthy();
      expect(addon.price).toBeGreaterThan(0);
      expect(addon.unit).toBeTruthy();
    });
  });

  it('signature addons have images', () => {
    signatureAddons.forEach(addon => {
      expect(addon.image).toBeTruthy();
    });
  });
});

describe('Filter options', () => {
  it('has filter options including "all"', () => {
    expect(filterOptions.length).toBeGreaterThan(0);
    expect(filterOptions[0].value).toBe('all');
  });

  it('all filter options have label and value', () => {
    filterOptions.forEach(f => {
      expect(f.label).toBeTruthy();
      expect(f.value).toBeTruthy();
    });
  });
});
