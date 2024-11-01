import StatsCard from "@/components/dashboard/rankCard";
import MostPlayedChampions from "@/components/dashboard/champions";
import RecentMatches from "@/components/dashboard/matches/recentMatches";
import PlayerChart from "@/components/dashboard/playerChart";

export default function Dashboard({ className }) {
  return (
    <div className={`pt-4 space-y-4 ${className}`}>
      <div className="flex gap-4">
        <div className="flex-none w-64">
          <StatsCard />
        </div>
        <div className="flex-grow">
          <div className="w-full h-full">
            <PlayerChart />
            {/* <RankCard />
            <MostPlayedChampions /> */}
          </div>
        </div>
        
      </div>
      <MostPlayedChampions />
      <RecentMatches />
    </div>
  );
}
