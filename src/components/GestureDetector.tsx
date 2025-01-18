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
