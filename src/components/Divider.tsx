import React from "react";

interface DividerProps {
  color: string;
  thickness: number;
  spacing: number;
  dashed: boolean;
}

/**
 * A simple horizontal line that can be used to separate content in a layout.
 * You can customize the thickness, color, and spacing of the divider.
 *
 * Example usage:
 * ```tsx
 * <Divider
 *   color="red" // Color of the divider line
 *   thickness={2} // Thickness of the divider line
 *   spacing={20} // Spacing between the divider and adjacent content
 *   dashed={true} // Whether the divider should be dashed or solid
 * />
 * ```
 *
 * Properties:
 * - `color`: The color of the divider line.
 * - `thickness`: The thickness of the divider line.
 * - `spacing`: The space around the divider to other elements.
 * - `dashed`: Whether the divider should be rendered as dashed or solid.
 */
const Divider = ({ color, thickness, spacing, dashed }: DividerProps) => {
  return (
    <div
      style={{
        margin: `${spacing}px 0`,
        borderBottom: dashed
          ? `dashed ${thickness}px ${color}`
          : `${thickness}px solid ${color}`,
      }}
    />
  );
};

export default Divider;
