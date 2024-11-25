import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './searchbar';

export function Hero({ onSearch }) {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const encodedQuery = encodeURIComponent(query);
    navigate(`/player/${encodedQuery}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=2400')] 
                     bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 hero-gradient opacity-90" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 
                      bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
          LoL Stats Hub
        </h1>
        <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
          Your gateway to the rift's finest statistics
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}