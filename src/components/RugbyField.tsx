import React from 'react';

export const RugbyField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative w-full h-full bg-green-600 overflow-hidden flex flex-col justify-center">
            {/* Field Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-30 pointer-events-none">
                {/* Try lines and 22m lines etc. - simplified for vertical scrolling or horizontal? 
            User said "Race", usually horizontal or vertical. 
            Let's go with Vertical (Upwards) or Horizontal (Left to Right).
            Rugby fields are long. Let's do Horizontal for mobile landscape or Vertical for portrait.
            Mobile is usually portrait. Let's do Vertical (Bottom to Top).
        */}
                <div className="w-full h-[10%] border-b-2 border-white" /> {/* Dead ball line */}
                <div className="w-full h-[10%] border-b-2 border-white" /> {/* Try line */}
                <div className="w-full h-[20%] border-b-2 border-white" /> {/* 22m */}
                <div className="w-full h-[10%] border-b-2 border-white border-dashed" /> {/* 10m */}
                <div className="w-full h-[0%] border-b-4 border-white" /> {/* Halfway */}
                <div className="w-full h-[10%] border-t-2 border-white border-dashed" /> {/* 10m */}
                <div className="w-full h-[20%] border-t-2 border-white" /> {/* 22m */}
                <div className="w-full h-[10%] border-t-2 border-white" /> {/* Try line */}
                <div className="w-full h-[10%] border-t-2 border-white" /> {/* Dead ball line */}
            </div>

            {/* Grass Texture Overlay (Optional) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grass.png')] opacity-20 pointer-events-none mix-blend-overlay" />

            {/* Content (Racers) */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
