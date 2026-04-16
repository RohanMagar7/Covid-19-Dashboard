import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck } from 'lucide-react';

export default function RecoveredByRegionChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const regionTotals = {};
    data.forEach(item => {
      const region = item['WHO Region'];
      if (region) {
        regionTotals[region] = (regionTotals[region] || 0) + (item['Recovered'] || 0);
      }
    });

    return Object.entries(regionTotals)
      .map(([region, Recovered]) => ({ region, Recovered }))
      .sort((a, b) => b.Recovered - a.Recovered);
  }, [data]);

  if (!chartData.length) return <div className="flex h-96 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 shadow-sm">No data available</div>;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Recovered Covid-19 Cases by Region.</h3>
      </div>
      
      <div className="h-full min-h-0 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val)} tick={{ fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value.toLocaleString(), 'Recovered']}
            />
            <Bar dataKey="Recovered" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
