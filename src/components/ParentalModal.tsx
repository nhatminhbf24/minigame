import React, { useState, useEffect } from 'react';
import { Settings, Volume2, VolumeX, Mic, MicOff, Maximize, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ParentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  bubbleSpeed: 'slow' | 'normal' | 'fast';
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast') => void;
  bubbleCountTotal: number;
  onResetCount: () => void;
}

export const ParentalModal: React.FC<ParentalModalProps> = ({
  isOpen,
  onClose,
  bubbleSpeed,
  onSpeedChange,
  bubbleCountTotal,
  onResetCount,
}) => {
  const [soundOn, setSoundOn] = useState(soundManager.isSoundEnabled());
  const [voiceOn, setVoiceOn] = useState(soundManager.isVoiceEnabled());

  useEffect(() => {
    setSoundOn(soundManager.isSoundEnabled());
    setVoiceOn(soundManager.isVoiceEnabled());
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSound = () => {
    const next = !soundOn;
    soundManager.setSoundEnabled(next);
    setSoundOn(next);
  };

  const toggleVoice = () => {
    const next = !voiceOn;
    soundManager.setVoiceEnabled(next);
    setVoiceOn(next);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      id="parental-gate-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div
        id="parental-gate-modal"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300"
      >
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2 text-amber-800">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold">Cài Đặt Dành Cho Ba Mẹ</h2>
          </div>
          <button
            id="close-parental-gate-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Sound toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50">
            <div className="flex items-center gap-3">
              {soundOn ? <Volume2 className="w-6 h-6 text-amber-600" /> : <VolumeX className="w-6 h-6 text-slate-400" />}
              <div>
                <p className="font-semibold text-slate-800">Âm thanh nổ bóng</p>
                <p className="text-xs text-slate-500">Tiếng bốp bốp, tiếng còi xe vui nhộn</p>
              </div>
            </div>
            <button
              id="toggle-sound-btn"
              onClick={toggleSound}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                soundOn ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {soundOn ? 'BẬT' : 'TẮT'}
            </button>
          </div>

          {/* Voice toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50">
            <div className="flex items-center gap-3">
              {voiceOn ? <Mic className="w-6 h-6 text-sky-600" /> : <MicOff className="w-6 h-6 text-slate-400" />}
              <div>
                <p className="font-semibold text-slate-800">Giọng đọc Tiếng Việt</p>
                <p className="text-xs text-slate-500">Đọc tên màu sắc và đồ vật cho bé</p>
              </div>
            </div>
            <button
              id="toggle-voice-btn"
              onClick={toggleVoice}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                voiceOn ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {voiceOn ? 'BẬT' : 'TẮT'}
            </button>
          </div>

          {/* Speed selector */}
          <div className="p-3 rounded-2xl bg-emerald-50 space-y-2">
            <p className="font-semibold text-slate-800 text-sm">Tốc độ bay & Số lượng bóng:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="speed-slow-btn"
                onClick={() => onSpeedChange('slow')}
                className={`py-2 text-xs font-semibold rounded-xl border-2 transition-all ${
                  bubbleSpeed === 'slow'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Chậm (Dễ chơi)
              </button>
              <button
                id="speed-normal-btn"
                onClick={() => onSpeedChange('normal')}
                className={`py-2 text-xs font-semibold rounded-xl border-2 transition-all ${
                  bubbleSpeed === 'normal'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Vừa phải
              </button>
              <button
                id="speed-fast-btn"
                onClick={() => onSpeedChange('fast')}
                className={`py-2 text-xs font-semibold rounded-xl border-2 transition-all ${
                  bubbleSpeed === 'fast'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Nhiều bóng
              </button>
            </div>
          </div>

          {/* Fullscreen & Reset */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              id="fullscreen-toggle-btn"
              onClick={toggleFullScreen}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
            >
              <Maximize className="w-4 h-4" />
              Toàn màn hình
            </button>
            <button
              id="reset-counter-btn"
              onClick={onResetCount}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Đếm lại từ đầu ({bubbleCountTotal})
            </button>
          </div>
        </div>

        <button
          id="confirm-parental-gate-btn"
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md transition-transform active:scale-95"
        >
          Tiếp tục chơi cùng bé Nhật Minh
        </button>
      </div>
    </div>
  );
};
