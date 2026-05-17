import { useRef, useState } from "react";
import useVideoProtection from "../../hooks/useVideoProtection";

/**
 * VideoPlayer — مشغل الفيديو مع الحماية من التسجيل ولقطة الشاشة
 */
export default function VideoPlayer({ url, title, onMarkComplete, onProgress }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isHidden } = useVideoProtection(videoRef);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      className="relative w-full h-full group rounded-2xl overflow-hidden bg-black shadow-2xl"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* CSS: إخفاء عند الطباعة */}
      <style>{`@media print { .video-protected { visibility: hidden !important; } }`}</style>

      {/* شاشة الحماية */}
      {isHidden && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <p className="text-white text-lg font-bold">المحتوى محمي</p>
          <p className="text-white/60 text-sm">يرجى العودة للصفحة لمتابعة الفيديو</p>
        </div>
      )}

      {/* VIDEO */}
      <video
        ref={videoRef}
        src={url}
        className={`w-full h-full object-cover video-protected ${isHidden ? "invisible" : ""}`}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          const video = e.target;
          if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            if (onProgress) {
              onProgress(percent);
            }
            if (percent > 50) {
              if (onMarkComplete) {
                onMarkComplete();
              }
            }
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* DARK OVERLAY عند الإيقاف */}
      {!isPlaying && !isHidden && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition">
          <button
            onClick={handlePlay}
            className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black text-3xl flex items-center justify-center shadow-xl hover:scale-110 transition"
          >
            ▶
          </button>
        </div>
      )}

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
        <h2 className="text-white font-bold text-lg truncate">{title}</h2>
      </div>

      {/* WATERMARK */}
      <div className="absolute bottom-4 right-4 text-white/70 text-sm font-bold pointer-events-none select-none">
        Ramadan Platform
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
    </div>
  );
}