import React from 'react';

export const MandalaRing = ({ className = '', style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 400 400" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
    <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <g stroke="currentColor" strokeWidth="1.5">
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d="M200,40 Q230,120 200,200 Q170,120 200,40" transform={`rotate(${i * 30} 200 200)`} />
      ))}
    </g>
    <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="200" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
  </svg>
);

export const JaaliDivider = ({ className = '' }: { className?: string }) => (
  <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="w-full h-[40px] text-primary" fill="currentColor">
      <pattern id="jaali" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
         <path d="M20,0 L40,20 L20,40 L0,20 Z M20,5 L35,20 L20,35 L5,20 Z" fill="currentColor" opacity="0.4"/>
         <circle cx="20" cy="20" r="3" fill="currentColor"/>
      </pattern>
      <rect x="0" y="0" width="100%" height="40" fill="url(#jaali)" />
    </svg>
  </div>
);

export const CornerOrnament = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5,5 L95,5 L95,15 C60,15 15,60 15,95 L5,95 Z" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
    <path d="M15,15 C45,15 45,45 70,45 C75,45 80,42 85,35" strokeWidth="1.5" />
    <path d="M15,15 C15,45 45,45 45,70 C45,75 42,80 35,85" strokeWidth="1.5" />
    <circle cx="45" cy="45" r="4" fill="currentColor" />
    <circle cx="85" cy="35" r="2" fill="currentColor" />
    <circle cx="35" cy="85" r="2" fill="currentColor" />
    <path d="M20,20 L35,35" strokeWidth="1" opacity="0.5" />
  </svg>
);