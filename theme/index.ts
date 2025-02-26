import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: { main: "#3D7346", contrastText: "#01381E", light: "#05BA64" },
    secondary: { main: "#ffffff", dark: "#000000" },
    background: { default: "#ffffff" },
    grey: { "100": "rgba(160,160,160,0.22)", "200": "rgba(160,160,160,0.40)", "300": "rgba(160,160,160,0.60)", "900": "rgba(160,160,160,1)" },
    text: { primary: "#ffffff", secondary: "#5F5F5F" },
  },
  typography: {
    fontWeightBold: 700,
  },
});
