import React, { useRef, useImperativeHandle, forwardRef } from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

type ListViewProps = {
  /** Children elements to render in the list */
  children: React.ReactNode;
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
 * A component that renders a list of items with customizable scroll behavior and layout direction.
 * It supports both vertical and horizontal scrolling, and allows customization of overflow behavior
 * (hidden or auto). This component is designed to provide a flexible way to display lists in various
 * layouts, making it ideal for use cases such as galleries, menus, or item lists with different scrolling styles.
 *
 * Example usage:
 * ```tsx
 * <ListView
 *   scrollDirection="horizontal"
 *   physics="auto"
 *   style={{ padding: "10px" }}
 *   className="my-list"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ListView>
 * ```
 *
 * Properties:
 * - `children`: The content or items to be displayed in the list. These elements will be rendered inside the `ListView`.
 * - `scrollDirection`: Determines the direction of scrolling. It can either be "vertical" (default) or "horizontal".
 * - `physics`: Controls the overflow behavior of the list. It can be:
 *   - `"auto"`: Allows scrolling when content overflows.
 *   - `"never"`: Prevents scrolling when content overflows.
 *   - `"clamped"`: Applies a clamped overflow behavior, typically for vertical scrolling.
 * - `style`: Additional inline styles to apply to the `ListView`. These styles will override the default ones if provided.
 * - `className`: An optional CSS class to apply custom styles to the component.
 *
 * This component provides a simple way to create flexible lists with different scrolling behaviors.
 * It's particularly useful for creating scrollable containers for lists, items, and galleries that
 * need to adapt to both vertical and horizontal layouts.
 */
const ListView = forwardRef<ScrollController, ListViewProps>(
  (
    {
      children,
      style,
      className,
      scrollDirection = "vertical",
      physics = "clamped",
      scrollControllerRef,
    },
    ref
  ) => {
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
            (listRef.current?.scrollHeight ?? 0) -
            (listRef.current?.clientHeight ?? 0),
          maxLeft:
            (listRef.current?.scrollWidth ?? 0) -
              (listRef.current?.clientWidth || 0) || 0,
        };
      },
    }));

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
        {children}
      </div>
    );
  }
);

export default ListView;
