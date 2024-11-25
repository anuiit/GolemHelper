import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import useFetchData from "@/hooks/useFetchData"
import { Badge } from "../ui/badge"
import { StatLabel, StatRoot, StatValueText } from "@/components/ui-chakra/stat"

export default function MostPlayedChampions({ searchQuery }) {
  const [selectedTab, setSelectedTab] = React.useState("top");
  const { data, loading } = useFetchData("mostPlayedChampions", searchQuery, ['playerMatchHistory']);
  console.log("mostPlayedChampions: ", data);

// ajouter un loading circle au milieu des cards
  if (loading || !data) {
    return (
      <div>
        <div className="flex flex-row justify-between items-center mb-4 pt-4">
          <div className='grid justify-start items-center grow'>
            <h1 className="text-vulcan-200">Main Champions</h1>
          </div>
        </div>

        <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />
        <div className="flex space-x-4">
          <Card className="relative grow h-96 bg-vulcan-900" ></Card>
          <Card className="relative grow h-96 bg-vulcan-900" ></Card>
          <Card className="relative grow h-96 bg-vulcan-900" ></Card>
        </div>

        
      </div>)
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className='grid justify-start items-center grow'>
          <h1 className="text-vulcan-200">Main Champions</h1>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />
      
      <div className="flex space-x-4 justify-evenly justify-between">
        {data?.map((champion, index) => (
          <Card
            key={index}
            className="relative h-96 w-1/3 bg-vulcan-900 card-background"
            style={{ backgroundImage: `url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${(champion.name).toLowerCase()}/skins/base/images/${(champion.name).toLowerCase()}_splash_centered_0.jpg)` }}
          >
            <CardHeader className=" flex order-1 w-auto">
              <Badge className="flex items-center w-20 justify-center bg-vulcan-950/40 shadow-lg py-1">
                <CardTitle className="text-white justify-center font-thin">{champion.name}</CardTitle>
              </Badge>
            </CardHeader>

            <CardContent className="absolute z-10 mt-16">
            <div className="grid grid-rows-4 gap-2 mt-4">
              {/* Played */}
              <div>
                <div className="text-sm font-extralight text-vulcan-500">Played</div>
                <div className="text-xl font-medium text-vulcan-200">{champion.games}</div>
              </div>

              <div>
                <div className="text-sm font-extralight text-vulcan-500">Winrate</div>
                <div className="text-xl font-medium text-vulcan-200">{champion.winrate} %</div>
              </div>

              <div>
                <div className="text-sm font-extralight text-vulcan-500">Av. CsMin</div>
                <div className="text-xl font-medium text-vulcan-200">{champion.average_csmin}</div>
              </div>

              <div>
                <div className="text-sm font-extralight text-vulcan-500">Av. Kda</div>
                <div className="text-xl font-medium text-vulcan-200">{champion.average_kda}</div>
              </div>

            </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}