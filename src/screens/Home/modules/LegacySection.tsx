const legacyTopBg = "/images/d143791e24c5b3dca73298961d0a304573225afd.png";
const legacyTopCenterBg = "/images/5c430148af9c5396339b3297093c6b66b2580f84.png";
const legacyShapeLeft = "/images/28916f5034f29fd9330f07ad4bd99f9819b49f6e.png";
const legacyShapeRight = "/images/cd811ec871600a1e268d5ca43d1668e21a11f304.png";
const legacyLogoLeft = "/images/d143791e24c5b3dca73298961d0a304573225afd.png";
const legacyLogoRight = "/images/5c430148af9c5396339b3297093c6b66b2580f84.png";

const LegacySection = () => {
  return (
    <section className="home-legacy">
      <div className="home-legacy__top">
        <div className="home-legacy__top-left">
          <img src={legacyTopBg} alt="" />
        </div>
        <div className="home-legacy__top-center">
          <img src={legacyTopCenterBg} alt="" />
        </div>
        <div className="home-legacy__top-right">
          <h2>Há 70 anos transformando sonhos em conquistas</h2>
        </div>
      </div>

      <div className="home-legacy__bottom">
        <img src={legacyShapeLeft} alt="" className="home-legacy__shape home-legacy__shape--left" />
        <img src={legacyShapeRight} alt="" className="home-legacy__shape home-legacy__shape--right" />
        <div className="home-legacy__logo">
          <img src={legacyLogoLeft} alt="" />
          <img src={legacyLogoRight} alt="" />
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
