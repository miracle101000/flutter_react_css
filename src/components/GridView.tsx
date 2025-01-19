import React, { useRef, useEffect, useState } from "react";

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

type GridViewProps = {
  /** Children elements to render in the grid */
  children: React.ReactNode;
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
  scrollControllerRef?: React.Ref<ScrollController>;
};

/**
 * A flexible and customizable grid layout component that arranges its children in a grid, with support for both vertical and horizontal scrolling, adjustable spacing, and configurable row/column sizes.
 * This component allows you to create responsive and dynamic grid layouts with options for controlling scrolling behavior, grid item sizes, and spacing between items.
 *
 * Example usage:
 * ```tsx
 * <GridView
 *   scrollDirection="vertical"
 *   physics="clamped"
 *   crossAxisCount={3}
 *   mainAxisExtent={100}
 *   spacing={20}
 *   scrollControllerRef={scrollControllerRef}
 * >
 *   <div style={{ backgroundColor: 'red', height: '100px' }} />
 *   <div style={{ backgroundColor: 'blue', height: '100px' }} />
 *   <div style={{ backgroundColor: 'green', height: '100px' }} />
 * </GridView>
 *
 * // Horizontal scrolling example
 * <GridView
 *   scrollDirection="horizontal"
 *   physics="auto"
 *   crossAxisCount={4}
 *   mainAxisExtent={200}
 *   spacing={10}
 *   scrollControllerRef={scrollControllerRef}
 * >
 *   <div style={{ backgroundColor: 'yellow', height: '100px' }} />
 *   <div style={{ backgroundColor: 'purple', height: '100px' }} />
 *   <div style={{ backgroundColor: 'orange', height: '100px' }} />
 * </GridView>
 * ```
 *
 * Properties:
 * - `children`: The content to be displayed inside the grid. This will be arranged into grid items.
 * - `style`: Custom inline styles to be applied to the grid container.
 * - `className`: Custom CSS class to be applied to the grid container.
 * - `scrollDirection`: Defines the direction of scrolling. Can be either "vertical" (default) or "horizontal".
 * - `physics`: Defines the scrolling behavior. Can be either:
 *   - `"auto"`: Enables scrolling when the content overflows.
 *   - `"never"`: Disables scrolling, hiding overflow content.
 *   - `"clamped"`: Similar to `"never"`, but limits overflow visibility.
 * - `crossAxisCount`: The number of columns (or rows for vertical direction) in the grid.
 * - `mainAxisExtent`: The fixed height (for vertical scroll) or width (for horizontal scroll) of each grid item.
 * - `spacing`: The space (in pixels) between the grid items.
 * - `scrollControllerRef`: A reference to control the grid's scroll programmatically. Allows scrolling to top, bottom, or other specific positions.
 */
const GridView: React.FC<GridViewProps> = ({
  children,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
  crossAxisCount,
  mainAxisExtent,
  spacing = 0,
  scrollControllerRef,
}) => {
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

  // Scroll container reference
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Methods for the ScrollController interface
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
    if (
      scrollControllerRef &&
      "current" in scrollControllerRef &&
      gridContainerRef.current
    ) {
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
      {React.Children.map(children, (child) => (
        <div style={{ height: mainAxisExtent }}>{child}</div> // Enforce mainAxisExtent here
      ))}
    </div>
  );
};

export default GridView;
