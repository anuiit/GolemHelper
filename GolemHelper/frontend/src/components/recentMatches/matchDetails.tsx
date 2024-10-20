// src/components/RecentMatches/MatchDetails.tsx

import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Match, PlayerMatchData, MatchComponentProps } from '@/types'
import { runeDescriptions } from '@/data/runeDescriptions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MatchDetails: React.FC<MatchComponentProps> = ({ match }) => {
    // Calculate team stats
    const calculateTeamStats = (players: PlayerMatchData[]) => {
      // Placeholder calculations
      const totalKills = players.reduce((sum, player) => sum + (player.kills || 0), 0)
      const totalDeaths = players.reduce((sum, player) => sum + (player.deaths || 0), 0)
      const totalAssists = players.reduce((sum, player) => sum + (player.assists || 0), 0)
    //   const totalCS = players.reduce((sum, player) => sum + (player.cs || 0), 0)
    //   const totalGold = players.reduce((sum, player) => sum + (player.gold || 0), 0)
    //   const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0)
  
      return { totalKills, totalDeaths, totalAssists }
    }
  
    // Calculate team stats
    const allyTeamStats = calculateTeamStats(match.blue)
    const enemyTeamStats = calculateTeamStats(match.red)
  
    return (
      <div className="bg-gray-800 border border-gray-700 text-gray-100 p-4">
        {/* Header */}
  
        {/* Tabs for Personal and Team Data */}
        <Tabs defaultValue="personal">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Stats</TabsTrigger>
            <TabsTrigger value="team">Team Stats</TabsTrigger>
          </TabsList>
  
          {/* Tabs Content Container with Fixed Height */}
          <div className="relative">
            <div className="max-h-96 overflow-y-auto">
              {/* Personal Stats Tab */}
              <TabsContent value="personal">

              </TabsContent>
  
              {/* Team Stats Tab */}
              <TabsContent value="team">
                {/* Team Stats Content */}
                <div>
                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Ally Team */}
                    <div>
                      <h4 className="font-semibold mb-2">Ally Team</h4>
                      <div className="space-y-2">
                        {match.blue.map((player, index) => (
                          <div key={index} className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/champions/${player.champion}.png`} alt={player.champion} />
                              <AvatarFallback>{player.champion[0]}</AvatarFallback>
                            </Avatar>
                            {/* <div>
                              <p className="text-sm">
                                {player.champion} (Lvl {player.level}) - {player.name}
                              </p>
                              {player.kda && (
                                <p className="text-xs text-gray-400">
                                  KDA: {player.kda}, CS: {player.cs}, Gold: {player.gold}
                                </p>
                              )}
                            </div> */}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Enemy Team */}
                    <div>
                      <h4 className="font-semibold mb-2">Enemy Team</h4>
                      <div className="space-y-2">
                        {match.red.map((player, index) => (
                          <div key={index} className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/champions/${player.champion}.png`} alt={player.champion} />
                              <AvatarFallback>{player.champion[0]}</AvatarFallback>
                            </Avatar>
                            {/* <div>
                              <p className="text-sm">
                                {player.champion} (Lvl {player.level}) - {player.name}
                              </p>
                              {player.kda && (
                                <p className="text-xs text-gray-400">
                                  KDA: {player.kda}, CS: {player.cs}, Gold: {player.gold}
                                </p>
                              )}
                            </div> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
  
                  {/* Team Aggregated Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Ally Team Stats */}
                    <div>
                      <h4 className="font-semibold mb-2">Ally Team Stats</h4>
                      <p className="text-sm">Total Kills: {allyTeamStats.totalKills}</p>
                      <p className="text-sm">Total Deaths: {allyTeamStats.totalDeaths}</p>
                      <p className="text-sm">Total Assists: {allyTeamStats.totalAssists}</p>
                      {/* <p className="text-sm">Total CS: {allyTeamStats.totalCS}</p>
                      <p className="text-sm">Total Gold: {allyTeamStats.totalGold}</p>
                      <p className="text-sm">Total Damage: {allyTeamStats.totalDamage}</p> */}
                    </div>
                    {/* Enemy Team Stats */}
                    <div>
                      <h4 className="font-semibold mb-2">Enemy Team Stats</h4>
                      <p className="text-sm">Total Kills: {enemyTeamStats.totalKills}</p>
                      <p className="text-sm">Total Deaths: {enemyTeamStats.totalDeaths}</p>
                      <p className="text-sm">Total Assists: {enemyTeamStats.totalAssists}</p>
                      {/* <p className="text-sm">Total CS: {enemyTeamStats.totalCS}</p>
                      <p className="text-sm">Total Gold: {enemyTeamStats.totalGold}</p>
                      <p className="text-sm">Total Damage: {enemyTeamStats.totalDamage}</p> */}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    )
  }
  
  export default MatchDetails