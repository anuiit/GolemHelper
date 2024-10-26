'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function NavBar({ activeTab, setActiveTab }) {
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const tabRefs = useRef([])

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'live-game', label: 'Live Game' },
  ]

  useEffect(() => {
    const activeTabElement = tabRefs.current[tabs.findIndex(tab => tab.id === activeTab)]
    if (activeTabElement) {
      setIndicatorStyle({
        width: `${activeTabElement.offsetWidth}px`,
        left: `${activeTabElement.offsetLeft}px`,
      })
    }
  }, [activeTab])

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="relative pb-px">
        <ul className="flex">
          {tabs.map((tab, index) => (
            <li key={tab.id} className="relative">
              <button
                ref={el => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-28 p-4 text-center transition-colors duration-300 ease-in-out ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <span 
          className="absolute bottom-0 h-1 bg-white rounded-t-xl transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
      </div>

    </div>
  )
}