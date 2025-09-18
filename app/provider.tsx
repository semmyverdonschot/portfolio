"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AppContextType {
  theme: "light" | "dark" | "mono";
  setTheme: (theme: "light" | "dark" | "mono") => void;
  toggleTheme: (theme: "light" | "dark" | "mono") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<{
    light: boolean;
    dark: boolean;
    mono: boolean;
  }>({
    light: true,
    dark: false,
    mono: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    const imgs = document.querySelectorAll<HTMLImageElement>("img");

    root.style.transition = "color 0.5s ease, background-color 2.5s ease";

    if (theme.dark && !theme.light) {
      root.style.setProperty("--color-primary", "#111");
      root.style.setProperty("--color-dark", "#fff");
    } else {
      root.style.setProperty("--color-primary", "#fff");
      root.style.setProperty("--color-dark", "#111");
    }

    imgs.forEach((img) => {
      img.style.transition = "filter 0.5s ease";
      img.style.filter = theme.mono ? "saturate(0.2)" : "saturate(1)";
    });
  }, [theme]);

  const toggleTheme = (mode: "light" | "dark" | "mono") => {
    setTheme((prev) => ({
      ...prev,
      [mode]: !prev[mode],
      ...(mode === "light" && !prev.light ? { dark: false } : {}),
      ...(mode === "dark" && !prev.dark ? { light: false } : {}),
    }));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "t") toggleTheme("light");
      if (e.key === "d") toggleTheme("dark");
      if (e.key === "m") toggleTheme("mono");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme: theme.dark ? "dark" : theme.light ? "light" : "mono",
        setTheme: () => {},
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
