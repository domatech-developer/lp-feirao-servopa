"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL_PX = 80;
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const HomeStickyBar = () => {
  const [visible, setVisible] = useState(false);

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

        <div className="home-sticky-bar__countdown" aria-live="polite">
          <div>
            <strong>23</strong>
            <span>Dias</span>
          </div>
          <div>
            <strong>12</strong>
            <span>Horas</span>
          </div>
          <div>
            <strong>11</strong>
            <span>Minutos</span>
          </div>
          <div>
            <strong>12</strong>
            <span>Segundos</span>
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
