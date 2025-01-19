import React, { useState, useEffect } from "react";

type GestureDetectorProps = {
  children?: React.ReactNode;
  /** Tap event handler */
  onTap?: () => void;
  /** Double-tap event handler */
  onDoubleTap?: () => void;
  /** Long press event handler */
  onLongPress?: () => void;
  /** Pan update event handler */
  onPanUpdate?: (details: { x: number; y: number }) => void;
  /** Vertical drag update event handler */
  onVerticalDragUpdate?: (details: { x: number; y: number }) => void;
  /** Horizontal drag update event handler */
  onHorizontalDragUpdate?: (details: { x: number; y: number }) => void;
  /** The delay for long press in milliseconds */
  longPressDelay?: number;
};

/**
 * A component that detects various user gestures such as taps, double taps, long presses, and drags (both vertical and horizontal).
 * This component allows you to handle different user interactions on its children elements, providing a flexible way to respond to touch and mouse gestures.
 * The component supports customizable delay for long press gestures and detects drag updates for more interactive content.
 *
 * Example usage:
 * ```tsx
 * <GestureDetector
 *   onTap={() => console.log('Tapped!')}
 *   onDoubleTap={() => console.log('Double Tapped!')}
 *   onLongPress={() => console.log('Long Pressed!')}
 *   onPanUpdate={(position) => console.log('Dragging:', position)}
 *   longPressDelay={700}
 * >
 *   <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }} />
 * </GestureDetector>
 * ```
 *
 * Properties:
 * - `onTap`: A callback function that is called when a tap gesture is detected. This is triggered when the user taps once on the component.
 * - `onDoubleTap`: A callback function that is called when a double tap gesture is detected. This is triggered when the user taps twice within a short duration.
 * - `onLongPress`: A callback function that is called when a long press gesture is detected. This is triggered when the user holds down their touch or mouse click for a specified duration (`longPressDelay`).
 * - `onPanUpdate`: A callback function that is called with the position (x, y coordinates) during a drag (pan) update. This is useful for tracking dragging movements.
 * - `onVerticalDragUpdate`: A callback function that is called with the position (x, y coordinates) during vertical drag updates. This is useful for tracking vertical movement.
 * - `onHorizontalDragUpdate`: A callback function that is called with the position (x, y coordinates) during horizontal drag updates. This is useful for tracking horizontal movement.
 * - `longPressDelay`: The duration (in milliseconds) to wait before triggering the long press callback. Defaults to 500ms if not provided.
 * - `children`: The content to be rendered and interacted with. The gesture detection is applied to this content.
 */
const GestureDetector: React.FC<GestureDetectorProps> = ({
  children,
  onTap,
  onDoubleTap,
  onLongPress,
  onPanUpdate,
  onVerticalDragUpdate,
  onHorizontalDragUpdate,
  longPressDelay = 500,
}) => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [pressTimeout, setPressTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const currentTime = Date.now();
    if (lastTap && currentTime - lastTap < 300) {
      if (onDoubleTap) onDoubleTap();
      setLastTap(null); // Reset last tap time after double tap
    } else {
      if (onTap) onTap();
      setLastTap(currentTime);
    }
  };

  const handleLongPress = (e: React.MouseEvent | React.TouchEvent) => {
    if (pressTimeout) {
      clearTimeout(pressTimeout);
    }
    setPressTimeout(
      setTimeout(() => {
        if (onLongPress) onLongPress();
      }, longPressDelay)
    );
  };

  const handlePanUpdate = (e: React.MouseEvent | React.TouchEvent) => {
    const position =
      "touches" in e
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
    if (onPanUpdate) onPanUpdate(position);
  };

  const handleVerticalDragUpdate = (e: React.MouseEvent | React.TouchEvent) => {
    const position =
      "touches" in e
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
    if (onVerticalDragUpdate) onVerticalDragUpdate(position);
  };

  const handleHorizontalDragUpdate = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    const position =
      "touches" in e
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
    if (onHorizontalDragUpdate) onHorizontalDragUpdate(position);
  };

  const resetPressTimeout = () => {
    if (pressTimeout) {
      clearTimeout(pressTimeout);
    }
  };

  // Event handlers for mouse and touch events
  const mouseEvents = {
    onClick: handleTap,
    onMouseDown: handleLongPress,
    onMouseMove: handlePanUpdate,
    onMouseUp: resetPressTimeout,
  };

  const touchEvents = {
    onTouchStart: handleLongPress,
    onTouchMove: handlePanUpdate,
    onTouchEnd: resetPressTimeout,
    onClick: handleTap,
  };

  return (
    <div
      style={{ position: "relative" }}
      {...(typeof window !== "undefined" && window.ontouchstart !== undefined
        ? touchEvents
        : mouseEvents)}
    >
      {children}
    </div>
  );
};

export default GestureDetector;
