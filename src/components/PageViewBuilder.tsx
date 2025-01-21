import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface PageController {
  setPage: (pageIndex: number) => void;
  getCurrentPage: () => number;
  nextPage: () => void;
  previousPage: () => void;
}

type PageViewProps = {
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
};

/**
 * A component that builds a scrollable list, creating each page dynamically using a builder function.
 *
 * Example usage:
 * ```tsx
 * <PageViewBuilder
 *   count={5}
 *   itemBuilder={(index) => <div>Page {index + 1}</div>}
 *   scrollDirection="horizontal"
 *   onPageChanged={(pageIndex) => console.log('Page changed:', pageIndex)}
 * />
 * ```
 *
 * **Props:**
 * - `count`: The number of pages to be displayed in the list.
 * - `itemBuilder`: A function that takes the index of the page and returns the content for that page.
 * - `scrollDirection`: Determines whether the pages scroll horizontally or vertically. Defaults to `horizontal`.
 * - `onPageChanged`: A callback function that is triggered whenever the page changes.
 * - `pageSnapping`: Determines whether the pages should snap to their edges during scrolling. Defaults to `true`.
 * - `dragStartBehavior`: Defines how the scroll behaves when dragging starts. Possible values: `start`, `move`. Defaults to `start`.
 * - `allowImplicitScrolling`: Determines if implicit scrolling (scrolling when not actively dragging) is allowed. Defaults to `false`.
 * - `restorationId`: A unique identifier to restore scroll position. Can be used in conjunction with state restoration.
 * - `clipBehavior`: Defines the clipping behavior of the content. Possible values: `none`, `hardEdge`.
 * - `hitTestBehavior`: Defines the behavior of interaction when touching the content. Possible values: `opaque`, `none`.
 * - `scrollBehavior`: Defines the smoothness of scroll. Possible values: `smooth`, `auto`.
 * - `physics`: Defines how the scroll behaves when the user scrolls past the page bounds. Possible values: `bouncy`, `never`, `clamped`.
 * - `padEnds`: Determines whether padding is applied to the ends of the list. Defaults to `true`.
 *
 * **Explanation:**
 * - The `PageViewBuilder` component is used to render a scrollable list of pages, where the pages are created dynamically using the `itemBuilder` function.
 * - Each page is rendered based on the `count` prop and is assigned a specific index. The `itemBuilder` function is responsible for creating the content for each page.
 * - The `onPageChanged` callback is triggered whenever the page changes, allowing the parent component to track the current page.
 * - The `scrollDirection` controls the direction of scrolling (horizontal or vertical), and other props like `pageSnapping` and `dragStartBehavior` can further fine-tune the scrolling behavior.
 */
const PageViewBuilder = forwardRef<PageController, PageViewProps>(
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

    useEffect(() => {
      // Add logic for scroll restoration based on `restorationId` (if needed)
    }, [restorationId]);

    useImperativeHandle(ref, () => ({
      setPage: (pageIndex: number) => setCurrentPage(pageIndex),
      getCurrentPage: () => currentPage,
      nextPage: () => handlePageChange(currentPage + 1),
      previousPage: () => handlePageChange(currentPage - 1),
    }));

    // Make the controller reference available if provided
    useImperativeHandle(controller, () => ({
      setPage: (pageIndex: number) => setCurrentPage(pageIndex),
      getCurrentPage: () => currentPage,
      nextPage: () => handlePageChange(currentPage + 1),
      previousPage: () => handlePageChange(currentPage - 1),
    }));

    const handlePageChange = (newPage: number) => {
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        if (onPageChanged) {
          onPageChanged(newPage); // Call the callback with the new page index
        }
      }
    };

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
        // Allow scroll bouncing (over-scrolling)
        newPage = Math.max(0, Math.min(newPage, count - 1));
      } else if (physics === "never") {
        // Prevent any scrolling beyond the pages (clamped)
        newPage = Math.max(0, Math.min(newPage, count - 1));
      } else if (physics === "clamped") {
        // Prevent scrolling beyond the first or last page (clamped with no bounce)
        newPage = Math.max(0, Math.min(newPage, count - 1));
      }

      handlePageChange(newPage);
    };

    const pageStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: scrollDirection === "horizontal" ? "row" : "column",
      overflow: clipBehavior === "none" ? "visible" : "hidden",
      scrollSnapType: pageSnapping ? "x mandatory" : "none",
      ...(padEnds && { padding: "0 10px" }), // Add padding to the ends if padEnds is true
      scrollBehavior: scrollBehavior, // Apply scroll behavior
    };

    const pageItemStyle: React.CSSProperties = {
      flexShrink: 0,
      scrollSnapAlign: "start",
      ...(scrollDirection === "horizontal"
        ? { width: "100%" }
        : { height: "100%" }),
      pointerEvents: hitTestBehavior === "none" ? "none" : "auto", // Handle hit test behavior
    };

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

export default PageViewBuilder;
