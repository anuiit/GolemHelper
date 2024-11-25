// Layout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from '@/components/ui/searchbar';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import GlobalHeader from '@/components/globalHeader';

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='w-full bg-vulcan-950'>
        <div className='max-w-4xl mx-auto flex'>
          <GlobalHeader />
        </div>
      </div>
      <Separator orientation="horizontal" className="bg-vulcan-850 w-full" />
      <main className='flex-grow'>
        {children}
      </main>
    </div>
  );
}