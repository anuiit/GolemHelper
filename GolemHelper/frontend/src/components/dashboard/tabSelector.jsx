import { useState, useEffect, useRef } from "react";
import React from "react";

export default function Tabs({ tabs, initialTab, children }) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].name);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef({});

  useEffect(() => {
    const activeTabRef = tabsRef.current[activeTab];
    if (activeTabRef) {
      const { offsetWidth, offsetLeft } = activeTabRef;
      setIndicatorStyle({
        width: offsetWidth + "px",
        left: offsetLeft + "px",
        transition: "left 300ms ease-in-out, width 300ms ease-in-out",
      });
    }
  }, [activeTab]);

  const content = React.Children.toArray(children).find(
    (child) => child.props.name === activeTab
  );

  return (
    <div>
      <div className="relative mb-2">
        <ul className="flex">
          {tabs.map((tab) => (
            <li key={tab.name} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.name)}
                ref={(el) => {
                  tabsRef.current[tab.name] = el;
                }}
                className={`inline-block p-4 rounded-t-lg transition duration-300 ease-in-out ${
                  activeTab === tab.name
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                style={{
                  transitionProperty: "color",
                  transitionDuration: "300ms",
                }}
              >
                {tab.displayName}
              </button>
            </li>
          ))}
        </ul>
        <span
          className="absolute bottom-0 h-1 bg-white transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
      </div>
      <div>{content}</div>
    </div>
  );
}