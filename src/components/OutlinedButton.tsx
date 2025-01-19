import React from "react";

/**
 * The `OutlinedButton` component in React replicates Flutter's OutlinedButton style.
 * It renders a button with a transparent background and a border, typically used for secondary actions.
 * You can customize the border for each side (top, left, right, bottom), along with other button styles like padding, background, etc.
 *
 * @param onClick - The event handler for the button click.
 * @param children - The content inside the button, such as text or icons.
 * @param borderTop - Optional border for the top side (default is "1px solid #000").
 * @param borderLeft - Optional border for the left side (default is "1px solid #000").
 * @param borderRight - Optional border for the right side (default is "1px solid #000").
 * @param borderBottom - Optional border for the bottom side (default is "1px solid #000").
 * @param backgroundColor - Optional background color (default is transparent).
 * @param color - Optional text color (default is black).
 * @param padding - Optional padding (default is "8px 16px").
 * @param borderRadius - Optional border radius (default is "4px").
 * @param fontSize - Optional font size (default is "16px").
 * @param fontWeight - Optional font weight (default is "500").
 * @param className - Optional class name(s) for custom styling.
 *
 * Example usage:
 * ```tsx
 * <OutlinedButton
 *   onClick={() => alert('Button Clicked')}
 *   borderTop="2px solid blue"
 *   borderLeft="2px solid green"
 *   borderRight="2px solid red"
 *   borderBottom="2px solid yellow"
 * >
 *   Custom Borders Button
 * </OutlinedButton>
 * ```
 */
const OutlinedButton: React.FC<{
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
  backgroundColor = "transparent", // Default background color
  color = "#000", // Default text color
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

export default OutlinedButton;
