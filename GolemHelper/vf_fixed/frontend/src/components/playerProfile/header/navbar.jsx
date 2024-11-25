import React, { useState, useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const Navbar = ({ activeTab, setActiveTab}) => {
    const tabRefs = useRef([])

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'live-game', label: 'Live Game' },
    ]

    useEffect(() => {
        const activeTabElement = tabRefs.current[tabs.findIndex(tab => tab.id === activeTab)]
      }, [activeTab])

    return (
        <nav className="flex w-full bg-vulcan-900">
            <div className="flex">
            <div className="flex space-x-8">
                {tabs.map((tab, index) => (
                <button
                    key={tab.id}
                    className={`relative px-4 py-3 font-light text-vulcan-200 hover:text-vulcan-100 focus:outline-none ${
                    activeTab === tab.id ? "text-vulcan-100" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            </div>
        </nav>
        );
    };

export default Navbar;