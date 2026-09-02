import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Home,
  Sparkles,
  Music,
  Hand,
  Settings,
  HelpCircle,
  X,
  Check,
  RotateCw,
} from 'lucide-react';
import { BabyProfile, PeekabooAnimal } from '../types';
import { PEEKABOO_ANIMALS } from '../data/gameData';
import { soundManager } from '../utils/audio';

interface FarmPeekabooGameProps {
  profile: BabyProfile;
  onBackToLobby: () => void;
}

interface FloatingEffect {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  type: 'heart' | 'star' | 'music' | 'text' | 'confetti';
}

// Themes matching animal habitats
type BarnHabitat = 'farm' | 'jungle' | 'arctic';

export const FarmPeekabooGame: React.FC<FarmPeekabooGameProps> = ({
  profile,
  onBackToLobby,
}) => {
  // Mystery dynamic index: starts random or selected
  const [animalIndex, setAnimalIndex] = useState<number>(() =>
    Math.floor(Math.random() * PEEKABOO_ANIMALS.length)
  );
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);
  const [isDoorShaking, setIsDoorShaking] = useState<boolean>(false);
  const [isPeekingOut, setIsPeekingOut] = useState<boolean>(false);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [isAnimalDancing, setIsAnimalDancing] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);
  const [parentCode, setParentCode] = useState<{ a: number; b: number; ans: number }>({ a: 1, b: 2, ans: 3 });
  const [userParentInput, setUserParentInput] = useState<string>('');

  const [peekabooCount, setPeekabooCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nhatminh_peekaboo_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [isSoundOn, setIsSoundOn] = useState<boolean>(soundManager.isSoundEnabled());
  const [floatingEffects, setFloatingEffects] = useState<FloatingEffect[]>([]);
  const [sunWiggle, setSunWiggle] = useState<boolean>(false);
  const [cluesGiven, setCluesGiven] = useState<number>(0);

  const currentAnimal: PeekabooAnimal = PEEKABOO_ANIMALS[animalIndex] || PEEKABOO_ANIMALS[0];
  const interactionLockRef = useRef<boolean>(false);
  const teaserIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine Habitat Theme
  const getHabitat = (): BarnHabitat => {
    if (['penguin', 'bear'].includes(currentAnimal.id)) return 'arctic';
    if (['elephant', 'lion', 'tiger', 'monkey', 'panda', 'zebra', 'giraffe'].includes(currentAnimal.id)) return 'jungle';
    return 'farm';
  };
  const currentHabitat = getHabitat();

  // Helper: Pick a random different animal for next peekaboo
  const pickNextRandomAnimal = useCallback(() => {
    setAnimalIndex((prev) => {
      let next = Math.floor(Math.random() * PEEKABOO_ANIMALS.length);
      if (next === prev && PEEKABOO_ANIMALS.length > 1) {
        next = (next + 1) % PEEKABOO_ANIMALS.length;
      }
      return next;
    });
    setCluesGiven(0);
  }, []);

  // Preload sound and animal images
  useEffect(() => {
    soundManager.preloadSounds();
    PEEKABOO_ANIMALS.forEach((animal) => {
      if (animal.imageSrc) {
        const img = new Image();
        img.src = animal.imageSrc;
      }
    });

    const timer = setTimeout(() => {
      soundManager.speakVietnamese(`Bé ${profile.name || 'Nhật Minh'} ơi! Cùng đoán xem ai đang trốn trong chuồng nào!`);
    }, 600);

    return () => clearTimeout(timer);
  }, [profile.name]);

  // Periodic mystery sound teaser when door is closed (every 9s)
  useEffect(() => {
    if (isDoorOpen) return;

    teaserIntervalRef.current = setInterval(() => {
      // Gentle door shake and small mystery sound
      setIsDoorShaking(true);
      soundManager.playBarnRattle();
      setTimeout(() => setIsDoorShaking(false), 600);
    }, 9000);

    return () => {
      if (teaserIntervalRef.current) clearInterval(teaserIntervalRef.current);
    };
  }, [isDoorOpen]);

  // Persist count
  useEffect(() => {
    try {
      localStorage.setItem('nhatminh_peekaboo_count', peekabooCount.toString());
    } catch {
      // Storage fallback
    }
  }, [peekabooCount]);

  // Spawn visual sparkle / confetti
  const spawnEffect = useCallback((x: number, y: number, text: string, type: FloatingEffect['type'] = 'star') => {
    const id = Date.now() + Math.random();
    const colors = ['#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6', '#FBBF24'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setFloatingEffects((prev) => [
      ...prev.slice(-18),
      { id, x, y, text, color, type },
    ]);

    setTimeout(() => {
      setFloatingEffects((prev) => prev.filter((e) => e.id !== id));
    }, 1400);
  }, []);

  // 1. Give mystery teaser clue (when closed door is tapped or shaken)
  const handleMysteryClue = useCallback(() => {
    if (isDoorOpen || interactionLockRef.current) return;
    setIsDoorShaking(true);
    soundManager.playKnock();
    soundManager.playBarnRattle();

    // Give audio clue of current hidden animal
    setTimeout(() => {
      soundManager.playSpecialSound(currentAnimal.soundType, currentAnimal.id);
    }, 280);

    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2 - 40;
    spawnEffect(targetX, targetY, `❓ ${currentAnimal.soundOnomatopoeia}`, 'music');

    setCluesGiven((c) => c + 1);

    setTimeout(() => {
      setIsDoorShaking(false);
    }, 600);
  }, [isDoorOpen, currentAnimal, spawnEffect]);

  // 2. Open Door with big "Ú ÒA!" Pop-out Jump
  const handleOpenDoor = useCallback((clientX?: number, clientY?: number) => {
    if (isDoorOpen || interactionLockRef.current) return;
    interactionLockRef.current = true;

    // 1. Play realistic wood creak
    soundManager.playDoorCreak();

    // 2. Set states
    setIsDoorOpen(true);
    setIsPeekingOut(true);
    setIsCelebrating(true);
    setPeekabooCount((prev) => prev + 1);

    const targetX = clientX || window.innerWidth / 2;
    const targetY = clientY || window.innerHeight / 2;

    // Burst of celebratory effects
    spawnEffect(targetX, targetY - 40, 'Ú ÒA! 🎉', 'text');
    spawnEffect(targetX - 70, targetY - 60, '⭐', 'star');
    spawnEffect(targetX + 70, targetY - 60, '💖', 'heart');
    spawnEffect(targetX - 40, targetY - 100, '✨', 'star');
    spawnEffect(targetX + 40, targetY - 100, '🎉', 'confetti');

    // 3. Sound: peekaboo chime + Voice announcement
    setTimeout(() => {
      soundManager.playPeekabooCheer();
      soundManager.speakVietnamese(`Ú òa! ${currentAnimal.speechPhrase}`);
    }, 280);

    // 4. Animal makes its sound
    setTimeout(() => {
      soundManager.playSpecialSound(currentAnimal.soundType, currentAnimal.id);
    }, 1100);

    // Release interaction lock
    setTimeout(() => {
      setIsPeekingOut(false);
      setIsCelebrating(false);
      interactionLockRef.current = false;
    }, 1400);
  }, [isDoorOpen, currentAnimal, spawnEffect]);

  // 3. Close Door & hide next mystery animal inside
  const handleCloseDoor = useCallback((forcedAnimalIndex?: number) => {
    if (!isDoorOpen || interactionLockRef.current) return;
    interactionLockRef.current = true;

    soundManager.playDoorClose();
    soundManager.speakVietnamese(`Tạm biệt ${currentAnimal.nameVi}!`);
    setIsDoorOpen(false);
    setIsAnimalDancing(false);

    setTimeout(() => {
      if (typeof forcedAnimalIndex === 'number') {
        setAnimalIndex(forcedAnimalIndex);
      } else {
        pickNextRandomAnimal();
      }
      interactionLockRef.current = false;
    }, 550);
  }, [isDoorOpen, currentAnimal, pickNextRandomAnimal]);

  // 4. Tap Animal when door is already open: Dance, sound & wiggle
  const handleTapAnimal = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (!isDoorOpen || interactionLockRef.current) return;

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;

    if (e) {
      if ('clientX' in e) {
        posX = e.clientX;
        posY = e.clientY;
      } else if ('touches' in e && e.touches[0]) {
        posX = e.touches[0].clientX;
        posY = e.touches[0].clientY;
      }
    }

    setIsAnimalDancing(true);

    // Play animal sound + cheerful chime
    soundManager.playSpecialSound(currentAnimal.soundType, currentAnimal.id);
    soundManager.playSparkle();
    soundManager.speakVietnamese(`${currentAnimal.nameVi} kêu: ${currentAnimal.soundOnomatopoeia}`);

    spawnEffect(posX, posY - 80, currentAnimal.soundOnomatopoeia, 'music');
    spawnEffect(posX - 45, posY - 40, '🎵', 'music');
    spawnEffect(posX + 45, posY - 40, '✨', 'star');

    setTimeout(() => {
      setIsAnimalDancing(false);
    }, 900);
  }, [isDoorOpen, currentAnimal, spawnEffect]);

  // Full screen tap handler (Anywhere on screen triggers action)
  const handleFullScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('#parent-modal') || target.closest('#parent-gate-btn')) {
      return;
    }

    if (!isDoorOpen) {
      // First tap gives mysterious rattle/clue if clues < 1, second tap opens, or open immediately
      if (cluesGiven === 0) {
        handleMysteryClue();
      } else {
        handleOpenDoor(e.clientX, e.clientY);
      }
    } else {
      handleTapAnimal(e);
    }
  };

  // Sound toggle
  const toggleSound = () => {
    const next = !isSoundOn;
    soundManager.setSoundEnabled(next);
    setIsSoundOn(next);
  };

  // Open Parental Gate for direct animal choosing
  const openParentGate = () => {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    setParentCode({ a, b, ans: a + b });
    setUserParentInput('');
    setShowParentModal(true);
  };

  // Habitat-based style helpers
  const getHabitatStyles = () => {
    switch (currentHabitat) {
      case 'arctic':
        return {
          sky: 'from-cyan-400 via-sky-200 to-blue-200',
          hills: 'from-blue-600 via-sky-500 to-cyan-300',
          barnBg: 'bg-slate-700 border-cyan-900',
          barnRoof: 'border-b-cyan-600',
          doorPlanks: 'from-cyan-900 via-slate-800 to-cyan-950 border-cyan-950',
          title: '❄️ NÔNG TRẠI BĂNG TUYẾT',
        };
      case 'jungle':
        return {
          sky: 'from-emerald-400 via-teal-200 to-lime-200',
          hills: 'from-emerald-800 via-green-600 to-lime-400',
          barnBg: 'bg-emerald-800 border-amber-950',
          barnRoof: 'border-b-amber-700',
          doorPlanks: 'from-amber-900 via-stone-800 to-amber-950 border-stone-950',
          title: '🌴 KHÁM PHÁ RỪNG XANH',
        };
      case 'farm':
      default:
        return {
          sky: 'from-sky-400 via-amber-100 to-emerald-200',
          hills: 'from-emerald-700 via-emerald-500 to-lime-400',
          barnBg: 'bg-rose-600 border-amber-950',
          barnRoof: 'border-b-rose-700',
          doorPlanks: 'from-amber-800 via-amber-700 to-amber-900 border-amber-950',
          title: '🏡 NÔNG TRẠI BÉ NGOAN',
        };
    }
  };
  const habitatStyles = getHabitatStyles();

  return (
    <div
      id="farm-peekaboo-game"
      onClick={handleFullScreenTap}
      className={`relative w-screen h-screen overflow-hidden bg-linear-to-b ${habitatStyles.sky} select-none touch-none flex flex-col justify-between p-3 md:p-6 transition-colors duration-700`}
    >
      {/* 1. SCENIC BACKGROUND (Sun, Clouds, Hills, Trees) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSunWiggle(true);
          soundManager.playSparkle();
          soundManager.speakVietnamese('Ông mặt trời cười chào bé Nhật Minh!');
          spawnEffect(80, 80, '☀️ Hí hí!', 'text');
          setTimeout(() => setSunWiggle(false), 800);
        }}
        className={`absolute top-4 left-4 md:top-8 md:left-8 cursor-pointer z-10 transition-transform ${
          sunWiggle ? 'scale-125 rotate-12' : 'hover:scale-110 animate-pulse'
        }`}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 shadow-xl border-4 border-white flex items-center justify-center text-3xl md:text-4xl">
          😊
        </div>
      </div>

      {/* Fluffy Ambient Clouds */}
      <div className="absolute top-8 left-1/3 w-36 h-14 bg-white/80 rounded-full blur-xs pointer-events-none animate-pulse" />
      <div className="absolute top-16 right-16 w-48 h-16 bg-white/85 rounded-full blur-xs pointer-events-none" />

      {/* Rolling Hills Landscape */}
      <div className={`absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t ${habitatStyles.hills} rounded-t-[120px] pointer-events-none opacity-90 shadow-inner transition-colors duration-700`} />
      <div className="absolute bottom-0 -left-12 -right-12 h-32 bg-linear-to-t from-emerald-800 to-emerald-600 rounded-t-[160px] pointer-events-none opacity-75" />

      {/* Cute White Picket Fence */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-around pointer-events-none opacity-60 px-4">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="w-4 h-16 bg-white rounded-t-full shadow-xs border-r border-slate-300" />
        ))}
      </div>

      {/* 2. TOP HEADER: Baby Badge, Back Button, Sound Toggle, Parent Settings */}
      <header className="w-full flex items-center justify-between z-20 pointer-events-auto">
        {/* Left: Home Button & Baby Info */}
        <div className="flex items-center gap-2">
          <button
            id="peekaboo-home-btn"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playPop();
              onBackToLobby();
            }}
            title="Về danh sách trò chơi"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-md shadow-xl border-3 border-amber-300 flex items-center justify-center text-amber-700 active:scale-90 transition-transform"
          >
            <Home className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-white/95 backdrop-blur-md shadow-xl border-3 border-amber-300">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-400 flex items-center justify-center text-xl shadow-inner">
              {profile.avatarEmoji || '👶'}
            </div>
            <div>
              <span className="text-xs md:text-sm font-black text-slate-800 leading-tight block">
                {profile.name || 'Bé Nhật Minh'}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-amber-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Ú òa: <b className="text-amber-900">{peekabooCount} lần</b>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sound & Parent Gate */}
        <div className="flex items-center gap-2">
          <button
            id="peekaboo-sound-toggle"
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            aria-label="Bật tắt âm thanh"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-md border-3 border-amber-200 shadow-xl flex items-center justify-center active:scale-90 transition-transform"
          >
            {isSoundOn ? (
              <Volume2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-rose-500" />
            )}
          </button>

          {/* Parental Gate Button */}
          <button
            id="parent-gate-btn"
            onClick={(e) => {
              e.stopPropagation();
              openParentGate();
            }}
            title="Dành cho Ba Mẹ: Chọn con vật cụ thể"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-md border-3 border-amber-200 shadow-xl flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 3. CENTER: THE MYSTERY BARN & 3D DOORS */}
      <main className="relative my-auto w-full max-w-2xl mx-auto flex flex-col items-center justify-center z-10">
        
        {/* Barn Structure */}
        <div
          className={`relative w-[320px] sm:w-[420px] md:w-[480px] h-[340px] sm:h-[420px] md:h-[460px] flex flex-col items-center justify-end transition-transform duration-300 ${
            isDoorShaking ? 'animate-bounce scale-105 rotate-1' : ''
          }`}
        >
          {/* Barn Roof & Weather Vane */}
          <div className="absolute -top-14 md:-top-16 z-20 flex flex-col items-center pointer-events-none">
            <div className="text-3xl md:text-4xl animate-bounce">
              {currentHabitat === 'arctic' ? '🐧' : currentHabitat === 'jungle' ? '🦜' : '🐓'}
            </div>
            <div
              className={`w-0 h-0 border-l-[170px] sm:border-l-[225px] md:border-l-[255px] border-l-transparent border-r-[170px] sm:border-r-[225px] md:border-r-[255px] border-r-transparent border-b-[65px] md:border-b-[75px] ${habitatStyles.barnRoof} filter drop-shadow-xl transition-colors duration-500`}
            />
          </div>

          {/* Barn Building Body */}
          <div
            className={`relative w-full h-[280px] sm:h-[350px] md:h-[380px] ${habitatStyles.barnBg} rounded-2xl border-4 md:border-6 shadow-2xl flex flex-col items-center justify-end p-3 overflow-hidden transition-colors duration-500`}
          >
            {/* Header Title Sign */}
            <div className="absolute top-2 left-4 right-4 h-7 bg-black/25 rounded-md border-b-2 border-white/30 flex items-center justify-between px-3">
              <span className="text-white text-xs font-black tracking-wider uppercase drop-shadow-xs">
                {habitatStyles.title}
              </span>
              <span className="text-amber-200 text-xs font-extrabold flex items-center gap-1">
                {isDoorOpen ? '✨ ĐÃ MỞ Ú ÒA ✨' : '🔒 ĐOÁN XEM AI ĐÂY?'}
              </span>
            </div>

            {/* INSIDE THE BARN (Revealed when doors open) */}
            <div className="relative w-[280px] sm:w-[370px] md:w-[420px] h-[225px] sm:h-[290px] md:h-[315px] bg-linear-to-b from-amber-950 via-amber-900 to-amber-800 rounded-t-full border-4 border-amber-950 shadow-inner flex flex-col items-center justify-end overflow-hidden">
              
              {/* Warm cozy background lighting */}
              <div className="absolute inset-0 bg-radial from-amber-400/25 to-transparent pointer-events-none" />
              
              {/* Straw on Floor */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-yellow-500 via-amber-400 to-transparent opacity-80 pointer-events-none flex justify-around items-end px-2">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg font-bold">🌾</span>
                ))}
              </div>

              {/* THE PEEKABOO ANIMAL (With High-Quality PNG + Pop-out Jump Animation) */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleTapAnimal(e);
                }}
                className="relative z-10 flex flex-col items-center justify-center cursor-pointer mb-2"
              >
                {/* Animal Name Tag Badge */}
                {isDoorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-base font-black shadow-lg border-2 border-white mb-2 transition-all ${
                      currentAnimal.colorTheme.badgeBg
                    } ${isAnimalDancing ? 'scale-115 -translate-y-2 ring-4 ring-amber-300' : ''}`}
                  >
                    <span>{currentAnimal.emoji} </span>
                    <span>{currentAnimal.nameVi}</span>
                    <span className="text-[11px] opacity-75 ml-1.5">({currentAnimal.nameEn})</span>
                  </motion.div>
                )}

                {/* Pop-out 3D Animal Image */}
                <div className="relative flex items-center justify-center">
                  <motion.img
                    id={`peekaboo-animal-img-${currentAnimal.id}`}
                    src={currentAnimal.imageSrc}
                    alt={currentAnimal.nameVi}
                    referrerPolicy="no-referrer"
                    initial={{ scale: 0.2, y: 80, opacity: 0 }}
                    animate={{
                      scale: isPeekingOut ? [0.4, 1.4, 1.15] : isAnimalDancing ? [1.15, 1.35, 1.05, 1.25, 1.15] : 1.15,
                      y: isPeekingOut ? [80, -35, 0] : isAnimalDancing ? [0, -30, 6, -15, 0] : 0,
                      rotate: isPeekingOut ? [-10, 10, 0] : isAnimalDancing ? [-8, 8, -6, 6, 0] : 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: isPeekingOut ? 0.7 : isAnimalDancing ? 0.8 : 0.4,
                      ease: 'easeOut',
                    }}
                    className="w-auto h-44 sm:h-56 md:h-64 max-w-[250px] sm:max-w-[320px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] select-none cursor-pointer"
                  />
                </div>

                {/* Onomatopoeia Sound Bubble */}
                {isDoorOpen && (
                  <motion.div
                    key={currentAnimal.soundOnomatopoeia}
                    initial={{ opacity: 0, scale: 0.6, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white/95 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 text-xs sm:text-sm font-black text-amber-900 mt-1 flex items-center gap-1.5"
                  >
                    <Music className="w-4 h-4 text-amber-600 animate-bounce" />
                    <span>{currentAnimal.soundOnomatopoeia}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 3D DOUBLE BARN DOORS (Left & Right) */}
            <div className="absolute bottom-3 w-[280px] sm:w-[370px] md:w-[420px] h-[225px] sm:h-[290px] md:h-[315px] flex items-center justify-between pointer-events-none [perspective:1200px]">
              
              {/* LEFT BARN DOOR */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDoorOpen) handleOpenDoor(e.clientX, e.clientY);
                  else handleCloseDoor();
                }}
                className={`w-1/2 h-full bg-linear-to-r ${habitatStyles.doorPlanks} border-3 shadow-2xl rounded-tl-full flex flex-col items-end justify-between p-3 origin-left transition-transform duration-700 ease-out pointer-events-auto cursor-pointer ${
                  isDoorOpen
                    ? '-rotate-y-110 opacity-30 shadow-none'
                    : 'rotate-y-0 opacity-100'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Wood Plank Lines */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#78350f_0px,#78350f_2px,transparent_2px,transparent_30px)] opacity-30 pointer-events-none" />
                {/* Barn Door Cross Brace */}
                <div className="absolute inset-4 border-2 border-amber-950/60 pointer-events-none flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-amber-950/30">✕</span>
                </div>

                {/* Left Door Brass Ring Handle */}
                <div className="relative my-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-linear-to-tr from-amber-400 to-yellow-200 border-3 border-amber-900 shadow-xl flex items-center justify-center text-sm text-amber-950 font-black">
                  ⭕
                </div>
              </div>

              {/* RIGHT BARN DOOR */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDoorOpen) handleOpenDoor(e.clientX, e.clientY);
                  else handleCloseDoor();
                }}
                className={`w-1/2 h-full bg-linear-to-l ${habitatStyles.doorPlanks} border-3 shadow-2xl rounded-tr-full flex flex-col items-start justify-between p-3 origin-right transition-transform duration-700 ease-out pointer-events-auto cursor-pointer ${
                  isDoorOpen
                    ? 'rotate-y-110 opacity-30 shadow-none'
                    : 'rotate-y-0 opacity-100'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Wood Plank Lines */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#78350f_0px,#78350f_2px,transparent_2px,transparent_30px)] opacity-30 pointer-events-none" />
                {/* Barn Door Cross Brace */}
                <div className="absolute inset-4 border-2 border-amber-950/60 pointer-events-none flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-amber-950/30">✕</span>
                </div>

                {/* Right Door Brass Ring Handle */}
                <div className="relative my-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-linear-to-tr from-amber-400 to-yellow-200 border-3 border-amber-900 shadow-xl flex items-center justify-center text-sm text-amber-950 font-black">
                  ⭕
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BIG INTERACTIVE ACTION CONTROLS */}
        <div className="w-full flex items-center justify-center gap-3 mt-4 z-20 pointer-events-auto px-2">
          {!isDoorOpen ? (
            /* CLOSED: Knock/Mystery Clue & Big Open Button */
            <div className="flex items-center gap-3 w-full max-w-md">
              <button
                id="peekaboo-knock-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMysteryClue();
                }}
                className="flex-1 py-3.5 px-4 rounded-3xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-black text-base sm:text-lg shadow-2xl border-3 border-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Hand className="w-6 h-6 animate-pulse" />
                <span>GÕ CỬA CỐC CỐC</span>
              </button>

              <button
                id="peekaboo-open-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDoor();
                }}
                className="flex-1 py-3.5 px-4 rounded-3xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg shadow-2xl border-3 border-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>MỞ CỬA Ú ÒA</span>
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          ) : (
            /* OPENED: Tap Animal Sound & Next Mystery Animal Button */
            <div className="flex items-center gap-3 w-full max-w-md">
              <button
                id="peekaboo-sing-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTapAnimal(e);
                }}
                className="flex-1 py-3.5 px-4 rounded-3xl bg-amber-400 text-amber-950 font-black text-base sm:text-lg shadow-xl border-3 border-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Music className="w-5 h-5 text-amber-800 animate-bounce" />
                <span>KÊU TIẾP NÈ 🎵</span>
              </button>

              <button
                id="peekaboo-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseDoor();
                }}
                className="flex-1 py-3.5 px-4 rounded-3xl bg-linear-to-r from-emerald-500 to-teal-600 text-white font-black text-base sm:text-lg shadow-2xl border-3 border-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>Ú ÒA TIẾP</span>
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 5. PARENTAL GATE MODAL (For choosing specific animal) */}
      <AnimatePresence>
        {showParentModal && (
          <div
            id="parent-modal"
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-5 md:p-6 max-w-lg w-full shadow-2xl border-4 border-amber-300 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                    👨‍👩‍👧
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">Khu Vực Ba Mẹ</h3>
                    <p className="text-xs text-slate-500">Chọn con vật cụ thể để dạy từ vựng cho bé</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowParentModal(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Math Gate Check */}
              {userParentInput !== parentCode.ans.toString() ? (
                <div className="py-6 flex flex-col items-center text-center gap-3">
                  <p className="text-sm font-bold text-slate-700">
                    Xác nhận nhanh: <span className="text-amber-600 font-black text-lg">{parentCode.a} + {parentCode.b} = ?</span>
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => setUserParentInput(num.toString())}
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-amber-950 font-black text-base shadow-xs"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Animal Selector Grid */
                <div className="py-4 overflow-y-auto max-h-[60vh]">
                  <p className="text-xs font-bold text-slate-600 mb-2">Chạm vào bạn thú để đặt vào chuồng tiếp theo:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {PEEKABOO_ANIMALS.map((animal, idx) => (
                      <button
                        key={animal.id}
                        onClick={() => {
                          setShowParentModal(false);
                          if (isDoorOpen) {
                            handleCloseDoor(idx);
                          } else {
                            setAnimalIndex(idx);
                            handleOpenDoor();
                          }
                        }}
                        className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                          idx === animalIndex
                            ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400'
                            : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                        }`}
                      >
                        <img
                          src={animal.imageSrc}
                          alt={animal.nameVi}
                          className="w-10 h-10 object-contain"
                        />
                        <span className="text-[10px] font-black text-slate-800 text-center truncate w-full">
                          {animal.nameVi}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. FLOATING ANIMATION PARTICLES (Stars, Hearts, Words) */}
      <AnimatePresence>
        {floatingEffects.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.6, y: -110 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute pointer-events-none z-50 font-black text-lg md:text-2xl drop-shadow-lg"
            style={{
              left: item.x - 40,
              top: item.y - 20,
              color: item.color,
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
