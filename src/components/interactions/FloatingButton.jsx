import { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingButton = () => {
    const [hoveredStates, setHoveredStates] = useState({
        up: false,
        down: false,
        left: false,
        right: false,
        upRight: false,
        upLeft: false,
        downRight: false,
        downLeft: false
    });

    const buttonConfig = [
        {
            text: 'Up Left',
            arrow: '↖',
            color: 'bg-secondary',
            hoverKey: 'upLeft',
            motion: { y: -6, x: -6 }
        },
        {
            text: 'Up',
            arrow: '↑',
            color: 'bg-primary',
            hoverKey: 'up',
            motion: { y: -8 }
        },
        {
            text: 'Up Right',
            arrow: '↗',
            color: 'bg-secondary',
            hoverKey: 'upRight',
            motion: { y: -6, x: 6 }
        },
        {
            text: 'Left',
            arrow: '←',
            color: 'bg-primary',
            hoverKey: 'left',
            motion: { x: -8 }
        },
        {
            text: 'Right',
            arrow: '→',
            color: 'bg-primary',
            hoverKey: 'right',
            motion: { x: 8 }
        },
        {
            text: 'Down Left',
            arrow: '↙',
            color: 'bg-secondary',
            hoverKey: 'downLeft',
            motion: { y: 6, x: -6 }
        },
        {
            text: 'Down',
            arrow: '↓',
            color: 'bg-primary',
            hoverKey: 'down',
            motion: { y: 8 }
        },
        {
            text: 'Down Right',
            arrow: '↘',
            color: 'bg-secondary',
            hoverKey: 'downRight',
            motion: { y: 6, x: 6 }
        }
    ];

    // Create a 3x3 grid layout with empty cells for alignment
    const gridLayout = [
        ['upLeft', 'up', 'upRight'],
        ['left', null, 'right'],
        ['downLeft', 'down', 'downRight']
    ];

    const buttonByKey = buttonConfig.reduce((acc, btn) => {
        acc[btn.hoverKey] = btn;
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-3 gap-4">
            {gridLayout.flat().map((key, index) => {
                if (!key) return <div key={`empty-${index}`} className="invisible" />;
                
                const config = buttonByKey[key];
                return (
                    <motion.button
                        key={config.hoverKey}
                        className={`relative rounded-lg ${config.color} text-white w-full h-[70px] sm:h-[90px]
                            flex flex-col items-center justify-center overflow-visible`}
                        animate={{
                            ...config.motion,
                            scale: hoveredStates[config.hoverKey] ? 1.05 : 1,
                            boxShadow: hoveredStates[config.hoverKey]
                                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                        onHoverStart={() => setHoveredStates(prev => ({ ...prev, [config.hoverKey]: true }))}
                        onHoverEnd={() => setHoveredStates(prev => ({ ...prev, [config.hoverKey]: false }))}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <span className="text-[10px] sm:text-sm whitespace-nowrap">{config.text}</span>
                        {hoveredStates[config.hoverKey] && (
                            <motion.div
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-lg sm:text-xl"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                            >
                                {config.arrow}
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
};

export default FloatingButton;
