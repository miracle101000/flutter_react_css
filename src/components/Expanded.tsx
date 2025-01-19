import React from "react";

/**
 * A component that expands to fill the available space within a flex container,
 * with an optional flex property to specify the portion of the space to occupy.
 * Similar to Flutter's `Expanded` widget.
 *
 * @param flex - The flex value determining how much space the component takes up (default: 1).
 *
 * Example usage:
 * ```tsx
 * import { Expanded } from 'flutter-react-css';
 *
 * const MyComponent = () => (
 *   <div style={{ display: 'flex', flexDirection: 'row' }}>
 *     <div>Item 1</div>
 *     <Expanded flex={2}>
 *       <div>Item 2 (Expanded with flex 2)</div>
 *     </Expanded>
 *     <Expanded>
 *       <div>Item 3 (Expanded with flex 1)</div>
 *     </Expanded>
 *     <div>Item 4</div>
 *   </div>
 * );
 * ```
 */
const Expanded: React.FC<{ children: React.ReactNode; flex?: number }> = ({
  children,
  flex = 1,
}) => <div style={{ flex: flex }}>{children}</div>;

export default Expanded;
