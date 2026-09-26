import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ThemeContext = createContext();

function safeGetTheme() {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return safeGetTheme();
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        // Ignore storage write errors in restricted browsers.
      }
    } else {
      document.body.classList.remove("dark-mode");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        // Ignore storage write errors in restricted browsers.
      }
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}