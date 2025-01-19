import React, { useState, useEffect, useRef } from "react";

// Define the types for the Carousel props
interface CarouselProps {
  children: React.ReactNode[]; // The items (slides) to be displayed in the carousel
  height: string; // Height of the carousel
  aspectRatio: number; // Aspect ratio for the carousel's height
  initialPage: number; // Index of the first slide to be displayed
  enableInfiniteScroll: boolean; // Whether to allow infinite scroll (looping through slides)
  reverse: boolean; // Whether to reverse the direction of scrolling
  autoPlay: boolean; // Whether the carousel should automatically play
  autoPlayInterval: number; // The interval (in milliseconds) for autoplay
  autoPlayAnimationDuration: number; // Duration of the slide transition animation
  autoPlayCurve: string; // The CSS easing function for animation transitions
  enlargeCenterPage: boolean; // Whether to enlarge the center slide
  enlargeFactor: number; // The factor by which the center slide will be enlarged
  onPageChanged: (index: number) => void; // Callback when the page changes
  scrollDirection: "horizontal" | "vertical"; // Direction of scroll (horizontal or vertical)
  viewportFraction: number; // Fraction of the viewport that each slide occupies
  builder?: (index: number) => React.ReactNode; // Optional builder function to customize slide content
}

/**
 * Carousel Component
 * A flexible and customizable React component for displaying a collection of slides in a carousel-style layout.
 * Supports features like autoplay, infinite scroll, and custom slide content.
 *
 * Props:
 * - children: The slides to be displayed in the carousel. Each child can be any React node (e.g., images, text, etc.).
 * - height: The height of the carousel. Can be defined as a string (e.g., '300px').
 * - aspectRatio: Defines the aspect ratio of the carousel relative to its height (e.g., 1.5 means 1.5 times the height).
 * - initialPage: The index of the slide to show initially. Default is 0.
 * - enableInfiniteScroll: Whether the carousel should loop infinitely when navigating between slides. Default is false.
 * - reverse: Whether the scroll direction should be reversed. Default is false.
 * - autoPlay: Whether the carousel should automatically transition through slides. Default is false.
 * - autoPlayInterval: The interval (in milliseconds) for automatic slide transitions. Default is 3000ms.
 * - autoPlayAnimationDuration: The duration (in milliseconds) of the slide transition animation. Default is 500ms.
 * - autoPlayCurve: The CSS easing function to apply to the transition animation. Default is 'ease'.
 * - enlargeCenterPage: Whether the center slide should be enlarged for emphasis. Default is false.
 * - enlargeFactor: The scale factor for enlarging the center slide. Default is 1.2.
 * - onPageChanged: A callback function that is called when the active page index changes. It receives the new index as an argument.
 * - scrollDirection: The direction of scrolling, either 'horizontal' or 'vertical'. Default is 'horizontal'.
 * - viewportFraction: A value between 0 and 1 that determines how much of the viewport each slide occupies. Default is 1.
 * - builder: An optional custom builder function that can be used to render slides in a custom way based on the index.
 *
 * Example Usage:
 * ```tsx
 * import Carousel from './path-to-carousel';
 *
 * function App() {
 *   return (
 *     <div style={{ width: '100%', height: '500px' }}>
 *       <Carousel
 *         height="400px"
 *         aspectRatio={1.5}
 *         initialPage={0}
 *         autoPlay={true}
 *         autoPlayInterval={3000}
 *         onPageChanged={(index) => console.log('Page changed to:', index)}
 *       >
 *         <img src="slide1.jpg" alt="Slide 1" />
 *         <img src="slide2.jpg" alt="Slide 2" />
 *         <img src="slide3.jpg" alt="Slide 3" />
 *       </Carousel>
 *     </div>
 *   );
 * }
 *
 * export default App;
 * ```
 */
const Carousel: React.FC<CarouselProps> = ({
  children,
  height,
  aspectRatio,
  initialPage,
  enableInfiniteScroll,
  reverse,
  autoPlay,
  autoPlayInterval,
  autoPlayAnimationDuration,
  autoPlayCurve,
  enlargeCenterPage, // Prop to enlarge the center page
  enlargeFactor, // Prop to define how much the center page should be enlarged
  onPageChanged,
  scrollDirection,
  viewportFraction,
  builder,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const [isPlaying, setIsPlaying] = useState(autoPlay); // Whether the carousel is playing
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const carouselIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const calculateHeight = () => `${parseInt(height) * aspectRatio}px`;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = reverse ? prevIndex - 1 : prevIndex + 1;
      return enableInfiniteScroll
        ? (newIndex + children.length) % children.length
        : Math.min(Math.max(newIndex, 0), children.length - 1);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = reverse ? prevIndex + 1 : prevIndex - 1;
      return enableInfiniteScroll
        ? (newIndex + children.length) % children.length
        : Math.max(Math.min(newIndex, children.length - 1), 0);
    });
  };

  const handlePageChange = (index: number) => {
    setCurrentIndex(index);
    onPageChanged(index);
  };

  // Start or stop autoplay based on isPlaying
  useEffect(() => {
    if (isPlaying && !carouselIntervalRef.current) {
      carouselIntervalRef.current = setInterval(nextSlide, autoPlayInterval);
    } else if (!isPlaying && carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
      carouselIntervalRef.current = null;
    }

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [isPlaying, autoPlayInterval]);

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when image has loaded
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true); // Set error to true if image fails to load
  };

  const renderItem = (index: number) => {
    if (builder) {
      return builder(index);
    }

    const child = children[index];

    // If the child is an image, we can manage loading and error states
    if (React.isValidElement(child) && (child.type as any) === "img") {
      return React.cloneElement(child, {
        onLoad: handleImageLoad,
        onError: handleImageError,
      } as React.HTMLAttributes<HTMLImageElement>);
    }

    return child;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: calculateHeight(),
        overflow: "hidden",
        display: "flex",
        flexDirection: scrollDirection === "horizontal" ? "row" : "column",
        transform: `scaleX(${reverse ? -1 : 1})`,
        transition: `transform ${autoPlayAnimationDuration}ms ${autoPlayCurve}`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: scrollDirection === "horizontal" ? "row" : "column",
          transform: `translateX(-${(currentIndex * 100) / viewportFraction}%)`,
          transition: `transform ${autoPlayAnimationDuration}ms ${autoPlayCurve}`,
        }}
      >
        {React.Children.map(children, (_, index) => {
          const isCenterPage = index === currentIndex; // Determine if this item is the center page
          return (
            <div
              key={index}
              style={{
                flex: `${viewportFraction}`,
                width: `${100 / viewportFraction}%`,
                height: "100%",
                transform:
                  enlargeCenterPage && isCenterPage
                    ? `scale(${enlargeFactor})`
                    : "none", // Apply scaling to center page
                transition: "transform 0.3s ease",
              }}
            >
              {renderItem(index)}
            </div>
          );
        })}
      </div>

      {enableInfiniteScroll && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            &#10095;
          </button>
        </>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
        }}
      >
        {React.Children.map(children, (_, index) => (
          <span
            key={index}
            onClick={() => handlePageChange(index)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "black" : "white",
              margin: "0 5px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Display loading indicator if content is loading */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "20px",
          }}
        >
          Loading...
        </div>
      )}

      {/* Display error message if there was an error loading content */}
      {hasError && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "red",
            fontSize: "20px",
          }}
        >
          Error loading content
        </div>
      )}

      {/* Button to toggle play/pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Carousel;
