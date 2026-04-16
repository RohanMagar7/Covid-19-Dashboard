import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Tooltip } from "recharts"; 

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapChart({ data }) {
  const countryMap = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc, curr) => {
      // Normalize common country names
      let name = curr['Country/Region'];
      if(name === "US") name = "United States of America";
      if(name === "UK") name = "United Kingdom";
      acc[name] = curr.Confirmed;
      return acc;
    }, {});
  }, [data]);

  const colorScale = (() => {
    const values = Object.values(countryMap).filter(v => v > 0);
    if (!values.length) return () => "#F5F4F6";
    return scaleQuantile()
      .domain(values)
      .range([
        "#fee2e2", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337"
      ]);
  })();

  return (
    <div className="flex flex-col h-full w-full rounded-2xl bg-white border border-slate-200 p-4 shadow-sm relative overflow-hidden">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Global Confirmed Cases Map</h3>
      </div>
      <div className="flex-1 w-full bg-slate-50/50 rounded-xl overflow-hidden relative">
        {Object.keys(countryMap).length > 0 ? (
          <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = countryMap[geo.properties.name];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d) : "#F5F4F6"}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{ hover: { fill: "#6366f1", outline: "none" }, pressed: { outline: "none" }, default: { outline: "none" } }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Loading map...</div>
        )}
      </div>
    </div>
  );
}
