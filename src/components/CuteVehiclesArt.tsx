import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
}

// 1. XE CỨU HỎA ĐỎ ĐÈN XANH (Firetruck)
export const CuteFiretruckArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ft-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    {/* Body */}
    <rect x="24" y="58" width="104" height="54" rx="14" fill="url(#ft-grad)" />
    {/* Front Cab */}
    <path d="M96 58H122C126 58 130 62 130 66V100C130 106 126 112 120 112H96V58Z" fill="#DC2626" />
    {/* Window */}
    <rect x="102" y="66" width="22" height="22" rx="4" fill="#BAE6FD" />
    <rect x="34" y="66" width="20" height="16" rx="3" fill="#BAE6FD" />
    <rect x="60" y="66" width="20" height="16" rx="3" fill="#BAE6FD" />
    {/* White Stripe */}
    <rect x="24" y="90" width="106" height="8" fill="#FFFFFF" />

    {/* Ladder on top */}
    <rect x="36" y="44" width="60" height="10" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
    <line x1="50" y1="44" x2="50" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
    <line x1="66" y1="44" x2="66" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
    <line x1="82" y1="44" x2="82" y2="54" stroke="#94A3B8" strokeWidth="2.5" />

    {/* Siren */}
    <ellipse cx="112" cy="52" rx="7" ry="5" fill="#38BDF8" />
    <circle cx="112" cy="52" r="3" fill="#FFFFFF" />

    {/* Headlight */}
    <circle cx="128" cy="92" r="5" fill="#FDE047" />

    {/* Wheels */}
    <circle cx="48" cy="112" r="16" fill="#1E293B" />
    <circle cx="48" cy="112" r="6" fill="#E2E8F0" />
    <circle cx="106" cy="112" r="16" fill="#1E293B" />
    <circle cx="106" cy="112" r="6" fill="#E2E8F0" />
  </svg>
);

// 2. XE CẤP CỨU CHỮ THẬP ĐỎ (Ambulance - Khắc phục sai hình xe cứu hỏa!)
export const CuteAmbulanceArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="amb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
    </defs>
    {/* Ambulance White Body */}
    <rect x="22" y="56" width="108" height="56" rx="14" fill="url(#amb-grad)" stroke="#E2E8F0" strokeWidth="2" />
    {/* Windshield */}
    <path d="M102 64H122C125 64 128 67 128 70V88H102V64Z" fill="#BAE6FD" />
    <rect x="32" y="66" width="22" height="18" rx="3" fill="#BAE6FD" />

    {/* Bright Red Cross (Chữ Thập Đỏ đặc trưng) */}
    <rect x="66" y="68" width="18" height="30" rx="3" fill="#EF4444" />
    <rect x="60" y="74" width="30" height="18" rx="3" fill="#EF4444" />

    {/* Red/Green Medical Stripe */}
    <rect x="22" y="100" width="108" height="5" fill="#EF4444" />

    {/* Blue/Red Flashing Siren */}
    <rect x="106" y="48" width="14" height="8" rx="4" fill="#3B82F6" />
    <circle cx="113" cy="52" r="2.5" fill="#FFFFFF" />

    {/* Headlight */}
    <circle cx="127" cy="94" r="5" fill="#FDE047" />

    {/* Wheels */}
    <circle cx="46" cy="112" r="16" fill="#1E293B" />
    <circle cx="46" cy="112" r="6" fill="#E2E8F0" />
    <circle cx="106" cy="112" r="16" fill="#1E293B" />
    <circle cx="106" cy="112" r="6" fill="#E2E8F0" />
  </svg>
);

// 3. XE CẢNH SÁT XANH TRẮNG (Police Car)
export const CutePoliceCarArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Car Body */}
    <path d="M42 66C48 48 64 46 80 46C96 46 112 48 118 66H42Z" fill="#1E293B" />
    <path d="M50 64C54 52 64 50 78 50V64H50Z" fill="#BAE6FD" />
    <path d="M82 50C96 50 106 52 110 64H82V50Z" fill="#BAE6FD" />

    <rect x="20" y="66" width="120" height="42" rx="14" fill="#1E293B" />
    {/* White Door section with star */}
    <rect x="52" y="66" width="46" height="34" fill="#FFFFFF" />
    <polygon points="75,76 77,81 83,81 78,84 80,89 75,86 70,89 72,84 67,81 73,81" fill="#FACC15" />

    {/* Red/Blue Siren Light */}
    <rect x="70" y="38" width="10" height="8" rx="3" fill="#EF4444" />
    <rect x="80" y="38" width="10" height="8" rx="3" fill="#3B82F6" />

    {/* Headlights */}
    <circle cx="136" cy="80" r="5" fill="#FDE047" />

    {/* Wheels */}
    <circle cx="46" cy="108" r="16" fill="#0F172A" />
    <circle cx="46" cy="108" r="6" fill="#E2E8F0" />
    <circle cx="114" cy="108" r="16" fill="#0F172A" />
    <circle cx="114" cy="108" r="6" fill="#E2E8F0" />
  </svg>
);

// 4. XE MÁY / XE TAY GA DỄ THƯƠNG (Motorcycle / Scooter - Khắc phục sai hình ô tô đỏ!)
export const CuteMotorcycleArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="scooter-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    {/* Handlebar & Mirror */}
    <path d="M106 48L112 58" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
    <circle cx="104" cy="46" r="4" fill="#38BDF8" />
    <rect x="100" y="44" width="20" height="5" rx="2.5" fill="#1E293B" />

    {/* Front Headlight */}
    <circle cx="120" cy="62" r="7" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="120" cy="62" r="3" fill="#FFFFFF" />

    {/* Scooter Front Shield */}
    <path d="M112 56L102 96H84L96 56H112Z" fill="url(#scooter-body)" />

    {/* Comfy Seat & Rear Body */}
    <rect x="42" y="66" width="38" height="12" rx="6" fill="#1E293B" />
    <path d="M40 76C40 76 34 94 48 102H88L92 82C92 74 84 76 84 76H40Z" fill="url(#scooter-body)" />

    {/* Exhaust Pipe */}
    <rect x="30" y="98" width="28" height="7" rx="3.5" fill="#94A3B8" />

    {/* Wheels */}
    <circle cx="42" cy="110" r="18" fill="#1E293B" />
    <circle cx="42" cy="110" r="8" fill="#CBD5E1" />
    <circle cx="42" cy="110" r="4" fill="#475569" />

    <circle cx="118" cy="110" r="18" fill="#1E293B" />
    <circle cx="118" cy="110" r="8" fill="#CBD5E1" />
    <circle cx="118" cy="110" r="4" fill="#475569" />
  </svg>
);

// 5. XE ĐẠP 2 BÁNH CÓ GIỎ HOA & CHUÔNG (Bicycle - Khắc phục hình ngôi sao!)
export const CuteBicycleArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Frame (Khung xe đạp màu xanh cam tươi sáng) */}
    <line x1="44" y1="108" x2="72" y2="108" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
    <line x1="72" y1="108" x2="62" y2="70" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
    <line x1="44" y1="108" x2="62" y2="70" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
    <line x1="62" y1="70" x2="104" y2="70" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
    <line x1="72" y1="108" x2="114" y2="70" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
    <line x1="114" y1="70" x2="118" y2="108" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />

    {/* Handlebars */}
    <line x1="114" y1="70" x2="112" y2="52" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    <path d="M104 52H122" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
    {/* Bell */}
    <circle cx="106" cy="48" r="3" fill="#FACC15" />

    {/* Front Basket with Flowers */}
    <rect x="116" y="54" width="18" height="14" rx="3" fill="#D97706" />
    <circle cx="122" cy="52" r="3" fill="#FB7185" />
    <circle cx="128" cy="50" r="3" fill="#F43F5E" />

    {/* Saddle / Seat */}
    <ellipse cx="60" cy="66" rx="12" ry="5" fill="#1E293B" />

    {/* Pedals */}
    <circle cx="72" cy="108" r="7" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
    <line x1="72" y1="108" x2="66" y2="118" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    <rect x="62" y="118" width="8" height="3" fill="#1E293B" />

    {/* Big Wheels with spokes */}
    <circle cx="44" cy="108" r="22" stroke="#1E293B" strokeWidth="6" fill="none" />
    <circle cx="44" cy="108" r="5" fill="#64748B" />
    <line x1="44" y1="88" x2="44" y2="128" stroke="#94A3B8" strokeWidth="2" />
    <line x1="24" y1="108" x2="64" y2="108" stroke="#94A3B8" strokeWidth="2" />

    <circle cx="118" cy="108" r="22" stroke="#1E293B" strokeWidth="6" fill="none" />
    <circle cx="118" cy="108" r="5" fill="#64748B" />
    <line x1="118" y1="88" x2="118" y2="128" stroke="#94A3B8" strokeWidth="2" />
    <line x1="98" y1="108" x2="138" y2="108" stroke="#94A3B8" strokeWidth="2" />
  </svg>
);

// 6. XE BUÝT VÀNG MẶT CƯỜI (Bus)
export const CuteBusArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bus Body */}
    <rect x="24" y="44" width="112" height="66" rx="16" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
    {/* Windows */}
    <rect x="34" y="52" width="20" height="20" rx="4" fill="#BAE6FD" />
    <rect x="60" y="52" width="20" height="20" rx="4" fill="#BAE6FD" />
    <rect x="86" y="52" width="20" height="20" rx="4" fill="#BAE6FD" />
    <rect x="112" y="52" width="18" height="30" rx="4" fill="#BAE6FD" />

    {/* Black stripes */}
    <rect x="24" y="80" width="112" height="5" fill="#1E293B" />

    {/* Cute smiling face on front */}
    <circle cx="124" cy="90" r="2.5" fill="#1E293B" />
    <circle cx="132" cy="90" r="2.5" fill="#1E293B" />
    <path d="M126 95C128 97 130 97 132 95" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Wheels */}
    <circle cx="48" cy="110" r="16" fill="#1E293B" />
    <circle cx="48" cy="110" r="6" fill="#E2E8F0" />
    <circle cx="112" cy="110" r="16" fill="#1E293B" />
    <circle cx="112" cy="110" r="6" fill="#E2E8F0" />
  </svg>
);

// 7. XE TẢI / XE THÙNG (Truck)
export const CuteTruckArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cargo Container */}
    <rect x="20" y="48" width="76" height="60" rx="8" fill="#3B82F6" />
    <line x1="45" y1="48" x2="45" y2="108" stroke="#2563EB" strokeWidth="3" />
    <line x1="70" y1="48" x2="70" y2="108" stroke="#2563EB" strokeWidth="3" />

    {/* Driver Cabin */}
    <path d="M96 66H126C130 66 134 70 134 74V108H96V66Z" fill="#F97316" />
    <rect x="104" y="72" width="22" height="18" rx="4" fill="#BAE6FD" />
    <circle cx="130" cy="96" r="4" fill="#FDE047" />

    {/* Wheels */}
    <circle cx="40" cy="112" r="15" fill="#1E293B" />
    <circle cx="40" cy="112" r="5" fill="#E2E8F0" />
    <circle cx="74" cy="112" r="15" fill="#1E293B" />
    <circle cx="74" cy="112" r="5" fill="#E2E8F0" />
    <circle cx="116" cy="112" r="15" fill="#1E293B" />
    <circle cx="116" cy="112" r="5" fill="#E2E8F0" />
  </svg>
);

// 8. XE ĐUA SỐ 1 (Race Car)
export const CuteRaceCarArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Rear Spoiler */}
    <rect x="20" y="60" width="8" height="24" rx="3" fill="#DC2626" />
    <rect x="16" y="56" width="16" height="6" rx="3" fill="#1E293B" />

    {/* Sleek Body */}
    <path d="M26 84L60 74L96 74L136 88C142 90 144 96 140 102H26V84Z" fill="#EF4444" />
    {/* Cockpit */}
    <ellipse cx="78" cy="74" rx="14" ry="10" fill="#1E293B" />
    <circle cx="78" cy="70" r="5" fill="#FACC15" />

    {/* White Racing Circle #1 */}
    <circle cx="106" cy="88" r="9" fill="#FFFFFF" />
    <text x="106" y="92" fontSize="11" fontWeight="bold" fill="#1E293B" textAnchor="middle">1</text>

    {/* Big Racing Wheels */}
    <circle cx="46" cy="104" r="18" fill="#1E293B" />
    <circle cx="46" cy="104" r="7" fill="#FACC15" />
    <circle cx="120" cy="104" r="18" fill="#1E293B" />
    <circle cx="120" cy="104" r="7" fill="#FACC15" />
  </svg>
);

// 9. MÁY BAY CHỞ KHÁCH (Airplane)
export const CuteAirplaneArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main Fuselage */}
    <ellipse cx="80" cy="80" rx="56" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    <path d="M120 70C134 76 138 84 136 86C130 90 114 88 114 88" fill="#38BDF8" />

    {/* Wings */}
    <polygon points="68,78 44,40 64,40 92,78" fill="#3B82F6" />
    <polygon points="68,82 44,120 64,120 92,82" fill="#2563EB" />

    {/* Tail Fin */}
    <polygon points="26,76 16,48 30,48 40,76" fill="#EF4444" />

    {/* Porthole Windows */}
    <circle cx="68" cy="80" r="3" fill="#38BDF8" />
    <circle cx="80" cy="80" r="3" fill="#38BDF8" />
    <circle cx="92" cy="80" r="3" fill="#38BDF8" />
    <circle cx="104" cy="80" r="3" fill="#38BDF8" />
  </svg>
);

// 10. TRỰC THĂNG CÁNH QUẠT QUAY (Helicopter)
export const CuteHelicopterArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Top Rotor Blade */}
    <rect x="30" y="36" width="100" height="6" rx="3" fill="#64748B" />
    <rect x="76" y="42" width="8" height="12" fill="#475569" />

    {/* Body */}
    <ellipse cx="76" cy="80" rx="34" ry="26" fill="#10B981" />
    {/* Glass */}
    <path d="M78 60C96 60 108 70 108 84H78V60Z" fill="#BAE6FD" />

    {/* Tail Boom & Rear Rotor */}
    <rect x="18" y="74" width="34" height="8" rx="3" fill="#10B981" />
    <rect x="14" y="64" width="4" height="28" rx="2" fill="#64748B" />

    {/* Landing Skids */}
    <rect x="52" y="104" width="6" height="12" fill="#475569" />
    <rect x="88" y="104" width="6" height="12" fill="#475569" />
    <rect x="38" y="114" width="76" height="6" rx="3" fill="#334155" />
  </svg>
);

// 11. TÊN LỬA VŨ TRỤ BAY LÊN (Rocket)
export const CuteRocketArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fire Exhaust */}
    <polygon points="80,146 68,118 92,118" fill="#F97316" />
    <polygon points="80,138 72,118 88,118" fill="#FDE047" />

    {/* Fins */}
    <polygon points="56,92 36,116 62,114" fill="#EF4444" />
    <polygon points="104,92 124,116 98,114" fill="#EF4444" />

    {/* Rocket Fuselage */}
    <path d="M80 24C62 50 60 90 62 114H98C100 90 98 50 80 24Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    {/* Red Tip */}
    <path d="M80 24C72 38 68 50 67 60H93C92 50 88 38 80 24Z" fill="#EF4444" />

    {/* Porthole Window */}
    <circle cx="80" cy="78" r="12" fill="#38BDF8" stroke="#94A3B8" strokeWidth="3" />
    <circle cx="77" cy="75" r="3" fill="#FFFFFF" />
  </svg>
);

// 12. TÀU THỦY / DU THUYỀN (Ship)
export const CuteShipArt: React.FC<IconProps> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Smokestack */}
    <rect x="68" y="38" width="14" height="22" rx="3" fill="#EF4444" />
    <rect x="68" y="44" width="14" height="5" fill="#1E293B" />
    <circle cx="75" cy="28" r="5" fill="#E2E8F0" opacity="0.8" />
    <circle cx="84" cy="20" r="7" fill="#F8FAFC" opacity="0.9" />

    {/* White Cabin decks */}
    <rect x="44" y="58" width="62" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <circle cx="56" cy="68" r="3" fill="#38BDF8" />
    <circle cx="70" cy="68" r="3" fill="#38BDF8" />
    <circle cx="84" cy="68" r="3" fill="#38BDF8" />
    <circle cx="96" cy="68" r="3" fill="#38BDF8" />

    {/* Ship Hull */}
    <path d="M22 84L38 118H122L138 84H22Z" fill="#1E3A8A" />
    <rect x="20" y="84" width="120" height="6" fill="#EF4444" />

    {/* Blue Ocean Waves */}
    <path d="M12 118C28 114 44 126 60 118C76 114 92 126 108 118C124 114 140 126 150 118" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
  </svg>
);
