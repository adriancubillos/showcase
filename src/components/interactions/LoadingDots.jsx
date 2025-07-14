import { motion } from 'framer-motion';

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
export default LoadingDots;
