import RankCard from "@/components/playerProfile/dashboard/rankCard";
import RankCardSkeleton from "@/components/playerProfile/dashboard/rankCard";
import Champions, { ChampionsSkeleton } from "@/components/playerProfile/dashboard/champions";

import PlayerChart from "@/components/playerProfile/dashboard/playerChart";
import {PlayerChartSkeleton} from "@/components/playerProfile/dashboard/playerChart";

import RecentMatches from "@/components/playerProfile/dashboard/matches/recentMatches";
import React, { useState, useCallback, useEffect } from 'react';

const Dashboard = React.memo(function Dashboard({ searchQuery, className }) {
  const [recentMatchesLoaded, setRecentMatchesLoaded] = useState(false);

  const handleFetchComplete = useCallback(() => {
    console.log("handleFetchComplete called");
    setRecentMatchesLoaded(true);
  }, []);

  // Reset the loading state when searchQuery changes
  useEffect(() => {
    console.log("searchQuery changed. Resetting recentMatchesLoaded to false.");
    setRecentMatchesLoaded(false);
  }, [searchQuery]);

  return (
    <div className={`pt-4 space-y-4 ${className}`}>
      <div className="flex gap-4">
        <div className="flex-none w-64">
          {recentMatchesLoaded ? (
              <RankCard searchQuery={searchQuery} />
            ) : (
              <RankCardSkeleton />
            )}
        </div>
        <div className="flex-grow">
          <div className="w-full h-full">
            {recentMatchesLoaded ? (
              <PlayerChart searchQuery={searchQuery} />
            ) : (
              <PlayerChartSkeleton />
            )}
          </div>
        </div>
        
      </div>
      {recentMatchesLoaded ? (
        <Champions searchQuery={searchQuery} />
      ) : (
        <ChampionsSkeleton />
      )}
      <RecentMatches searchQuery={searchQuery} onFetchComplete={handleFetchComplete} />

    </div>
  );
});

export default Dashboard;