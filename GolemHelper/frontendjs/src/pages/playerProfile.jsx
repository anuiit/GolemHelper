"use client"

import Dashboard from '@/components/tabs/dashboardTab';
import PlayerHeader from '@/components/header/playerHeader';
import React from 'react';
import NavBar from '@/components/header/nav';
import { useState } from 'react';
import LiveGame from '@/components/tabs/livegameTab';
import Searchbar from '@/components/header/searchbar';
import { Separator } from '@/components/ui/separator';


export default function PlayerProfile() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("Hyuje#EUW");
  console.log("dataprofilesearchQuery: ", searchQuery);

  return (
    <div className='flex flex-col w-full min-h-screen items-center'>
      <div className='w-full bg-vulcan-950 py-6'>
        <div className='max-w-4xl pb-8 mx-auto flex'>
          <Searchbar 
            className="bg-stone-950 w-full" 
            onSearch={setSearchQuery}
          />
        </div>
      </div>
      <div className='w-full bg-vulcan-900 pt-2 drop-shadow-sm'>
        <div className='max-w-4xl mx-auto  '>
          <PlayerHeader searchQuery={searchQuery} />
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <Separator orientation="horizontal" className="bg-vulcan-600 w-full" />

      <div className='w-full bg-vulcan-950 py-4 min-h-screen'>
        <div className='max-w-4xl mx-auto flex justify-center'>
          {activeTab === "general" && (
            <Dashboard searchQuery={searchQuery} className='w-full' />
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