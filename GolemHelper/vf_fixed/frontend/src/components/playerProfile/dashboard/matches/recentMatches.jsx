import React, { useState, useMemo, useCallback, useEffect } from 'react';
import MatchCard from './matchCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useFetchPlayerData from '@/hooks/useFetchData';
import { ProgressCircleRing, ProgressCircleRoot } from '@/components/ui/progress-circle';
import { Card, CardContent } from '@/components/ui/card';

export default function RecentMatches({ searchQuery, onFetchComplete }) {
  const [selectedTab, setSelectedTab] = useState('all');
  const route = useMemo(() => 'playerMatchHistory', []);
  const { data, loading } = useFetchPlayerData(route, searchQuery);

  useEffect(() => {
    if (!loading && data) {
      console.log("RecentMatches: Data fetched successfully");
      onFetchComplete();
    }
  }, [loading, data, onFetchComplete]);

  const recentMatches = data?.matches || [];

  const filterMatches = useCallback((matches, filter) => {
    if (filter === 'all') return matches;
    return matches.filter(match => match.gameMode.toLowerCase() === filter);
  }, []);

  const filteredMatches = useMemo(
    () => filterMatches(recentMatches, selectedTab),
    [recentMatches, selectedTab, filterMatches]
  );

  const renderMatchCards = useCallback(() => {
    return filteredMatches.map((match) => (
      <MatchCard key={match.gameId} match={match} name={data?.name} />
    ));
  }, [filteredMatches, data?.name]);

  if (loading || !data) return RecentMatchesSkeleton();

  return (
    <div className="w-full pt-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className='grid justify-start items-center grow'>
          <h1 className="text-vulcan-200">Recent Matches</h1>
          <p className="text-xs text-vulcan-400">Click on a match for more details</p>
        </div>
        <Button size="sm" className="px-2 py-4 border mr-2 bg-vulcan-900 hover:bg-vulcan-800">
          <div className='items-center scale-125 duration-150 ease-in-out hover:scale-110 '>
            <CalendarDays color="#d7d8e0"/>
          </div>
        </Button>
        <div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 bg-vulcan-900 border">
              <TabsTrigger className="text-vulcan-200 font-light" value="all">All</TabsTrigger>
              <TabsTrigger className="text-vulcan-200 font-light" value="normal">Normal</TabsTrigger>
              <TabsTrigger className="text-vulcan-200 font-light" value="ranked solo/duo">Solo/Duo</TabsTrigger>
              <TabsTrigger className="text-vulcan-200 font-light" value="ranked flex">Flex</TabsTrigger>
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

function RecentMatchesSkeleton() {
  return (
    <div className="w-full pt-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className='grid justify-start items-center grow'>
          <h1 className="text-vulcan-200">Recent Matches</h1>
          <p className="text-xs text-vulcan-400">Click on a match for more details</p>
        </div>
        <Button size="sm" className="px-2 py-4 border mr-2 bg-vulcan-900 hover:bg-vulcan-800">
          <div className='items-center scale-125 duration-150 ease-in-out hover:scale-110 '>
            <CalendarDays color="#d7d8e0"/>
          </div>
        </Button>
        <div>
          <Tabs value="all">
            <TabsList className="grid w-full grid-cols-4 bg-vulcan-900 border">
              <TabsTrigger className="font-light text-vulcan-200" value="all">All</TabsTrigger>
              <TabsTrigger className="font-light text-vulcan-200" value="normal">Normal</TabsTrigger>
              <TabsTrigger className="font-light text-vulcan-200" value="ranked solo/duo">Solo/Duo</TabsTrigger>
              <TabsTrigger className="font-light text-vulcan-200" value="ranked flex">Flex</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />
      <div className="space-y-2">
        <Card>
          <CardContent className="w-full flex items-center justify-center h-28 bg-vulcan-900 pt-6">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="w-full flex items-center justify-center h-28 bg-vulcan-900 pt-6">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="w-full flex items-center justify-center h-28 bg-vulcan-900 pt-6">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}