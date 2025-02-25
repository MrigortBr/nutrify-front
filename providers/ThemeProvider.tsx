"use client";

import { ReactNode, useEffect, useState, useMemo } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { themeLight } from "@/theme";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  const theme = useMemo(() => {
    return themeLight;
  }, [isDarkMode]);

  if (isDarkMode === null) return null; // Evita erro de hidratação

  return (
    <MuiThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </StyledComponentsThemeProvider>
    </MuiThemeProvider>
  );
}
