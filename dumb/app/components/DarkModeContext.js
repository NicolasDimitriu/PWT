import { createContext, useContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof window !== 'undefined') {
      document.querySelector('html').classList.toggle('dark', !darkMode);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.querySelector('html').classList.add('dark');
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
