import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Bubble, Particle, FloatingText, ColorItem, SurpriseItem } from '../types';
import { COLORS, SURPRISE_ITEMS, CHEER_PHRASES } from '../data/gameData';
import { soundManager } from '../utils/audio';

// Preloaded PNG images cache for 60fps canvas rendering
const animalImagesCache: Record<string, HTMLImageElement> = {};
const ANIMAL_FILE_KEYS = [
  'bear', 'cat', 'cow', 'deer', 'dog', 'elephant', 'fox', 'frog',
  'giraffe', 'goat', 'horse', 'lion', 'monkey', 'panda', 'penguin',
  'rabbit', 'sheep', 'squirrel', 'tiger', 'zebra'
];

if (typeof window !== 'undefined') {
  ANIMAL_FILE_KEYS.forEach((key) => {
    const img = new Image();
    img.src = `/animals/${key}.png`;
    img.onload = () => {
      animalImagesCache[key] = img;
    };
  });
}

interface BubbleGameCanvasProps {
  speed: 'slow' | 'normal' | 'fast';
  onBubblePopped: (colorName: string, isSurprise: boolean) => void;
  onSurprisePopped: (item: SurpriseItem, position: { x: number; y: number }) => void;
}

export const BubbleGameCanvas: React.FC<BubbleGameCanvasProps> = ({
  speed,
  onBubblePopped,
  onSurprisePopped,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Entities state in refs for 60fps canvas loop
  const bubblesRef = useRef<Bubble[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const nextBubbleIdRef = useRef<number>(1);
  const nextTextIdRef = useRef<number>(1);
  const popCountStreakRef = useRef<number>(0);

  // Spawner params based on speed - Enlarged bubbles for toddler fingers & mobile screens
  const getSpeedParams = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseMin = isMobile ? 48 : 44;
    const baseMax = isMobile ? 75 : 70;

    switch (speed) {
      case 'slow':
        return { maxBubbles: 14, spawnInterval: 900, speedMultiplier: 0.65, minRadius: baseMin + 6, maxRadius: baseMax + 10 };
      case 'fast':
        return { maxBubbles: 26, spawnInterval: 350, speedMultiplier: 1.35, minRadius: baseMin - 4, maxRadius: baseMax - 4 };
      case 'normal':
      default:
        return { maxBubbles: 18, spawnInterval: 600, speedMultiplier: 1.0, minRadius: baseMin, maxRadius: baseMax };
    }
  }, [speed]);

  // Create a single bubble
  const createBubble = useCallback(
    (customX?: number, customY?: number, forcedColor?: ColorItem, forcedSurprise?: SurpriseItem): Bubble => {
      const { minRadius, maxRadius, speedMultiplier } = getSpeedParams();
      const canvas = canvasRef.current;
      const width = canvas ? canvas.width : window.innerWidth;
      const height = canvas ? canvas.height : window.innerHeight;

      const radius = Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;
      const x = customX !== undefined ? customX : Math.random() * (width - radius * 2) + radius;
      const y = customY !== undefined ? customY : height + radius + Math.random() * 50;

      const color = forcedColor || COLORS[Math.floor(Math.random() * COLORS.length)];

      // 25% chance of containing a surprise vehicle / animal for Nhật Minh
      let surprise: SurpriseItem | undefined = forcedSurprise;
      if (!surprise && Math.random() < 0.28) {
        surprise = SURPRISE_ITEMS[Math.floor(Math.random() * SURPRISE_ITEMS.length)];
      }

      const speedY = -(Math.random() * 1.2 + 1.2) * speedMultiplier;
      const speedX = (Math.random() - 0.5) * 0.6;
      const wobbleSpeed = Math.random() * 0.04 + 0.02;

      return {
        id: nextBubbleIdRef.current++,
        x,
        y,
        radius,
        baseRadius: radius,
        speedY,
        speedX,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed,
        color,
        surprise,
        opacity: 0.9,
        popped: false,
      };
    },
    [getSpeedParams]
  );

  // Spawn initial set
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { maxBubbles } = getSpeedParams();

    const initial: Bubble[] = [];
    for (let i = 0; i < maxBubbles * 0.75; i++) {
      const b = createBubble();
      // Scatter vertically across screen initially
      b.y = Math.random() * canvas.height;
      initial.push(b);
    }
    bubblesRef.current = initial;
  }, [createBubble, getSpeedParams]);

  // Spawn color wave when Bố or bé picks a color from header
  const spawnColorWave = useCallback(
    (color: ColorItem) => {
      soundManager.speakVietnamese(color.nameVi);
      soundManager.playSparkle();

      const canvas = canvasRef.current;
      const width = canvas ? canvas.width : window.innerWidth;
      const height = canvas ? canvas.height : window.innerHeight;

      for (let i = 0; i < 7; i++) {
        const x = (width / 8) * (i + 1) + (Math.random() * 40 - 20);
        const y = height + 40 + i * 20;
        bubblesRef.current.push(createBubble(x, y, color));
      }
    },
    [createBubble]
  );

  // Expose color wave to window for communication
  useEffect(() => {
    (window as unknown as { spawnColorWaveForBaby?: (c: ColorItem) => void }).spawnColorWaveForBaby = spawnColorWave;
  }, [spawnColorWave]);

  // Pop a bubble logic
  const popBubble = useCallback(
    (bubble: Bubble) => {
      bubble.popped = true;

      // Increment streak
      popCountStreakRef.current++;
      const streak = popCountStreakRef.current;

      // Play Sound
      const freqVar = 0.8 + Math.random() * 0.4;
      soundManager.playPop(freqVar);

      // Speak color or surprise
      if (bubble.surprise) {
        soundManager.playSpecialSound(bubble.surprise.soundType, bubble.surprise.id);
        soundManager.speakVietnamese(bubble.surprise.nameVi);
        onSurprisePopped(bubble.surprise, { x: bubble.x, y: bubble.y });
        onBubblePopped(bubble.surprise.nameVi, true);
      } else {
        // Every 6 pops, speak color or cheer phrase
        if (streak % 6 === 0) {
          const cheer = CHEER_PHRASES[Math.floor(Math.random() * CHEER_PHRASES.length)];
          soundManager.speakVietnamese(cheer);
        } else if (Math.random() < 0.45) {
          soundManager.speakVietnamese(bubble.color.nameVi);
        }
        onBubblePopped(bubble.color.nameVi, false);
      }

      // Create Particle explosion
      const particleCount = bubble.surprise ? 22 : 14;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.4 - 0.2);
        const velocity = Math.random() * 4 + 2.5;
        particlesRef.current.push({
          x: bubble.x,
          y: bubble.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.2,
          radius: Math.random() * 5 + 3,
          color: Math.random() > 0.3 ? bubble.color.hex : '#FFFFFF',
          alpha: 1.0,
          life: 0,
          maxLife: Math.floor(Math.random() * 15 + 20),
          shape: bubble.surprise ? 'star' : 'bubble',
        });
      }

      // Add Floating Text
      floatingTextsRef.current.push({
        id: nextTextIdRef.current++,
        x: bubble.x,
        y: bubble.y - 15,
        text: bubble.surprise ? bubble.surprise.nameVi : bubble.color.nameVi,
        color: bubble.color.hex,
        alpha: 1.0,
        scale: 1.0,
      });
    },
    [onBubblePopped, onSurprisePopped]
  );

  // Handle Multi-touch / Palm hit
  const handleTouchAtCoords = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      let hitAny = false;

      // Iterate backwards so top-most bubbles are popped first
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        if (b.popped) continue;

        const dist = Math.hypot(b.x - x, b.y - y);
        // generous hit box for toddler (extra 20px padding)
        if (dist <= b.radius + 22) {
          popBubble(b);
          hitAny = true;
          // allow multi-popping if finger touches overlapping bubbles
        }
      }

      // If toddler tapped empty space, blow small bubbles!
      if (!hitAny) {
        soundManager.playBubbleBlow();
        for (let k = 0; k < 3; k++) {
          const mini = createBubble(
            x + (Math.random() * 40 - 20),
            y + (Math.random() * 40 - 20)
          );
          mini.radius = Math.random() * 18 + 20;
          mini.speedY = -(Math.random() * 1.5 + 1.0);
          bubblesRef.current.push(mini);
        }
      }
    },
    [createBubble, popBubble]
  );

  // Multi-touch Handler
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // prevent zoom and pull to refresh
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      handleTouchAtCoords(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      handleTouchAtCoords(touch.clientX, touch.clientY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleTouchAtCoords(e.clientX, e.clientY);
  };

  // Canvas Resize and Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let lastSpawnTime = Date.now();

    // Main animation render frame
    const render = () => {
      const now = Date.now();
      const { maxBubbles, spawnInterval } = getSpeedParams();

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Auto-spawner
      if (
        bubblesRef.current.filter((b) => !b.popped).length < maxBubbles &&
        now - lastSpawnTime > spawnInterval
      ) {
        bubblesRef.current.push(createBubble());
        lastSpawnTime = now;
      }

      // Update & Draw Bubbles
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];

        if (b.popped) {
          bubblesRef.current.splice(i, 1);
          continue;
        }

        // Wobble physics
        b.wobblePhase += b.wobbleSpeed;
        const currentRadius = b.baseRadius + Math.sin(b.wobblePhase) * 2;
        b.x += b.speedX + Math.sin(b.wobblePhase) * 0.7;
        b.y += b.speedY;

        // Wrap or remove if floated off the top
        if (b.y < -currentRadius * 2) {
          bubblesRef.current.splice(i, 1);
          continue;
        }

        // Draw Soapy Bubble
        ctx.save();
        ctx.translate(b.x, b.y);

        // 1. Base translucent bubble body
        const grad = ctx.createRadialGradient(
          -currentRadius * 0.3,
          -currentRadius * 0.3,
          currentRadius * 0.1,
          0,
          0,
          currentRadius
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
        grad.addColorStop(0.5, b.color.hex + '33'); // 20% alpha
        grad.addColorStop(0.85, b.color.secondaryHex + '55'); // 33% alpha
        grad.addColorStop(1, b.color.hex + '99'); // 60% alpha outline

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Crisp outer membrane (thin and soft)
        ctx.strokeStyle = b.color.hex;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 3. Inner gloss highlight arc (top left)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = currentRadius * 0.12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(
          0,
          0,
          currentRadius * 0.75,
          Math.PI * 1.15,
          Math.PI * 1.65
        );
        ctx.stroke();

        // 4. Secondary small reflection dot (bottom right)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(
          currentRadius * 0.45,
          currentRadius * 0.45,
          currentRadius * 0.12,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // 5. Draw Surprise Item (PNG Artwork or Emoji) inside bubble if present
        if (b.surprise) {
          ctx.save();
          // Gentle floating tilt & wobble
          const wobbleAngle = Math.sin(b.wobblePhase) * 0.12;
          const wobbleScale = 1 + Math.sin(b.wobblePhase * 1.5) * 0.04;
          ctx.rotate(wobbleAngle);
          ctx.scale(wobbleScale, wobbleScale);

          const itemKey = b.surprise.id === 'puppy' ? 'dog' : b.surprise.id === 'kitten' ? 'cat' : b.surprise.id === 'bunny' ? 'rabbit' : b.surprise.id;
          const cachedImg = animalImagesCache[itemKey];

          if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            const imgSize = currentRadius * 1.45;
            ctx.drawImage(cachedImg, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
          } else {
            ctx.font = `${Math.floor(currentRadius * 1.1)}px system-ui, apple-system, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(b.surprise.emoji, 0, 2);
          }
          ctx.restore();
        }

        ctx.restore();
      }

      // Update & Draw Particles (Explosions)
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          // Draw mini star
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(
              Math.cos(((18 + s * 72) * Math.PI) / 180) * p.radius,
              -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.radius
            );
            ctx.lineTo(
              Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.radius / 2),
              -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.radius / 2)
            );
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Update & Draw Floating Texts
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y -= 1.3;
        ft.alpha -= 0.022;
        ft.scale += 0.008;

        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.translate(ft.x, ft.y);
        ctx.scale(ft.scale, ft.scale);
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text stroke for contrast
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 4;
        ctx.strokeText(ft.text, 0, 0);

        // Text fill
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, 0, 0);
        ctx.restore();
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [createBubble, getSpeedParams]);

  return (
    <canvas
      id="bubble-game-canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="absolute inset-0 w-full h-full cursor-pointer select-none touch-none"
    />
  );
};
