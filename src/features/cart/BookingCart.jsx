import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Button from '../../components/common/Button';
import { useCart } from '../../app/providers/CartProvider';
import { formatPrice } from '../../utils/priceUtils';

/**
 * STARTER cart page (owner: Dhanu). Reads/writes through the shared cart interface
 * from app/providers/CartProvider. Dhanu: restyle / extend, keep the useCart() contract.
 */
export default function BookingCart() {
  const { selectedTests, indicativeTotal, remove, clear } = useCart();
  const navigate = useNavigate();
  const empty = selectedTests.length === 0;

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Browse Tests', to: '/tests' }, { label: 'Booking cart' }]} />
      <h1 className="text-3xl font-semibold">Your booking cart</h1>

      {empty ? (
        <div className="card mt-6 grid place-items-center px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600"><ShoppingBag className="h-8 w-8" /></span>
          <h2 className="mt-4 text-xl font-semibold">Nothing selected yet</h2>
          <p className="mt-1 text-sm text-ink-500">Add at least one test to continue with your booking.</p>
          <Button to="/tests" className="mt-5">Browse tests</Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {selectedTests.map((t) => (
                <motion.li key={t.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 40 }} className="card flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <Link to={`/tests/${t.id}`} className="font-semibold hover:text-brand-700">{t.name}</Link>
                    <p className="text-xs text-ink-500">{t.code} · {t.sampleType} sample</p>
                  </div>
                  <p className="font-display text-lg font-semibold">{formatPrice(t.price)}</p>
                  <button type="button" onClick={() => remove(t.id)} aria-label={`Remove ${t.name}`} className="grid h-10 w-10 place-items-center rounded-xl text-ink-500 hover:bg-coral-100 hover:text-coral-500"><Trash2 className="h-4 w-4" /></button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <aside className="card h-fit p-6">
            <h2 className="font-sans text-base font-semibold">Booking summary</h2>
            <dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-ink-500">Tests selected</dt><dd>{selectedTests.length}</dd></div>
              <div className="flex justify-between border-t border-ink-100 pt-3"><dt className="font-semibold">Estimated total</dt><dd className="font-display text-2xl font-semibold">{formatPrice(indicativeTotal)}</dd></div></dl>
            <Button className="mt-5 w-full" disabled={empty} onClick={() => navigate('/patient')}>Continue to patient details<ArrowRight className="h-4 w-4" /></Button>
            <button type="button" onClick={clear} className="mt-3 w-full text-center text-xs font-semibold text-ink-500 hover:text-coral-500">Clear selection</button>
          </aside>
        </div>
      )}
    </div>
  );
}
