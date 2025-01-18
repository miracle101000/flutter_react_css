import React, { useState, CSSProperties } from "react";

// Define the types for the props
interface ScaffoldProps {
  appBar: React.ReactNode; // The content of the app bar
  body: React.ReactNode; // The main body/content of the scaffold
  drawer: React.ReactNode; // The content of the drawer
  fab: React.ReactNode; // The floating action button (FAB)
  bottomNav: React.ReactNode; // The bottom navigation bar content
  snackBar: React.ReactNode; // The snack bar content
  backgroundColor?: string; // The background color of the scaffold, default is white
  appBarStyle?: CSSProperties; // Custom styles for the app bar
  drawerStyle?: CSSProperties; // Custom styles for the drawer
  bodyStyle?: CSSProperties; // Custom styles for the body
  fabStyle?: CSSProperties; // Custom styles for the FAB
  bottomNavStyle?: CSSProperties; // Custom styles for the bottom nav
  snackBarStyle?: CSSProperties; // Custom styles for the snack bar
  appBarColor?: string; // Color for the app bar background
  drawerColor?: string; // Color for the drawer background
  fabColor?: string; // Color for the FAB background
  elevation?: number; // Shadow elevation for the scaffold, app bar, and drawer
  statusBarColor?: string; // Color for the status bar area
  safeArea?: boolean; // Whether to apply safe area insets for the body content
  drawerOpen?: boolean; // Control the drawer's initial open state
  onDrawerToggle?: (isOpen: boolean) => void; // Callback to notify when the drawer is toggled
  drawerDismissible?: boolean; // Whether the drawer is dismissible by the user
}

// The Scaffold component that mimics the Flutter Scaffold widget
const Scaffold: React.FC<ScaffoldProps> = ({
  appBar,
  body,
  drawer,
  fab,
  bottomNav,
  snackBar,
  backgroundColor = "#fff", // Default background color
  appBarColor = "#6200ea", // Default app bar color
  drawerColor = "#333", // Default drawer color
  fabColor = "#6200ea", // Default FAB color
  elevation = 4, // Default elevation (shadow)
  statusBarColor = "#6200ea", // Default status bar color
  safeArea = true, // Default to true for safe area insets
  appBarStyle = {}, // Allow custom app bar styles
  drawerStyle = {}, // Allow custom drawer styles
  bodyStyle = {}, // Allow custom body styles
  fabStyle = {}, // Allow custom FAB styles
  bottomNavStyle = {}, // Allow custom bottom nav styles
  snackBarStyle = {}, // Allow custom snack bar styles
  drawerOpen = false, // Default drawer state is closed
  onDrawerToggle = () => {}, // Default to no-op callback
  drawerDismissible = true, // Default drawer dismissible state
}) => {
  // State to manage drawer open/close state
  const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);

  // Function to toggle the drawer open or closed
  const toggleDrawer = () => {
    const newState = !isDrawerOpen; // Toggle the drawer state
    setIsDrawerOpen(newState); // Update the drawer state
    onDrawerToggle(newState); // Call the onDrawerToggle callback to notify parent
  };

  // Default styling for the scaffold container
  const scaffoldStyles: CSSProperties = {
    position: "relative",
    height: "100vh", // Full viewport height
    backgroundColor: backgroundColor, // Set the background color
    boxShadow: elevation > 0 ? `0 2px 4px rgba(0, 0, 0, 0.1)` : "none", // Add shadow based on elevation
  };

  // Default styling for the app bar
  const appBarStyles: CSSProperties = {
    backgroundColor: appBarColor, // Set the app bar color
    padding: "10px 20px", // Padding for app bar content
    color: "white", // Set text color to white
    boxShadow: elevation > 0 ? `0 2px 4px rgba(0, 0, 0, 0.1)` : "none", // Apply shadow if elevation is greater than 0
    ...appBarStyle, // Merge custom styles for the app bar
  };

  // Default styling for the drawer
  const drawerStyles: CSSProperties = {
    position: "absolute",
    top: 0,
    left: isDrawerOpen ? 0 : "-250px", // Show or hide the drawer based on state
    width: "250px", // Fixed width for the drawer
    height: "100%", // Full height of the viewport
    backgroundColor: drawerColor, // Set the background color of the drawer
    color: "white", // Set text color to white
    transition: "left 0.3s ease", // Smooth sliding transition for the drawer
    zIndex: 1000, // Ensure the drawer is on top of other elements
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)", // Add shadow effect to the drawer
    ...drawerStyle, // Merge custom drawer styles
  };

  // Default styling for the body content
  const bodyStyles: CSSProperties = {
    padding: "20px", // Padding for body content
    marginLeft: isDrawerOpen ? "250px" : "0", // Shift body content when drawer is open
    paddingTop: safeArea ? "env(safe-area-inset-top)" : "0", // Apply safe area inset if enabled
    ...bodyStyle, // Merge custom body styles
  };

  // Default styling for the floating action button (FAB)
  const fabStyles: CSSProperties = {
    position: "fixed", // Position the FAB at a fixed location
    bottom: "20px", // Position from the bottom
    right: "20px", // Position from the right
    width: "56px", // Size of the FAB
    height: "56px", // Size of the FAB
    backgroundColor: fabColor, // Set the FAB background color
    borderRadius: "50%", // Make the FAB circular
    display: "flex", // Use flex to center the content inside the FAB
    alignItems: "center", // Vertically center the content
    justifyContent: "center", // Horizontally center the content
    cursor: "pointer", // Make the FAB clickable
    boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`, // Add shadow effect to the FAB
    ...fabStyle, // Merge custom FAB styles
  };

  // Default styling for the snack bar
  const snackBarStyles: CSSProperties = {
    position: "fixed", // Fixed position at the bottom of the screen
    bottom: "80px", // Distance from the bottom
    left: "50%", // Center the snack bar horizontally
    transform: "translateX(-50%)", // Adjust the position to be exactly centered
    backgroundColor: "#333", // Set the snack bar background color
    color: "white", // Set the snack bar text color
    padding: "10px 20px", // Padding for the snack bar content
    borderRadius: "4px", // Rounded corners for the snack bar
    display: snackBar ? "block" : "none", // Show/hide the snack bar based on state
    ...snackBarStyle, // Merge custom snack bar styles
  };

  return (
    <div style={scaffoldStyles}>
      {/* Status Bar (Top bar area, not in Flutter Scaffold but we added it for styling) */}
      <div style={{ backgroundColor: statusBarColor, height: "20px" }}></div>

      {/* App Bar */}
      <header style={appBarStyles}>
        {appBar} {/* Render the app bar content */}
        {/* Button to toggle the drawer */}
        <button onClick={toggleDrawer}>Toggle Drawer</button>
      </header>

      {/* Drawer */}
      <aside style={drawerStyles}>
        {drawer} {/* Render the drawer content */}
        {/* Close button for dismissing the drawer (optional) */}
        {drawerDismissible && (
          <div
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={toggleDrawer}
          >
            Close
          </div>
        )}
      </aside>

      {/* Body */}
      <main style={bodyStyles}>
        {body} {/* Render the body content */}
      </main>

      {/* Floating Action Button (FAB) */}
      <div onClick={() => fab && console.log("FAB clicked")} style={fabStyles}>
        {fab} {/* Render the FAB content */}
      </div>

      {/* Bottom Navigation */}
      <footer style={bottomNavStyle}>
        {bottomNav} {/* Render the bottom navigation content */}
      </footer>

      {/* SnackBar */}
      <div style={snackBarStyles}>
        {snackBar} {/* Render the snack bar content */}
      </div>
    </div>
  );
};

export default Scaffold;
