import React, { useRef, useEffect } from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

interface ScrollController {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollBy: (x: number, y: number) => void;
  scrollTo: (x: number, y: number) => void;
  getCurrentScrollPosition: () => { top: number; left: number };
  getMaxScrollExtent: () => { maxTop: number; maxLeft: number };
}

type ListViewSeparatedProps = {
  /** The number of items in the list */
  itemCount: number;
  /** A function that builds the item for a given index */
  itemBuilder: (index: number) => React.ReactNode;
  /** A function that builds the separator between items */
  separatorBuilder: () => React.ReactNode;
  /** Optional style for the list */
  style?: React.CSSProperties;
  /** Optional class name for the list */
  className?: string;
  /** Direction the list scrolls */
  scrollDirection?: ScrollDirection;
  /** Scroll physics of the list */
  physics?: ScrollPhysics;
  /** A ref to control the scroll position programmatically */
  scrollControllerRef?: React.Ref<ScrollController>;
  /** Reverse the order of the list */
  reverse?: boolean;
};

/**
 * A component that renders a list of dynamically generated items based on the `itemCount`
 * and an `itemBuilder` function, with separators between each item. This component supports
 * both vertical and horizontal scrolling, as well as customizable overflow behavior (hidden or auto).
 * It allows you to efficiently render a list of items along with separators, making it ideal for situations
 * where the number of items is large or dynamically generated and visual separation between items is required.
 *
 * Example usage:
 * ```tsx
 * <ListViewSeparated
 *   itemCount={5}
 *   itemBuilder={(index) => <div>Item {index + 1}</div>}
 *   separatorBuilder={() => <hr />} // Separator between items
 *   scrollDirection="horizontal"
 *   physics="auto"
 *   reverse={true} // Reverse the order of the list
 *   style={{ padding: "10px" }}
 *   className="my-separator-list"
 * />
 * ```
 *
 * Properties:
 * - `itemCount`: The total number of items to render. This defines the number of times the `itemBuilder`
 *   and `separatorBuilder` functions will be called.
 * - `itemBuilder`: A function that takes the index of the item and returns the content to be displayed
 *   for that particular item. This allows for custom rendering of each item based on its index.
 * - `separatorBuilder`: A function that returns the separator element to be rendered between items.
 *   It is called after each item, except the last one, to visually separate the items.
 * - `scrollDirection`: Determines the direction of scrolling. It can either be "vertical" (default) or "horizontal".
 * - `physics`: Controls the overflow behavior of the list. It can be:
 *   - `"auto"`: Allows scrolling when content overflows.
 *   - `"never"`: Prevents scrolling when content overflows.
 *   - `"clamped"`: Applies a clamped overflow behavior, typically for vertical scrolling.
 * - `reverse`: If `true`, the items will be rendered in reverse order.
 * - `style`: Additional inline styles to apply to the `ListViewSeparated`. These styles will override the default ones if provided.
 * - `className`: An optional CSS class to apply custom styles to the component.
 * - `scrollControllerRef`: A ref to control the scroll position programmatically. You can use this to scroll to specific positions or retrieve the current scroll position.
 *
 * This component is ideal for rendering lists where each item needs to be visually separated by a divider,
 * such as in a navigation menu, a list of notifications, or any list with dividers. The `separatorBuilder`
 * function allows you to customize the separator between items, while `itemBuilder` customizes the content of each item.
 */
const ListViewSeparated: React.FC<ListViewSeparatedProps> = ({
  itemCount,
  itemBuilder,
  separatorBuilder,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
  scrollControllerRef,
  reverse = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const overflowStyle =
    scrollDirection === "horizontal" ? "overflow-x" : "overflow-y";
  const physicsStyle = physics === "never" ? "hidden" : "auto";

  // Scroll controller implementation
  useEffect(() => {
    if (scrollControllerRef && containerRef.current) {
      const container = containerRef.current;
      const scrollController: ScrollController = {
        scrollToTop: () => container.scrollTo(0, 0),
        scrollToBottom: () => {
          container.scrollTo(0, container.scrollHeight);
        },
        scrollBy: (x, y) => {
          container.scrollBy(x, y);
        },
        scrollTo: (x, y) => {
          container.scrollTo(x, y);
        },
        getCurrentScrollPosition: () => ({
          top: container.scrollTop,
          left: container.scrollLeft,
        }),
        getMaxScrollExtent: () => ({
          maxTop: container.scrollHeight - container.clientHeight,
          maxLeft: container.scrollWidth - container.clientWidth,
        }),
      };

      // Assign the scrollController to the provided ref
      (scrollControllerRef as React.RefObject<ScrollController>).current =
        scrollController;
    }
  }, [scrollControllerRef]);

  const itemIndices = reverse
    ? Array.from({ length: itemCount }, (_, index) => itemCount - 1 - index)
    : Array.from({ length: itemCount }, (_, index) => index);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        display: scrollDirection === "horizontal" ? "flex" : "block",
        [overflowStyle]: physicsStyle,
      }}
    >
      {itemIndices.map((index) => (
        <React.Fragment key={index}>
          {itemBuilder(index)} {/* Render each item */}
          {index < itemCount - 1 && separatorBuilder()}{" "}
          {/* Render separator except after the last item */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListViewSeparated;
