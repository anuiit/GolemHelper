import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, ReferenceLine, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCallback, useMemo, useRef, useState } from 'react';
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const RenderLegend = (props) => {
    const { payload } = props;
  
    return (
        <div className="relative bottom-56">
            <div className="flex justify-center items-center ">
                <ul className="flex flex-wrap gap-2">
                    {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center gap-1">
                        <div
                        style={{ backgroundColor: entry.color }}
                        className="w-2 h-2 rounded-full"
                        />
                        <span className="text-sm font-light text-muted-foreground">{entry.value}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Memoized Custom Tooltip Component
const CustomTooltip = React.memo(({ active, payload, coordinate }) => {
  if (!active || !payload?.length) return null;

  const { x, y } = coordinate; // Recharts provides the coordinates

  const tooltipData = payload[0].payload;
  return (
    <div 
      className="flex flex-col bg-background rounded w-28 px-2 py-2 shadow-lg absolute pointer-events-none"
      style={{ left: x + 10, top: y - 30 }} // Adjust positioning as needed
    >
      <p className="text-xs text-[#761a68]">{tooltipData.winrate}% wr</p>
      <p className="text-xs text-[#b3b5be]">{tooltipData.csmin} cs/min</p>
      <p className="text-xs text-[#5c48e0]">{tooltipData.kda} kda</p>
      <p className="text-xs text-[#5e89a9]">{tooltipData.vision} vision</p>
      <p className="text-xs">{tooltipData.played} played</p>
      <p className="text-xs">{tooltipData.date}</p>
    </div>
  );
});

export const PlayerChart = React.memo(function PlayerChart({ searchQuery }) {
  console.log("PlayerChart mounted with searchQuery:", searchQuery);
  const { data, loading } = useFetchData("playerChart", searchQuery, ['playerMatchHistory']);
  const tooltipRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle Mouse Move
  const handleMouseMove = (e) => {
    if (e.isTooltipActive && e.activeTooltipIndex !== activeIndex) {
      const { chartX, chartY } = e;
      tooltipRef.current = { x: chartX + 50, y: chartY };
      setActiveIndex(e.activeTooltipIndex);
    } else if (!e.isTooltipActive && activeIndex !== null) {
      setActiveIndex(null);
    }
  };

   // Handle Mouse Leave
   const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Player Chart</CardTitle>
      </CardHeader>

      <div className="flex w-full justify-center items-center mt-4">
        {data&& <ResponsiveContainer className={"grid w-full h-full items-center justify-center"}
        width='100%' height={220}>
            <ComposedChart  
                data={data} 
                width={600}
                height={220}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                className={"w-full h-full grow" }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                >

                <XAxis 
                  dataKey='date'
                  hide={true} />
                
                <YAxis yAxisId="left" domain={[30, 100]} ticks={[50, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 15]} />  
                <Tooltip
                  content={CustomTooltip}
                  cursor={{ stroke: '#565873', strokeWidth: 1 }}
                  isAnimationActive={false}
                  
                />
                <Legend content={RenderLegend}/>
                
                <defs>

                </defs>
                <Area activeDot={{ r: 4, fill: '#1f1f26', stroke: '#761a68', strokeWidth: 2 }} yAxisId="left" type="monotone" dataKey="winrate" stroke="#761a68" fill="#261824" />
                
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="kda" stroke="#5c48e0" />
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="csmin" stroke="#b3b5c6" />
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="vision" stroke="#5e89a9" />
                <ReferenceLine yAxisId="left" y={50} stroke="#565873" strokeWidth={2} strokeDasharray="5 10"/>
            </ComposedChart >
        </ResponsiveContainer>
        }
      </div>
    </Card>
  );
});

export const PlayerChartSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h2 className="text-vulcan-200 font-extralight">Player Chart</h2>
      </CardHeader>
      <CardContent className="space-y-2 justify-center">
        <Skeleton className="h-48 w-full bg-vulcan-800" />
      </CardContent>
    </Card>
  );
}


export default PlayerChart;