import React from "react";

/**
 * The `CupertinoButton` component replicates Flutter's CupertinoButton style.
 * It includes an opacity effect on hover and active states, making it resemble the iOS button behavior.
 * It renders a flat button with iOS-like design and is customizable with borders, background, and other styles.
 *
 * @param onClick - The event handler for the button click.
 * @param children - The content inside the button, such as text or icons.
 * @param borderTop - Optional border for the top side (default is "1px solid #000").
 * @param borderLeft - Optional border for the left side (default is "1px solid #000").
 * @param borderRight - Optional border for the right side (default is "1px solid #000").
 * @param borderBottom - Optional border for the bottom side (default is "1px solid #000").
 * @param backgroundColor - Optional background color (default is "#007AFF").
 * @param color - Optional text color (default is white).
 * @param padding - Optional padding (default is "8px 16px").
 * @param borderRadius - Optional border radius (default is "4px").
 * @param fontSize - Optional font size (default is "16px").
 * @param fontWeight - Optional font weight (default is "500").
 * @param opacity - Optional opacity for hover and active states (default is 0.8 for hover, 0.6 for active).
 * @param className - Optional class name(s) for custom styling.
 *
 * Example usage:
 * ```tsx
 * <CupertinoButton
 *   onClick={() => alert('Button Clicked')}
 *   borderTop="2px solid blue"
 *   borderLeft="2px solid green"
 *   borderRight="2px solid red"
 *   borderBottom="2px solid yellow"
 *   opacity={0.9}
 * >
 *   Custom Cupertino Button
 * </CupertinoButton>
 * ```
 */
const CupertinoButton: React.FC<{
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
  opacity?: number; // Optional opacity for hover and active states
  className?: string;
}> = ({
  onClick,
  children,
  borderTop = "1px solid #000", // Default top border
  borderLeft = "1px solid #000", // Default left border
  borderRight = "1px solid #000", // Default right border
  borderBottom = "1px solid #000", // Default bottom border
  backgroundColor = "#007AFF", // Default background color (blue)
  color = "#fff", // Default text color (white)
  padding = "8px 16px", // Default padding
  borderRadius = "4px", // Default border radius
  fontSize = "16px", // Default font size
  fontWeight = "500", // Default font weight
  opacity = 0.8, // Default opacity on hover
  className,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        borderTop: borderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        borderBottom: borderBottom,
        backgroundColor: isActive
          ? `rgba(0, 122, 255, ${opacity * 0.6})` // Active state opacity
          : isHovered
          ? `rgba(0, 122, 255, ${opacity})` // Hover state opacity
          : backgroundColor,
        color: color,
        padding: padding,
        cursor: "pointer",
        borderRadius: borderRadius,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSize,
        fontWeight: fontWeight,
        textTransform: "uppercase", // iOS button text style
        transition: "background-color 0.3s ease, opacity 0.3s ease", // Smooth transition for hover and active states
        opacity: isHovered || isActive ? 0.8 : 1, // Reduce opacity when hovered or clicked
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default CupertinoButton;
