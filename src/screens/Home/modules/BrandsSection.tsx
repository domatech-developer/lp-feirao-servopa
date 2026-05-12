"use client";

import { useEffect, useState } from "react";
import { useHomeFormModal } from "../HomeFormModalContext";

const selectedBrandLogo = "/images/60a67738f8f949e78b7f2cb8deb87400.png";
const brandVwMuted = "/images/fb06e28adab84700991e3a659c4860cb.png";
const brandBydMuted = "/images/brandBydMuted.png";
const brandByd = "/images/213f6b0f111247d88288496683f696d9.png";
const brandAudi = "/images/282a55849ff04151b0a4570bdc1fc346.png";
const brandAudiMuted = "/images/brandAudiMuted.png";
const brandVwco = "/images/ef153a967ffd465f98e4f655240030d2.png";
const brandVwcoMuted = "/images/brandVwcoMuted.png";
const brandCitroen = "/images/c7b7133f47844540a9b40b5aeb8723c3.png";
const brandCitroenMuted = "/images/brandCitroenMuted.png";
const brandVolvo = "/images/2f784c237fb14e0f9726c9da75a91666.png";
const brandVolvoMuted = "/images/brandVolvoMuted.png";
const brandHonda = "/images/e3316d3b0e6447399ce47ecf64084885.png";
const brandHondaMuted = "/images/brandHondaMuted.png";
const brandHyundai = "/images/03b91d4537cf42e19f8beb3b7d18defd.png";
const brandHyundaiMuted = "/images/brandHyundaiMuted.png";
const brandTriumph = "/images/a2e3240d9c514943b1852b6d77bf974c.png";
const brandTriumphMuted = "/images/brandTriumphMuted.png";
const brandHarley = "/images/6261006d710b4a72b50d69f894644078.png";
const brandHarleyMuted = "/images/brandHarleyMuted.png";
const brandPeugeot = "/images/ee91c48ccd84514bb24ac645a4c57a.png";
const brandPeugeotMuted = "/images/brandPeugeotMuted.png";
const brandGac = "/images/f2917c2bb1404b599e6536b60feffb9e.png";
const brandGacMuted = "/images/brandGacMuted.png";
const brandSeminovos = "/images/34bca46728434a7cb2ba8589ee4c3760.png";
const brandSeminovosMuted = "/images/brandSeminovosMuted.png";
const brandsHarleyBanner = "/images/53a4c955269f4a5a9501e026eafedae3.png";
const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";

type BrandTone = "blue" | "red" | "black";

type BrandItem = {
  name: string;
  logo: string | null;
  logoMuted?: string;
  shield: string;
};

const brands = [
  {
    name: "Volkswagen",
    logo: selectedBrandLogo,
    logoMuted: brandVwMuted,
    shield: "/images/shieldVw.png",
  },
  { 
    name: "BYD", 
    logo: brandByd, 
    logoMuted: brandBydMuted,
    shield: "/images/shieldByd.png", 
  },
  { 
    name: "Audi", 
    logo: brandAudi, 
    logoMuted: brandAudiMuted, 
    shield: "/images/shieldAudi.png", 
  },
  { 
    name: "VWCO", 
    logo: brandVwco, 
    logoMuted: brandVwcoMuted,
    shield: "/images/shieldVwco.png", 
  },
  { 
    name: "Citroën", 
    logo: brandCitroen, 
    logoMuted: brandCitroenMuted,
    shield: "/images/shieldCitroen.png", 
  },
  { 
    name: "Volvo", 
    logo: brandVolvo, 
    logoMuted: brandVolvoMuted,
    shield: "/images/shieldVolvo.png", 
  },
  { 
    name: "Honda", 
    logo: brandHonda,
    logoMuted: brandHondaMuted,
    shield: "/images/shieldHonda.png", 
  },
  { 
    name: "Hyundai", 
    logo: brandHyundai, 
    logoMuted: brandHyundaiMuted,
    shield: "/images/shieldHyundai.png", 
  },
  { 
    name: "Triumph", 
    logo: brandTriumph, 
    logoMuted: brandTriumphMuted,
    shield: "/images/shieldTriumph.png", 
  },
  { 
    name: "Harley Davidson", 
    logo: brandHarley, 
    logoMuted: brandHarleyMuted,
    shield: "/images/shieldHarley.png", 
  },
  { 
    name: "Peugeot", 
    logo: brandPeugeot, 
    logoMuted: brandPeugeotMuted,
    shield: "/images/shieldPeugeot.png", 
  },
  { 
    name: "GAC", 
    logo: brandGac, 
    logoMuted: brandGacMuted,
    tone: "black", 
    shield: "/images/shieldGac.png", 
  },
  { 
    name: "Servopa Seminovos", 
    logo: brandSeminovos, 
    logoMuted: brandSeminovosMuted,
    shield: "/images/shieldSeminovos.png", 
  },
] as BrandItem[];

const toneClassMap: Record<BrandTone, string> = {
  blue: "home-brands__shield-card--blue",
  red: "home-brands__shield-card--red",
  black: "home-brands__shield-card--black",
};

const BrandsSection = () => {
  const { openFeiraoFormModal } = useHomeFormModal();
  const [activeBrand, setActiveBrand] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBrand((prev) => (prev + 1) % brands.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  const currentBrand = brands[activeBrand];

  const onPrev = () => {
    setActiveBrand((prev) => (prev - 1 + brands.length) % brands.length);
  };

  const onNext = () => {
    setActiveBrand((prev) => (prev + 1) % brands.length);
  };

  return (
    <section className="home-brands">
      <div className="home-brands__top">
        <div className="home-brands__left">
          <h2>Grandes marcas reunidas em um só Feirão</h2>
          <p>
            Do carro zero ao seminovo, o Feirão reúne diferentes possibilidades
            para cada momento da sua vida.
          </p>

          <div className="home-brands__grid">
            {brands.map((brand, index) => (
              <button
                key={brand.name}
                type="button"
                className={`home-brands__item ${index === activeBrand ? "home-brands__item--selected" : ""}`}
                onClick={() => setActiveBrand(index)}
              >
                {brand.logo ? (
                  <img
                    src={index === activeBrand ? brand.logo : (brand.logoMuted ?? brand.logo)}
                    alt={brand.name}
                    className={`home-brands__item-logo ${brand.logoMuted ? "home-brands__item-logo--dual" : "home-brands__item-logo--filter"}`}
                  />
                ) : (
                  <span>{brand.name}</span>
                )}
              </button>
            ))}
            <div className="home-brands__item home-brands__item--servopa" aria-hidden="true">
              <img src={servopaLogo} alt="Grupo Servopa" />
            </div>
          </div>
        </div>

        <div className="home-brands__right">
          <p className="home-brands__counter">
            {activeBrand + 1}/{brands.length}
          </p>
          <button className="home-brands__nav home-brands__nav--left" type="button" aria-label="Anterior" onClick={onPrev}>
            &#8249;
          </button>
          <div className="home-brands__shield-card" key={currentBrand.shield}>
            <img src={currentBrand.shield} alt="" className="home-brands__shield-layer" />
            

          </div>
          <button className="home-brands__nav home-brands__nav--right" type="button" aria-label="Proximo" onClick={onNext}>
            &#8250;
          </button>
          <button type="button" className="home-brands__cta" onClick={() => openFeiraoFormModal()}>
            Encontrar concessionária
          </button>
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
            Escolha um modelo participante, faça seu test drive durante o período
            da campanha e participe da promoção conforme as regras do regulamento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
