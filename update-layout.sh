sed -i 's/min-h-screen bg-slate-50 text-slate-800 font-sans pb-12/h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans flex flex-col/g' src/App.jsx

sed -i 's/sticky top-0 z-10 shadow-sm/shrink-0 z-10 shadow-sm/g' src/App.jsx

sed -i 's/max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4/max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-between gap-2/g' src/App.jsx

sed -i 's/p-2.5 rounded-xl/p-2 rounded-lg/g' src/App.jsx
sed -i 's/size={28}/size={24}/g' src/App.jsx
sed -i 's/text-2xl font-black/text-lg font-black/g' src/App.jsx
sed -i 's/text-sm font-medium text-slate-500/text-xs font-medium text-slate-500/g' src/App.jsx

sed -i 's/max-w-7xl mx-auto px-6 pt-8/flex-1 w-full max-w-[1600px] mx-auto p-3 flex flex-col min-h-0 overflow-hidden/g' src/App.jsx

sed -i 's/className="flex-[1] grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12"/className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 min-h-0"/g' src/App.jsx

