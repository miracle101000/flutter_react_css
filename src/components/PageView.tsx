import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

interface PageController {
  setPage: (pageIndex: number) => void;
  getCurrentPage: () => number;
  nextPage: () => void;
  previousPage: () => void;
}

interface PageViewProps {
  key?: string;
  scrollDirection?: "horizontal" | "vertical";
  reverse?: boolean;
  controller?: React.RefObject<PageController>;
  pageSnapping?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  children?: React.ReactNode[];
  dragStartBehavior?: "start" | "move" | "end";
  restorationId?: string;
  clipBehavior?: "hardEdge" | "none";
  hitTestBehavior?: "opaque" | "translucent" | "none";
  scrollBehavior?: "smooth" | "auto";
  physics?: "bouncy" | "never" | "clamped";
  padEnds?: boolean;
}

/**
 * A component that creates a scrollable list that works page by page, with customizable scroll behavior.
 *
 * Example usage:
 * ```tsx
 * const pageControllerRef = useRef<PageController>(null); // Create a ref to hold the page controller
 *
 * // Function to go to the next page
 * const handleNextPage = () => {
 *   pageControllerRef.current?.nextPage(); // Call the nextPage method on the controller
 * };
 *
 * // Function to go to the previous page
 * const handlePreviousPage = () => {
 *   pageControllerRef.current?.previousPage(); // Call the previousPage method on the controller
 * };
 *
 * return (
 *   <>
 *     <button onClick={handleNextPage}>Next Page</button>
 *     <button onClick={handlePreviousPage}>Previous Page</button>
 *
 *     <PageView
 *       scrollDirection="horizontal"
 *       physics="bouncy"
 *       onPageChanged={(pageIndex) => console.log('Current Page:', pageIndex)}
 *       controller={pageControllerRef}
 *     >
 *       <div>Page 1 Content</div>
 *       <div>Page 2 Content</div>
 *       <div>Page 3 Content</div>
 *     </PageView>
 *   </>
 * );
 * ```
 *
 * **Props:**
 * - `scrollDirection`: Determines whether the pages scroll horizontally or vertically.
 * - `physics`: Defines how the scroll behaves (e.g., "bouncy", "never", "clamped").
 * - `onPageChanged`: Callback function that is triggered whenever the page changes.
 * - `padEnds`: Determines whether to add padding at the ends of the list.
 * - `children`: List of child elements that are rendered as pages.
 * - `controller`: A ref object that provides a set of methods to control the page view externally. It includes methods like `setPage`, `getCurrentPage`, `nextPage`, and `previousPage`.
 *
 * **Controller Methods:**
 * - `setPage(pageIndex: number)`: Programmatically sets the page by index.
 * - `getCurrentPage()`: Retrieves the current page index.
 * - `nextPage()`: Moves to the next page.
 * - `previousPage()`: Moves to the previous page.
 *
 * **Explanation:**
 * - The `controller` prop allows the parent component to control the `PageView` programmatically.
 * - By passing a `ref` (in this case, `pageControllerRef`) to the `controller` prop, the parent can call methods like `nextPage()` and `previousPage()` to navigate between pages without directly interacting with the scrollable list.
 * - The `nextPage` method moves to the next page in the list, while `previousPage` moves the user back to the previous page.
 * - The `setPage(pageIndex)` method allows the parent component to directly set the page by providing an index, while `getCurrentPage()` can be used to retrieve the current page index.
 *
 * This approach provides flexibility, enabling both external control (through the controller) and internal page transitions based on scroll behavior (such as bouncy, clamped, or never physics).
 */

const PageView = forwardRef<PageController, PageViewProps>(
  (
    {
      key,
      scrollDirection = "horizontal",
      reverse = false,
      controller,
      pageSnapping = true,
      onPageChanged,
      children = [],
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
    const totalPages = children.length;

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
      // Handle scroll behavior for different physics styles
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
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
      } else if (physics === "never") {
        // Prevent any scrolling beyond the pages (clamped)
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
      } else if (physics === "clamped") {
        // Prevent scrolling beyond the first or last page (clamped with no bounce)
        newPage = Math.max(0, Math.min(newPage, totalPages - 1));
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
        {children.map((child, index) => (
          <div
            key={index}
            style={pageItemStyle}
            className={`page-view-item ${
              reverse && currentPage === index ? "reversed" : ""
            }`}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);

export default PageView;
