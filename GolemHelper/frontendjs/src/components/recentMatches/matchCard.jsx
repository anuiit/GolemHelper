// src/components/RecentMatches/MatchCard.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from 'lucide-react';
import MatchDetails from './matchDetails';
import { PlayerDataContext } from '@/context/playerDataContext';

export default function MatchCard({ match }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const context = useContext(PlayerDataContext);
  const playerData = context?.playerData;
  const recentMatches = playerData?.recentMatches;

  const allParticipants = [...match.teams.blue.participants, ...match.teams.red.participants];
  const player = allParticipants.find(player => player.gameName === playerData.header.name);

  const blue_champions = match.teams.blue.participants.map(player => ({
    'championIcon': player.championIcon,
    'summonerName': player.gameName
  }));

  const red_champions = match.teams.red.participants.map(player => ({
    'championIcon': player.championIcon,
    'summonerName': player.gameName
  }));

  const primaryStyle = player?.primaryStyle[0];
  const secondaryStyle = player?.secondaryStyle[0];

  const primaryPerks = player?.primaryStyle.slice(1);
  const secondaryPerks = player?.secondaryStyle.slice(1);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (recentMatches) {
      setLoading(false);
    }
  }, [recentMatches]);

  return (
    <div>
      <Card className={`border-0 ${player.win === true ? 'bg-sky-950 hover:bg-sky-900' : 'bg-rose-950 hover:bg-rose-900'} cursor-pointer transition-all duration-75 ease-linear hover:shadow-lg`}>
        <div className="flex items-center" onClick={toggleExpand}>
          <CardContent className="flex items-center p-3 w-full">
            <p className="text-gray-300 text-xs w-20 font-semibold">{match.gameMode}</p>
              
              {player && (
                <Avatar className="h-12 w-12 mr-2 ">
                  <AvatarImage src={player.championIcon} alt={player.championName} title={player.championName} />
                  <AvatarFallback>{player.championName}</AvatarFallback>
                </Avatar>
              )}
            <div className="flex gap-4 items-center w-full">
              <div className="flex flex-col items-center w-16 flex-none ml-2">
              {/* <p className={`font-medium text-lg ${player.win === true ? "text-green-500" : "text-red-500"}`}>
                  {player.win === true ? "Victory" : "Defeat"}
                </p> */}
                
                <p className="text-gray-300 font-semibold">{match.gameDuration}</p>
                <p className="text-gray-400 text-xs">{match.gameCreation}</p>
              </div>

              {player && (
                <div className="flex flex-col items-center w-28 flex-none">
                  <span className="text-gray-300 text-xs font-semibold">Level {player?.champLevel}</span>

                  <div className="flex flex-row items-center gap-2">
                    <span className="font-medium text-xs text-gray-300">{player.kills}/{player.deaths}/{player.assists}</span>
                    <span className="text-gray-400 text-xs">
                      {player.deaths !== 0
                        ? ((player.kills + player.assists) / player.deaths).toFixed(2)
                        : (player.kills + player.assists).toFixed(2)} KDA
                    </span>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <span className="text-gray-300 text-xs font-medium">{player?.minionsKilled} CS</span>
                    <span className="text-gray-400 text-xs">
                      {(
                        player?.minionsKilled /
                        (parseInt(match.gameDuration.split(':')[0]) +
                          parseInt(match.gameDuration.split(':')[1]) / 60)
                      ).toFixed(1)} CS/min
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center w-38 flex-none">
                <div className="flex gap-2 flex-col w-8">
                  <img src={primaryStyle[1]} className="h-7 w-7" title={primaryStyle[0]} />
                  <img src={secondaryStyle[1]} className="h-7 w-7" title={secondaryStyle[0]} />
                </div>

                <div className="flex flex-col items-center gap-3 justify-evenly ">
                  {primaryPerks && (
                    <div className="flex gap-1 items-center">
                      {primaryPerks.map((runeGroup, index) => (
                        index === 0 ? (
                          <img key={index} src={runeGroup[1]} className="h-6 w-6" title={runeGroup[0]} />
                        ) : (
                        <img key={index} src={runeGroup[1]} className="h-6 w-6 " title={runeGroup[0]} />
                        )
                      ))}
                    </div>
                  )}

                  {secondaryPerks && (
                    <div className="flex gap-1 items-center ">
                      {secondaryPerks.map((runeGroup, index) => (
                        <img key={index} src={runeGroup[1]} alt={runeGroup[0]} title={runeGroup[0]} className="h-6 w-6" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="grid grid-cols-3 items-center gap-1 ml-5 w-18 flex-none">
                {player && Object.values(player.items).map((item, index) => (
                  item.name === null ? (
                    <div key={index} className={`h-6 w-6 rounded-md border-0 ${player.win === true ? 'bg-sky-900' : 'bg-rose-900'}`} />
                  ) : (
                    <img key={index} src={item.icon} alt={item.name} title={item.name} className="h-6 w-6 rounded-md border-0 bg-zinc-950" />
                  )
                ))}
              </div>
            </div>
          </CardContent>

          {/* Champions and Chevron on the right */}
          <div className="flex items-center gap-2 flex-none">
            <div className="flex flex-col content-end gap-1">
              <div className="grid grid-cols-5 gap-1 justify-items-end">
                {blue_champions.map((champion, index) => (
                  <img key={index} src={champion.championIcon} className="h-7 w-7" title={champion.summonerName} />
                ))}
              </div>

              <div className="grid grid-cols-5 gap-1 justify-items-end">
                {red_champions.map((champion, index) => (
                  <img key={index} src={champion.championIcon} className="h-7 w-7" title={champion.summonerName} />
                ))}
              </div>
            </div>

            {/* Chevron */}
            <div className="mr-4">
              {isExpanded ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </Card>
      {isExpanded && <MatchDetails match={match} />}
    </div>
  );
}