import React from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type ListViewBuilderProps = {
  /** The number of items in the list */
  itemCount: number;
  /** A function that builds the item for a given index */
  itemBuilder: (index: number) => React.ReactNode;
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
 * A ListView.Builder component that renders a list of items based on a builder function.
 */
const ListViewBuilder: React.FC<ListViewBuilderProps> = ({
  itemCount,
  itemBuilder,
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
        <div key={index}>
          {itemBuilder(index)} {/* Render each item using the itemBuilder */}
        </div>
      ))}
    </div>
  );
};

export default ListViewBuilder;
