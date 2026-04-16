import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useCovidData = () => {
  const [data, setData] = useState({
    countryData: [],
    dayData: [],
    groupedData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchCSV = async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          const csvText = await response.text();
          return new Promise((resolve) => {
            Papa.parse(csvText, {
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
              complete: (results) => resolve(results.data),
            });
          });
        };

        const [countryRes, dayRes, groupedRes] = await Promise.all([
          fetchCSV('/data/country_wise_latest.csv'),
          fetchCSV('/data/day_wise.csv'),
          fetchCSV('/data/full_grouped.csv')
        ]);

        setData({
          countryData: countryRes,
          dayData: dayRes,
          groupedData: groupedRes
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
