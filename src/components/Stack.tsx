import React from "react";

type StackProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Stack component that positions children on top of each other.
 *
 * Example usage:
 * ```tsx
 * <Stack style={{ width: '300px', height: '300px', backgroundColor: 'lightblue' }}>
 *   <Positioned top={20} left={10}>
 *     <div style={{ width: '50px', height: '50px', backgroundColor: 'red' }} />
 *   </Positioned>
 *   <PositionedFill>
 *     <div
 *       style={{
 *         backgroundColor: 'green',
 *         opacity: 0.5,
 *         height: '100%',
 *         width: '100%',
 *       }}
 *     />
 *   </PositionedFill>
 * </Stack>
 * ```
 */
const Stack: React.FC<StackProps> = ({ children, style }) => {
  return <div style={{ position: "relative", ...style }}>{children}</div>;
};

export default Stack;
