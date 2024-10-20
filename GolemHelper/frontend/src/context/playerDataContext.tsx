// src/context/PlayerDataContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchPlayerData } from '@/services/api'
import { PlayerProfileData } from '@/types'

export const PlayerDataContext = createContext<PlayerProfileData | undefined>(undefined)

export const PlayerDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerData, setPlayerData] = useState<PlayerProfileData | undefined>(undefined)

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchPlayerData()
  //       setPlayerData(data)
  //     } catch (error) {
  //       console.error('Failed to fetch player data:', error)
  //     }
  //   }
  //   getData()
  // }, [])

  useEffect(() => {
    // Fetch the player data and set it
    fetchPlayerData().then(data => setPlayerData(data))
    
  }, [])
  console.log("fetchPlayerData: ", fetchPlayerData())

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