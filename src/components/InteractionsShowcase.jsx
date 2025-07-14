import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, ArrowPathIcon, HeartIcon, BellIcon, StarIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BellIcon as BellIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

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
        <h3 className="text-xl font-semibold mb-4">Micro-interactions</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <MicroInteraction
            icon={HeartIcon}
            iconSolid={HeartIconSolid}
            label="Like"
            variant="like"
          />
          <MicroInteraction
            icon={BellIcon}
            iconSolid={BellIconSolid}
            label="Notifications"
          />
          <MicroInteraction
            icon={StarIcon}
            iconSolid={StarIconSolid}
            label="Favorite"
            variant="favorite"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">3D Card Flip</h3>
        <div className="perspective-1000">
          <FlipCard />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Loading States</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <LoadingDots />
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Staggered dots animation
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
            <ProgressBar />
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Smooth progress bar
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <BicycleLoader />
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Rotating bicycle animation
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Ripple Buttons</h3>
        <div className="space-y-4">
          <RippleButton className="bg-primary text-white w-full">
            Primary Button
          </RippleButton>
          <RippleButton className="bg-secondary text-white w-full" variant="secondary">
            Secondary Button
          </RippleButton>
          <RippleButton className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-full" variant="neutral">
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

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
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

const MicroInteraction = ({ icon: Icon, iconSolid: IconSolid, label, variant }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive ? (variant === 'like' ? 'bg-red-50 dark:bg-red-900/10' : variant === 'favorite' ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'bg-primary/10') : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
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
          <IconSolid className={`w-6 h-6 ${variant === 'like' ? 'text-red-500' : variant === 'favorite' ? 'text-yellow-500' : 'text-primary'}`} />
        ) : (
          <Icon className={`w-6 h-6 ${isHovered ? (variant === 'like' ? 'text-red-500' : variant === 'favorite' ? 'text-yellow-500' : 'text-primary') : 'text-gray-600 dark:text-gray-400'}`} />
        )}
      </motion.div>
      <span className={`text-sm font-medium ${isActive ? (variant === 'like' ? 'text-red-500' : variant === 'favorite' ? 'text-yellow-500' : 'text-primary') : 'text-gray-600 dark:text-gray-400'}`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 ${variant === 'like' ? 'border-red-500' : variant === 'favorite' ? 'border-yellow-500' : 'border-primary'}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
        />
      )}
    </motion.button>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

const Sparkle = ({ delay, x, size = 4, color = 'primary' }) => {
  const getGlowColor = () => {
    switch (color) {
      case 'gold':
        return 'rgba(251, 191, 36, 0.5)';
      case 'blue':
        return 'rgba(96, 165, 250, 0.5)';
      default:
        return 'rgba(147, 51, 234, 0.5)';
    }
  };

  const getBaseColor = () => {
    switch (color) {
      case 'gold':
        return 'bg-yellow-400';
      case 'blue':
        return 'bg-blue-400';
      default:
        return 'bg-primary';
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full ${getBaseColor()}`}
      style={{
        left: x,
        width: size,
        height: size,
        boxShadow: `0 0 ${size * 2}px ${size/2}px ${getGlowColor()}`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [-8, -16, -12],
        x: [x, x + (Math.random() > 0.5 ? 6 : -6), x],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        y: {
          duration: 2,
          ease: [[0.4, 0, 0.6, 1], [0.4, 0, 0.6, 1], [0.4, 0, 0.6, 1]],
        },
        x: {
          duration: 2,
          ease: [[0.4, 0, 0.6, 1], [0.4, 0, 0.6, 1]],
        },
      }}
    />
  );
};

const Trail = ({ x, y, opacity, size = 4, index = 0, angle }) => {
  const colors = [
    { bg: 'bg-primary/20', glow: 'rgba(147, 51, 234, 0.12)' },
    { bg: 'bg-blue-500/20', glow: 'rgba(59, 130, 246, 0.12)' },
    { bg: 'bg-indigo-500/20', glow: 'rgba(99, 102, 241, 0.12)' },
  ];

  const color = colors[index % colors.length];
  const rotation = angle || 0;

  return (
    <motion.div
      className={`absolute rounded-full ${color.bg} transition-transform duration-100`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${size/2}px ${color.glow}`,
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
        delay: index * 0.1,
      }}
    />
  );
};

const BicycleLoader = () => {
  const size = 100;
  const pathRadius = 35;
  const center = size / 2;
  const [trails, setTrails] = useState([]);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    // Speed variation with smooth transitions and natural cycling rhythm
    const speedInterval = setInterval(() => {
      setSpeed(prev => {
        const time = Date.now();
        // Combine two sine waves for more natural speed variation
        const primaryWave = Math.sin(time / 2000) * 0.15;
        const secondaryWave = Math.sin(time / 1000) * 0.05;
        const targetSpeed = 1 + primaryWave + secondaryWave;
        const smoothing = 0.1;
        return prev + (targetSpeed - prev) * smoothing;
      });
    }, 50);

    const trailInterval = setInterval(() => {
      const baseAngle = (Date.now() / (1000 / speed)) % (2 * Math.PI);
      const newTrail = {
        id: Date.now(),
        x: center + pathRadius * Math.cos(baseAngle),
        y: center + pathRadius * Math.sin(baseAngle),
        opacity: 0.6 * (1 / speed), // More visible trails when moving slower
        size: 3.5 * Math.min(speed, 1), // Slightly smaller trails when moving slower
        angle: baseAngle * (180 / Math.PI)
      };
      
      setTrails(prev => [
        newTrail,
        ...prev.slice(0, 10).map((t, i) => ({
          ...t,
          opacity: t.opacity * (0.92 + (speed - 1) * 0.02), // Trails fade faster at higher speeds
          size: Math.max(2, t.size * (0.97 + (1 - speed) * 0.01)), // Trails shrink slower at lower speeds
          index: i
        })),
      ]);
    }, 50);

    return () => {
      clearInterval(speedInterval);
      clearInterval(trailInterval);
    };
  }, []);

  return (
    <div className="relative w-24 h-24">
      {trails.map((trail) => (
        <Trail key={trail.id} {...trail} />
      ))}
      {/* Earth/path circle */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        initial={false}
        animate={{
          rotate: 360,
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA">
              <animate
                attributeName="stop-color"
                values="#60A5FA; #34D399; #60A5FA"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#34D399">
              <animate
                attributeName="stop-color"
                values="#34D399; #60A5FA; #34D399"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#60A5FA">
              <animate
                attributeName="stop-color"
                values="#60A5FA; #34D399; #60A5FA"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <motion.circle
          cx={center}
          cy={center}
          r={pathRadius}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeDasharray="3 3"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      
      {/* Rotating bicycle */}
      <motion.div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          left: '50%',
          top: '50%',
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 8 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-6 h-6 text-primary absolute"
          style={{
            transform: `translateY(-${pathRadius}px) rotate(-90deg)`,
          }}
          animate={{
            scale: [1, 1.05, 0.95, 1.05, 1],
            rotate: -360 * speed,
            rotateX: [0, -8 * speed, 0, 8 * speed, 0],
            rotateY: [0, 6 * speed, 0, -6 * speed, 0],
            y: [0, -1.5 * speed, 0, -1.5 * speed, 0]
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 1.5 / speed,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            },
            rotate: {
              duration: 8 / speed,
              repeat: Infinity,
              ease: "linear",
            },
            rotateX: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            },
            rotateY: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            },
            y: {
              repeat: Infinity,
              duration: 0.4 / speed,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }
          }}
        >
          <div className="relative">
            {/* Sparkles */}
            <Sparkle delay={0} x={-2} size={6} color="gold" />
            <Sparkle delay={0.4} x={2} size={4} />
            <Sparkle delay={0.8} x={-4} size={3} color="blue" />
            <Sparkle delay={1.2} x={4} size={5} />
            <Sparkle delay={1.6} x={0} size={4} color="gold" />
            <Sparkle delay={2.0} x={-3} size={3} color="blue" />
            <Sparkle delay={2.4} x={3} size={3} />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transform scale-x-[-1] relative z-10"
            >
            <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
          </svg>
          </div>
        </motion.div>
      </motion.div>
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
