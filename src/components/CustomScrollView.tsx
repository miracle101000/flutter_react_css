import React, { useRef, useState, useImperativeHandle } from "react";

interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

// Define types for the props to ensure flexibility
interface CustomScrollViewProps {
  scrollDirection?: "vertical" | "horizontal";
  reverse?: boolean;
  controller?: React.Ref<ScrollController>;
  physics?: "bouncy" | "never" | "clamped";
  slivers: React.ReactNode[];
  scrollBehavior?: "auto" | "smooth";
  clipBehavior?: "none" | "hardEdge";
  hitTestBehavior?: "none" | "opaque";
  style?: React.CSSProperties;
  onScrollPositionChange?: (position: { top: number; left: number }) => void;
  sliverFillRemaining?: boolean; // New prop to enable sliver fill remaining
}
/**
 * A component that creates a customizable scrollable container, allowing you to add slivers (scrollable child elements)
 * and providing control over scroll behavior, physics, and layout.
 *
 * Example usage:
 * ```tsx
 * const scrollControllerRef = useRef<ScrollController>(null); // Create a ref to hold the scroll controller
 *
 * // Function to scroll to the top
 * const handleScrollToTop = () => {
 *   scrollControllerRef.current?.scrollToTop(); // Call the scrollToTop method on the controller
 * };
 *
 * // Function to scroll to the bottom
 * const handleScrollToBottom = () => {
 *   scrollControllerRef.current?.scrollToBottom(); // Call the scrollToBottom method on the controller
 * };
 *
 * return (
 *   <>
 *     <button onClick={handleScrollToTop}>Scroll to Top</button>
 *     <button onClick={handleScrollToBottom}>Scroll to Bottom</button>
 *
 *     <CustomScrollView
 *       scrollDirection="vertical"
 *       physics="bouncy"
 *       onScrollPositionChange={(position) => console.log('Current Scroll Position:', position)}
 *       controller={scrollControllerRef}
 *       slivers={[
 *         <div>Sliver 1 Content</div>,
 *         <div>Sliver 2 Content</div>,
 *         <div>Sliver 3 Content</div>,
 *       ]}
 *     />
 *   </>
 * );
 * ```
 *
 * **Props:**
 * - `scrollDirection`: Determines the direction of scrolling, either "vertical" or "horizontal".
 * - `reverse`: If `true`, the scrolling direction is reversed (useful for right-to-left layouts).
 * - `controller`: A ref object that provides methods to control the scroll view externally. It includes methods like `scrollToTop`, `scrollToBottom`, `scrollBy`, `scrollTo`, `getCurrentScrollPosition`, and `getMaxScrollExtent`.
 * - `physics`: Defines how the scroll behaves (e.g., "bouncy", "never", "clamped").
 * - `slivers`: An array of child elements (slivers) that are rendered inside the scroll view.
 * - `scrollBehavior`: Defines the scroll behavior when transitioning (e.g., "auto", "smooth").
 * - `clipBehavior`: Defines whether content should be clipped at the scroll view's edges ("none" or "hardEdge").
 * - `hitTestBehavior`: Defines whether the scroll view should intercept touch events ("none" or "opaque").
 * - `style`: Custom CSS styles to apply to the scroll view.
 * - `onScrollPositionChange`: Callback function that is triggered whenever the scroll position changes. It provides the current scroll position as an object with `top` and `left` values.
 * - `sliverFillRemaining`: If `true`, the last sliver (child element) fills the remaining space in the scroll view (similar to Flutter's `SliverFillRemaining`).
 *
 * **Controller Methods:**
 * - `scrollToTop()`: Programmatically scrolls the view to the top.
 * - `scrollToBottom()`: Programmatically scrolls the view to the bottom.
 * - `scrollBy(x: number, y: number)`: Scrolls the view by a certain amount in the X and Y direction.
 * - `scrollTo(x: number, y: number)`: Scrolls the view to a specific position (X, Y).
 * - `getCurrentScrollPosition()`: Retrieves the current scroll position of the view.
 * - `getMaxScrollExtent()`: Retrieves the maximum scrollable extent (max top and left) of the view.
 *
 * **Explanation:**
 * - The `controller` prop allows the parent component to control the scroll position programmatically.
 * - By passing a `ref` (e.g., `scrollControllerRef`) to the `controller` prop, the parent component can call methods like `scrollToTop()`, `scrollToBottom()`, and others to navigate the scroll view without directly manipulating the DOM.
 * - The `onScrollPositionChange` callback is triggered when the scroll position changes, providing the current position (top, left).
 * - The `sliverFillRemaining` prop ensures that the last sliver fills the remaining space in the scroll view (useful for dynamic layouts).
 * - The `scrollDirection` determines whether the scroll is horizontal or vertical, and the `physics` prop defines how the scroll behaves (e.g., bouncy or clamped).
 *
 * This approach offers both internal and external control over the scroll view, making it flexible for various use cases like custom scrolling behaviors and layout adjustments.
 */
const CustomScrollView: React.FC<CustomScrollViewProps> = ({
  scrollDirection = "vertical",
  reverse = false,
  controller,
  physics = "bouncy",
  slivers,
  scrollBehavior,
  clipBehavior = "hardEdge",
  hitTestBehavior = "opaque",
  style,
  onScrollPositionChange,
  sliverFillRemaining = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });

  // Expose the scroll methods via the controller ref
  useImperativeHandle(controller, () => ({
    scrollToTop: () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: scrollBehavior ?? "smooth",
        });
      }
    },
    scrollToBottom: () => {
      if (scrollRef.current) {
        const maxScroll = (controller &&
          "current" in controller &&
          controller.current?.getMaxScrollExtent()) ?? {
          maxTop: 0,
          maxLeft: 0,
        };
        scrollRef.current.scrollTo({
          top: maxScroll ? maxScroll.maxTop : 0,
          left: maxScroll ? maxScroll.maxLeft : 0,
          behavior: scrollBehavior ?? "smooth",
        });
      }
    },
    scrollBy: (x: number, y: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          top: y,
          left: x,
          behavior: scrollBehavior ?? "smooth",
        });
      }
    },
    scrollTo: (x: number, y: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: y,
          left: x,
          behavior: scrollBehavior ?? "smooth",
        });
      }
    },
    getCurrentScrollPosition: () => {
      if (scrollRef.current) {
        return {
          top: scrollRef.current.scrollTop,
          left: scrollRef.current.scrollLeft,
        };
      }
      return { top: 0, left: 0 };
    },
    getMaxScrollExtent: () => {
      if (scrollRef.current) {
        return {
          maxTop:
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight,
          maxLeft:
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
        };
      }
      return { maxTop: 0, maxLeft: 0 };
    },
  }));

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const position = {
      top: event.currentTarget.scrollTop,
      left: event.currentTarget.scrollLeft,
    };
    setScrollPosition(position);
    if (onScrollPositionChange) {
      onScrollPositionChange(position); // Notify parent about the new scroll position
    }
  };

  const getScrollBehavior = () => {
    switch (physics) {
      case "bouncy":
        return "smooth"; // You can customize this with additional logic if needed
      case "never":
        return "auto"; // Prevent scrolling beyond the edge (no bounce)
      case "clamped":
        return "smooth"; // Clamp scrolling, you can use custom logic for clamping if needed
      default:
        return "smooth";
    }
  };

  const scrollStyle: React.CSSProperties = {
    overflowX: scrollDirection === "horizontal" ? "auto" : "hidden",
    overflowY: scrollDirection === "vertical" ? "auto" : "hidden",
    scrollBehavior: getScrollBehavior(), // Determine the scroll behavior based on physics
    direction: reverse ? "rtl" : "ltr",
    ...(style ?? {}),
  };

  const containerStyle: React.CSSProperties = {
    clip: clipBehavior === "none" ? "visible" : "hidden",
    pointerEvents: hitTestBehavior === "none" ? "none" : "auto",
  };

  const sliversWithFillRemaining = sliverFillRemaining
    ? slivers.map((sliver, index) => {
        // Check if it's the last sliver
        if (index === slivers.length - 1) {
          // For the last sliver, wrap it in a div to fill the remaining space
          return <div style={{ flex: 1, minHeight: "100%" }}>{sliver}</div>;
        }
        return sliver;
      })
    : slivers;

  return (
    <div
      ref={scrollRef}
      style={scrollStyle}
      onScroll={handleScroll}
      className="custom-scroll-view"
    >
      <div
        style={{
          display: "flex",
          flexDirection: scrollDirection === "horizontal" ? "row" : "column",
          ...containerStyle,
        }}
      >
        {sliversWithFillRemaining}
      </div>
    </div>
  );
};

export default CustomScrollView;
