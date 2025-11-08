import React from "react";

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(() => {
    // نحاول نقرأ الثيم من localStorage أولاً
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";

    // أو نتابع إعداد النظام (dark/light)
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // تطبيق التغيير على <html>
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = React.useCallback(() => setDark((prev) => !prev), []);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
