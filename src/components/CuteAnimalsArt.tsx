import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
}

// ==========================================
// 20 ĐỘNG VẬT CHUẨN Y CHANG TRANH "ANIMALS NAME"
// ==========================================

// 1. SƯ TỬ (Lion) - Bờm nâu xù, lông vàng óng, mặt cười tươi, hai chân trước chụm
export const CuteLionArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="lion-mane" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="70%" stopColor="#C2410C" />
        <stop offset="100%" stopColor="#9A3412" />
      </radialGradient>
      <linearGradient id="lion-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="60%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Fluffy Round Mane with cute petals */}
    <g>
      <circle cx="80" cy="62" r="46" fill="url(#lion-mane)" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <circle
          key={deg}
          cx={80 + 44 * Math.cos((deg * Math.PI) / 180)}
          cy={62 + 44 * Math.sin((deg * Math.PI) / 180)}
          r="14"
          fill="url(#lion-mane)"
        />
      ))}
    </g>

    {/* Body & Back paws */}
    <ellipse cx="80" cy="116" rx="30" ry="24" fill="url(#lion-fur)" />
    <ellipse cx="50" cy="132" rx="14" ry="10" fill="#F59E0B" />
    <ellipse cx="110" cy="132" rx="14" ry="10" fill="#F59E0B" />
    <circle cx="46" cy="134" r="2.5" fill="#B45309" />
    <circle cx="54" cy="134" r="2.5" fill="#B45309" />
    <circle cx="106" cy="134" r="2.5" fill="#B45309" />
    <circle cx="114" cy="134" r="2.5" fill="#B45309" />

    {/* Front Paws */}
    <rect x="66" y="112" width="12" height="26" rx="6" fill="#FDE047" />
    <rect x="82" y="112" width="12" height="26" rx="6" fill="#FDE047" />
    <circle cx="72" cy="134" r="2" fill="#B45309" />
    <circle cx="88" cy="134" r="2" fill="#B45309" />

    {/* Tail with brown brush */}
    <path d="M106 114C122 108 132 94 128 82C124 74 116 80 120 88" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
    <ellipse cx="128" cy="80" rx="8" ry="12" fill="#9A3412" transform="rotate(30 128 80)" />

    {/* Ears */}
    <circle cx="52" cy="38" r="11" fill="url(#lion-fur)" />
    <circle cx="52" cy="38" r="6" fill="#EA580C" />
    <circle cx="108" cy="38" r="11" fill="url(#lion-fur)" />
    <circle cx="108" cy="38" r="6" fill="#EA580C" />

    {/* Head */}
    <circle cx="80" cy="62" r="32" fill="url(#lion-fur)" />

    {/* Snout */}
    <ellipse cx="80" cy="72" rx="16" ry="12" fill="#FEF08A" />
    <polygon points="80,68 74,62 86,62" fill="#78350F" />
    <path d="M80 68V74M80 74C76 77 71 76 68 74M80 74C84 77 89 76 92 74" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

    {/* Big Sparkly Eyes */}
    <ellipse cx="66" cy="54" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="68" cy="52" r="2.5" fill="#FFFFFF" />
    <circle cx="64" cy="57" r="1.2" fill="#FFFFFF" />

    <ellipse cx="94" cy="54" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="96" cy="52" r="2.5" fill="#FFFFFF" />
    <circle cx="92" cy="57" r="1.2" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="56" cy="66" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="66" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 2. VOI CON (Elephant) - Xanh xám nhạt, tai to hồng, vòi cong tinh nghịch
export const CuteElephantArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ele-skin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="60%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
    {/* Giant Flappy Ears */}
    <ellipse cx="36" cy="58" rx="26" ry="24" fill="url(#ele-skin)" />
    <ellipse cx="36" cy="58" rx="17" ry="16" fill="#FCE7F3" />
    <ellipse cx="124" cy="58" rx="26" ry="24" fill="url(#ele-skin)" />
    <ellipse cx="124" cy="58" rx="17" ry="16" fill="#FCE7F3" />

    {/* Body */}
    <ellipse cx="80" cy="114" rx="34" ry="26" fill="url(#ele-skin)" />

    {/* Paws */}
    <rect x="52" y="116" width="14" height="24" rx="7" fill="url(#ele-skin)" />
    <rect x="94" y="116" width="14" height="24" rx="7" fill="url(#ele-skin)" />
    <circle cx="55" cy="136" r="2.5" fill="#FFFFFF" />
    <circle cx="63" cy="136" r="2.5" fill="#FFFFFF" />
    <circle cx="97" cy="136" r="2.5" fill="#FFFFFF" />
    <circle cx="105" cy="136" r="2.5" fill="#FFFFFF" />

    {/* Head */}
    <circle cx="80" cy="58" r="32" fill="url(#ele-skin)" />

    {/* Playful Trunk with water drops */}
    <path d="M80 66C80 82 92 88 100 84C106 80 102 74 96 76" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="102" cy="68" r="3" fill="#38BDF8" />
    <circle cx="110" cy="60" r="2" fill="#38BDF8" />

    {/* Cute Tusks */}
    <path d="M68 76C64 78 64 84 66 86C68 84 70 80 68 76Z" fill="#FFFFFF" />
    <path d="M92 76C96 78 96 84 94 86C92 84 90 80 92 76Z" fill="#FFFFFF" />

    {/* Eyes */}
    <ellipse cx="64" cy="52" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="66" cy="50" r="2.5" fill="#FFFFFF" />
    <ellipse cx="96" cy="52" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="98" cy="50" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="52" cy="66" r="6" fill="#FB7185" opacity="0.65" />
    <circle cx="108" cy="66" r="6" fill="#FB7185" opacity="0.65" />
  </svg>
);

// 3. CHÚ HỔ (Tiger) - Cam rực rỡ, sọc vằn đen, má trắng, đuôi cong
export const CuteTigerArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="tiger-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDBA74" />
        <stop offset="60%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Tail with stripes */}
    <path d="M112 110C128 106 142 90 136 76C132 68 122 74 126 84" stroke="#EA580C" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M136 80L130 84M134 88L126 92" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

    {/* Body & Paws */}
    <ellipse cx="80" cy="114" rx="32" ry="24" fill="url(#tiger-body)" />
    {/* White Chest */}
    <ellipse cx="80" cy="116" rx="16" ry="14" fill="#FFFFFF" />

    {/* Back & Front Paws */}
    <ellipse cx="50" cy="132" rx="12" ry="8" fill="#EA580C" />
    <ellipse cx="110" cy="132" rx="12" ry="8" fill="#EA580C" />
    <rect x="66" y="112" width="11" height="24" rx="5.5" fill="#FFFFFF" />
    <rect x="83" y="112" width="11" height="24" rx="5.5" fill="#FFFFFF" />

    {/* Ears */}
    <circle cx="50" cy="40" r="13" fill="url(#tiger-body)" />
    <circle cx="50" cy="40" r="7" fill="#FCE7F3" />
    <circle cx="110" cy="40" r="13" fill="url(#tiger-body)" />
    <circle cx="110" cy="40" r="7" fill="#FCE7F3" />

    {/* Head */}
    <circle cx="80" cy="60" r="34" fill="url(#tiger-body)" />

    {/* Black Tiger Stripes */}
    <path d="M80 32V42M72 35L75 42M88 35L85 42" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M48 58L57 60M48 66L56 66" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M112 58L103 60M112 66L104 66" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

    {/* White Muzzle */}
    <ellipse cx="80" cy="72" rx="17" ry="12" fill="#FFFFFF" />
    <polygon points="80,68 75,63 85,63" fill="#E11D48" />
    <path d="M80 68V74M80 74C76 77 71 76 68 74M80 74C84 77 89 76 92 74" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="64" cy="54" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="66" cy="52" r="2.5" fill="#FFFFFF" />
    <ellipse cx="96" cy="54" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="98" cy="52" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="54" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
    <circle cx="106" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 4. CHÚ KHỈ (Monkey) - Nâu socola, tai tròn to, mặt trái tim màu kem
export const CuteMonkeyArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mk-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
      <linearGradient id="mk-skin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="100%" stopColor="#FDBA74" />
      </linearGradient>
    </defs>
    {/* Long Curled Tail */}
    <path d="M106 112C128 112 146 98 138 82C132 70 118 74 122 86C125 92 134 90 132 84" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Body */}
    <ellipse cx="80" cy="112" rx="28" ry="24" fill="url(#mk-body)" />
    <ellipse cx="80" cy="114" rx="18" ry="16" fill="url(#mk-skin)" />
    <ellipse cx="54" cy="130" rx="10" ry="7" fill="url(#mk-skin)" />
    <ellipse cx="106" cy="130" rx="10" ry="7" fill="url(#mk-skin)" />

    {/* Giant Round Ears */}
    <circle cx="40" cy="56" r="16" fill="url(#mk-body)" />
    <circle cx="40" cy="56" r="10" fill="url(#mk-skin)" />
    <circle cx="120" cy="56" r="16" fill="url(#mk-body)" />
    <circle cx="120" cy="56" r="10" fill="url(#mk-skin)" />

    {/* Head */}
    <circle cx="80" cy="56" r="32" fill="url(#mk-body)" />
    {/* Cute Heart-shaped Face Mask */}
    <path d="M80 48C72 36 52 40 54 60C55 74 74 84 80 84C86 84 105 74 106 60C108 40 88 36 80 48Z" fill="url(#mk-skin)" />

    {/* Eyes */}
    <ellipse cx="68" cy="54" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="70" cy="52" r="2.5" fill="#FFFFFF" />
    <ellipse cx="92" cy="54" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="94" cy="52" r="2.5" fill="#FFFFFF" />

    {/* Wide Smile */}
    <path d="M68 68C74 78 86 78 92 68" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <path d="M72 71C76 78 84 78 88 71" fill="#F43F5E" />

    {/* Cheeks */}
    <circle cx="56" cy="66" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="66" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 5. HƯƠU CAO CỔ (Giraffe) - Lông vàng đốm nâu, cổ cao, sừng nhỏ, bờm xinh
export const CuteGiraffeArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gf-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#FACC15" />
      </linearGradient>
    </defs>
    {/* Mane running down neck */}
    <path d="M84 40L88 120" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />

    {/* Legs & Hooves */}
    <rect x="62" y="118" width="8" height="24" rx="4" fill="#EAB308" />
    <rect x="62" y="136" width="8" height="6" fill="#78350F" />
    <rect x="74" y="118" width="8" height="24" rx="4" fill="#EAB308" />
    <rect x="74" y="136" width="8" height="6" fill="#78350F" />
    <rect x="88" y="118" width="8" height="24" rx="4" fill="#EAB308" />
    <rect x="88" y="136" width="8" height="6" fill="#78350F" />

    {/* Body */}
    <ellipse cx="80" cy="116" rx="28" ry="18" fill="url(#gf-fur)" />
    {/* Body Spots */}
    <circle cx="72" cy="114" r="4.5" fill="#B45309" />
    <circle cx="86" cy="112" r="5.5" fill="#B45309" />
    <circle cx="94" cy="118" r="4" fill="#B45309" />

    {/* Long Neck */}
    <path d="M72 116L74 44H86L88 116H72Z" fill="url(#gf-fur)" />
    {/* Neck Spots */}
    <circle cx="78" cy="58" r="4" fill="#B45309" />
    <circle cx="82" cy="74" r="4.5" fill="#B45309" />
    <circle cx="77" cy="92" r="5" fill="#B45309" />

    {/* Ossicones / Horns */}
    <line x1="74" y1="28" x2="74" y2="18" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" />
    <circle cx="74" cy="16" r="4" fill="#92400E" />
    <line x1="86" y1="28" x2="86" y2="18" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" />
    <circle cx="86" cy="16" r="4" fill="#92400E" />

    {/* Ears */}
    <ellipse cx="62" cy="32" rx="10" ry="5" fill="url(#gf-fur)" transform="rotate(-20 62 32)" />
    <ellipse cx="98" cy="32" rx="10" ry="5" fill="url(#gf-fur)" transform="rotate(20 98 32)" />

    {/* Head */}
    <ellipse cx="80" cy="36" rx="20" ry="18" fill="url(#gf-fur)" />

    {/* Eyes */}
    <ellipse cx="70" cy="32" rx="5" ry="6" fill="#1E293B" />
    <circle cx="71" cy="30" r="2" fill="#FFFFFF" />
    <ellipse cx="90" cy="32" rx="5" ry="6" fill="#1E293B" />
    <circle cx="91" cy="30" r="2" fill="#FFFFFF" />

    {/* Snout */}
    <ellipse cx="80" cy="46" rx="14" ry="10" fill="#FEF08A" />
    <circle cx="76" cy="44" r="1.5" fill="#78350F" />
    <circle cx="84" cy="44" r="1.5" fill="#78350F" />
    <path d="M76 48C78 51 82 51 84 48" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="64" cy="38" r="4" fill="#FB7185" opacity="0.6" />
    <circle cx="96" cy="38" r="4" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 6. NGỰA VẰN (Zebra) - Lông trắng sọc đen tương phản cao, bờm đứng, móng đen
export const CuteZebraArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Mane (Bờm ngựa vằn) */}
    <path d="M68 28C64 36 64 56 68 70" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
    <path d="M66 32L72 32M66 42L72 42M66 52L72 52" stroke="#FFFFFF" strokeWidth="2" />

    {/* Body */}
    <ellipse cx="80" cy="116" rx="30" ry="24" fill="#FFFFFF" stroke="#E2E8F0" />
    {/* Body Stripes */}
    <path d="M68 102C76 106 78 124 74 130" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    <path d="M84 100C90 106 90 124 86 132" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    <path d="M96 104C102 110 100 122 96 128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

    {/* Legs */}
    <rect x="56" y="122" width="10" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="56" y="138" width="10" height="6" fill="#1E293B" />
    <rect x="94" y="122" width="10" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="94" y="138" width="10" height="6" fill="#1E293B" />

    {/* Ears */}
    <polygon points="66,38 58,18 76,30" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
    <polygon points="94,38 102,18 84,30" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />

    {/* Head */}
    <ellipse cx="80" cy="58" rx="26" ry="28" fill="#FFFFFF" stroke="#E2E8F0" />

    {/* Head Stripes */}
    <path d="M80 34V44M70 38L75 44M90 38L85 44" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M58 56L68 58M58 64L66 66" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <path d="M102 56L92 58M102 64L94 66" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

    {/* Black Muzzle */}
    <ellipse cx="80" cy="74" rx="16" ry="12" fill="#1E293B" />
    <circle cx="74" cy="72" r="2" fill="#94A3B8" />
    <circle cx="86" cy="72" r="2" fill="#94A3B8" />
    <path d="M76 78C78 81 82 81 84 78" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

    {/* Big Eyes */}
    <ellipse cx="66" cy="52" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="68" cy="50" r="2.5" fill="#FFFFFF" />
    <ellipse cx="94" cy="52" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="96" cy="50" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="56" cy="66" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="66" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 7. THỎ CON (Rabbit) - Trắng xù, tai dài hồng, má hồng, ôm chân ngồi ngoan
export const CuteRabbitArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <ellipse cx="80" cy="116" rx="30" ry="26" fill="#FFFFFF" stroke="#E2E8F0" />
    {/* Little Cotton Tail */}
    <circle cx="114" cy="120" r="10" fill="#FFFFFF" stroke="#E2E8F0" />

    {/* Paws */}
    <ellipse cx="60" cy="136" rx="12" ry="8" fill="#FFFFFF" stroke="#E2E8F0" />
    <ellipse cx="100" cy="136" rx="12" ry="8" fill="#FFFFFF" stroke="#E2E8F0" />

    {/* Long Ears */}
    <ellipse cx="62" cy="36" rx="10" ry="28" fill="#FFFFFF" stroke="#E2E8F0" transform="rotate(-8 62 36)" />
    <ellipse cx="62" cy="36" rx="5.5" ry="20" fill="#FCE7F3" transform="rotate(-8 62 36)" />
    <ellipse cx="98" cy="36" rx="10" ry="28" fill="#FFFFFF" stroke="#E2E8F0" transform="rotate(8 98 36)" />
    <ellipse cx="98" cy="36" rx="5.5" ry="20" fill="#FCE7F3" transform="rotate(8 98 36)" />

    {/* Head */}
    <circle cx="80" cy="68" r="32" fill="#FFFFFF" stroke="#E2E8F0" />

    {/* Eyes */}
    <ellipse cx="66" cy="64" rx="5.5" ry="7.5" fill="#1E293B" />
    <circle cx="68" cy="62" r="2.5" fill="#FFFFFF" />
    <circle cx="64" cy="66" r="1" fill="#FFFFFF" />

    <ellipse cx="94" cy="64" rx="5.5" ry="7.5" fill="#1E293B" />
    <circle cx="96" cy="62" r="2.5" fill="#FFFFFF" />
    <circle cx="92" cy="66" r="1" fill="#FFFFFF" />

    {/* Nose & Mouth */}
    <ellipse cx="80" cy="74" rx="3.5" ry="2.5" fill="#F43F5E" />
    <path d="M80 76V80M80 80C76 83 72 82 70 80M80 80C84 83 88 82 90 80" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="54" cy="76" r="6" fill="#FB7185" opacity="0.6" />
    <circle cx="106" cy="76" r="6" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 8. CHÚ CHÓ CON (Dog) - Nâu vàng, tai cụp nâu, vệt trắng giữa trán, đeo vòng xanh đính huy hiệu vàng
export const CuteDogArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dog-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="60%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="dog-ear-col" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    {/* Wagging Tail */}
    <path d="M122 110C136 100 148 76 138 68C128 62 120 84 114 98" stroke="#EA580C" strokeWidth="10" strokeLinecap="round" fill="none" />

    {/* Body */}
    <ellipse cx="80" cy="112" rx="34" ry="28" fill="url(#dog-body)" />
    {/* White Chest */}
    <path d="M68 96C68 96 80 126 92 96C88 92 72 92 68 96Z" fill="#FFFFFF" />

    {/* Paws */}
    <ellipse cx="50" cy="130" rx="13" ry="9" fill="#EA580C" />
    <ellipse cx="110" cy="130" rx="13" ry="9" fill="#EA580C" />
    <rect x="65" y="112" width="12" height="24" rx="6" fill="#FFFFFF" />
    <rect x="83" y="112" width="12" height="24" rx="6" fill="#FFFFFF" />

    {/* Blue Collar with Gold Medal */}
    <path d="M54 90C68 100 92 100 106 90" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
    <circle cx="80" cy="98" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />

    {/* Floppy Brown Ears */}
    <ellipse cx="44" cy="58" rx="15" ry="26" fill="url(#dog-ear-col)" transform="rotate(-18 44 58)" />
    <ellipse cx="116" cy="58" rx="15" ry="26" fill="url(#dog-ear-col)" transform="rotate(18 116 58)" />

    {/* Head */}
    <circle cx="80" cy="58" r="36" fill="url(#dog-body)" />
    {/* White blaze down forehead */}
    <path d="M76 34L84 34L86 64L74 64Z" fill="#FFFFFF" />

    {/* White Snout */}
    <ellipse cx="80" cy="72" rx="20" ry="14" fill="#FFFFFF" />
    {/* Nose */}
    <path d="M74 65C74 65 80 62 86 65C88 68 83 73 80 73C77 73 72 68 74 65Z" fill="#1E293B" />

    {/* Smile & Tongue */}
    <path d="M73 73C77 76 83 76 87 73" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M76 75C76 83 84 83 84 75" fill="#F43F5E" />

    {/* Sparkly Eyes */}
    <ellipse cx="64" cy="52" rx="6.5" ry="8" fill="#1E293B" />
    <circle cx="66" cy="49" r="2.5" fill="#FFFFFF" />
    <ellipse cx="96" cy="52" rx="6.5" ry="8" fill="#1E293B" />
    <circle cx="98" cy="49" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="52" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
    <circle cx="108" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 9. MÈO CON (Cat) - Xám sọc, đeo vòng hồng chuông vàng, mắt ngọc long lanh
export const CuteCatArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cat-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="60%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M110 115C128 115 142 98 136 84C132 76 122 84 124 94" stroke="#64748B" strokeWidth="9" strokeLinecap="round" />
    <path d="M134 84L128 88M132 92L126 96" stroke="#334155" strokeWidth="2.5" />

    {/* Body */}
    <ellipse cx="80" cy="114" rx="30" ry="26" fill="url(#cat-body)" />
    <ellipse cx="80" cy="116" rx="16" ry="18" fill="#FFFFFF" />
    <ellipse cx="66" cy="132" rx="9" ry="6" fill="#FFFFFF" />
    <ellipse cx="94" cy="132" rx="9" ry="6" fill="#FFFFFF" />

    {/* Pink Collar with Golden Jingle Bell */}
    <path d="M58 86C70 94 90 94 102 86" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
    <circle cx="80" cy="94" r="5.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />

    {/* Pointed Ears */}
    <path d="M46 50L54 22L72 44Z" fill="url(#cat-body)" />
    <path d="M52 46L56 28L68 42Z" fill="#FCE7F3" />
    <path d="M114 50L106 22L88 44Z" fill="url(#cat-body)" />
    <path d="M108 46L104 28L92 42Z" fill="#FCE7F3" />

    {/* Head */}
    <circle cx="80" cy="62" r="34" fill="url(#cat-body)" />
    {/* Tabby Stripes on forehead */}
    <path d="M80 34V44M73 36L76 42M87 36L84 42" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

    {/* Big Emerald Eyes */}
    <ellipse cx="62" cy="58" rx="8" ry="10" fill="#10B981" />
    <ellipse cx="62" cy="58" rx="4.5" ry="8" fill="#064E3B" />
    <circle cx="64" cy="55" r="2.5" fill="#FFFFFF" />

    <ellipse cx="98" cy="58" rx="8" ry="10" fill="#10B981" />
    <ellipse cx="98" cy="58" rx="4.5" ry="8" fill="#064E3B" />
    <circle cx="100" cy="55" r="2.5" fill="#FFFFFF" />

    {/* Nose & Mouth */}
    <polygon points="80,70 76,67 84,67" fill="#F43F5E" />
    <path d="M80 70C77 74 72 74 70 72" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <path d="M80 70C83 74 88 74 90 72" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

    {/* Whiskers */}
    <line x1="48" y1="68" x2="32" y2="65" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="48" y1="73" x2="32" y2="75" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="112" y1="68" x2="128" y2="65" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="112" y1="73" x2="128" y2="75" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="50" cy="72" r="5.5" fill="#FB7185" opacity="0.6" />
    <circle cx="110" cy="72" r="5.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 10. CHÚ GẤU (Bear) - Nâu socola ấm áp, tai tròn, mõm kem, ngồi mũm mĩm
export const CuteBearArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="bear-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#92400E" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    {/* Body */}
    <ellipse cx="80" cy="116" rx="34" ry="26" fill="url(#bear-fur)" />
    <ellipse cx="80" cy="118" rx="20" ry="16" fill="#FDE68A" />

    {/* Big Paws */}
    <ellipse cx="48" cy="132" rx="14" ry="10" fill="#78350F" />
    <ellipse cx="112" cy="132" rx="14" ry="10" fill="#78350F" />
    <circle cx="48" cy="132" r="5" fill="#FDE68A" />
    <circle cx="112" cy="132" r="5" fill="#FDE68A" />

    {/* Front Paws */}
    <ellipse cx="58" cy="110" rx="9" ry="14" fill="#78350F" transform="rotate(20 58 110)" />
    <ellipse cx="102" cy="110" rx="9" ry="14" fill="#78350F" transform="rotate(-20 102 110)" />

    {/* Round Ears */}
    <circle cx="50" cy="40" r="14" fill="url(#bear-fur)" />
    <circle cx="50" cy="40" r="7" fill="#FDE68A" />
    <circle cx="110" cy="40" r="14" fill="url(#bear-fur)" />
    <circle cx="110" cy="40" r="7" fill="#FDE68A" />

    {/* Head */}
    <circle cx="80" cy="60" r="34" fill="url(#bear-fur)" />

    {/* Cream Snout */}
    <ellipse cx="80" cy="72" rx="18" ry="13" fill="#FEF3C7" />
    <ellipse cx="80" cy="66" rx="6" ry="4.5" fill="#1E293B" />
    <path d="M80 70V76M80 76C76 79 72 78 70 76M80 76C84 79 88 78 90 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="64" cy="54" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="66" cy="52" r="2" fill="#FFFFFF" />
    <ellipse cx="96" cy="54" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="98" cy="52" r="2" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="54" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
    <circle cx="106" cy="66" r="5.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 11. HƯƠU / NAI VÀNG (Deer) - Sừng nhánh nâu, đốm trắng trên lưng, yếm trắng
export const CuteDeerArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="deer-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Tail with white tip */}
    <ellipse cx="118" cy="112" rx="8" ry="6" fill="#FFFFFF" stroke="#B45309" />

    {/* Legs */}
    <rect x="58" y="122" width="7" height="24" rx="3.5" fill="#B45309" />
    <rect x="68" y="122" width="7" height="24" rx="3.5" fill="#92400E" />
    <rect x="92" y="122" width="7" height="24" rx="3.5" fill="#B45309" />
    <rect x="102" y="122" width="7" height="24" rx="3.5" fill="#92400E" />

    {/* Body */}
    <ellipse cx="80" cy="116" rx="28" ry="20" fill="url(#deer-fur)" />
    {/* White Dotted Spots on back */}
    <circle cx="74" cy="110" r="2.5" fill="#FFFFFF" />
    <circle cx="84" cy="108" r="2.5" fill="#FFFFFF" />
    <circle cx="94" cy="110" r="2.5" fill="#FFFFFF" />
    <circle cx="80" cy="116" r="2" fill="#FFFFFF" />
    <circle cx="90" cy="116" r="2" fill="#FFFFFF" />

    {/* Branching Antlers */}
    <path d="M68 34L60 18M60 18L52 16M60 18L58 26M64 24L58 22" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    <path d="M92 34L100 18M100 18L108 16M100 18L102 26M96 24L102 22" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />

    {/* Ears */}
    <ellipse cx="50" cy="42" rx="14" ry="7" fill="url(#deer-fur)" transform="rotate(-25 50 42)" />
    <ellipse cx="50" cy="42" rx="8" ry="4" fill="#FCE7F3" transform="rotate(-25 50 42)" />
    <ellipse cx="110" cy="42" rx="14" ry="7" fill="url(#deer-fur)" transform="rotate(25 110 42)" />
    <ellipse cx="110" cy="42" rx="8" ry="4" fill="#FCE7F3" transform="rotate(25 110 42)" />

    {/* Head */}
    <ellipse cx="80" cy="56" rx="24" ry="26" fill="url(#deer-fur)" />

    {/* White Muzzle */}
    <ellipse cx="80" cy="72" rx="14" ry="10" fill="#FFFFFF" />
    <ellipse cx="80" cy="67" rx="4.5" ry="3" fill="#1E293B" />
    <path d="M76 74C78 77 82 77 84 74" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Big Gentle Eyes */}
    <ellipse cx="66" cy="52" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="68" cy="50" r="2.5" fill="#FFFFFF" />
    <ellipse cx="94" cy="52" rx="6" ry="7.5" fill="#1E293B" />
    <circle cx="96" cy="50" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="56" cy="64" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="64" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 12. CÁO CON (Fox) - Cam rực rỡ, tai đen nhọn, yếm trắng, đuôi siêu to xù chóp trắng
export const CuteFoxArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="fox-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Giant Fluffy Tail with White Tip */}
    <path d="M100 110C120 120 148 110 144 80C140 60 120 70 110 90" fill="url(#fox-fur)" />
    <path d="M144 80C142 66 130 68 126 76C122 84 136 84 144 80Z" fill="#FFFFFF" />

    {/* Body */}
    <ellipse cx="78" cy="116" rx="28" ry="24" fill="url(#fox-fur)" />
    {/* White Fluffy Chest */}
    <path d="M66 94C66 94 78 126 90 94C86 90 70 90 66 94Z" fill="#FFFFFF" />

    {/* Black Paws */}
    <rect x="62" y="116" width="10" height="24" rx="5" fill="#1E293B" />
    <rect x="84" y="116" width="10" height="24" rx="5" fill="#1E293B" />

    {/* Pointed Ears with Black Tips */}
    <polygon points="46,46 36,16 68,36" fill="url(#fox-fur)" />
    <polygon points="46,46 36,16 48,26" fill="#1E293B" />
    <polygon points="50,42 42,24 62,36" fill="#FFFFFF" />

    <polygon points="110,46 120,16 88,36" fill="url(#fox-fur)" />
    <polygon points="110,46 120,16 108,26" fill="#1E293B" />
    <polygon points="106,42 114,24 94,36" fill="#FFFFFF" />

    {/* Head */}
    <circle cx="78" cy="62" r="32" fill="url(#fox-fur)" />
    {/* White Cheek Fluffs */}
    <path d="M50 68C58 78 78 84 78 84C78 84 98 78 106 68C108 58 92 60 78 62C64 60 48 58 50 68Z" fill="#FFFFFF" />

    {/* Nose & Smile */}
    <polygon points="78,72 73,67 83,67" fill="#1E293B" />
    <path d="M74 77C76 79 80 79 82 77" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

    {/* Sparkly Eyes */}
    <ellipse cx="64" cy="56" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="66" cy="54" r="2.5" fill="#FFFFFF" />
    <ellipse cx="92" cy="56" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="94" cy="54" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="56" cy="68" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="100" cy="68" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 13. GẤU TRÚC (Panda) - Đen trắng, quầng mắt đen, cầm cành lá trúc xanh
export const CutePandaArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <ellipse cx="80" cy="114" rx="34" ry="26" fill="#FFFFFF" stroke="#E2E8F0" />
    {/* Black Back Paws */}
    <ellipse cx="48" cy="130" rx="14" ry="10" fill="#1E293B" />
    <ellipse cx="112" cy="130" rx="14" ry="10" fill="#1E293B" />

    {/* Green Bamboo Leaves in hands */}
    <path d="M92 90C106 82 118 86 122 92C112 94 102 92 92 90Z" fill="#16A34A" />
    <path d="M92 90C102 78 114 78 118 84C108 86 98 86 92 90Z" fill="#22C55E" />
    <line x1="86" y1="104" x2="114" y2="76" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />

    {/* Black Front Arms */}
    <ellipse cx="58" cy="106" rx="10" ry="16" fill="#1E293B" transform="rotate(25 58 106)" />
    <ellipse cx="102" cy="106" rx="10" ry="16" fill="#1E293B" transform="rotate(-25 102 106)" />

    {/* Black Ears */}
    <circle cx="50" cy="40" r="14" fill="#1E293B" />
    <circle cx="110" cy="40" r="14" fill="#1E293B" />

    {/* Head */}
    <circle cx="80" cy="58" r="34" fill="#FFFFFF" stroke="#E2E8F0" />

    {/* Iconic Slanted Black Eye Patches */}
    <ellipse cx="62" cy="56" rx="11" ry="14" fill="#1E293B" transform="rotate(-18 62 56)" />
    <circle cx="64" cy="54" r="3.5" fill="#FFFFFF" />
    <circle cx="61" cy="58" r="1.5" fill="#FFFFFF" />

    <ellipse cx="98" cy="56" rx="11" ry="14" fill="#1E293B" transform="rotate(18 98 56)" />
    <circle cx="96" cy="54" r="3.5" fill="#FFFFFF" />
    <circle cx="99" cy="58" r="1.5" fill="#FFFFFF" />

    {/* Cute Nose & Smile */}
    <ellipse cx="80" cy="68" rx="5" ry="3.5" fill="#1E293B" />
    <path d="M74 74C78 78 82 78 86 74" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="48" cy="68" r="5.5" fill="#FB7185" opacity="0.6" />
    <circle cx="112" cy="68" r="5.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 14. BÒ SỮA (Cow) - Đốm đen trắng, mõm hồng, sừng nhỏ, đeo chuông vàng
export const CuteCowArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body */}
    <ellipse cx="80" cy="112" rx="36" ry="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    {/* Black spots on body */}
    <path d="M54 98C60 92 66 100 62 108C58 114 50 110 52 102Z" fill="#1E293B" />
    <path d="M96 104C106 102 112 112 106 120C100 124 92 118 94 110Z" fill="#1E293B" />

    {/* Pink Udder */}
    <ellipse cx="80" cy="126" rx="12" ry="6" fill="#FCE7F3" stroke="#F472B6" />

    {/* Legs & Hooves */}
    <rect x="52" y="122" width="11" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="52" y="138" width="11" height="6" fill="#1E293B" />
    <rect x="96" y="122" width="11" height="22" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="96" y="138" width="11" height="6" fill="#1E293B" />

    {/* Red Strap & Golden Cow Bell */}
    <path d="M58 84C70 94 90 94 102 84" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
    <circle cx="80" cy="94" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />

    {/* Horns */}
    <path d="M52 38C46 30 50 22 56 26" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
    <path d="M108 38C114 30 110 22 104 26" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />

    {/* Ears */}
    <ellipse cx="40" cy="46" rx="14" ry="8" fill="#FFFFFF" stroke="#E2E8F0" transform="rotate(-15 40 46)" />
    <ellipse cx="40" cy="46" rx="8" ry="4" fill="#FCE7F3" transform="rotate(-15 40 46)" />
    <ellipse cx="120" cy="46" rx="14" ry="8" fill="#1E293B" transform="rotate(15 120 46)" />

    {/* Head */}
    <circle cx="80" cy="54" r="32" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M56 42C66 40 72 48 70 58C66 66 52 64 50 54Z" fill="#1E293B" />

    {/* Eyes */}
    <circle cx="62" cy="52" r="4" fill="#1E293B" />
    <circle cx="63" cy="50" r="1.5" fill="#FFFFFF" />
    <circle cx="98" cy="52" r="5" fill="#1E293B" />
    <circle cx="99" cy="50" r="2" fill="#FFFFFF" />

    {/* Big Pink Snout */}
    <ellipse cx="80" cy="68" rx="22" ry="15" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
    <ellipse cx="73" cy="67" rx="3" ry="4" fill="#BE185D" />
    <ellipse cx="87" cy="67" rx="3" ry="4" fill="#BE185D" />
    <path d="M74 75C78 78 82 78 86 75" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="48" cy="62" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="112" cy="62" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 15. CHÚ NGỰA (Horse) - Nâu vàng, bờm nâu sẫm, vệt trắng trán, móng guốc
export const CuteHorseArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="horse-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="60%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Mane (Bờm ngựa) */}
    <path d="M66 28C62 38 62 58 66 70" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />

    {/* Dark Tail */}
    <path d="M108 114C126 114 136 128 132 140" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Body */}
    <ellipse cx="80" cy="116" rx="32" ry="24" fill="url(#horse-fur)" />

    {/* Legs & Hooves */}
    <rect x="56" y="122" width="10" height="22" rx="4" fill="#B45309" />
    <rect x="56" y="138" width="10" height="6" fill="#78350F" />
    <rect x="94" y="122" width="10" height="22" rx="4" fill="#B45309" />
    <rect x="94" y="138" width="10" height="6" fill="#78350F" />

    {/* Ears */}
    <polygon points="68,40 60,20 78,32" fill="#B45309" />
    <polygon points="92,40 100,20 82,32" fill="#B45309" />

    {/* Head */}
    <ellipse cx="80" cy="56" rx="24" ry="28" fill="url(#horse-fur)" />
    {/* White Blaze on forehead */}
    <path d="M78 36L82 36L84 62L76 62Z" fill="#FFFFFF" />

    {/* Muzzle */}
    <ellipse cx="80" cy="74" rx="16" ry="12" fill="#FEF3C7" />
    <circle cx="74" cy="72" r="2" fill="#78350F" />
    <circle cx="86" cy="72" r="2" fill="#78350F" />
    <path d="M76 78C78 81 82 81 84 78" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Big Shiny Eyes */}
    <ellipse cx="66" cy="52" rx="5" ry="6.5" fill="#1E293B" />
    <circle cx="68" cy="50" r="2" fill="#FFFFFF" />
    <ellipse cx="94" cy="52" rx="5" ry="6.5" fill="#1E293B" />
    <circle cx="96" cy="50" r="2" fill="#FFFFFF" />
  </svg>
);

// 16. CHÚ CỪU (Sheep) - Bông trắng xù như mây, mặt kem hồng, chân xám
export const CuteSheepArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Legs */}
    <rect x="52" y="120" width="10" height="22" rx="5" fill="#475569" />
    <rect x="98" y="120" width="10" height="22" rx="5" fill="#475569" />
    <rect x="68" y="124" width="10" height="20" rx="5" fill="#64748B" />
    <rect x="82" y="124" width="10" height="20" rx="5" fill="#64748B" />

    {/* Cloud Wool Body */}
    <g>
      <circle cx="52" cy="90" r="18" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="108" cy="90" r="18" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="64" cy="110" r="18" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="96" cy="110" r="18" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="80" cy="96" r="28" fill="#FFFFFF" />
      <circle cx="50" cy="108" r="14" fill="#FFFFFF" />
      <circle cx="110" cy="108" r="14" fill="#FFFFFF" />
    </g>

    {/* Droopy Soft Ears */}
    <ellipse cx="44" cy="56" rx="14" ry="7" fill="#FCE7F3" stroke="#F472B6" transform="rotate(-25 44 56)" />
    <ellipse cx="116" cy="56" rx="14" ry="7" fill="#FCE7F3" stroke="#F472B6" transform="rotate(25 116 56)" />

    {/* Cute Sheep Head */}
    <ellipse cx="80" cy="62" rx="26" ry="22" fill="#FFE4E6" stroke="#FDA4AF" />

    {/* Wool Puff on Top of Head */}
    <circle cx="70" cy="40" r="10" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="90" cy="40" r="10" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="80" cy="36" r="11" fill="#FFFFFF" />

    {/* Eyes */}
    <ellipse cx="68" cy="58" rx="4.5" ry="6" fill="#1E293B" />
    <circle cx="70" cy="56" r="2" fill="#FFFFFF" />
    <ellipse cx="92" cy="58" rx="4.5" ry="6" fill="#1E293B" />
    <circle cx="94" cy="56" r="2" fill="#FFFFFF" />

    {/* Cute Nose & Smile */}
    <polygon points="80,68 76,65 84,65" fill="#E11D48" />
    <path d="M80 68V72M80 72C77 75 74 74 72 73M80 72C83 75 86 74 88 73" stroke="#881337" strokeWidth="2" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="58" cy="66" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="102" cy="66" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 17. CHÚ DÊ (Goat) - Màu be nhạt, sừng cong nâu, râu cằm nhỏ, đeo chuông vàng
export const CuteGoatArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="goat-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* Tiny Tail */}
    <path d="M112 110L124 104L118 116Z" fill="#FDE68A" stroke="#CA8A04" />

    {/* Legs */}
    <rect x="58" y="122" width="8" height="24" rx="4" fill="#FDE68A" />
    <rect x="58" y="140" width="8" height="6" fill="#78350F" />
    <rect x="94" y="122" width="8" height="24" rx="4" fill="#FDE68A" />
    <rect x="94" y="140" width="8" height="6" fill="#78350F" />

    {/* Body */}
    <ellipse cx="80" cy="116" rx="30" ry="22" fill="url(#goat-fur)" stroke="#FCD34D" />

    {/* Brown Collar with Yellow Bell */}
    <path d="M60 86C70 94 90 94 100 86" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="80" cy="94" r="5.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />

    {/* Backward Curved Horns */}
    <path d="M66 38C58 26 62 18 68 22" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
    <path d="M94 38C102 26 98 18 92 22" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />

    {/* Ears */}
    <ellipse cx="46" cy="48" rx="14" ry="6" fill="url(#goat-fur)" transform="rotate(-20 46 48)" />
    <ellipse cx="114" cy="48" rx="14" ry="6" fill="url(#goat-fur)" transform="rotate(20 114 48)" />

    {/* Head */}
    <ellipse cx="80" cy="58" rx="24" ry="26" fill="url(#goat-fur)" stroke="#FCD34D" />

    {/* Cute Beard on chin */}
    <polygon points="76,82 84,82 80,92" fill="#FEF3C7" stroke="#CA8A04" />

    {/* Muzzle */}
    <ellipse cx="80" cy="72" rx="14" ry="10" fill="#FFFFFF" />
    <ellipse cx="80" cy="68" rx="3.5" ry="2.5" fill="#78350F" />
    <path d="M76 75C78 78 82 78 84 75" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="66" cy="54" rx="5" ry="6.5" fill="#1E293B" />
    <circle cx="68" cy="52" r="2" fill="#FFFFFF" />
    <ellipse cx="94" cy="54" rx="5" ry="6.5" fill="#1E293B" />
    <circle cx="96" cy="52" r="2" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="56" cy="64" r="4.5" fill="#FB7185" opacity="0.6" />
    <circle cx="104" cy="64" r="4.5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// 18. CHIM CÁNH CỤT (Penguin) - Thân đen bụng trắng tròn xoe, mỏ vàng, chân cam
export const CutePenguinArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Chubby Body */}
    <ellipse cx="80" cy="92" rx="36" ry="46" fill="#1E293B" />
    {/* White Belly */}
    <ellipse cx="80" cy="98" rx="24" ry="34" fill="#FFFFFF" />

    {/* Flippers */}
    <ellipse cx="42" cy="96" rx="8" ry="20" fill="#1E293B" transform="rotate(22 42 96)" />
    <ellipse cx="118" cy="96" rx="8" ry="20" fill="#1E293B" transform="rotate(-22 118 96)" />

    {/* Orange Webbed Feet */}
    <ellipse cx="64" cy="138" rx="13" ry="7" fill="#F97316" />
    <ellipse cx="96" cy="138" rx="13" ry="7" fill="#F97316" />

    {/* White Eye Patches */}
    <ellipse cx="68" cy="58" rx="10" ry="12" fill="#FFFFFF" />
    <ellipse cx="92" cy="58" rx="10" ry="12" fill="#FFFFFF" />

    {/* Big Shiny Eyes */}
    <circle cx="68" cy="58" r="5" fill="#1E293B" />
    <circle cx="70" cy="56" r="2" fill="#FFFFFF" />
    <circle cx="92" cy="58" r="5" fill="#1E293B" />
    <circle cx="94" cy="56" r="2" fill="#FFFFFF" />

    {/* Bright Yellow Beak */}
    <polygon points="80,72 72,62 88,62" fill="#FACC15" />

    {/* Cheeks */}
    <circle cx="56" cy="68" r="4.5" fill="#FB7185" opacity="0.65" />
    <circle cx="104" cy="68" r="4.5" fill="#FB7185" opacity="0.65" />
  </svg>
);

// 19. CHÚ ẾCH XANH (Frog) - Xanh lá tươi rói, mắt lồi to tròn xoe, miệng cười ngoác
export const CuteFrogArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frog-skin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
    </defs>
    {/* Back Frog Legs */}
    <ellipse cx="42" cy="118" rx="18" ry="14" fill="url(#frog-skin)" />
    <ellipse cx="118" cy="118" rx="18" ry="14" fill="url(#frog-skin)" />
    <ellipse cx="36" cy="130" rx="12" ry="7" fill="#22C55E" />
    <ellipse cx="124" cy="130" rx="12" ry="7" fill="#22C55E" />

    {/* Chubby Frog Body */}
    <ellipse cx="80" cy="108" rx="34" ry="28" fill="url(#frog-skin)" />
    {/* Yellow Belly */}
    <ellipse cx="80" cy="112" rx="22" ry="18" fill="#FEF08A" />

    {/* Front Webbed Feet */}
    <ellipse cx="64" cy="130" rx="9" ry="6" fill="#22C55E" />
    <ellipse cx="96" cy="130" rx="9" ry="6" fill="#22C55E" />

    {/* Giant Bulging Eyes on Top */}
    <circle cx="56" cy="50" r="18" fill="url(#frog-skin)" />
    <circle cx="56" cy="50" r="13" fill="#FFFFFF" />
    <circle cx="58" cy="50" r="8" fill="#1E293B" />
    <circle cx="61" cy="47" r="3" fill="#FFFFFF" />

    <circle cx="104" cy="50" r="18" fill="url(#frog-skin)" />
    <circle cx="104" cy="50" r="13" fill="#FFFFFF" />
    <circle cx="102" cy="50" r="8" fill="#1E293B" />
    <circle cx="105" cy="47" r="3" fill="#FFFFFF" />

    {/* Head shape */}
    <ellipse cx="80" cy="68" rx="38" ry="26" fill="url(#frog-skin)" />

    {/* Giant Happy Smile */}
    <path d="M52 68C60 84 100 84 108 68" stroke="#14532D" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 72C70 86 90 86 100 72" fill="#F43F5E" />

    {/* Rosy Pink Cheeks */}
    <circle cx="50" cy="72" r="6.5" fill="#FB7185" opacity="0.65" />
    <circle cx="110" cy="72" r="6.5" fill="#FB7185" opacity="0.65" />
  </svg>
);

// 20. CHÚ SÓC NÂU (Squirrel) - Nâu cam, ôm quả sồi nâu, đuôi xù cong khổng lồ
export const CuteSquirrelArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sq-fur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="60%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
    </defs>
    {/* Giant Curled Bushy Tail */}
    <path
      d="M92 120C116 130 148 116 142 82C138 52 110 50 114 28C116 20 128 22 126 34C122 52 148 64 150 90C152 126 116 142 88 126"
      fill="url(#sq-fur)"
    />

    {/* Body */}
    <ellipse cx="74" cy="116" rx="26" ry="22" fill="url(#sq-fur)" />
    <ellipse cx="70" cy="118" rx="14" ry="14" fill="#FEF3C7" />

    {/* Feet */}
    <ellipse cx="56" cy="134" rx="10" ry="7" fill="#C2410C" />
    <ellipse cx="88" cy="134" rx="10" ry="7" fill="#C2410C" />

    {/* Acorn in Paws */}
    <ellipse cx="68" cy="108" rx="8" ry="10" fill="#B45309" />
    <path d="M60 102C60 98 76 98 76 102Z" fill="#78350F" />
    <line x1="68" y1="98" x2="68" y2="94" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Paws holding acorn */}
    <circle cx="60" cy="108" r="4.5" fill="#FDBA74" />
    <circle cx="76" cy="108" r="4.5" fill="#FDBA74" />

    {/* Pointed Fluffy Ears */}
    <polygon points="56,44 48,22 68,36" fill="url(#sq-fur)" />
    <polygon points="54,40 50,26 64,36" fill="#FEF3C7" />
    <polygon points="90,44 98,22 78,36" fill="url(#sq-fur)" />
    <polygon points="88,40 94,26 80,36" fill="#FEF3C7" />

    {/* Head */}
    <circle cx="74" cy="62" r="30" fill="url(#sq-fur)" />

    {/* Snout */}
    <ellipse cx="74" cy="72" rx="14" ry="10" fill="#FEF3C7" />
    <ellipse cx="74" cy="68" rx="3.5" ry="2.5" fill="#1E293B" />
    <path d="M70 74C72 77 76 77 78 74" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="62" cy="56" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="64" cy="54" r="2.5" fill="#FFFFFF" />
    <ellipse cx="86" cy="56" rx="5.5" ry="7" fill="#1E293B" />
    <circle cx="88" cy="54" r="2.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <circle cx="52" cy="66" r="5" fill="#FB7185" opacity="0.6" />
    <circle cx="96" cy="66" r="5" fill="#FB7185" opacity="0.6" />
  </svg>
);

// ==========================================
// CÁC ĐỘNG VẬT BỔ SUNG ĐÁNG YÊU KHÁC
// ==========================================

export const CutePigArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="pig-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBCFE8" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    </defs>
    <path d="M116 108C130 108 138 98 132 88C128 82 120 86 124 92" stroke="#DB2777" strokeWidth="6" strokeLinecap="round" fill="none" />
    <ellipse cx="80" cy="110" rx="34" ry="26" fill="url(#pig-body)" />
    <ellipse cx="56" cy="132" rx="10" ry="7" fill="#F472B6" />
    <ellipse cx="104" cy="132" rx="10" ry="7" fill="#F472B6" />
    <path d="M50 46L42 24L66 38Z" fill="#F472B6" />
    <path d="M52 42L48 28L62 38Z" fill="#BE185D" />
    <path d="M110 46L118 24L94 38Z" fill="#F472B6" />
    <path d="M108 42L112 28L98 38Z" fill="#BE185D" />
    <circle cx="80" cy="58" r="32" fill="url(#pig-body)" />
    <ellipse cx="64" cy="52" rx="5" ry="7" fill="#1E293B" />
    <circle cx="66" cy="50" r="2.5" fill="#FFFFFF" />
    <ellipse cx="96" cy="52" rx="5" ry="7" fill="#1E293B" />
    <circle cx="98" cy="50" r="2.5" fill="#FFFFFF" />
    <ellipse cx="80" cy="66" rx="16" ry="11" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
    <ellipse cx="74" cy="66" rx="3" ry="4" fill="#831843" />
    <ellipse cx="86" cy="66" rx="3" ry="4" fill="#831843" />
    <path d="M72 78C76 82 84 82 88 78" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="52" cy="66" r="6" fill="#FB7185" opacity="0.6" />
    <circle cx="108" cy="66" r="6" fill="#FB7185" opacity="0.6" />
  </svg>
);

export const CuteChickenArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="80" cy="136" rx="46" ry="12" fill="#86EFAC" />
    <ellipse cx="84" cy="98" rx="32" ry="28" fill="#FDE047" />
    <path d="M72 88C90 84 104 94 98 112C92 120 74 116 70 102Z" fill="#F59E0B" />
    <path d="M72 38C68 26 76 24 80 32C84 22 92 24 92 34C96 26 102 30 98 40" fill="#EF4444" />
    <circle cx="84" cy="54" r="24" fill="#FDE047" />
    <circle cx="76" cy="50" r="5" fill="#1E293B" />
    <circle cx="77" cy="48" r="2" fill="#FFFFFF" />
    <circle cx="94" cy="50" r="5" fill="#1E293B" />
    <circle cx="95" cy="48" r="2" fill="#FFFFFF" />
    <polygon points="85,56 78,64 92,64" fill="#F97316" />
    <circle cx="68" cy="58" r="4" fill="#FB7185" opacity="0.6" />
    <circle cx="102" cy="58" r="4" fill="#FB7185" opacity="0.6" />
  </svg>
);

export const CuteFishArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="50" r="6" fill="#38BDF8" opacity="0.7" />
    <circle cx="22" cy="38" r="4" fill="#38BDF8" opacity="0.8" />
    <path d="M112 80L142 54V106L112 80Z" fill="#EA580C" />
    <ellipse cx="78" cy="80" rx="42" ry="32" fill="#FB923C" />
    <path d="M62 49C68 62 68 98 62 111" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <path d="M96 52C100 64 100 96 96 108" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <circle cx="50" cy="72" r="8" fill="#FFFFFF" />
    <circle cx="48" cy="72" r="5" fill="#1E293B" />
    <circle cx="50" cy="69" r="2" fill="#FFFFFF" />
    <path d="M38 86C44 92 52 88 54 86" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CuteTurtleArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="46" cy="74" r="10" fill="#4ADE80" />
    <circle cx="114" cy="74" r="10" fill="#4ADE80" />
    <circle cx="50" cy="116" r="10" fill="#4ADE80" />
    <circle cx="110" cy="116" r="10" fill="#4ADE80" />
    <ellipse cx="80" cy="94" rx="36" ry="32" fill="#15803D" stroke="#166534" strokeWidth="3" />
    <polygon points="80,74 94,84 94,104 80,114 66,104 66,84" fill="#22C55E" />
    <circle cx="80" cy="46" r="18" fill="#4ADE80" />
    <circle cx="73" cy="42" r="3.5" fill="#1E293B" />
    <circle cx="74" cy="41" r="1" fill="#FFFFFF" />
    <circle cx="87" cy="42" r="3.5" fill="#1E293B" />
    <circle cx="88" cy="41" r="1" fill="#FFFFFF" />
    <path d="M74 52C77 55 83 55 86 52" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CuteBeeArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="62" cy="48" rx="14" ry="24" fill="#BAE6FD" opacity="0.8" stroke="#38BDF8" transform="rotate(-25 62 48)" />
    <ellipse cx="98" cy="48" rx="14" ry="24" fill="#BAE6FD" opacity="0.8" stroke="#38BDF8" transform="rotate(25 98 48)" />
    <ellipse cx="80" cy="92" rx="32" ry="36" fill="#FACC15" />
    <path d="M50 82C68 88 92 88 110 82" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
    <path d="M54 104C70 110 90 110 106 104" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
    <circle cx="68" cy="64" r="5" fill="#1E293B" />
    <circle cx="70" cy="62" r="2" fill="#FFFFFF" />
    <circle cx="92" cy="64" r="5" fill="#1E293B" />
    <circle cx="94" cy="62" r="2" fill="#FFFFFF" />
    <path d="M74 72C77 76 83 76 86 72" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CuteButterflyArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="46" cy="56" rx="26" ry="28" fill="#F472B6" />
    <circle cx="44" cy="54" r="10" fill="#FEF08A" />
    <ellipse cx="52" cy="106" rx="20" ry="22" fill="#C084FC" />
    <ellipse cx="114" cy="56" rx="26" ry="28" fill="#F472B6" />
    <circle cx="116" cy="54" r="10" fill="#FEF08A" />
    <ellipse cx="108" cy="106" rx="20" ry="22" fill="#C084FC" />
    <rect x="74" y="44" width="12" height="66" rx="6" fill="#818CF8" />
  </svg>
);

export const CuteDolphinArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 128C40 120 60 136 80 128C100 120 120 136 140 128" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
    <path d="M34 94C42 54 84 40 118 64C136 78 138 98 140 104L132 98L138 114C120 106 100 90 74 94C54 98 42 102 34 94Z" fill="#38BDF8" />
    <circle cx="50" cy="74" r="3.5" fill="#1E293B" />
  </svg>
);

export const CuteWhaleArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M70 42C70 24 54 26 50 32" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M70 42C70 20 86 22 90 28" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M26 88C26 58 74 50 114 68C136 78 144 68 146 64V86C142 82 130 92 110 98C82 106 34 116 26 88Z" fill="#0284C7" />
    <circle cx="48" cy="76" r="4" fill="#1E293B" />
  </svg>
);
