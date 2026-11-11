import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, SearchX, X, ArrowRight, Info } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import TestCard from './TestCard';
import TestFilters from './TestFilters';
import { useTests } from '../../hooks/useTests';
import { useCart } from '../../app/providers/CartProvider';
import { SORT_OPTIONS } from '../../services/testService';
import { formatPrice } from '../../utils/priceUtils';
import { CONCERNS, tests as allTests } from '../../data/tests';
import { CONCERN_ICONS } from './categoryMeta';

export default function TestCatalogue() {
  const { filters, update, toggleIn, reset, sort, setSort, results, activeCount } = useTests();
  const { count, indicativeTotal } = useCart();
  const [view, setView] = useState('grid');
  const [drawer, setDrawer] = useState(false);

  const pills = [
    ...filters.categories.map((v) => ({ k: `c-${v}`, label: v, off: () => toggleIn('categories', v) })),
    ...filters.concerns.map((v) => ({ k: `h-${v}`, label: v, off: () => toggleIn('concerns', v) })),
    ...filters.sampleTypes.map((v) => ({ k: `s-${v}`, label: `${v} sample`, off: () => toggleIn('sampleTypes', v) })),
    ...filters.availability.map((v) => ({ k: `a-${v}`, label: v, off: () => toggleIn('availability', v) })),
    ...(filters.fastingOnly ? [{ k: 'f1', label: 'Fasting required', off: () => update({ fastingOnly: false }) }] : []),
    ...(filters.noFastingOnly ? [{ k: 'f0', label: 'No fasting', off: () => update({ noFastingOnly: false }) }] : []),
    ...(filters.maxPrice != null ? [{ k: 'p', label: `≤ ₹${filters.maxPrice}`, off: () => update({ maxPrice: null }) }] : []),
    ...(filters.kind !== 'all' ? [{ k: 'k', label: filters.kind === 'package' ? 'Packages' : 'Tests only', off: () => update({ kind: 'all' }) }] : []),
  ];
  const filterProps = { filters, update, toggleIn, reset, activeCount };

  return (
    <div className={count ? 'pb-28' : ''}>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/' }, { label: 'Browse Tests' }]} />

      <section className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-200">Test catalogue</p>
          <h1 className="mt-2 text-3xl font-semibold !text-white sm:text-4xl">Find the right test, <span className="italic text-brand-200">without the guesswork.</span></h1>
          <p className="mt-2 text-sm text-ink-300">{allTests.length} fictional tests and packages across 6 categories and {CONCERNS.length} health concerns. Search by name, code or keyword.</p>
          <div className="mt-6"><SearchBar value={filters.query} onChange={(query) => update({ query })} /></div>
        </div>
        <div className="relative mt-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Quick health-concern filter">
          {CONCERNS.map((c) => {
            const on = filters.concerns.includes(c); const I = CONCERN_ICONS[c];
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => toggleIn('concerns', c)}
                className={`flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${on ? 'border-brand-400 bg-brand-400 text-ink-950' : 'border-white/20 bg-white/5 text-white hover:bg-white/15'}`}>
                <I className="h-4 w-4" aria-hidden />{c}
              </button>
            );
          })}
        </div>
      </section>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-coral-100/60 px-4 py-3 text-xs text-ink-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden />
        Demonstration content only. Prices, availability and preparation notes are fictional — always confirm real instructions with a laboratory or clinician.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside className="hidden lg:block"><div className="card sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto p-5"><TestFilters {...filterProps} /></div></aside>

        <section aria-label="Results">
          <div role="tablist" aria-label="Tests or checkups" className="mb-4 inline-flex rounded-2xl bg-ink-100 p-1 text-sm font-semibold">
            {[['all', 'All'], ['test', 'Tests'], ['package', 'Checkups']].map(([v, l]) => (
              <button key={v} role="tab" type="button" aria-selected={filters.kind === v} onClick={() => update({ kind: v })}
                className={`min-h-[40px] rounded-xl px-5 transition ${filters.kind === v ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500 hover:text-ink-900'}`}>{l}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="mr-auto text-sm text-ink-500" aria-live="polite"><b className="text-ink-950">{results.length}</b> of {allTests.length} shown</p>
            <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setDrawer(true)}><SlidersHorizontal className="h-4 w-4" />Filters{activeCount > 0 && ` (${activeCount})`}</Button>
            <label className="flex items-center gap-2 text-sm"><span className="sr-only sm:not-sr-only text-ink-500">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="input !w-auto !py-2 pr-8">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <div role="group" aria-label="Layout" className="hidden rounded-xl bg-ink-100 p-1 sm:flex">
              {[['grid', LayoutGrid, 'Grid view'], ['list', List, 'List view']].map(([v, I, l]) => (
                <button key={v} type="button" aria-label={l} aria-pressed={view === v} onClick={() => setView(v)} className={`grid h-9 w-9 place-items-center rounded-lg ${view === v ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500'}`}><I className="h-4 w-4" /></button>
              ))}
            </div>
          </div>

          {pills.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
              {pills.map((p) => (
                <li key={p.k}><button type="button" onClick={p.off} className="chip !py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100">{p.label}<X className="h-3.5 w-3.5" aria-label="remove filter" /></button></li>
              ))}
            </ul>
          )}

          {results.length === 0 ? (
            <div className="card mt-6 grid place-items-center px-6 py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-100 text-ink-500"><SearchX className="h-8 w-8" /></span>
              <h2 className="mt-4 text-xl font-semibold">No tests match your search</h2>
              <p className="mt-1 max-w-sm text-sm text-ink-500">Try a different keyword, or remove some filters to widen the results.</p>
              <Button className="mt-5" onClick={reset}>Clear all filters</Button>
            </div>
          ) : (
            <motion.div layout className={`mt-5 grid gap-4 ${view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {results.map((t) => <TestCard key={t.id} test={t} view={view} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>

      <Modal open={drawer} onClose={() => setDrawer(false)} title="Filter tests" side>
        <TestFilters {...filterProps} />
        <Button className="mt-4 w-full" onClick={() => setDrawer(false)}>Show {results.length} result{results.length === 1 ? '' : 's'}</Button>
      </Modal>

      <AnimatePresence>
        {count > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl bg-ink-950 p-3 pl-5 text-white shadow-lift">
            <p className="text-sm"><b>{count}</b> selected · <span className="font-display text-lg">{formatPrice(indicativeTotal)}</span> <span className="text-xs text-ink-300">est.</span></p>
            <Link to="/cart" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white hover:bg-brand-400">View cart<ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
