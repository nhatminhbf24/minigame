import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
}

// 1. ÔNG MẶT TRỜI CƯỜI TƯƠI (Sun)
export const CuteSunArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sun Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect
        key={i}
        x="76"
        y="14"
        width="8"
        height="18"
        rx="4"
        fill="#F59E0B"
        transform={`rotate(${angle} 80 80)`}
      />
    ))}
    {/* Sun Face */}
    <circle cx="80" cy="80" r="44" fill="#FACC15" stroke="#F59E0B" strokeWidth="4" />

    {/* Sparkling Eyes */}
    <circle cx="66" cy="74" r="5" fill="#78350F" />
    <circle cx="68" cy="72" r="2" fill="#FFFFFF" />
    <circle cx="94" cy="74" r="5" fill="#78350F" />
    <circle cx="96" cy="72" r="2" fill="#FFFFFF" />

    {/* Rosy Cheeks */}
    <circle cx="56" cy="84" r="6" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="84" r="6" fill="#FB7185" opacity="0.6" />

    {/* Warm Smile */}
    <path d="M70 86C74 94 86 94 90 86" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// 2. NGÔI SAO VÀNG LẤP LÁNH (Star)
export const CuteStarArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="star-grad-full" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path
      d="M80 20L96 58L136 60L104 90L114 130L80 108L46 130L56 90L24 60L64 58L80 20Z"
      fill="url(#star-grad-full)"
      stroke="#D97706"
      strokeWidth="3"
    />
    {/* Cute eyes on Star */}
    <circle cx="70" cy="74" r="4.5" fill="#713F12" />
    <circle cx="72" cy="72" r="1.5" fill="#FFFFFF" />
    <circle cx="90" cy="74" r="4.5" fill="#713F12" />
    <circle cx="92" cy="72" r="1.5" fill="#FFFFFF" />
    <path d="M76 82C78 86 82 86 84 82" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="62" cy="80" r="4" fill="#FB7185" opacity="0.6" />
    <circle cx="98" cy="80" r="4" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 3. CHÙM BÓNG BAY RỰC RỠ (Balloons)
export const CuteBalloonArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Strings */}
    <path d="M54 94C64 120 78 136 80 144" stroke="#94A3B8" strokeWidth="2" fill="none" />
    <path d="M80 84L80 144" stroke="#94A3B8" strokeWidth="2" fill="none" />
    <path d="M106 94C96 120 82 136 80 144" stroke="#94A3B8" strokeWidth="2" fill="none" />
    <circle cx="80" cy="144" r="3" fill="#D97706" />

    {/* Left Pink Balloon */}
    <ellipse cx="54" cy="68" rx="20" ry="26" fill="#F472B6" />
    <ellipse cx="48" cy="58" rx="4" ry="8" fill="#FCE7F3" opacity="0.8" transform="rotate(-20 48 58)" />
    <polygon points="54,94 50,98 58,98" fill="#DB2777" />

    {/* Right Blue Balloon */}
    <ellipse cx="106" cy="68" rx="20" ry="26" fill="#38BDF8" />
    <ellipse cx="100" cy="58" rx="4" ry="8" fill="#E0F2FE" opacity="0.8" transform="rotate(-20 100 58)" />
    <polygon points="106,94 102,98 110,98" fill="#0284C7" />

    {/* Center Red/Orange Balloon */}
    <ellipse cx="80" cy="54" rx="24" ry="30" fill="#EF4444" />
    <ellipse cx="72" cy="42" rx="5" ry="10" fill="#FEE2E2" opacity="0.8" transform="rotate(-20 72 42)" />
    <polygon points="80,84 75,90 85,90" fill="#B91C1C" />
  </svg>
);
