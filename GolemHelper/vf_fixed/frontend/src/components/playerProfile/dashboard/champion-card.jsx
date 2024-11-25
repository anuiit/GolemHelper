// src/components/Champions/ChampionCard.jsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

const ChampionCard = ({ champion }) => {
    const imgRef = useRef(null);
    const imagePath = `/champions-splash/${champion.name}_splash_centered.jpg`;

    console.log("ChampionCard mounted with champion:", champion);
    console.log("imagePath:", imagePath);

  return (
    <Card
      className="relative h-96 w-1/3 bg-vulcan-900 card-background"
      style={{
        backgroundImage: `url(${imagePath})`,
      }}
    >
      <CardHeader className="flex order-1 w-auto">
        <Badge className="flex items-center w-20 justify-center bg-vulcan-950/40 shadow-lg py-1">
          <CardTitle className="text-white justify-center">
            {champion.name}
          </CardTitle>
        </Badge>
      </CardHeader>

      <CardContent className="absolute z-10 mt-16">
        <div className="grid grid-rows-4 gap-2 mt-4">
          {/* Played */}
          <div>
            <div className="text-sm text-vulcan-500">Played</div>
            <div className="text-xl font-semibold text-vulcan-200 text-glow">
              {champion.games}
            </div>
          </div>

          {/* Winrate */}
          <div>
            <div className="text-sm text-vulcan-500">Winrate</div>
            <div className="text-xl font-semibold text-vulcan-200 text-glow">
              {champion.winrate}%
            </div>
          </div>

          {/* Average CS/min */}
          <div>
            <div className="text-sm text-vulcan-500">
              Av. CsMin
            </div>
            <div className="text-xl font-semibold text-vulcan-200 text-glow">
              {champion.average_csmin}
            </div>
          </div>

          {/* Average KDA */}
          <div>
            <div className="text-sm text-vulcan-500">Av. Kda</div>
            <div className="text-xl font-semibold text-vulcan-200 text-glow">
              {champion.average_kda}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChampionCard;