// src/components/RecentMatches/MatchCard.tsx

import React, { useState, useContext } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp } from 'lucide-react'
import MatchDetails from './matchDetails'
import { PlayerDataContext } from '@/context/playerDataContext'

export default function MatchCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => {
      setIsExpanded(!isExpanded)
  }

  const playerData = useContext(PlayerDataContext);
  if (!playerData?.recentMatches) {
    return <div>Loading...</div>;
  }
  const recentMatches = playerData?.recentMatches;
  const mainPlayer = playerData?.recentMatches[0].teams.blue.participants[0];

  // find the player in the match
  const match = recentMatches[0];
  const player = match.teams.blue.participants.find(player => player.summonerName === mainPlayer.summonerName)
  console.log("player", player)
  console.log("recentMatches", recentMatches[0].teams.blue.participants[0].summonerName)

  const blue_champions = match.teams.blue.participants.map(player.championName)
  console.log("blue_champions", blue_champions)


  return (
    <div>
      <Card className="bg-zinc-700 border-0 cursor-pointer transition-all duration-75 ease-linear hover:bg-neutral-800 hover:border-neutral-700 hover:border-2"
        onClick={toggleExpand}>
        <CardContent className="flex items-center p-4">
          {player && (
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={player.championIcon} alt={player.championName}/>
              <AvatarFallback>{player.championName}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex gap-8 items-center">
            <div className="flex-3">
              <p className={`font-medium text-lg ${player.win === true ? "text-green-500" : "text-red-500"}`}>
                {player.win === true ? "Victory" : "Defeat"}
              </p>
              <p className="text-gray-400">{match.gameDuration}</p>
            </div>
            {player && (
              <div className="flex-3 mt-1">
                <p className="font-medium text-m">{player.kills}/{player.deaths}/{player.assists}</p>
                <p className="text-gray-400 text-sm">{player.kills + player.assists/player.deaths}</p>
              </div>
            )}
            {/* {runes && (
              <div className="flex-3">
                <div className="flex gap-2">
                  {runes.map((rune, index) => (
                    <img key={index} src={rune} className="h-8 w-8" />
                  ))}
                </div>
              </div>
            )} */}
          </div>
          <div className="ml-auto">
            {isExpanded ? (<ChevronUp className="h-6 w-6 text-gray-400" />) : (<ChevronDown className="h-6 w-6 text-gray-400" />)}
          </div>
        </CardContent>
      </Card>
      {isExpanded && <MatchDetails match={match} />}
    </div>
  )
}





// const MatchCard: React.FC<RecentMatchData> = ({ playerName, id, result, duration, red, blue }) => {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded)
//   }
//   const match = { id, result, duration, red, blue }
//   const teams = match.blue.concat(match.red)
//   const player = teams.find(player => player.name === playerName)

//   return (
//     <div>
//       <Card className="bg-zinc-700 border-0 cursor-pointer transition-all duration-75 ease-linear hover:bg-neutral-800 hover:border-neutral-700 hover:border-2"
//         onClick={toggleExpand}>
//         <CardContent className="flex items-center p-4">
//           {player && (
//             <Avatar className="h-16 w-16 mr-4">
//               <AvatarImage src={player.champion} alt={player.champion}/>
//               {/* <AvatarFallback>{player.champion}</AvatarFallback> */}
//             </Avatar>
//           )}
//           <div className="flex gap-8 items-center">
//             <div className="flex-3">
//               <p className={`font-medium text-lg ${result === "Victory" ? "text-green-500" : "text-red-500"}`}>
//                 {result}
//               </p>
//               <p className="text-gray-400">{duration}</p>
//             </div>
//             {player && (
//               <div className="flex-3 mt-1">
//                 <p className="font-medium text-m">{player.kills}/{player.deaths}/{player.assists}</p>
//                 <p className="text-gray-400 text-sm">{player.kills + player.assists/player.deaths}</p>
//               </div>
//             )}
//             {/* {runes && (
//               <div className="flex-3">
//                 <div className="flex gap-2">
//                   {runes.map((rune, index) => (
//                     <img key={index} src={rune} className="h-8 w-8" />
//                   ))}
//                 </div>
//               </div>
//             )} */}
//           </div>
//           <div className="ml-auto">
//             {isExpanded ? (<ChevronUp className="h-6 w-6 text-gray-400" />) : (<ChevronDown className="h-6 w-6 text-gray-400" />)}
//           </div>
//         </CardContent>
//       </Card>
//       {isExpanded && <MatchDetails match={match} />}
//     </div>
//   )
// }