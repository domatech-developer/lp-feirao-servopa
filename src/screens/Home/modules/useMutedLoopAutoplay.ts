import { useEffect, type RefObject } from "react";

/** Garante autoplay de vídeo mudo em mobile (iOS exige play() + playsinline). */
export function useMutedLoopAutoplay(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      const attempt = video.play();
      if (attempt) void attempt.catch(() => {});
    };

    play();

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
      },
      { threshold: 0.12 }
    );
    observer.observe(video);

    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [ref]);
}
