import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ITEMS = [
  ['Is this a real booking service?', 'No. This is a frontend-only demonstration. Labs, tests, prices and slots are fictional and nothing is sent to a laboratory.'],
  ['Do I need to fast before a test?', 'Each test page shows demonstration fasting guidance. Always confirm real instructions with a laboratory or clinician.'],
  ['Where is my booking stored?', 'Only in this browser (localStorage). Clearing site data or using another device will not show it.'],
  ['Can I change a booking?', 'In the demo you can cancel or reschedule from My Bookings; changes persist after a refresh.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby="faq">
      <h2 id="faq" className="text-2xl font-semibold">Frequently asked</h2>
      <div className="mt-4 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {ITEMS.map(([q, a], i) => (
          <div key={q}>
            <h3 className="font-sans">
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 text-left text-sm font-semibold hover:bg-sand-50">
                {q}<ChevronDown className={`h-4 w-4 shrink-0 transition ${open === i ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h3>
            {open === i && <p className="px-5 pb-4 text-sm text-ink-500">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
