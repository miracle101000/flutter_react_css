import React, { useRef, useImperativeHandle, forwardRef } from "react";

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
  /** Optional callback for getting the scroll controller */
  scrollControllerRef?: React.Ref<ScrollController>;
};

/** Scroll controller interface */
interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

/**
 * A wrapper component that makes the content inside it scrollable if it overflows.
 *
 * Example usage:
 * ```tsx
 * const scrollRef = useRef<ScrollController>(null);
 *
 * <SingleChildScrollView ref={scrollRef} maxHeight="300px" style={{ border: '1px solid black' }}>
 *   <div style={{ height: '500px', backgroundColor: 'lightblue' }}>Content that overflows and will be scrollable.</div>
 * </SingleChildScrollView>
 *
 * // Control scroll position
 * scrollRef.current?.scrollToTop();
 * ```
 */
const SingleChildScrollView = forwardRef<
  ScrollController,
  SingleChildScrollViewProps
>(
  (
    {
      children,
      vertical = true,
      horizontal = false,
      scrollPhysics = "clamped",
      style,
      contentStyle,
      scrollControllerRef,
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

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

    // Expose the scroll controller methods using `useImperativeHandle`
    useImperativeHandle(scrollControllerRef, () => ({
      scrollToTop: () => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      },
      scrollToBottom: () => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      },
      scrollBy: (x, y) => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: x, top: y, behavior: "smooth" });
        }
      },
      scrollTo: (x, y) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: x, top: y, behavior: "smooth" });
        }
      },
      getCurrentScrollPosition: () => {
        return {
          top: scrollRef.current?.scrollTop || 0,
          left: scrollRef.current?.scrollLeft || 0,
        };
      },
      getMaxScrollExtent: () => {
        return {
          maxTop:
            (scrollRef.current?.scrollHeight ?? 0) -
              (scrollRef.current?.clientHeight || 0) || 0,
          maxLeft:
            (scrollRef.current?.scrollWidth ?? 0) -
            (scrollRef.current?.clientWidth ?? 0),
        };
      },
    }));

    return (
      <div
        ref={scrollRef}
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
  }
);

export default SingleChildScrollView;
