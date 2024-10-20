// types.ts

export interface PlayerProfileData {
  name: string
  level: number
  rank: string
  lp: number
  winRate: number
  kdaRatio: number
  csmin: number
  visionScore: number
  mostPlayedChampions: MostPlayedChampion[]
  recentMatches: Match[]
}

export interface PlayerMatchData {
  //id: number
  name: string
  champion: string
  level: number
  kills: number
  deaths: number
  assists: number
  // kda: string
  // kdaRatio: number
  // cs: number
  // csPerMin: number
  // duration: string
  // damage: number
  // gold: number
  // vision: number
  //runes: string[]
}

export interface Match {
  id: number
  result: string
  duration: string
  blue: PlayerMatchData[]
  red: PlayerMatchData[]
}

export interface MostPlayedChampion {
  name: string
  games: number
  winRate: number
}

export interface LiveGamePlayer {
  name: string
  champion: string
  rank: string
}

export type LiveGameData = LiveGamePlayer[]

export interface RecentMatchesProps {
  matches: Match[]
}

export interface MatchComponentProps {
  match: Match
}