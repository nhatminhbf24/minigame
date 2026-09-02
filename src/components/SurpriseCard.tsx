import React, { useEffect, useState } from 'react';
import { SurpriseItem } from '../types';
import { Sparkles, Heart, Volume2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { renderSurprise3D } from './Surprise3DIcons';
import { soundManager } from '../utils/audio';

interface SurpriseCardProps {
  item: SurpriseItem | null;
  onDismiss: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  emoji: string;
}

export const SurpriseCard: React.FC<SurpriseCardProps> = ({ item, onDismiss }) => {
  const [tapCount, setTapCount] = useState(0);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    if (item) {
      setTapCount(0);
      setParticles([]);
      // Auto dismiss after 3.8s if no interaction, give baby plenty time to watch
      const timer = setTimeout(() => {
        onDismiss();
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [item, onDismiss]);

  if (!item) return null;

  const handleAnimalTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setTapCount((prev) => prev + 1);

    // Play sound immediately
    soundManager.playSpecialSound(item.soundType);
    soundManager.speakVietnamese(item.nameVi);

    // Spawn 5 fun celebration particles around animal
    const emojis = ['⭐', '✨', '💖', '🌟', '🎉', '🍀'];
    const newParticles: SparkleParticle[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160 - 30,
      scale: 0.8 + Math.random() * 0.6,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setParticles((prev) => [...prev.slice(-10), ...newParticles]);
  };

  // Determine personality idle animation for different animal types
  const getAnimalIdleAnimation = (id: string) => {
    if (['rabbit', 'bunny', 'frog', 'squirrel'].includes(id)) {
      // Springy Hop animation
      return {
        y: [0, -16, 0, -8, 0],
        scale: [1, 1.06, 0.96, 1.03, 1],
        rotate: [0, -2, 2, -1, 0],
        transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const },
      };
    }
    if (['penguin', 'duck'].includes(id)) {
      // Cute Waddle animation
      return {
        rotate: [-7, 7, -7],
        y: [0, -6, 0],
        transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' as const },
      };
    }
    if (['dog', 'puppy', 'cat', 'kitten', 'fox', 'monkey'].includes(id)) {
      // Playful Head Tilt & Breathing
      return {
        rotate: [0, -4, 4, -2, 0],
        y: [0, -10, 0, -5, 0],
        scale: [1, 1.05, 1, 1.03, 1],
        transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
      };
    }
    // Majestic gentle float & breathing
    return {
      y: [0, -8, 0],
      scale: [1, 1.04, 1],
      rotate: [0, -1.5, 1.5, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
    };
  };

  const idleMotion = getAnimalIdleAnimation(item.id);

  return (
    <div
      id="surprise-card-backdrop"
      onClick={onDismiss}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 cursor-pointer"
    >
      <motion.div
        id="surprise-card-content"
        initial={{ scale: 0.4, opacity: 0, y: 40, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 260 }}
        className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-linear-to-b from-amber-50 to-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-lg w-[92vw] sm:w-full text-center"
      >
        {/* Floating background decorative stars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-5 -left-5 text-amber-400"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-5 -right-5 text-rose-400"
        >
          <Heart className="w-12 h-12 fill-rose-400" />
        </motion.div>

        {/* Chibi Artwork Display with Active Animations */}
        <div
          id="surprise-emoji-display"
          onClick={handleAnimalTap}
          onTouchStart={handleAnimalTap}
          className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-3 select-none cursor-pointer"
        >
          {/* Ripple Halo when tapped */}
          <AnimatePresence>
            {tapCount > 0 && (
              <motion.div
                key={`halo-${tapCount}`}
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute w-48 h-48 rounded-full bg-amber-300/40 pointer-events-none -z-10"
              />
            )}
          </AnimatePresence>

          {/* Sparkles / Stars bursting around the animal */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: p.scale, x: p.x, y: p.y }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="absolute text-2xl sm:text-3xl pointer-events-none select-none z-20"
              >
                {p.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Animated Animal Artwork */}
          <motion.div
            key={`animal-${item.id}-${tapCount}`}
            animate={
              tapCount > 0
                ? {
                    scale: [1, 1.28, 0.92, 1.15, 1],
                    y: [0, -28, 4, -10, 0],
                    rotate: [0, -12, 12, -6, 0],
                    transition: { duration: 0.55, ease: 'easeInOut' },
                  }
                : idleMotion
            }
            className="w-full h-full flex items-center justify-center filter drop-shadow-lg"
          >
            {renderSurprise3D(item.id, 260)}
          </motion.div>
        </div>

        {/* Vietnamese Name */}
        <h3
          id="surprise-name-display"
          className="text-4xl sm:text-5xl font-black text-amber-950 tracking-wide mb-2 flex items-center justify-center gap-3"
        >
          {item.nameVi}
          <motion.button
            id="replay-voice-button"
            type="button"
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleAnimalTap}
            className="p-3 rounded-full bg-amber-200/90 hover:bg-amber-300 text-amber-950 transition-colors shadow-xs"
            title="Chạm để nghe âm thanh"
          >
            <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
          </motion.button>
        </h3>

        {/* English Name tag with gentle pulse */}
        {item.nameEn && (
          <motion.div
            id="surprise-english-tag"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 px-5 py-1.5 rounded-full bg-sky-100 text-sky-900 font-extrabold text-lg sm:text-xl tracking-wide border-2 border-sky-300 shadow-xs flex items-center gap-1.5"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{item.nameEn}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
