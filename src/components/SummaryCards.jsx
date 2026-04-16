import React, { useMemo } from 'react';
import { Activity, ShieldCheck, Skull } from 'lucide-react';

export default function SummaryCards({ data }) {
  const totals = useMemo(() => {
    if (!data || data.length === 0) return { Confirmed: 0, Recovered: 0, Deaths: 0 };
    return {
      Confirmed: data.reduce((sum, row) => sum + (row['Confirmed'] || 0), 0),
      Recovered: data.reduce((sum, row) => sum + (row['Recovered'] || 0), 0),
      Deaths: data.reduce((sum, row) => sum + (row['Deaths'] || 0), 0)
    };
  }, [data]);

  const cards = [
    {
      title: 'Total Confirmed',
      value: totals.Confirmed,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Total Recovered',
      value: totals.Recovered,
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Total Deaths',
      value: totals.Deaths,
      icon: Skull,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      borderColor: 'border-rose-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-0">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className={`relative overflow-hidden rounded-2xl border ${card.borderColor} bg-white p-3 shadow-sm transition-all hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
              <h2 className={`text-xl font-bold ${card.color}`}>
                {card.value.toLocaleString()}
              </h2>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor} ${card.color}`}>
              <card.icon size={20} />
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 h-1 w-full ${card.bgColor}`} />
        </div>
      ))}
    </div>
  );
}
