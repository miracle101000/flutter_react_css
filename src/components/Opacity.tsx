import React from "react";

type OpacityProps = {
  /** The opacity value between 0 (fully transparent) and 1 (fully opaque) */
  opacity: number;
  /** Child elements to apply opacity to */
  children?: React.ReactNode;
  /** Additional inline styles */
  style?: React.CSSProperties;
};

/**
 * A component that controls the transparency of its children.
 *
 * Example usage:
 * ```tsx
 * <Opacity opacity={0.5}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </Opacity>
 *
 * // With full opacity
 * <Opacity opacity={1}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }} />
 * </Opacity>
 *
 * // With fully transparent content
 * <Opacity opacity={0}>
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }} />
 * </Opacity>
 * ```
 */
const Opacity: React.FC<OpacityProps> = ({
  opacity,
  children,
  style,
  ...props
}) => {
  // Ensure opacity is between 0 and 1
  const computedOpacity = Math.min(Math.max(opacity, 0), 1);

  const computedStyles: React.CSSProperties = {
    opacity: computedOpacity, // Apply the opacity
    ...style, // Additional styles
  };

  return (
    <div style={computedStyles} {...props}>
      {children}
    </div>
  );
};

export default Opacity;
