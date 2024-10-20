// src/components/dashboard/playerHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Player {
  name: string;
  level: number;
  rank: string;
}

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <Avatar className="w-24 h-24">
        <AvatarImage src="/placeholder.svg?height=96&width=96" alt={player.name} />
        <AvatarFallback>{player.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-gray-100">{player.name}</h1>
        <p className="text-xl text-gray-400">Level {player.level}</p>
      </div>
      <Badge variant="secondary" className="text-lg">
        {player.rank}
      </Badge>
    </div>
  );
}