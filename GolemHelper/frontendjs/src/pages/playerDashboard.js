// src/components/dashboard/playerDashboard.js

"use client";

import { useState } from "react";
import PlayerHeader from "@/components/dashboard/playerHeader";
import StatsCard from "@/components/dashboard/statsCard";
import RankCard from "@/components/dashboard/rankCard";
import MostPlayedChampions from "@/components/dashboard/mostPlayedChampionsCard";
import RecentMatches from "@/components/recentMatches/recentMatches";
import LiveGame from "@/components/liveGameTab/liveGameTab";
import { liveGameData } from "@/data/liveGameData";
import NavBar from "@/components/dashboard/nav";

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-zinc-950 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <PlayerHeader />
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "general" && (
          <div className="pt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <StatsCard />
              <div className="grid gap-4">
                <RankCard />
                <MostPlayedChampions />
              </div>
            </div>
            <RecentMatches />
          </div>
        )}
        {activeTab === "live-game" && (
          <div className="pt-4">
            <LiveGame players={liveGameData} />
          </div>
        )}
      </div>
    </div>
  );
}