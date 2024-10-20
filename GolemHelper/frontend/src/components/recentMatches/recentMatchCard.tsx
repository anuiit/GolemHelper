// src/components/RecentMatches/RecentMatchCard.tsx

import React, { useState } from 'react'
import MatchCard from './matchCard'
import MatchDetails from './matchDetails'
import { Match, MatchComponentProps } from '@/types'

const RecentMatchCard: React.FC<MatchComponentProps> = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <MatchCard match={match} isExpanded={isExpanded} toggleExpand={toggleExpand} />
      {isExpanded && <MatchDetails match={match} />}
    </div>
  )
}

export default RecentMatchCard
