import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Plus, Clock, UtensilsCrossed, TestTube2, Flame, Package, ListChecks } from 'lucide-react';
import Button from '../../components/common/Button';
import { useCart } from '../../app/providers/CartProvider';
import { useToast } from '../../components/common/Toast';
import { formatPrice } from '../../utils/priceUtils';
import { CATEGORY_META, AVAILABILITY_STYLE } from './categoryMeta';

function TestCard({ test, view = 'grid' }) {
  const { has, toggle } = useCart();
  const toast = useToast();
  const selected = has(test.id);
  const meta = CATEGORY_META[test.category];
  const Icon = meta.icon;
  const list = view === 'list';

  const onToggle = () => {
    toggle(test.id);
    toast(selected ? `Removed ${test.name}` : `Added ${test.name}`, selected ? 'info' : 'success');
  };

  return (
    <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }}
      whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={`card group relative flex overflow-hidden transition-shadow hover:shadow-lift ${list ? 'flex-col gap-4 p-5 sm:flex-row sm:items-center' : 'flex-col p-5'} ${selected ? 'ring-2 ring-brand-500' : ''}`}
      aria-label={test.name}>
      {selected && <span className="absolute right-0 top-0 rounded-bl-xl bg-brand-600 px-2.5 py-1 text-[11px] font-semibold text-white">In cart</span>}

      <div className={`flex gap-4 ${list ? 'sm:w-[46%]' : ''}`}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${meta.tint}`}><Icon className="h-6 w-6" aria-hidden /></span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[11px] font-medium text-ink-500">
            {test.code}
            {test.kind === 'package' && <span className="chip !px-2 !py-0.5 bg-brand-50 text-brand-700"><Package className="h-3 w-3" />Package</span>}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold leading-snug"><Link to={`/tests/${test.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl">{test.name}</Link></h3>
          <p className="text-xs text-ink-500">{test.category}</p>
        </div>
      </div>

      <div className={`flex flex-wrap gap-1.5 ${list ? 'sm:flex-1' : 'mt-4'}`}>
        <span className="chip bg-ink-100 text-ink-700"><TestTube2 className="h-3.5 w-3.5" />{test.sampleType}</span>
        <span className={`chip ${test.fasting ? 'bg-amber-50 text-amber-700' : 'bg-ink-100 text-ink-700'}`}><UtensilsCrossed className="h-3.5 w-3.5" />{test.fasting ? `Fasting ${test.fastingHours}h` : 'No fasting'}</span>
        <span className={`chip ${AVAILABILITY_STYLE[test.availability]}`}><Clock className="h-3.5 w-3.5" />{test.availability}</span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand-700"><ListChecks className="h-4 w-4" aria-hidden />Includes {test.paramCount} parameter{test.paramCount === 1 ? '' : 's'}</p>
      {!list && <p className="mt-2 line-clamp-2 text-sm text-ink-500">{test.description}</p>}

      <div className={`relative z-10 flex items-center justify-between gap-3 ${list ? 'sm:ml-auto sm:w-72' : 'mt-auto pt-5'}`}>
        <div>
          <p className="flex items-baseline gap-2"><span className="font-display text-2xl font-semibold text-ink-950">{formatPrice(test.price)}</span>
            {test.discountPct > 0 && <><s className="text-sm text-ink-300"><span className="sr-only">Original price </span>{formatPrice(test.mrp)}</s><span className="chip !px-1.5 !py-0.5 bg-emerald-50 text-emerald-700">{test.discountPct}% off</span></>}</p>
          <p className="flex items-center gap-1 text-[11px] text-ink-500" title={`Popularity indicator ${test.popularity}/100`}>
            <Flame className="h-3 w-3 text-coral-500" aria-hidden />
            <span className="sr-only">Popularity {test.popularity} out of 100</span>
            <span aria-hidden className="relative h-1.5 w-14 overflow-hidden rounded-full bg-ink-100"><span className="absolute inset-y-0 left-0 rounded-full bg-coral-400" style={{ width: `${test.popularity}%` }} /></span>
          </p>
        </div>
        <Button variant={selected ? 'secondary' : 'primary'} onClick={onToggle} aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Add'} ${test.name} ${selected ? 'from' : 'to'} cart`}>
          {selected ? <><Check className="h-4 w-4" />Added</> : <><Plus className="h-4 w-4" />Add</>}
        </Button>
      </div>
    </motion.article>
  );
}
export default memo(TestCard);
