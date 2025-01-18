import React, { useState, useEffect, useRef } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  height: string;
  aspectRatio: number;
  initialPage: number;
  enableInfiniteScroll: boolean;
  reverse: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  autoPlayAnimationDuration: number;
  autoPlayCurve: string;
  enlargeCenterPage: boolean;
  enlargeFactor: number;
  onPageChanged: (index: number) => void;
  scrollDirection: "horizontal" | "vertical";
  viewportFraction: number;
  builder?: (index: number) => React.ReactNode;
}

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
  enlargeCenterPage,
  enlargeFactor,
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
        {React.Children.map(children, (_, index) => (
          <div
            key={index}
            style={{
              flex: `${viewportFraction}`,
              width: `${100 / viewportFraction}%`,
              height: "100%",
            }}
          >
            {renderItem(index)}
          </div>
        ))}
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
