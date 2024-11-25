import { useState, useEffect } from 'react';
import { fetchPlayerData } from '@/lib/api';

export default function useFetchData(route, searchQuery) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(false);
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchPlayerData(route, searchQuery);
        setData(result);
      } catch (error) {
        console.error(`Error fetching data for ${route}:`, error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route, searchQuery]);

  return { data, loading };
}