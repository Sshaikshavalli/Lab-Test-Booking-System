import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-4 w-4 text-ink-300" />}
            {it.to ? <Link to={it.to} className="hover:text-brand-700">{it.label}</Link> : <span aria-current="page" className="font-medium text-ink-900">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
