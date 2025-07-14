import { motion } from 'framer-motion';

const Sparkle = ({ delay = 0, x = 0, size = 4, color = 'white', opacity = 0.5 }) => {
  const rotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute bg-current"
      style={{
        width: size,
        height: size,
        x,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${size/2}px ${color}`,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ scale: 0 }}
      animate={{
        scale: [0.7, 0.9, 0.7],
        opacity: [opacity, opacity * 1.3, opacity],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

export default Sparkle;
