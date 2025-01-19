import React from "react";

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
      {Array.from({ length: itemCount }, (_, index) => (
        <div key={index} style={{ height: mainAxisExtent }}>
          {itemBuilder(index)} {/* Render each item using the itemBuilder */}
        </div>
      ))}
    </div>
  );
};

export default GridViewBuilder;
