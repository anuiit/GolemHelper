"use client";

import Tabs from "@/components/dashboard/tabSelector";
import PlayerHeader from "@/components/dashboard/playerHeader";
import StatsCard from "@/components/dashboard/statsCard";
import RankCard from "@/components/dashboard/rankCard";
import MostPlayedChampions from "@/components/dashboard/mostPlayedChampionsCard";
import RecentMatches from "@/components/recentMatches/recentMatches";
import LiveGame from "@/components/liveGameTab/liveGameTab";
import { liveGameData } from "@/data/liveGameData";

export default function PlayerDashboard() {
  const tabs = [
    { name: "general", displayName: "General" },
    { name: "live-game", displayName: "Live Game" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-zinc-950 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <PlayerHeader />
        <Tabs tabs={tabs}>
          <div name="general" className="pt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <StatsCard />
              <div className="grid gap-4">
                <RankCard />
                <MostPlayedChampions />
              </div>
            </div>
            <RecentMatches />
          </div>
          <div name="live-game" className="pt-4">
            <LiveGame players={liveGameData} />
          </div>
        </Tabs>
      </div>
    </div>
  );
}