import React from "react";

type ScrollPhysics = "clamped" | "bouncy" | "neverScroll";

type SingleChildScrollViewProps = {
  /** The content to be wrapped in the scroll view */
  children?: React.ReactNode;
  /** Enables vertical scrolling */
  vertical?: boolean;
  /** Enables horizontal scrolling */
  horizontal?: boolean;
  /** Custom scroll physics: "clamped", "bouncy", or "neverScroll" */
  scrollPhysics?: ScrollPhysics;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Custom inline styling for the scrollable content */
  contentStyle?: React.CSSProperties;
};

/**
 * A wrapper component that makes the content inside it scrollable if it overflows.
 *
 * Example usage:
 * ```tsx
 * <SingleChildScrollView maxHeight="300px" style={{ border: '1px solid black' }}>
 *   <div style={{ height: '500px', backgroundColor: 'lightblue' }}>Content that overflows and will be scrollable.</div>
 * </SingleChildScrollView>
 *
 * // Horizontal scroll
 * <SingleChildScrollView direction="horizontal" style={{ border: '1px solid black' }}>
 *   <div style={{ width: '1000px', height: '100px', backgroundColor: 'lightgreen' }}>Wide content that overflows horizontally.</div>
 * </SingleChildScrollView>
 * ```
 */
const SingleChildScrollView: React.FC<SingleChildScrollViewProps> = ({
  children,
  vertical = true,
  horizontal = false,
  scrollPhysics = "clamped",
  style,
  contentStyle,
}) => {
  // Adjust scroll behavior based on scrollPhysics prop
  let overflowX: React.CSSProperties["overflowX"] = "hidden";
  let overflowY: React.CSSProperties["overflowY"] = "hidden";
  let scrollBehavior: ScrollBehavior = "auto";

  // Set scroll properties based on chosen physics and directions
  if (vertical) overflowY = "auto";
  if (horizontal) overflowX = "auto";

  if (scrollPhysics === "clamped") {
    scrollBehavior = "smooth";
  } else if (scrollPhysics === "bouncy") {
    scrollBehavior = "smooth";
  } else if (scrollPhysics === "neverScroll") {
    overflowY = "hidden";
    overflowX = "hidden";
  }

  // Add bounce effect via CSS for bouncy scroll
  const bounceStyle =
    scrollPhysics === "bouncy"
      ? {
          WebkitOverflowScrolling:
            "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        }
      : {};

  return (
    <div
      style={{
        ...style,
        overflowX: overflowX,
        overflowY: overflowY,
        scrollBehavior: scrollBehavior,
        ...bounceStyle,
      }}
    >
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default SingleChildScrollView;
