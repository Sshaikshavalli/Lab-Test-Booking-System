import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-100 bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-ink-500 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
          Frontend-only demonstration. All laboratories, tests, prices and records are fictional and nothing is sent to a real lab.</p>
        <p>© {new Date().getFullYear()} LabLoom demo · React + Vite</p>
      </div>
    </footer>
  );
}
