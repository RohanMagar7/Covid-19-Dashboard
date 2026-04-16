import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DistributionChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const regionTotals = {};
    data.forEach(item => {
      const region = item['WHO Region'];
      if (region) {
        regionTotals[region] = (regionTotals[region] || 0) + (item['Confirmed'] || 0);
      }
    });

    return Object.entries(regionTotals).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (!chartData || chartData.length === 0) return null;

  const COLORS = ['#4f46e5', '#10b981', '#e11d48', '#d97706', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Distribution by Region</h3>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#334155', fontWeight: 500 }}
              formatter={(value) => [value.toLocaleString(), 'Confirmed Cases']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
