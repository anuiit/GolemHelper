// src/components/RecentMatches/MatchCard.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from 'lucide-react';
import MatchDetails from './matchDetails';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { lazy } from 'react';

const LazyMatchDetails = lazy(() => import('./MatchDetails'));

const convertToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

const getCardClass = (remake, isWin, element) => {
  if (remake) {
    if (element === 'bg') return 'bg-gradient-to-b from-vulcan-800 from-1% via-vulcan-900 via-50% to-vulcan-900 to-80%';
    if (element === 'border') return 'border-vulcan-500';
    if (element === 'sep') return 'bg-gradient-to-r from-vulcan-500 from-5% to-vulcan-900 to-70%';
  } else {
    if (element === 'bg') return isWin ? 'bg-gradient-to-b from-blue-950 from-1% via-vulcan-900 via-50% to-vulcan-900 to-80%'
                                      : 'bg-gradient-to-b from-red-950 from-1% via-vulcan-900 via-50% to-vulcan-900 to-80%';
    if (element === 'border') return isWin ? 'border-blue-500' : 'border-red-500';
    if (element === 'sep') return isWin ? 'bg-gradient-to-r from-blue-950 from-33% via-blue-700 via-66% to-blue-950 to-100%'
                                        : 'bg-gradient-to-r from-red-950 from-33% via-red-800 via-66% to-red-950 to-100%';
  }
};

export default function MatchCard({ match, name }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const allParticipants = [...match.teams.blue.participants, ...match.teams.red.participants];
  const player = allParticipants.find(player => player.gameName === name);

  const blue_champions = match.teams.blue.participants.map(player => ({
    'championName': player.championName,
    'summonerName': player.gameName
  }));

  const red_champions = match.teams.red.participants.map(player => ({
    'championName': player.championName,
    'summonerName': player.gameName
  }));

  const primaryStyle = player?.primaryStyle[0];
  const secondaryStyle = player?.secondaryStyle[0];

  const primaryPerks = player?.primaryStyle.slice(1);
  const secondaryPerks = player?.secondaryStyle.slice(1);

  

  const gameDurationInSeconds = convertToSeconds(match.gameDuration);
  const thresholdInSeconds = convertToSeconds('5:00');

  const isWin = player.win;
  const remake = gameDurationInSeconds <= thresholdInSeconds;

  return (
    <div>
      <Card 
        className={`transition-all duration-75 ease-linear 
          ${getCardClass(remake, isWin, "bg")}}`} >

        <p className="text-vulcan-200 text-sm ml-6 my-1.5">{match.gameMode}</p>

        <Separator orientation="horizontal" className={`${getCardClass(remake, isWin, "sep")}`}/>
        {/* <Separator orientation="horizontal" className={`bg-gradient-to-r ${isWin ? 'from-blue-900' : 'from-red-900'} from-5% to-vulcan-900 to-70%`}/> */}
          
        <CardContent className="flex items-center w-full mt-2 justify-between px-6 pb-4" >
          <div className='flex flex-col gap-2'>
            <div className="flex items-center gap-4">

              <div className="relative w-14 mask-image overflow-hidden rounded-sm">
                {player && (
                  <Avatar className="w-full h-full">
                    <AvatarImage className={`mask border-2 ${getCardClass(remake, isWin, "border")}`} layout="fill" objectfit="cover"
                    src={`/champions-square/${player.championName}_square.jpg`} alt={player.championName} title={player.championName}
                    style={{
                      maskImage: "radial-gradient(circle, white 65%, transparent 100%)",
                    }} />

                  </Avatar>
                )}
              </div>
              
              <div className="flex flex-col items-center flex-none ml-1">
                <p className="text-vulcan-200 text-sm font-medium">{match.gameDuration}</p>
                <p className="text-vulcan-400 text-xs">{match.gameCreation}</p>
              </div>

            </div> 
          </div>

          <Separator orientation="vertical" className={`h-12 mx-4 bg-vulcan-800 `} />
          
          <div className="flex gap-8 items-center">
              <div>
                {player && (
                  <div className="flex flex-col flex-none gap-0.5">
                    <span className="text-vulcan-200 text-xs">Level {player?.champLevel}</span>

                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-xs text-vulcan-200">{player.kills}/{player.deaths}/{player.assists}</span>
                      <span className="text-vulcan-400 text-xs">
                        {player.deaths !== 0
                          ? ((player.kills + player.assists) / player.deaths).toFixed(2)
                          : (player.kills + player.assists).toFixed(2)} KDA
                      </span>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-xs text-vulcan-200">{player?.minionsKilled} CS</span>
                      <span className="text-vulcan-400 text-xs">
                        {(
                          player?.minionsKilled /
                          (parseInt(match.gameDuration.split(':')[0]) +
                            parseInt(match.gameDuration.split(':')[1]) / 60)
                        ).toFixed(1)} CS/min
                      </span>
                    </div>

                  </div>
                )}
              </div>

            {/*Summoner Spells */}
            <div className='grid grid-cols-2 gap-2'>
              <div className="grid gap-1">
                <img src={player?.summoner1} className="h-6 w-6 rounded-sm" title={player?.summoner1} />
                <img src={player?.summoner2} className="h-6 w-6 rounded-sm" title={player?.summoner2} />
              </div>

              <div className="grid gap-1">
                <img src={primaryStyle[1]} className="h-6 w-6" title={primaryStyle[0]} />
                <img src={secondaryStyle[1]} className="h-6 w-6" title={secondaryStyle[0]} />
              </div>
            </div>

            {/* Items */}
            <div className="grid grid-cols-3 gap-1">
              {player && Object.values(player.items).map((item, index) => (
                item.name === null ? (
                  <div key={index} className={`static h-7 w-7 rounded-md border-0 bg-vulcan-800`} />
                ) : (
                  <img key={index} src={item.icon} alt={item.name} title={item.name} className="h-7 w-7 rounded-md border-0" />
                )
              ))}
            </div>
          </div>

          <Separator orientation="vertical" className="h-12 mx-4 bg-vulcan-800" />
          
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-5 gap-1">
                {blue_champions.map((champion, index) => (
                  <img key={index} src={`/champions-square/${champion.championName}_square.jpg`} className="card-champions h-8 w-8 rounded-md" title={champion.summonerName} />
                ))}
              </div>

              <div className="grid grid-cols-5 gap-1">
                {red_champions.map((champion, index) => (
                  <img key={index} src={`/champions-square/${champion.championName}_square.jpg`} className="card-champions h-8 w-8 rounded-md" title={champion.summonerName} />
                ))}
              </div>
            </div>

            
          </div>

          {/* Chevron */}
          <div onClick={toggleExpand} className="cursor-pointer">
              {isExpanded ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </div>
        </CardContent>

        {/* MatchDetails - seamlessly connected */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <Separator orientation="horizontal" className="bg-vulcan-600" />
          <div>
            <Suspense >
              <LazyMatchDetails match={match} />
            </Suspense>
          </div>
        </div>
      </Card>
    </div>
  );
}