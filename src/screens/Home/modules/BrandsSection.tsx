"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GTM_BUTTON } from "@/constants/gtmButtons";
import { sendGTMEvent } from "@next/third-parties/google";
import { useHomeFormModal } from "../HomeFormModalContext";

const selectedBrandLogo = "/images/60a67738f8f949e78b7f2cb8deb87400.webp";
const brandVwMuted = "/images/fb06e28adab84700991e3a659c4860cb.webp";
const brandBydMuted = "/images/brandBydMuted.webp";
const brandByd = "/images/213f6b0f111247d88288496683f696d9.webp";
const brandAudi = "/images/282a55849ff04151b0a4570bdc1fc346.webp";
const brandAudiMuted = "/images/brandAudiMuted.webp";
const brandVwco = "/images/ef153a967ffd465f98e4f655240030d2.webp";
const brandVwcoMuted = "/images/brandVwcoMuted.webp";
const brandCitroen = "/images/c7b7133f47844540a9b40b5aeb8723c3.webp";
const brandCitroenMuted = "/images/brandCitroenMuted.webp";
const brandVolvo = "/images/2f784c237fb14e0f9726c9da75a91666.webp";
const brandVolvoMuted = "/images/brandVolvoMuted.webp";
const brandHonda = "/images/e3316d3b0e6447399ce47ecf64084885.webp";
const brandHondaMuted = "/images/brandHondaMuted.webp";
const brandHyundai = "/images/03b91d4537cf42e19f8beb3b7d18defd.webp";
const brandHyundaiMuted = "/images/brandHyundaiMuted.webp";
const brandTriumph = "/images/a2e3240d9c514943b1852b6d77bf974c.webp";
const brandTriumphMuted = "/images/brandTriumphMuted.webp";
const brandHarley = "/images/6261006d710b4a72b50d69f894644078.webp";
const brandHarleyMuted = "/images/brandHarleyMuted.webp";
const brandPeugeot = "/images/ee91c48ccd84514bb24ac645a4c57a.webp";
const brandPeugeotMuted = "/images/brandPeugeotMuted.webp";
const brandGac = "/images/f2917c2bb1404b599e6536b60feffb9e.webp";
const brandGacMuted = "/images/brandGacMuted.webp";
const brandSeminovos = "/images/34bca46728434a7cb2ba8589ee4c3760.webp";
const brandSeminovosMuted = "/images/brandSeminovosMuted.webp";
const brandsHarleyBanner = "/images/53a4c955269f4a5a9501e026eafedae3.webp";
const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";

type BrandItem = {
  name: string;
  logo: string | null;
  logoMuted?: string;
  shield: string;
};

const brands: BrandItem[] = [
  {
    name: "Volkswagen",
    logo: selectedBrandLogo,
    logoMuted: brandVwMuted,
    shield: "/images/shieldVW.webp",
  },
  {
    name: "BYD",
    logo: brandByd,
    logoMuted: brandBydMuted,
    shield: "/images/shieldBYD.webp",
  },
  {
    name: "Audi",
    logo: brandAudi,
    logoMuted: brandAudiMuted,
    shield: "/images/shieldAUDI.webp",
  },
  {
    name: "VWCO",
    logo: brandVwco,
    logoMuted: brandVwcoMuted,
    shield: "/images/shieldVWCO.webp",
  },
  {
    name: "Citroën",
    logo: brandCitroen,
    logoMuted: brandCitroenMuted,
    shield: "/images/shieldCITROEN.webp",
  },
  {
    name: "Volvo",
    logo: brandVolvo,
    logoMuted: brandVolvoMuted,
    shield: "/images/shieldVOLVO.webp",
  },
  {
    name: "Honda",
    logo: brandHonda,
    logoMuted: brandHondaMuted,
    shield: "/images/shieldHONDA.webp",
  },
  {
    name: "Hyundai",
    logo: brandHyundai,
    logoMuted: brandHyundaiMuted,
    shield: "/images/shieldHYUNDAI.webp",
  },
  {
    name: "Triumph",
    logo: brandTriumph,
    logoMuted: brandTriumphMuted,
    shield: "/images/shieldTRIUMPH.webp",
  },
  {
    name: "Harley Davidson",
    logo: brandHarley,
    logoMuted: brandHarleyMuted,
    shield: "/images/shieldHARLEY.webp",
  },
  {
    name: "Peugeot",
    logo: brandPeugeot,
    logoMuted: brandPeugeotMuted,
    shield: "/images/shieldPEUGEOT.webp",
  },
  {
    name: "GAC",
    logo: brandGac,
    logoMuted: brandGacMuted,
    shield: "/images/shieldGAC.webp",
  },
  {
    name: "Servopa Seminovos",
    logo: brandSeminovos,
    logoMuted: brandSeminovosMuted,
    shield: "/images/shieldSeminovos.webp",
  },
];

const BRAND_ROTATE_MS = 3500;

const BrandsSection = () => {
  const { openFeiraoFormModal } = useHomeFormModal();
  const [activeBrand, setActiveBrand] = useState(0);
  const brandsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const advance = () => {
      setActiveBrand((prev) => (prev + 1) % brands.length);
    };

    // let timer = window.setInterval(advance, BRAND_ROTATE_MS);

    // const onVisibility = () => {
    //   window.clearInterval(timer);
    //   if (document.visibilityState === "visible") {
    //     timer = window.setInterval(advance, BRAND_ROTATE_MS);
    //   }
    // };

    // document.addEventListener("visibilitychange", onVisibility);
    // return () => {
    //   window.clearInterval(timer);
    //   document.removeEventListener("visibilitychange", onVisibility);
    // };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const grid = brandsGridRef.current;
    const selected = grid?.querySelector<HTMLElement>(".home-brands__item--selected");
    if (!selected || !grid) return;

    const gridRect = grid.getBoundingClientRect();
    const itemRect = selected.getBoundingClientRect();
    const padding = 8;
    const isFullyVisible =
      itemRect.left >= gridRect.left + padding && itemRect.right <= gridRect.right - padding;

    if (isFullyVisible) return;

    selected.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeBrand]);

  const selectBrand = useCallback((index: number) => {
    setActiveBrand(index);
  }, []);

  const onPrev = () => {
    setActiveBrand((prev) => (prev - 1 + brands.length) % brands.length);
  };

  const onNext = () => {
    setActiveBrand((prev) => (prev + 1) % brands.length);
  };

  return (
    <section id="feirao-marcas" className="home-brands" data-node-id="1368:95680">
      <div className="home-brands__top">
        <div className="home-brands__left">
          <h2>
            <span className="home-brands__title-line">Grandes marcas reunidas</span>
            <span className="home-brands__title-line">em um só Feirão</span>
          </h2>
          <p>
            Do carro zero ao seminovo, o Feirão reúne diferentes possibilidades para cada momento da sua
            vida.
          </p>

          <div ref={brandsGridRef} className="home-brands__grid">
            {brands.map((brand, index) => (
              <button
                key={brand.name}
                type="button"
                className={`home-brands__item${index === activeBrand ? " home-brands__item--selected" : ""}`}
                onClick={() => selectBrand(index)}
              >
                {brand.logo ? (
                  brand.logoMuted ? (
                    <>
                      <img
                        src={brand.logoMuted}
                        alt=""
                        aria-hidden
                        className={`home-brands__item-logo home-brands__item-logo--dual home-brands__item-logo--muted${index === activeBrand ? " home-brands__item-logo--hidden" : ""}`}
                      />
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className={`home-brands__item-logo home-brands__item-logo--dual home-brands__item-logo--active${index === activeBrand ? "" : " home-brands__item-logo--hidden"}`}
                      />
                    </>
                  ) : (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="home-brands__item-logo home-brands__item-logo--filter"
                    />
                  )
                ) : (
                  <span>{brand.name}</span>
                )}
              </button>
            ))}
            <div className="home-brands__item home-brands__item--servopa" aria-hidden="true">
              <img src={servopaLogo} alt="" />
            </div>
          </div>
        </div>

        <div className="home-brands__right">
          <p className="home-brands__counter">
            {activeBrand + 1}/{brands.length}
          </p>

          <div className="home-brands__shield-stage">
            <div className="home-brands__shield-card" aria-label={brands[activeBrand].name}>
              <div className="home-brands__shield-stack">
                {brands.map((brand, index) => (
                  <img
                    key={brand.shield}
                    src={brand.shield}
                    alt=""
                    aria-hidden={index !== activeBrand ? true : undefined}
                    className={`home-brands__shield-layer${index === activeBrand ? " home-brands__shield-layer--visible" : ""}`}
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="home-brands__dock">
            <button className="home-brands__nav home-brands__nav--left" type="button" aria-label="Anterior" onClick={onPrev}>
              <span className="home-brands__nav-icon home-brands__nav-icon--left" aria-hidden />
            </button>
            <button
              type="button"
              className="home-brands__cta"
              data-gtm={GTM_BUTTON.BRANDS_ENCONTRAR_CONCESSIONARIA}
              onClick={() => {
                sendGTMEvent({
                  event: `button_clicked_${GTM_BUTTON.BRANDS_ENCONTRAR_CONCESSIONARIA}`,
                  value: GTM_BUTTON.BRANDS_ENCONTRAR_CONCESSIONARIA,
                });
                openFeiraoFormModal();
              }}
            >
              <span>Encontrar concessionária</span>
              <span className="home-brands__cta-arrow" aria-hidden />
            </button>
            <button className="home-brands__nav home-brands__nav--right" type="button" aria-label="Proximo" onClick={onNext}>
              <span className="home-brands__nav-icon home-brands__nav-icon--right" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="home-brands__bottom">
        <img
          src={brandsHarleyBanner}
          alt=""
          className="home-brands__bottom-cover"
          loading="lazy"
        />
        <div className="home-brands__bottom-overlay">
          <h3>Faça um test drive e concorra a uma Harley-Davidson</h3>
          <p>
            Escolha um modelo participante, faça seu test drive durante o período da campanha e participe
            da promoção conforme as regras do regulamento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
