import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Trail from './Trail';
import Sparkle from './Sparkle';

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

export default BicycleLoader;
