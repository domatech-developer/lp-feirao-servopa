const heroBg = "/images/632d51ff85c8ed6c1bdbb0919f75ba3978979823.png";
const heroLights = "/images/9f2a548355039383ccd5426d07e4cc97604dec46.png";
const heroLogoCenter = "/images/f56571d554c8c63415e1603fb811f912b24edf97.png";
const heroCarsPack = "/images/e8b2d53eaed42b1e9bce76b3f93d8296bc04e4e5.png";
const heroBall = "/images/e2844ba54253a1472bfd421b9191a63d0b6809cb.png";
const heroBadge = "/images/1bfa78d186eb2753576470238f528a052d0138d4.png";
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const HeroSection = () => {
  return (
    <section className="home-hero">
      <img className="home-hero__bg" src={heroBg} alt="" />
      <img className="home-hero__lights" src={heroLights} alt="" />
      <img className="home-hero__ball home-hero__ball--left" src={heroBall} alt="" />
      <img className="home-hero__ball home-hero__ball--right" src={heroBall} alt="" />

      <div className="home-hero__top">
        <div className="home-hero__countdown-card">
          <p className="home-hero__countdown-title">Dias para o Feirão Servopa:</p>
          <div className="home-hero__countdown-values">
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
        </div>

        <div className="home-hero__actions">
          <button type="button" className="home-pill-btn home-pill-btn--ghost">
            Localização
          </button>
          <button type="button" className="home-pill-btn">
            Formulario de Test Drive
          </button>
        </div>
      </div>

      <div className="home-hero__center">
        <img src={logoServopa} alt="Grupo Servopa" className="home-hero__servopa-logo" />
        <img src={heroLogoCenter} alt="Feirao de Verdade" className="home-hero__main-logo" />
      </div>

      <img src={heroCarsPack} alt="" className="home-hero__cars" />
      <img src={heroBadge} alt="Fazendo um test drive" className="home-hero__badge" />

      <div className="home-hero__bottom">
        <div className="home-hero__brand">
          <span>Feirão de Verdade</span>
          <strong>Grupo Servopa</strong>
        </div>

        <div className="home-hero__countdown-inline">
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

        <button type="button" className="home-pill-btn">
          Formulario de Test Drive
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
