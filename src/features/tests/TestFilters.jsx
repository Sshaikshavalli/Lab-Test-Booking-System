import { RotateCcw } from 'lucide-react';
import { CATEGORIES, CONCERNS, SAMPLE_TYPES, AVAILABILITY, tests } from '../../data/tests';

const MAX = Math.max(...tests.map((t) => t.price));
const CEIL = Math.ceil(MAX / 500) * 500;

function Group({ title, children }) {
  return (
    <fieldset className="border-t border-ink-100 py-4 first:border-0 first:pt-0">
      <legend className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-ink-500">{title}</legend>
      {children}
    </fieldset>
  );
}

const Check = ({ checked, onChange, label, count }) => (
  <label className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-1 text-sm hover:bg-ink-100/50">
    <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-ink-300 accent-brand-600" />
    <span className="flex-1">{label}</span>
    {count != null && <span className="text-xs text-ink-300">{count}</span>}
  </label>
);

export default function TestFilters({ filters, update, toggleIn, reset, activeCount }) {
  const count = (key, val) => tests.filter((t) => t[key] === val).length;
  const fastingValue = filters.fastingOnly ? 'yes' : filters.noFastingOnly ? 'no' : 'any';
  const setFasting = (v) => update({ fastingOnly: v === 'yes', noFastingOnly: v === 'no' });
  const price = filters.maxPrice ?? CEIL;

  return (
    <form onSubmit={(e) => e.preventDefault()} aria-label="Filter tests">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold">Filters{activeCount > 0 && <span className="ml-2 chip bg-brand-50 text-brand-700">{activeCount}</span>}</h2>
        <button type="button" onClick={reset} disabled={!activeCount} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 disabled:text-ink-300"><RotateCcw className="h-3.5 w-3.5" />Reset</button>
      </div>

      <Group title="Type">
        <div role="radiogroup" aria-label="Tests or packages" className="grid grid-cols-3 gap-1 rounded-xl bg-ink-100 p-1 text-xs font-semibold">
          {[['all', 'All'], ['test', 'Tests'], ['package', 'Packages']].map(([v, l]) => (
            <button key={v} type="button" role="radio" aria-checked={filters.kind === v} onClick={() => update({ kind: v })}
              className={`min-h-[36px] rounded-lg transition ${filters.kind === v ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-500'}`}>{l}</button>
          ))}
        </div>
      </Group>

      <Group title="Category">
        {CATEGORIES.map((c) => <Check key={c} label={c} count={count('category', c)} checked={filters.categories.includes(c)} onChange={() => toggleIn('categories', c)} />)}
      </Group>

      <Group title="Health concern">
        <div className="flex flex-wrap gap-1.5">
          {CONCERNS.map((c) => {
            const on = filters.concerns.includes(c);
            return <button key={c} type="button" aria-pressed={on} onClick={() => toggleIn('concerns', c)}
              className={`min-h-[36px] rounded-full border px-3 text-xs font-medium transition ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-100 bg-white text-ink-700 hover:border-brand-400'}`}>{c}</button>;
          })}
        </div>
      </Group>

      <Group title="Sample type">
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_TYPES.map((s) => {
            const on = filters.sampleTypes.includes(s);
            return <button key={s} type="button" aria-pressed={on} onClick={() => toggleIn('sampleTypes', s)}
              className={`min-h-[36px] rounded-full border px-3 text-xs font-medium transition ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-100 bg-white text-ink-700 hover:border-brand-400'}`}>{s}</button>;
          })}
        </div>
      </Group>

      <Group title="Fasting">
        <div className="space-y-0.5">
          {[['any', 'Any'], ['yes', 'Fasting required'], ['no', 'No fasting']].map(([v, l]) => (
            <label key={v} className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-1 text-sm hover:bg-ink-100/50">
              <input type="radio" name="fasting" value={v} checked={fastingValue === v} onChange={() => setFasting(v)} className="h-4 w-4 accent-brand-600" />{l}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Availability">
        {AVAILABILITY.map((a) => <Check key={a} label={a} count={count('availability', a)} checked={filters.availability.includes(a)} onChange={() => toggleIn('availability', a)} />)}
      </Group>

      <Group title="Indicative price">
        <label htmlFor="max-price" className="flex items-baseline justify-between text-sm"><span>Up to</span><b className="font-display text-lg">₹{price.toLocaleString('en-IN')}{price >= CEIL && '+'}</b></label>
        <input id="max-price" type="range" min={100} max={CEIL} step={100} value={price} onChange={(e) => update({ maxPrice: Number(e.target.value) >= CEIL ? null : Number(e.target.value) })} className="mt-2 w-full accent-brand-600" />
        <div className="flex justify-between text-[11px] text-ink-300"><span>₹100</span><span>₹{CEIL.toLocaleString('en-IN')}</span></div>
      </Group>
    </form>
  );
}
