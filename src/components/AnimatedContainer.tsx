import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { theme } from "../theme/defaultTheme";
import { JSX } from "react/jsx-runtime";
import { useSpring, animated } from "react-spring"; // Import from react-spring
import { easeCubicInOut } from "d3-ease"; // Optional easing function (can be installed via npm install d3-ease)

type AnimatedContainerProps = {
  children?: React.ReactNode;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  backgroundColor?: keyof typeof theme.colors;
  borderRadius?: string | number;
  borderTopLeftRadius?: string | number;
  borderTopRightRadius?: string | number;
  borderBottomLeftRadius?: string | number;
  borderBottomRightRadius?: string | number;
  border?: string;
  borderTop?: string; // Static border color for top
  borderRight?: string; // Static border color for right
  borderBottom?: string; // Static border color for bottom
  borderLeft?: string; // Static border color for left
  borderTopGradient?: string; // Gradient border for top
  borderRightGradient?: string; // Gradient border for right
  borderBottomGradient?: string; // Gradient border for bottom
  borderLeftGradient?: string; // Gradient border for left
  shadow?: "sm" | "md" | "lg";
  boxShadow?: string;
  linearGradient?: string;
  radialGradient?: string;
  sweepGradient?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  animationDuration?: number; // Added to control the duration of the animation
  transform?: string; // Added for transform animations
  borderThickness?: string | number; // Border thickness (new)
  onEnd?: () => void; // Callback function triggered when the animation ends
};

/**
 * A flexible container component for layout and styling with support for gradients, shadows, and animations.
 *
 * Example usage:
 * ```tsx
 * <AnimatedContainer
 *   padding={20}
 *   margin={10}
 *   backgroundColor="lightblue"
 *   borderRadius={10}
 *   borderThickness={2} // Added border thickness
 *   borderTopGradient="linear-gradient(to right, green, blue)" // Added top border gradient
 *   borderRightGradient="linear-gradient(to right, purple, pink)" // Added right border gradient
 *   borderBottomGradient="linear-gradient(to right, orange, cyan)" // Added bottom border gradient
 *   borderLeftGradient="linear-gradient(to right, gray, white)" // Added left border gradient
 *   shadow="md"
 *   width="300px"
 *   height="200px"
 *   onEnd={() => console.log('Animation complete')}
 * >
 *   <h1 style={{ textAlign: 'center' }}>Hello World</h1>
 * </AnimatedContainer>
 * ```
 */
const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
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
  borderTopGradient,
  borderRightGradient,
  borderBottomGradient,
  borderLeftGradient,
  shadow,
  boxShadow,
  linearGradient,
  radialGradient,
  sweepGradient,
  width,
  height,
  style,
  as = "div",
  animationDuration = 500, // Default to 500ms
  transform, // Added transform prop
  borderThickness = 1, // Default border thickness
  onEnd,
  ...props
}) => {
  const theme = useTheme();

  // Resolve background color safely with type assertion
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

  // Compute the final styles for padding, margin, and other visual properties
  const computedStyles: React.CSSProperties = {
    padding: padding || "0", // Default to no padding if not provided
    paddingTop: computedPaddingTop, // Support for individual padding
    paddingRight: computedPaddingRight,
    paddingBottom: computedPaddingBottom,
    paddingLeft: computedPaddingLeft,

    margin: margin || "0", // Default to no margin if not provided
    marginTop: computedMarginTop,
    marginRight: computedMarginRight,
    marginBottom: computedMarginBottom,
    marginLeft: computedMarginLeft,

    backgroundColor: resolvedBackgroundColor, // Apply resolved background color
    backgroundImage: linearGradient
      ? `linear-gradient(${linearGradient})` // Support for linear gradient
      : radialGradient
      ? `radial-gradient(${radialGradient})` // Support for radial gradient
      : sweepGradient
      ? `sweep-gradient(${sweepGradient})` // Support for sweep gradient
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
        : "0"), // Support for border radius

    boxShadow:
      boxShadow ||
      (shadow === "sm"
        ? "0px 1px 3px rgba(0, 0, 0, 0.2)" // Default shadow styles
        : shadow === "md"
        ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
        : shadow === "lg"
        ? "0px 10px 15px rgba(0, 0, 0, 0.1)"
        : undefined), // Apply box-shadow based on shadow prop
    width: width || "auto", // Default to 'auto' if width is not provided
    height: height || "auto", // Default to 'auto' if height is not provided
    ...style, // Allow overriding styles via the `style` prop
  };

  // Animation setup using react-spring for complex transitions
  const animatedStyles = useSpring({
    to: {
      padding: computedStyles.padding,
      paddingTop: computedStyles.paddingTop,
      paddingRight: computedStyles.paddingRight,
      paddingBottom: computedStyles.paddingBottom,
      paddingLeft: computedStyles.paddingLeft,
      margin: computedStyles.margin,
      marginTop: computedStyles.marginTop,
      marginRight: computedStyles.marginRight,
      marginBottom: computedStyles.marginBottom,
      marginLeft: computedStyles.marginLeft,
      backgroundColor: computedStyles.backgroundColor,
      backgroundImage: computedStyles.backgroundImage,
      borderRadius: computedStyles.borderRadius,
      boxShadow: computedStyles.boxShadow,
      transform: transform || "scale(1)", // Apply transform animation (e.g., scaling)
      // Animate each border with its gradient or color
      borderTop:
        borderTopGradient ||
        borderTop ||
        `${borderThickness}px solid transparent`, // Fallback to default if no gradient or color provided
      borderRight:
        borderRightGradient ||
        borderRight ||
        `${borderThickness}px solid transparent`,
      borderBottom:
        borderBottomGradient ||
        borderBottom ||
        `${borderThickness}px solid transparent`,
      borderLeft:
        borderLeftGradient ||
        borderLeft ||
        `${borderThickness}px solid transparent`,
    },
    config: {
      duration: animationDuration, // Control the duration of the animation
      easing: easeCubicInOut, // Optional easing function
    },
    onRest: onEnd, // Trigger the `onEnd` callback when animation completes
  });

  return React.createElement(as, {
    ...props,
    style: {
      ...animatedStyles, // Apply the animated styles
      ...computedStyles, // Apply the non-animated styles (e.g., initial properties)
    },
  });
};

export default AnimatedContainer;
