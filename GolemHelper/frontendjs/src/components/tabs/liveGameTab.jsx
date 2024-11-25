// src/components/livegame/LiveGameTab.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MatchPrediction from "../livegame/matchPrediction";
import useFetchData from "@/hooks/useFetchData";
import TeamColumn from "../livegame/teamColumn";

export default function LiveGameTab({ searchQuery }) {
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const { data, loading } = useFetchData("liveGameData", searchQuery);

  useEffect(() => {
    if (!data) return;

    setIsLoading(true);
    setPrediction(null);

    // Simulate API call for prediction
    const timer = setTimeout(() => {
      const random = Math.random();
      setPrediction({
        winner: random > 0.5 ? "Blue Team" : "Red Team",
        confidence: Math.round(random * 30 + 70), // Random confidence between 70% and 100%
      });
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data]);

  console.log("liveGameData:", data);
  console.log("blue:",  data?.teams.blue.participants);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-gray-100">Live Game</CardTitle>
        <CardDescription>Current match in progress</CardDescription>
      </CardHeader>
      <CardContent>
        <MatchPrediction isLoading={isLoading} prediction={prediction} />
        <div className="grid gap-4 md:grid-cols-2">
          
          {/* Blue Team Column */}
          <TeamColumn teamName="Blue Team" participants={data?.teams.blue.participants} />
          
          {/* Red Team Column */}
          <TeamColumn teamName="Red Team" participants={data?.teams.red.participants} />
        
        </div>
      </CardContent>
    </Card>
  );
}