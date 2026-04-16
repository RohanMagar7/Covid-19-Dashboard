import React, { useState } from 'react';
import { Shield, FileWarning, Search, Moon, Sun } from 'lucide-react';
import { useCovidData } from './hooks/useCovidData';
import SummaryCards from './components/SummaryCards';
import TopCountriesChart from './components/TopCountriesChart';
import DistributionChart from './components/DistributionChart';
import RecoveredByRegionChart from './components/RecoveredByRegionChart';
import LineChartComponent from './components/LineChartComponent';
import ConfirmedVsDeathsChart from './components/ConfirmedVsDeathsChart';
import MapChart from './components/MapChart';
import DailyCasesChart from './components/DailyCasesChart';
import ComparisonChart from './components/ComparisonChart';
import RegionFilter from './components/RegionFilter';

export default function App() {
  const { data, loading, error } = useCovidData();
  const [activeTab, setActiveTab] = useState('Overview');
  const [regionFilter, setRegionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading COVID-19 datasets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl flex items-center gap-3">
          <FileWarning size={24} />
          <div>
            <h3 className="font-bold">Error loading dashboard</h3>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter countryData down by Region & Search string
  const filteredCountryData = data.countryData.filter(item => {
    const matchRegion = regionFilter === 'All' || item['WHO Region'] === regionFilter;
    const matchSearch = item['Country/Region']?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  });

  const uniqueRegions = Array.from(new Set(data.countryData.map(item => item['WHO Region']))).filter(Boolean).sort();

  const tabs = ['Overview', 'Trends', 'Regional', 'Analysis'];

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-200 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'} border-b px-6 py-3 flex-none sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/20">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">COVID-19 Dashboard</h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Advanced Global Tracker</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">            <RegionFilter
            regions={uniqueRegions}
            selectedRegion={regionFilter}
            onRegionChange={setRegionFilter}
            darkMode={darkMode}
          />            <div className="relative group w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 text-slate-900 border-transparent focus:border-indigo-500'}`}
              />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-slate-700 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-6 py-4 flex-1 flex flex-col gap-4 overflow-hidden">

        {/* Controls & Nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex p-1 bg-slate-200/60 rounded-xl overflow-hidden inline-flex">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Global Summary Stats */}
        <div className="shrink-0">
          <SummaryCards data={filteredCountryData} />
        </div>

        {/* Tab Content Grid */}
        <div className="flex-1 w-full min-h-0 overflow-hidden">

          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="min-h-0 h-full">
                <MapChart data={filteredCountryData} />
              </div>
              <div className="min-h-0 h-full">
                <TopCountriesChart data={filteredCountryData} />
              </div>
            </div>
          )}

          {activeTab === 'Trends' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="min-h-0 h-full">
                <LineChartComponent data={data.dayData} />
              </div>
              <div className="min-h-0 h-full">
                <DailyCasesChart data={data.dayData} />
              </div>
            </div>
          )}

          {activeTab === 'Regional' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="flex-1 min-h-0 h-full">
                <DistributionChart data={filteredCountryData} />
              </div>
              <div className="flex-1 min-h-0 h-full">
                <RecoveredByRegionChart data={filteredCountryData} />
              </div>
            </div>
          )}

          {activeTab === 'Analysis' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="flex-1 min-h-0 h-full">
                <ConfirmedVsDeathsChart data={filteredCountryData} />
              </div>
              <div className="flex-1 min-h-0 h-full">
                <ComparisonChart groupedData={data.groupedData} />
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
