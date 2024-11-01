import { useState, useEffect } from 'react';
import { fetchPlayerData3 } from '@/services/api';

export default function useFetchData(route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchPlayerData3(route);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [route]);

  return { data, loading };
}