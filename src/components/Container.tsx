import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { theme } from "../theme/defaultTheme";
import { JSX } from "react/jsx-runtime";

type ContainerProps = {
  /** Content inside the Container */
  children?: React.ReactNode;
  /** Padding inside the Container */
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingHorizontal?: number | string; // Symmetric left-right padding
  paddingVertical?: number | string; // Symmetric top-bottom padding
  /** Margin outside the Container */
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginHorizontal?: number | string; // Symmetric left-right margin
  marginVertical?: number | string; // Symmetric top-bottom margin
  /** Background color (uses theme colors if available) */
  backgroundColor?: keyof typeof theme.colors;
  /** Border radius for rounded corners (supports individual corner values) */
  borderRadius?: string | number;
  borderTopLeftRadius?: string | number;
  borderTopRightRadius?: string | number;
  borderBottomLeftRadius?: string | number;
  borderBottomRightRadius?: string | number;
  /** Border properties: thickness and color */
  border?: string; // e.g., "1px solid #ccc"
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  /** Shadow level (sm, md, lg) */
  shadow?: "sm" | "md" | "lg";
  /** Box-shadow property for custom shadow styles */
  boxShadow?: string;
  /** Linear gradient background (from-to colors) */
  linearGradient?: string;
  /** Radial gradient background */
  radialGradient?: string;
  /** Sweep gradient background */
  sweepGradient?: string;
  /** Width of the Container */
  width?: string | number;
  /** Height of the Container */
  height?: string | number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** HTML element type (e.g., div, section, article) */
  as?: keyof JSX.IntrinsicElements;
};

/**
 * A flexible container component for layout and styling with support for gradients and shadows.
 *
 * Example usage:
 * ```tsx
 * <Container
 *   padding={20}
 *   margin={10}
 *   backgroundColor="lightblue"
 *   borderRadius={10}
 *   shadow="md"
 *   width="300px"
 *   height="200px"
 * >
 *   <h1 style={{ textAlign: 'center' }}>Hello World</h1>
 * </Container>
 *
 * // With a linear gradient background
 * <Container
 *   padding={20}
 *   linearGradient="to right, #ff7e5f, #feb47b"
 *   width="100%"
 *   height="100vh"
 * >
 *   <h2 style={{ textAlign: 'center' }}>Welcome to React!</h2>
 * </Container>
 *
 * // With a custom box shadow and padding
 * <Container
 *   boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
 *   padding="30px"
 *   width="400px"
 *   height="300px"
 * >
 *   <p>This is a container with a custom box-shadow.</p>
 * </Container>
 * ```
 */
const Container: React.FC<ContainerProps> = ({
  children,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginHorizontal,
  marginVertical,
  backgroundColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  shadow,
  boxShadow,
  linearGradient,
  radialGradient,
  sweepGradient,
  width,
  height,
  style,
  as = "div",
  ...props
}) => {
  const theme = useTheme();

  // Resolve the background color safely with type assertion
  const resolvedBackgroundColor =
    backgroundColor &&
    theme.colors[backgroundColor as keyof typeof theme.colors]
      ? theme.colors[backgroundColor as keyof typeof theme.colors]
      : undefined;

  // Compute padding and margin for horizontal and vertical
  const computedPaddingLeft =
    paddingLeft || paddingHorizontal || padding || "0";
  const computedPaddingRight =
    paddingRight || paddingHorizontal || padding || "0";
  const computedPaddingTop = paddingTop || paddingVertical || padding || "0";
  const computedPaddingBottom =
    paddingBottom || paddingVertical || padding || "0";

  const computedMarginLeft = marginLeft || marginHorizontal || margin || "0";
  const computedMarginRight = marginRight || marginHorizontal || margin || "0";
  const computedMarginTop = marginTop || marginVertical || margin || "0";
  const computedMarginBottom = marginBottom || marginVertical || margin || "0";

  // Resolve the final styles based on props and theme
  const computedStyles: React.CSSProperties = {
    padding: padding || "0", // Default to no padding
    paddingTop: computedPaddingTop, // Support for individual padding
    paddingRight: computedPaddingRight,
    paddingBottom: computedPaddingBottom,
    paddingLeft: computedPaddingLeft,

    margin: margin || "0", // Default to no margin
    marginTop: computedMarginTop,
    marginRight: computedMarginRight,
    marginBottom: computedMarginBottom,
    marginLeft: computedMarginLeft,

    backgroundColor: resolvedBackgroundColor,
    backgroundImage: linearGradient
      ? `linear-gradient(${linearGradient})` // Example: "to right, #ff7e5f, #feb47b"
      : radialGradient
      ? `radial-gradient(${radialGradient})` // Example: "circle, #ff7e5f, #feb47b"
      : sweepGradient
      ? `sweep-gradient(${sweepGradient})` // Example: "45deg, #ff7e5f, #feb47b"
      : undefined,
    borderRadius:
      borderRadius ||
      (borderTopLeftRadius ||
      borderTopRightRadius ||
      borderBottomLeftRadius ||
      borderBottomRightRadius
        ? `${borderTopLeftRadius || "0"} ${borderTopRightRadius || "0"} ${
            borderBottomLeftRadius || "0"
          } ${borderBottomRightRadius || "0"}`
        : "0"), // Default to no border-radius, or use individual corners
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    boxShadow:
      boxShadow ||
      (shadow === "sm"
        ? "0px 1px 3px rgba(0, 0, 0, 0.2)"
        : shadow === "md"
        ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
        : shadow === "lg"
        ? "0px 10px 15px rgba(0, 0, 0, 0.1)"
        : undefined),
    width: width || "auto", // Default to auto width
    height: height || "auto", // Default to auto height
    ...style,
  };

  const Element = as;

  return (
    <Element style={computedStyles} {...props}>
      {children}
    </Element>
  );
};

export default Container;
