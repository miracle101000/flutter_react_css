import React from "react";

interface RotatedBoxProps {
  quarterTurns: number; // The number of 90-degree turns
  children: React.ReactNode;
}

const RotatedBox: React.FC<RotatedBoxProps> = ({ quarterTurns, children }) => {
  // Calculate the rotation angle (90 degrees * quarterTurns)
  const rotationAngle = 90 * quarterTurns;

  // Apply CSS styles for rotation
  const rotatedStyle: React.CSSProperties = {
    transform: `rotate(${rotationAngle}deg)`,
    transformOrigin: "center", // Make sure the rotation happens around the center of the element
  };

  return <div style={rotatedStyle}>{children}</div>;
};

export default RotatedBox;
