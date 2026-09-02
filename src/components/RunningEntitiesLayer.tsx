import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RunningEntity } from '../types';
import { renderSurprise3D } from './Surprise3DIcons';
import { soundManager } from '../utils/audio';

interface RunningEntitiesLayerProps {
  entities: RunningEntity[];
  onRemoveEntity: (id: string) => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  emoji: string;
}

export const RunningEntitiesLayer: React.FC<RunningEntitiesLayerProps> = ({
  entities,
  onRemoveEntity,
}) => {
  const [tapParticles, setTapParticles] = useState<Record<string, SparkleParticle[]>>({});
  const [activeSpeech, setActiveSpeech] = useState<Record<string, string>>({});
  const [boostedIds, setBoostedIds] = useState<Record<string, number>>({});

  const handleEntityTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent, entity: RunningEntity) => {
      e.stopPropagation();
      e.preventDefault();

      // 1. Play realistic sound & speak Vietnamese name
      soundManager.playSpecialSound(entity.item.soundType, entity.item.id);
      soundManager.speakVietnamese(entity.item.nameVi);

      // 2. Trigger boost jump / spin
      setBoostedIds((prev) => ({
        ...prev,
        [entity.id]: (prev[entity.id] || 0) + 1,
      }));

      // 3. Show sound effect speech bubble
      setActiveSpeech((prev) => ({
        ...prev,
        [entity.id]: entity.soundEffectText || entity.item.nameVi,
      }));

      // 4. Emit fun star sparkles
      const emojis = ['⭐', '✨', '💖', '🌟', '🎉', '🍀'];
      const newParticles: SparkleParticle[] = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120 - 20,
        scale: 0.9 + Math.random() * 0.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }));

      setTapParticles((prev) => ({
        ...prev,
        [entity.id]: [...(prev[entity.id] || []).slice(-8), ...newParticles],
      }));

      // Hide speech bubble after 2s
      setTimeout(() => {
        setActiveSpeech((prev) => {
          const copy = { ...prev };
          delete copy[entity.id];
          return copy;
        });
      }, 2000);
    },
    []
  );

  return (
    <div
      id="running-entities-container"
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
    >
      <AnimatePresence>
        {entities.map((entity) => {
          const isFlipped = entity.direction === 'left';
          const tapCount = boostedIds[entity.id] || 0;
          const particles = tapParticles[entity.id] || [];
          const speechText = activeSpeech[entity.id];

          return (
            <motion.div
              key={entity.id}
              id={`running-entity-${entity.id}`}
              initial={{
                x: entity.xKeyframes[0],
                y: entity.yKeyframes[0],
                scale: 1.0,
                opacity: 1,
              }}
              animate={{
                x: entity.xKeyframes,
                y: entity.yKeyframes,
                scale: entity.scaleKeyframes || [1.0, 1.28, 1.12, 1.0],
                rotate: entity.rotateKeyframes || [0, 0],
                opacity: 1,
              }}
              transition={{
                duration: entity.duration,
                ease: entity.movementType === 'hop' ? 'easeInOut' : 'easeInOut',
              }}
              onAnimationComplete={() => {
                onRemoveEntity(entity.id);
              }}
              className="absolute top-0 left-0 pointer-events-auto cursor-pointer touch-manipulation select-none"
              style={{
                width: 140,
                height: 140,
                marginLeft: -70,
                marginTop: -70,
              }}
              onClick={(e) => handleEntityTap(e, entity)}
              onTouchStart={(e) => handleEntityTap(e, entity)}
            >
              {/* Interactive Character Body */}
              <motion.div
                animate={
                  tapCount > 0
                    ? {
                        scale: [1, 1.45, 0.9, 1.15, 1],
                        y: [0, -32, 0],
                        rotate: isFlipped ? [0, -15, 15, 0] : [0, 15, -15, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.45 }}
                className="relative w-full h-full flex flex-col items-center justify-center filter drop-shadow-xl"
              >
                {/* Speech / Sound Bubble when tapped or moving */}
                <AnimatePresence>
                  {speechText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.6 }}
                      animate={{ opacity: 1, y: -22, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.6 }}
                      className="absolute -top-12 z-30 px-3 py-1 bg-amber-400 text-slate-900 font-extrabold text-sm md:text-base rounded-full shadow-lg border-2 border-white whitespace-nowrap pointer-events-none animate-bounce"
                    >
                      {speechText}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtitle Name Badge under character */}
                <div className="absolute -bottom-5 z-20 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 font-bold text-xs md:text-sm rounded-full shadow-md border border-amber-200/80 pointer-events-none whitespace-nowrap flex items-center gap-1">
                  <span>{entity.item.nameVi}</span>
                </div>

                {/* The Character Visual Artwork (Mirrored if moving left) */}
                <div
                  className={`relative transition-transform duration-200 ${
                    isFlipped ? 'scale-x-[-1]' : 'scale-x-100'
                  }`}
                >
                  {renderSurprise3D(entity.item.id, 120)}
                </div>

                {/* Special Visual FX: Rocket Flame Thruster */}
                {entity.movementType === 'rocket' && (
                  <motion.div
                    animate={{
                      scaleY: [0.8, 1.4, 0.9],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute -bottom-6 w-5 h-8 bg-gradient-to-b from-amber-400 via-orange-500 to-transparent rounded-b-full blur-xs pointer-events-none"
                  />
                )}

                {/* Special Visual FX: Sun / Star Sparkle Halo */}
                {entity.movementType === 'float' && (
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-amber-300/25 blur-md pointer-events-none -z-10"
                  />
                )}

                {/* Speed Trail Dust / Exhaust for Vehicles */}
                {entity.movementType === 'drive' && (
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className={`absolute bottom-3 ${
                      isFlipped ? 'right-2' : 'left-2'
                    } w-6 h-6 rounded-full bg-slate-200/70 blur-xs pointer-events-none`}
                  />
                )}

                {/* Tap Celebration Sparkles */}
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                      animate={{
                        opacity: 0,
                        x: p.x,
                        y: p.y,
                        scale: p.scale,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute text-xl pointer-events-none select-none z-40"
                    >
                      {p.emoji}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
