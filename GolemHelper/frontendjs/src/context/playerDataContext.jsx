// src/context/playerDataContext.jsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchPlayerData2 } from '@/services/api'

export const PlayerDataContext = createContext(undefined)

export const PlayerDataProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(undefined)
  const [trigger, setTrigger] = useState(true); // State variable to trigger useEffect
  const [query, setQuery] = useState('')

  const triggerUpdate = (searchQuery) => {
    setQuery(searchQuery);
    setTrigger(prev => !prev); // Toggle the trigger state to re-run useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlayerData2(query);
        setPlayerData(data);
        console.log("playerData: ", data);
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      }
    };
  
    fetchData();
  }, [trigger, query]);

  return (
    <PlayerDataContext.Provider value={{ playerData, triggerUpdate }}>
      {children}
    </PlayerDataContext.Provider>
  )
}

export const usePlayerData = () => {
  const context = useContext(PlayerDataContext)
  if (context === undefined) {
    throw new Error('usePlayerData must be used within a PlayerDataProvider')
  }
  return context
}

// Custom hook for Searchbar to trigger updates
export const usePlayerDataUpdate = () => {
  const context = useContext(PlayerDataContext)
  if (context === undefined) {
    throw new Error('usePlayerDataUpdate must be used within a PlayerDataProvider')
  }
  return { triggerUpdate: context.triggerUpdate }
}