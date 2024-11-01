import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import useFetchData from "@/hooks/useFetchData"
import LPGraph from "./lpGraph"
import { Separator } from "@/components/ui/separator";
import { ProgressCircleRoot, ProgressCircleRing } from "@/components/ui-chakra/progress-circle";

// Map divisions to colors
const divisionColors = {
  "IRON": "#6e6e6e",       // Gray
  "BRONZE": "#cd7f32",     // Bronze
  "SILVER": "#c0c0c0",     // Silver
  "GOLD": "#ffd700",       // Gold
  "PLATINUM": "#00bfff",   // Light Blue
  "EMERALD": "#50C878",    // Emerald Green
  "DIAMOND": "#b9f2ff",    // Diamond Blue
  "MASTER": "#ff1493",     // Deep Pink
  "GRANDMASTER": "#ff0000",// Red
  "CHALLENGER": "#00ff00"  // Green
};

export default function RankCard({ searchQuery }) {
  const { data, loading } = useFetchData("statsData", searchQuery);
  console.log("playerHeader: ", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  const rankColor = divisionColors[data.tier.toUpperCase()];
  const rankImage = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${(data?.tier).toLowerCase()}.png`;

  console.log("stats: ", data);
  return (
    <Card className="text-white">
      <CardHeader>
        <CardTitle className="text-gray-100">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 flex">

        <ProgressCircleRoot size="xl" value={30} colorPalette={rankColor}>
          <ProgressCircleRing cap="round" css={{ "--thickness": "2px" }}/>
          <img src={rankImage} alt="profile icon" className="absolute inset-0 w-14 h-14 m-auto" />
        </ProgressCircleRoot>

        <div className="grid grid-rows-2 ml-4">
          <p className="font-extralight text-sm">{data.tier} {data.rank}</p>
          <p className="text-xs font-thin">{data.lp} LPs - 28W/17L</p>
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