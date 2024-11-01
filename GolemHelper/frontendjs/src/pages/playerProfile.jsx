"use client"

import Dashboard from '@/components/tabs/dashboardTab';
import PlayerHeader from '@/components/header/playerHeader';
import React from 'react';
import NavBar from '@/components/header/nav';
import { useState } from 'react';
import LiveGame from '@/components/tabs/livegameTab';
import Searchbar from '@/components/header/searchbar';
import { Separator } from '@/components/ui/separator';

const sampleLiveGameData = [
  { name: "Player1", score: 100 },
  { name: "Player2", score: 200 },
];

export default function PlayerProfile() {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className='flex flex-col w-full min-h-screen items-center'>
      <div className='w-full bg-vulcan-950 py-6'>
        <div className='max-w-4xl pb-8 mx-auto flex'>
          <Searchbar className="bg-stone-950 w-full" />
        </div>
      </div>
      <div className='w-full bg-vulcan-900 pt-2 drop-shadow-sm'>
        <div className='max-w-4xl mx-auto  '>
          <PlayerHeader />
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <Separator orientation="horizontal" className="bg-vulcan-600 w-full" />

      <div className='w-full bg-vulcan-950 py-4 min-h-screen'>
        <div className='max-w-4xl mx-auto flex justify-center'>
          {activeTab === "general" && (
            <Dashboard className='w-full' />
          )}
          {activeTab === "live-game" && (
            <div className="pt-4 w-full">
              <LiveGame players={sampleLiveGameData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}