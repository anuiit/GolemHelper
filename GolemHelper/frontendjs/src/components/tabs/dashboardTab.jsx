import StatsCard from "@/components/dashboard/rankCard";
import MostPlayedChampions from "@/components/dashboard/champions";
import RecentMatches from "@/components/dashboard/matches/recentMatches";
import PlayerChart from "@/components/dashboard/playerChart";

export default function Dashboard({ searchQuery, className }) {
  return (
    <div className={`pt-4 space-y-4 ${className}`}>
      <div className="flex gap-4">
        <div className="flex-none w-64">
          <StatsCard searchQuery={searchQuery} />
        </div>
        <div className="flex-grow">
          <div className="w-full h-full">
            <PlayerChart searchQuery={searchQuery} />
            {/* <RankCard />
            <MostPlayedChampions /> */}
          </div>
        </div>
        
      </div>
      <MostPlayedChampions searchQuery={searchQuery} />
      <RecentMatches searchQuery={searchQuery} />
    </div>
  );
}
