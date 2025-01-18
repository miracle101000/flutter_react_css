import React from "react";

type PositionedFillProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * A component that positions its child element to fill the entire parent container,
 * similar to Flutter's Positioned.fill.
 *
 * Example usage:
 * ```tsx
 * <div style={{ position: 'relative', width: '300px', height: '300px' }}>
 *   <PositionedFill>
 *     <div style={{ backgroundColor: 'lightblue' }}>
 *       This content fills the entire parent container.
 *     </div>
 *   </PositionedFill>
 * </div>
 * ```
 */
const PositionedFill: React.FC<PositionedFillProps> = ({ children, style }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PositionedFill;
