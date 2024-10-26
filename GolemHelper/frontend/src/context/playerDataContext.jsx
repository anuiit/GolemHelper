// src/context/PlayerDataContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchPlayerData } from '@/services/api'

export const PlayerDataContext = createContext<PlayerProfileData | undefined>(undefined)

export const PlayerDataProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState<PlayerProfileData | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlayerData();
        setPlayerData(data);
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <PlayerDataContext.Provider value={playerData}>
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