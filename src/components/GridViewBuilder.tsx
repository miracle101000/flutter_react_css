import React, { useRef, useEffect } from "react";

// Scroll Controller Interface
interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type GridViewBuilderProps = {
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
  /** Scroll controller ref for programmatically controlling scroll */
  scrollControllerRef?: React.RefObject<ScrollController>;
};

/**
 * A customizable grid layout component that dynamically generates grid items based on a provided `itemBuilder` function and the total number of items (`itemCount`).
 * This component allows you to build flexible grid layouts where the items are created dynamically, making it suitable for lists with variable content.
 * It also supports scrolling direction, spacing, and item sizing options.
 *
 * Example usage:
 * ```tsx
 * <GridViewBuilder
 *   itemCount={10}
 *   itemBuilder={(index) => (
 *     <div style={{ backgroundColor: 'red', height: '100px' }}>
 *       Item {index + 1}
 *     </div>
 *   )}
 *   scrollDirection="vertical"
 *   physics="auto"
 *   crossAxisCount={3}
 *   mainAxisExtent={100}
 *   spacing={10}
 * />
 *
 * // Example for horizontal scrolling
 * <GridViewBuilder
 *   itemCount={5}
 *   itemBuilder={(index) => (
 *     <div style={{ backgroundColor: 'blue', height: '100px' }}>
 *       Horizontal Item {index + 1}
 *     </div>
 *   )}
 *   scrollDirection="horizontal"
 *   physics="auto"
 *   crossAxisCount={2}
 *   mainAxisExtent={200}
 *   spacing={15}
 * />
 * ```
 *
 * Properties:
 * - `itemCount`: The total number of items to render in the grid.
 * - `itemBuilder`: A function that returns a grid item (element) based on its index in the grid.
 * - `style`: Optional inline styles to be applied to the grid container.
 * - `className`: Custom CSS class to be applied to the grid container.
 * - `scrollDirection`: Defines the direction of scrolling. Can be either "vertical" (default) or "horizontal".
 * - `physics`: Defines the scrolling behavior:
 *   - `"auto"`: Enables scrolling when content overflows.
 *   - `"never"`: Hides overflow content, preventing scrolling.
 *   - `"clamped"`: Similar to `"never"`, but limits overflow visibility.
 * - `crossAxisCount`: The number of columns (or rows for vertical direction) in the grid.
 * - `mainAxisExtent`: The fixed height (for vertical scroll) or width (for horizontal scroll) of each grid item.
 * - `spacing`: The space (in pixels) between grid items.
 * - `scrollControllerRef`: A reference to control the grid's scroll programmatically. Allows scrolling to top, bottom, or other specific positions.
 */
const GridViewBuilder: React.FC<GridViewBuilderProps> = ({
  itemCount,
  itemBuilder,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
  crossAxisCount,
  mainAxisExtent,
  spacing = 0,
  scrollControllerRef,
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll methods
  const scrollToTop = () => {
    gridContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const maxScrollTop = gridContainerRef.current?.scrollHeight || 0;
    gridContainerRef.current?.scrollTo({
      top: maxScrollTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollBy = (x: number, y: number) => {
    gridContainerRef.current?.scrollBy({ left: x, top: y, behavior: "smooth" });
  };

  const scrollTo = (x: number, y: number) => {
    gridContainerRef.current?.scrollTo({ left: x, top: y, behavior: "smooth" });
  };

  const getCurrentScrollPosition = () => {
    if (gridContainerRef.current) {
      return {
        top: gridContainerRef.current.scrollTop,
        left: gridContainerRef.current.scrollLeft,
      };
    }
    return { top: 0, left: 0 };
  };

  const getMaxScrollExtent = () => {
    if (gridContainerRef.current) {
      return {
        maxTop:
          gridContainerRef.current.scrollHeight -
          gridContainerRef.current.clientHeight,
        maxLeft:
          gridContainerRef.current.scrollWidth -
          gridContainerRef.current.clientWidth,
      };
    }
    return { maxTop: 0, maxLeft: 0 };
  };

  // Expose the scroll methods to the parent via the ref
  useEffect(() => {
    if (scrollControllerRef && gridContainerRef.current) {
      scrollControllerRef.current = {
        scrollToTop,
        scrollToBottom,
        scrollBy,
        scrollTo,
        getCurrentScrollPosition,
        getMaxScrollExtent,
      };
    }
  }, [scrollControllerRef]);

  return (
    <div className={className} style={gridStyle} ref={gridContainerRef}>
      {Array.from({ length: itemCount }, (_, index) => (
        <div key={index} style={{ height: mainAxisExtent }}>
          {itemBuilder(index)} {/* Render each item using the itemBuilder */}
        </div>
      ))}
    </div>
  );
};

export default GridViewBuilder;
