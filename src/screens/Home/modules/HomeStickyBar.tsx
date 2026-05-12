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
          className="home-sticky-bar__countdown"
          role="region"
          aria-label="Tempo restante até o Feirão Servopa em dias, horas, minutos e segundos"
          aria-live="polite"
        >
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value">{days}</strong>
            <span className="home-sticky-bar__time-label">Dias</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value">{hours}</strong>
            <span className="home-sticky-bar__time-label">Horas</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value">{minutes}</strong>
            <span className="home-sticky-bar__time-label">Minutos</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value">{seconds}</strong>
            <span className="home-sticky-bar__time-label">Segundos</span>
          </div>
        </div>

        <div className="home-sticky-bar__cta">
          <button type="button" className="home-sticky-bar__test-drive-btn">
            Formulário de Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeStickyBar;
