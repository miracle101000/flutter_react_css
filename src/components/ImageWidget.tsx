import React, { useState, useEffect } from "react";

interface ImageWidgetProps {
  src: string | File | Uint8Array; // Support for network URL, file, or byte data
  alt?: string;
  borderRadius?: {
    topLeft?: string | number; // Top-left corner radius
    topRight?: string | number; // Top-right corner radius
    bottomLeft?: string | number; // Bottom-left corner radius
    bottomRight?: string | number; // Bottom-right corner radius
    all?: string | number; // All corners radius (applies to all if provided)
  };
  loadingPlaceholder?: React.ReactNode; // Placeholder for loading state
  errorPlaceholder?: React.ReactNode; // Placeholder for error state
  width?: string | number; // Image width
  height?: string | number; // Image height
  style?: React.CSSProperties; // Custom styles
  onLoad?: () => void; // Callback when the image is loaded
  onError?: () => void; // Callback when the image fails to load
}

/**
 * A component that displays an image with support for multiple image sources, including URLs, File objects, and Uint8Array.
 * This component handles loading states, errors, and provides customizable placeholders while the image is being loaded or if it fails to load.
 * It also supports applying custom border radius and responsive dimensions for the image container.
 *
 * Example usage:
 * ```tsx
 * <ImageWidget
 *   src="https://example.com/image.jpg"
 *   alt="Example Image"
 *   borderRadius={{ topLeft: "12px", topRight: "12px" }}
 *   width="300px"
 *   height="200px"
 *   loadingPlaceholder={<div>Loading...</div>}
 *   errorPlaceholder={<div>Failed to load image</div>}
 * />
 * ```
 *
 * Properties:
 * - `src`: The source of the image. This can be a URL string, a File object, or a Uint8Array (binary image data).
 * - `alt`: Alt text to provide for the image, primarily used for accessibility.
 * - `borderRadius`: Custom border radius for the image container, allowing control over rounded corners. You can provide specific values for each corner (e.g., `topLeft`, `topRight`, `bottomLeft`, `bottomRight`) or a single value for all corners (e.g., `{ all: "8px" }`).
 * - `loadingPlaceholder`: A JSX element to display while the image is loading. The default is a simple "Loading..." message.
 * - `errorPlaceholder`: A JSX element to display if the image fails to load. The default is a simple "Failed to load image" message.
 * - `width`: The width of the image container. It can be a string (e.g., `"100%"`) or a number (e.g., `300`).
 * - `height`: The height of the image container. It can be a string (e.g., `"auto"`) or a number (e.g., `200`).
 * - `style`: Additional inline styles for customizing the image container.
 * - `onLoad`: A callback function that is called when the image successfully loads.
 * - `onError`: A callback function that is called if the image fails to load.
 *
 * This component is designed to be flexible and handle various image types and sources while ensuring a smooth user experience during loading and error states.
 */
const ImageWidget: React.FC<ImageWidgetProps> = ({
  src,
  alt,
  borderRadius = { all: "8px" },
  loadingPlaceholder = <div>Loading...</div>,
  errorPlaceholder = <div>Failed to load image</div>,
  width = "100%",
  height = "auto",
  style,
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (src instanceof File) {
      // If src is a file, use FileReader to convert to base64 URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setLoading(false);
      };
      reader.onerror = () => {
        setHasError(true);
        setLoading(false);
        onError && onError();
      };
      reader.readAsDataURL(src);
    } else if (src instanceof Uint8Array) {
      // If src is bytes, create an object URL
      const objectUrl = URL.createObjectURL(new Blob([src]));
      setImageSrc(objectUrl);
      setLoading(false);
    } else if (typeof src === "string") {
      // If src is a network URL
      setImageSrc(src);
      setLoading(false);
    }
  }, [src, onError]);

  const handleImageLoad = () => {
    setLoading(false);
    onLoad && onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setLoading(false);
    onError && onError();
  };

  // Calculate border radius values based on props
  const borderRadiusStyle = {
    borderTopLeftRadius: borderRadius.topLeft || borderRadius.all,
    borderTopRightRadius: borderRadius.topRight || borderRadius.all,
    borderBottomLeftRadius: borderRadius.bottomLeft || borderRadius.all,
    borderBottomRightRadius: borderRadius.bottomRight || borderRadius.all,
  };

  return (
    <div
      style={{
        width,
        height,
        ...borderRadiusStyle,
        overflow: "hidden",
        ...style,
      }}
    >
      {loading && !hasError && (
        <div style={{ width: "100%", height: "100%" }}>
          {loadingPlaceholder}
        </div>
      )}

      {hasError && !loading && (
        <div style={{ width: "100%", height: "100%" }}>{errorPlaceholder}</div>
      )}

      {!loading && !hasError && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...borderRadiusStyle, // Apply the calculated border radius
          }}
        />
      )}
    </div>
  );
};

export default ImageWidget;
