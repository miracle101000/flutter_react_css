import React from "react";

interface TransformTranslateProps {
  offsetX: number;
  offsetY: number;
  children: React.ReactNode;
}

/**
 * A component that translates (moves) its children by specified offsets, similar to Flutter's Transform.translate.
 *
 * @param offsetX - The translation distance along the X-axis (in pixels).
 * @param offsetY - The translation distance along the Y-axis (in pixels).
 * @param children - The content to apply the translation to.
 *
 * Example usage:
 * ```tsx
 * <TransformTranslate offsetX={20} offsetY={30}>
 *   <div style={{ width: 100, height: 100, backgroundColor: "orange" }} />
 * </TransformTranslate>
 * ```
 */
export const TransformTranslate: React.FC<TransformTranslateProps> = ({
  offsetX,
  offsetY,
  children,
}) => {
  return (
    <div
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export default TransformTranslate;
