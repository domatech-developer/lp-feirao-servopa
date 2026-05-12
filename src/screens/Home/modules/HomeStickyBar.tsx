"use client";

import { useEffect, useState } from "react";
import { useFeiraoCountdown } from "../FeiraoCountdownContext";

const SHOW_AFTER_SCROLL_PX = 80;
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const HomeStickyBar = () => {
  const [visible, setVisible] = useState(false);
  const { days, hours, minutes, seconds } = useFeiraoCountdown();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`home-sticky-bar${visible ? " home-sticky-bar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="home-sticky-bar__panel">
        <div className="home-sticky-bar__brand">
          <span className="home-sticky-bar__badge">Feirão DE VERDADE</span>
          <img src={logoServopa} alt="Grupo Servopa" className="home-sticky-bar__servopa-logo" />
        </div>

        <div
          className="home-sticky-bar__countdown-card"
          data-node-id="1239:4401"
          role="region"
          aria-labelledby="home-sticky-bar-countdown-label"
        >
          <p id="home-sticky-bar-countdown-label" className="home-sticky-bar__countdown-title">
            Dias para o Feirão Servopa:
          </p>
          <div className="home-sticky-bar__countdown-values" aria-live="polite">
            <div>
              <strong>{days}</strong>
              <span>Dias</span>
            </div>
            <div>
              <strong>{hours}</strong>
              <span>Horas</span>
            </div>
            <div>
              <strong>{minutes}</strong>
              <span>Minutos</span>
            </div>
            <div>
              <strong>{seconds}</strong>
              <span>Segundos</span>
            </div>
          </div>
        </div>

        <div className="home-sticky-bar__cta">
          <button type="button" className="home-pill-btn home-pill-btn--text-only">
            Formulário de Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeStickyBar;
