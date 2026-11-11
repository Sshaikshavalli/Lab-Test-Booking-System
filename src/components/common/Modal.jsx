import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

/** Keyboard-operable dialog: Esc closes, focus moves in and returns, Tab is trapped. */
export default function Modal({ open, onClose, title, children, side = false }) {
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const focusables = () => panel.current?.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])') ?? [];
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = [...focusables()];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={`fixed inset-0 z-50 flex ${side ? 'items-end sm:items-stretch sm:justify-end' : 'items-end justify-center sm:items-center'}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={title}
            className={`relative flex max-h-[90vh] w-full flex-col bg-white shadow-lift ${side ? 'rounded-t-3xl sm:max-h-none sm:max-w-sm sm:rounded-none sm:rounded-l-3xl' : 'max-w-lg rounded-t-3xl sm:rounded-3xl'}`}
            initial={side ? { y: 40, opacity: 0 } : { y: 24, opacity: 0, scale: .98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}>
            <header className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close dialog" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100"><X className="h-5 w-5" /></button>
            </header>
            <div className="overflow-y-auto p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
