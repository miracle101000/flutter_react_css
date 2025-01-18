import React, { useState, useEffect } from "react";

interface AnimatedRotationProps {
  turns: number; // The number of 360-degree rotations
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
}

const AnimatedRotation: React.FC<AnimatedRotationProps> = ({
  turns,
  duration,
  children,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    // Convert turns into degrees (360 degrees * turns)
    const angle = turns * 360;
    setRotationAngle(angle);
  }, [turns]);

  // Define the CSS for the animated rotation
  const animatedStyle: React.CSSProperties = {
    transform: `rotate(${rotationAngle}deg)`,
    transition: `transform ${duration}ms ease-in-out`,
    display: "inline-block", // Ensures the element behaves as a block while allowing transform
  };

  return <div style={animatedStyle}>{children}</div>;
};

export default AnimatedRotation;
