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
 * A GridView component that renders children elements as a grid.
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
