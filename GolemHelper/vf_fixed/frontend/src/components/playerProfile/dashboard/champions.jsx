import React from "react";
import ChampionCard from "./champion-card";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"

const Champions = ({ searchQuery }) => {
  const { data, loading, error } = useFetchData(
    "mostPlayedChampions",
    searchQuery,
    ["playerMatchHistory"]
  );

  console.log("mostPlayedChampions: ", data);


  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className="grid justify-start items-center grow">
          <h1 className="text-vulcan-200">Main Champions</h1>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />

      <div className="flex space-x-4 justify-evenly justify-between">
        {data && data.length > 0 ? (
          data.map((champion) => (
            <ChampionCard key={champion.name} champion={champion} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-96 bg-vulcan-900">
            <p className="text-vulcan-400">No champions data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Champions;


export function ChampionsSkeleton() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className="grid justify-start items-center grow">
          <h1 className="text-vulcan-200">Main Champions</h1>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-4 bg-vulcan-600" />

      <div className="flex h-80 space-x-4 justify-evenly justify-between">
        <Card className="w-1/3">
          <CardContent className="h-full flex justify-center items-center">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardContent className="h-full flex justify-center items-center">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardContent className="h-full flex justify-center items-center">
            <ProgressCircleRoot value={null} size="sm">
              <ProgressCircleRing cap="round" color={"#3e3a52"} />
            </ProgressCircleRoot>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}