import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RecoveredByRegionChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const regionStats = {};
    data.forEach(item => {
      const region = item['WHO Region'];
      if (region) {
        if(!regionStats[region]) regionStats[region] = { Confirmed: 0, Recovered: 0 };
        regionStats[region].Confirmed += (item['Confirmed'] || 0);
        regionStats[region].Recovered += (item['Recovered'] || 0);
      }
    });

    return Object.entries(regionStats)
      .map(([name, stats]) => ({ 
          name, 
          Rate: stats.Confirmed > 0 ? (stats.Recovered / stats.Confirmed) * 100 : 0
      }))
      .sort((a, b) => b.Rate - a.Rate);
  }, [data]);

  if (!chartData || chartData.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Recovery Rate by Region (%)</h3>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} domain={[0, 100]} label={{ value: "Recovery Rate (%)", position: "insideBottom", offset: -10, fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
            <YAxis dataKey="name" type="category" width={100} tick={{fill: '#64748b', fontSize: 11}} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value.toFixed(1)}%`, 'Recovery Rate']}
            />
            <Bar dataKey="Rate" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.Rate > 75 ? "#10b981" : entry.Rate > 50 ? "#f59e0b" : "#e11d48"} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
