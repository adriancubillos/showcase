import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleSystem = () => {
    const [particles, setParticles] = useState([]);
    const [ripples, setRipples] = useState([]);

    const generateRipple = useCallback((x, y) => {
        const ripple = {
            id: Date.now(),
            x,
            y
        };

        setRipples(prev => [...prev, ripple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 1000);
    }, []);

    const generateParticle = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const particle = {
            id: Date.now(),
            x,
            y,
            color: getRandomColor(),
            angle: Math.random() * Math.PI * 2,
            velocity: 2 + Math.random() * 2,
            size: 4 + Math.random() * 6
        };

        setParticles(prev => [...prev, particle]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
        }, 10000);
    };

    const getRandomColor = () => {
        const colors = [
            'bg-primary',
            'bg-secondary',
            'bg-purple-400',
            'bg-blue-400',
            'bg-indigo-400'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-crosshair border-2 border-primary/20"
            onClick={(e) => {
                generateParticle(e);
                const rect = e.currentTarget.getBoundingClientRect();
                generateRipple(e.clientX - rect.left, e.clientY - rect.top);
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none">
                Click anywhere to generate particles
            </div>
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full border-2 border-primary"
                        initial={{ 
                            width: 0, 
                            height: 0,
                            x: ripple.x,
                            y: ripple.y,
                            opacity: 0.8,
                        }}
                        animate={{ 
                            width: 100,
                            height: 100,
                            x: ripple.x - 50,
                            y: ripple.y - 50,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className={`absolute rounded-full ${particle.color}`}
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            scale: 0,
                            opacity: 1
                        }}
                        animate={{
                            x: particle.x + Math.cos(particle.angle) * (particle.velocity * 100),
                            y: particle.y + Math.sin(particle.angle) * (particle.velocity * 100),
                            scale: 1,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 10,
                            ease: "easeOut"
                        }}
                        style={{
                            width: particle.size,
                            height: particle.size,
                            marginLeft: -particle.size / 2,
                            marginTop: -particle.size / 2
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ParticleSystem;
