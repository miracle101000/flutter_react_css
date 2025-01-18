import React from "react";

type PositionedProps = {
  /** Position from the top */
  top?: number;
  /** Position from the left */
  left?: number;
  /** Position from the right */
  right?: number;
  /** Position from the bottom */
  bottom?: number;
  /** The child component to be positioned */
  children?: React.ReactNode;
  /** Custom styles */
  style?: React.CSSProperties;
};

/**
 * A component that allows positioning of its children within a parent container.
 * It works similar to Flutter's Positioned widget.
 *
 * Example usage:
 * ```tsx
 * <div style={{ position: 'relative', width: '300px', height: '300px' }}>
 *   <Positioned top={10} left={10}>
 *     <div style={{ width: '100px', height: '100px', backgroundColor: 'lightblue' }}>
 *       Positioned content
 *     </div>
 *   </Positioned>
 * </div>
 *
 * <div style={{ position: 'relative', width: '300px', height: '300px' }}>
 *   <Positioned bottom={20} right={20}>
 *     <div style={{ width: '100px', height: '100px', backgroundColor: 'lightgreen' }}>
 *       Positioned content at the bottom-right
 *     </div>
 *   </Positioned>
 * </div>
 * ```
 */
const Positioned: React.FC<PositionedProps> = ({
  top,
  left,
  right,
  bottom,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: top !== undefined ? `${top}px` : undefined,
        left: left !== undefined ? `${left}px` : undefined,
        right: right !== undefined ? `${right}px` : undefined,
        bottom: bottom !== undefined ? `${bottom}px` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Positioned;
