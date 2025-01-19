import React from "react";

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
};

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
 * - `style`: Additional inline styles to apply to the `ListViewBuilder`. These styles will override the default ones if provided.
 * - `className`: An optional CSS class to apply custom styles to the component.
 *
 * This component is ideal for scenarios where the number of items is either fixed or large,
 * and you want to generate each item dynamically using a builder function. It abstracts away
 * the manual rendering of individual items and provides a flexible layout with scrollable options.
 */
const ListViewBuilder: React.FC<ListViewBuilderProps> = ({
  itemCount,
  itemBuilder,
  style,
  className,
  scrollDirection = "vertical",
  physics = "clamped",
}) => {
  const overflowStyle =
    scrollDirection === "horizontal" ? "overflow-x" : "overflow-y";
  const physicsStyle = physics === "never" ? "hidden" : "auto";

  return (
    <div
      className={className}
      style={{
        ...style,
        display: scrollDirection === "horizontal" ? "flex" : "block",
        [overflowStyle]: physicsStyle,
      }}
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <div key={index}>
          {itemBuilder(index)} {/* Render each item using the itemBuilder */}
        </div>
      ))}
    </div>
  );
};

export default ListViewBuilder;
