import React from "react";

type CenterProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

/**
 * The `Center` component centers its children both horizontally and vertically
 * within the container using CSS Flexbox.
 * It sets the `justifyContent` and `alignItems` properties to `center` and
 * ensures the container takes up the full width and height available.
 *
 * This is useful for centering content inside a parent container in a responsive
 * and flexible manner.
 *
 * Example usage:
 * ```tsx
 * <Center>
 *   <div>Centered Content</div>
 * </Center>
 * ```
 *
 * Properties:
 * - `children`: The content to be centered inside the container.
 * - `style`: Optional additional inline styles to apply to the container.
 * - `className`: Optional class name(s) to apply to the container for custom styling.
 */
const Center: React.FC<CenterProps> = ({ children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Center;
