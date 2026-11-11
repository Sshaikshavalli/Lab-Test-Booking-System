import { useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, CONCERNS } from '../data/tests';
import { DEFAULT_FILTERS, queryTests, countActiveFilters } from '../services/testService';

/** Catalogue state: filters + sort + derived results. */
export function useTests() {
  const [params] = useSearchParams();
  // Deep link support: /tests?category=Serology (used by dashboard tiles)
  const [filters, setFilters] = useState(() => {
    const c = params.get('category');
    const h = params.get('concern');
    return {
      ...DEFAULT_FILTERS,
      categories: CATEGORIES.includes(c) ? [c] : [],
      concerns: CONCERNS.includes(h) ? [h] : [],
    };
  });
  const [sort, setSort] = useState('popularity');

  const results = useMemo(() => queryTests(filters, sort), [filters, sort]);
  const activeCount = countActiveFilters(filters);

  const update = useCallback((patch) => setFilters((f) => ({ ...f, ...patch })), []);
  const toggleIn = useCallback(
    (key, value) =>
      setFilters((f) => ({
        ...f,
        [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
      })),
    [],
  );
  const reset = useCallback(() => { setFilters(DEFAULT_FILTERS); setSort('popularity'); }, []);

  return { filters, update, toggleIn, reset, sort, setSort, results, activeCount };
}
