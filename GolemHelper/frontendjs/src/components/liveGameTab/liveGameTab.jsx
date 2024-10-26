'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import MatchPrediction from "./matchPrediction"

export default function LiveGame({ players }) {
  const [isLoading, setIsLoading] = useState(true)
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setPrediction(null)
    // Simulate API call for prediction
    const timer = setTimeout(() => {
      setIsLoading(false)
      setPrediction({
        winner: Math.random() > 0.5 ? "Blue Team" : "Red Team",
        confidence: Math.random() * 30 + 70, // Random confidence between 70% and 100%
      })
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-gray-100">Live Game</CardTitle>
        <CardDescription>Current match in progress</CardDescription>
      </CardHeader>
      <CardContent>
        <MatchPrediction isLoading={isLoading} prediction={prediction} />
        <div className="grid gap-4 md:grid-cols-2">
          {players.map((player, index) => (
            <Card key={index} className="flex items-center p-4 space-x-4 bg-zinc-900 border-0 ">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${player.champion}`} alt={player.champion} />
                <AvatarFallback>{player.champion[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-100">{player.name}</p>
                <p className="text-sm text-gray-400">{player.champion}</p>
              </div>
              <Badge variant="secondary">{player.rank}</Badge>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}