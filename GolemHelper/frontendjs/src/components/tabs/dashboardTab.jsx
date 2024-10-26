import StatsCard from "@/components/dashboard/statsCard";
import MostPlayedChampions from "@/components/dashboard/mostPlayedChampionsCard";
import RecentMatches from "@/components/recentMatches/recentMatches";
import RankCard from "@/components/dashboard/rankCard";

export default function Dashboard() {
    return (
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
    );
}