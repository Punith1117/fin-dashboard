import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkModeStore } from '../store/useDarkModeStore';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <button
      onClick={toggleDarkMode}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-finance-primary hover:bg-finance-primary/90 active:scale-95 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
