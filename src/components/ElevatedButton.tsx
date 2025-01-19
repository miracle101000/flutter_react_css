import React from "react";

/**
 * The `ElevatedButton` component in React replicates Flutter's ElevatedButton style.
 * It renders a button with a raised, elevated appearance, commonly used for primary actions.
 * You can customize the border for each side (top, left, right, bottom), along with other button styles like padding, background, etc.
 *
 * @param onClick - The event handler for the button click.
 * @param children - The content inside the button, such as text or icons.
 * @param borderTop - Optional border for the top side (default is "1px solid #000").
 * @param borderLeft - Optional border for the left side (default is "1px solid #000").
 * @param borderRight - Optional border for the right side (default is "1px solid #000").
 * @param borderBottom - Optional border for the bottom side (default is "1px solid #000").
 * @param backgroundColor - Optional background color (default is "#6200ee").
 * @param color - Optional text color (default is white).
 * @param padding - Optional padding (default is "8px 16px").
 * @param borderRadius - Optional border radius (default is "4px").
 * @param fontSize - Optional font size (default is "16px").
 * @param fontWeight - Optional font weight (default is "500").
 * @param className - Optional class name(s) for custom styling.
 *
 * Example usage:
 * ```tsx
 * <ElevatedButton
 *   onClick={() => alert('Button Clicked')}
 *   borderTop="2px solid blue"
 *   borderLeft="2px solid green"
 *   borderRight="2px solid red"
 *   borderBottom="2px solid yellow"
 * >
 *   Custom Elevated Button
 * </ElevatedButton>
 * ```
 */
const ElevatedButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  borderTop?: string;
  borderLeft?: string;
  borderRight?: string;
  borderBottom?: string;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}> = ({
  onClick,
  children,
  borderTop = "1px solid #000", // Default top border
  borderLeft = "1px solid #000", // Default left border
  borderRight = "1px solid #000", // Default right border
  borderBottom = "1px solid #000", // Default bottom border
  backgroundColor = "#6200ee", // Default background color (purple)
  color = "#fff", // Default text color (white)
  padding = "8px 16px", // Default padding
  borderRadius = "4px", // Default border radius
  fontSize = "16px", // Default font size
  fontWeight = "500", // Default font weight
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        borderTop: borderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        borderBottom: borderBottom,
        backgroundColor: backgroundColor,
        color: color,
        padding: padding,
        cursor: "pointer",
        borderRadius: borderRadius,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Simulate elevation
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default ElevatedButton;
