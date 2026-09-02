import { SurpriseItem, RunningEntity, TrajectoryStyle } from '../types';

/**
 * Toddler-friendly onomatopoeic phrases
 */
export function getSoundText(item: SurpriseItem): string {
  switch (item.id) {
    case 'rocket':
      return 'Vút lên trời cao! 🚀';
    case 'sun':
      return 'Ông mặt trời ấm áp! ☀️';
    case 'star':
      return 'Ngôi sao lấp lánh! ⭐';
    case 'balloon':
      return 'Bóng bay lên mây! 🎈';
    case 'airplane':
    case 'helicopter':
      return 'Vùuuu bay lượn! ✈️';
    case 'firetruck':
      return 'Ò e Ò e! 🚒';
    case 'police':
      return 'U u u! 🚓';
    case 'ambulance':
      return 'Én en! 🚑';
    case 'excavator':
      return 'Xúc đất xịch xịch! 🚜';
    case 'train':
    case 'bullet_train':
      return 'Tu tu xình xịch! 🚂';
    case 'motorcycle':
      return 'Vrooom vù vù! 🛵';
    case 'bicycle':
      return 'Kính coong! 🚲';
    case 'ship':
    case 'boat':
      return 'Tu tu còi tàu! 🚢';
    case 'dog':
    case 'puppy':
      return 'Gâu gâu mừng! 🐶';
    case 'cat':
    case 'kitten':
      return 'Meo meo đáng yêu! 🐱';
    case 'lion':
    case 'tiger':
      return 'Gừ gừ oai phong! 🦁';
    case 'elephant':
      return 'Voi tu tu! 🐘';
    case 'monkey':
      return 'Khẹc khẹc leo trèo! 🐵';
    case 'cow':
      return 'Ùm bòoo sữa! 🐮';
    case 'horse':
    case 'zebra':
      return 'Hí hí phi nhanh! 🐴';
    case 'sheep':
    case 'goat':
      return 'Be be gọi mẹ! 🐑';
    case 'pig':
      return 'Ủn ỉn béo tròn! 🐷';
    case 'duck':
    case 'chicken':
      return 'Cạp cạp bơi lội! 🦆';
    case 'frog':
      return 'Ộp ộp nhảy xa! 🐸';
    case 'rabbit':
    case 'bunny':
    case 'squirrel':
      return 'Nhảy tưng tưng! 🐰';
    default:
      return item.category === 'vehicle' ? 'Bíp bíp bon bon! 🚗' : 'Chạy nhảy vui vẻ! 🌟';
  }
}

/**
 * Creates a smart, randomized trajectory prioritizing open screen space
 */
export function generateEntityTrajectory(
  item: SurpriseItem,
  startX: number,
  startY: number,
  screenWidth: number,
  screenHeight: number
): RunningEntity {
  const width = Math.max(360, screenWidth);
  const height = Math.max(480, screenHeight);

  // 1. Check special skyward / upward items
  if (item.id === 'rocket') {
    // Rocket blasts off into the sky (upwards or slightly diagonal)
    const isLeftOfCenter = startX < width * 0.5;
    const horizontalDrift = (isLeftOfCenter ? 1 : -1) * (50 + Math.random() * 80);
    const targetX = startX + horizontalDrift;
    const targetY = -220;

    return {
      id: `entity_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      item,
      xKeyframes: [startX, startX + horizontalDrift * 0.25, startX + horizontalDrift * 0.65, targetX],
      yKeyframes: [startY, startY - height * 0.25, startY - height * 0.65, targetY],
      rotateKeyframes: [0, isLeftOfCenter ? 12 : -12, isLeftOfCenter ? 18 : -18, isLeftOfCenter ? 22 : -22],
      scaleKeyframes: [1.0, 1.28, 1.15, 1.0],
      direction: 'up',
      movementType: 'rocket',
      trajectoryStyle: 'rocket_launch',
      duration: 3.5,
      soundEffectText: getSoundText(item),
      createdAt: Date.now(),
    };
  }

  if (item.id === 'sun' || item.id === 'star' || item.id === 'balloon') {
    // Floats gently up to the clouds with charming horizontal swaying
    const swayAmp = 45 + Math.random() * 35;
    const targetY = -200;
    const isRightDominant = startX < width * 0.5;
    const driftX = isRightDominant ? 60 : -60;

    return {
      id: `entity_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      item,
      xKeyframes: [
        startX,
        startX + (isRightDominant ? swayAmp : -swayAmp),
        startX - (isRightDominant ? swayAmp * 0.8 : -swayAmp * 0.8) + driftX * 0.5,
        startX + (isRightDominant ? swayAmp * 0.5 : -swayAmp * 0.5) + driftX,
        startX + driftX,
      ],
      yKeyframes: [
        startY,
        startY - (startY + 100) * 0.35,
        startY - (startY + 100) * 0.7,
        startY - (startY + 100) * 0.9,
        targetY,
      ],
      rotateKeyframes: [0, 10, -10, 8, 0],
      scaleKeyframes: [1.0, 1.25, 1.15, 1.05, 1.0],
      direction: 'up',
      movementType: 'float',
      trajectoryStyle: 'float_skyward',
      duration: 4.8 + Math.random() * 0.8,
      soundEffectText: getSoundText(item),
      createdAt: Date.now(),
    };
  }

  // 2. Flying creatures / vehicles (airplane, bird, butterfly, helicopter, dolphin...)
  const isFlyer = [
    'airplane',
    'helicopter',
    'bird',
    'butterfly',
    'bee',
    'duck',
    'chicken',
    'dolphin',
    'whale',
  ].includes(item.id);

  // 3. Hopping creatures
  const isHopper = ['rabbit', 'bunny', 'frog', 'squirrel', 'monkey'].includes(item.id);

  // 4. Calculate Screen Open Space
  // Quadrants: X (left/right), Y (top/bottom)
  const isLeft = startX < width * 0.5;
  const isTop = startY < height * 0.5;

  // Primary Horizontal Direction towards larger empty space
  const primaryDir: 'left' | 'right' = isLeft ? 'right' : 'left';
  const targetX = primaryDir === 'right' ? width + 180 : -180;
  const dx = targetX - startX;

  // Available trajectories to randomly choose from based on item type
  const availableStyles: TrajectoryStyle[] = [];

  if (isFlyer) {
    availableStyles.push('swoop_fly', 'diagonal_soar', 'horizontal_wave');
  } else if (isHopper) {
    availableStyles.push('bounce_parabola', 'horizontal_wave', 'diagonal_soar', 'zigzag_run');
  } else {
    // Vehicles and regular animals
    availableStyles.push('horizontal_wave', 'zigzag_run', 'diagonal_soar');
  }

  const selectedStyle = availableStyles[Math.floor(Math.random() * availableStyles.length)];

  // Generate Waypoints according to selected trajectory
  let xKeyframes: number[] = [];
  let yKeyframes: number[] = [];
  let rotateKeyframes: number[] = [];
  let movementType: RunningEntity['movementType'] = 'drive';

  if (isFlyer) {
    movementType = 'fly';
  } else if (isHopper) {
    movementType = 'hop';
  } else if (item.category === 'vehicle') {
    movementType = 'drive';
  } else {
    movementType = 'trot';
  }

  // Common distance for speed calculation
  let totalDistance = Math.abs(dx);

  switch (selectedStyle) {
    case 'diagonal_soar': {
      // Moves diagonally towards the opposite open corner
      const targetCornerY = isTop ? height + 160 : -160;
      const midX1 = startX + dx * 0.33;
      const midY1 = startY + (targetCornerY - startY) * 0.25;
      const midX2 = startX + dx * 0.66;
      const midY2 = startY + (targetCornerY - startY) * 0.7;

      xKeyframes = [startX, midX1, midX2, targetX];
      yKeyframes = [startY, midY1, midY2, targetCornerY];

      const tilt = primaryDir === 'right' ? (isTop ? 15 : -15) : (isTop ? -15 : 15);
      rotateKeyframes = [0, tilt * 0.7, tilt, tilt];
      totalDistance = Math.hypot(dx, targetCornerY - startY);
      break;
    }

    case 'zigzag_run': {
      // Playful sharp zig-zag through open space
      const zigAmp = Math.min(120, height * 0.22);
      const zigDir = isTop ? 1 : -1; // Zigzag downwards if in top, upwards if in bottom

      xKeyframes = [
        startX,
        startX + dx * 0.25,
        startX + dx * 0.5,
        startX + dx * 0.75,
        targetX,
      ];
      yKeyframes = [
        startY,
        startY + zigDir * zigAmp,
        startY - zigDir * (zigAmp * 0.6),
        startY + zigDir * (zigAmp * 0.8),
        Math.max(80, Math.min(height - 100, startY + zigDir * 40)),
      ];
      rotateKeyframes = primaryDir === 'right' ? [0, -12, 14, -10, 0] : [0, 12, -14, 10, 0];
      break;
    }

    case 'bounce_parabola': {
      // 4 bouncy parabolic hops across the screen
      const hopHeight = 85 + Math.random() * 35;
      const baseY = Math.max(120, Math.min(height - 120, startY + (isTop ? 60 : -40)));

      xKeyframes = [
        startX,
        startX + dx * 0.18,
        startX + dx * 0.36,
        startX + dx * 0.54,
        startX + dx * 0.72,
        startX + dx * 0.9,
        targetX,
      ];
      yKeyframes = [
        startY,
        baseY - hopHeight,
        baseY,
        baseY - hopHeight * 0.9,
        baseY,
        baseY - hopHeight * 0.8,
        baseY,
      ];
      rotateKeyframes = primaryDir === 'right' ? [0, -15, 10, -15, 10, -12, 0] : [0, 15, -10, 15, -10, 12, 0];
      break;
    }

    case 'swoop_fly': {
      // Big smooth swooping arc across screen
      const swoopDepth = (isTop ? 1 : -1) * (100 + Math.random() * 70);
      xKeyframes = [
        startX,
        startX + dx * 0.3,
        startX + dx * 0.65,
        targetX,
      ];
      yKeyframes = [
        startY,
        startY + swoopDepth,
        startY - swoopDepth * 0.5,
        Math.max(60, Math.min(height - 80, startY - swoopDepth * 0.8)),
      ];
      rotateKeyframes = primaryDir === 'right' ? [0, 18, -12, 5] : [0, -18, 12, -5];
      break;
    }

    case 'horizontal_wave':
    default: {
      // Smooth sinusoidal wave
      const waveAmp = 60 + Math.random() * 40;
      const waveSign = Math.random() > 0.5 ? 1 : -1;

      xKeyframes = [
        startX,
        startX + dx * 0.28,
        startX + dx * 0.62,
        targetX,
      ];
      yKeyframes = [
        startY,
        Math.max(70, Math.min(height - 80, startY + waveSign * waveAmp)),
        Math.max(70, Math.min(height - 80, startY - waveSign * waveAmp)),
        Math.max(70, Math.min(height - 80, startY + waveSign * (waveAmp * 0.4))),
      ];
      rotateKeyframes = primaryDir === 'right' ? [0, -8, 8, 0] : [0, 8, -8, 0];
      break;
    }
  }

  // Speed and duration: ensure safe toddler pacing (3.8s to 5.6s)
  const speed = 190 + Math.random() * 50; // px/s
  const duration = Math.max(3.8, Math.min(5.8, totalDistance / speed));

  return {
    id: `entity_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    item,
    xKeyframes,
    yKeyframes,
    rotateKeyframes,
    scaleKeyframes: [1.0, 1.28, 1.12, 1.0],
    direction: primaryDir,
    movementType,
    trajectoryStyle: selectedStyle,
    duration,
    soundEffectText: getSoundText(item),
    createdAt: Date.now(),
  };
}
