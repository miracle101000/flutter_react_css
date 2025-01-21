import React, { useState, useEffect } from "react";

interface AnimatedOpacityProps {
  opacity: number; // The opacity value (0 to 1)
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
  onEnd?: () => void;
}

/**
 * A component that animates the opacity of its children over a given duration.
 * This component creates a smooth fade-in or fade-out effect based on the `opacity` prop.
 * When the `opacity` value changes, the child elements gradually fade to the new opacity level.
 *
 * Example usage:
 * ```tsx
 * <AnimatedOpacity opacity={0.5} duration={1000} onEnd={() => console.log('Animation complete')}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </AnimatedOpacity>
 * ```
 *
 * Properties:
 * - `opacity`: The target opacity value (ranging from 0 to 1). A value of 0 is fully transparent, while 1 is fully opaque.
 * - `duration`: The time (in milliseconds) it takes for the opacity change to complete.
 * - `children`: The content to be rendered and animated with changing opacity.
 * - `onEnd`: A callback function triggered when the animation completes.
 */
const AnimatedOpacity: React.FC<AnimatedOpacityProps> = ({
  opacity,
  duration,
  children,
  onEnd,
}) => {
  const [currentOpacity, setCurrentOpacity] = useState(opacity);

  useEffect(() => {
    // Update opacity when the `opacity` prop changes
    setCurrentOpacity(opacity);
  }, [opacity]);

  useEffect(() => {
    if (onEnd) {
      // Attach a listener for the transition end event
      const handleTransitionEnd = () => {
        onEnd();
      };

      // Get the div element and add the event listener
      const element = document.getElementById("animated-opacity");
      element?.addEventListener("transitionend", handleTransitionEnd);

      // Cleanup the event listener when the component is unmounted or opacity changes
      return () => {
        element?.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [onEnd]);

  // Define the CSS for the animated opacity
  const animatedStyle: React.CSSProperties = {
    opacity: currentOpacity,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  return (
    <div id="animated-opacity" style={animatedStyle}>
      {children}
    </div>
  );
};

export default AnimatedOpacity;
