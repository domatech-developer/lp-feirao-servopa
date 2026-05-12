const legacyBanner = "/images/444f5dc9c54c46229df1b9a4114f5701-legacy-banner.png";
const legacyLogoLeft = "/images/d143791e24c5b3dca73298961d0a304573225afd.png";
const legacyLogoRight = "/images/5c430148af9c5396339b3297093c6b66b2580f84.png";
const legacyBrandIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";

const LegacySection = () => {
  return (
    <section className="home-legacy" aria-labelledby="legacy-heading">
      <h2 id="legacy-heading" className="home-legacy__heading">
        HÁ 70 ANOS TRANSFORMANDO SONHOS EM CONQUISTAS
      </h2>
      <div className="home-legacy__frame">
        <img
          className="home-legacy__banner"
          src={legacyBanner}
          alt=""
          width={1024}
          height={223}
          decoding="async"
          fetchPriority="low"
        />
      </div>

      <div className="home-legacy__stage">
        <div className="home-legacy__deco" aria-hidden>
          <div className="home-legacy__deco-inner">
            <div className="home-legacy__deco-shape" />
          </div>
        </div>

        <div className="home-legacy__logo-piece home-legacy__logo-piece--left" aria-hidden>
          <img src={legacyLogoLeft} alt="" width={204} height={280} />
        </div>
        <div className="home-legacy__logo-piece home-legacy__logo-piece--right" aria-hidden>
          <img src={legacyLogoRight} alt="" width={204} height={280} />
        </div>

        <div className="home-legacy__intro">
          <img src={legacyBrandIcon} alt="" className="home-legacy__intro-icon" width={45} height={40} />
          <div className="home-legacy__intro-copy">
            <h3 className="home-legacy__intro-title">
              <span>Referência Volkswagen </span>
              <span>em Curitiba</span>
            </h3>
            <p className="home-legacy__intro-text">
              Com mais de 70 anos de história, o Grupo Servopa reúne grandes marcas, atendimento especializado e
              condições especiais para você escolher seu próximo veículo durante o Feirão de Verdade.
            </p>
          </div>
        </div>

        <dl className="home-legacy__stats">
          <div className="home-legacy__stat">
            <dt>70+</dt>
            <dd>Anos de história</dd>
          </div>
          <div className="home-legacy__stat">
            <dt>300 mil+</dt>
            <dd>Clientes atendidos</dd>
          </div>
          <div className="home-legacy__stat">
            <dt>1.100+</dt>
            <dd>Parceiros autorizados</dd>
          </div>
          <div className="home-legacy__stat">
            <dt>2.000+</dt>
            <dd>Colaboradores na equipe</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default LegacySection;
