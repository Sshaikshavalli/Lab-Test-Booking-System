import { describe, it, expect } from 'vitest';
import { tests, CATEGORIES } from '../../src/data/tests';
import { DEFAULT_FILTERS, filterTests, sortTests, queryTests, matchesQuery, getTestsByIds } from '../../src/services/testService';
import { cartReducer } from '../../src/app/providers/cartReducer';
import { sumPrices, formatPrice } from '../../src/utils/priceUtils';

const f = (patch) => ({ ...DEFAULT_FILTERS, ...patch });

describe('seed data', () => {
  it('has 20-30 entries with unique ids and codes', () => {
    expect(tests.length).toBeGreaterThanOrEqual(20);
    expect(tests.length).toBeLessThanOrEqual(30);
    expect(new Set(tests.map((t) => t.id)).size).toBe(tests.length);
    expect(new Set(tests.map((t) => t.code)).size).toBe(tests.length);
  });
  it('covers every category and fully fills the shape', () => {
    for (const c of CATEGORIES) expect(tests.some((t) => t.category === c)).toBe(true);
    for (const t of tests) {
      expect(t.preparation.length).toBeGreaterThan(0);
      expect(t.price).toBeGreaterThan(0);
      expect(t.fasting ? t.fastingHours > 0 : t.fastingHours === 0).toBe(true);
    }
  });
});

describe('search', () => {
  it('matches name, code and category case-insensitively', () => {
    expect(filterTests(tests, f({ query: 'lipid' })).map((t) => t.id)).toContain('t-lipid');
    expect(filterTests(tests, f({ query: 'hem-101' })).map((t) => t.id)).toEqual(['t-cbc']);
    expect(filterTests(tests, f({ query: 'serology' })).every((t) => t.category === 'Serology')).toBe(true);
  });
  it('requires every word and returns empty for nonsense', () => {
    expect(matchesQuery(tests[0], 'complete blood')).toBe(true);
    expect(filterTests(tests, f({ query: 'zzzzqqq' }))).toHaveLength(0);
  });
});

describe('filters combine with AND', () => {
  it('category + fasting + price', () => {
    const r = filterTests(tests, f({ categories: ['Biochemistry'], fastingOnly: true, maxPrice: 800 }));
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((t) => t.category === 'Biochemistry' && t.fasting && t.price <= 800)).toBe(true);
  });
  it('sample type, availability, no-fasting and kind', () => {
    expect(filterTests(tests, f({ sampleTypes: ['Urine'] })).every((t) => t.sampleType === 'Urine')).toBe(true);
    expect(filterTests(tests, f({ availability: ['Limited slots'] })).every((t) => t.availability === 'Limited slots')).toBe(true);
    expect(filterTests(tests, f({ noFastingOnly: true })).every((t) => !t.fasting)).toBe(true);
    expect(filterTests(tests, f({ kind: 'package' })).every((t) => t.kind === 'package')).toBe(true);
  });
  it('search and filters work together', () => {
    const r = filterTests(tests, f({ query: 'profile', categories: ['Biochemistry'] }));
    expect(r.every((t) => t.category === 'Biochemistry' && /profile/i.test(t.name + t.description + t.parameters.join(' ')))).toBe(true);
  });
});

describe('health concerns, discounts and parameter counts', () => {
  it('filters by body-system concern', () => {
    const r = filterTests(tests, f({ concerns: ['Heart'] }));
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((t) => t.concerns.includes('Heart'))).toBe(true);
  });
  it('derives mrp, discountPct and paramCount consistently', () => {
    for (const t of tests) {
      expect(t.paramCount).toBe(t.parameters.length);
      expect(t.mrp >= t.price).toBe(true);
      expect(t.discountPct === 0 ? t.mrp === t.price : t.mrp > t.price).toBe(true);
    }
  });
});

describe('sorting', () => {
  it('sorts by name, price and popularity without mutating input', () => {
    const copy = [...tests];
    const byName = sortTests(tests, 'name-asc').map((t) => t.name);
    expect(byName).toEqual([...byName].sort((a, b) => a.localeCompare(b)));
    const asc = sortTests(tests, 'price-asc').map((t) => t.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = sortTests(tests, 'price-desc').map((t) => t.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    const pop = sortTests(tests, 'popularity').map((t) => t.popularity);
    expect(pop).toEqual([...pop].sort((a, b) => b - a));
    expect(tests).toEqual(copy);
  });
  it('queryTests chains filter + sort', () => {
    const r = queryTests(f({ categories: ['Haematology'] }), 'price-asc');
    expect(r.map((t) => t.price)).toEqual([...r.map((t) => t.price)].sort((a, b) => a - b));
  });
});

describe('cart selection (add / remove) and totals', () => {
  it('adds without duplicates, removes, toggles, clears', () => {
    let s = [];
    s = cartReducer(s, { type: 'add', id: 't-cbc' });
    s = cartReducer(s, { type: 'add', id: 't-cbc' });
    expect(s).toEqual(['t-cbc']);
    s = cartReducer(s, { type: 'toggle', id: 't-lipid' });
    expect(s).toEqual(['t-cbc', 't-lipid']);
    s = cartReducer(s, { type: 'remove', id: 't-cbc' });
    expect(s).toEqual(['t-lipid']);
    expect(cartReducer(s, { type: 'clear' })).toEqual([]);
  });
  it('hydrates safely from malformed storage', () => {
    expect(cartReducer([], { type: 'hydrate', ids: 'oops' })).toEqual([]);
    expect(cartReducer([], { type: 'hydrate', ids: ['a', 'a', 5, null] })).toEqual(['a']);
  });
  it('recalculates the estimated total as tests are added or removed', () => {
    const total = (ids) => sumPrices(getTestsByIds(ids));
    expect(total([])).toBe(0);
    expect(total(['t-cbc'])).toBe(350);
    expect(total(['t-cbc', 't-lipid'])).toBe(1000);
    expect(total(['t-lipid'])).toBe(650);
    expect(formatPrice(1499)).toBe('₹1,499');
  });
});
