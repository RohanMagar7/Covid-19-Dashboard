import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TopCountriesChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const sorted = [...data].sort((a, b) => (b['Confirmed'] || 0) - (a['Confirmed'] || 0));
    return sorted.slice(0, 10).map(item => ({
      name: item['Country/Region'],
      Confirmed: item['Confirmed']
    }));
  }, [data]);

  if (!chartData || chartData.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Top 10 Most Affected Countries</h3>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 11}} tickLine={false} axisLine={false} dy={10} label={{ value: "Countries", position: "insideBottom", offset: -10, fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value.toLocaleString(), 'Confirmed Cases']}
            />
            <Bar dataKey="Confirmed" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
