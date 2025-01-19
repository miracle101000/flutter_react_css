import React from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

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
 * Additionally, this component displays the total count of items within the grid.
 *
 * Example usage:
 * ```tsx
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
 * />
 * ```
 *
 * Properties:
 * - `itemCount`: The total number of items to render in the grid.
 * - `itemBuilder`: A function that returns a grid item (element) based on its index in the grid.
 * - `style`: Optional inline styles to be applied to the grid container.
 * - `className`: Custom CSS class to be applied to the grid container.
 * - `crossAxisCount`: The number of columns (or rows for vertical direction) in the grid.
 * - `mainAxisExtent`: The fixed height (for vertical scroll) or width (for horizontal scroll) of each grid item.
 * - `spacing`: The space (in pixels) between grid items.
 *
 * @example
 * ```tsx
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
          {itemBuilder(index)} {/* Render each item */}
        </div>
      ))}
    </div>
  );
};

export default GridViewCount;
