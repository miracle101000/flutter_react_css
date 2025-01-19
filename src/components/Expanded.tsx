import React from "react";

/**
 * A component that expands to fill the available space within a flex container.
 * Similar to Flutter's `Expanded` widget.
 *
 * Example usage:
 * ```tsx
 * import { Expanded } from 'flutter-react-css';
 *
 * const MyComponent = () => (
 *   <div style={{ display: 'flex', flexDirection: 'row' }}>
 *     <div>Item 1</div>
 *     <Expanded>
 *       <div>Item 2 (Expanded)</div>
 *     </Expanded>
 *     <div>Item 3</div>
 *   </div>
 * );
 * ```
 */
const Expanded: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
);

export default Expanded;
