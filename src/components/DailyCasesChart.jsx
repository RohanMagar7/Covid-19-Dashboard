import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DailyCasesChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Calculate new cases (difference between consecutive days)
    const result = [];
    const sorted = [...data].sort((a, b) => new Date(a.Date) - new Date(b.Date));
    
    for (let i = 1; i < sorted.length; i++) {
        // Fallback for missing 'New cases' field if not present directly in data
        const newCases = sorted[i]['New cases'] !== undefined 
          ? sorted[i]['New cases'] 
          : Math.max(0, (sorted[i].Confirmed || 0) - (sorted[i-1].Confirmed || 0));

        result.push({
            Date: sorted[i].Date,
            NewCases: newCases
        });
    }
    return result;
  }, [data]);

  if (!chartData.length) return null;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Daily New Cases</h3>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="Date" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} dy={10} minTickGap={30} 
                   tickFormatter={(val) => {
                     const d = new Date(val);
                     return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                   }} 
                   label={{ value: "Timeline (Date)", position: "insideBottom", offset: -15, fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
                   label={{ value: "New Cases", angle: -90, position: "insideLeft", offset: 0, fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(val) => new Date(val).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
            />
            <Area type="monotone" dataKey="NewCases" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
