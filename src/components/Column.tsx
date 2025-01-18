import React from "react";

type ColumnProps = {
  /** Content inside the Column */
  children?: React.ReactNode;
  /** Padding inside the Column */
  padding?: number | string;
  /** Margin outside the Column */
  margin?: number | string;
  /** Main axis alignment (vertical) */
  mainAxisAlignment?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  /** Cross axis alignment (horizontal) */
  crossAxisAlignment?: "flex-start" | "center" | "flex-end" | "stretch";
  /** Width of the Column */
  width?: string | number;
  /** Height of the Column */
  height?: string | number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** HTML element type (e.g., div, section, article) */
  as?: React.ElementType;
};

/**
 * A flex container that arranges children in a column (vertical layout).
 *
 * Example usage:
 * ```tsx
 * <Column justifyContent="center" alignItems="center" gap={20} style={{ height: '200px' }}>
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'red' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'blue' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'green' }} />
 * </Column>
 *
 * // With space-evenly and gap
 * <Column justifyContent="space-evenly" gap={15} style={{ height: '300px' }}>
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'yellow' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'purple' }} />
 * </Column>
 * ```
 */
const Column: React.FC<ColumnProps> = ({
  children,
  padding,
  margin,
  mainAxisAlignment = "flex-start",
  crossAxisAlignment = "stretch",
  width,
  height,
  style,
  as = "div",
  ...props
}) => {
  const computedStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: mainAxisAlignment, // Vertical alignment (main axis)
    alignItems: crossAxisAlignment, // Horizontal alignment (cross axis)
    padding: padding || "0", // Default to no padding
    margin: margin || "0", // Default to no margin
    width: width || "auto", // Default to auto width
    height: height || "auto", // Default to auto height
    ...style,
  };

  const Element = as;

  return (
    <Element style={computedStyles} {...props}>
      {children}
    </Element>
  );
};

export default Column;
