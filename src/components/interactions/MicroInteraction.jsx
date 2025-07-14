import { useState } from 'react';
import { motion } from 'framer-motion';

const MicroInteraction = ({ icon: Icon, iconSolid: IconSolid, label, variant }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg ${
        isActive
          ? variant === 'like'
            ? 'bg-red-50 dark:bg-red-900/10'
            : variant === 'favorite'
            ? 'bg-yellow-50 dark:bg-yellow-900/10'
            : 'bg-primary/10'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1.1 : 1,
          rotate: isActive ? [0, -10, 10, -10, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          rotate: {
            duration: 0.5,
            ease: 'easeInOut',
          },
        }}
      >
        {isActive ? (
          <IconSolid className={`w-6 h-6 ${
            variant === 'like'
              ? 'text-red-500'
              : variant === 'favorite'
              ? 'text-yellow-500'
              : 'text-primary'
          }`} />
        ) : (
          <Icon className={`w-6 h-6 ${
            isHovered
              ? variant === 'like'
                ? 'text-red-500'
                : variant === 'favorite'
                ? 'text-yellow-500'
                : 'text-primary'
              : 'text-gray-600 dark:text-gray-400'
          }`} />
        )}
      </motion.div>
      <span
        className={`text-sm font-medium ${
          isActive
            ? variant === 'like'
              ? 'text-red-500'
              : variant === 'favorite'
              ? 'text-yellow-500'
              : 'text-primary'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {label}
      </span>
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 ${
            variant === 'like'
              ? 'border-red-500'
              : variant === 'favorite'
              ? 'border-yellow-500'
              : 'border-primary'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
        />
      )}
    </motion.button>
  );
};

export default MicroInteraction;
