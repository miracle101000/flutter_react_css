/**
 * A component that rotates its children by a specified angle, similar to Flutter's Transform.rotate.
 *
 * @param angle - The rotation angle in degrees (e.g., 45 for a 45-degree rotation).
 * @param origin - (Optional) The transform origin, specifying the pivot point. Defaults to "center".
 * @param children - The content to apply the rotation to.
 *
 * Example usage:
 * ```tsx
 * <TransformRotate angle={45} origin="center">
 *   <div style={{ width: 100, height: 100, backgroundColor: "green" }} />
 * </TransformRotate>
 * ```
 */
import React from "react";

interface TransformRotateProps {
  angle: number;
  origin?: string;
  children: React.ReactNode;
}

export const TransformRotate: React.FC<TransformRotateProps> = ({
  angle,
  origin = "center",
  children,
}) => {
  return (
    <div
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: origin,
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export default TransformRotate;
