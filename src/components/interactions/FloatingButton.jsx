import { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredDown, setIsHoveredDown] = useState(false);
    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);

    return (
        <>
            <div className='p-2'>
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
                    UP
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
            </div>
            <div className='p-2'>
                <motion.button
                    className="relative px-6 py-3 rounded-lg bg-secondary text-white"
                    animate={{
                        y: isHoveredDown ? +8 : 0,
                        boxShadow: isHoveredDown
                            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onHoverStart={() => setIsHoveredDown(true)}
                    onHoverEnd={() => setIsHoveredDown(false)}
                >
                    DOWN
                    {isHoveredDown && (
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            ↓
                        </motion.div>
                    )}
                </motion.button>
            </div>
            <div className='p-2'>
                <motion.button
                    className="relative px-6 py-3 rounded-lg bg-neutral text-white"
                    animate={{
                        x: isHoveredLeft ? -8 : 0,
                        boxShadow: isHoveredLeft
                            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onHoverStart={() => setIsHoveredLeft(true)}
                    onHoverEnd={() => setIsHoveredLeft(false)}
                >
                    LEFT
                    {isHoveredLeft && (
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            ←
                        </motion.div>
                    )}
                </motion.button>
            </div>
            <div className='p-2'>
                <motion.button
                    className="relative px-6 py-3 rounded-lg bg-primary text-white"
                    animate={{
                        x: isHoveredRight ? +8 : 0,
                        boxShadow: isHoveredRight
                            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onHoverStart={() => setIsHoveredRight(true)}
                    onHoverEnd={() => setIsHoveredRight(false)}
                >
                    RIGHT
                    {isHoveredRight && (
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            →
                        </motion.div>
                    )}
                </motion.button>
            </div>
        </>
    );
};

export default FloatingButton;
