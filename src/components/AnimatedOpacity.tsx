import React, { useState, useEffect } from "react";

interface AnimatedOpacityProps {
  opacity: number; // The opacity value (0 to 1)
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
}

const AnimatedOpacity: React.FC<AnimatedOpacityProps> = ({
  opacity,
  duration,
  children,
}) => {
  const [currentOpacity, setCurrentOpacity] = useState(opacity);

  useEffect(() => {
    // Update opacity when the `opacity` prop changes
    setCurrentOpacity(opacity);
  }, [opacity]);

  // Define the CSS for the animated opacity
  const animatedStyle: React.CSSProperties = {
    opacity: currentOpacity,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  return <div style={animatedStyle}>{children}</div>;
};

export default AnimatedOpacity;
