'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui-chakra/button';
import { Input } from '@/components/ui/input';


export default function Searchbar({ className }) {

  const [localQuery, setLocalQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery) {
      updateQuery(localQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md ${className}`}>
      <div className={`relative flex items-center `}>
        <Input
          type="search"
          placeholder="Name#Tagline"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full pr-10 bg-background border-input
            placeholder:text-muted-foreground/60
            placeholder:font-thin 
            font-thin
            focus:placeholder:text-muted-foreground/80
            transition-all duration-300 ease-in-out
            focus-visible:ring-0 focus-visible:ring-offset-0
            ${isFocused ? 'scale-105' : 'scale-100'}
            hover:bg-vulcan-850
          `}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className={`
            absolute right-0 text-gray-500 hover:text-gray-300
            transition-all duration-300
            ${isFocused ? 'scale-110' : 'scale-100'}
          `}
        >
          <Search className={`h-4 w-4 mr-2 ${isFocused ? 'animate-spin-slow transition-all mr-0' : ''}`} />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}