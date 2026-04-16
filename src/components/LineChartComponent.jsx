import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function LineChartComponent({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(item => ({
      date: item['Date'],
      Confirmed: item['Confirmed'],
      Deaths: item['Deaths'],
      Recovered: item['Recovered']
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  if (!chartData.length) return <div className="flex h-96 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 shadow-sm">No timeline data available</div>;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Worldwide Covid-19 Confirmed Cases Over Time.</h3>
      </div>

      <div className="h-full min-h-0 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b' }} 
              minTickGap={30}
              tickFormatter={(val) => {
                const d = new Date(val);
                return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
              }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val))} 
              tick={{ fill: '#64748b' }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(val) => new Date(val).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
              formatter={(value) => [value.toLocaleString(), 'Confirmed Cases']}
            />
            <Area type="monotone" dataKey="Confirmed" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorConfirmed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
