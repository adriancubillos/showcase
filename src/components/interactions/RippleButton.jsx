import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleButton = ({ children, className = '', variant = 'primary' }) => {
  const [ripples, setRipples] = useState([]);

  const getRippleStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          scale: 6,
          duration: 1.2,
          color: 'rgba(147, 51, 234, 0.3)', // Purple tint
          size: '15px'
        };
      case 'neutral':
        return {
          scale: 3,
          duration: 0.8,
          color: 'rgba(0, 0, 0, 0.2)',
          size: '25px'
        };
      default: // primary
        return {
          scale: 4,
          duration: 1,
          color: 'rgba(255, 255, 255, 0.5)',
          size: '20px'
        };
    }
  };

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);

    const { duration } = getRippleStyles();
    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== ripple.id)
      );
    }, duration * 1000);
  };

  const styles = getRippleStyles();

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-6 py-3 ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: styles.scale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: styles.duration }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: styles.size,
              height: styles.size,
              borderRadius: '50%',
              backgroundColor: styles.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export default RippleButton;
