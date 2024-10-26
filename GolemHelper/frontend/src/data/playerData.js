// data/playerData.ts

import { PlayerProfileData } from '@/types'

export const playerData = {
  name: "Faker",
  level: 789,
  rank: "Challenger",
  lp: 1453,
  winRate: 68,
  kdaRatio: 4.2,
  csmin: 9.8,
  visionScore: 1.5,
  mostPlayedChampions: [
    { name: "Zed", games: 150, winRate: 65 },
    { name: "Ahri", games: 120, winRate: 58 },
    { name: "Syndra", games: 100, winRate: 62 },
  ],
  recentMatches: [
    {
      id: 1,
      result: "Victory",
      duration: "28:15",
      blue: [
        { name: "Faker", champion: "Zed", level: 18, kills: 12, deaths: 3, assists: 7 },
        { name: "Chovy", champion: "Ahri", level: 16, kills: 4, deaths: 2, assists: 5 },
        { name: "Canyon", champion: "Lee Sin", level: 15, kills: 2, deaths: 1, assists: 10 },
        { name: "Ruler", champion: "Jinx", level: 15, kills: 6, deaths: 2, assists: 8 },
        { name: "Keria", champion: "Thresh", level: 14, kills: 0, deaths: 3, assists: 12 },
      ],
      red: [
        { name: "Caps", champion: "Syndra", level: 15, kills: 3, deaths: 6, assists: 5 },
        { name: "Jankos", champion: "Jarvan IV", level: 14, kills: 1, deaths: 5, assists: 7 },
        { name: "Rekkles", champion: "Kai'Sa", level: 15, kills: 5, deaths: 4, assists: 3 },
        { name: "Mikyx", champion: "Nautilus", level: 13, kills: 0, deaths: 7, assists: 8 },
        { name: "Wunder", champion: "Ornn", level: 15, kills: 2, deaths: 4, assists: 6 },
      ],
    }]
}
