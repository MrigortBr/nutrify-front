// 📁 src/app/layout.tsx
import type { Metadata } from "next";
import ThemeProvider from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import "@/styles/fonts.css";

export const metadata: Metadata = {
  title: "Nutrify",
  description: "Generated by create next app",
  other: {
    prefix: "Nutrify ",
  },
  icons: "@/favincon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <div style={{ position: "relative", zIndex: "9999999999" }} id="alert-container"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
