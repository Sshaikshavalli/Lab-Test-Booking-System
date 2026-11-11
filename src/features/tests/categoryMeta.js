import { Droplets, Droplet, FlaskConical, Microscope, Bug, ShieldCheck, HeartPulse, Activity, Zap, Sun, Utensils, User, Baby } from 'lucide-react';

/** Visual identity per category (icon + tint) so cards are scannable at a glance. */
export const CATEGORY_META = {
  Haematology: { icon: Droplets, tint: 'bg-rose-50 text-rose-600', dot: '#e11d48' },
  Biochemistry: { icon: FlaskConical, tint: 'bg-amber-50 text-amber-600', dot: '#d97706' },
  'Clinical Pathology': { icon: Microscope, tint: 'bg-sky-50 text-sky-600', dot: '#0284c7' },
  Microbiology: { icon: Bug, tint: 'bg-lime-50 text-lime-700', dot: '#4d7c0f' },
  Serology: { icon: ShieldCheck, tint: 'bg-violet-50 text-violet-600', dot: '#7c3aed' },
  'Health Packages': { icon: HeartPulse, tint: 'bg-brand-50 text-brand-700', dot: '#0b8776' },
};

export const SAMPLE_COLORS = {
  Blood: '#c81e3a', Urine: '#f2c94c', Stool: '#8b5a2b', Swab: '#7cc9b8', Other: '#9f7aea', Multiple: '#e0457b',
};

export const AVAILABILITY_STYLE = {
  'Available today': 'bg-emerald-50 text-emerald-700',
  'Next-day slot': 'bg-sky-50 text-sky-700',
  'Limited slots': 'bg-amber-50 text-amber-700',
};

/** Body-system chips (health concern) – icon per concern. */
export const CONCERN_ICONS = {
  Blood: Droplets, Heart: HeartPulse, Diabetes: Activity, Thyroid: Zap, Liver: FlaskConical, Kidney: Droplet,
  Vitamins: Sun, Infection: Bug, Gut: Utensils, Fertility: Baby, 'Full Body': User,
};
