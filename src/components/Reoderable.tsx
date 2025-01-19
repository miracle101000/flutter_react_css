import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type ReorderableListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder: (newItems: T[]) => void;
};

/**
 * A component that provides a reorderable list, allowing users to drag and drop items to rearrange their order,
 * similar to Flutter's ReorderableListView.
 *
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react';
 * import ReorderableList from './ReorderableList';
 *
 * type Item = {
 *   id: number;
 *   label: string;
 * };
 *
 * const App = () => {
 *   const [items, setItems] = useState<Item[]>([
 *     { id: 1, label: 'Item 1' },
 *     { id: 2, label: 'Item 2' },
 *     { id: 3, label: 'Item 3' },
 *   ]);
 *
 *   const handleReorder = (newItems: Item[]) => {
 *     setItems(newItems);
 *   };
 *
 *   return (
 *     <div>
 *       <ReorderableList
 *         items={items}
 *         renderItem={(item) => <span>{item.label}</span>}
 *         onReorder={handleReorder}
 *       />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * In this example:
 * - The `items` array contains the list of items to display.
 * - `renderItem` is used to customize how each item is displayed.
 * - `onReorder` is triggered when the user rearranges the items, updating the state.
 */
const ReorderableList = <T extends { id: string | number }>({
  items,
  renderItem,
  onReorder,
}: ReorderableListProps<T>) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    onReorder(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="reorderable-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: "8px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    {renderItem(item, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderableList;
