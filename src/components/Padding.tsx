import React from "react";

type PaddingProps = {
  /** Padding for the top side */
  paddingTop?: string | number;
  /** Padding for the right side */
  paddingRight?: string | number;
  /** Padding for the bottom side */
  paddingBottom?: string | number;
  /** Padding for the left side */
  paddingLeft?: string | number;
  /** Uniform padding for all sides */
  padding?: string | number;
  /** Child elements to wrap with padding */
  children?: React.ReactNode;
  /** Additional inline styles */
  style?: React.CSSProperties;
};

/**
 * A component that applies padding around its children.
 *
 * Example usage:
 * ```tsx
 * <Padding padding="20px">
 *   <div style={{ backgroundColor: 'lightblue' }}>This div has 20px of padding around it.</div>
 * </Padding>
 *
 * <Padding padding="10px 20px">
 *   <div style={{ backgroundColor: 'lightgreen' }}>This div has 10px of padding on top and bottom, 20px on left and right.</div>
 * </Padding>
 * ```
 */
const Padding: React.FC<PaddingProps> = ({
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  padding,
  children,
  style,
  ...props
}) => {
  const computedStyles: React.CSSProperties = {
    paddingTop: paddingTop || padding, // Apply paddingTop if defined, else use general padding
    paddingRight: paddingRight || padding, // Apply paddingRight if defined, else use general padding
    paddingBottom: paddingBottom || padding, // Apply paddingBottom if defined, else use general padding
    paddingLeft: paddingLeft || padding, // Apply paddingLeft if defined, else use general padding
    ...style, // Additional styles
  };

  return (
    <div style={computedStyles} {...props}>
      {children}
    </div>
  );
};

export default Padding;
