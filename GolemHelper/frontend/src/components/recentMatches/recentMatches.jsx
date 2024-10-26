// src/components/RecentMatches/RecentMatches.tsx

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useContext } from "react";
import { PlayerDataContext } from "@/context/playerDataContext";
import MatchCard from './matchCard';

export default function RecentMatches() {
  const playerData = useContext(PlayerDataContext);
  if (!playerData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-gray-100">Recent Matches</CardTitle>
        <CardDescription>Click on a match for more details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {playerData.recentMatches.map((match) => (
            <MatchCard />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
