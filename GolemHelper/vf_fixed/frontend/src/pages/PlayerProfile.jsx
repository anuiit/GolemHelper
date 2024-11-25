import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import Dashboard from '@/components/playerProfile/dashboardTab';
import Searchbar from '@/components/ui/searchbar';
import PlayerHeader from '@/components/playerProfile/header/playerHeader';
import NavBar from '@/components/playerProfile/header/navbar';
import LiveGameTab from '@/components/playerProfile/liveGameTab';

function PlayerProfile() {
    const { playerName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("general");

    console.log("playerName:", playerName);

    // Handler function to navigate to the new route based on search query
    const handleSearch = (query) => {
        // Basic validation (optional)
        if (!query || !query.includes('#')) {
            alert('Please enter a valid Name#Tagline.');
            return;
        }

        // Encode the query to handle special characters
        const encodedQuery = encodeURIComponent(query.trim());
        navigate(`/player/${encodedQuery}`);
    };

    return (
        <div className='flex flex-col w-full min-h-screen items-center'>
        {/* <div className='w-full bg-vulcan-950 py-6'>
            <div className='max-w-4xl pb-8 mx-auto flex'>
                <Searchbar 
                    className="bg-stone-950 w-full" 
                    onSearch={handleSearch} // Pass the handler function
                />
            </div>
        </div> */}
        <div className='w-full bg-vulcan-900 pt-2 drop-shadow-sm'>
            <div className='max-w-4xl mx-auto  '>
            <PlayerHeader searchQuery={playerName} />
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
        </div>

        

        <Separator orientation="horizontal" className="bg-vulcan-850 w-full" />

        {/* Tab Content */}
<div className='w-full bg-vulcan-950 py-4 min-h-screen'>
  <div className='max-w-4xl mx-auto flex justify-center relative'>
    {/* General Tab */}
    <div
      className={`w-full transition-opacity duration-500 ease-in-out ${
        activeTab === 'general' ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
      }`}
    >
      <Dashboard searchQuery={playerName} className='w-full' />
    </div>
    {/* Live Game Tab */}
    <div
      className={`w-full pt-4 transition-opacity duration-500 ease-in-out ${
        activeTab === 'live-game' ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
      }`}
    >
      <LiveGameTab searchQuery={playerName} />
    </div>
  </div>
</div>
    </div>
    );
}


export default PlayerProfile;