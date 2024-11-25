// Make a basic landing page with a searchbar and a list of players
import React from 'react';
import Searchbar from '@/components/header/searchbar';
import { Separator } from '@/components/ui/separator';

export default function Landing() {
    return (
        <div className='flex flex-col w-full min-h-screen items-center'>
            <div className='w-full bg-vulcan-950 py-6'>
                <div className='max-w-4xl pb-8 mx-auto flex'>
                <Searchbar className="bg-stone-950 w-full" />
                </div>
            </div>

    
            <Separator orientation="horizontal" className="bg-vulcan-600 w-full" />
    

        </div>
    );
}