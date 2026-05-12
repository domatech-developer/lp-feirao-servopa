"use client";

import { useId, useState } from "react";

const faqVideoSrc = "/videos/novo_tiguan.mp4";
const faqCircle = "/images/796130d0d087916b2c6600c0eb200b737e3d839f.svg";
const faqIconExpand = "/images/faq-icon-expand.svg";
const faqIconCollapse = "/images/faq-icon-collapse.svg";

const faqEntry = {
  question: "Onde o Feirão será realizado?",
  answer:
    "A campanha terá atendimento em Curitiba e Maringá. Na inscrição, você poderá escolher a cidade onde deseja ser atendido.",
};

const faqItems = Array.from({ length: 6 }, () => ({ ...faqEntry }));

const FaqSection = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="home-faq" aria-labelledby={`${baseId}-heading`}>
      <div className="home-faq__left">
        <h2 id={`${baseId}-heading`}>Tire suas dúvidas</h2>
        <div className="home-faq__list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <div
                key={`${item.question}-${index}`}
                className={`home-faq__item-wrap${isOpen ? " home-faq__item-wrap--open" : ""}`}
              >
                <button
                  type="button"
                  className="home-faq__item"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="home-faq__question">{item.question}</span>
                  <span className="home-faq__icon-wrap" aria-hidden>
                    <img
                      src={isOpen ? faqIconCollapse : faqIconExpand}
                      alt=""
                      className="home-faq__icon-img"
                      width={24}
                      height={24}
                    />
                  </span>
                </button>
                {isOpen ? (
                  <div id={panelId} className="home-faq__answer" role="region">
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="home-faq__right">
        <video
          className="home-faq__video"
          src={faqVideoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="home-faq__visual" aria-hidden>
          <div className="home-faq__label home-faq__label--top">
            <p className="home-faq__label-text">Jogue o jogo</p>
          </div>
          <div className="home-faq__label home-faq__label--bottom">
            <p className="home-faq__label-text">Vem para a Servopa</p>
          </div>
          <div className="home-faq__frame" />
          <div className="home-faq__mid-line" />
          <div className="home-faq__top-box" />
          <div className="home-faq__bottom-box" />
          <img src={faqCircle} alt="" className="home-faq__circle" />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
