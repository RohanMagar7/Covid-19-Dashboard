import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

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

  if (!chartData.length) return <div className="flex h-96 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 shadow-sm">No data available</div>;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
          <Activity size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Confirmed Cases vs Deaths Worldwide.</h3>
      </div>
      
      <div className="h-full min-h-0 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="Confirmed" 
              name="Confirmed Cases" 
              tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val)} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              type="number" 
              dataKey="Deaths" 
              name="Deaths" 
              tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={() => ''}
            />
            <Scatter name="Countries" data={chartData} fill="#f43f5e" fillOpacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
