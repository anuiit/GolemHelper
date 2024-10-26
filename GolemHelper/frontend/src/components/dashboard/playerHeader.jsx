// src/components/dashboard/playerHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { PlayerDataContext } from "@/context/playerDataContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PlayerHeader() {
  const playerData = useContext(PlayerDataContext);

  if (!playerData) {
    return <div>Loading...</div>;
  }
  const player = playerData?.header;

  if (!player) {
    return <div>No stats available</div>;
  }

  return (
    <Card className="flex items-center gap-4 border-0  bg-zinc-900">
      <CardHeader>
      <Avatar className="w-24 h-24">
        <AvatarImage src={player.profileIcon} alt={player.name} />
        <AvatarFallback>{player.name}</AvatarFallback>
      </Avatar>
      </CardHeader>
      <div className="flex-gro==w">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-100">{player.name}</h1>
          <p className="text-xl text-gray-400 mt-1">#{player.tagline}</p>
        </div>
        
        <p className="text-xl text-gray-400">Level {player.level}</p>
      </div>
      {/* <Badge variant="secondary" className="text-lg">
        {player.rank}
      </Badge> */}
    </Card>
  ); 
}