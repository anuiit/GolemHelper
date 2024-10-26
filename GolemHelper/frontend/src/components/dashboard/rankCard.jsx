import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useContext } from "react"
import { PlayerDataContext } from "@/context/playerDataContext"

export default function RankCard() {
  const playerData = useContext(PlayerDataContext);

  if (!playerData) {
    return <div>Loading...</div>;
  }
  const competitive = playerData?.competitive;

  if (!competitive) {
    return <div>No stats available</div>;
  }
  console.log("competitive: ", competitive);
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-gray-100">Rank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {competitive.rank}
          </Badge>
          <span className="text-gray-100">{competitive.lp} LP</span>
        </div>
        <Progress value={(competitive.lp / 100) * 100} className="bg-white text-white" />
      </CardContent>
    </Card>
  )
}