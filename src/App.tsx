import React, { useState, useEffect, useCallback } from 'react';
import { BubbleGameCanvas } from './components/BubbleGameCanvas';
import { GameHeader } from './components/GameHeader';
import { RunningEntitiesLayer } from './components/RunningEntitiesLayer';
import { ParentalModal } from './components/ParentalModal';
import { GameLobby } from './components/GameLobby';
import { ColorItem, SurpriseItem, RunningEntity, GameInfo, BabyProfile } from './types';
import { AVAILABLE_GAMES } from './data/gameData';
import { generateEntityTrajectory } from './utils/trajectories';
import { Sun } from 'lucide-react';

export default function App() {
  // Baby Profile State (persisted)
  const [profile, setProfile] = useState<BabyProfile>(() => {
    try {
      const saved = localStorage.getItem('nhatminh_baby_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return { name: 'Bé Nhật Minh', avatarEmoji: '👶' };
  });

  // Active Screen: 'lobby' | 'game'
  const [currentScreen, setCurrentScreen] = useState<'lobby' | 'game'>('lobby');
  const [activeGame, setActiveGame] = useState<GameInfo>(AVAILABLE_GAMES[0]);

  const [poppedCount, setPoppedCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nhatminh_bubble_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [bubbleSpeed, setBubbleSpeed] = useState<'slow' | 'normal' | 'fast'>(() => {
    try {
      const saved = localStorage.getItem('nhatminh_bubble_speed');
      if (saved === 'slow' || saved === 'normal' || saved === 'fast') return saved;
      return 'normal';
    } catch {
      return 'normal';
    }
  });

  // Multiple running entities concurrent state
  const [runningEntities, setRunningEntities] = useState<RunningEntity[]>([]);
  const [isParentalOpen, setIsParentalOpen] = useState<boolean>(false);

  // Update storage
  useEffect(() => {
    try {
      localStorage.setItem('nhatminh_baby_profile', JSON.stringify(profile));
    } catch {
      // Storage fallback
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('nhatminh_bubble_count', poppedCount.toString());
    } catch {
      // Storage fallback
    }
  }, [poppedCount]);

  useEffect(() => {
    try {
      localStorage.setItem('nhatminh_bubble_speed', bubbleSpeed);
    } catch {
      // Storage fallback
    }
  }, [bubbleSpeed]);

  const handleBubblePopped = useCallback((_name: string, _isSurprise: boolean) => {
    setPoppedCount((prev) => prev + 1);
  }, []);

  // When a bubble containing a surprise pops, launch the running entity!
  const handleSurprisePopped = useCallback((item: SurpriseItem, position: { x: number; y: number }) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 800;
    const height = typeof window !== 'undefined' ? window.innerHeight : 600;

    const newEntity = generateEntityTrajectory(
      item,
      position.x,
      position.y,
      width,
      height
    );

    setRunningEntities((prev) => {
      // Keep up to 8 active running entities for ultra-fluid 60fps performance
      const trimmed = prev.slice(-7);
      return [...trimmed, newEntity];
    });
  }, []);

  const handleRemoveEntity = useCallback((id: string) => {
    setRunningEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleResetCount = () => {
    setPoppedCount(0);
    try {
      localStorage.setItem('nhatminh_bubble_count', '0');
    } catch {
      // Storage fallback
    }
  };

  const handleSelectColorWave = (color: ColorItem) => {
    const trigger = (window as unknown as { spawnColorWaveForBaby?: (c: ColorItem) => void }).spawnColorWaveForBaby;
    if (trigger) {
      trigger(color);
    }
  };

  const handleSelectGame = (game: GameInfo) => {
    setActiveGame(game);
    setCurrentScreen('game');
  };

  const handleBackToLobby = () => {
    setRunningEntities([]); // clear active entities
    setCurrentScreen('lobby');
  };

  // If on Lobby screen, render the cute game selection & profile screen
  if (currentScreen === 'lobby') {
    return (
      <GameLobby
        currentProfile={profile}
        onSaveProfile={setProfile}
        onSelectGame={handleSelectGame}
      />
    );
  }

  // Active game viewport
  return (
    <main
      id="game-viewport"
      className="relative w-screen h-screen overflow-hidden bg-linear-to-b from-sky-200 via-sky-100 to-amber-50 select-none touch-none"
    >
      {/* Background Sun & Clouds Decoration */}
      <div className="absolute top-6 left-6 text-amber-400/80 pointer-events-none animate-pulse">
        <Sun className="w-16 h-16 md:w-20 md:h-20" />
      </div>

      {/* Decorative fluffy clouds */}
      <div className="absolute top-12 right-10 w-32 h-12 bg-white/70 rounded-full blur-xs pointer-events-none" />
      <div className="absolute top-20 right-20 w-24 h-10 bg-white/60 rounded-full blur-xs pointer-events-none" />
      <div className="absolute top-32 left-1/4 w-40 h-14 bg-white/50 rounded-full blur-xs pointer-events-none" />

      {/* Main Interactive Bubble Canvas */}
      <BubbleGameCanvas
        speed={bubbleSpeed}
        onBubblePopped={handleBubblePopped}
        onSurprisePopped={handleSurprisePopped}
      />

      {/* Interactive Running & Escaping Characters Layer (Multi-entity concurrent) */}
      <RunningEntitiesLayer
        entities={runningEntities}
        onRemoveEntity={handleRemoveEntity}
      />

      {/* Game Header with Baby Profile and Back to Menu */}
      <GameHeader
        profile={profile}
        poppedCount={poppedCount}
        onOpenParentalModal={() => setIsParentalOpen(true)}
        onSelectColorWave={handleSelectColorWave}
        onBackToLobby={handleBackToLobby}
      />

      {/* Parental Gate & Settings Modal */}
      <ParentalModal
        isOpen={isParentalOpen}
        onClose={() => setIsParentalOpen(false)}
        bubbleSpeed={bubbleSpeed}
        onSpeedChange={setBubbleSpeed}
        bubbleCountTotal={poppedCount}
        onResetCount={handleResetCount}
      />
    </main>
  );
}


