import { PlayerProfileData } from '../types'

export const fetchPlayerData = async (): Promise<PlayerProfileData> => {
    const response = await fetch('http://127.0.0.1:5000/api/playerProfileData')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data: PlayerProfileData = await response.json()
    console.log("api data: ", data)
    return data
  }