import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TeamColumn({ teamName, participants }) {
    console.log("TeamColumn:", participants);

    return (
        <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-medium text-gray-100">{teamName}</h2>
        {participants.map((player) => {
            console.log("Player:", player);
            return (
            <Card key={player.name} className="flex items-center p-4 space-x-4 bg-zinc-900 border-0">
            <Avatar>
                {/* Use the actual champion icon URL */}
                <AvatarImage src={`/champions-square/${player.championName}_square.jpg`} alt={player.championName} />
            </Avatar>
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-100">{player.name}</p>
                <p className="text-sm text-gray-400">{player.championName}</p>
            </div>
            <Badge variant="secondary">#{player.tagline}</Badge>
            </Card>
        )})}
        </div>
    );
}   