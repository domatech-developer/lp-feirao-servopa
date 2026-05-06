const legacyBrandIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";
const legacyLogoLeft = "/images/d143791e24c5b3dca73298961d0a304573225afd.png";
const legacyLogoRight = "/images/5c430148af9c5396339b3297093c6b66b2580f84.png";

const LegacySection = () => {
  return (
    <section className="home-legacy">
      <div className="home-legacy__bg-shape" />
      <div className="home-legacy__intro">
        <img src={legacyBrandIcon} alt="" className="home-legacy__icon" />
        <h2>
          Referência Volkswagen
          <br />
          em Curitiba
        </h2>
        <p>
          Com mais de 70 anos de história, o Grupo Servopa reúne grandes
          marcas, atendimento especializado e condições especiais para você
          escolher seu próximo veículo durante o Feirão de Verdade.
        </p>
      </div>
      <div className="home-legacy__logo">
        <img src={legacyLogoLeft} alt="" />
        <img src={legacyLogoRight} alt="" />
      </div>
      <div className="home-legacy__stats">
        <div>
          <strong>70+</strong>
          <span>Anos de história</span>
        </div>
        <div>
          <strong>300 mil+</strong>
          <span>Clientes atendidos</span>
        </div>
        <div>
          <strong>1.100+</strong>
          <span>Parceiros autorizados</span>
        </div>
        <div>
          <strong>2.000+</strong>
          <span>Colaboradores na equipe</span>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
