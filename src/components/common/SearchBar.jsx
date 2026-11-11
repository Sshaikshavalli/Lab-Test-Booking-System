import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search tests, codes or keywords…', id = 'search' }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">Search tests</label>
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-300" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="input !rounded-2xl !py-3.5 pl-12 pr-11 text-base shadow-card"
      />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => onChange('')}
          className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-ink-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
