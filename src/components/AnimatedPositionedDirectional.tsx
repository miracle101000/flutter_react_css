import React, { useState, useEffect } from "react";

interface AnimatedPositionedProps {
  children: React.ReactNode;
  start?: number;
  top?: number;
  end?: number;
  bottom?: number;
  width?: number;
  height?: number;
  duration?: number; // in milliseconds
  curve?: string; // CSS transition-timing-function
  direction?: "ltr" | "rtl";
  onEnd?: () => void; // Callback for animation completion
}

/**
 * AnimatedPositionedDirectional
 *
 * A component that animates directional positioning of its child within a `Stack`.
 *
 * Example usage:
 * ```tsx
 * import React, { useState } from "react";
 * import AnimatedPositionedDirectional from "./AnimatedPositionedDirectional";
 * import Stack from "./Stack";
 *
 * const App = () => {
 *   const [position, setPosition] = useState({ start: 50, top: 50 });
 *
 *   const moveBox = () => {
 *     setPosition({
 *       start: Math.random() * 200,
 *       top: Math.random() * 200,
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={moveBox}>Move Box</button>
 *       <Stack style={{ width: "300px", height: "300px", backgroundColor: "lightblue" }}>
 *         <AnimatedPositionedDirectional
 *           start={position.start}
 *           top={position.top}
 *           width={50}
 *           height={50}
 *           duration={500}
 *           direction="ltr"
 *           onEnd={() => console.log("Animation completed!")}
 *         >
 *           <div style={{ backgroundColor: "red", width: "100%", height: "100%" }} />
 *         </AnimatedPositionedDirectional>
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
 * The `AnimatedPositionedDirectional` component animates the `start` and `top` properties to move a red box within the stack.
 * Clicking the "Move Box" button randomly updates its position and triggers the animation.
 */
const AnimatedPositionedDirectional: React.FC<AnimatedPositionedProps> = ({
  start,
  top,
  end,
  bottom,
  width,
  height,
  direction = "ltr",
  duration = 300,
  onEnd,
  children,
}) => {
  const [styles, setStyles] = useState<React.CSSProperties>({
    position: "absolute",
    left: direction === "ltr" ? start : undefined,
    right: direction === "rtl" ? start : end,
    top,
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
      left: direction === "ltr" ? start : undefined,
      right: direction === "rtl" ? start : end,
      top,
      bottom,
      width,
      height,
    }));
  }, [start, top, end, bottom, width, height, direction]);

  return <div style={styles}>{children}</div>;
};

export default AnimatedPositionedDirectional;
