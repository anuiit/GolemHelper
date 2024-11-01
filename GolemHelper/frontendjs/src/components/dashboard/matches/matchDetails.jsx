// src/components/RecentMatches/MatchDetails.tsx

import React from 'react'
import { runeDescriptions } from '@/data/runeDescriptions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from '@/components/ui/Card'

function MatchDetails() {
    // Calculate team stats
    // const calculateTeamStats = (players) => {
    //   // Placeholder calculations
    //   const totalKills = players.reduce((sum, player) => sum + (player.kills || 0), 0)
    //   const totalDeaths = players.reduce((sum, player) => sum + (player.deaths || 0), 0)
    //   const totalAssists = players.reduce((sum, player) => sum + (player.assists || 0), 0)
    // //   const totalCS = players.reduce((sum, player) => sum + (player.cs || 0), 0)
    // //   const totalGold = players.reduce((sum, player) => sum + (player.gold || 0), 0)
    // //   const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0)
  
    //   return { totalKills, totalDeaths, totalAssists }
    // }
  
    // Calculate team stats
    // const allyTeamStats = calculateTeamStats(match.blue)
    // const enemyTeamStats = calculateTeamStats(match.red)
  
    return (
      <Card className="bg-zinc-900 border-0 text-gray-100 p-4">
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
                    </div>
                    {/* Enemy Team */}
                    <div>
                      <h4 className="font-semibold mb-2">Enemy Team</h4>
                    </div>
                  </div>
  
                  {/* Team Aggregated Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Ally Team Stats */}
                    <div>
                      
                    </div>
                    {/* Enemy Team Stats */}
                    <div>
                      
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </Card>
    )
  }
  
  export default MatchDetails