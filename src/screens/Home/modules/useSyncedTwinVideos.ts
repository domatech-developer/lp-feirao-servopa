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

    return () => {
      primary.removeEventListener("timeupdate", syncSecondary);
      primary.removeEventListener("seeking", onSeeking);
      primary.removeEventListener("seeked", onSeeking);
      primary.removeEventListener("play", mirrorPlay);
      primary.removeEventListener("pause", mirrorPause);
    };
  }, []);

  return { primaryRef, secondaryRef };
}
