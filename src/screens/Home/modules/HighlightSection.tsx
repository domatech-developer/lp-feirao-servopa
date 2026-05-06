const highlightTopImage = "/images/0aeb11314a47ed4a41eda012b3186bf1e1003f96.png";
const highlightMotorcycle = "/images/c74b968146cd5fdabac1ffb75f37acca06145276.png";

const HighlightSection = () => {
  return (
    <section className="home-highlight">
      <div className="home-highlight__top-image-wrap">
        <img src={highlightTopImage} alt="" className="home-highlight__top-image" />
      </div>
      <div className="home-highlight__left">
        <div className="home-highlight__video" />
        <div className="home-highlight__motorcycle-card">
          <img src={highlightMotorcycle} alt="" className="home-highlight__motorcycle-image" />
          <div className="home-highlight__motorcycle-copy">
            <p>Concorra a uma</p>
            <strong>Harley Davidson modelo Street Bob</strong>
          </div>
          <span className="home-highlight__harley-badge">Harley-Davidson</span>
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
        <button type="button" className="home-pill-btn">
          Marcar Test Drive e concorrer!
        </button>
      </div>
    </section>
  );
};

export default HighlightSection;
