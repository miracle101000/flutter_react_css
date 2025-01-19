import React from "react";

interface TransformProps {
  transform: string; // CSS transform string
  origin?: string; // Transform origin (pivot point)
  children: React.ReactNode;
}

/**
 * A generic component that applies a CSS transform to its children,
 * allowing for custom transformations like rotation, scaling, skewing, and more.
 *
 * @param transform - A CSS transform string (e.g., "rotate(45deg) scale(1.5)").
 * @param origin - (Optional) The transform origin, specifying the pivot point. Defaults to "center".
 * @param children - The content to apply the transform to.
 *
 * Example usage:
 * ```tsx
 * <Transform transform="rotate(45deg) scale(1.5)" origin="center">
 *   <div style={{ width: 100, height: 100, backgroundColor: "blue" }} />
 * </Transform>
 * ```
 */
export const Transform: React.FC<TransformProps> = ({
  transform,
  origin = "center",
  children,
}) => {
  return (
    <div
      style={{
        transform,
        transformOrigin: origin,
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export default Transform;
