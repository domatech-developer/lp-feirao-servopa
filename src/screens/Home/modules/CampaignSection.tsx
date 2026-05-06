const introIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";
const cardOne = "/images/79e086397ab30419abe85d1b5cfb361448ff4a6c.png";
const cardOneOverlay = "/images/58178ba06da84e3c03d7404d5732aed710f2fb0f.png";
const cardTwo = "/images/b1cbf5eef10ed420130b9fc1c7e65508f6d022c0.png";
const cardThree = "/images/093ae5d894d1f26514eed94b6a2f6f4b949ec680.png";
const cardFour = "/images/ecd70c4528a4c57718a0877844211beea06f441e.png";

const cards = [
  {
    title: "Test drive com chance de gol",
    image: cardOne,
    overlay: cardOneOverlay,
  },
  {
    title: "Condições especiais no Feirão",
    image: cardTwo,
  },
  {
    title: "Atendimento especializado",
    image: cardThree,
  },
  {
    title: "Grandes marcas entram em campo",
    image: cardFour,
  },
];

const CampaignSection = () => {
  return (
    <section className="home-campaign">
      <div className="home-campaign__container">
        <aside className="home-campaign__left">
          <div className="home-campaign__left-box">
            <img src={introIcon} alt="" className="home-campaign__icon" />
            <h2>Entre em campo para escolher seu próximo veículo</h2>
            <p>
              Durante o Feirão de Verdade, você encontra marcas participantes do
              Grupo Servopa, condições especiais, atendimento especializado e
              ainda pode fazer um test drive para concorrer a uma
              Harley-Davidson.
            </p>
            <button type="button" className="home-pill-btn">
              Quero me inscrever
            </button>
          </div>
        </aside>

        <div className="home-campaign__cards">
          {cards.map((card) => (
            <article key={card.title} className="home-campaign__card">
              <img src={card.image} alt="" className="home-campaign__card-image" />
              {card.overlay ? (
                <img src={card.overlay} alt="" className="home-campaign__card-overlay-image" />
              ) : null}
              <div className="home-campaign__card-overlay" />
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
