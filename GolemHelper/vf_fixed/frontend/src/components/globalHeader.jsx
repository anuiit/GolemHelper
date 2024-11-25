import Searchbar from "./ui/searchbar";
import { Separator } from "./ui/separator";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs-min";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GlobalHeader() {
    const [selectedTab, setSelectedTab] = useState('all');
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (!query || !query.includes('#')) {
          alert('Please enter a valid Name#Tagline.');
          return;
        }
        const encodedQuery = encodeURIComponent(query.trim());
        navigate(`/player/${encodedQuery}`);
      };

    return (
        <div className='w-full bg-vulcan-950'>
            <div className='flex flex-col space-y-4'>
                <div className="pt-6 pb-4">
                    <Searchbar
                        className="bg-stone-950 w-full"
                        onSearch={handleSearch} // Pass the handler function
                    />
                </div>
                
                <div className="flex items-start flex-row">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <TabsList className="flex items-center space-x-1">
                            <TabsTrigger className="text-vulcan-200 font-semibold border-0" value="all">Home</TabsTrigger>
                            {/* <Separator orientation="vertical" className="bg-vulcan-400 px-0.25 h-8" /> */}
                            <TabsTrigger className="text-vulcan-200 font-semibold" value="normal">?????</TabsTrigger>
                            {/* <Separator orientation="vertical" className="bg-vulcan-400 px-0.25 h-8" /> */}
                            <TabsTrigger className="text-vulcan-200 font-semibold" value="ranked solo/duo">?????</TabsTrigger>
                            {/* <Separator orientation="vertical" className="bg-vulcan-400 px-0.25 h-8" /> */}
                            <TabsTrigger className="text-vulcan-200 font-semibold" value="ranked flex">?????</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}