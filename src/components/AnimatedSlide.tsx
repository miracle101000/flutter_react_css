import React from "react";
import { useSpring, animated, AnimatedProps } from "react-spring";

/**
 * A component that animates sliding of its children horizontally.
 *
 * Example usage:
 * ```tsx
 * <AnimatedSlide offset={200} onEnd={() => console.log("Animation ended!")}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }} />
 * </AnimatedSlide>
 * ```
 */
const AnimatedSlide: React.FC<{
  offset: number;
  onEnd?: () => void; // Callback when animation ends
  children: React.ReactNode;
}> = ({ offset, children, onEnd }) => {
  const slide = useSpring({
    transform: `translateX(${offset}px)`, // Horizontal sliding
    config: { duration: 1000 }, // Animation duration
    onRest: onEnd, // Trigger onEnd when the animation completes
  });

  const animatedProps: AnimatedProps<any> = { style: slide, children };

  return <animated.div {...animatedProps} />;
};

export default AnimatedSlide;
