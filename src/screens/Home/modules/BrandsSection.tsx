const shieldCard = "/images/fdd4df768d927c475a291174bcdb98d236eba785.svg";
const selectedBrandLogo = "/images/cb56872d14c91c55bf7d1de7b485845b6c70a80b.svg";
const brandByd = "/images/63417204204da78107d6fff2b2a84613edba8a0e.svg";
const brandAudi = "/images/f5c521fe7dd10a63db941acb50267a796901cbb3.svg";
const brandVwco = "/images/8939b54ff1859332803bae55d80be34bab830ae7.svg";
const brandCitroen = "/images/3b6154d815916f76742ab92b78c550b8d7cd9706.svg";
const brandVolvo = "/images/31ad57830112d2c3f96a5110b3dcc0008de5b2b3.svg";
const brandHonda = "/images/0ec0376f8f74844f527513a80a15e367fd7b9a2f.svg";
const brandHyundai = "/images/dde968ad96a6c4308b73df91a4c3999fa88520f5.svg";
const brandTriumph = "/images/3c022613c8f30170506a257b32c38e73c93c1af0.svg";
const bg1 = "/images/af343aea90baaa11716b7a4ef845c79fb3191066.png";
const bg2 = "/images/b7ed814656d4dbb53a6fa6e0f5c14ab263ce3d21.png";
const bg3 = "/images/e5fbb564f651e1d7cb2fe73e60fb57f3a063d202.png";
const bg4 = "/images/90a7293d469a618aa39ed2f3b96bf2f253ff2777.png";
const bg5 = "/images/f88046a56967bd35c675bed29b646889cda7e700.png";
const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";

const BrandsSection = () => {
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
            <img src={selectedBrandLogo} alt="Volkswagen" className="home-brands__item home-brands__item--selected" />
            <img src={brandByd} alt="BYD" className="home-brands__item" />
            <img src={brandAudi} alt="Audi" className="home-brands__item" />
            <img src={brandVwco} alt="Volkswagen Caminhões e Ônibus" className="home-brands__item" />
            <img src={brandCitroen} alt="Citroën" className="home-brands__item" />
            <img src={brandVolvo} alt="Volvo" className="home-brands__item" />
            <img src={brandHonda} alt="Honda" className="home-brands__item" />
            <img src={brandHyundai} alt="Hyundai" className="home-brands__item" />
            <img src={brandTriumph} alt="Triumph" className="home-brands__item" />
            <div className="home-brands__item home-brands__item--servopa">
              <img src={servopaLogo} alt="Grupo Servopa" />
            </div>
          </div>
        </div>

        <div className="home-brands__right">
          <p className="home-brands__counter">1/13</p>
          <button className="home-brands__nav home-brands__nav--left" type="button" aria-label="Anterior">
            ‹
          </button>
          <img src={shieldCard} alt="Volkswagen" className="home-brands__shield" />
          <button className="home-brands__nav home-brands__nav--right" type="button" aria-label="Próximo">
            ›
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
