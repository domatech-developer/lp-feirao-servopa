import { useEffect, useRef } from "react";

/** Syncs two muted loop videos for a horizontal split (one `<video>` per masked region). */
export function useSyncedTwinVideos() {
  const primaryRef = useRef<HTMLVideoElement>(null);
  const secondaryRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!primary || !secondary) return;

    const syncSecondary = () => {
      const delta = Math.abs(secondary.currentTime - primary.currentTime);
      if (delta > 0.12) {
        secondary.currentTime = primary.currentTime;
      }
    };

    const onSeeking = () => {
      secondary.currentTime = primary.currentTime;
    };

    const mirrorPlay = () => {
      void secondary.play().catch(() => {});
    };

    const mirrorPause = () => {
      secondary.pause();
    };

    primary.addEventListener("timeupdate", syncSecondary);
    primary.addEventListener("seeking", onSeeking);
    primary.addEventListener("seeked", onSeeking);
    primary.addEventListener("play", mirrorPlay);
    primary.addEventListener("pause", mirrorPause);

    secondary.pause();
    secondary.currentTime = primary.currentTime;

    const startPrimary = () => {
      primary.muted = true;
      primary.defaultMuted = true;
      const attempt = primary.play();
      if (attempt) {
        void attempt.catch(() => {});
      }
    };

    startPrimary();
    primary.addEventListener("loadeddata", startPrimary);
    primary.addEventListener("canplay", startPrimary);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startPrimary();
      },
      { threshold: 0.12 }
    );
    visibilityObserver.observe(primary);

    const onPageVisible = () => {
      if (document.visibilityState === "visible") startPrimary();
    };
    document.addEventListener("visibilitychange", onPageVisible);

    return () => {
      primary.removeEventListener("loadeddata", startPrimary);
      primary.removeEventListener("canplay", startPrimary);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onPageVisible);
      primary.removeEventListener("timeupdate", syncSecondary);
      primary.removeEventListener("seeking", onSeeking);
      primary.removeEventListener("seeked", onSeeking);
      primary.removeEventListener("play", mirrorPlay);
      primary.removeEventListener("pause", mirrorPause);
    };
  }, []);

  return { primaryRef, secondaryRef };
}
