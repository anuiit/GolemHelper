import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext } from "react"
import { PlayerDataContext } from "@/context/playerDataContext"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function MostPlayedChampions() {
  const context = useContext(PlayerDataContext);
  const playerData = context?.playerData;

  if (!playerData) {
    return <div>Loading...</div>;
  }
  console.log("playerDatastatscard: ", playerData);
  const champions = playerData?.mostPlayedChampions;

  if (!champions) {
    return <div>No stats available</div>;
  }
  console.log("champions: ", champions);
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-gray-100">Most Played Champions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {champions.map((champion, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Avatar className="w-14 h-14 cursor-pointer border-2">
                  <AvatarImage src={champion.profileImage} alt={champion.name} />
                  <AvatarFallback>{champion.name}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-900 border-0 text-gray-100">
                <h3 className="font-semibold mb-2">{champion.name}</h3>
                {/* <p>Games Played: {champion.games}</p>
                <p>Win Rate: {champion.winRate}%</p> */}
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}