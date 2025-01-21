import React, { useState, useEffect } from "react";

interface AnimatedPaddingProps {
  padding: string;
  duration: number;
  curve?: string;
  onEnd?: () => void;
  children: React.ReactNode;
}

/**
 * A component that animates the padding of its child element over a specified duration.
 * This creates a smooth transition effect when the `padding` value changes.
 *
 * Example usage:
 * ```tsx
 * <AnimatedPadding
 *   padding="20px"
 *   duration={1000}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Animation complete')}
 * >
 *   <div style={{ backgroundColor: 'lightblue', width: '100px', height: '100px' }}>
 *     Animated Content
 *   </div>
 * </AnimatedPadding>
 * ```
 *
 * Properties:
 * - `padding`: The target padding value for the child element. Accepts a string (e.g., "20px", "10px 15px").
 * - `duration`: The duration of the animation in milliseconds.
 * - `curve`: The timing function to control the pace of the animation. Examples include "linear", "ease-in", "ease-out", "ease-in-out".
 * - `onEnd`: A callback function triggered when the animation completes.
 * - `children`: The content to be rendered with animated padding.
 */
const AnimatedPadding: React.FC<AnimatedPaddingProps> = ({
  padding,
  duration,
  curve = "linear",
  onEnd,
  children,
}) => {
  const [currentPadding, setCurrentPadding] = useState(padding);

  useEffect(() => {
    // Update the padding value when the `padding` prop changes
    setCurrentPadding(padding);
  }, [padding]);

  const containerStyle: React.CSSProperties = {
    padding: currentPadding,
    transition: `padding ${duration}ms ${curve}`,
  };

  return (
    <div
      style={containerStyle}
      onTransitionEnd={onEnd} // Trigger the callback when animation ends
    >
      {children}
    </div>
  );
};

export default AnimatedPadding;
