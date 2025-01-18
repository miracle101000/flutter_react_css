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
