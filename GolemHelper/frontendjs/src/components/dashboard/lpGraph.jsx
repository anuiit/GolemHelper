"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data based on the snippet
const lpData = [
  { date: "2024-09-30T18:06:49.000Z", lp: 62, division: "PLATINUM II" },
  { date: "2024-09-30T19:37:04.000Z", lp: 91, division: "PLATINUM II" },
  { date: "2024-09-30T20:17:56.000Z", lp: 21, division: "PLATINUM I" },
  { date: "2024-09-30T21:12:10.000Z", lp: 50, division: "PLATINUM I" },
  { date: "2024-09-30T22:58:37.000Z", lp: 6, division: "EMERALD IV" },
  { date: "2024-10-03T21:08:21.000Z", lp: 26, division: "EMERALD IV" },
  { date: "2024-10-03T22:58:24.000Z", lp: 46, division: "EMERALD IV" },
  { date: "2024-10-04T17:00:05.000Z", lp: 48, division: "EMERALD IV" },
  { date: "2024-10-08T17:45:02.000Z", lp: 68, division: "EMERALD IV" },
  { date: "2024-10-08T20:13:26.000Z", lp: 88, division: "EMERALD IV" },
  { date: "2024-10-09T19:55:10.000Z", lp: 70, division: "EMERALD IV" },
  { date: "2024-10-10T19:22:47.000Z", lp: 48, division: "EMERALD IV" },
  { date: "2024-10-10T23:26:59.000Z", lp: 25, division: "EMERALD IV" },
  { date: "2024-10-16T21:27:30.000Z", lp: 45, division: "EMERALD IV" },
  { date: "2024-10-17T19:34:57.000Z", lp: 68, division: "EMERALD IV" },
]

export default function LPGraph() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded p-2 shadow-lg">
          <p className="font-bold text-primary">{data.division}</p>
          <p className="text-sm text-muted-foreground">{data.lp} LP</p>
          <p className="text-xs text-muted-foreground">
            {new Date(data.date).toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>LP Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            lp: {
              label: "LP",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[120px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lpData}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              onMouseMove={(e) => {
                if (e.activeTooltipIndex !== undefined) {
                  setActiveIndex(e.activeTooltipIndex)
                }
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                hide
              />
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="lp"
                stroke="var(--color-lp)"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, index } = props
                  const isActive = index === activeIndex
                  const fill = lpData[index].division.includes("EMERALD")
                    ? "rgb(81, 152, 71)"
                    : "rgb(28, 145, 182)"
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 6 : 4}
                      fill={fill}
                      stroke={isActive ? "var(--color-lp)" : "none"}
                      strokeWidth={2}
                    />
                  )
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}