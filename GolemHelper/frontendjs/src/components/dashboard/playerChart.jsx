import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LineChart, Line, AreaChart, ReferenceLine, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Sample data
const data = [
  { date: "2024-09-01", winRate: 38, kda: 3.5, csMin: 7.8, visionScore: 1.2 },
  { date: "2024-09-02", winRate: 60, kda: 3.8, csMin: 8.0, visionScore: 1.3 },
  { date: "2024-09-03", winRate: 50, kda: 3.2, csMin: 7.5, visionScore: 1.1 },
  { date: "2024-09-04", winRate: 62, kda: 4.0, csMin: 8.2, visionScore: 1.4 },
  { date: "2024-09-05", winRate: 59, kda: 3.6, csMin: 7.9, visionScore: 1.2 },
  { date: "2024-09-06", winRate: 32, kda: 3.9, csMin: 8.1, visionScore: 1.3 },
  { date: "2024-09-07", winRate: 49, kda: 3.4, csMin: 7.6, visionScore: 1.1 },
];

const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.winRate));
    const dataMin = Math.min(...data.map((i) => i.winRate));
  
    if (dataMax <= 50) {
      return 0;
    }
    if (dataMin >= 50) {
      return 1;
    }
  
    return (50 - dataMin) / (dataMax - dataMin);
};
  
const off = gradientOffset();

export const RenderLegend = (props) => {
    const { payload } = props;
  
    return (
        <div className="relative bottom-52">
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

export default function PlayerChart() {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(null)

  const handleMouseMove = (e) => {
    if (e.isTooltipActive) {
      const { chartX, chartY } = e
      setTooltipPosition({ x: chartX+50, y: chartY }) // Adjust the y value to position the tooltip above the point
      setActiveIndex(e.activeTooltipIndex)
    } else {
      setActiveIndex(null)
    }
  }
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="flex flex-col bg-background rounded px-3 py-2 shadow-lg absolute"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          

          <p className="text-xs font-extralight text-muted-foreground text-[#3b3a52]">{data.winRate}% wr</p>
          <p className="text-xs font-extralight text-muted-foreground text-[#b3b5be]">{data.csMin} cs/min</p>
          <p className="text-xs font-extralight text-muted-foreground text-[#5c48e0]">{data.kda} kda</p>
          <p className="text-xs font-extralight text-muted-foreground text-[#5e89a9]">{data.visionScore} vision</p>
          <p className="text-xs font-extralight text-muted-foreground">
        {new Date(data.date).toLocaleDateString('en-GB')}
          </p>
        </div>
      )
    }
    return null
  }
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <h2 className="text-vulcan-200 font-extralight">Player Chart</h2>
      </CardHeader>
      <div className="flex w-full justify-center items-center ">
        <ResponsiveContainer className={"grid w-full h-full items-center justify-center"}
        width='100%' height={220}>
            <ComposedChart  
                data={data} 
                width={600}
                height={220}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                className={"w-full h-full grow" }
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setActiveIndex(null)}
                >

                <XAxis hide={true} />
                
                <YAxis yAxisId="left" domain={[30, 100]} ticks={[50, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 15]} />  
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: '#565873', strokeWidth: 1 }}
                  isAnimationActive={false}
                  position={{ x: tooltipPosition.x, y: tooltipPosition.y}}
                />
                <Legend content={RenderLegend}/>
                
                <defs>

                </defs>
                <Area activeDot={{ r: 4, fill: '#1f1f26', stroke: '#3e3a52', strokeWidth: 2 }} yAxisId="left" type="monotone" dataKey="winRate" stroke="#3e3a52" fill="#1f1f26" />
                
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="kda" stroke="#5c48e0" />
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="csMin" stroke="#b3b5c6" />
                <Line dot={false} activeDot={false} yAxisId="right" type="monotone" dataKey="visionScore" stroke="#5e89a9" />
                <ReferenceLine yAxisId="left" y={50} stroke="#565873" strokeWidth={2} strokeDasharray="5 10"/>
            </ComposedChart >
        </ResponsiveContainer>
      </div>
    </Card>
  );
}