export interface ColorItem {
  id: string;
  nameVi: string;
  hex: string;
  secondaryHex: string;
  tailwindBg: string;
}

export interface SurpriseItem {
  id: string;
  nameVi: string;
  nameEn?: string;
  emoji: string;
  category: 'vehicle' | 'animal' | 'nature' | 'object';
  soundType: string;
  tagColor?: string;
}

export interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speedY: number;
  speedX: number;
  wobblePhase: number;
  wobbleSpeed: number;
  color: ColorItem;
  surprise?: SurpriseItem;
  opacity: number;
  popped: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape?: 'circle' | 'star' | 'bubble';
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  scale: number;
}

export type TrajectoryStyle =
  | 'horizontal_wave'
  | 'diagonal_soar'
  | 'rocket_launch'
  | 'float_skyward'
  | 'zigzag_run'
  | 'bounce_parabola'
  | 'swoop_fly';

export interface RunningEntity {
  id: string;
  item: SurpriseItem;
  xKeyframes: number[];
  yKeyframes: number[];
  rotateKeyframes?: number[];
  scaleKeyframes?: number[];
  direction: 'left' | 'right' | 'up';
  movementType: 'drive' | 'hop' | 'trot' | 'fly' | 'float' | 'rocket';
  trajectoryStyle: TrajectoryStyle;
  duration: number; // in seconds
  soundEffectText: string;
  createdAt: number;
}

export interface GameInfo {
  id: string;
  titleVi: string;
  titleEn?: string;
  descriptionVi: string;
  iconEmoji: string;
  badgeText: string;
  accentGradient: string;
  cardBg: string;
  isAvailable: boolean;
  comingSoonText?: string;
}

export interface BabyProfile {
  name: string;
  avatarEmoji: string;
}

