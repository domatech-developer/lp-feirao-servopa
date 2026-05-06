"use client";

import { useEffect, useState } from "react";

const shieldCard = "/images/4e429c76125d938488b26d387a62e982919660ca.svg";
const selectedBrandLogo = "/images/cb56872d14c91c55bf7d1de7b485845b6c70a80b.svg";
const brandByd = "/images/63417204204da78107d6fff2b2a84613edba8a0e.svg";
const brandAudi = "/images/f5c521fe7dd10a63db941acb50267a796901cbb3.svg";
const brandVwco = "/images/8939b54ff1859332803bae55d80be34bab830ae7.svg";
const brandCitroen = "/images/3b6154d815916f76742ab92b78c550b8d7cd9706.svg";
const brandVolvo = "/images/31ad57830112d2c3f96a5110b3dcc0008de5b2b3.svg";
const brandHonda = "/images/0ec0376f8f74844f527513a80a15e367fd7b9a2f.svg";
const brandHyundai = "/images/dde968ad96a6c4308b73df91a4c3999fa88520f5.svg";
const brandTriumph = "/images/3c022613c8f30170506a257b32c38e73c93c1af0.svg";
const brandHarley = "/images/796130d0d087916b2c6600c0eb200b737e3d839f.svg";
const brandPeugeot = "/images/8d929c172471261ee73177102117483315183ae0.svg";
const brandGac = "/images/a4f0fee19a1a80fa2ee8823bfa82725ee1f8f98a.svg";
const brandSeminovos = "/images/9d91e988f49a80ca659e5ef8e0da83bd67c56db6.svg";
const bg1 = "/images/af343aea90baaa11716b7a4ef845c79fb3191066.png";
const bg2 = "/images/b7ed814656d4dbb53a6fa6e0f5c14ab263ce3d21.png";
const bg3 = "/images/e5fbb564f651e1d7cb2fe73e60fb57f3a063d202.png";
const bg4 = "/images/90a7293d469a618aa39ed2f3b96bf2f253ff2777.png";
const bg5 = "/images/f88046a56967bd35c675bed29b646889cda7e700.png";
const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";
const flagDE = "/images/ec739a873faccad62661d933996eaa461958e9d5.svg";
const flagCN = "/images/0fe9f65e439fdcb40315cb493094751e68c1241c.svg";
const flagFR = "/images/0cc6af4b7baffe81d8e6c8340a40aad4897f855d.svg";
const flagSE = "/images/e3b991dda8170eca09236b897f3b91f006f8f582.svg";
const flagJP = "/images/7a3feda83af366312ee4e92ebb5ee9a01d279ef7.svg";
const flagKR = "/images/50039f4deddec1fdff377372770c8fb645f6d70b.svg";
const flagGB = "/images/5daeb3bbfc5842d50003d315355455b9e2fd7caf.svg";
const flagUS = "/images/868bd74c35f08ebe342c346bb2373e9c83f4ef44.svg";
const flagBR = "/images/f3550811c46cc63b00d917af6ed3f88fd862335a.svg";
const hyundaiShieldLogo = "/images/a9b20ed0ae8a889104dbd0670243c57be114ed72.svg";

type BrandTone = "blue" | "red" | "black";

type BrandItem = {
  name: string;
  logo: string | null;
  slogan: string;
  tone: BrandTone;
  shield: string;
  car: string;
  flag: string;
  shieldLogo?: string;
};

const brands = [
  { name: "Volkswagen", logo: selectedBrandLogo, slogan: "O clássico que joga em todas as posições.", tone: "blue", shield: "/images/d4c04a8cfef5756a0d6373a0feb1f70a4522c99c.png", car: "/images/52fb7d5c61f205e87895b10f5c0104fc5becb001.png", flag: flagDE },
  { name: "BYD", logo: brandByd, slogan: "O futuro da mobilidade já entrou em campo.", tone: "red", shield: "/images/0b4a4220475d9c31604d2d9a85d20cff3e489d5e.png", car: "/images/9546aadee0ce8d6bd8031ebe83fe263a35443a66.png", flag: flagCN },
  { name: "Audi", logo: brandAudi, slogan: "Performance premium para acelerar a decisão", tone: "black", shield: "/images/af5a1e0e79ba46bc184d0cf65a78058154b21ea3.png", car: "/images/a8ada89d3ef67a157ca8b1b3f4522843cd208285.png", flag: flagDE },
  { name: "VWCO", logo: brandVwco, slogan: "Força e confiança para quem move o jogo todos os dias", tone: "blue", shield: "/images/eec7dd300b0cb045c12c907fd740b1e80e24a46a.png", car: "/images/23ca75e86881f1c388564355b8df639424a069c0.png", flag: flagDE },
  { name: "Citroën", logo: brandCitroen, slogan: "Conforto e versatilidade para a rotina.", tone: "black", shield: "/images/232840d9a6c4e082421d0b3d614563e71b626a0d.png", car: "/images/a669f57ed653c6d80f1ae365e201cd34c7248e51.png", flag: flagFR },
  { name: "Volvo", logo: brandVolvo, slogan: "Segurança, tecnologia e sofisticação em cada movimento", tone: "blue", shield: "/images/f8de85c28cbebdcdb2076c6f7039cd03e454009a.png", car: "/images/7457ec05348da5a7d68804fd1fdfe306440eca36.png", flag: flagSE },
  { name: "Honda", logo: brandHonda, slogan: "Confiança e tecnologia para seguir em frente", tone: "red", shield: "/images/55bf6afb1432392239dab36abbcd3f8a20f2ef09.png", car: "/images/6d2898e95668d203c145c20ac1e0376c57eb7e90.png", flag: flagJP },
  { name: "Hyundai", logo: brandHyundai, shieldLogo: hyundaiShieldLogo, slogan: "Design e conforto para o dia a dia", tone: "blue", shield: "/images/ddad8c2cbb035e9fc9ba46049e5c966380de93ce.png", car: "/images/6b9ec207a0f1be9dd4898e3ec029494ff0f3963a.png", flag: flagKR },
  { name: "Triumph", logo: brandTriumph, slogan: "Atitude e performance sobre duas rodas.", tone: "black", shield: "/images/b29b8ad321905ab831cbe90d4fde33a64d7e8098.png", car: "/images/8cb89a65c264c8c44bef3437965ed8b358c39bc0.png", flag: flagGB },
  { name: "Harley Davidson", logo: brandHarley, slogan: "A lenda que também é prêmio do Feirão", tone: "red", shield: "/images/d86b582d09cc9a9dce5b5dbe03c1ad7a70f8e460.png", car: "/images/b4df7763129a4be6a6d3f4a4e38d5443d0f4f972.png", flag: flagUS },
  { name: "Peugeot", logo: brandPeugeot, slogan: "Design europeu com presença de ataque", tone: "blue", shield: "/images/a407a0a84f3c5a897d3e75cba0805606f37d79ad.png", car: "/images/91f8095a04473be86794fb862383964546406f3c.png", flag: flagFR },
  { name: "GAC", logo: brandGac, slogan: "Tecnologia global que já entrou em campo no Brasil", tone: "black", shield: "/images/45bf878efbbae237da8ecc5c6b267a68de10714e.png", car: "/images/35c5ed22016082e3d922809915bf83d21ec71080.png", flag: flagCN },
  { name: "Servopa Seminovos", logo: brandSeminovos, slogan: "Oportunidades selecionadas para trocar de carro", tone: "blue", shield: "/images/7a89e8d4a797ccafb16ccee93179b0211c5469bf.png", car: "/images/0397a0801fc2daa79efa9d38bb425e1dbce50c9c.png", flag: flagBR },
] as BrandItem[];

const toneClassMap: Record<BrandTone, string> = {
  blue: "home-brands__shield-card--blue",
  red: "home-brands__shield-card--red",
  black: "home-brands__shield-card--black",
};

const BrandsSection = () => {
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
                {brand.logo ? <img src={brand.logo} alt={brand.name} /> : <span>{brand.name}</span>}
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
          <div className={`home-brands__shield-card ${toneClassMap[currentBrand.tone]}`} key={currentBrand.name}>
            <img src={shieldCard} alt="" className="home-brands__shield-frame" />
            <img src={currentBrand.shield} alt="" className="home-brands__shield-layer" />
            <img src={currentBrand.car} alt="" className="home-brands__shield-car home-brands__shield-car--one" />
            <div className="home-brands__shield-content">
              <div className="home-brands__shield-meta">
                {currentBrand.logo ? (
                  <img
                    src={currentBrand.shieldLogo ?? currentBrand.logo}
                    alt={currentBrand.name}
                    className="home-brands__shield-logo"
                  />
                ) : null}
                <img src={currentBrand.flag} alt="" className="home-brands__shield-flag" />
              </div>
              <h3>{currentBrand.name}</h3>
              <span className="home-brands__shield-divider" aria-hidden="true" />
              <p>{currentBrand.slogan}</p>
            </div>
          </div>
          <button className="home-brands__nav home-brands__nav--right" type="button" aria-label="Proximo" onClick={onNext}>
            &#8250;
          </button>
          <button type="button" className="home-brands__cta">
            Encontrar concessionária
          </button>
        </div>
      </div>

      <div className="home-brands__bottom">
        <img src={bg1} alt="" />
        <img src={bg2} alt="" />
        <img src={bg3} alt="" />
        <img src={bg4} alt="" />
        <img src={bg5} alt="" />
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
