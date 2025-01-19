import React from "react";

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

  return (
    <div className={className} style={gridStyle}>
      {React.Children.map(children, (child) => (
        <div style={{ height: mainAxisExtent }}>{child}</div> // Enforce mainAxisExtent here
      ))}
    </div>
  );
};

export default GridView;
