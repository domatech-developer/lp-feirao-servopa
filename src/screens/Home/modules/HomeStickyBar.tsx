"use client";

import { useEffect, useState } from "react";
import { GTM_BUTTON } from "@/constants/gtmButtons";
import { sendGTMEvent } from "@next/third-parties/google";
import { useFeiraoCountdown } from "../FeiraoCountdownContext";
import { useHomeFormModal } from "../HomeFormModalContext";

const SHOW_AFTER_SCROLL_DESKTOP_PX = 80;

const getShowAfterScrollPx = () => {
  if (typeof window === "undefined") return SHOW_AFTER_SCROLL_DESKTOP_PX;
  return window.matchMedia("(max-width: 900px)").matches
    ? Math.round(window.innerHeight * 0.92)
    : SHOW_AFTER_SCROLL_DESKTOP_PX;
};
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";
const heroBadge = "/images/1bfa78d186eb2753576470238f528a052d0138d4.webp";

const HomeStickyBar = () => {
  const [visible, setVisible] = useState(false);
  const { days, hours, minutes, seconds } = useFeiraoCountdown();
  const { openFeiraoFormModal } = useHomeFormModal();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > getShowAfterScrollPx());
    };
    const onResize = () => handleScroll();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`home-sticky-bar${visible ? " home-sticky-bar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <img
        src={heroBadge}
        alt="Fazendo um test drive"
        className="home-sticky-bar__hero-badge"
      />
      <div className="home-sticky-bar__panel">
        <div className="home-sticky-bar__brand">
          <span className="home-sticky-bar__badge">Feirão DE VERDADE</span>
          <img src={logoServopa} alt="Grupo Servopa" className="home-sticky-bar__servopa-logo" />
        </div>

        {/* <div
          className="home-sticky-bar__countdown"
          role="region"
          aria-label="Tempo restante até o Feirão Servopa em dias, horas, minutos e segundos"
          aria-live="polite"
        >
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value" suppressHydrationWarning>
              {days}
            </strong>
            <span className="home-sticky-bar__time-label">Dias</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value" suppressHydrationWarning>
              {hours}
            </strong>
            <span className="home-sticky-bar__time-label">Horas</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value" suppressHydrationWarning>
              {minutes}
            </strong>
            <span className="home-sticky-bar__time-label">Min</span>
          </div>
          <div className="home-sticky-bar__time-unit">
            <strong className="home-sticky-bar__time-value" suppressHydrationWarning>
              {seconds}
            </strong>
            <span className="home-sticky-bar__time-label">Seg</span>
          </div>
        </div> */}

        <div className="home-sticky-bar__cta">
          <button
            type="button"
            className="home-sticky-bar__test-drive-btn"
            data-gtm={GTM_BUTTON.STICKY_FORMULARIO_TEST_DRIVE}
            onClick={() => {
              sendGTMEvent({
                event: `button_clicked_${GTM_BUTTON.STICKY_FORMULARIO_TEST_DRIVE}`,
                value: GTM_BUTTON.STICKY_FORMULARIO_TEST_DRIVE,
              });
              openFeiraoFormModal();
            }}
          >
            Formulário de Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeStickyBar;
