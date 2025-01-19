import React, { useRef, useLayoutEffect, useState, ReactNode } from "react";

// Props type definition
interface FittedBoxProps {
  children: ReactNode;
  fit?: "contain" | "cover"; // Scaling options
  align?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"; // Alignment options
}

/**
 * FittedBox Component
 * A React component inspired by Flutter's FittedBox that scales and aligns its child element
 * to fit within the parent container based on the provided `fit` and `align` props.
 *
 * Props:
 * - fit: Determines how the child is scaled. Options: 'contain', 'cover'. Default: 'contain'.
 * - align: Determines how the child is aligned inside the parent. Options: 'center', 'top', 'bottom', 'left', 'right', 'topLeft', etc. Default: 'center'.
 * - children: The child element to be scaled and aligned.
 *
 * Example Usage:
 * ```tsx
 * import { FittedBox } from './path-to-index';
 *
 * function App() {
 *   return (
 *     <div style={{ width: 300, height: 300, border: '1px solid black' }}>
 *       <FittedBox fit="contain" align="center">
 *         <div style={{ width: 400, height: 200, background: 'blue' }}>
 *           Hello, FittedBox!
 *         </div>
 *       </FittedBox>
 *     </div>
 *   );
 * }
 *
 * export default App;
 * ```
 */
const FittedBox: React.FC<FittedBoxProps> = ({
  children,
  fit = "contain",
  align = "center",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;

    if (container && child) {
      const { width: containerWidth, height: containerHeight } =
        container.getBoundingClientRect();
      const { width: childWidth, height: childHeight } =
        child.getBoundingClientRect();

      const scaleX = containerWidth / childWidth;
      const scaleY = containerHeight / childHeight;

      const scaleValue =
        fit === "contain" ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
      setScale(scaleValue);
    }
  }, [fit]);

  const alignmentStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: align.includes("right")
      ? "flex-end"
      : align.includes("left")
      ? "flex-start"
      : "center",
    alignItems: align.includes("bottom")
      ? "flex-end"
      : align.includes("top")
      ? "flex-start"
      : "center",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div ref={containerRef} style={alignmentStyles}>
      <div
        ref={childRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FittedBox;
