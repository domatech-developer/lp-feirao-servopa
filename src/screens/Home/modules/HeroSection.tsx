const heroBg = "/images/632d51ff85c8ed6c1bdbb0919f75ba3978979823.png";
const heroLights = "/images/9f2a548355039383ccd5426d07e4cc97604dec46.png";
const heroLogoCenter = "/images/f56571d554c8c63415e1603fb811f912b24edf97.png";
const heroCarsPack = "/images/e8b2d53eaed42b1e9bce76b3f93d8296bc04e4e5.png";
const heroBadge = "/images/1bfa78d186eb2753576470238f528a052d0138d4.png";
const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const HeroSection = () => {
  return (
    <section className="home-hero">
      <div className="home-hero__backdrop" aria-hidden>
        <img className="home-hero__bg" src={heroBg} alt="" />
        <img className="home-hero__lights" src={heroLights} alt="" />
      </div>

      <div className="home-hero__shell">
        <header className="home-hero__top">
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

        <div className="home-hero__body">
          <div className="home-hero__center">
            <img src={heroLogoCenter} alt="Feirão de Verdade" className="home-hero__main-logo" />
          </div>
          <img src={heroCarsPack} alt="" className="home-hero__cars" />
        </div>
      </div>

      <img src={heroBadge} alt="Fazendo um test drive" className="home-hero__badge" />
    </section>
  );
};

export default HeroSection;
