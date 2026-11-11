import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../app/providers/CartProvider';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tests', label: 'Browse Tests' },
  { to: '/bookings', label: 'My Bookings' },
];

const linkCls = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100/70'}`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-sand-50/85 backdrop-blur-lg">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="LabLoom home">
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="font-display text-xl font-semibold text-ink-950">Lab<span className="text-brand-600">Loom</span></span>
          <span className="chip hidden bg-coral-100 text-coral-500 sm:inline-flex">Demo</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => <NavLink key={l.to} {...l} className={linkCls}>{l.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label={`Booking cart, ${count} selected`} className="relative grid h-11 w-11 place-items-center rounded-xl border border-ink-100 bg-white text-ink-900 transition hover:border-brand-400">
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: .4 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-coral-500 px-1 text-[11px] font-bold text-white">{count}</motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-xl md:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-ink-100 md:hidden">
            <div className="flex flex-col gap-1 p-3">
              {links.map((l) => <NavLink key={l.to} {...l} onClick={() => setOpen(false)} className={linkCls}>{l.label}</NavLink>)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
