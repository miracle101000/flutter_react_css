export const theme = {
    colors: {
      primary: "#3498db",
      secondary: "#2ecc71",
      background: "#f4f4f4",
      surface: "#ffffff",
      error: "#e74c3c",
      textPrimary: "#333333",
      textSecondary: "#555555",
      textLight: "#dddddd",
      border: "#cccccc",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "16px",
      fontWeightRegular: 400,
      fontWeightBold: 700,
      lineHeight: 1.5,
    },
    spacing: {
      small: "8px",
      medium: "16px",
      large: "32px",
      extraLarge: "64px",
    },
    borders: {
      radiusSmall: "4px",
      radiusMedium: "8px",
      radiusLarge: "16px",
    },
    shadows: {
      sm: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      md: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      lg: "0px 10px 15px rgba(0, 0, 0, 0.1)",
    },
    gradients: {
      linear: "linear-gradient(45deg, #3498db, #2ecc71)",
      radial: "radial-gradient(circle, #3498db, #2ecc71)",
    },
  };
  
  export type Theme = typeof theme;
  