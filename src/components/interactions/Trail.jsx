import { motion } from 'framer-motion';

const Trail = ({ x, y, opacity = 1, size = 4, index = 0 }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-primary"
      style={{
        width: size,
        height: size,
        x: x - size / 2,
        y: y - size / 2,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
    />
  );
};

export default Trail;
