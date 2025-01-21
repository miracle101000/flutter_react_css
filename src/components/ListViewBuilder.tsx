import React, { useRef, useImperativeHandle, forwardRef } from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type ListViewBuilderProps = {
  /** The number of items in the list */
  itemCount: number;
  /** A function that builds the item for a given index */
  itemBuilder: (index: number) => React.ReactNode;
  /** Optional style for the list */
  style?: React.CSSProperties;
  /** Optional class name for the list */
  className?: string;
  /** Direction the list scrolls */
  scrollDirection?: ScrollDirection;
  /** Scroll physics of the list */
  physics?: ScrollPhysics;
  /** Optional callback for getting the scroll controller */
  scrollControllerRef?: React.Ref<ScrollController>;
  /** Reverse the order of the list items */
  reverse?: boolean; // New reverse property
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
 * A component that renders a list of dynamically generated items based on the `itemCount`
 * and an `itemBuilder` function. This component supports both vertical and horizontal scrolling,
 * as well as customizable overflow behavior (hidden or auto). It allows you to efficiently render
 * a list of items without manually managing the item list, making it ideal for situations where
 * the number of items is large or dynamically generated.
 *
 * Example usage:
 * ```tsx
 * <ListViewBuilder
 *   itemCount={5}
 *   itemBuilder={(index) => <div>Item {index + 1}</div>}
 *   scrollDirection="horizontal"
 *   physics="auto"
 *   reverse={true} // Reverse the order
 *   style={{ padding: "10px" }}
 *   className="my-list"
 * />
 * ```
 *
 * Properties:
 * - `itemCount`: The total number of items to render. This defines the number of times the `itemBuilder`
 *   function will be called.
 * - `itemBuilder`: A function that takes the index of the item and returns the content to be displayed
 *   for that particular item. This allows for custom rendering of each item based on its index.
 * - `scrollDirection`: Determines the direction of scrolling. It can either be "vertical" (default) or "horizontal".
 * - `physics`: Controls the overflow behavior of the list. It can be:
 *   - `"auto"`: Allows scrolling when content overflows.
 *   - `"never"`: Prevents scrolling when content overflows.
 *   - `"clamped"`: Applies a clamped overflow behavior, typically for vertical scrolling.
 * - `reverse`: If `true`, the items will be rendered in reverse order.
 * - `style`: Additional inline styles to apply to the `ListViewBuilder`. These styles will override the default ones if provided.
 * - `className`: An optional CSS class to apply custom styles to the component.
 *
 * This component is ideal for scenarios where the number of items is either fixed or large,
 * and you want to generate each item dynamically using a builder function. It abstracts away
 * the manual rendering of individual items and provides a flexible layout with scrollable options.
 */
const ListViewBuilder = forwardRef<ScrollController, ListViewBuilderProps>(
  ({
    itemCount,
    itemBuilder,
    style,
    className,
    scrollDirection = "vertical",
    physics = "clamped",
    scrollControllerRef,
    reverse = false, // Default value is false (do not reverse)
  }) => {
    const listRef = useRef<HTMLDivElement>(null);

    // Adjust overflow behavior based on scrollDirection and physics
    const overflowStyle =
      scrollDirection === "horizontal" ? "overflowX" : "overflowY";
    const physicsStyle = physics === "never" ? "hidden" : "auto";

    // Expose the scroll controller methods using `useImperativeHandle`
    useImperativeHandle(scrollControllerRef, () => ({
      scrollToTop: () => {
        if (listRef.current) listRef.current.scrollTop = 0;
      },
      scrollToBottom: () => {
        if (listRef.current)
          listRef.current.scrollTop = listRef.current.scrollHeight;
      },
      scrollBy: (x, y) => {
        if (listRef.current) {
          listRef.current.scrollBy({ left: x, top: y, behavior: "smooth" });
        }
      },
      scrollTo: (x, y) => {
        if (listRef.current) {
          listRef.current.scrollTo({ left: x, top: y, behavior: "smooth" });
        }
      },
      getCurrentScrollPosition: () => {
        return {
          top: listRef.current?.scrollTop || 0,
          left: listRef.current?.scrollLeft || 0,
        };
      },
      getMaxScrollExtent: () => {
        return {
          maxTop:
            (listRef.current?.scrollHeight || 0) -
            (listRef.current?.clientHeight || 0),
          maxLeft:
            (listRef.current?.scrollWidth ?? 0) -
              (listRef.current?.clientWidth || 0) || 0,
        };
      },
    }));

    // Reversing the order of the items based on the `reverse` prop
    const items = Array.from({ length: itemCount }, (_, index) => (
      <div key={index}>{itemBuilder(index)}</div>
    ));
    const reversedItems = reverse ? [...items].reverse() : items;

    return (
      <div
        ref={listRef}
        className={className}
        style={{
          ...style,
          display: scrollDirection === "horizontal" ? "flex" : "block",
          [overflowStyle]: physicsStyle,
        }}
      >
        {reversedItems} {/* Render the items (possibly reversed) */}
      </div>
    );
  }
);

export default ListViewBuilder;
