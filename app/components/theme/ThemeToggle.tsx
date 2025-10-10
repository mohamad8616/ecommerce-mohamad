"use client";

import { CiCloudMoon, CiCloudSun } from "react-icons/ci";
import { Theme, useTheme } from "./ThemeProvider";
import { HiMiniComputerDesktop } from "react-icons/hi2";

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  if (!mounted) {
    return (
      <button
        className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700'
        aria-label='Loading theme'
      >
        <div className='w-5 h-5'></div>
      </button>
    );
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <CiCloudMoon />;
      case "light":
        return <CiCloudSun />;
      case "system":
        return <HiMiniComputerDesktop />;
      default:
        return "💻";
    }
  };

  const getThemeLabel = (): string => {
    switch (theme) {
      case "dark":
        return "Switch to light mode";
      case "light":
        return "Switch to system preference";
      case "system":
        return "Switch to dark mode";
      default:
        return "Toggle theme";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className='inline p-2 rounded-lg text-slate-900 dark:text-slate-200 cursor-pointer  transition-colors duration-200 font-semibold'
      aria-label={getThemeLabel()}
    >
      <span className='text-3xl font-semibold'>{getThemeIcon()}</span>
    </button>
  );
}
