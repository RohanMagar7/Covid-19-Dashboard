import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useCovidData = () => {
  const [countryData, setCountryData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [countryRes, timelineRes] = await Promise.all([
          fetch('/data/country_wise_latest.csv'),
          fetch('/data/day_wise.csv')
          
        ]);

        if (!countryRes.ok || !timelineRes.ok) {
          throw new Error('Failed to fetch data files');
        }

        const countryText = await countryRes.text();
        const timelineText = await timelineRes.text();

        Papa.parse(countryText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setCountryData(results.data);
          },
          error: (err) => {
            throw new Error(`Error parsing country data: ${err.message}`);
          }
        });

        Papa.parse(timelineText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setTimelineData(results.data);
          },
          error: (err) => {
            throw new Error(`Error parsing timeline data: ${err.message}`);
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { countryData, timelineData, loading, error };
};
