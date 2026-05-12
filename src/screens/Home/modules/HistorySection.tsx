"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

const historyBg = "/images/ef7423ac557df94146f57db8f2d4a23f5e96fdb8.png";
const historyVideo = "/videos/servopa.mp4";

export default function HistorySection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isStoryInView, setIsStoryInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const openPlayRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const videoModalTitleId = useId();
  const reveal = prefersReducedMotion || isStoryInView;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) setIsStoryInView(true);
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: [0, 0.2, 0.35] }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isVideoModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoModalOpen) {
      video.currentTime = 0;
      void video.play().catch(() => {
        /* autoplay policies: user already clicked open */
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isVideoModalOpen]);

  const closeModal = useCallback(() => {
    setIsVideoModalOpen(false);
    window.setTimeout(() => {
      openPlayRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Fragment>
      <section
        ref={sectionRef}
        className={`section home-history${reveal ? " home-history--in-view" : ""}`}
        aria-labelledby="servopa-story-title"
        data-node-id="664:4580"
      >
        <div className="home-history__media">
          <Image
            src={historyBg}
            alt="Fachada da concessionária Servopa Volkswagen"
            fill
            className="home-history__bg-img"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className="home-history__veil" aria-hidden />
        <div className="home-history__content">
          <h2 id="servopa-story-title" className="home-history__title">
            <strong>Fundado em 1955, o Grupo Servopa</strong> é um dos maiores grupos automotivos do Brasil
          </h2>
          <button
            ref={openPlayRef}
            id="abrir_video_servopa_play"
            type="button"
            className="home-history__play-cluster"
            aria-label="Abrir vídeo Servopa Play"
            aria-haspopup="dialog"
            aria-expanded={isVideoModalOpen}
            aria-controls="home-servopa-play-video-modal"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <span className="home-history__play-visual" aria-hidden>
              <span className="home-history__play-bg" />
              <span className="home-history__play-stroke" />
              <span className="home-history__play-icon" />
            </span>
            <span className="home-history__play-copy">
              <strong>Servopa Play</strong>
              <span>
                Review da nossa concessionária
                <br />
                com mais de 70 anos de tradição.
              </span>
            </span>
          </button>
        </div>
      </section>

      {isVideoModalOpen && (
        <div
          className="home-history__modal-backdrop"
          role="presentation"
          onMouseDown={() => closeModal()}
        >
          <div
            id="home-servopa-play-video-modal"
            className="home-history__modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={videoModalTitleId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="home-history__modal-header">
              <h2 id={videoModalTitleId} className="home-history__modal-title">
                Servopa Play
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                className="home-history__modal-close"
                aria-label="Fechar vídeo"
                onClick={() => closeModal()}
              />
            </header>
            <div className="home-history__modal-video-wrap">
              <video
                ref={videoRef}
                className="home-history__modal-video"
                controls
                playsInline
                preload="metadata"
                poster={historyBg}
                aria-label="Vídeo Servopa Play sobre a concessionária"
              >
                <source src={historyVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
