/**
 * A component that scales its children by a specified factor, similar to Flutter's Transform.scale.
 *
 * @param scale - The scaling factor (e.g., 1.5 for 150% scale).
 * @param origin - (Optional) The transform origin, specifying the pivot point. Defaults to "center".
 * @param children - The content to apply the scaling to.
 *
 * Example usage:
 * ```tsx
 * <TransformScale scale={1.5} origin="center">
 *   <div style={{ width: 50, height: 50, backgroundColor: "red" }} />
 * </TransformScale>
 * ```
 */
import React from "react";

interface TransformScaleProps {
  scale: number;
  origin?: string;
  children: React.ReactNode;
}

export const TransformScale: React.FC<TransformScaleProps> = ({
  scale,
  origin = "center",
  children,
}) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: origin,
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export default TransformScale;
