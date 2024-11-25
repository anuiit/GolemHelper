// src/hooks/useFetchData.jsx
import { useState, useEffect } from 'react';
import { fetchPlayerData3 } from '@/services/api';
import { useLoading } from '@/context/loadingContext';

export default function useFetchData(route, searchQuery, dependsOn = []) {
  const [data, setData] = useState(null);
  const [loading, setLocalLoading] = useState(true);
  const { loadingStates, setLoading } = useLoading();

  const searchKey = searchQuery?.split('#')[0] || '';

  useEffect(() => {
    if (!searchQuery) return;

    // Check if dependencies are still loading
    const areDependenciesLoading = dependsOn.some(dep => loadingStates[dep]);

    if (areDependenciesLoading) {
      // Wait until dependencies are loaded
      return;
    }

    // Reset data and set loading states
    setData(null); // Clear previous data
    setLoading(route, true);
    setLocalLoading(true);

    const fetchData = async () => {
      try {
        const result = await fetchPlayerData3(route, searchQuery);
        setData(result);
      } catch (error) {
        console.error(`Error fetching data for ${route}:`, error);
      } finally {
        setLoading(route, false);
        setLocalLoading(false);
      }
    };

    fetchData();
  }, [searchKey, ...dependsOn.map(dep => loadingStates[dep])]); // Include dependencies in the effect

  return { data, loading };
}