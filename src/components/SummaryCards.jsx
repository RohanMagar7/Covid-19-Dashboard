import React, { useMemo } from 'react';
import { Activity, ShieldCheck, HeartPulse, ShieldAlert } from 'lucide-react';

export default function SummaryCards({ data }) {
  const totals = useMemo(() => {
    if (!data || data.length === 0) return { Confirmed: 0, Recovered: 0, Deaths: 0, Active: 0 };
    return {
      Confirmed: data.reduce((sum, row) => sum + (row['Confirmed'] || 0), 0),
      Deaths: data.reduce((sum, row) => sum + (row['Deaths'] || 0), 0),
      Recovered: data.reduce((sum, row) => sum + (row['Recovered'] || 0), 0),
      Active: data.reduce((sum, row) => sum + (row['Active'] || 0), 0)
    };
  }, [data]);

  const cards = [
    { label: 'Confirmed', value: totals.Confirmed, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Activity },
    { label: 'Deaths', value: totals.Deaths, color: 'text-rose-600', bg: 'bg-rose-50', icon: ShieldAlert },
    { label: 'Recovered', value: totals.Recovered, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: ShieldCheck },
    { label: 'Active', value: totals.Active, color: 'text-amber-600', bg: 'bg-amber-50', icon: HeartPulse },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card, i) => (
        <div key={i} className={`rounded-2xl p-4 border border-slate-100/50 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 ${card.bg}`}>
          <div className={`p-3 rounded-xl bg-white shadow-sm ${card.color}`}>
            <card.icon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${card.color}`}>
              {card.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
