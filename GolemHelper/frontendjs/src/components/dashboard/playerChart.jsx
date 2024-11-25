import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LineChart, Line, AreaChart, ReferenceLine, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCallback, useMemo, useRef, useState } from 'react';
import useFetchData from "@/hooks/useFetchData";


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
                        <span className="text-sm font-thin text-muted-foreground">{entry.value}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        

    );
}

export default function PlayerChart({ searchQuery }) {
  const { data, loading } = useFetchData("playerChart", searchQuery, ['playerMatchHistory']);
  const tooltipRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);

  // Memoize tooltip component
  const CustomTooltip = useCallback(({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    return (
      <div 
        className="flex flex-col bg-background rounded w-28 px-2 py-2 shadow-lg absolute"
        style={{ left: tooltipRef.current.x, top: tooltipRef.current.y }}
      >
        <p className="text-xs font-extralight text-[#761a68]">{data.winrate}% wr</p>
        <p className="text-xs font-extralight text-[#b3b5be]">{data.csmin} cs/min</p>
        <p className="text-xs font-extralight text-[#5c48e0]">{data.kda} kda</p>
        <p className="text-xs font-extralight text-[#5e89a9]">{data.vision} vision</p>
        <p className="text-xs font-extralight">{data.played} played</p>
        <p className="text-xs font-extralight">{data.date}</p>
      </div>
    );
  }, []);

  // Memoize event handlers
  const handleMouseMove = useCallback((e) => {
    if (e.isTooltipActive) {
      const { chartX, chartY } = e;
      tooltipRef.current = { x: chartX + 50, y: chartY };
      setActiveIndex(e.activeTooltipIndex);
    } else {
      setActiveIndex(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  if (loading || !data) {
    return (
      <Card className="h-full">
        <CardHeader>
          <h2 className="text-vulcan-200 font-extralight">Player Chart</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="animate-pulse h-[220px] bg-vulcan-800 rounded" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <h2 className="text-vulcan-200 font-extralight">Player Chart</h2>
      </CardHeader>
      <div className="flex w-full justify-center items-center ">
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
}