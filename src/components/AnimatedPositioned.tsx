import React, { useEffect, useState } from "react";

type AnimatedPositionedProps = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
  duration?: number; // Animation duration in milliseconds
  onEnd?: () => void; // Callback triggered after animation completes
  children: React.ReactNode;
};

/**
 * AnimatedPositioned
 *
 * A component that animates the positioning of its child within a `Stack` using CSS transitions.
 *
 * Example usage:
 * ```tsx
 * import React, { useState } from "react";
 * import AnimatedPositioned from "./AnimatedPositioned";
 * import Stack from "./Stack";
 *
 * const App = () => {
 *   const [position, setPosition] = useState({ left: 50, top: 50 });
 *
 *   const moveBox = () => {
 *     setPosition({
 *       left: Math.random() * 200,
 *       top: Math.random() * 200,
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={moveBox}>Move Box</button>
 *       <Stack style={{ width: "300px", height: "300px", backgroundColor: "lightblue" }}>
 *         <AnimatedPositioned
 *           left={position.left}
 *           top={position.top}
 *           width={50}
 *           height={50}
 *           duration={500}
 *           onEnd={() => console.log("Animation completed!")}
 *         >
 *           <div style={{ backgroundColor: "red", width: "100%", height: "100%" }} />
 *         </AnimatedPositioned>
 *
 *         <div
 *           style={{
 *             position: "absolute",
 *             top: 0,
 *             left: 0,
 *             width: "100%",
 *             height: "100%",
 *             backgroundColor: "green",
 *             opacity: 0.2,
 *           }}
 *         />
 *       </Stack>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * The `AnimatedPositioned` component animates the `left` and `top` properties to move a red box within the stack.
 * Clicking the "Move Box" button randomly updates its position and triggers the animation.
 */
const AnimatedPositioned: React.FC<AnimatedPositionedProps> = ({
  left,
  top,
  right,
  bottom,
  width,
  height,
  duration = 300,
  onEnd,
  children,
}) => {
  const [styles, setStyles] = useState<React.CSSProperties>({
    position: "absolute",
    left,
    top,
    right,
    bottom,
    width,
    height,
    transition: `all ${duration}ms ease-in-out`,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onEnd) onEnd();
    }, duration);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [duration, onEnd]);

  useEffect(() => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      left,
      top,
      right,
      bottom,
      width,
      height,
    }));
  }, [left, top, right, bottom, width, height]);

  return <div style={styles}>{children}</div>;
};

export default AnimatedPositioned;
