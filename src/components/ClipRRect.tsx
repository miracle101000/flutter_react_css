import React from "react";

interface ClipRRectProps {
  radius: number;
  clipBehavior: "antiAlias" | "hardEdge";
  children: React.ReactNode;
}

/**
 * A widget that clips its child into a rounded rectangle. This is useful for creating rounded corners on any widget.
 * You can adjust the border radius and other clip behaviors.
 *
 * Example usage:
 * ```tsx
 * <ClipRRect
 *   radius={20} // Border radius for rounded corners
 *   clipBehavior="antiAlias" // The clipping behavior
 * >
 *   <img src="image.jpg" alt="Image" />
 * </ClipRRect>
 * ```
 *
 * Properties:
 * - `radius`: The radius of the rounded corners.
 * - `clipBehavior`: The behavior of the clipping. Options: "antiAlias", "hardEdge".
 */
const ClipRRect = ({ radius, clipBehavior, children }: ClipRRectProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: `${radius}px`,
        clipPath: clipBehavior === "antiAlias" ? "inherit" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default ClipRRect;
