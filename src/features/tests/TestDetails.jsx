import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, Plus, Clock, TestTube2, UtensilsCrossed, ListChecks, ClipboardList, ArrowLeft, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Button from '../../components/common/Button';
import Placeholder from '../../components/common/Placeholder';
import HowItWorks from '../../components/common/HowItWorks';
import SampleTube3D from './components/SampleTube3D';
import TestCard from './TestCard';
import { getTestById, tests } from '../../data/tests';
import { useCart } from '../../app/providers/CartProvider';
import { useToast } from '../../components/common/Toast';
import { formatPrice } from '../../utils/priceUtils';
import { CATEGORY_META, SAMPLE_COLORS, AVAILABILITY_STYLE } from './categoryMeta';

const Stat = ({ icon: I, label, value }) => (
  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-200"><I className="h-3.5 w-3.5" aria-hidden />{label}</p>
    <p className="mt-1 text-sm font-medium text-white">{value}</p>
  </div>
);

export default function TestDetails() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { has, toggle, count } = useCart();
  const toast = useToast();
  const test = getTestById(testId);

  if (!test) return <Placeholder title="Test not found" owner="—" folder="" notFound />;

  const selected = has(test.id);
  const meta = CATEGORY_META[test.category];
  const Icon = meta.icon;
  const related = tests.filter((t) => t.category === test.category && t.id !== test.id).slice(0, 3);
  const onToggle = () => { toggle(test.id); toast(selected ? `Removed ${test.name}` : `Added ${test.name}`, selected ? 'info' : 'success'); };

  return (
    <article>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/' }, { label: 'Browse Tests', to: '/tests' }, { label: test.name }]} />

      <section className="relative overflow-hidden rounded-3xl bg-ink-950 text-white">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full blur-3xl" style={{ background: `${SAMPLE_COLORS[test.sampleType]}55` }} aria-hidden />
        <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-[1fr_16rem] md:items-center">
          <div>
            <button type="button" onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm text-brand-200 hover:text-white"><ArrowLeft className="h-4 w-4" />Back</button>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-white/10 font-mono text-white"><Icon className="h-3.5 w-3.5" aria-hidden />{test.code}</span>
              <span className="chip bg-white/10 text-white">{test.category}</span>
              {test.kind === 'package' && <span className="chip bg-brand-400 text-ink-950">Package</span>}
              <span className={`chip ${AVAILABILITY_STYLE[test.availability]}`}>{test.availability}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold !text-white sm:text-4xl">{test.name}</h1>
            <p className="mt-3 max-w-xl text-ink-300">{test.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat icon={TestTube2} label="Sample" value={test.sampleType} />
              <Stat icon={UtensilsCrossed} label="Fasting" value={test.fasting ? `${test.fastingHours} hours (demo)` : 'Not required'} />
              <Stat icon={Clock} label="Turnaround" value={test.turnaround} />
            </div>
          </div>
          <div className="mx-auto h-56 w-full max-w-[16rem] md:h-72"><SampleTube3D sampleType={test.sampleType} /></div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <section className="card p-6" aria-labelledby="params">
            <h2 id="params" className="flex items-center gap-2 text-xl font-semibold"><ListChecks className="h-5 w-5 text-brand-600" aria-hidden />Included parameters</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {test.parameters.map((p, i) => (
                <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-2.5 rounded-xl bg-sand-50 px-3.5 py-2.5 text-sm"><Check className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />{p}</motion.li>
              ))}
            </ul>
          </section>

          <section className="card p-6" aria-labelledby="prep">
            <h2 id="prep" className="flex items-center gap-2 text-xl font-semibold"><ClipboardList className="h-5 w-5 text-brand-600" aria-hidden />Preparation guidance</h2>
            <p role="note" className="mt-3 flex items-start gap-2.5 rounded-xl border border-coral-400/30 bg-coral-100/60 p-3.5 text-sm text-ink-700">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden />
              <span><b>Demonstration content.</b> This is sample information only. Please confirm actual preparation and fasting instructions with your laboratory or clinician.</span>
            </p>
            <ol className="mt-4 space-y-3">
              {test.preparation.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 font-mono text-xs font-semibold text-brand-700">{i + 1}</span><span className="pt-0.5">{step}</span></li>
              ))}
            </ol>
          </section>
        </div>

        <aside>
          <div className="card sticky top-24 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Indicative demo price</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2"><span className="font-display text-4xl font-semibold text-ink-950">{formatPrice(test.price)}</span>
              {test.discountPct > 0 && <><s className="text-base text-ink-300">{formatPrice(test.mrp)}</s><span className="chip bg-emerald-50 text-emerald-700">{test.discountPct}% off</span></>}</p>
            <p className="mt-1 text-xs text-ink-500">Estimate only. No payment is taken in this demo.</p>
            <Button className="mt-5 w-full" size="lg" variant={selected ? 'secondary' : 'primary'} onClick={onToggle} aria-pressed={selected}>
              {selected ? <><Check className="h-5 w-5" />Added · Remove</> : <><Plus className="h-5 w-5" />Add to booking</>}
            </Button>
            {count > 0 && <Button to="/cart" variant="ghost" className="mt-2 w-full">Go to cart ({count})<ArrowRight className="h-4 w-4" /></Button>}
          </div>
        </aside>
      </div>

      <HowItWorks className="mt-12" />

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related">
          <div className="mb-4 flex items-end justify-between"><h2 id="related" className="text-2xl font-semibold">More in {test.category}</h2><Link to="/tests" className="text-sm font-semibold text-brand-700 hover:underline">Browse all</Link></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((t) => <TestCard key={t.id} test={t} />)}</div>
        </section>
      )}
    </article>
  );
}
