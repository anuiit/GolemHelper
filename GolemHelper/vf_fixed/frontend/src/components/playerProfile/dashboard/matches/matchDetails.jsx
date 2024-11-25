import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card';
import TeamColumnBlue from '@/components/playerProfile/dashboard/matches/teamColumnBlue';
import TeamColumnRed from '@/components/playerProfile/dashboard/matches/teamColumnRed';
import TeamStats from '@/components/playerProfile/dashboard/matches/teamStats';
import { Separator } from '@/components/ui/separator';

function MatchDetails({ match }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  console.log("match: ", match);
  return (
    <div className="p-6 bg-transparent border-0">
      {/* Custom Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            className={`text-md font-normal focus:outline-none ${
              selectedTab === 'overview' ? 'text-vulcan-100' : 'text-vulcan-500'
            }`}
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </button>
          <button
            className={`text-md font-normal focus:outline-none ${
              selectedTab === 'details' ? 'text-vulcan-100' : 'text-vulcan-500'
            }`}
            onClick={() => setSelectedTab('details')}
          >
            Details
          </button>
        </div>
        <div className="flex flex-row space-x-2 text-sm font-normal text-vulcan-500 items-end">
          <span>2021-07-01</span>
          <span>•</span>
          <span>12:30 PM</span>
          <span>•</span>
          <span>30 minutes</span>
        </div>
      </div>

      {/* Separator */}
      <Separator orientation="horizontal" className="my-4 bg-vulcan-800" />

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="pt-2 flex space-x-6 justify-evenly">
          <TeamColumnBlue teamName="Blue" teamData={match?.teams.blue} />

          {/* Middle Content */}
          <div className="flex justify-between">
            <Separator orientation="vertical" className="mr-2 bg-vulcan-800" />

            <div className='w-full w-60'>
              <TeamStats className="flex flex-col space-y-2" teamData={match?.teams.blue} />
            </div>

            <Separator orientation="vertical" className="ml-2 bg-vulcan-800" />
          </div>

          <TeamColumnRed teamName="Red" teamData={match?.teams.red} />
        </div>
      )}

      {selectedTab === 'details' && (
        <div>
          {/* Details Tab Content */}
          <p className="text-vulcan-200">Details content goes here.</p>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;