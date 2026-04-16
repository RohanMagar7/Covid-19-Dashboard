import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];

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

  if (!chartData.length) return <div className="flex h-96 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-500 shadow-sm">No data available</div>;

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
          <PieChartIcon size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Distribution of Covid-19 Confirmed Cases.</h3>
      </div>
      
      <div className="h-full min-h-0 flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value.toLocaleString(), 'Confirmed Cases']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
