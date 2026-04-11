import { describe, it, expect } from 'vitest';

// Same validation logic used in BookingEngine
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

describe('Email validation', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('name+tag@domain.co.uk')).toBe(true);
    expect(isValidEmail('test@sub.domain.com')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('@missing.com')).toBe(false);
    expect(isValidEmail('no spaces@test.com')).toBe(false);
    expect(isValidEmail('missing@')).toBe(false);
    expect(isValidEmail('missing@.com')).toBe(false);
  });
});

// Same phone sanitization logic used in BookingEngine
const sanitizePhone = (value) => value.replace(/[^0-9+]/g, '');

describe('Phone sanitization', () => {
  it('keeps digits and plus sign', () => {
    expect(sanitizePhone('+254718592358')).toBe('+254718592358');
    expect(sanitizePhone('1234567890')).toBe('1234567890');
  });

  it('strips invalid characters', () => {
    expect(sanitizePhone('+1 (555) 123-4567')).toBe('+15551234567');
    expect(sanitizePhone('abc123def')).toBe('123');
  });
});

// Same calculation logic used in BookingEngine/TripDrawer
const calculateTotal = (trip) => {
  let total = (trip.package?.price || 0) * (trip.guests || 2);
  trip.addons.forEach(a => total += a.price * (a.unit === 'pp' ? (trip.guests || 2) : 1));
  return total;
};

describe('Trip total calculation', () => {
  it('calculates base package price per guest', () => {
    const trip = { package: { price: 650 }, guests: 3, addons: [] };
    expect(calculateTotal(trip)).toBe(1950);
  });

  it('returns 0 with no package', () => {
    const trip = { package: null, guests: 2, addons: [] };
    expect(calculateTotal(trip)).toBe(0);
  });

  it('adds per-person addons', () => {
    const trip = {
      package: { price: 100 },
      guests: 2,
      addons: [{ price: 50, unit: 'pp' }]
    };
    expect(calculateTotal(trip)).toBe(300); // 100*2 + 50*2
  });

  it('adds flat-rate addons', () => {
    const trip = {
      package: { price: 100 },
      guests: 2,
      addons: [{ price: 20, unit: 'pack' }]
    };
    expect(calculateTotal(trip)).toBe(220); // 100*2 + 20*1
  });

  it('handles mixed addons correctly', () => {
    const trip = {
      package: { price: 650 },
      guests: 4,
      addons: [
        { price: 480, unit: 'pp' },
        { price: 20, unit: 'pack' }
      ]
    };
    // 650*4 + 480*4 + 20*1 = 2600 + 1920 + 20 = 4540
    expect(calculateTotal(trip)).toBe(4540);
  });

  it('defaults to 2 guests when falsy', () => {
    const trip = { package: { price: 100 }, guests: 0, addons: [] };
    // guests || 2 treats 0 as falsy, so defaults to 2
    expect(calculateTotal(trip)).toBe(200);
  });
});

// Date validation
describe('Date validation', () => {
  it('detects past dates', () => {
    const today = new Date().toISOString().split('T')[0];
    const pastDate = '2020-01-01';
    const futureDate = '2027-12-31';

    expect(pastDate < today).toBe(true);
    expect(futureDate < today).toBe(false);
  });
});
