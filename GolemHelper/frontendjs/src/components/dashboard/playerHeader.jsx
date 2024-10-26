// src/components/dashboard/playerHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { PlayerDataContext } from "@/context/playerDataContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Searchbar from "../ui/searchbar";

export default function PlayerHeader() {
  const context = useContext(PlayerDataContext);

  if (!context) {
    return <div>Loading...</div>;
  }
  const player = context?.playerData?.header;

  if (!player) {
    return <div>No stats available</div>;
  }

  return (
    <Card className="flex items-center border-0 bg-zinc-900 py-6">
      <div className="flex items-start ml-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={player.profileIcon} alt={player.name} />
          <AvatarFallback>{player.name}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-grow items-start ml-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-100">{player.name}</h1>
          <p className="text-xl text-gray-400 mt-1">#{player.tagline}</p>
        </div>
        <p className="text-xl text-gray-400">Level {player.level}</p>
      </div>

      <div className="relative bottom-10 right-4">
        <Searchbar className="bg-black" />
      </div>
    </Card>
  );
}