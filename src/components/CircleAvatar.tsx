import React, { useEffect, useState } from "react";

type CircleAvatarProps = {
  size?: number; // Diameter of the avatar
  backgroundColor?: string; // Background color of the avatar
  backgroundImage?: string | File | Blob; // URL or File/Blob for the background image
  alt?: string; // Alt text for the image
  children?: React.ReactNode; // Optional content to display inside the avatar
  borderColor?: string; // Border color of the avatar
  borderThickness?: number; // Border thickness of the avatar
};

/**
 * The `CircleAvatar` component mimics Flutter's CircleAvatar widget, creating a circular avatar
 * that can display a background color, a background image (either a URL or a File/Blob), or optional children (e.g., text or icons).
 * It also allows you to customize the border color and thickness.
 *
 * The component is highly customizable, allowing you to specify the size, background color, background image,
 * border color, and border thickness. It uses CSS properties such as `borderRadius` to achieve the circular shape
 * and `backgroundImage` for image support.
 *
 * Example usage:
 * ```tsx
 * // Avatar with background color and border
 * <CircleAvatar size={60} backgroundColor="teal" borderColor="black" borderThickness={2}>
 *   A
 * </CircleAvatar>
 *
 * // Avatar with background image and border
 * <CircleAvatar
 *   size={80}
 *   backgroundImage="https://via.placeholder.com/150"
 *   alt="Profile Image"
 *   borderColor="red"
 *   borderThickness={3}
 * />
 *
 * // Avatar with background image from File/Blob and border
 * <CircleAvatar
 *   size={100}
 *   backgroundImage={file} // 'file' is a File object
 *   borderColor="blue"
 *   borderThickness={4}
 * >
 *   <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>B</span>
 * </CircleAvatar>
 * ```
 *
 * Properties:
 * - `size` (optional): The diameter of the avatar in pixels. Defaults to `50`.
 * - `backgroundColor` (optional): The background color of the avatar. Defaults to `#ccc`.
 * - `backgroundImage` (optional): A URL, File, or Blob for the background image. If set, it will override the background color.
 * - `alt` (optional): The alt text for the background image, used for accessibility.
 * - `children` (optional): Content to overlay inside the avatar, such as text or icons.
 * - `borderColor` (optional): The color of the border around the avatar.
 * - `borderThickness` (optional): The thickness of the border around the avatar.
 */
const CircleAvatar: React.FC<CircleAvatarProps> = ({
  size = 50,
  backgroundColor = "#ccc",
  backgroundImage,
  alt = "",
  children,
  borderColor = "transparent", // Default to no border
  borderThickness = 0, // Default to no border
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (backgroundImage instanceof File || backgroundImage instanceof Blob) {
      // If the backgroundImage is a File or Blob, convert it to a URL
      const objectUrl = URL.createObjectURL(backgroundImage);
      setImageUrl(objectUrl);

      // Clean up the URL object when the component is unmounted or image changes
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    } else if (typeof backgroundImage === "string") {
      // If it's a URL, directly use it
      setImageUrl(backgroundImage);
    } else {
      setImageUrl(undefined);
    }
  }, [backgroundImage]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: backgroundColor,
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "white", // For any child text
        border: `${borderThickness}px solid ${borderColor}`, // Border thickness and color
      }}
      aria-label={alt}
    >
      {children}
    </div>
  );
};

export default CircleAvatar;
