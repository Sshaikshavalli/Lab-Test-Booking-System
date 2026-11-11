import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, FlaskConical, Package, ShoppingBag, Sparkles, Timer, BadgePercent, Home as HomeIcon, ListChecks } from 'lucide-react';
import Button from '../../components/common/Button';
import TestCard from '../tests/TestCard';
import HowItWorks from '../../components/common/HowItWorks';
import Faq from '../../components/common/Faq';
import { CATEGORIES, CONCERNS, tests } from '../../data/tests';
import { CATEGORY_META, CONCERN_ICONS } from '../tests/categoryMeta';
import { sortTests } from '../../services/testService';
import { useCart } from '../../app/providers/CartProvider';

const HeroScene = lazy(() => import('./components/HeroScene'));
const CategoryChart = lazy(() => import('./components/CategoryChart'));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

/** STARTER dashboard (owner: Mohammed): hero + 3D scene, summary cards, featured tests. */
export default function Dashboard() {
  const { count } = useCart();
  const featured = sortTests(tests.filter((t) => t.kind === 'test'), 'popularity').slice(0, 3);
  const stats = [
    { icon: FlaskConical, label: 'Test categories', value: CATEGORIES.length },
    { icon: Package, label: 'Tests & packages', value: tests.length },
    { icon: ShoppingBag, label: 'In your cart', value: count },
    { icon: CalendarCheck, label: 'Upcoming bookings', value: '—', hint: 'Yashodhar' },
  ];

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-950 via-ink-900 to-brand-900 text-white">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative grid items-center gap-4 px-6 py-10 sm:px-12 md:grid-cols-[1.1fr_1fr] md:py-14">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="chip bg-white/10 text-brand-200"><Sparkles className="h-3.5 w-3.5" />Frontend demo · fictional data</motion.p>
            <motion.h1 variants={item} className="mt-4 text-4xl font-semibold leading-[1.05] !text-white sm:text-5xl lg:text-6xl">Book your lab tests, <span className="italic text-brand-200">calmly.</span></motion.h1>
            <motion.p variants={item} className="mt-4 max-w-md text-ink-300">Browse pathology tests and packages, check preparation notes, and build a booking in a few clear steps.</motion.p>
            <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
              <Button to="/tests" variant="accent" size="lg">Book a Test<ArrowRight className="h-5 w-5" /></Button>
              <Button to="/bookings" size="lg" className="!border !border-white/25 !bg-white/10 !text-white hover:!bg-white/20">My Bookings</Button>
            </motion.div>
          </motion.div>
          <div className="h-64 sm:h-80 md:h-[26rem]">
            <Suspense fallback={<div className="skeleton h-full w-full rounded-3xl opacity-20" />}><HeroScene /></Suspense>
          </div>
        </div>
      </section>

      <ul aria-label="Highlights" className="-mb-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-ink-700">
        {[[Timer, 'Reports in as little as 6 hours (demo)'], [HomeIcon, 'Home or lab collection'], [BadgePercent, 'Checkups from 30% off (demo)'], [ListChecks, 'Clear parameter lists']].map(([I, t]) => (
          <li key={t} className="flex items-center gap-2"><I className="h-4 w-4 text-brand-600" aria-hidden />{t}</li>
        ))}
      </ul>

      <section aria-label="Summary" className="-mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ icon: I, label, value, hint }) => (
          <div key={label} className="card flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><I className="h-6 w-6" aria-hidden /></span>
            <div><p className="font-display text-3xl font-semibold leading-none">{value}</p><p className="mt-1 text-xs text-ink-500">{label}{hint && <span className="text-ink-300"> · {hint}</span>}</p></div>
          </div>
        ))}
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="text-2xl font-semibold">Explore by category</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => { const m = CATEGORY_META[c]; const I = m.icon; return (
            <Link key={c} to={`/tests?category=${encodeURIComponent(c)}`} className="card group flex flex-col items-start gap-3 p-4 transition hover:-translate-y-1 hover:shadow-lift">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${m.tint}`}><I className="h-5 w-5" aria-hidden /></span>
              <span className="text-sm font-semibold leading-tight">{c}</span>
            </Link>); })}
        </div>
      </section>

      <section aria-labelledby="concerns">
        <h2 id="concerns" className="text-2xl font-semibold">Shop by health concern</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {CONCERNS.map((c) => { const I = CONCERN_ICONS[c]; return (
            <Link key={c} to={`/tests?concern=${encodeURIComponent(c)}`} className="flex min-h-[48px] items-center gap-2 rounded-full border border-ink-100 bg-white px-5 text-sm font-semibold shadow-card transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700">
              <I className="h-4 w-4 text-brand-600" aria-hidden />{c}
            </Link>); })}
        </div>
      </section>

      <section aria-labelledby="featured">
        <div className="mb-4 flex items-end justify-between"><h2 id="featured" className="text-2xl font-semibold">Popular tests</h2><Link to="/tests" className="text-sm font-semibold text-brand-700 hover:underline">View all</Link></div>
        <div className="grid gap-4 md:grid-cols-3">{featured.map((t) => <TestCard key={t.id} test={t} />)}</div>
      </section>

      <HowItWorks />

      <section aria-labelledby="chart" className="card p-6">
        <h2 id="chart" className="text-xl font-semibold">Catalogue at a glance</h2>
        <p className="mb-2 text-sm text-ink-500">Number of tests per category</p>
        <Suspense fallback={<div className="skeleton h-64 rounded-xl" />}><CategoryChart /></Suspense>
      </section>
      <Faq />
    </div>
  );
}
