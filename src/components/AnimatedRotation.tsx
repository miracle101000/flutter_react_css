import React, { useState, useEffect } from "react";

interface AnimatedRotationProps {
  turns: number; // The number of 360-degree rotations
  duration: number; // Duration of the animation in milliseconds
  children: React.ReactNode;
}

/**
 * A component that animates the rotation of its children based on the `turns` prop over a specified duration.
 * This component applies a smooth rotating effect, where the content rotates a certain number of turns (360 degrees per turn).
 * When the `turns` prop changes, the child elements smoothly rotate to the new angle.
 *
 * Example usage:
 * ```tsx
 * <AnimatedRotation turns={2} duration={1000}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </AnimatedRotation>
 * ```
 *
 * Properties:
 * - `turns`: The number of turns (full 360-degree rotations) that the content should make. For example, `1` means one full rotation, `2` means two full rotations, etc.
 * - `duration`: The time (in milliseconds) it takes for the rotation to complete.
 * - `children`: The content to be rendered and animated with the rotation effect.
 */
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
