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
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
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
};

/**
 * A flexible container component for layout and styling with support for gradients, shadows, and animations.
 *
 * Example usage:
 * ```tsx
 * // Basic container with padding, margin, background color, and shadow
 * <AnimatedContainer
 *   padding={20}
 *   margin={10}
 *   backgroundColor="lightblue"
 *   borderRadius={10}
 *   shadow="md"
 *   width="300px"
 *   height="200px"
 * >
 *   <h1 style={{ textAlign: 'center' }}>Hello World</h1>
 * </AnimatedContainer>
 *
 * // With a linear gradient background
 * <AnimatedContainer
 *   padding={20}
 *   linearGradient="to right, #ff7e5f, #feb47b"
 *   width="100%"
 *   height="100vh"
 * >
 *   <h2 style={{ textAlign: 'center' }}>Welcome to React!</h2>
 * </AnimatedContainer>
 *
 * // With a custom box shadow and padding
 * <AnimatedContainer
 *   boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
 *   padding="30px"
 *   width="400px"
 *   height="300px"
 * >
 *   <p>This is a container with a custom box-shadow.</p>
 * </AnimatedContainer>
 *
 * // With transform property applied (scaling and rotation)
 * <AnimatedContainer
 *   padding={20}
 *   margin={10}
 *   backgroundColor="lightgreen"
 *   borderRadius={10}
 *   transform="scale(1.1) rotate(10deg)" // Adding transform
 *   width="300px"
 *   height="200px"
 * >
 *   <h1 style={{ textAlign: 'center' }}>Transformed Container</h1>
 * </AnimatedContainer>
 *
 * // With animation duration control
 * <AnimatedContainer
 *   padding={20}
 *   margin={10}
 *   backgroundColor="lightpink"
 *   borderRadius={15}
 *   animationDuration={700} // Adjust animation duration
 *   width="250px"
 *   height="150px"
 * >
 *   <h3 style={{ textAlign: 'center' }}>Animated Container</h3>
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
    border, // Apply border style if provided
    borderTop, // Apply top border if provided
    borderRight, // Apply right border if provided
    borderBottom, // Apply bottom border if provided
    borderLeft, // Apply left border if provided
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
      border: computedStyles.border,
      borderTop: computedStyles.borderTop,
      borderRight: computedStyles.borderRight,
      borderBottom: computedStyles.borderBottom,
      borderLeft: computedStyles.borderLeft,
      boxShadow: computedStyles.boxShadow,
      width: computedStyles.width,
      height: computedStyles.height,
      transform: transform || "scale(1)", // Apply transform if provided, default to no transform
    },
    from: {
      opacity: 0, // Initial opacity set to 0 (fade-in effect)
      transform: "scale(0.8)", // Initial scale set to 0.8 (grow effect)
    },
    reset: true, // Reset animation when component is re-rendered
    reverse: true, // Reverse the animation when prop values change
    config: { duration: animationDuration, easing: easeCubicInOut }, // Smooth cubic easing and adjustable duration
  });

  const Element = as; // Use 'as' prop for custom tag name (defaults to 'div')

  return (
    <animated.div style={{ ...animatedStyles, ...style }} {...(props as any)}>
      {children} {/* Render children inside the animated container */}
    </animated.div>
  );
};

export default AnimatedContainer;
