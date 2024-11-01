"use client"

import React from 'react';
import { useState } from 'react';
import PlayerProfile from '@/pages/playerProfile';

export default function Home() {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <>
      <PlayerProfile/>
    </>

  );
}