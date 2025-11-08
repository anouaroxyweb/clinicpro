import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={`px-3 py-2 rounded border text-sm hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
      title="Toggle theme"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
