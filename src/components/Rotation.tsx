import React, { useState, useEffect } from "react";

interface RotationProps {
  turns: number; // The number of 360-degree rotations
  children: React.ReactNode;
}

const Rotation: React.FC<RotationProps> = ({ turns, children }) => {
  // Convert turns into degrees (360 degrees * turns)
  const rotationAngle = turns * 360;

  // Define the static CSS for the rotation
  const staticStyle: React.CSSProperties = {
    transform: `rotate(${rotationAngle}deg)`,
    display: "inline-block", // Ensures the element behaves as a block while allowing transform
  };

  return <div style={staticStyle}>{children}</div>;
};

export default Rotation;
