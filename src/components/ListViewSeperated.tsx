import React from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type ListViewSeparatedProps = {
  /** The number of items in the list */
  itemCount: number;
  /** A function that builds the item for a given index */
  itemBuilder: (index: number) => React.ReactNode;
  /** A function that builds the separator between items */
  separatorBuilder: () => React.ReactNode;
  /** Optional style for the list */
  style?: React.CSSProperties;
  /** Optional class name for the list */
  className?: string;
  /** Direction the list scrolls */
  scrollDirection?: ScrollDirection;
  /** Scroll physics of the list */
  physics?: ScrollPhysics;
};

/**
 * A ListView.Separated component that renders items with separators between them.
 */
const ListViewSeparated: React.FC<ListViewSeparatedProps> = ({
  itemCount,
  itemBuilder,
  separatorBuilder,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
}) => {
  const overflowStyle =
    scrollDirection === "horizontal" ? "overflow-x" : "overflow-y";
  const physicsStyle = physics === "never" ? "hidden" : "auto";

  return (
    <div
      className={className}
      style={{
        ...style,
        display: scrollDirection === "horizontal" ? "flex" : "block",
        [overflowStyle]: physicsStyle,
      }}
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <React.Fragment key={index}>
          {itemBuilder(index)} {/* Render each item */}
          {index < itemCount - 1 && separatorBuilder()}{" "}
          {/* Render separator except after the last item */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListViewSeparated;
