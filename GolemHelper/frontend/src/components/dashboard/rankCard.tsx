import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RankCardProps {
  rank: string
  lp: number
}

export default function RankCard({ rank, lp }: RankCardProps) {
  return (
    <Card className="bg-new-color-2 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Rank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {rank}
          </Badge>
          <span className="text-gray-100">{lp} LP</span>
        </div>
        <Progress value={(lp / 2000) * 100} className="h-2" />
      </CardContent>
    </Card>
  )
}