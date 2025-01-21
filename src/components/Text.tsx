import React from "react";

// Interface for the Text props
interface TextProps {
  data: string;
  style?: React.CSSProperties;
  textAlign?: "left" | "right" | "center" | "justify";
  textDirection?: "ltr" | "rtl";
  locale?: string;
  softWrap?: boolean;
  overflow?: "clip" | "ellipsis" | "fade";
  textScaleFactor?: number;
  textScaler?: number;
  maxLines?: number;
  semanticsLabel?: string;
  textWidthBasis?: "parent" | "self" | "longest";
  textHeightBehavior?: "none" | "strict";
  selectionColor?: string;

  // Directly add TextStyle properties
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "bolder" | "lighter";
  color?: string;
  fontFamily?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  lineHeight?: string | number;
  letterSpacing?: string | number;

  // Linear Gradient Support
  gradient?: string[]; // Array of colors for gradient (e.g., ['red', 'blue'])
  gradientAngle?: number; // Angle for gradient (default is 0)
}

/**
 * Text component that renders text with various customization options.
 *
 * Example usage:
 * ```tsx
 * <Text
 *   data="Hello World"
 *   textAlign="center"
 *   textDirection="ltr"
 *   textScaler={1.5}
 *   fontSize={20}
 *   color="blue"
 *   fontWeight="bold"
 *   lineHeight="1.5"
 *   letterSpacing="0.5px"
 *   maxLines={2}
 *   selectionColor="blue"
 *   gradient={['red', 'yellow', 'blue']}
 *   gradientAngle={45}
 * />
 * ```
 */
const Text: React.FC<TextProps> = ({
  data,
  style,
  textAlign = "left",
  textDirection = "ltr",
  locale,
  softWrap = true,
  overflow = "ellipsis",
  textScaleFactor = 1,
  textScaler = 1,
  maxLines,
  semanticsLabel,
  textWidthBasis = "parent",
  textHeightBehavior = "none",
  selectionColor = "transparent",
  fontSize,
  fontWeight,
  color,
  fontFamily,
  textTransform,
  lineHeight,
  letterSpacing,
  gradient,
  gradientAngle = 0,
}) => {
  // Prepare the gradient background if the gradient prop is provided
  const gradientBackground = gradient
    ? `linear-gradient(${gradientAngle}deg, ${gradient.join(", ")})`
    : undefined;

  // Merging all styles, including dynamic ones based on props
  const textStyle: React.CSSProperties = {
    ...style,
    textAlign,
    direction: textDirection,
    overflow: overflow === "ellipsis" ? "hidden" : "visible",
    textOverflow: overflow === "ellipsis" ? "ellipsis" : "clip",
    whiteSpace: softWrap ? "normal" : "nowrap",
    WebkitLineClamp: maxLines ? maxLines : undefined,
    lineHeight: textHeightBehavior === "strict" ? "1.2" : lineHeight, // Use lineHeight prop if not strict
    fontSize: fontSize ? `${fontSize}px` : `${textScaler * textScaleFactor}rem`, // Scaling with textScaler and textScaleFactor
    color: color || "inherit", // Set the default color to inherit
    width:
      textWidthBasis === "parent"
        ? "100%"
        : textWidthBasis === "self"
        ? "auto"
        : "max-content", // Handling text width
    fontWeight,
    fontFamily,
    textTransform,
    letterSpacing,
    background: gradientBackground, // Apply the gradient if provided
    backgroundClip: gradient ? "text" : undefined, // Clip the background to the text
    WebkitBackgroundClip: gradient ? "text" : undefined, // For WebKit-based browsers
    WebkitTextFillColor: gradient ? "transparent" : undefined, // Make text fill transparent
  };

  // Add a style tag for the selection color
  const selectionStyleTag = selectionColor ? (
    <style>
      {`
        .selection-style::selection {
          background-color: ${selectionColor};
        }
      `}
    </style>
  ) : null;

  // Accessibility props for semantic labeling
  const accessibilityProps = {
    "aria-label": semanticsLabel,
    role: semanticsLabel ? "text" : undefined,
  };

  return (
    <span
      {...accessibilityProps}
      style={{ ...textStyle, ...selectionStyleTag }}
    >
      {data}
    </span>
  );
};

export default Text;
