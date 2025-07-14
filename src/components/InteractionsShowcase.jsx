import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleButton = ({ children, className = '' }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now()
    };
    setRipples([...ripples, ripple]);
  };

  const removeRipple = (id) => {
    setRipples(ripples.filter(ripple => ripple.id !== id));
  };

  return (
    <button
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'currentColor',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              opacity: '0.5',
              pointerEvents: 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

const HoverCard = ({ children }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
};

const FloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative px-6 py-3 rounded-lg bg-primary text-white"
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      Hover Me
      {isHovered && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ↑
        </motion.div>
      )}
    </motion.button>
  );
};

const InteractionsShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Loading States</h3>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <LoadingDots />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
            Staggered animation loading indicator
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Ripple Buttons</h3>
        <div className="space-y-4">
          <RippleButton className="bg-primary text-white w-full">
            Primary Button
          </RippleButton>
          <RippleButton className="bg-secondary text-white w-full">
            Secondary Button
          </RippleButton>
          <RippleButton className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-full">
            Neutral Button
          </RippleButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Hover Cards</h3>
        <HoverCard>
          <h4 className="text-lg font-medium mb-2">Interactive Card</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Hover over me to see a smooth tilt effect
          </p>
        </HoverCard>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Floating Elements</h3>
        <div className="flex justify-center">
          <FloatingButton />
        </div>
      </div>
    </div>
  );
};

const LoadingDots = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
  };

  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.2,
          }}
          className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full"
        />
      ))}
    </div>
  );
};

export default InteractionsShowcase;
