import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { JSX } from "react/jsx-runtime";

interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

interface NestedScrollViewProps {
  scrollDirection?: "horizontal" | "vertical";
  reverse?: boolean;
  headerSliverBuilder: () => JSX.Element;
  body: JSX.Element;
  dragStartBehavior?: "start" | "down";
  floatHeaderSlivers?: boolean;
  clipBehavior?: "none" | "hardEdge";
  hitTestBehavior?: "none" | "opaque";
  restorationId?: string;
  scrollBehavior?: "auto" | "smooth";
  collapsedHeight?: number;
  expandedHeight?: number;
  controller?: React.Ref<ScrollController>; // Add controller prop
}

/**
 * A component that creates a customizable scrollable container, allowing you to add slivers (scrollable child elements)
 * and providing control over scroll behavior, physics, and layout. It is capable of handling nested scrolling, where the
 * header collapses based on the scroll position.
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
 *     <NestedScrollView
 *       scrollDirection="vertical"
 *       headerSliverBuilder={headerSliverBuilder} // Function that returns the header sliver content
 *       body={body} // The main content that will be scrolled
 *       controller={scrollControllerRef} // A ref object that provides external control over the scroll view
 *       collapsedHeight={50} // Height of the header when collapsed
 *       expandedHeight={200} // Height of the header when fully expanded
 *     />
 *   </>
 * );
 * ```
 *
 * **Props:**
 * - `scrollDirection` (optional): Defines the direction of scrolling. 
 *   - `"horizontal"`: Horizontal scrolling.
 *   - `"vertical"` (default): Vertical scrolling.
 * 
 * - `reverse` (optional): If `true`, the scroll direction is reversed, useful for right-to-left (RTL) layouts.
 * 
 * - `headerSliverBuilder` (required): A function that returns the header sliver content, which is typically a widget that may collapse or expand based on the scroll position. This allows customization of the header layout and behavior.
 * 
 * - `body` (required): The content of the scroll view that will be scrollable, typically a large body of text or other UI elements.
 * 
 * - `dragStartBehavior` (optional): Defines the drag behavior when the user initiates a scroll gesture.
 *   - `"start"` (default): The drag starts immediately from the initial touch point.
 *   - `"down"`: The drag starts after the user moves a certain distance (useful for drag-to-scroll behavior).
 * 
 * - `floatHeaderSlivers` (optional): If `true`, the header slivers will float above the body content when scrolling, without snapping to the top of the screen.
 * 
 * - `clipBehavior` (optional): Defines whether content should be clipped at the scroll view's edges. 
 *   - `"none"`: No clipping.
 *   - `"hardEdge"`: Content will be clipped at the scroll view's edges.
 * 
 * - `hitTestBehavior` (optional): Defines whether the scroll view should intercept touch events.
 *   - `"none"`: No touch interception.
 *   - `"opaque"`: The scroll view intercepts touch events, even if the area is transparent.
 * 
 * - `restorationId` (optional): A unique identifier for state restoration. Used to restore the scroll position after the component is recreated, ensuring that the user’s position is saved and restored.
 * 
 * - `scrollBehavior` (optional): Defines the scroll behavior when transitioning between scroll positions.
 *   - `"auto"` (default): Smooth scrolling, with the browser deciding on the best transition behavior.
 *   - `"smooth"`: Smooth scrolling with a gradual transition.
 * 
 * - `collapsedHeight` (optional): The height of the header when it is collapsed (i.e., after the user scrolls and the header has been pushed out of view).
 * 
 * - `expandedHeight` (optional): The height of the header when it is fully expanded, before any scrolling has occurred.
 * 
 * - `controller` (optional): A reference to an external `ScrollController`. This allows you to programmatically control the scroll position using methods like `scrollToTop()`, `scrollToBottom()`, etc.
 *   - The `controller` should be a `React.Ref` object that provides the methods to control the scroll view externally.

 * **Explanation:**
 * - The `headerSliverBuilder` prop allows for customization of the header, which can be collapsible or expandable based on the scroll position.
 * - The `body` prop is where the scrollable content resides, and this content is dynamically displayed within the scrollable area.
 * - The `controller` prop enables external control over the scroll position, so that actions like scrolling to the top or bottom can be triggered programmatically.
 * - `collapsedHeight` and `expandedHeight` allow control over the height of the header depending on the scroll position, creating a flexible layout.
 * - `scrollBehavior` gives control over the smoothness of the scroll transition, offering either auto or smooth behavior.
 * 
 * This interface allows for a flexible scroll view implementation with customizable headers, smooth scrolling, and external control over the scroll position, making it suitable for a wide variety of scrollable layouts.
 */
const NestedScrollView: React.FC<NestedScrollViewProps> = ({
  scrollDirection = "vertical",
  reverse = false,
  headerSliverBuilder,
  body,
  floatHeaderSlivers = false,
  clipBehavior = "hardEdge",
  hitTestBehavior = "opaque",
  scrollBehavior = "smooth",
  collapsedHeight = 0,
  expandedHeight = 200,
  controller,
}) => {
  const [headerHeight, setHeaderHeight] = useState(expandedHeight);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll position and scroll methods
  const handleScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop || 0;

    const newHeaderHeight = Math.max(
      collapsedHeight,
      expandedHeight - scrollTop
    );
    setHeaderHeight(newHeaderHeight);

    if (bodyRef.current) {
      bodyRef.current.style.paddingTop = `${Math.max(0, headerHeight)}px`;
    }
  };

  // Expose scroll methods via controller
  useImperativeHandle(controller, () => ({
    scrollToTop: () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: scrollBehavior,
        });
      }
    },
    scrollToBottom: () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          left: 0,
          behavior: scrollBehavior,
        });
      }
    },
    scrollBy: (x: number, y: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          top: y,
          left: x,
          behavior: scrollBehavior,
        });
      }
    },
    scrollTo: (x: number, y: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: y,
          left: x,
          behavior: scrollBehavior,
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

  useEffect(() => {
    const header = document.querySelector(".header") as HTMLElement;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, [expandedHeight]);

  return (
    <div
      ref={scrollRef}
      style={{
        overflowX: scrollDirection === "horizontal" ? "auto" : "hidden",
        overflowY: scrollDirection === "vertical" ? "auto" : "hidden",
        scrollBehavior: scrollBehavior,
        direction: reverse ? "rtl" : "ltr",
      }}
      onScroll={handleScroll}
      className="nested-scroll-view"
    >
      {/* Header Section */}
      <div
        className="header"
        style={{
          position: floatHeaderSlivers ? "absolute" : "relative",
          height: headerHeight,
          transition: "height 0.3s",
        }}
      >
        {headerSliverBuilder()}
      </div>

      {/* Body Section */}
      <div
        ref={bodyRef}
        style={{
          marginTop: floatHeaderSlivers ? `${headerHeight}px` : "0px",
          clip: clipBehavior === "none" ? "visible" : "hidden",
          pointerEvents: hitTestBehavior === "none" ? "none" : "auto",
        }}
      >
        {body}
      </div>
    </div>
  );
};

export default NestedScrollView;
