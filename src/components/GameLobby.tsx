import React, { useState } from 'react';
import { Sparkles, Play, Volume2, Star, Smile, ChevronRight, Lock } from 'lucide-react';
import { GameInfo, BabyProfile } from '../types';
import { AVAILABLE_GAMES, AVATAR_OPTIONS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { PWAInstallButton } from './PWAInstallButton';

interface GameLobbyProps {
  currentProfile: BabyProfile;
  onSaveProfile: (profile: BabyProfile) => void;
  onSelectGame: (game: GameInfo) => void;
}

export const GameLobby: React.FC<GameLobbyProps> = ({
  currentProfile,
  onSaveProfile,
  onSelectGame,
}) => {
  const [babyName, setBabyName] = useState(currentProfile.name || 'Bé Nhật Minh');
  const [selectedAvatar, setSelectedAvatar] = useState(currentProfile.avatarEmoji || '👶');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string>('bubble_pop');

  const handleStartGame = (game: GameInfo) => {
    if (!game.isAvailable) {
      soundManager.playSpecialSound('magic');
      soundManager.speakVietnamese(`Trò chơi ${game.titleVi} đang được chuẩn bị nhé!`);
      return;
    }

    // Save profile updates
    const finalProfile: BabyProfile = {
      name: babyName.trim() || 'Bé Nhật Minh',
      avatarEmoji: selectedAvatar,
    };
    onSaveProfile(finalProfile);

    // Audio cue & launch
    soundManager.playSparkle();
    soundManager.speakVietnamese(`Chào mừng ${finalProfile.name} vào chơi ${game.titleVi}!`);
    onSelectGame(game);
  };

  const handleAvatarSelect = (emoji: string, label: string) => {
    setSelectedAvatar(emoji);
    soundManager.playPop(1.2);
    soundManager.speakVietnamese(`Chọn bạn ${label}!`);
  };

  const currentGame = AVAILABLE_GAMES.find((g) => g.id === selectedGameId) || AVAILABLE_GAMES[0];

  return (
    <div
      id="game-lobby-screen"
      className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-linear-to-b from-sky-300 via-sky-100 to-amber-100 flex flex-col items-center justify-between p-4 md:p-8 select-none"
    >
      {/* Background cute floating decorations */}
      <div className="absolute top-4 left-6 text-amber-400 text-4xl md:text-5xl animate-bounce pointer-events-none opacity-80">
        ☀️
      </div>
      <div className="absolute top-12 right-8 text-3xl md:text-4xl animate-pulse pointer-events-none opacity-80">
        🌈
      </div>
      <div className="absolute bottom-6 left-8 text-2xl md:text-3xl pointer-events-none opacity-60">
        🌸
      </div>
      <div className="absolute bottom-8 right-10 text-3xl md:text-4xl pointer-events-none opacity-60 animate-bounce">
        🎈
      </div>

      {/* 1. Header / Title */}
      <header className="w-full max-w-4xl flex flex-col items-center text-center mt-2 md:mt-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border-2 border-amber-300 mb-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span className="text-xs md:text-sm font-extrabold text-amber-900 uppercase tracking-wide">
            Thế Giới Trò Chơi Bé Ngoan
          </span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
        </div>

        <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight drop-shadow-xs flex items-center gap-2">
          <span>Chào Mừng</span>
          <span className="text-amber-500 underline decoration-wavy decoration-amber-300">
            {babyName || 'Bé Yêu'}
          </span>
          <span>🎉</span>
        </h1>
        <p className="text-xs md:text-base text-slate-600 font-bold mt-1 mb-2">
          Chọn trò chơi vui nhộn & khám phá thế giới rực rỡ nhé!
        </p>

        {/* PWA Install Button for easy 1-click home screen install */}
        <div className="mt-1">
          <PWAInstallButton />
        </div>
      </header>

      {/* 2. Middle Content: Baby Profile Card + Game Selection */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto py-3 z-10">
        
        {/* Left Card: Baby Profile & Name Badge (4 cols on lg) */}
        <section
          id="baby-profile-card"
          className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-4 border-amber-300 flex flex-col items-center justify-between"
        >
          <div className="w-full flex items-center justify-between border-b border-amber-100 pb-2 mb-3">
            <span className="text-xs font-black text-amber-800 flex items-center gap-1">
              <Smile className="w-4 h-4 text-amber-500" /> BÉ CƯNG CỦA BA MẸ
            </span>
            <button
              onClick={() => setIsEditingName(!isEditingName)}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full"
            >
              {isEditingName ? 'Xong' : 'Đổi tên ✏️'}
            </button>
          </div>

          {/* Big Interactive Avatar */}
          <div className="relative group my-1">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-tr from-amber-300 to-yellow-200 border-4 border-white shadow-xl flex items-center justify-center text-5xl md:text-6xl transform active:scale-110 transition-transform">
              {selectedAvatar}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          {/* Name Input or Display */}
          <div className="w-full text-center mt-3">
            {isEditingName ? (
              <div className="flex flex-col items-center gap-1.5">
                <input
                  type="text"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  placeholder="Nhập tên bé..."
                  maxLength={20}
                  className="w-full text-center font-extrabold text-base md:text-lg text-slate-800 bg-amber-50 border-2 border-amber-400 rounded-2xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
                <span className="text-[11px] text-slate-400 font-semibold">
                  Tên bé sẽ được lưu tự động
                </span>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                className="cursor-pointer group flex flex-col items-center"
              >
                <span className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                  {babyName}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full mt-1">
                  Bé ngoan 2.5 tuổi ⭐
                </span>
              </div>
            )}
          </div>

          {/* Cute Avatar Picker Row */}
          <div className="w-full mt-4">
            <span className="text-xs font-bold text-slate-500 mb-2 block text-center">
              Chọn hình đại diện yêu thích:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAvatarSelect(item.emoji, item.label)}
                  title={item.label}
                  className={`h-11 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === item.emoji
                      ? 'bg-amber-400 scale-110 shadow-md border-2 border-white'
                      : 'bg-slate-100 hover:bg-amber-100 active:scale-95'
                  }`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Area: Game Cards Selection (7 cols on lg) */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm md:text-base font-extrabold text-slate-800 flex items-center gap-1.5">
              <Play className="w-4 h-4 text-amber-600 fill-current" />
              DANH SÁCH TRÒ CHƠI
            </h2>
            <span className="text-xs font-bold text-slate-500">
              {AVAILABLE_GAMES.filter((g) => g.isAvailable).length} Trò chơi sẵn sàng
            </span>
          </div>

          {/* List of Game Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {AVAILABLE_GAMES.map((game) => {
              const isSelected = selectedGameId === game.id;
              return (
                <div
                  key={game.id}
                  id={`game-card-${game.id}`}
                  onClick={() => {
                    setSelectedGameId(game.id);
                    if (game.isAvailable) {
                      soundManager.playPop(1.1);
                    } else {
                      soundManager.playSpecialSound('magic');
                    }
                  }}
                  className={`relative rounded-3xl p-4 transition-all cursor-pointer select-none border-3 flex flex-col justify-between ${
                    game.isAvailable
                      ? isSelected
                        ? 'bg-white border-amber-400 shadow-xl scale-[1.02] ring-4 ring-amber-300/50'
                        : 'bg-white/90 border-slate-200 hover:border-amber-300 shadow-md hover:shadow-lg'
                      : 'bg-slate-50/80 border-dashed border-slate-300 opacity-75'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        game.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {game.badgeText}
                    </span>
                    {!game.isAvailable && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 my-1">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 ${
                        game.isAvailable ? 'bg-amber-100' : 'bg-slate-200'
                      }`}
                    >
                      {game.iconEmoji}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800 leading-snug">
                        {game.titleVi}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-semibold line-clamp-2 mt-0.5">
                        {game.descriptionVi}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    {game.isAvailable ? (
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        Chạm để chọn <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 italic">
                        {game.comingSoonText}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Big Play Button */}
          <button
            id="start-selected-game-btn"
            onClick={() => handleStartGame(currentGame)}
            className={`w-full py-4 px-6 rounded-3xl font-black text-lg md:text-xl text-white shadow-2xl flex items-center justify-center gap-3 transform active:scale-95 transition-all select-none ${
              currentGame.isAvailable
                ? 'bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 ring-4 ring-amber-300'
                : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-6 h-6 fill-current animate-pulse" />
            <span>VÀO CHƠI NGAY ({currentGame.titleVi})</span>
            <Sparkles className="w-6 h-6" />
          </button>
        </section>
      </div>

      {/* 3. Footer */}
      <footer className="w-full max-w-4xl flex items-center justify-between text-slate-500 text-xs font-bold mt-2 z-10">
        <div className="flex items-center gap-1.5">
          <span>Dành riêng cho bé yêu</span>
          <span className="text-rose-500 font-extrabold">Nhật Minh ❤️</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white/80 px-2.5 py-1 rounded-full text-[11px] border border-slate-200">
            Âm thanh thực tế & Tiếng Việt chuẩn 🇻🇳
          </span>
        </div>
      </footer>
    </div>
  );
};
