import React from "react";

interface AspectRatioProps {
  aspectRatio: number; // aspect ratio as width/height
  children: React.ReactNode;
}

/**
 * A component that maintains a consistent aspect ratio for its children.
 * The width of the component is set to 100%, and the height adjusts based on the aspect ratio.
 *
 * @param aspectRatio - The desired aspect ratio (width/height). For example, 16/9 for a widescreen.
 * @param children - The content that should maintain the aspect ratio.
 *
 * Example usage:
 * ```tsx
 * <AspectRatio aspectRatio={16 / 9}>
 *   <div style={{ backgroundColor: "lightcoral", height: "100%", width: "100%" }}>
 *     This container maintains a 16:9 aspect ratio.
 *   </div>
 * </AspectRatio>
 * ```
 */
const AspectRatio: React.FC<AspectRatioProps> = ({ aspectRatio, children }) => {
  const [parentWidth, setParentWidth] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const resizeHandler = () => {
      if (containerRef.current) {
        setParentWidth(containerRef.current.offsetWidth);
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${parentWidth / aspectRatio}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectRatio;
