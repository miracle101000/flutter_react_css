import React, { useEffect, useState, useRef, ReactElement } from "react";
import { useSpring, animated, AnimatedProps } from "react-spring";

interface AnimatedFractionallySizedBoxProps {
  widthFactor?: number;
  heightFactor?: number;
  children: ReactElement<any>; // Enforce single ReactElement with any props
  duration?: string;
  onEnd?: () => void;
}

/**
 * The `AnimatedFractionallySizedBox` component animates the size of its children
 * based on a fraction of the parent container's width and height. The resizing
 * occurs smoothly with an animated transition using `react-spring` for fluid animations.
 *
 * This component is useful when you need to animate resizing elements relative to
 * their parent container in a smooth and responsive way.
 *
 * **Example usage:**
 * ```tsx
 * <AnimatedFractionallySizedBox widthFactor={0.5} heightFactor={0.3} onEnd={() => console.log('Animation complete')} >
 *   <div>Animated Content</div>
 * </AnimatedFractionallySizedBox>
 * ```
 *
 * **Properties:**
 * - `widthFactor`: The fraction of the parent container's width to apply (default is `1` for full width).
 * - `heightFactor`: The fraction of the parent container's height to apply (default is `1` for full height).
 * - `children`: The content to be sized and animated.
 * - `onEnd`: A callback function triggered when the animation completes.
 * - `duration`: The duration of the animation (default is `"0.3s"`), allowing customization of how fast the resizing occurs.
 */
const AnimatedFractionallySizedBox: React.FC<
  AnimatedFractionallySizedBoxProps
> = ({
  widthFactor = 1,
  heightFactor = 1,
  children,
  onEnd,
  duration = "0.3s",
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (parentRef.current) {
      const handleResize = () => {
        if (parentRef.current) {
          const width = parentRef.current.offsetWidth;
          const height = parentRef.current.offsetHeight;
          setParentSize({ width, height });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Convert duration to milliseconds
  const durationInMs = parseFloat(duration) * 1000;

  const { width, height } = useSpring({
    width: parentSize.width * widthFactor,
    height: parentSize.height * heightFactor,
    config: { tension: 170, friction: 26, duration: durationInMs }, // Use duration here
    onRest: onEnd,
  });

  // Explicitly type the style for animated.div
  const animatedDivStyle: AnimatedProps<React.CSSProperties> = {
    width: width.to((w) => `${w}px`),
    height: height.to((h) => `${h}px`),
    position: "absolute" as "absolute",
  };

  return (
    <div
      ref={parentRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {React.cloneElement(children, { style: animatedDivStyle })}
    </div>
  );
};

export default AnimatedFractionallySizedBox;
