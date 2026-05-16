import { useState, useEffect, useRef } from "react";

/**
 * useVideoProtection — حماية الفيديو من التسجيل ولقطة الشاشة
 */
export default function useVideoProtection(videoRef) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hide = () => {
      videoRef.current?.pause();
      setIsHidden(true);
    };
    const show = () => setIsHidden(false);

    const handleVisibilityChange = () => {
      if (document.hidden) hide();
      else show();
    };

    const handleKeyDown = (e) => {
      const blocked =
        e.key === "PrintScreen" ||
        (e.metaKey && e.shiftKey && ["3", "4", "5", "s"].includes(e.key)) ||
        (e.ctrlKey && e.key === "PrintScreen") ||
        (e.altKey && e.key === "PrintScreen");

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        setIsHidden(true);
        setTimeout(() => setIsHidden(false), 9000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoRef]);

  return { isHidden, setIsHidden };
}
