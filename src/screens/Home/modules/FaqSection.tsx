const faqGameBg = "/images/656ce4629fc7dbb35fa0f37584f4d5e49ecd0bae.png";
const faqCircle = "/images/796130d0d087916b2c6600c0eb200b737e3d839f.svg";

const questions = [
  "Onde o Feirão será realizado?",
  "Onde o Feirão será realizado?",
  "Onde o Feirão será realizado?",
  "Onde o Feirão será realizado?",
  "Onde o Feirão será realizado?",
  "Onde o Feirão será realizado?",
];

const FaqSection = () => {
  return (
    <section className="home-faq">
      <div className="home-faq__left">
        <h2>Tire suas dúvidas</h2>
        <div className="home-faq__list">
          {questions.map((question, index) => (
            <button key={`${question}-${index}`} type="button" className="home-faq__item">
              <span>{question}</span>
              <span className="home-faq__icon">+</span>
            </button>
          ))}
        </div>
      </div>

      <div className="home-faq__right">
        <img src={faqGameBg} alt="" className="home-faq__bg" />
        <p className="home-faq__top-label">Jogue o jogo</p>
        <p className="home-faq__bottom-label">Vem para a Servopa</p>

        <div className="home-faq__frame" />
        <div className="home-faq__mid-line" />
        <div className="home-faq__top-box" />
        <div className="home-faq__bottom-box" />
        <img src={faqCircle} alt="" className="home-faq__circle" />
      </div>
    </section>
  );
};

export default FaqSection;
