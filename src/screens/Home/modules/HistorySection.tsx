const historyBg = "/images/ef7423ac557df94146f57db8f2d4a23f5e96fdb8.png";
const playCircle = "/images/e8fd20c077b7c30dee179135e6fe16b4cae0f8f4.svg";
const playStroke = "/images/b0c832eb0317da06fef9076c756149ea88293a7e.svg";
const playIcon = "/images/79fe2612d25e6e06ec984fae9f9c383a58ffa39a.svg";

const HistorySection = () => {
  return (
    <section className="home-history">
      <img src={historyBg} alt="" className="home-history__bg" />

      <div className="home-history__content">
        <h2>
          Fundado em 1955, o Grupo Servopa é um dos maiores grupos automotivos
          do Brasil
        </h2>

        <button type="button" className="home-history__play" aria-label="Assistir vídeo institucional">
          <img src={playCircle} alt="" className="home-history__play-bg" />
          <img src={playStroke} alt="" className="home-history__play-stroke" />
          <img src={playIcon} alt="" className="home-history__play-icon" />
        </button>
      </div>
    </section>
  );
};

export default HistorySection;
