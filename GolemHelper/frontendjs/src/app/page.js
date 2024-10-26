'use client'

import Dashboard from '@/components/tabs/dashboardTab';
import PlayerHeader from '@/components/dashboard/playerHeader';
import React from 'react';
import NavBar from '@/components/dashboard/nav';
import { useState } from 'react';
import LiveGame from '@/components/tabs/livegameTab';
import { liveGameData } from '@/data/liveGameData';

export default function Home() {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-zinc-950 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <PlayerHeader />
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "general" && (
          <Dashboard />
        )}
        {activeTab === "live-game" && (
          <div className="pt-4">
            <LiveGame players={liveGameData} />
          </div>
        )}
      </div>
    </div>
  );
}