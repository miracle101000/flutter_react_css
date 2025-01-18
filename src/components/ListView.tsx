import React from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type ListViewProps = {
  /** Children elements to render in the list */
  children: React.ReactNode;
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
 * A ListView component that renders children elements as a list.
 */
const ListView: React.FC<ListViewProps> = ({
  children,
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
      {children}
    </div>
  );
};

export default ListView;
