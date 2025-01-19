import React, { useRef, useEffect } from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

type GridViewCountProps = {
  /** The number of items in the grid */
  itemCount: number;
  /** A function that builds the item for a given index */
  itemBuilder: (index: number) => React.ReactNode;
  /** Optional style for the grid */
  style?: React.CSSProperties;
  /** Optional class name for the grid */
  className?: string;
  /** Direction the grid scrolls */
  scrollDirection?: ScrollDirection;
  /** Scroll physics of the grid */
  physics?: ScrollPhysics;
  /** Number of columns in the grid */
  crossAxisCount: number;
  /** Main axis extent (height/width of each item) */
  mainAxisExtent?: number;
  /** Spacing between grid items */
  spacing?: number;
};

/**
 * A customizable grid layout component that dynamically generates grid items based on a provided `itemBuilder` function and the total number of items (`itemCount`).
 * Additionally, this component displays the total count of items within the grid and provides scroll control.
 *
 * Example usage:
 * ```tsx
 * const gridRef = useRef<ScrollController>(null);
 * <GridViewCount
 *   itemCount={10}
 *   itemBuilder={(index) => (
 *     <div style={{ backgroundColor: 'red', height: '100px' }}>
 *       Item {index + 1}
 *     </div>
 *   )}
 *   crossAxisCount={3}
 *   mainAxisExtent={100}
 *   spacing={10}
 *   ref={gridRef}  // Attach the ref for scroll control
 * />
 * ```
 */
const GridViewCount: React.FC<GridViewCountProps> = ({
  itemCount,
  itemBuilder,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
  crossAxisCount,
  mainAxisExtent,
  spacing = 0,
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const overflowStyle =
    scrollDirection === "horizontal" ? "overflow-x" : "overflow-y";
  const physicsStyle = physics === "never" ? "hidden" : "auto";

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${crossAxisCount}, 1fr)`,
    gap: `${spacing}px`,
    [overflowStyle]: physicsStyle,
    ...style,
  };

  // ScrollController methods
  const scrollController: ScrollController = {
    scrollToTop: () => {
      if (gridRef.current) {
        gridRef.current.scrollTo({ top: 0, left: 0 });
      }
    },
    scrollToBottom: () => {
      if (gridRef.current) {
        gridRef.current.scrollTo({
          top: gridRef.current.scrollHeight,
          left: gridRef.current.scrollWidth,
        });
      }
    },
    scrollBy: (x, y) => {
      if (gridRef.current) {
        gridRef.current.scrollBy({ left: x, top: y });
      }
    },
    scrollTo: (x, y) => {
      if (gridRef.current) {
        gridRef.current.scrollTo({ left: x, top: y });
      }
    },
    getCurrentScrollPosition: () => {
      return {
        top: gridRef.current ? gridRef.current.scrollTop : 0,
        left: gridRef.current ? gridRef.current.scrollLeft : 0,
      };
    },
    getMaxScrollExtent: () => {
      return {
        maxTop: gridRef.current ? gridRef.current.scrollHeight : 0,
        maxLeft: gridRef.current ? gridRef.current.scrollWidth : 0,
      };
    },
  };

  // Expose ScrollController via ref
  useEffect(() => {
    if (gridRef.current) {
      (gridRef.current as any).scrollController = scrollController;
    }
  }, []);

  return (
    <div ref={gridRef} className={className} style={gridStyle}>
      {Array.from({ length: itemCount }, (_, index) => (
        <div key={index} style={{ height: mainAxisExtent }}>
          {itemBuilder(index)} {/* Render each item */}
        </div>
      ))}
    </div>
  );
};

export default GridViewCount;
