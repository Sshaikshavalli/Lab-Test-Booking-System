# LabLoom – Lab Test Booking System (Frontend Demo)

A responsive **React + Vite** demonstration of the pathology-test discovery and booking journey.
**Frontend-only:** every lab, test, price, slot and record is fictional; nothing is sent to a real laboratory.
No payments, LIS integration, OTP, notifications or diagnosis/result interpretation.

## Prerequisites
- Node.js 18+ and npm

## Install & run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview
npm test           # catalogue / filter / sort / cart unit tests (Vitest)
```

## Deploy on Vercel
Import the repo in Vercel (Framework: Vite, build `npm run build`, output `dist`). `vercel.json` rewrites all routes to `index.html` so refreshing `/tests` or `/bookings` works.

## Stack
React 18 · Vite · Tailwind CSS · React Router · Framer Motion · Three.js + React Three Fiber · Recharts · Lucide · React Hook Form + Zod · date-fns · localStorage

## Folder ownership
| Member | Folders / files |
|---|---|
| **Mohammed Sohel** | `src/app/`, `src/components/`, `src/features/dashboard/`, `src/assets/`, `src/styles/` |
| **Shaiksha** | `src/features/tests/`, `src/data/tests.js`, `src/services/testService.js`, `src/hooks/useTests.js`, `tests/catalogue/` |
| **Dhanu** | `src/features/cart/`, `src/features/patient/`, `src/features/schedule/` |
| **Yashodhar** | `src/features/booking-review/`, `confirmation/`, `bookings/`, `src/services/storageService.js`, `src/data/demoBookings.js` |

Files for Dhanu's and Yashodhar's modules are **placeholders** (`components/common/Placeholder.jsx`) except a starter `BookingCart.jsx` and a minimal `storageService.js` so the shared cart works end-to-end. Replace the route element in `src/app/router.jsx` when your feature lands.

## Shaiksha's module – what's included
- **28 fictional tests/packages** across Haematology, Biochemistry, Clinical Pathology, Microbiology, Serology and Health Packages (`src/data/tests.js` – canonical shape documented at the top of the file).
- **Catalogue** (`/tests`): responsive grid/list, live search (name, code, category, sample type, parameters), filters (category, sample type, price, fasting, availability, tests/packages), sorting (popularity, name, price), active-filter chips, empty state, mobile filter drawer, floating cart bar, deep link `/tests?category=Serology`.
- **Details** (`/tests/:testId`): description, included parameters, sample type, fasting, turnaround, demo price, preparation guidance clearly labelled as demonstration content, related tests.
- **Inspired by real lab-booking sites (layout patterns only; all content fictional):** health-concern chips (Heart, Thyroid, Liver, Vitamins…), All/Tests/Checkups tabs, "Includes N parameters", struck-through price with % off badge, how-booking-works steps and FAQ.
- **Add / remove selection** wired to the shared cart (persisted in localStorage via `storageService`).
- **3D / motion:** hero scene on the dashboard (test tubes + DNA helix) and a sample-tube on the details page whose liquid colour matches the sample type. Both are decorative, lazy-loaded, respect `prefers-reduced-motion` and fall back to an SVG without WebGL. Forms and lists stay plain DOM.

### Shared cart contract (`useCart()` from `src/app/providers/CartProvider.jsx`)
```js
{ selectedTestIds: string[], selectedTests: Test[], indicativeTotal: number, count: number,
  has(id), add(id), remove(id), toggle(id), clear() }
```
`selectedTestIds` maps directly to `selectedTestIds` in the booking-draft contract.

### Hand-off note (Shaiksha)
- Routes needed: `/tests`, `/tests/:testId`.
- Test data shape: see `src/data/tests.js`. Helper APIs: `getTestById`, `getTestsByIds`, `queryTests`.
- Known issues: the 3D scenes and visual layout have not yet been checked in a real browser – please run `npm run dev` and review on desktop, tablet and mobile.

## Accessibility
Skip link, labelled form controls, keyboard-operable focus-trapped dialogs, visible focus rings, `aria-pressed` toggles, `aria-live` result counts, reduced-motion support (Framer `MotionConfig` + CSS).

## Git workflow
One branch per member (`feature/app-shell`, `feature/test-catalogue`, `feature/booking-input`, `feature/booking-management`); inform the team before editing shared files (router, global CSS, package.json, data contracts).
