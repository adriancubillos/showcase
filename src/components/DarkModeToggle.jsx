import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
