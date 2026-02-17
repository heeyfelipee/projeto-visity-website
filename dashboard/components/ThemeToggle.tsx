'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      aria-label="Alternar tema"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-2 p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
