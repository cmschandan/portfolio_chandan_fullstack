"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "cyan" | "purple" | "green" | "orange" | "pink" | "marvel" | "spiderman" | "hanuman";

interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  glow: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  cyan: {
    primary: "#00d9ff",
    primaryDark: "#0099b8",
    secondary: "#7c3aed",
    accent: "#ff006e",
    glow: "rgba(0, 217, 255, 0.5)",
  },
  purple: {
    primary: "#a855f7",
    primaryDark: "#7c3aed",
    secondary: "#06b6d4",
    accent: "#f472b6",
    glow: "rgba(168, 85, 247, 0.5)",
  },
  green: {
    primary: "#22c55e",
    primaryDark: "#16a34a",
    secondary: "#14b8a6",
    accent: "#84cc16",
    glow: "rgba(34, 197, 94, 0.5)",
  },
  orange: {
    primary: "#f97316",
    primaryDark: "#ea580c",
    secondary: "#eab308",
    accent: "#ef4444",
    glow: "rgba(249, 115, 22, 0.5)",
  },
  pink: {
    primary: "#ec4899",
    primaryDark: "#db2777",
    secondary: "#8b5cf6",
    accent: "#f43f5e",
    glow: "rgba(236, 72, 153, 0.5)",
  },
  marvel: {
    primary: "#e23636",
    primaryDark: "#b71c1c",
    secondary: "#ffd700",
    accent: "#1e3a5f",
    glow: "rgba(226, 54, 54, 0.5)",
  },
  spiderman: {
    primary: "#e21b1b",
    primaryDark: "#b71c1c",
    secondary: "#1565c0",
    accent: "#ffffff",
    glow: "rgba(226, 27, 27, 0.5)",
  },
  hanuman: {
    primary: "#ff6f00",
    primaryDark: "#e65100",
    secondary: "#ffd54f",
    accent: "#d50000",
    glow: "rgba(255, 111, 0, 0.6)",
  },
};

export const themeInfo: Record<ThemeName, { name: string; icon: string; effect: string }> = {
  cyan: { name: "Cyber Cyan", icon: "💎", effect: "Code Stream" },
  purple: { name: "Galaxy Purple", icon: "🔮", effect: "Starfield" },
  green: { name: "Matrix Green", icon: "🌿", effect: "Matrix Rain" },
  orange: { name: "Sunset Orange", icon: "🌅", effect: "Sun Rays" },
  pink: { name: "Neon Pink", icon: "🌸", effect: "Sparkles" },
  marvel: { name: "Marvel", icon: "🦸", effect: "Energy Blast" },
  spiderman: { name: "Spider-Man", icon: "🕷️", effect: "Web Sling" },
  hanuman: { name: "Lord Hanuman", icon: "🔱", effect: "Divine Flames" },
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("cyan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeName: ThemeName) => {
    const colors = themes[themeName];
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--primary-dark", colors.primaryDark);
    document.documentElement.style.setProperty("--secondary", colors.secondary);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--glow-primary", `0 0 20px ${colors.glow}`);
    document.documentElement.style.setProperty("--card-border", `${colors.primary}1a`);
  };

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
