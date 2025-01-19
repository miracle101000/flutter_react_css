import React from "react";

interface FractionallySizedBoxProps {
  widthFactor?: number;
  heightFactor?: number;
  children: React.ReactNode;
}

/**
 * A component that sizes its children based on a fraction of the parent container's width and height.
 *
 * @param widthFactor - The fraction of the parent container's width to apply (e.g., 0.5 for 50% width).
 * @param heightFactor - The fraction of the parent container's height to apply (e.g., 0.5 for 50% height).
 * @param children - The content to be sized.
 *
 * Example usage:
 * ```tsx
 * <FractionallySizedBox widthFactor={0.5} heightFactor={0.3}>
 *   <div style={{ backgroundColor: "lightblue", height: "100%", width: "100%" }}>
 *     This is a fractionally sized box.
 *   </div>
 * </FractionallySizedBox>
 * ```
 */
const FractionallySizedBox: React.FC<FractionallySizedBoxProps> = ({
  widthFactor = 1,
  heightFactor = 1,
  children,
}) => {
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const [parentSize, setParentSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (parentRef.current) {
      const handleResize = () => {
        if (parentRef.current) {
          setParentSize({
            width: parentRef.current.offsetWidth,
            height: parentRef.current.offsetHeight,
          });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      ref={parentRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        style={{
          width: `${parentSize.width * widthFactor}px`,
          height: `${parentSize.height * heightFactor}px`,
          position: "absolute",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FractionallySizedBox;
