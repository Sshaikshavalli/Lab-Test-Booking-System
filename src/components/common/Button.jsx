import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]';
const variants = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-lift',
  accent: 'bg-coral-500 text-white hover:bg-coral-400',
  secondary: 'bg-white text-ink-900 border border-ink-100 hover:border-brand-400 hover:text-brand-700',
  ghost: 'text-ink-700 hover:bg-ink-100/70',
  danger: 'bg-white text-coral-500 border border-coral-100 hover:bg-coral-100',
};
const sizes = { sm: 'px-3 text-sm', md: 'px-4 text-sm', lg: 'px-6 text-base' };

/** Button that renders a router <Link> when `to` is given. */
const Button = forwardRef(function Button({ variant = 'primary', size = 'md', to, className = '', children, ...rest }, ref) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link ref={ref} to={to} className={cls} {...rest}>{children}</Link>;
  return <button ref={ref} type="button" className={cls} {...rest}>{children}</button>;
});
export default Button;
