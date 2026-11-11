import { tests } from '../data/tests';

export const DEFAULT_FILTERS = {
  query: '',
  categories: [],      // [] = all
  concerns: [],        // body-system tags, [] = all
  sampleTypes: [],     // [] = all
  availability: [],    // [] = all
  fastingOnly: false,  // true => only tests that require fasting
  noFastingOnly: false,// true => only tests that do NOT require fasting
  maxPrice: null,      // null = no limit
  kind: 'all',         // all | test | package
};

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most popular' },
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

export const getAllTests = () => tests;

export const getTestsByIds = (ids, source = tests) =>
  ids.map((id) => source.find((t) => t.id === id)).filter(Boolean);

/** Search by name, code, category, sample type or any included parameter / keyword. */
export function matchesQuery(test, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return q.split(/\s+/).every((word) =>
    [test.name, test.code, test.category, test.sampleType, test.description, ...test.parameters, ...(test.concerns ?? [])]
      .join(' ')
      .toLowerCase()
      .includes(word),
  );
}

export function filterTests(list, f = DEFAULT_FILTERS) {
  return list.filter((t) => {
    if (!matchesQuery(t, f.query)) return false;
    if (f.categories.length && !f.categories.includes(t.category)) return false;
    if (f.concerns.length && !f.concerns.some((c) => t.concerns.includes(c))) return false;
    if (f.sampleTypes.length && !f.sampleTypes.includes(t.sampleType)) return false;
    if (f.availability.length && !f.availability.includes(t.availability)) return false;
    if (f.fastingOnly && !t.fasting) return false;
    if (f.noFastingOnly && t.fasting) return false;
    if (f.maxPrice != null && t.price > f.maxPrice) return false;
    if (f.kind !== 'all' && t.kind !== f.kind) return false;
    return true;
  });
}

export function sortTests(list, sort = 'popularity') {
  const copy = [...list];
  switch (sort) {
    case 'name-asc': return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-asc': return copy.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case 'price-desc': return copy.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    default: return copy.sort((a, b) => b.popularity - a.popularity || a.name.localeCompare(b.name));
  }
}

export const queryTests = (filters, sort, source = tests) => sortTests(filterTests(source, filters), sort);

export function countActiveFilters(f) {
  return (
    (f.query.trim() ? 1 : 0) + f.categories.length + f.concerns.length + f.sampleTypes.length + f.availability.length +
    (f.fastingOnly ? 1 : 0) + (f.noFastingOnly ? 1 : 0) + (f.maxPrice != null ? 1 : 0) + (f.kind !== 'all' ? 1 : 0)
  );
}
