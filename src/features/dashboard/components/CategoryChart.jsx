import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CATEGORIES, tests } from '../../../data/tests';
import { CATEGORY_META } from '../../tests/categoryMeta';

const data = CATEGORIES.map((c) => ({ name: c.replace('Clinical ', 'Clin. ').replace('Health ', ''), full: c, count: tests.filter((t) => t.category === c).length }));

export default function CategoryChart() {
  return (
    <div className="h-64" role="img" aria-label={`Bar chart of tests per category: ${data.map((d) => `${d.full} ${d.count}`).join(', ')}`}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e6eef0" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#5b7882' }} interval={0} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#5b7882' }} />
          <Tooltip cursor={{ fill: 'rgba(18,165,143,.08)' }} formatter={(v) => [v, 'Tests']} labelFormatter={(_, p) => p?.[0]?.payload.full} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#12a58f" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
