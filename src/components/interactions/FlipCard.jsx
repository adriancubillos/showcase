import { useState } from 'react';
import { motion } from 'framer-motion';
import { CubeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-64 cursor-pointer" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 flex flex-col items-center justify-center text-white"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <CubeIcon className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Front Side</h3>
          <p className="text-sm text-center opacity-90">Click to flip!</p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-6 flex flex-col items-center justify-center text-white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <ArrowPathIcon className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Back Side</h3>
          <p className="text-sm text-center opacity-90">Click to flip back!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
