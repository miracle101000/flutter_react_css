import React from "react";

interface CircularProgressIndicatorProps {
  size: number;
  color: string;
  thickness: number;
  indeterminate: boolean;
}

/**
 * A circular loading indicator that shows the progress of an ongoing task.
 * You can customize the size, color, and thickness of the progress indicator.
 *
 * Example usage:
 * ```tsx
 * <CircularProgressIndicator
 *   size={50} // Size of the circular progress indicator
 *   color="blue" // Color of the progress indicator
 *   thickness={5} // Thickness of the circular line
 *   indeterminate={true} // Whether the progress indicator is indeterminate (no progress value)
 * />
 * ```
 *
 * Properties:
 * - `size`: The diameter of the progress indicator.
 * - `color`: The color of the circular progress indicator.
 * - `thickness`: The thickness of the circular progress indicator line.
 * - `indeterminate`: Whether the progress indicator is indeterminate (no specific progress value is shown).
 */
const CircularProgressIndicator = ({
  size,
  color,
  thickness,
  indeterminate,
}: CircularProgressIndicatorProps) => {
  const circleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    border: `${thickness}px solid ${color}`,
    borderTop: `${thickness}px solid transparent`,
    animation: indeterminate ? "spin 1.5s linear infinite" : undefined,
  };

  return <div style={circleStyle} />;
};

export default CircularProgressIndicator;
