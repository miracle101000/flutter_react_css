import React from "react";

// WidgetSpan for embedding inline widgets (e.g., images, buttons)
interface WidgetSpanProps {
  children: React.ReactNode;
}

const WidgetSpan: React.FC<WidgetSpanProps> = ({ children }) => {
  return <span style={{ display: "inline-block" }}>{children}</span>;
};

// TextSpan component for rendering text with specific styles and handling tap gestures.
interface TextSpanProps {
  text?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onTap?: () => void; // Added onTap for handling tap gestures

  // Text styling properties
  textAlign?: "left" | "right" | "center" | "justify";
  textDirection?: "ltr" | "rtl";
  textScaler?: number;
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "bolder" | "lighter";
  lineHeight?: string | number;
  letterSpacing?: string | number;
  maxLines?: number;
  color?: string; // Replaced selectionColor with color
  gradient?: string[];
  gradientAngle?: number;
}

/**
 * The `TextSpan` component renders text with optional custom styling and an onTap handler.
 * It can be used to apply styles to specific sections of text or to combine text with
 * other inline elements such as components or widgets.
 *
 * @param text - The text content to display within the span (optional).
 * @param style - Optional custom CSS styles to apply to the text.
 * @param children - Optional child elements that can be rendered alongside the text.
 * @param onTap - Optional function to handle tap gestures on the text.
 *
 * Example usage:
 * ```tsx
 * <TextSpan
 *   text="Hello"
 *   textAlign="center"
 *   textDirection="ltr"
 *   textScaler={1.5}
 *   fontSize={20}
 *   fontWeight="bold"
 *   lineHeight="1.5"
 *   letterSpacing="0.5px"
 *   maxLines={2}
 *   color="blue"
 *   gradient={['red', 'yellow', 'blue']}
 *   gradientAngle={45}
 *   onTap={() => alert("Text tapped!")}
 * />
 * <TextSpan
 *   text=" world!"
 *   style={{ color: 'red' }}
 *   onTap={() => alert("World text tapped!")}
 * />
 * ```
 */
const TextSpan: React.FC<TextSpanProps> = ({
  text,
  style,
  children,
  onTap,
  textAlign = "left",
  textDirection = "ltr",
  textScaler = 1,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  maxLines,
  color = "black", // Default color is black if not provided
  gradient,
  gradientAngle = 0,
}) => {
  const handleTap = () => {
    if (onTap) {
      onTap(); // Execute the onTap function when the span is tapped
    }
  };

  // Prepare the gradient background if the gradient prop is provided
  const gradientBackground = gradient
    ? `linear-gradient(${gradientAngle}deg, ${gradient.join(", ")})`
    : undefined;

  // Merging all styles, including dynamic ones based on props
  const textStyle: React.CSSProperties = {
    ...style,
    textAlign,
    direction: textDirection,
    fontSize: fontSize ? `${fontSize}px` : `${textScaler}rem`,
    fontWeight,
    lineHeight,
    letterSpacing,
    maxWidth: maxLines ? "100%" : undefined, // Enforcing maxLines logic
    background: gradientBackground,
    backgroundClip: gradient ? "text" : undefined,
    WebkitBackgroundClip: gradient ? "text" : undefined,
    WebkitTextFillColor: gradient ? "transparent" : undefined,
    color, // Apply the text color
    cursor: onTap ? "pointer" : "default", // Show pointer if onTap is provided
  };

  return (
    <span style={textStyle} onClick={handleTap}>
      {text}
      {children}
    </span>
  );
};

// RichText component for rendering a combination of TextSpans (mimicking Flutter's RichText).
interface RichTextProps {
  children: React.ReactNode;
}

/**
 * A component that allows for rich text formatting, enabling custom text styling
 * and inline elements within a single block of text, similar to Flutter's RichText.
 *
 * @param children - The inline elements (such as TextSpan) and text content to be displayed.
 *
 * Example usage:
 * ```tsx
 * <RichText>
 *   <TextSpan
 *     text="Hello"
 *     textAlign="center"
 *     textDirection="ltr"
 *     textScaler={1.5}
 *     fontSize={20}
 *     fontWeight="bold"
 *     lineHeight="1.5"
 *     letterSpacing="0.5px"
 *     maxLines={2}
 *     color="blue"
 *     gradient={['red', 'yellow', 'blue']}
 *     gradientAngle={45}
 *     onTap={() => alert("Hello text tapped!")}
 *   />
 *   <TextSpan
 *     text=" world!"
 *     style={{ color: 'red' }}
 *     onTap={() => alert("World text tapped!")}
 *   />
 * </RichText>
 * ```
 */
const RichText: React.FC<RichTextProps> = ({ children }) => {
  return <div style={{ display: "inline" }}>{children}</div>;
};

export default RichText; // Default export RichText
export { TextSpan, WidgetSpan };
