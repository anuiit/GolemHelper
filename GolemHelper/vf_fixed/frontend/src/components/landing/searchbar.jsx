import { Search } from 'lucide-react';
import React, { useState } from 'react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search summoners..."
          className="w-full px-6 py-4 text-lg bg-gray-900/50 backdrop-blur-md border-2 border-blue-500/30 
                   rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 
                   transition-all group-hover:border-blue-500/50"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600/80 backdrop-blur-sm
                   rounded-full hover:bg-blue-500 transition-colors"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}