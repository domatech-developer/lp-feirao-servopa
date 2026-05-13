"use client";

import { useEffect, useRef, useState } from "react";

import { useHomeFormModal } from "../HomeFormModalContext";

const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";
const footerCardBg = "/images/82ae1ce451dd66d07090abc04aea64d4f90c17eb.png";
const agencyLogo = "/images/c494d98b8cdc72971d9e18e4a4c1aba1e5bd5e31.svg";

/** Ordem centro → lados (animação de entrada). Anexos 3–7 → posições esq. → dir. */
const FOOTER_CTA_STAR_SRC = [
  "/images/footer-cta-star-0.png",
  "/images/footer-cta-star-1.png",
  "/images/footer-cta-star-2.png",
  "/images/footer-cta-star-3.png",
  "/images/footer-cta-star-4.png",
] as const;

/** Ordem centro → lados. */
const FOOTER_CTA_STAR_ENTER_DELAYS_S = [0.108, 0.072, 0.042, 0.072, 0.108] as const;

const FooterCtaRibbonBadge = () => (
  <div className="home-footer__cta-badge" aria-hidden>
    <svg className="home-footer__cta-badge-svg" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="homeFooterCtaBadgeFace" x1="28" y1="6" x2="28" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00c868" />
          <stop offset="1" stopColor="#00964a" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="26.5" fill="url(#homeFooterCtaBadgeFace)" stroke="#f6d24a" strokeWidth="2.25" />
      <path
        d="M17 28.5l7.2 7.2L39 20.8"
        fill="none"
        stroke="#f6d24a"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const FooterCtaStars = () => (
  <div className="home-footer__cta-stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className={`home-footer__cta-star home-footer__cta-star--${i}`}
        style={
          { "--home-footer-star-delay": `${FOOTER_CTA_STAR_ENTER_DELAYS_S[i]}s` } as React.CSSProperties
        }
      >
        <img src={FOOTER_CTA_STAR_SRC[i]} alt="" className="home-footer__cta-star-img" draggable={false} />
      </div>
    ))}
  </div>
);

const FooterCtaFieldCorner = ({ className, gradId }: { className: string; gradId: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 66 66"
    width="66"
    height="66"
    fill="none"
    aria-hidden
  >
    <defs>
      <linearGradient id={gradId} x1="8" y1="58" x2="58" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00b55f" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fb0" stopOpacity="0.35" />
      </linearGradient>
    </defs>
    <path
      pathLength={1}
      d="M8 58C8 28.8 28.8 8 58 8"
      stroke={`url(#${gradId})`}
      strokeWidth="2.25"
      strokeLinecap="round"
    />
  </svg>
);

const FooterSection = () => {
  const { openFeiraoFormModal } = useHomeFormModal();
  const footerCtaShellRef = useRef<HTMLDivElement>(null);
  const [footerCtaStarsReveal, setFooterCtaStarsReveal] = useState(false);

  useEffect(() => {
    if (footerCtaStarsReveal) return;

    const root = footerCtaShellRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFooterCtaStarsReveal(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterCtaStarsReveal(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [footerCtaStarsReveal]);

  return (
    <footer id="feirao-rodape" className="home-footer">
      <div className="home-footer__top">
        <div className="home-footer__brand">
          <img src={servopaLogo} alt="Grupo Servopa" className="home-footer__logo" />
          <p>Feirão de Verdade é aqui.</p>
        </div>

        <div
          ref={footerCtaShellRef}
          className={`home-footer__cta-card-shell${footerCtaStarsReveal ? " home-footer__cta-card-shell--stars-reveal" : ""}`}
        >
          <div className="home-footer__cta-card" data-node-id="1313:23173">
            <div className="home-footer__cta-bg-layer" aria-hidden="true">
              <div className="home-footer__cta-bg-tint" />
              <img src={footerCardBg} alt="" className="home-footer__cta-bg" />
            </div>

            <div className="home-footer__cta-decor" aria-hidden="true">
              <div className="home-footer__cta-field-silhouette" />
            </div>

            <div className="home-footer__cta-stars-wrap" aria-hidden>
              <FooterCtaStars />
            </div>

            <div className="home-footer__cta-stack">
              <div className="home-footer__cta-ribbon">
                <div className="home-footer__cta-ribbon-visual" aria-hidden="true">
                <svg
                  className="home-footer__cta-ribbon-svg"
                  viewBox="0 0 658 72"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="homeFooterRibbonFill" x1="329" y1="10" x2="329" y2="62" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00c45f" />
                      <stop offset="1" stopColor="#008a46" />
                    </linearGradient>
                    <linearGradient id="homeFooterRibbonStroke" x1="0" y1="36" x2="658" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffe566" />
                      <stop offset="0.5" stopColor="#f6c316" />
                      <stop offset="1" stopColor="#e6a800" />
                    </linearGradient>
                    <filter id="homeFooterRibbonShadow" x="-6%" y="-30%" width="112%" height="160%">
                      <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#000" floodOpacity="0.38" />
                    </filter>
                  </defs>
                  <g filter="url(#homeFooterRibbonShadow)">
                    <polygon
                      points="0,36 22,5 636,5 658,36 636,67 22,67"
                      fill="url(#homeFooterRibbonFill)"
                      stroke="url(#homeFooterRibbonStroke)"
                      strokeWidth="2.25"
                      strokeLinejoin="miter"
                    />
                  </g>
                </svg>
                </div>
                <div className="home-footer__cta-ribbon-row">
                <div className="home-footer__cta-ribbon-gutter">
                  <FooterCtaRibbonBadge />
                </div>
                <p className="home-footer__cta-ribbon-title">
                  Escolha sua marca e entre em campo no feirão
                </p>
                <div className="home-footer__cta-ribbon-gutter home-footer__cta-ribbon-gutter--balance" aria-hidden />
                </div>
              </div>

              <div className="home-footer__cta-copy">
              <p>
                Selecione a marca de interesse e, em seguida, escolha a concessionária participante
                mais conveniente para o seu atendimento.
              </p>
              <button type="button" className="home-footer__cta-link" onClick={() => openFeiraoFormModal()}>
                <span>Escolha sua marca</span>
                <span className="home-footer__cta-arrow" aria-hidden />
              </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="home-footer__links" aria-label="Links do rodapé">
          <button type="button" className="home-footer__text-link">
            Regulamento
          </button>
          <button type="button" className="home-footer__text-link">
            Política de Privacidade
          </button>
          <button type="button" className="home-footer__text-link">
            Termos de Uso
          </button>
        </nav>
      </div>

      <div className="home-footer__legal">
        <div className="home-footer__legal-inner">
          <p className="home-footer__legal-block">
            <span>Promoção válida conforme </span>
            <button type="button" className="home-footer__legal-term">
              regulamento
            </button>
            <span>
              . Imagens meramente ilustrativas. Condições, modelos, brindes, unidades participantes
              e disponibilidade de veículos sujeitos às regras da campanha.
            </span>
            <br />
            <br />
            O Grupo Servopa foi fundado em 1955, atuando nos segmentos de concessionárias de
            automóveis, caminhões, motocicletas e consórcio, além de outros serviços ligados
            diretamente ao setor automotivo. Sendo um dos maiores e melhores grupos do país,
            trabalhamos para garantir solidez, credibilidade, segurança e confiança, pilares
            essenciais que fazem parte da nossa identidade. Hoje, o Grupo Servopa atua em toda a
            região Sul do país e atende seus mais de 300 mil clientes com total dedicação, que ao
            longo dos anos ajudaram a escrever uma história de sucesso.
          </p>
          <p className="home-footer__legal-contact">
            Entre em contato com a gente pelo formulário, whatsapp ou telefone ou e-mail
            sac@gruposervopa.com.br.
          </p>
        </div>
      </div>

      <div className="home-footer__bottom">
        <span className="home-footer__copyright">
          © Copyright 2026 - Servopa. Todos os direitos reservados.
        </span>
        <a
          className="home-footer__made-by"
          href="https://www.domatech.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito por: <img src={agencyLogo} alt="Domatech" />
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
