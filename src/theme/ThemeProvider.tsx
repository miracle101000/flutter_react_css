import React, { createContext, useContext } from "react";

const ThemeContext = createContext({
  colors: {
    primary: "#6200ea",
    secondary: "#03dac6",
    background: "#ffffff",
    surface: "#f5f5f5",
    error: "#b00020",
    textPrimary: "#000000",
    textSecondary: "#757575",
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = {
    colors: {
      primary: "#6200ea",
      secondary: "#03dac6",
      background: "#ffffff",
      surface: "#f5f5f5",
      error: "#b00020",
      textPrimary: "#000000",
      textSecondary: "#757575",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
