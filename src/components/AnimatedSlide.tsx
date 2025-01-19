import React from "react";
import { useSpring, animated, AnimatedProps } from "react-spring";

/**
 * A component that animates sliding horizontally based on the offset value.
 *
 * Example usage:
 * ```tsx
 * <AnimatedSlide offset={50}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </AnimatedSlide>
 * ```
 */
const AnimatedSlide: React.FC<
  React.PropsWithChildren<{
    offset: number;
  }>
> = ({ offset, children }) => {
  const slide = useSpring({
    transform: `translateX(${offset}px)`, // Horizontal sliding
    config: { duration: 1000 }, // Animation duration
  });

  const animatedProps: AnimatedProps<any> = { style: slide, children };

  return <animated.div {...animatedProps} />;
};

export default AnimatedSlide;
