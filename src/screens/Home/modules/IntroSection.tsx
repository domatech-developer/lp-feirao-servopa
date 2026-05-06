const introBuilding = "/images/28b1ede9f362dc3b82793fcb8f46de533f36cc44.png";
const introMaskOverlay = "/images/ef7423ac557df94146f57db8f2d4a23f5e96fdb8.png";
const introBrandIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";

const IntroSection = () => {
  return (
    <section className="home-intro">
      <div className="home-intro__shape home-intro__shape--left" />
      <div className="home-intro__shape home-intro__shape--right" />

      <div className="home-intro__media-wrap">
        <img className="home-intro__media-image" src={introBuilding} alt="" />
        <img className="home-intro__media-overlay" src={introMaskOverlay} alt="" />
      </div>

      <div className="home-intro__content">
        <img src={introBrandIcon} alt="" className="home-intro__brand-icon" />
        <h2>Feirão de verdade é aqui</h2>
        <p>
          Nos dias 22 e 23 de maio, o Grupo Servopa reúne grandes marcas,
          condições especiais e uma experiência completa para você sair na
          frente na escolha do seu próximo carro.
        </p>
        <p>
          Escolha sua loja, faça sua inscrição e venha participar do Feirão com
          ofertas, test drive e benefícios exclusivos.
        </p>
        <button type="button" className="home-pill-btn">
          Quero me inscrever
        </button>
      </div>
    </section>
  );
};

export default IntroSection;
