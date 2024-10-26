"use client"

import React, { useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerDataContext } from "@/context/playerDataContext";
import MatchCard from './matchCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MemoizedMatchCard = React.memo(MatchCard);

export default function RecentMatches() {
  const { playerData } = useContext(PlayerDataContext);
  const [selectedTab, setSelectedTab] = useState('all');
  const [visibleMatches, setVisibleMatches] = useState(10); // Number of matches to render initially

  const recentMatches = playerData?.recentMatches || [];

  const filterMatches = useCallback((matches, filter) => {
    if (filter === 'all') return matches;
    return matches.filter(match => match.gameMode.toLowerCase() === filter);
  }, []);

  const filteredMatches = useMemo(() => filterMatches(recentMatches, selectedTab), [recentMatches, selectedTab, filterMatches]);

  const renderMatchCards = useCallback(() => {
    return filteredMatches.slice(0, visibleMatches).map((match) => (
      <MemoizedMatchCard key={match.gameId} match={match} />
    ));
  }, [filteredMatches, visibleMatches]);

  // Incrementally load more matches when the user scrolls
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setVisibleMatches((prev) => Math.min(prev + 10, filteredMatches.length));
    }
  }, [filteredMatches.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset visible matches when the selected tab changes
  useEffect(() => {
    setVisibleMatches(10);
  }, [selectedTab]);

  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className='grid justify-start items-center'>
          <CardTitle className="text-gray-100">Recent Matches</CardTitle>
          <CardDescription>Click on a match for more details</CardDescription>
        </div>
        <div className="relative bottom-1">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 bg-zinc-600">
              <TabsTrigger className="bg-zinc-800 text-white" value="all">All</TabsTrigger>
              <TabsTrigger className="bg-zinc-800 text-white" value="normal">Normal</TabsTrigger>
              <TabsTrigger className="bg-zinc-800 text-white" value="ranked solo/duo">Ranked Solo/Duo</TabsTrigger>
              <TabsTrigger className="bg-zinc-800 text-white" value="ranked flex">Ranked Flex</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {recentMatches.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-2">
            {renderMatchCards()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}