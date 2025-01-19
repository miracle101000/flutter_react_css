import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";

interface TabBarProps {
  controller?: number; // Optional controlled index from parent
  onTabChange?: (index: number) => void; // Callback when a tab is clicked
  tabs: React.ReactNode[]; // Array of components to be used as tabs
  indicatorColor?: string; // Color of the active tab indicator
  indicatorWeight?: number; // Weight of the active tab indicator
  indicatorPadding?: string; // Padding for the indicator
  labelColor?: string; // Color of selected tab labels
  unselectedLabelColor?: string; // Color of unselected tab labels
  tabAlignment?: "left" | "center" | "right"; // Alignment of the tabs
  mouseCursor?: string; // Mouse cursor style
}

/**
 * A customizable tab bar component that allows users to navigate between tabs.
 * It supports tab selection, animations for the tab indicator, and various styling options.
 *
 * Example usage:
 * ```tsx
 * <TabBar
 *   controller={activeTabIndex}
 *   onTabChange={(newIndex) => console.log(newIndex)}
 *   tabs={[
 *     <div>Tab 1 Content: This is the first tab</div>,
 *     <div>Tab 2 Content: This is the second tab</div>,
 *     <div>Tab 3 Content: This is the third tab</div>,
 *   ]}
 *   indicatorColor="#4caf50"
 *   indicatorWeight={2}
 *   labelColor="#fff"
 *   unselectedLabelColor="#777"
 *   tabAlignment="center"
 * />
 * ```
 *
 * Properties:
 * - `controller`: A number representing the index of the currently selected tab. If provided, this will control the active tab externally.
 * - `onTabChange`: A callback function that is invoked whenever a tab is clicked. It provides the index of the clicked tab.
 * - `tabs`: An array of React components or JSX elements that represent the content of each tab.
 * - `indicatorColor`: Defines the color of the active tab indicator.
 * - `indicatorWeight`: The thickness of the line that appears below the selected tab.
 * - `indicatorPadding`: The padding for the active tab indicator.
 * - `labelColor`: The color of the label for the selected tab.
 * - `unselectedLabelColor`: The color of the label for unselected tabs.
 * - `tabAlignment`: Defines the alignment of the tabs within the tab bar. Can be "left", "center", or "right".
 * - `mouseCursor`: Defines the cursor style for the tab bar when hovered over.
 *
 * This component provides smooth tab switching animations and is flexible for use cases where dynamic content or interactions are needed. It also allows full customization of tab appearance and behavior.
 */
const TabBar: React.FC<TabBarProps> = ({
  controller,
  onTabChange,
  tabs,
  indicatorColor = "#4caf50",
  indicatorWeight = 2,
  indicatorPadding = "0 10px",
  labelColor = "#fff",
  unselectedLabelColor = "#777",
  tabAlignment = "center",
  mouseCursor = "pointer",
}) => {
  // If controller is passed, use it as the selected tab index, else use internal state
  const [selectedIndex, setSelectedIndex] = useState(controller || 0);

  // Handle tab click
  const handleTabClick = (index: number) => {
    setSelectedIndex(index); // Update the selected tab
    if (onTabChange) onTabChange(index); // Call external callback if provided
  };

  // Sync with external controller (if passed)
  useEffect(() => {
    if (controller !== undefined && controller !== selectedIndex) {
      setSelectedIndex(controller);
    }
  }, [controller]);

  // Spring animation for the tab indicator
  const indicatorProps = useSpring({
    transform: `translateX(${selectedIndex * 100}%)`,
    config: { tension: 300, friction: 30 },
  });

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {/* Tab List */}
      <div
        style={{
          display: "flex",
          justifyContent: tabAlignment,
          position: "relative",
          cursor: mouseCursor,
        }}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(index)} // Handle tab click
            style={{
              padding: "10px 20px",
              color:
                selectedIndex === index ? labelColor : unselectedLabelColor,
              fontWeight: selectedIndex === index ? "bold" : "normal",
              transition: "color 0.3s",
              textAlign: "center",
            }}
          >
            {tab}
          </div>
        ))}

        {/* Tab Indicator */}
        {indicatorColor && (
          <animated.div
            style={{
              ...indicatorProps,
              height: indicatorWeight,
              backgroundColor: indicatorColor,
              position: "absolute",
              bottom: 0,
              width: `${100 / tabs.length}%`,
              padding: indicatorPadding,
              borderRadius: "10px",
            }}
          />
        )}
      </div>

      {/* Tab Panels (Content for each tab) */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
        }}
      >
        {tabs[selectedIndex]}
      </div>
    </div>
  );
};

export default TabBar;
