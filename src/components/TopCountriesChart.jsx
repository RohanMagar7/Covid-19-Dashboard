import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function TopCountriesChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const sorted = [...data].sort((a, b) => (b['Confirmed'] || 0) - (a['Confirmed'] || 0));
    return sorted.slice(0, 10).map(item => ({
      country: item['Country/Region'],
      Confirmed: item['Confirmed']
    }));
  }, [data]);

  if (!chartData.length) return <div className="flex h-96 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 shadow-sm">No country data available</div>;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
          <BarChart3 size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Top 10 Countries with Most Confirmed Covid-19 Cases.</h3>
      </div>
      
      <div className="h-full min-h-0 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val)} tick={{ fill: '#64748b' }} />
            <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} width={100} tick={{ fill: '#475569', fontWeight: 500 }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value.toLocaleString(), 'Confirmed']}
            />
            <Bar dataKey="Confirmed" fill="#fb923c" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
