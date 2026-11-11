import { Construction } from 'lucide-react';
import Button from './Button';

/** Stand-in for pages owned by other team members. Replace the route element when the feature lands. */
export default function Placeholder({ title, owner, folder, notFound }) {
  return (
    <div className="card mx-auto mt-6 max-w-xl p-8 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600"><Construction className="h-7 w-7" /></span>
      <h1 className="mt-4 text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-ink-500">
        {notFound ? 'That page does not exist.' : <>This step is owned by <b>{owner}</b> (<code className="font-mono text-xs">src/{folder}</code>) and is not part of this module.</>}
      </p>
      <Button to="/tests" className="mt-6">Browse tests</Button>
    </div>
  );
}
