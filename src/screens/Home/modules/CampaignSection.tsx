"use client";

import { useHomeFormModal } from "../HomeFormModalContext";

const introIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";
const cardOne = "/images/232957beec604e92bb1c62f58f090c96-campaign-card-1.png";
const cardTwo = "/images/9b0c43e692374f39abc1fc1c4fa1a326-campaign-card-2.png";
const cardThree = "/images/edad10ad4eb046ea837b2e92e710f87c-campaign-card-3.png";
const cardFour = "/images/fd55dbc487244409801a07ee97a72a30-campaign-card-4.png";

const cards = [
  {
    title: "Test drive com chance de gol",
    image: cardOne,
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
    title: "Grandes marcas ENTRAM EM CAMPO",
    image: cardFour,
  },
];

const CampaignSection = () => {
  const { openFeiraoFormModal } = useHomeFormModal();

  return (
    <section className="home-campaign">
      <div className="home-campaign__container">
        <div className="home-campaign__mosaic">
          <div className="home-campaign__cards">
            {cards.map((card) => (
              <article key={card.title} className="home-campaign__card">
                <img src={card.image} alt="" className="home-campaign__card-image" />
              </article>
            ))}
          </div>
        </div>

        <aside className="home-campaign__left">
          <div className="home-campaign__left-box">
            <div className="home-campaign__left-overlap">
              <img src={introIcon} alt="" className="home-campaign__icon" />
              <h2>Entre em campo para escolher seu próximo veículo</h2>
            </div>
            <p>
              Durante o Feirão de Verdade, você encontra marcas participantes do
              Grupo Servopa, condições especiais, atendimento especializado e
              ainda pode fazer um test drive para concorrer a uma
              Harley-Davidson.
            </p>
            <button type="button" className="home-pill-btn" onClick={() => openFeiraoFormModal()}>
              Quero me inscrever
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CampaignSection;
