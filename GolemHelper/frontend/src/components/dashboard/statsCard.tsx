import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ClassDictionary } from "clsx"


export default function StatsCard({ stats }: ClassDictionary) {
  return (
    <Card className="bg-new-color-2 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-100">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Win Rate</span>
          <span className="font-bold text-gray-100">{stats.winRate}%</span>
        </div>
        <Progress value={stats.winRate} className="h-2" />
        <div className="flex justify-between">
          <span>KDA</span>
          <span className="font-bold text-gray-100">{stats.kdaRatio}</span>
        </div>
        <div className="flex justify-between">
          <span>CS/min</span>
          <span className="font-bold text-gray-100">{stats.csmin}</span>
        </div>
        <div className="flex justify-between">
          <span>Vision Score/min</span>
          <span className="font-bold text-gray-100">{stats.visionScore}</span>
        </div>
      </CardContent>
    </Card>
  )
}