import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ComparisonChart({ groupedData }) {
  const chartData = useMemo(() => {
    if (!groupedData || groupedData.length === 0) return { formatted: [], topCountries: [] };
    
    // Find top 5 countries
    const countryTotals = {};
    groupedData.forEach(item => {
      const country = item['Country/Region'];
      if (!countryTotals[country] || item.Confirmed > countryTotals[country]) {
          countryTotals[country] = item.Confirmed;
      }
    });

    const topCountries = Object.entries(countryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);

    // Group by Date -> Country -> Confirmed
    const dateMap = {};
    groupedData.forEach(item => {
      if (topCountries.includes(item['Country/Region'])) {
         if (!dateMap[item.Date]) dateMap[item.Date] = { Date: item.Date };
         dateMap[item.Date][item['Country/Region']] = item.Confirmed;
      }
    });

    const formatted = Object.values(dateMap).sort((a,b) => new Date(a.Date) - new Date(b.Date));
    return { formatted, topCountries };
  }, [groupedData]);

  if (!chartData.formatted.length) return null;

  const colors = ['#4f46e5', '#e11d48', '#10b981', '#d97706', '#8b5cf6'];

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Top 5 Countries Trend</h3>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.formatted} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="Date" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} dy={10} minTickGap={30} 
                   tickFormatter={(val) => {
                     const d = new Date(val);
                     return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                   }} 
            />
            <YAxis tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}} />
            {chartData.topCountries.map((country, idx) => (
               <Line key={country} type="monotone" dataKey={country} stroke={colors[idx % colors.length]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
