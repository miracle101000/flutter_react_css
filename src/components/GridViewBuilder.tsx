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
 * A GridView.Builder component that renders a grid of items based on a builder function.
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
