import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop Chrome flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs md:text-sm font-extrabold text-white shadow-lg border-2 border-white hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-all select-none animate-pulse"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Cài đặt ứng dụng vào điện thoại 📲</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-install-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-indigo-600 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md border-2 border-white active:scale-95 transition-all select-none"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>Cài ra màn hình chính (iPhone/iPad) 📲</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300 text-slate-800">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-black text-slate-900">
                    Cài ứng dụng trên iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs md:text-sm font-semibold text-slate-700">
                <div className="flex items-start gap-2.5 bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                    1
                  </span>
                  <p>
                    Bấm vào nút <strong>Chia sẻ (Share) 📤</strong> ở thanh công cụ Safari dưới cùng màn hình.
                  </p>
                </div>

                <div className="flex items-start gap-2.5 bg-sky-50 p-2.5 rounded-2xl border border-sky-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white">
                    2
                  </span>
                  <p>
                    Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen) ➕</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2.5 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-emerald-800">
                    Game sẽ mở toàn màn hình mượt mà như 1 ứng dụng thật, không còn hiện link trình duyệt!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-2xl bg-amber-500 py-3 text-sm font-black text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
