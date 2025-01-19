import React from "react";

interface WidgetSpanProps {
  children: React.ReactNode;
}

/**
 * The `WidgetSpan` component allows React components or widgets to be embedded inline
 * with text content, similar to Flutter's `WidgetSpan`. This is useful for integrating
 * interactive elements or complex components within a line of text.
 *
 * The component uses `display: inline-block` to ensure it behaves as an inline element
 * while allowing complex React components to be embedded.
 *
 * @param children - The child elements or React components to render inline with text.
 *
 * Example usage:
 * ```tsx
 * <WidgetSpan>
 *   <div style={{ width: 50, height: 50, backgroundColor: 'red' }} />
 * </WidgetSpan>
 * ```
 */
const WidgetSpan: React.FC<WidgetSpanProps> = ({ children }) => {
  return <span style={{ display: "inline-block" }}>{children}</span>;
};

// TextSpan component for rendering text with specific styles.
interface TextSpanProps {
  text?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * The `TextSpan` component renders a span of text with optional custom styling.
 * It can be used to apply styles to specific sections of text, or to combine text
 * with other inline elements such as components or widgets.
 *
 * @param text - The text content to display within the span (optional).
 * @param style - Optional custom CSS styles to apply to the text.
 * @param children - Optional child elements that can be rendered alongside the text.
 *
 * Example usage:
 * ```tsx
 * <TextSpan text="Hello" style={{ fontWeight: 'bold' }} />
 * <TextSpan>
 *   <span style={{ color: 'blue' }}>World</span>
 * </TextSpan>
 * ```
 */
const TextSpan: React.FC<TextSpanProps> = ({ text, style, children }) => {
  return (
    <span style={style}>
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
 *   <TextSpan text="Hello" style={{ fontWeight: 'bold' }} />
 *   <TextSpan text=" world!" style={{ color: 'red' }} />
 * </RichText>
 * ```
 */
const RichText: React.FC<RichTextProps> = ({ children }) => {
  return <div style={{ display: "inline" }}>{children}</div>;
};

export default RichText; // Default export RichText
export { TextSpan, WidgetSpan };
