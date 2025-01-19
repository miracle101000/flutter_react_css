import React from "react";

/**
 * A component that creates empty space within a flex container.
 * Similar to Flutter's `Spacer` widget.
 *
 * Example usage:
 * ```tsx
 * import { Spacer } from 'flutter-react-css';
 *
 * const MyComponent = () => (
 *   <div style={{ display: 'flex', flexDirection: 'row' }}>
 *     <div>Item 1</div>
 *     <Spacer />
 *     <div>Item 2</div>
 *   </div>
 * );
 * ```
 */
const Spacer: React.FC = () => <div style={{ flex: 1 }} />;

export default Spacer;
