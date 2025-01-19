import React from "react";

// Define the types for the props
interface AppBarProps {
  title: string; // The title of the app bar
  leading?: React.ReactNode; // The leading icon, like a back button
  actions?: React.ReactNode[]; // An array of action icons (e.g., buttons)
  backgroundColor?: string; // The background color of the app bar
  color?: string; // The text and icon color
  elevation?: number; // The shadow elevation for the app bar
  style?: React.CSSProperties; // Additional custom styles for the app bar
}

const AppBar: React.FC<AppBarProps> = ({
  title,
  leading,
  actions = [],
  backgroundColor = "#6200ea", // Default Flutter purple color
  color = "#fff", // Default white color for text and icons
  elevation = 4, // Default elevation (shadow)
  style = {}, // Custom styles passed from parent
}) => {
  // Default styling for the app bar
  const appBarStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor,
    color,
    boxShadow: elevation > 0 ? `0 2px 4px rgba(0, 0, 0, 0.1)` : "none",
    position: "relative",
    ...style,
  };

  // Styling for the title
  const titleStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  // Styling for the leading icon (e.g., back button)
  const leadingStyles: React.CSSProperties = {
    position: "absolute",
    left: "20px",
    cursor: "pointer",
  };

  // Styling for the action icons
  const actionsStyles: React.CSSProperties = {
    display: "flex",
    gap: "10px",
  };

  return (
    <header style={appBarStyles}>
      {/* Leading icon */}
      {leading && <div style={leadingStyles}>{leading}</div>}

      {/* Title in the center */}
      <div style={{ flex: 1, textAlign: "center", ...titleStyles }}>
        {title}
      </div>

      {/* Action icons */}
      {actions.length > 0 && (
        <div style={actionsStyles}>
          {actions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </div>
      )}
    </header>
  );
};

export default AppBar;
