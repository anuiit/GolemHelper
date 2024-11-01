import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import useFetchData from "@/hooks/useFetchData"
import { Badge } from "../ui/badge"

export default function MostPlayedChampions({ searchQuery }) {
  const [selectedTab, setSelectedTab] = React.useState("top");
  const { data, loading } = useFetchData("mostPlayedChampions", searchQuery);
  console.log("mostPlayedChampions: ", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className='grid justify-start items-center grow'>
          <h1 className="text-vulcan-200">Main Champions</h1>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />
      
      <div className="flex space-x-4">
        {data.map((champion, index) => (
          <Card
            key={index}
            className="relative grow h-96 bg-vulcan-900 card-background"
            
            style={{ backgroundImage: `url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${(champion.name).toLowerCase()}/skins/base/images/${(champion.name).toLowerCase()}_splash_centered_0.jpg)` }}
          >

            <CardHeader className="w-auto">
              <Badge className="flex items-center w-20 justify-center bg-vulcan-950/40 shadow-lg py-1">
                <CardTitle className="text-white justify-center font-thin">{champion.name}</CardTitle>
              </Badge>
            </CardHeader>

            <CardContent className="relative z-10">
              <div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}