import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const lpData = [
  { date: "2024-09-01", lp: 20, division: "PLATINUM IV" },
  { date: "2024-09-03", lp: 40, division: "PLATINUM IV" },
  { date: "2024-09-05", lp: 30, division: "PLATINUM IV" }, // loss
  { date: "2024-09-07", lp: 55, division: "PLATINUM IV" },
  { date: "2024-09-10", lp: 75, division: "PLATINUM IV" },
  { date: "2024-09-12", lp: 15, division: "PLATINUM III" }, // promotion with LP reset
  { date: "2024-09-15", lp: 35, division: "PLATINUM III" },
  { date: "2024-09-18", lp: 50, division: "PLATINUM III" },
  { date: "2024-09-20", lp: 45, division: "PLATINUM III" }, // minor setback
  { date: "2024-09-22", lp: 70, division: "PLATINUM III" },
  { date: "2024-09-25", lp: 85, division: "PLATINUM III" },
  { date: "2024-09-28", lp: 10, division: "PLATINUM II" }, // promotion
  { date: "2024-10-01", lp: 25, division: "PLATINUM II" },
  { date: "2024-10-03", lp: 5, division: "PLATINUM II" }, // loss
  { date: "2024-10-05", lp: 35, division: "PLATINUM II" },
  { date: "2024-10-07", lp: 65, division: "PLATINUM II" },
  { date: "2024-10-10", lp: 90, division: "PLATINUM II" },

]

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

// Divisions in order
const divisionsInOrder = [
  "IRON IV", "IRON III", "IRON II", "IRON I",
  "BRONZE IV", "BRONZE III", "BRONZE II", "BRONZE I",
  "SILVER IV", "SILVER III", "SILVER II", "SILVER I",
  "GOLD IV", "GOLD III", "GOLD II", "GOLD I",
  "PLATINUM IV", "PLATINUM III", "PLATINUM II", "PLATINUM I",
  "EMERALD IV", "EMERALD III", "EMERALD II", "EMERALD I",
  "DIAMOND IV", "DIAMOND III", "DIAMOND II", "DIAMOND I",
  "MASTER I", "GRANDMASTER", "CHALLENGER"
];



export default function LPGraph() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  console.log("activeIndex: ", activeIndex)

  const handleMouseMove = (e) => {
    if (e.isTooltipActive) {
      const { chartX, chartY } = e
      setTooltipPosition({ x: chartX-50, y: chartY - 100 }) // Adjust the y value to position the tooltip above the point
      setActiveIndex(e.activeTooltipIndex)
    } else {
      setActiveIndex(null)
    }
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="flex flex-col bg-background rounded p-2 w-28 shadow-lg absolute"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          <p className="font-bold text-sm text-primary">{data.division}</p>
          <p className="text-xs text-muted-foreground">{data.lp} LP</p>
          <p className="text-xs text-muted-foreground">
        {new Date(data.date).toLocaleDateString('en-GB')}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-28 rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          className="grow"
          data={lpData} 
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIndex(null)}
          >
                          <CartesianGrid  
            verticalPoints={[25, 50, 75, 100, 125, 150, 175]}
            horizontalPoints={[20, 40, 60, 80]}
            strokeDasharray="3 5"
            opacity={0.15}
            />
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="30%" stopColor="#6584FF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <XAxis hide={true} />
          <YAxis hide={true} />

          
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            isAnimationActive={false}
            position={{ x: tooltipPosition.x, y: tooltipPosition.y}}
          />
          <Line
            type="monotone"
            dataKey="lp"
            stroke="url(#colorUv)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#6584FF" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}