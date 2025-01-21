import React from "react";

interface ConstrainedBoxProps {
  constraints: {
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
  };
  children?: React.ReactNode;
}

/**
 * A component that imposes additional layout constraints on its children.
 * This component allows you to define maximum and minimum width/height for its child elements,
 * mimicking the behavior of Flutter's `ConstrainedBox` widget.
 *
 * Example usage:
 * ```tsx
 * <ConstrainedBox constraints={{ maxWidth: '200px', minHeight: '100px' }}>
 *   <div style={{ backgroundColor: 'blue', padding: '10px' }}>Hello World</div>
 * </ConstrainedBox>
 * ```
 *
 * Properties:
 * - `constraints`: An object defining the layout constraints to apply. It can include:
 *   - `maxWidth`: The maximum width allowed for the child element (e.g., "200px").
 *   - `maxHeight`: The maximum height allowed for the child element (e.g., "400px").
 *   - `minWidth`: The minimum width allowed for the child element (e.g., "100px").
 *   - `minHeight`: The minimum height allowed for the child element (e.g., "50px").
 * - `children`: The content to be rendered inside the constrained layout.
 *
 * Notes:
 * - This component wraps its children in a `<div>` and applies the specified constraints as inline styles.
 * - You can combine it with other styles to create flexible and responsive layouts.
 */
const ConstrainedBox: React.FC<ConstrainedBoxProps> = ({
  constraints,
  children,
}) => {
  // Convert constraints to a style object
  const style: React.CSSProperties = {
    maxWidth: constraints.maxWidth,
    maxHeight: constraints.maxHeight,
    minWidth: constraints.minWidth,
    minHeight: constraints.minHeight,
  };

  return <div style={style}>{children}</div>;
};

export default ConstrainedBox;
