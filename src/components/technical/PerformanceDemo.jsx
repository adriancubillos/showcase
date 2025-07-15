import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceDemo = () => {
    const [items, setItems] = useState(Array.from({ length: 30 }, (_, i) => i));
    const [animating, setAnimating] = useState(false);

    const shuffleArray = () => {
        setAnimating(true);
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        setItems(shuffled);
        setTimeout(() => setAnimating(false), 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Transform vs Non-Transform</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Compare performance between transform and non-transform animations
                    </p>
                </div>
                <button
                    onClick={shuffleArray}
                    disabled={animating}
                    className="px-4 py-2 bg-primary text-white rounded-lg
                        hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors duration-200"
                >
                    Shuffle Items
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                {/* Transform-based Animation */}
                <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Using Transform (GPU Accelerated)
                    </h5>
                    <div className="h-[280px] sm:h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-4">
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                            <AnimatePresence>
                                {items.slice(0, 15).map((item) => (
                                    <motion.div
                                        key={item}
                                        layout
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }}
                                        className="aspect-square bg-primary/80 rounded-lg
                                            flex items-center justify-center text-white text-[10px] sm:text-sm
                                            transform-gpu select-none" // Use GPU acceleration
                                    >
                                        {item + 1}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        ✓ Smooth animations
                        <br />
                        ✓ GPU accelerated
                        <br />
                        ✓ Better performance
                    </div>
                </div>

                {/* Non-transform Animation */}
                <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Using Position (CPU Based)
                    </h5>
                    <div className="h-[280px] sm:h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-4">
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                            <AnimatePresence>
                                {items.slice(15).map((item) => (
                                    <motion.div
                                        key={item}
                                        layout
                                        initial={{ top: 20, left: 20, opacity: 0 }}
                                        animate={{ top: 0, left: 0, opacity: 1 }}
                                        exit={{ top: 20, left: 20, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }}
                                        className="aspect-square bg-secondary/80 rounded-lg
                                            flex items-center justify-center text-white text-[10px] sm:text-sm
                                            relative select-none" // Use position-based animation
                                    >
                                        {item + 1}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        ⚠ May cause jank
                        <br />
                        ⚠ CPU intensive
                        <br />
                        ⚠ Layout thrashing
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Why Use CSS Transforms?
                </h6>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Transforms are GPU-accelerated, providing smoother animations</li>
                    <li>• Avoids layout thrashing and repaints</li>
                    <li>• Better battery life on mobile devices</li>
                    <li>• Maintains 60fps even with many animated elements</li>
                </ul>
            </div>
        </div>
    );
};

export default PerformanceDemo;
