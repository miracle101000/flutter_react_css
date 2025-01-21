import React from "react";

// Interface for the IgnorePointer component
interface IgnorePointerProps {
  children: React.ReactNode;
  shouldIgnore?: boolean; // Whether to ignore pointer events
}

/**
 * A component that ignores pointer events for its children.
 *
 * Example usage:
 * ```tsx
 * <IgnorePointer shouldIgnore={true}>
 *   <div style={{ width: '200px', height: '200px', background: 'lightblue' }}>
 *     This box ignores pointer events (clicks, touches, etc.).
 *   </div>
 * </IgnorePointer>
 * ```
 *
 * The `shouldIgnore` prop determines whether pointer events are ignored for the children.
 * - When `shouldIgnore` is `true`, pointer events are disabled.
 * - When `shouldIgnore` is `false`, pointer events are enabled.
 */
const IgnorePointer: React.FC<IgnorePointerProps> = ({
  children,
  shouldIgnore = true,
}) => {
  // CSS styles for ignoring pointer events
  const style: React.CSSProperties = {
    pointerEvents: shouldIgnore ? "none" : "auto",
  };

  return <div style={style}>{children}</div>;
};

export default IgnorePointer;
