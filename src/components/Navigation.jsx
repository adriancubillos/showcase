import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import scrollTo from './ScrollTo';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide navigation based on scroll position
      setIsVisible(window.scrollY > 100);

      // Update active section
      const sections = ['hero', 'skills', 'technical', 'interactions', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'technical', label: 'Technical' },
    { id: 'interactions', label: 'Interactions' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 bg-white dark:bg-gray-800 rounded-lg sm:rounded-full shadow-lg
        max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar sm:px-6 py-2 sm:left-1/2 sm:-translate-x-1/2"
    >
      <ul className="flex justify-between sm:justify-start px-4 sm:px-0 gap-3 sm:gap-8 whitespace-nowrap min-w-fit">
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`text-[11px] leading-none sm:text-sm px-1 py-2 transition-colors duration-200 ${activeSection === id
                ? 'text-primary font-medium'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navigation;
