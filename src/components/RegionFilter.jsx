import React from 'react';
import { Globe } from 'lucide-react';

export default function RegionFilter({ regions, selectedRegion, onRegionChange, darkMode }) {
  if (!regions || regions.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 min-w-[200px] w-full sm:w-48">
      <label htmlFor="region-select" className="hidden">Regional Filter</label>
      <div className="relative">
        <select
          id="region-select"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium ${darkMode ? 'bg-slate-700 text-white border-transparent placeholder-slate-400' : 'bg-slate-100 text-slate-900 border-transparent'}`}
        >
          <option value="All">All Global Regions</option>
          {regions.map((region) => <option key={region} value={region}>{region}</option>)}
        </select>
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Globe size={14} />
        </div>
      </div>
    </div>
  );
}
