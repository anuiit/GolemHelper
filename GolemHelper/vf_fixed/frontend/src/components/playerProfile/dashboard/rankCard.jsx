import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import useFetchData from "@/hooks/useFetchData"
import LPGraph from "./lpGraph"
import { Separator } from "@/components/ui/separator";
import { ProgressCircleRoot, ProgressCircleRing } from "@/components/ui/progress-circle";
import { Skeleton } from "@/components/ui/skeleton";

// Map divisions to colors
const divisionColors = {
  "IRON": {
    color: "#6e6e6e",
    classn: 'top-0 w-16'
  },
  "BRONZE": {
    color: "#cd7f32",
    classn: 'top-0 w-16'
  },
  "SILVER": {
    color: "#c0c0c0",
    classn: 'top-0 w-16'
  },
  "GOLD": {
    color: "#ffd700",
    classn: 'top-1 w-14'
  },
  "PLATINUM": {
    color: "#21758C",
    classn: 'top-2 w-14'
  },
  "EMERALD": {
    color: "#50C878",
    classn: 'top-2 w-14'
  },
  "DIAMOND": {
    color: "#355EC2",
    classn: 'top-1 w-12'
  },
  "MASTER": {
    color: "#9F1FC2",
    classn: 'top-2 w-12'
  },
  "GRANDMASTER": {
    color: "#ff0000",
    classn: 'top-2 w-12'
  },
  "CHALLENGER": {
    color: "#d7d8e0",
    classn: 'top-3 w-12'
  }
};

export default function RankCard({ searchQuery }) {
  const { data, loading } = useFetchData("statsData", searchQuery);

  const rankColor = data?.tier ? divisionColors[data.tier.toUpperCase()].color : 'gray';
  const rankClass = data?.tier ? divisionColors[data.tier.toUpperCase()].classn : 'top-0 w-16';
  console.log("rankClass: ", rankClass);
  const rankImage = data?.tier
    ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${data.tier.toLowerCase()}.png`
    : '';

  if (loading || !data) {
    return <RankCardSkeleton />;
  }

  if (data?.lp > 100) {
    data.lp = 100;
  }

  console.log("stats: ", data);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Rank</CardTitle>
          <CardDescription className="font-medium text-vulcan-500">Solo/Duo</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex">

        <ProgressCircleRoot size="xl" value={data.lp}   >
          <ProgressCircleRing cap="round" color={rankColor} css={{ "--thickness": '2px' }}/>
          <img src={rankImage} alt="profile icon" className={`absolute inset-0 m-auto shadow-lg ${rankClass}`} />
        </ProgressCircleRoot>

        <div className="grid grid-rows-2 ml-4">
          <p className="text-sm font-medium" style={{ color: rankColor }}>{data.tier} {data.rank}</p>
          <p className="text-xs">{data.lp} LPs - 28W/17L</p>
        </div>
          
      </CardContent>
      <div>
        <Separator orientation="horizontal" className="bg-vulcan-600 w-full" />
      </div>
      
      <CardContent className="bg-vulcan-875 pt-4 rounded-b-xl">
        <LPGraph />
      </CardContent>
    </Card>
  )
}

export function RankCardSkeleton() {
  return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Rank</CardTitle>
            <CardDescription className="font-medium text-vulcan-500">Solo/Duo</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center">
            <Skeleton className="w-16 h-16 rounded-full mr-4 bg-vulcan-800"></Skeleton>
            <div className="grid grid-rows-2 gap-y-2">
              <Skeleton className="w-20 h-4 bg-vulcan-800"></Skeleton>
              <Skeleton className="w-16 h-3 bg-vulcan-800"></Skeleton>
            </div>
          </div>
        </CardContent>

        <Separator orientation="horizontal" className="bg-vulcan-600 w-full" />

        <CardContent className="bg-vulcan-875 pt-4 rounded-b-xl">
          <Skeleton className="h-28 bg-vulcan-800"></Skeleton>
        </CardContent>
      </Card>
  )
}