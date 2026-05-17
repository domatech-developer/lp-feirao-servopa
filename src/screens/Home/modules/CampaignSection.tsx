"use client";

import { DotButton, useDotButton } from "@/components/Carousel/CarouselDefault/components/CarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { useHomeFormModal } from "../HomeFormModalContext";

const introIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";
const cardOne = "/images/232957beec604e92bb1c62f58f090c96-campaign-card-1.webp";
const cardTwo = "/images/9b0c43e692374f39abc1fc1c4fa1a326-campaign-card-2.webp";
const cardThree = "/images/edad10ad4eb046ea837b2e92e710f87c-campaign-card-3.webp";
const cardFour = "/images/fd55dbc487244409801a07ee97a72a30-campaign-card-4.webp";

type CampaignCard = {
  id: string;
  image: string;
  title: string;
  description: string;
};

const cards: CampaignCard[] = [
  {
    id: "campaign-card-1",
    image: cardOne,
    title: "Test drive com chance de gol",
    description:
      "Experimente veículos das marcas participantes e, ao realizar seu test drive durante a campanha, concorra a uma Harley-Davidson.",
  },
  {
    id: "campaign-card-2",
    image: cardTwo,
    title: "Condições especiais no Feirão",
    description:
      "Aproveite oportunidades em veículos zero, seminovos e soluções do Grupo Servopa durante os dias do evento.",
  },
  {
    id: "campaign-card-3",
    image: cardThree,
    title: "Atendimento especializado",
    description:
      "Conte com consultores preparados para ajudar você a comparar modelos, entender condições e escolher com mais segurança.",
  },
  {
    id: "campaign-card-4",
    image: cardFour,
    title: "Grandes marcas ENTRAM EM CAMPO",
    description:
      "Compare opções de diferentes marcas do Grupo Servopa e encontre o veículo que combina melhor com o seu momento.",
  },
];

const EMBLA_OPTIONS = {
  align: "start" as const,
  containScroll: "trimSnaps" as const,
  dragFree: false,
};

type CampaignCardArticleProps = {
  card: CampaignCard;
  variant: "stack" | "slide";
};

const CampaignCardArticle = ({ card, variant }: CampaignCardArticleProps) => (
  <article
    className={`home-campaign__card${variant === "slide" ? " home-campaign__card--slide" : ""}`}
    data-node-id={variant === "slide" ? "1368:95924" : undefined}
  >
    <img src={card.image} alt="" className="home-campaign__card-image" />
    <div className="home-campaign__card-overlay" aria-hidden />
    {variant === "slide" ? (
      <div className="home-campaign__card-body">
        <h3 className="home-campaign__card-title">{card.title}</h3>
        <p className="home-campaign__card-text">{card.description}</p>
      </div>
    ) : null}
  </article>
);

const CampaignSection = () => {
  const { openFeiraoFormModal } = useHomeFormModal();
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className="home-campaign" data-node-id="1368:95920">
      <div className="home-campaign__container">
        <aside className="home-campaign__left" data-node-id="1368:78203">
          <div className="home-campaign__left-box">
            <div className="home-campaign__left-overlap">
              <img src={introIcon} alt="" className="home-campaign__icon" />
              <h2>Entre em campo para escolher seu próximo veículo</h2>
            </div>
            <p>
              Durante o Feirão de Verdade, você encontra marcas participantes do Grupo Servopa, condições
              especiais, atendimento especializado e ainda pode fazer um test drive para concorrer a uma
              Harley-Davidson.
            </p>
            <button
              type="button"
              className="home-pill-btn home-pill-btn--campaign-cta"
              onClick={() => openFeiraoFormModal()}
            >
              Quero me inscrever
            </button>
          </div>
        </aside>

        <div className="home-campaign__mosaic">
          <div className="home-campaign__carousel" data-node-id="1368:95922">
            <div className="home-campaign__carousel-viewport" ref={emblaRef}>
              <div className="home-campaign__carousel-track">
                {cards.map((card) => (
                  <div key={card.id} className="home-campaign__carousel-slide">
                    <CampaignCardArticle card={card} variant="slide" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="home-campaign__carousel-dots"
              data-node-id="1368:78176"
              role="tablist"
              aria-label="Cards do Feirão"
            >
              {cards.map((card, index) => (
                <DotButton
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Card ${index + 1} de ${cards.length}`}
                  onClick={() => onDotButtonClick(index)}
                  className={`home-campaign__carousel-dot${index === selectedIndex ? " home-campaign__carousel-dot--active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="home-campaign__cards home-campaign__cards--stack">
            {cards.map((card) => (
              <CampaignCardArticle key={card.id} card={card} variant="stack" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
