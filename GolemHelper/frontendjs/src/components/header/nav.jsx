'use client'

import { useState, useEffect, useRef } from 'react'
import { Separator } from '@/components/ui/separator'

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
      const offsetWidth = activeTabElement.offsetWidth
      const offsetLeft = activeTabElement.offsetLeft

      setIndicatorStyle({
        width: `${activeTabElement.offsetWidth}px`,
        left: `${activeTabElement.offsetLeft}px`,
      })
    }
  }, [activeTab])

  return (
    <div className="flex items-center w-full">
      <div className="relative flex-grow">
        <ul className="flex">
          {tabs.map((tab, index) => (
            <li key={tab.id} className="relative">
              <button
                ref={el => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-30 p-4 text-center transition-colors duration-300 ease-in-out font-thin ${
                  activeTab === tab.id
                    ? 'text-vulcan-200'
                    : 'text-vulcan-400 hover:text-vulcan-200'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        
        <span 
          className={` w-30 absolute bottom-0 h-1 bg-vulcan-300 rounded-t-sm transition-all duration-300 ease-in-out`}
          style={indicatorStyle}
        />
      </div>

    </div>
  )
}