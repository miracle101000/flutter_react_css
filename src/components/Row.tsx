import React from "react";

type RowProps = {
  /** Content inside the Row */
  children?: React.ReactNode;
  /** Horizontal alignment of the children (main axis alignment) */
  mainAxisAlignment?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /** Vertical alignment of the children (cross axis alignment) */
  crossAxisAlignment?: "start" | "end" | "center" | "stretch" | "baseline";
  /** Determines the size of the Row */
  mainAxisSize?: "max" | "min";
  /** The direction the row will be laid out in */
  textDirection?: "ltr" | "rtl";
  /** Defines the baseline alignment when crossAxisAlignment is 'baseline' */
  textBaseline?: "alphabetic" | "ideographic";
  /** Additional styles */
  style?: React.CSSProperties;
};

/**
 * A flex container that arranges children in a row (horizontal layout).
 *
 * Example usage:
 * ```tsx
 * <Row justifyContent="center" alignItems="center" gap={20} style={{ height: '100px' }}>
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'red' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'blue' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'green' }} />
 * </Row>
 *
 * // With space-between and gap
 * <Row justifyContent="space-between" gap={15} style={{ width: '100%' }}>
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'yellow' }} />
 *   <div style={{ width: '50px', height: '50px', backgroundColor: 'purple' }} />
 * </Row>
 * ```
 */

const Row: React.FC<RowProps> = ({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "stretch",
  mainAxisSize = "max",
  textDirection = "ltr",
  textBaseline,
  style,
  ...props
}) => {
  // Generate the CSS styles based on the properties
  const rowStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent:
      mainAxisAlignment === "start"
        ? "flex-start"
        : mainAxisAlignment === "end"
        ? "flex-end"
        : mainAxisAlignment === "center"
        ? "center"
        : mainAxisAlignment === "space-between"
        ? "space-between"
        : mainAxisAlignment === "space-around"
        ? "space-around"
        : "space-evenly", // default space-evenly
    alignItems:
      crossAxisAlignment === "start"
        ? "flex-start"
        : crossAxisAlignment === "end"
        ? "flex-end"
        : crossAxisAlignment === "center"
        ? "center"
        : crossAxisAlignment === "stretch"
        ? "stretch"
        : crossAxisAlignment === "baseline"
        ? "baseline"
        : "stretch", // default stretch
    flexWrap: "nowrap",
    flexBasis: mainAxisSize === "min" ? "min-content" : "auto", // Default flexBasis to auto if mainAxisSize is max
    direction: textDirection, // Sets text direction (ltr or rtl)
    ...(textBaseline && { alignItems: "baseline" }), // Handles baseline alignment
    ...style, // Apply any external styles passed to the Row
  };

  return (
    <div style={rowStyle} {...props}>
      {children}
    </div>
  );
};

export default Row;
