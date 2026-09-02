import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
}

// Re-export / import all specialized Chibi Art Suites
import {
  CuteLionArt,
  CuteElephantArt,
  CuteTigerArt,
  CuteMonkeyArt,
  CuteGiraffeArt,
  CuteZebraArt,
  CuteRabbitArt,
  CuteDogArt,
  CuteCatArt,
  CuteBearArt,
  CuteDeerArt,
  CuteFoxArt,
  CutePandaArt,
  CuteCowArt,
  CuteHorseArt,
  CuteSheepArt,
  CuteGoatArt,
  CutePenguinArt,
  CuteFrogArt,
  CuteSquirrelArt,
  CuteChickenArt,
  CuteFishArt,
  CutePigArt,
  CuteTurtleArt,
  CuteBeeArt,
  CuteButterflyArt,
  CuteDolphinArt,
  CuteWhaleArt,
} from './CuteAnimalsArt';

import {
  CuteFiretruckArt,
  CuteAmbulanceArt,
  CutePoliceCarArt,
  CuteMotorcycleArt,
  CuteBicycleArt,
  CuteBusArt,
  CuteTruckArt,
  CuteRaceCarArt,
  CuteAirplaneArt,
  CuteHelicopterArt,
  CuteRocketArt,
  CuteShipArt,
} from './CuteVehiclesArt';

import {
  CuteSunArt,
  CuteStarArt,
  CuteBalloonArt,
} from './CuteNatureArt';

// 1. Máy Xúc Vàng (Excavator)
export const Excavator3D: React.FC<IconProps> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ex-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="ex-glass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
    </defs>
    <rect x="25" y="44" width="40" height="34" rx="8" fill="url(#ex-body)" />
    <rect x="30" y="48" width="18" height="16" rx="4" fill="url(#ex-glass)" />
    <path d="M55 58L80 32C82 30 86 32 85 36L72 65" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80 34L100 52" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
    <path d="M96 50C104 54 106 64 100 70C94 76 86 72 88 66L96 50Z" fill="#78350F" />
    <circle cx="80" cy="34" r="4" fill="#475569" />
    <circle cx="98" cy="52" r="3.5" fill="#475569" />
    <rect x="18" y="76" width="54" height="16" rx="8" fill="#334155" />
    <circle cx="28" cy="84" r="5" fill="#94A3B8" />
    <circle cx="45" cy="84" r="5" fill="#94A3B8" />
    <circle cx="62" cy="84" r="5" fill="#94A3B8" />
  </svg>
);

// 2. Thuyền Buồm (Sailboat)
export const Sailboat3D: React.FC<IconProps> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sb-hull" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    <rect x="58" y="24" width="4" height="52" rx="2" fill="#78350F" />
    <path d="M64 26L94 68H64V26Z" fill="#F59E0B" />
    <path d="M56 34L28 68H56V34Z" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M58 22L48 26L58 30V22Z" fill="#EF4444" />
    <path d="M22 70C22 70 32 88 60 88C88 88 98 70 98 70H22Z" fill="url(#sb-hull)" />
    <path d="M12 90C22 86 32 94 42 90C52 86 62 94 72 90C82 86 92 94 102 90C112 86 118 90 118 90" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// 3. Khủng Long Xanh (Dinosaur)
export const Dino3D: React.FC<IconProps> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="dino-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M38 34L32 30L34 38" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <path d="M32 46L24 42L28 50" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <path d="M35 75C20 78 12 70 8 62C14 74 26 84 42 84" fill="url(#dino-body)" />
    <ellipse cx="56" cy="68" rx="26" ry="24" fill="url(#dino-body)" />
    <ellipse cx="64" cy="70" rx="14" ry="16" fill="#FEF08A" />
    <path d="M48 56C44 48 44 32 54 24C66 16 86 18 90 28C92 34 88 44 76 46C70 47 62 52 58 58L48 56Z" fill="url(#dino-body)" />
    <circle cx="72" cy="28" r="5" fill="#FFFFFF" />
    <circle cx="74" cy="28" r="2.5" fill="#1E293B" />
    <circle cx="75" cy="27" r="1" fill="#FFFFFF" />
    <path d="M82 36C80 40 74 41 72 40" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="66" cy="37" r="3.5" fill="#F87171" opacity="0.6" />
    <rect x="42" y="86" width="12" height="12" rx="6" fill="url(#dino-body)" />
    <rect x="62" y="86" width="12" height="12" rx="6" fill="url(#dino-body)" />
  </svg>
);

// 4. Ô Tô Con Đỏ (Red Car)
export const RedCar3D: React.FC<IconProps> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="rc-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    <path d="M36 54C40 40 50 36 64 36C78 36 84 44 88 54H36Z" fill="url(#rc-body)" />
    <path d="M42 52C45 44 52 40 62 40V52H42Z" fill="#BAE6FD" />
    <path d="M66 40C74 40 79 44 82 52H66V40Z" fill="#BAE6FD" />
    <rect x="18" y="52" width="84" height="26" rx="10" fill="url(#rc-body)" />
    <circle cx="98" cy="62" r="4.5" fill="#FDE047" />
    <circle cx="36" cy="78" r="11" fill="#1E293B" />
    <circle cx="36" cy="78" r="4.5" fill="#E2E8F0" />
    <circle cx="84" cy="78" r="11" fill="#1E293B" />
    <circle cx="84" cy="78" r="4.5" fill="#E2E8F0" />
  </svg>
);

// 5. Tàu Hỏa Tu Tu (Train)
export const Train3D: React.FC<IconProps> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="74" y="30" width="10" height="18" rx="3" fill="#EF4444" />
    <circle cx="84" cy="18" r="5" fill="#E2E8F0" opacity="0.8" />
    <circle cx="92" cy="12" r="7" fill="#F8FAFC" opacity="0.9" />
    <rect x="48" y="44" width="46" height="34" rx="8" fill="#3B82F6" />
    <path d="M94 66L104 78H94V66Z" fill="#E11D48" />
    <rect x="20" y="34" width="32" height="44" rx="6" fill="#F59E0B" />
    <rect x="25" y="40" width="14" height="14" rx="3" fill="#BAE6FD" />
    <circle cx="34" cy="80" r="12" fill="#1E293B" />
    <circle cx="34" cy="80" r="5" fill="#E2E8F0" />
    <circle cx="62" cy="82" r="10" fill="#1E293B" />
    <circle cx="62" cy="82" r="4" fill="#E2E8F0" />
    <circle cx="86" cy="82" r="10" fill="#1E293B" />
    <circle cx="86" cy="82" r="4" fill="#E2E8F0" />
  </svg>
);

export const AnimalWithPngFallback: React.FC<{
  id: string;
  size?: number;
  fallbackSvg: React.ReactNode;
}> = ({ id, size = 130, fallbackSvg }) => {
  const [hasError, setHasError] = React.useState(false);

  // Normalization for aliases
  const fileKey = id === 'puppy' ? 'dog' : id === 'kitten' ? 'cat' : id === 'bunny' ? 'rabbit' : id;
  const pngSrc = `/animals/${fileKey}.png`;

  if (hasError) {
    return <>{fallbackSvg}</>;
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center select-none"
    >
      <img
        src={pngSrc}
        alt={id}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform duration-200"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

// Helper function to render 100% ACCURATE 3D / Chibi component by item id
export const renderSurprise3D = (id: string, size = 130) => {
  switch (id) {
    // ---------------- 20 ANIMALS Y CHANG TRANH (Supports PNG + Vector Fallback) ----------------
    case 'lion':
      return <AnimalWithPngFallback id="lion" size={size} fallbackSvg={<CuteLionArt size={size} />} />;
    case 'elephant':
      return <AnimalWithPngFallback id="elephant" size={size} fallbackSvg={<CuteElephantArt size={size} />} />;
    case 'tiger':
      return <AnimalWithPngFallback id="tiger" size={size} fallbackSvg={<CuteTigerArt size={size} />} />;
    case 'monkey':
      return <AnimalWithPngFallback id="monkey" size={size} fallbackSvg={<CuteMonkeyArt size={size} />} />;
    case 'giraffe':
      return <AnimalWithPngFallback id="giraffe" size={size} fallbackSvg={<CuteGiraffeArt size={size} />} />;
    case 'zebra':
      return <AnimalWithPngFallback id="zebra" size={size} fallbackSvg={<CuteZebraArt size={size} />} />;
    case 'rabbit':
    case 'bunny':
      return <AnimalWithPngFallback id="rabbit" size={size} fallbackSvg={<CuteRabbitArt size={size} />} />;
    case 'dog':
    case 'puppy':
      return <AnimalWithPngFallback id="dog" size={size} fallbackSvg={<CuteDogArt size={size} />} />;
    case 'cat':
    case 'kitten':
      return <AnimalWithPngFallback id="cat" size={size} fallbackSvg={<CuteCatArt size={size} />} />;
    case 'bear':
      return <AnimalWithPngFallback id="bear" size={size} fallbackSvg={<CuteBearArt size={size} />} />;
    case 'deer':
      return <AnimalWithPngFallback id="deer" size={size} fallbackSvg={<CuteDeerArt size={size} />} />;
    case 'fox':
      return <AnimalWithPngFallback id="fox" size={size} fallbackSvg={<CuteFoxArt size={size} />} />;
    case 'panda':
      return <AnimalWithPngFallback id="panda" size={size} fallbackSvg={<CutePandaArt size={size} />} />;
    case 'cow':
      return <AnimalWithPngFallback id="cow" size={size} fallbackSvg={<CuteCowArt size={size} />} />;
    case 'horse':
      return <AnimalWithPngFallback id="horse" size={size} fallbackSvg={<CuteHorseArt size={size} />} />;
    case 'sheep':
      return <AnimalWithPngFallback id="sheep" size={size} fallbackSvg={<CuteSheepArt size={size} />} />;
    case 'goat':
      return <AnimalWithPngFallback id="goat" size={size} fallbackSvg={<CuteGoatArt size={size} />} />;
    case 'penguin':
      return <AnimalWithPngFallback id="penguin" size={size} fallbackSvg={<CutePenguinArt size={size} />} />;
    case 'frog':
      return <AnimalWithPngFallback id="frog" size={size} fallbackSvg={<CuteFrogArt size={size} />} />;
    case 'squirrel':
      return <AnimalWithPngFallback id="squirrel" size={size} fallbackSvg={<CuteSquirrelArt size={size} />} />;

    // ---------------- OTHER CUTE ANIMALS ----------------
    case 'duck':
    case 'chicken':
    case 'bird':
      return <CuteChickenArt size={size} />;
    case 'fish':
      return <CuteFishArt size={size} />;
    case 'pig':
      return <CutePigArt size={size} />;
    case 'turtle':
      return <CuteTurtleArt size={size} />;
    case 'bee':
      return <CuteBeeArt size={size} />;
    case 'butterfly':
      return <CuteButterflyArt size={size} />;
    case 'dolphin':
      return <CuteDolphinArt size={size} />;
    case 'whale':
      return <CuteWhaleArt size={size} />;
    case 'dino':
      return <Dino3D size={size} />;

    // ---------------- VEHICLES ----------------
    case 'firetruck':
      return <CuteFiretruckArt size={size} />;
    case 'ambulance':
      return <CuteAmbulanceArt size={size} />;
    case 'police':
      return <CutePoliceCarArt size={size} />;
    case 'motorcycle':
      return <CuteMotorcycleArt size={size} />;
    case 'bicycle':
      return <CuteBicycleArt size={size} />;
    case 'bus':
      return <CuteBusArt size={size} />;
    case 'truck':
    case 'delivery_truck':
      return <CuteTruckArt size={size} />;
    case 'race_car':
      return <CuteRaceCarArt size={size} />;
    case 'car':
      return <RedCar3D size={size} />;
    case 'excavator':
      return <Excavator3D size={size} />;
    case 'train':
    case 'bullet_train':
      return <Train3D size={size} />;
    case 'airplane':
      return <CuteAirplaneArt size={size} />;
    case 'helicopter':
      return <CuteHelicopterArt size={size} />;
    case 'rocket':
      return <CuteRocketArt size={size} />;
    case 'ship':
      return <CuteShipArt size={size} />;
    case 'boat':
      return <Sailboat3D size={size} />;

    // ---------------- NATURE & OBJECTS ----------------
    case 'sun':
      return <CuteSunArt size={size} />;
    case 'balloon':
      return <CuteBalloonArt size={size} />;
    case 'star':
    default:
      return <CuteStarArt size={size} />;
  }
};
