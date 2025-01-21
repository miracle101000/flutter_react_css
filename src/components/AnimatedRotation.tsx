import React, { useState, useEffect } from "react";

interface AnimatedRotationProps {
  turns: number; // The number of 360-degree rotations
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
  onEnd?: () => void;
}

/**
 * A component that animates the rotation of its children based on the `turns` prop over a specified duration.
 * This component applies a smooth rotating effect, where the content rotates a certain number of turns (360 degrees per turn).
 * When the `turns` prop changes, the child elements smoothly rotate to the new angle.
 *
 * Example usage:
 * ```tsx
 * <AnimatedRotation turns={2} duration={1000} onEnd={() => console.log('Animation complete')}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </AnimatedRotation>
 * ```
 *
 * Properties:
 * - `turns`: The number of turns (full 360-degree rotations) that the content should make. For example, `1` means one full rotation, `2` means two full rotations, etc.
 * - `duration`: The time (in milliseconds) it takes for the rotation to complete.
 * - `children`: The content to be rendered and animated with the rotation effect.
 * - `onEnd`: A callback function triggered when the animation completes.
 */
const AnimatedRotation: React.FC<AnimatedRotationProps> = ({
  turns,
  duration,
  children,
  onEnd,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    // Convert turns into degrees (360 degrees * turns)
    const angle = turns * 360;
    setRotationAngle(angle);
  }, [turns]);

  useEffect(() => {
    if (onEnd) {
      // Attach a listener for the transition end event
      const handleTransitionEnd = () => {
        onEnd();
      };

      // Get the div element and add the event listener
      const element = document.getElementById("animated-rotation");
      element?.addEventListener("transitionend", handleTransitionEnd);

      // Cleanup the event listener when the component is unmounted or turns changes
      return () => {
        element?.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [onEnd]);

  // Define the CSS for the animated rotation
  const animatedStyle: React.CSSProperties = {
    transform: `rotate(${rotationAngle}deg)`,
    transition: `transform ${duration}ms ease-in-out`,
    display: "inline-block", // Ensures the element behaves as a block while allowing transform
  };

  return (
    <div id="animated-rotation" style={animatedStyle}>
      {children}
    </div>
  );
};

export default AnimatedRotation;
