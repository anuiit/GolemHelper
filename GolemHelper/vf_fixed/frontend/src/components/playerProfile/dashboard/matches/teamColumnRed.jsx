import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card'

function TeamColumnRed({ className, teamName, teamData }) {
    console.log("teamName:", teamData);
    return (
        <div className={`${className} flex flex-col space-y-4`}>
            <h2 className="flex flex-col items-end text-md font-normal text-gray-100">{teamName}</h2>
            <div className='flex flex-col space-y-4'>
                {teamData?.participants.map((player) => {
                    console.log("Player:", player);
                    return (
                        <div key={player.name} className="flex items-center space-x-4 border-0">
                            <div className='flex gap-1'>
                                <div className="grid grid-cols-3 gap-1 pr-2">
                                    {player && Object.values(player.items).map((item, index) => (
                                        item.name === null ? (
                                            <div key={index} className={`static h-5 w-5 rounded-md border-0 bg-vulcan-800`} />
                                        ) : (
                                            <img key={index} src={item.icon} alt={item.name} title={item.name} className="h-5 w-5 rounded-md border-0" />
                                        )
                                    ))}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <img src={player?.primaryStyle[0][1]} className="h-5 w-5" title={player?.primaryStyle[0]} />
                                    <img src={player?.secondaryStyle[0][1]} className="h-5 w-5" title={player?.secondaryStyle[0]} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <img src={player?.summoner1} className="h-5 w-5 rounded-sm" title={player?.summoner1} />
                                    <img src={player?.summoner2} className="h-5 w-5 rounded-sm" title={player?.summoner2} />
                                </div>
                            </div>
                            <div className='flex grow items-end flex-row-reverse'>
                                <img src={`/champions-square/${player.championName}_square.jpg`} className='w-8 h-8' />
                                <div className='flex flex-col items-end pr-2'>
                                    <p className="text-xs font-normal leading-none text-vulcan-200 truncate">{player.gameName}</p>
                                    <p className="text-xs text-vulcan-400">{player.championName}</p>
                                </div>
                            </div>
                        </div>
                    )}
                )}
            </div>
        </div>

    )
  }
  
  export default TeamColumnRed