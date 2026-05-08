const highlightTopImage = "/images/0aeb11314a47ed4a41eda012b3186bf1e1003f96.png";
const highlightMotorcycle = "/images/c74b968146cd5fdabac1ffb75f37acca06145276.png";
const highlightVideo = "/videos/harley-video.mp4";
const highlightHarleyLogo = "/images/796130d0d087916b2c6600c0eb200b737e3d839f.svg";

const HighlightSection = () => {
  return (
    <section className="home-highlight">
      <div className="home-highlight__top-image-wrap">
        <img src={highlightTopImage} alt="" className="home-highlight__top-image" />
      </div>
      <div className="home-highlight__left">
        <div className="home-highlight__video">
          <video
            className="home-highlight__video-media"
            src={highlightVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Vídeo de destaque Harley-Davidson"
          />
        </div>
        <div className="home-highlight__motorcycle-glow" aria-hidden />
        <div className="home-highlight__motorcycle-card">
          <img src={highlightMotorcycle} alt="" className="home-highlight__motorcycle-image" />
          <div className="home-highlight__motorcycle-copy">
            <p>Concorra a uma</p>
            <strong>Harley Davidson modelo Street Bob</strong>
          </div>
          <img src={highlightHarleyLogo} alt="Harley-Davidson" className="home-highlight__harley-badge" />
        </div>
      </div>

      <div className="home-highlight__right">
        <span className="home-tag">22 e 23/5</span>
        <h2>Dois dias para acelerar sua próxima conquista</h2>
        <p>
          Faça um test drive durante o Feirão e concorra a uma
          Harley-Davidson
        </p>
        <small>
          Promoção válida somente nos dias 22 e 23 de Maio para quem fez
          cadastro antecipado *.
        </small>
        <button type="button" className="home-pill-btn home-pill-btn--text-only home-highlight__cta">
          Marcar Test Drive e concorrer!
        </button>
      </div>
    </section>
  );
};

export default HighlightSection;
