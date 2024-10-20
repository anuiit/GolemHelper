// src/components/RecentMatches/MatchCard.tsx

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Apple, ChevronDown, ChevronUp } from 'lucide-react'
import { Match } from '@/types'

interface MatchCardProps {
  match: Match
  isExpanded: boolean
  toggleExpand: () => void
}

const MatchCard: React.FC<MatchCardProps> = ({ match, isExpanded, toggleExpand }) => {
  return (
    <Card
      className="bg-new-color-3 border-gray-600 cursor-pointer transition-colors hover:bg-gray-600"
      onClick={toggleExpand}
    >
      <CardContent className="flex items-center p-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage
            src={`/placeholder.svg?height=64&width=64&text=${match.blue[0].champion}`}
            alt={match.blue[0].champion}
          />
          <AvatarFallback>{match.blue[0].champion}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p
            className={`font-medium text-lg ${
              match.result === "Victory" ? "text-green-400" : "text-red-400"
            }`}
          >
            {match.result}
          </p>


        </div>
        <div className="ml-auto">
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-gray-400" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-400" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchCard
