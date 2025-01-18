import React from "react";

type SizedBoxProps = {
  /** Width of the SizedBox */
  width?: string | number;
  /** Height of the SizedBox */
  height?: string | number;
  /** Horizontal space between elements */
  marginHorizontal?: string | number;
  /** Vertical space between elements */
  marginVertical?: string | number;
  /** Child element inside the SizedBox */
  children?: React.ReactNode;
  /** Additional inline styles */
  style?: React.CSSProperties;
};

/**
 * A component that enforces a fixed width and height for its children, similar to Flutter's SizedBox.
 *
 * Example usage:
 * ```tsx
 * <SizedBox width={100} height={100}>
 *   <div style={{ backgroundColor: 'lightblue' }}>
 *     This content is inside a SizedBox with a fixed width and height.
 *   </div>
 * </SizedBox>
 *
 * <SizedBox width="50%" height={200} />
 * ```
 */
const SizedBox: React.FC<SizedBoxProps> = ({
  width,
  height,
  marginHorizontal,
  marginVertical,
  children,
  style,
  ...props
}) => {
  const computedStyles: React.CSSProperties = {
    width: width || "auto", // Default to auto width
    height: height || "auto", // Default to auto height
    marginLeft: marginHorizontal, // Horizontal margin
    marginRight: marginHorizontal, // Horizontal margin
    marginTop: marginVertical, // Vertical margin
    marginBottom: marginVertical, // Vertical margin
    ...style, // Additional styles
  };

  return (
    <div style={computedStyles} {...props}>
      {children}
    </div>
  );
};

export default SizedBox;
