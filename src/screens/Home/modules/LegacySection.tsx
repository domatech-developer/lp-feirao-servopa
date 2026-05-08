const legacyLogoLeft = "/images/d143791e24c5b3dca73298961d0a304573225afd.png";
const legacyLogoRight = "/images/5c430148af9c5396339b3297093c6b66b2580f84.png";

const LegacySection = () => {
  return (
    <section className="home-legacy">
      <div className="home-legacy__headline">
        <div className="home-legacy__headline-left" />
        <div className="home-legacy__headline-right">
          <h2>HÁ 70 ANOS TRANSFORMANDO SONHOS EM CONQUISTAS</h2>
        </div>
      </div>
      <div className="home-legacy__bg-shape" />
      <div className="home-legacy__logo">
        <img src={legacyLogoLeft} alt="" />
        <img src={legacyLogoRight} alt="" />
      </div>
    </section>
  );
};

export default LegacySection;
