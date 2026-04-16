import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ConfirmedVsDeathsChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data
      .map(item => ({
        country: item['Country/Region'],
        Confirmed: item['Confirmed'],
        Deaths: item['Deaths']
      }))
      .filter(item => item.Confirmed > 0 && item.Deaths > 0);
  }, [data]);

  if (!chartData || chartData.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800">Confirmed Cases vs Deaths Worldwide</h3>
        <p className="text-sm text-slate-500">Scatter correlation between total confirmed cases and deaths</p>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" dataKey="Confirmed" name="Confirmed Cases" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
            <YAxis type="number" dataKey="Deaths" name="Deaths" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
            <Tooltip 
              cursor={{strokeDasharray: '3 3'}} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={() => ''}
            />
            <Scatter name="Countries" data={chartData} fill="#e11d48" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
