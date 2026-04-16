import React, { useState, useMemo } from 'react';
import { useCovidData } from './hooks/useCovidData';
import RegionFilter from './components/RegionFilter';
import SummaryCards from './components/SummaryCards';
import LineChartComponent from './components/LineChartComponent';
import TopCountriesChart from './components/TopCountriesChart';
import DistributionChart from './components/DistributionChart';
import RecoveredByRegionChart from './components/RecoveredByRegionChart';
import ConfirmedVsDeathsChart from './components/ConfirmedVsDeathsChart';
import { ShieldAlert, Search, RefreshCw } from 'lucide-react';

function App() {
  const { countryData, timelineData, loading, error } = useCovidData();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = useMemo(() => {
    if (!countryData) return [];
    const uniqueRegions = new Set(countryData.map(item => item['WHO Region']).filter(Boolean));
    return Array.from(uniqueRegions).sort();
  }, [countryData]);

  const filteredCountryData = useMemo(() => {
    if (!countryData) return [];
    return countryData.filter(item => {
      const regionMatch = selectedRegion === 'All' || item['WHO Region'] === selectedRegion;
      const searchMatch = !searchQuery ||
        (item['Country/Region'] && item['Country/Region'].toLowerCase().includes(searchQuery.toLowerCase()));
      return regionMatch && searchMatch;
    });
  }, [countryData, selectedRegion, searchQuery]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 text-slate-500">
        <RefreshCw className="mb-4 animate-spin text-blue-500" size={48} />
        <h2 className="text-xl font-medium">Loading Global Covid-19 Data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 text-rose-600">
        <ShieldAlert size={64} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to load data</h2>
        <p className="text-rose-500/80">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shrink-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md shadow-blue-500/20">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight">COVID-19 Response</h1>
              <p className="text-xs font-medium text-slate-500">Global Monitoring Dashboard</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-2 md:p-1.5 rounded-2xl md:rounded-full border border-slate-100">
            <RegionFilter
              regions={regions}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />

            <div className="hidden md:block w-px h-8 bg-slate-200" />

            <div className="relative w-full md:w-auto min-w-[250px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                id="search-input"
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl md:rounded-full border-0 bg-white md:bg-transparent py-2.5 pl-11 pr-4 text-slate-700 shadow-sm md:shadow-none ring-1 ring-inset ring-slate-300 md:ring-0 focus:ring-2 focus:ring-inset focus:ring-blue-500/50 sm:text-sm sm:leading-6 font-medium transition-all outline-none md:hover:bg-white md:focus:bg-white"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-3 flex flex-col min-h-0 overflow-hidden">
        {filteredCountryData.length > 0 ? (
          <>
            <div className="shrink-0 mb-3">
              <SummaryCards data={filteredCountryData} />
            </div>
            <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 min-h-0">
              <div className="col-span-2 row-span-1 min-h-0 h-full">
                <LineChartComponent data={timelineData} />
              </div>
              <div className="col-span-1 row-span-1 min-h-0 h-full">
                <DistributionChart data={filteredCountryData} />
              </div>
              <div className="col-span-1 row-span-1 min-h-0 h-full">
                <RecoveredByRegionChart data={filteredCountryData} />
              </div>
              <div className="col-span-2 row-span-1 min-h-0 h-full">
                <ConfirmedVsDeathsChart data={filteredCountryData} />
              </div>
              <div className="col-span-2 row-span-1 min-h-0 h-full">
                <TopCountriesChart data={filteredCountryData} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 mt-12 bg-white rounded-3xl border border-slate-200 border-dashed">
            <Search size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Results Found</h3>
            <p className="text-slate-500 text-center max-w-md">We couldn't find any data matching your current filters. Try adjusting the region or search term.</p>
            <button
              onClick={() => { setSelectedRegion('All'); setSearchQuery(''); }}
              className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
