import React from 'react';
import LineChartComponent from './LineChartComponent';
import DistributionChart from './DistributionChart';
import RecoveredByRegionChart from './RecoveredByRegionChart';
import ConfirmedVsDeathsChart from './ConfirmedVsDeathsChart';
import TopCountriesChart from './TopCountriesChart';

export default function DashboardCharts({ timelineData, globalMetrics, barChartData, scatterData, top10Data }) {
  const pieData = [
    { name: 'Active', value: globalMetrics.Active || 0 },
    { name: 'Recovered', value: globalMetrics.Recovered || 0 },
    { name: 'Deaths', value: globalMetrics.Deaths || 0 },
    { name: 'Unassigned', value: Math.max(0, (globalMetrics.Confirmed || 0) - (globalMetrics.Active || 0) - (globalMetrics.Recovered || 0) - (globalMetrics.Deaths || 0)) }
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            Worldwide Progression
          </h2>
          <div className="flex-grow min-h-0 w-full overflow-hidden">
            <LineChartComponent data={timelineData} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Case Distribution</h2>
          <div className="flex-grow min-h-0 w-full overflow-hidden">
            <DistributionChart data={pieData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Top 10 Countries by Confirmed Cases</h2>
          <div className="flex-grow min-h-0 w-full overflow-hidden">
             <TopCountriesChart data={top10Data} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recovered Cases by Region</h2>
          <div className="flex-grow min-h-0 w-full overflow-hidden">
            <RecoveredByRegionChart data={barChartData} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 h-[400px]">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Confirmed vs Deaths Correlation (All Countries)</h2>
            <div className="flex-grow min-h-0 w-full overflow-hidden">
              <ConfirmedVsDeathsChart data={scatterData} />
            </div>
        </div>
      </div>
    </div>
  );
}
