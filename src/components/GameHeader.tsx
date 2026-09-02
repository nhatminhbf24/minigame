import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ColorItem, BabyProfile } from '../types';
import { COLORS } from '../data/gameData';

interface GameHeaderProps {
  profile: BabyProfile;
  poppedCount: number;
  onOpenParentalModal: () => void;
  onSelectColorWave: (color: ColorItem) => void;
  onBackToLobby: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  profile,
  poppedCount,
  onOpenParentalModal,
  onSelectColorWave,
  onBackToLobby,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(soundManager.isSoundEnabled());
  const [gateProgress, setGateProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSound = () => {
    const next = !isSoundOn;
    soundManager.setSoundEnabled(next);
    setIsSoundOn(next);
  };

  const handleGateStart = () => {
    setGateProgress(0);
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds hold for parent

    if (holdTimerRef.current) clearInterval(holdTimerRef.current);

    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setGateProgress(progress);

      if (progress >= 100) {
        clearInterval(holdTimerRef.current!);
        setGateProgress(0);
        onOpenParentalModal();
      }
    }, 50);
  };

  const handleGateEnd = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setGateProgress(0);
  };

  return (
    <header
      id="game-header"
      className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-between p-3 md:p-4 pointer-events-none gap-2"
    >
      <div className="w-full flex items-center justify-between pointer-events-auto">
        {/* Child Avatar & Name Badge (Click to return to lobby or change name) */}
        <div className="flex items-center gap-2">
          <button
            id="back-to-lobby-btn"
            onClick={onBackToLobby}
            title="Về danh sách trò chơi"
            className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md border-2 border-amber-300 flex items-center justify-center text-amber-600 active:scale-90 transition-transform"
          >
            <Home className="w-5 h-5" />
          </button>

          <div
            id="player-badge"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border-2 border-amber-300"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-lg font-bold text-white shadow-inner">
              {profile.avatarEmoji || '👶'}
            </div>
            <div>
              <h1 className="text-xs md:text-sm font-extrabold text-slate-800 leading-tight">
                {profile.name || 'Bé Nhật Minh'}
              </h1>
              <p className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Đã nổ: <span className="text-amber-800 font-bold">{poppedCount}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls for Parent */}
        <div className="flex items-center gap-2">
          {/* Quick Sound Toggle */}
          <button
            id="quick-sound-btn"
            onClick={toggleSound}
            aria-label="Bật tắt âm thanh"
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border-2 border-slate-200 shadow-md flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
          >
            {isSoundOn ? (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-rose-500" />
            )}
          </button>

          {/* Parental Gate button (Hold 1.5s) */}
          <div className="relative">
            <button
              id="parent-gate-trigger"
              onMouseDown={handleGateStart}
              onMouseUp={handleGateEnd}
              onTouchStart={handleGateStart}
              onTouchEnd={handleGateEnd}
              aria-label="Cài đặt dành cho Ba Mẹ"
              className="relative w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border-2 border-slate-200 shadow-md flex items-center justify-center text-slate-600 active:scale-95 transition-transform overflow-hidden select-none"
            >
              {gateProgress > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-amber-400 opacity-60 transition-all"
                  style={{ height: `${gateProgress}%` }}
                />
              )}
              <Settings className="w-5 h-5 z-10" />
            </button>
            {gateProgress > 0 && (
              <span className="absolute -bottom-5 right-0 whitespace-nowrap text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded-md">
                Giữ để mở...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Color Selector Bar - Toddler Learning Row */}
      <div
        id="color-learning-row"
        className="pointer-events-auto flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-white/80 max-w-full overflow-x-auto scrollbar-none"
      >
        <span className="text-xs font-bold text-slate-600 mr-1 hidden sm:inline">
          Bấm tạo màu:
        </span>
        {COLORS.map((c) => (
          <button
            key={c.id}
            id={`color-picker-${c.id}`}
            onClick={() => onSelectColorWave(c)}
            title={c.nameVi}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full shadow-sm transform active:scale-125 transition-transform border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </header>
  );
};

