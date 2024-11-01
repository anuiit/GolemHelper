import { useState, useEffect } from 'react';
import { fetchPlayerData3 } from '@/services/api';

export default function useFetchData(route, searchQuery) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchKey = searchQuery?.split('#')[0] || '';

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);

    async function getData() {
      try {
        console.log('Fetching data for route:', route, 'with searchQuery:', searchQuery);
        const result = await fetchPlayerData3(route, searchQuery);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchKey]);

  return { data, loading };
}