import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useContext } from "react"
import { PlayerDataContext } from "@/context/playerDataContext"


export default function StatsCard() {
  const playerData = useContext(PlayerDataContext);

  if (!playerData) {
    return <div>Loading...</div>;
  }
  const stats = playerData?.stats;

  if (!stats) {
    return <div>No stats available</div>;
  }

  console.log("stats: ", stats);
  return (
    <Card className="border-0 text-white">
      <CardHeader>
        <CardTitle className="text-gray-100">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Win Rate</span>
          <span className="font-bold text-gray-100">{stats.winRate}%</span>
        </div>
        <Progress value={stats.winRate} className="h-2 bg-white text-white" />
        <div className="flex justify-between">
          <span>KDA</span>
          {/* <span className="font-bold text-gray-100">{stats.kdaRatio}</span> */}
        </div>
        <div className="flex justify-between">
          <span>CS/min</span>
          {/* <span className="font-bold text-gray-100">{stats.csmin}</span> */}
        </div>
        <div className="flex justify-between">
          <span>Vision Score/min</span>
          {/* <span className="font-bold text-gray-100">{stats.visionScore}</span> */}
        </div>
      </CardContent>
    </Card>
  )
}