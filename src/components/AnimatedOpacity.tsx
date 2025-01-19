import React, { useState, useEffect } from "react";

interface AnimatedOpacityProps {
  opacity: number; // The opacity value (0 to 1)
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
}

/**
 * A component that animates the opacity of its children over a given duration.
 * This component creates a smooth fade-in or fade-out effect based on the `opacity` prop.
 * When the `opacity` value changes, the child elements gradually fade to the new opacity level.
 *
 * Example usage:
 * ```tsx
 * <AnimatedOpacity opacity={0.5} duration={1000}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </AnimatedOpacity>
 * ```
 *
 * Properties:
 * - `opacity`: The target opacity value (ranging from 0 to 1). A value of 0 is fully transparent, while 1 is fully opaque.
 * - `duration`: The time (in milliseconds) it takes for the opacity change to complete.
 * - `children`: The content to be rendered and animated with changing opacity.
 */
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
