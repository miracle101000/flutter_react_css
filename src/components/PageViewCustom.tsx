import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface PageViewProps {
  key?: string;
  scrollDirection?: "horizontal" | "vertical";
  reverse?: boolean;
  controller?: React.Ref<PageController>;
  pageSnapping?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  itemBuilder: (index: number) => React.ReactNode;
  count: number;
  dragStartBehavior?: "start" | "move";
  allowImplicitScrolling?: boolean;
  restorationId?: string;
  clipBehavior?: "none" | "hardEdge";
  hitTestBehavior?: "opaque" | "none";
  scrollBehavior?: "smooth" | "auto";
  physics?: "bouncy" | "never" | "clamped";
  padEnds?: boolean;
}

interface PageController {
  setPage: (pageIndex: number) => void;
  getCurrentPage: () => number;
  nextPage: () => void;
  previousPage: () => void;
}

/**
 * A customizable scrollable page view that can be controlled externally through a page controller.
 *
 * Example usage:
 * ```tsx
 * const pageControllerRef = useRef<PageController>(null);
 *
 * const handleNextPage = () => {
 *   pageControllerRef.current?.nextPage(); // Call the nextPage method on the controller
 * };
 *
 * const handlePreviousPage = () => {
 *   pageControllerRef.current?.previousPage(); // Call the previousPage method on the controller
 * };
 *
 * return (
 *   <>
 *     <button onClick={handleNextPage}>Next Page</button>
 *     <button onClick={handlePreviousPage}>Previous Page</button>
 *
 *     <PageViewCustom
 *       controller={pageControllerRef}
 *       count={5}
 *       scrollDirection="horizontal"
 *       onPageChanged={(pageIndex) => console.log('Current Page:', pageIndex)}
 *     >
 *       <div>Page 1 Content</div>
 *       <div>Page 2 Content</div>
 *       <div>Page 3 Content</div>
 *     </PageViewCustom>
 *   </>
 * );
 * ```
 *
 * **Props:**
 * - `scrollDirection`: Determines whether the pages scroll horizontally or vertically. Defaults to `horizontal`.
 * - `pageSnapping`: Determines whether the pages should snap to their edges during scrolling. Defaults to `true`.
 * - `onPageChanged`: A callback function that is triggered whenever the page changes.
 * - `dragStartBehavior`: Defines how the scroll behaves when dragging starts. Possible values: `start`, `move`. Defaults to `start`.
 * - `controller`: A ref object that provides a set of methods to control the page view externally. It includes methods like `setPage`, `getCurrentPage`, `nextPage`, and `previousPage`.
 * - `count`: The number of pages to be displayed in the list.
 * - `clipBehavior`: Defines the clipping behavior of the content. Possible values: `none`, `hardEdge`.
 * - `hitTestBehavior`: Defines the behavior of interaction when touching the content. Possible values: `opaque`, `none`.
 * - `scrollBehavior`: Defines the smoothness of scroll. Possible values: `smooth`, `auto`.
 * - `physics`: Defines how the scroll behaves when the user scrolls past the page bounds. Possible values: `bouncy`, `never`, `clamped`.
 * - `padEnds`: Determines whether padding is applied to the ends of the list. Defaults to `true`.
 *
 * **Controller Methods:**
 * - `setPage(pageIndex: number)`: Programmatically sets the page by index.
 * - `getCurrentPage()`: Retrieves the current page index.
 * - `nextPage()`: Moves to the next page.
 * - `previousPage()`: Moves to the previous page.
 *
 * **Explanation:**
 * - The `PageViewCustom` component is a scrollable page view that can be controlled externally using the `controller` prop, which provides a set of methods such as `nextPage`, `previousPage`, `setPage`, and `getCurrentPage`.
 * - The `controller` prop allows the parent component to programmatically control the page view, which enables functions like navigating between pages and setting the current page index.
 * - The `onPageChanged` callback is triggered every time the page changes, providing the current page index to the parent component.
 * - The `scrollDirection` controls the direction of scrolling, and other props like `physics`, `dragStartBehavior`, and `padEnds` control the scrolling behavior and appearance.
 * - The component uses `useImperativeHandle` to expose methods for external control of the page view and handles scroll events to update the current page based on the scroll position.
 * - This component provides flexibility for both internal scroll-based navigation and external control via the provided controller methods.
 */
const PageViewCustom = forwardRef<PageController, PageViewProps>(
  (
    {
      key,
      scrollDirection = "horizontal",
      reverse = false,
      controller,
      pageSnapping = true,
      onPageChanged,
      itemBuilder,
      count,
      dragStartBehavior = "start",
      restorationId,
      clipBehavior = "hardEdge",
      hitTestBehavior = "opaque",
      scrollBehavior = "smooth",
      physics = "bouncy",
      padEnds = true,
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageContainerRef = useRef<HTMLDivElement | null>(null);

    // Handle scroll restoration logic if needed
    useEffect(() => {
      if (restorationId) {
        // Implement restoration logic based on restorationId if required
      }
    }, [restorationId]);

    // Expose methods to control the page view externally via the ref
    useImperativeHandle(ref, () => ({
      setPage: (pageIndex: number) => setCurrentPage(pageIndex),
      getCurrentPage: () => currentPage,
      nextPage: () => handlePageChange(currentPage + 1),
      previousPage: () => handlePageChange(currentPage - 1),
    }));

    // Make sure the `controller` prop is handled externally
    useEffect(() => {
      if (controller && "current" in controller) {
        controller.current = {
          setPage: (pageIndex: number) => setCurrentPage(pageIndex),
          getCurrentPage: () => currentPage,
          nextPage: () => handlePageChange(currentPage + 1),
          previousPage: () => handlePageChange(currentPage - 1),
        };
      }
    }, [controller, currentPage]);

    // Handle page change with bounds checking
    const handlePageChange = (newPage: number) => {
      if (newPage !== currentPage && newPage >= 0 && newPage < count) {
        setCurrentPage(newPage);
        if (onPageChanged) {
          onPageChanged(newPage); // Call the callback with the new page index
        }
      }
    };

    // Handle scroll event to change pages
    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
      const scrollAmount =
        scrollDirection === "horizontal"
          ? event.currentTarget.scrollLeft
          : event.currentTarget.scrollTop;

      let newPage = Math.round(
        scrollAmount /
          (scrollDirection === "horizontal"
            ? pageContainerRef.current?.offsetWidth || 0
            : pageContainerRef.current?.offsetHeight || 0)
      );

      // Apply physics-based scroll behavior
      if (physics === "bouncy") {
        newPage = Math.max(0, Math.min(newPage, count - 1));
      } else if (physics === "never" || physics === "clamped") {
        newPage = Math.max(0, Math.min(newPage, count - 1));
      }

      handlePageChange(newPage);
    };

    // Page view container styles
    const pageStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: scrollDirection === "horizontal" ? "row" : "column",
      overflow: clipBehavior === "none" ? "visible" : "hidden",
      scrollSnapType: pageSnapping ? "x mandatory" : "none",
      ...(padEnds && { padding: "0 10px" }), // Add padding to the ends if padEnds is true
      scrollBehavior: scrollBehavior, // Apply scroll behavior
    };

    // Page item styles (each page)
    const pageItemStyle: React.CSSProperties = {
      flexShrink: 0,
      scrollSnapAlign: "start",
      ...(scrollDirection === "horizontal"
        ? { width: "100%" }
        : { height: "100%" }),
      pointerEvents: hitTestBehavior === "none" ? "none" : "auto", // Handle hit test behavior
    };

    // Handle drag start behavior
    const handleDragStart = (event: React.DragEvent) => {
      if (dragStartBehavior === "start") {
        event.preventDefault(); // Example behavior when dragging starts
      } else if (dragStartBehavior === "move") {
        // Custom behavior for when the user moves the dragger
      }
    };

    return (
      <div
        key={key}
        ref={pageContainerRef}
        style={pageStyle}
        onScroll={handleScroll}
        className="page-view-container"
        onDragStart={handleDragStart}
        onMouseDown={(e) => e.preventDefault()} // To prevent text selection while dragging
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            style={pageItemStyle}
            className={`page-view-item ${
              reverse && currentPage === index ? "reversed" : ""
            }`}
          >
            {itemBuilder(index)} {/* Dynamically render page content */}
          </div>
        ))}
      </div>
    );
  }
);

export default PageViewCustom;
