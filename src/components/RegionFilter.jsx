import React from 'react';
import { Globe } from 'lucide-react';

export default function RegionFilter({ regions, selectedRegion, onRegionChange }) {
  if (!regions || regions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 min-w-[250px]">
      <label htmlFor="region-select" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <Globe size={16} /> Regional Filter
      </label>
      <div className="relative">
        <select
          id="region-select"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
        >
          <option value="All">All Global Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
