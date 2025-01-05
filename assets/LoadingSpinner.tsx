import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

// Create a theme with a custom color
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        success: {
          solidBg: "#1ed761", // Custom color for success
        },
        primary: {
          solidBg: "#FFFFFFFF", // Example custom color for primary
        },
        danger: {
          solidBg: "#000000FF", // Example custom color for danger
        },
      },
    },
  },
});

// Define the props for the LoadingSpinner component
interface LoadingSpinnerProps {
  size?: number; // Optional size parameter
  color?: "success" | "primary" | "danger"; // Optional color parameter
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "success",
}) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <div style={{ width: size, height: size }}>
        <CircularProgress
          color={color}
          thickness={5}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </CssVarsProvider>
  );
};

export default LoadingSpinner;
