// src/pages/playerDashboard.tsx
"use client"

import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlayerHeader from "@/components/dashboard/playerHeader"
import StatsCard from "@/components/dashboard/statsCard"
import RankCard from "@/components/dashboard/rankCard"
import MostPlayedChampions from "@/components/dashboard/mostPlayedChampionsCard"

import RecentMatches from "@/components/recentMatches/recentMatches"
import LiveGame from "@/components/liveGameTab/liveGameTab"

import { usePlayerData, PlayerDataContext } from '@/context/playerDataContext'
import { liveGameData } from "@/data/liveGameData"

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState("general")
  const playerData = useContext(PlayerDataContext)

  console.log("dashboard: ", playerData)

  if (!playerData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-new-color-1 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <PlayerHeader player={playerData} />
        <Tabs defaultValue="general" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="live-game">Live Game</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <StatsCard stats={playerData} />
              <div className="grid gap-4">
                <RankCard rank={playerData.rank} lp={playerData.lp} />
                <MostPlayedChampions champions={playerData.mostPlayedChampions} />
              </div>
            </div>
            <RecentMatches matches={playerData.recentMatches} />
          </TabsContent>
          <TabsContent value="live-game">
            <LiveGame players={liveGameData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}