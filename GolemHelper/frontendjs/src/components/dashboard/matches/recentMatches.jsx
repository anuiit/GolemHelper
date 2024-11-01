'use client';

import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import MatchCard from './matchCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useFetchPlayerData from '@/hooks/useFetchData';

export default function RecentMatches() {
  const [selectedTab, setSelectedTab] = useState('all');
  const { data, loading } = useFetchPlayerData('playerMatchHistory');
  const recentMatches = data?.matches;

  const filterMatches = useCallback((matches, filter) => {
    if (filter === 'all') return matches;
    return matches.filter(match => match.gameMode.toLowerCase() === filter);
  }, []);

  const filteredMatches = useMemo(() => filterMatches(recentMatches, selectedTab), [recentMatches, selectedTab, filterMatches]);

  const renderMatchCards = useCallback(() => {
    return filteredMatches.map((match) => (
      <MatchCard key={match.gameId} match={match} name={data?.name} />
    ));
  }, [filteredMatches]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full pt-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className='grid justify-start items-center grow'>
          <h1 className="text-vulcan-200">Recent Matches</h1>
          <p className="text-xs text-vulcan-400 font-thin">Click on a match for more details</p>
        </div>
        <Button size="sm" className="px-2 py-4 border mr-2 bg-vulcan-900 hover:bg-vulcan-800">
          <div className='items-center scale-125 duration-150 ease-in-out hover:scale-110 '>
            <CalendarDays color="#d7d8e0"/>
          </div>
        </Button>
        <div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 bg-vulcan-900 border">
              <TabsTrigger className="font-thin text-white" value="all">All</TabsTrigger>
              <TabsTrigger className="font-thin text-white" value="normal">Normal</TabsTrigger>
              <TabsTrigger className="font-thin text-white" value="ranked solo/duo">Solo/Duo</TabsTrigger>
              <TabsTrigger className="font-thin text-white" value="ranked flex">Flex</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />
      <div>
        {data?.matches.length === 0 ? (
          <div>No matches found.</div>
        ) : (
          <div className="space-y-2">
            {renderMatchCards()}
          </div>
        )}
      </div>
    </div>
  );
}