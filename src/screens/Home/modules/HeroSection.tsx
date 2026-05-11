"use client";

import type { CSSProperties } from "react";
import { useFeiraoCountdown } from "../FeiraoCountdownContext";

/** Hashes conferem exports do arquivo Figma (via figma-desktop MCP). */
const heroBg = "/images/632d51ff85c8ed6c1bdbb0919f75ba3978979823.png";
const heroLights = "/images/9f2a548355039383ccd5426d07e4cc97604dec46.png";
const heroLogoCenter = "/images/f56571d554c8c63415e1603fb811f912b24edf97.png";
const heroCarsPack = "/images/e8b2d53eaed42b1e9bce76b3f93d8296bc04e4e5.png";
const heroSpotlight = "/images/e17fa784dbf32b090e821215ec40ab4db0102926.png";
const heroSpotlightMask = "/images/31e84058ba064b786875a6e25c656eaf320046b6.svg";
const heroEllipseL = "/images/a88f7e659f0c93b47be26fc0417d6a6783034307.svg";
const heroEllipseR = "/images/41149f21a97812159c4a97f400a27feccc7bf415.svg";
const heroBall = "/images/e2844ba54253a1472bfd421b9191a63d0b6809cb.png";

const heroBadge = "/images/1bfa78d186eb2753576470238f528a052d0138d4.png";
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const spotlightMaskCss = `url("${heroSpotlightMask}")`;

const HeroSection = () => {
  const { days, hours, minutes, seconds } = useFeiraoCountdown();

  return (
    <section className="home-hero" aria-labelledby="home-hero-countdown-label">
      <div className="home-hero__backdrop" aria-hidden="true">
        <div className="home-hero__stage-bound">
          <div className="home-hero__stage" data-node-id="1239:4338">
            <div className="home-hero__layer home-hero__layer--bg" data-node-id="1239:4309">
              <div className="home-hero__bg-crop">
                <img alt="" src={heroBg} className="home-hero__bg-img" fetchPriority="high" />
              </div>
              <div className="home-hero__bg-vignette">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1366 682"
                  width="1366"
                  height="682"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient
                      id="homeHeroFigVignette"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="matrix(0.61989 33.3 -66.698 0.97742 773.17 341)"
                      cx="0"
                      cy="0"
                      r="10"
                    >
                      <stop offset="0" stopColor="rgb(0,0,0)" stopOpacity={0} />
                      <stop offset="1" stopColor="rgb(0,6,20)" stopOpacity={1} />
                    </radialGradient>
                  </defs>
                  <rect x="0" y="0" width="1366" height="682" fill="url(#homeHeroFigVignette)" opacity={0.8} />
                </svg>
              </div>
            </div>

            <div className="home-hero__layer home-hero__layer--lights" data-node-id="1239:4435">
              <div className="home-hero__lights-crop">
                <img alt="" src={heroLights} className="home-hero__lights-img" />
              </div>
            </div>

            <div className="home-hero__layer home-hero__layer--brand" data-node-id="1239:4310">
              <img alt="Feirão de Verdade" src={heroLogoCenter} className="home-hero__brand-main" />
            </div>

            <div className="home-hero__layer home-hero__layer--spotlight home-hero__layer--spotlight-left" data-node-id="1239:4311">
              <div
                className="home-hero__spotlight-mask"
                style={
                  {
                    maskImage: spotlightMaskCss,
                    WebkitMaskImage: spotlightMaskCss,
                  } as CSSProperties
                }
              >
                <img alt="" src={heroSpotlight} className="home-hero__spotlight-fill" />
              </div>
            </div>

            <div className="home-hero__layer home-hero__layer--spotlight home-hero__layer--spotlight-right" data-node-id="1239:4314">
              <div className="home-hero__spotlight-flip">
                <div
                  className="home-hero__spotlight-mask"
                  style={
                    {
                      maskImage: spotlightMaskCss,
                      WebkitMaskImage: spotlightMaskCss,
                    } as CSSProperties
                  }
                >
                  <img alt="" src={heroSpotlight} className="home-hero__spotlight-fill" />
                </div>
              </div>
            </div>

            <div className="home-hero__layer home-hero__layer--brand-ghost" data-node-id="1239:4317">
              <img alt="" src={heroLogoCenter} className="home-hero__brand-ghost" />
            </div>

            <div className="home-hero__layer home-hero__layer--cars" data-node-id="1239:4318">
              <img alt="" src={heroCarsPack} className="home-hero__cars-img" />
            </div>

            <div className="home-hero__particles" />

            <div className="home-hero__ball home-hero__ball--a" data-node-id="1249:4458">
              <img alt="" src={heroBall} className="home-hero__ball-img" />
            </div>
            <div className="home-hero__ball home-hero__ball--b" data-node-id="1249:4453">
              <img alt="" src={heroBall} className="home-hero__ball-img" />
            </div>

            <div className="home-hero__ribbon home-hero__ribbon--l" data-node-id="1239:4319">
              <span className="home-hero__ribbon-rot">
                <img alt="" src={heroEllipseL} className="home-hero__ribbon-svg" />
              </span>
            </div>

            <div className="home-hero__ribbon home-hero__ribbon--r" data-node-id="1239:4320">
              <span className="home-hero__ribbon-rot home-hero__ribbon-rot--r">
                <img alt="" src={heroEllipseR} className="home-hero__ribbon-svg" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="home-hero__shell">
        <header className="home-hero__top">
          <div className="home-hero__countdown-card">
            <p id="home-hero-countdown-label" className="home-hero__countdown-title">
              Dias para o Feirão Servopa:
            </p>
            <div className="home-hero__countdown-values" aria-live="polite">
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

          <div className="home-hero__top-logo">
            <img src={logoServopa} alt="Grupo Servopa" className="home-hero__top-logo-image" />
          </div>

          <div className="home-hero__actions">
            <button type="button" className="home-pill-btn home-pill-btn--hero-link">
              Localização
            </button>
            <button type="button" className="home-pill-btn home-pill-btn--hero-cta">
              Formulário de Test Drive
            </button>
          </div>
        </header>
      </div>

      <img src={heroBadge} alt="Fazendo um test drive" className="home-hero__badge" />
    </section>
  );
};

export default HeroSection;
