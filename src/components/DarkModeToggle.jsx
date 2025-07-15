import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col items-center gap-2">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
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

      <button
        onClick={toggleDarkMode}
        className="group relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          dark:focus:ring-offset-gray-900"
        role="switch"
        type="button"
        aria-checked={darkMode}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
          className={`${darkMode ? 'bg-primary' : 'bg-gray-300'}
            pointer-events-none inline-block h-6 w-11 rounded-full transition-colors duration-200 ease-in-out`}
        />
        <motion.span
          initial={false}
          animate={{
            x: darkMode ? 20 : 2,
            backgroundColor: darkMode ? '#fff' : '#fff'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full
            bg-white shadow ring-0 transition duration-200 ease-in-out"
        />
      </button>
    </div>
  );
};

export default DarkModeToggle;
