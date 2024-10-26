// src/components/ui/searchbar.jsx

import React, { useState } from 'react';
import { usePlayerDataUpdate } from '@/context/playerDataContext';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const { triggerUpdate } = usePlayerDataUpdate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query) {
      try {
        triggerUpdate(query); // Trigger the useEffect to re-fetch data
      } catch (error) {
        console.error('Failed to update player data:', error);
      }
    }
  };

  return (
    <div className="">
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Name#Tagline (xxx#1234)" 
        className="p-1 px-2 border-2 border-gray-600 rounded-xl w-64 bg-zinc-800 text-gray-300 transition-all duration-50 focus:outline-none focus:border-gray-400" 
      />
      <button onClick={handleSearch} className="ml-2 p-1 px-2 border-2 border-gray-600 rounded-xl bg-zinc-800 text-gray-300 transition-all duration-50 focus:outline-none focus:border-gray-400">
        Search
      </button>
    </div>
  );
};

export default Searchbar;