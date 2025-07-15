// Import necessary React hooks and Framer Motion for animations
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleSystem = () => {
    // State for managing multiple particles and ripple effects
    const [particles, setParticles] = useState([]); // Array of active particles
    const [ripples, setRipples] = useState([]); // Array of active ripple effects

    // Creates a ripple effect at the clicked position
    const generateRipple = useCallback((x, y) => {
        // Create a new ripple with unique ID and position
        const ripple = {
            id: Date.now(), // Unique identifier
            x, // X coordinate of click
            y  // Y coordinate of click
        };

        // Add the new ripple to state
        setRipples(prev => [...prev, ripple]);
        // Remove the ripple after 1 second
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 1000);
    }, []); // Empty deps array as this function doesn't depend on any props or state

    // Updates particle position and handles wall collisions
    const updateParticle = useCallback((particle, containerWidth, containerHeight) => {
        const radius = particle.size / 2; // Calculate particle radius for collision detection
        // Calculate new position based on angle and velocity
        const newX = particle.x + Math.cos(particle.angle) * particle.velocity;
        const newY = particle.y + Math.sin(particle.angle) * particle.velocity;
        let newAngle = particle.angle;

        // Bounce off walls, accounting for particle size
        // Check for horizontal wall collisions
        if (newX - radius <= 0 || newX + radius >= containerWidth) {
            newAngle = Math.PI - newAngle; // Reverse horizontal direction
        }
        // Check for vertical wall collisions
        if (newY - radius <= 0 || newY + radius >= containerHeight) {
            newAngle = -newAngle; // Reverse vertical direction
        }

        // Return updated particle with new position and angle
        return {
            ...particle,
            // Clamp position to keep particle within bounds
            x: Math.max(radius, Math.min(containerWidth - radius, newX)),
            y: Math.max(radius, Math.min(containerHeight - radius, newY)),
            angle: newAngle
        };
    }, []); // Empty deps array as this function doesn't depend on any props or state

    // Creates a new particle at the clicked position
    const generateParticle = (e) => {
        // Get click position relative to container
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        // Create new particle with random properties
        const particle = {
            id: Date.now(), // Unique identifier
            x, // Starting X position
            y, // Starting Y position
            color: getRandomColor(), // Random color from our palette
            angle: Math.random() * Math.PI * 2, // Random direction (0 to 2π)
            velocity: 2 + Math.random() * 2, // Random speed (2 to 4)
            size: 4 + Math.random() * 6 // Random size (4 to 10)
        };

        // Add particle to state
        setParticles(prev => [...prev, particle]);
        // Remove particle after 10 seconds
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
        }, 5000);
    };

    // Animation loop using requestAnimationFrame
    const containerRef = useCallback((node) => {
        if (node !== null) {
            setContainerRef(node);
        }
    }, []);

    const [containerElement, setContainerRef] = useState(null);

    useEffect(() => {
        if (!containerElement) return;

        let animationFrameId;
        let lastTime = performance.now();

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            if (deltaTime >= 16) { // Cap at ~60fps for performance
                // Get current container dimensions
                const { width, height } = containerElement.getBoundingClientRect();
                // Update all particles' positions
                setParticles(prevParticles => 
                    prevParticles.map(particle => 
                        updateParticle(particle, width, height)
                    )
                );
                lastTime = currentTime;
            }
            // Schedule next frame
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation loop
        animationFrameId = requestAnimationFrame(animate);
        // Cleanup on unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, [containerElement, updateParticle]); // Re-run if container or updateParticle changes

    // Returns a random color from our predefined palette
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
            ref={containerRef}
            // Container for the particle system with dark mode support and border
            className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-crosshair border-2 border-primary/20"
            onClick={(e) => {
                // Generate both a particle and ripple effect on click
                generateParticle(e);
                const rect = e.currentTarget.getBoundingClientRect();
                generateRipple(e.clientX - rect.left, e.clientY - rect.top);
            }}
        >
            {/* Ripple Effects Layer */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        // Ripple styling with semi-transparent border
                        className="absolute rounded-full border border-primary/30"
                        // Initial state: invisible at click position
                        initial={{ 
                            width: 0, 
                            height: 0,
                            x: ripple.x,
                            y: ripple.y,
                            opacity: 0.8,
                        }}
                        // Animate to full size while fading out
                        animate={{ 
                            width: 100, // Final diameter
                            height: 100,
                            x: ripple.x - 50, // Center the ripple
                            y: ripple.y - 50,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }} // Fade out when removed
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>
            {/* Particles Layer */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        // Particle styling with dynamic color
                        className={`absolute rounded-full ${particle.color}`}
                        // Start from click position
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            opacity: 1,
                            transform: 'translate(-50%, -50%)'
                        }}
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1
                        }}
                        // Quick scale animation when particle appears
                        transition={{
                            duration: 0.2,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ParticleSystem;
