import { PlayerProfileData, RecentMatchData } from '../types'

export const fetchPlayerData = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/playerProfileData')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data = await response.json()
    console.log("playerProfileData: ", data)
    return data
}

export const fetchRecentMatches = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/playerMatchHistory')
    if (!response.ok) {
      throw new Error('Failed to fetch recent matches')
    }
    const data = await response.json()
    console.log("playerMatchHistory: ", data)
    return data
}