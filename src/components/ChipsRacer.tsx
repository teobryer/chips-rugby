import React from 'react';
import { motion } from 'framer-motion';
import type { Racer } from '../utils/raceLogic';

interface ChipsRacerProps {
    racer: Racer;
    progress: number; // 0 to 1 (0 = start, 1 = finish)
    laneIndex: number;
    totalLanes: number;
}

export const ChipsRacer: React.FC<ChipsRacerProps> = ({ racer, progress, laneIndex, totalLanes }) => {
    // Calculate vertical position based on progress
    // We want them to move from Bottom (0) to Top (1)
    // Or maybe Left to Right?
    // Let's stick to Bottom to Top for now as it fits mobile portrait better.

    return (
        <motion.div
            className="absolute left-0 flex items-center"
            style={{
                bottom: `${progress * 90}%`, // Stop a bit before the very top to stay visible
                left: `${(laneIndex + 1) * (100 / (totalLanes + 1))}%`, // Distribute horizontally
                width: '60px',
                height: '60px',
                x: '-50%', // Center horizontally
            }}
            initial={{ bottom: '0%' }}
            animate={{ bottom: `${progress * 90}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth movement
        >
            <div className="relative w-full h-full">
                {/* Chip Body (Triangle-ish) */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" style={{ fill: '#F4C430' }}>
                    <path d="M50 10 L90 90 L10 90 Z" />
                </svg>

                {/* Head/Avatar */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-white">
                    <img src={racer.avatar} alt={racer.name} className="w-full h-full object-cover" />
                </div>

                {/* Name Tag */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-[10px] px-1 rounded whitespace-nowrap">
                    {racer.name}
                </div>
            </div>
        </motion.div>
    );
};
