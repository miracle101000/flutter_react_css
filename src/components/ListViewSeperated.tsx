import React from "react";

type ScrollDirection = "vertical" | "horizontal";
type ScrollPhysics = "clamped" | "never" | "bouncy";

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
};

/**
 * A component that renders a list of dynamically generated items with separators between each item.
 * This component allows for both vertical and horizontal scrolling, with customizable overflow behavior.
 * It efficiently renders items along with separators, making it ideal for lists that require clear visual
 * separation between each item, such as in menus, feeds, or lists with dividers.
 *
 * Example usage:
 * ```tsx
 * <ListViewSeparated
 *   itemCount={5}
 *   itemBuilder={(index) => <div>Item {index + 1}</div>}
 *   separatorBuilder={() => <hr />}  // Example of a horizontal line separator
 *   scrollDirection="vertical"
 *   physics="auto"
 *   style={{ padding: "10px" }}
 *   className="my-separator-list"
 * />
 * ```
 *
 * Properties:
 * - `itemCount`: The total number of items to render. This defines how many times the `itemBuilder`
 *   and `separatorBuilder` functions will be called.
 * - `itemBuilder`: A function that takes the index of the item and returns the content to be displayed
 *   for that particular item. This allows for custom rendering of each item based on its index.
 * - `separatorBuilder`: A function that returns the separator element to be rendered between items. It is
 *   called after each item, except the last one, to visually separate the items.
 * - `scrollDirection`: Determines the direction of scrolling. It can either be "vertical" (default) or "horizontal".
 * - `physics`: Controls the overflow behavior of the list. It can be:
 *   - `"auto"`: Allows scrolling when content overflows.
 *   - `"never"`: Prevents scrolling when content overflows.
 *   - `"clamped"`: Applies a clamped overflow behavior, typically for vertical scrolling.
 * - `style`: Additional inline styles to apply to the `ListViewSeparated`. These styles will override the default ones if provided.
 * - `className`: An optional CSS class to apply custom styles to the component.
 *
 * This component is ideal for rendering lists where each item needs to be visually separated by a divider,
 * such as in a navigation menu or a list of notifications. The `separatorBuilder` function allows you
 * to customize the separator between items, while `itemBuilder` customizes the content of each item.
 */
const ListViewSeparated: React.FC<ListViewSeparatedProps> = ({
  itemCount,
  itemBuilder,
  separatorBuilder,
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
