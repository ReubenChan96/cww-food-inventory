import React from 'react';

interface PantryKeeperLogoProps {
  className?: string;
}

export function PantryKeeperLogo({ className = "w-12 h-12" }: PantryKeeperLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract pantry shelves design - larger elements, less padding */}
      {/* Top shelf */}
      <rect x="15" y="15" width="70" height="6" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="18" y="22" width="22" height="18" rx="2" fill="white" fillOpacity="0.75" />
      <rect x="45" y="22" width="28" height="18" rx="2" fill="white" fillOpacity="0.85" />
      
      {/* Middle shelf */}
      <rect x="15" y="45" width="70" height="6" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="18" y="52" width="18" height="22" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="40" y="52" width="16" height="22" rx="2" fill="white" fillOpacity="0.7" />
      <rect x="60" y="52" width="22" height="22" rx="2" fill="white" fillOpacity="0.85" />
      
      {/* Bottom shelf */}
      <rect x="15" y="79" width="70" height="6" rx="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}