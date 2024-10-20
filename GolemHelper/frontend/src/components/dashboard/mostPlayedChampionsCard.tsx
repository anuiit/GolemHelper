import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Champion {
  name: string
  games: number
  winRate: number
}

interface MostPlayedChampionsProps {
  champions: Champion[]
}

export default function MostPlayedChampions({ champions }: MostPlayedChampionsProps) {
  return (
    <Card className="bg-new-color-2 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Most Played Champions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {champions.map((champion, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Avatar className="w-12 h-12 cursor-pointer">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${champion.name[0]}`} alt={champion.name} />
                  <AvatarFallback>{champion.name[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-gray-800 border-gray-700 text-gray-100">
                <h3 className="font-semibold mb-2">{champion.name}</h3>
                <p>Games Played: {champion.games}</p>
                <p>Win Rate: {champion.winRate}%</p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}