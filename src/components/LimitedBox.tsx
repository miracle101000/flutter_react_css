import React from "react";

interface LimitedBoxProps {
  maxWidth?: number;
  maxHeight?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * A customizable component that limits its size based on the `maxWidth` and `maxHeight` properties.
 * It applies the maximum size limits only when the parent does not provide specific constraints.
 * Ideal for cases where you want to ensure a box does not exceed a certain size but can shrink based on
 * its content or parent container.
 *
 * Example usage:
 * ```tsx
 * <LimitedBox
 *   maxWidth={300}
 *   maxHeight={200}
 *   style={{ border: "1px solid black", padding: "10px" }}
 * >
 *   <div>This content is inside a box with limited size.</div>
 * </LimitedBox>
 * ```
 *
 * Properties:
 * - `maxWidth`: The maximum width of the box. Defaults to `Infinity` if not provided.
 * - `maxHeight`: The maximum height of the box. Defaults to `Infinity` if not provided.
 * - `children`: The content to be rendered inside the box.
 * - `style`: Optional additional inline styles to apply to the box.
 */
const LimitedBox: React.FC<LimitedBoxProps> = ({
  maxWidth = Infinity,
  maxHeight = Infinity,
  children,
  style,
}) => {
  const boxStyle: React.CSSProperties = {
    ...style,
    maxWidth: maxWidth === Infinity ? undefined : maxWidth,
    maxHeight: maxHeight === Infinity ? undefined : maxHeight,
  };

  return <div style={boxStyle}>{children}</div>;
};

export default LimitedBox;
