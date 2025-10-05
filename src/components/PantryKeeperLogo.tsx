import React from 'react';

interface PantryKeeperLogoProps {
  className?: string;
}

export function PantryKeeperLogo({ className = "w-12 h-12" }: PantryKeeperLogoProps) {
  return (
    <div className={`${className} bg-[#1b6df7] rounded-[22%] flex items-center justify-center p-[14%]`}>
      <svg
        viewBox="0 0 240 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Top bar */}
        <rect x="5" y="5" width="230" height="18" rx="9" fill="white" />
        
        {/* First row - left cell */}
        <rect x="10" y="33" width="42" height="48" rx="4" fill="white" />
        
        {/* First row - middle cell */}
        <rect x="62" y="33" width="94" height="48" rx="4" fill="white" />
        
        {/* First row - right cell */}
        <rect x="166" y="33" width="64" height="48" rx="4" fill="white" />
        
        {/* Middle bar */}
        <rect x="5" y="91" width="230" height="18" rx="9" fill="white" />
        
        {/* Second row - left cell */}
        <rect x="10" y="119" width="90" height="56" rx="4" fill="white" />
        
        {/* Second row - middle cell */}
        <rect x="110" y="119" width="30" height="56" rx="4" fill="white" />
        
        {/* Second row - right cell */}
        <rect x="150" y="119" width="80" height="56" rx="4" fill="white" />
        
        {/* Bottom bar */}
        <rect x="5" y="185" width="230" height="18" rx="9" fill="white" />
      </svg>
    </div>
  );
}
