import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-white dark:bg-gray-800 shadow-2xl rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:rotate-12 transition-all"
    >
      {isDark ? <Sun className="text-yellow-400 w-6 h-6" /> : <Moon className="text-[#0F4C75] w-6 h-6" />}
    </motion.button>
  );
};

export default ThemeToggle;