import React from "react";
import { useSpring, animated, AnimatedProps } from "react-spring";

/**
 * A component that animates scaling of its children.
 *
 * Example usage:
 * ```tsx
 * <AnimatedScale scale={1.5}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }} />
 * </AnimatedScale>
 * ```
 */
const AnimatedScale: React.FC<{ scale: number; children: React.ReactNode }> = ({
  scale,
  children,
}) => {
  const animation = useSpring({
    transform: `scale(${scale})`, // Scaling transformation
    config: { duration: 1000 }, // Animation duration
  });

  // Explicitly typing the children prop for the animated div
  const animatedProps: AnimatedProps<any> = { style: animation, children };

  return <animated.div {...animatedProps} />;
};

export default AnimatedScale;
