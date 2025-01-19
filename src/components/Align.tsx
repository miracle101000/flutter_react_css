import React from "react";

type AlignProps = {
  children: React.ReactNode;
  alignment: "start" | "center" | "end";
  axis: "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
};

/**
 * The `Align` component allows you to align its children along a specific axis, either horizontally or vertically.
 * It uses CSS Flexbox and the `alignItems` or `justifyContent` properties based on the specified `alignment` prop.
 * The component provides flexibility in aligning content in any direction within the container.
 *
 * Example usage:
 * ```tsx
 * <Align alignment="center">
 *   <div>Aligned Content</div>
 * </Align>
 * ```
 *
 * Properties:
 * - `children`: The content to be aligned inside the container.
 * - `alignment`: Defines the alignment direction. Can be one of:
 *   - `"start"`: Aligns children to the start (left or top).
 *   - `"center"`: Aligns children to the center.
 *   - `"end"`: Aligns children to the end (right or bottom).
 *   - `"stretch"`: Stretches children to fill the container.
 * - `style`: Optional additional inline styles to apply to the container.
 * - `className`: Optional class name(s) to apply to the container for custom styling.
 */
const Align: React.FC<AlignProps> = ({
  children,
  alignment = "center",
  axis = "horizontal",
  style,
  className,
}) => {
  // Determine the CSS alignment properties based on the axis and alignment prop
  const justifyContent = axis === "horizontal" ? alignment : undefined;
  const alignItems = axis === "vertical" ? alignment : undefined;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: justifyContent,
        alignItems: alignItems,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Align;
