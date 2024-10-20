// src/components/RecentMatches/RecentMatches.tsx

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecentMatchCard from './recentMatchCard'
import { RecentMatchesProps } from '@/types' // Importing types

const RecentMatches: React.FC<RecentMatchesProps> = ({ matches }) => {
  return (
    <Card className="bg-new-color-2 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Recent Matches</CardTitle>
        <CardDescription>Click on a match for more details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <RecentMatchCard key={match.id} match={match} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentMatches
