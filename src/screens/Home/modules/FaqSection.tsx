"use client";

import { useId, useRef, useState } from "react";
import { useMutedLoopAutoplay } from "./useMutedLoopAutoplay";

const faqVideoSrc = "/videos/novo_tiguan.mp4";
const faqCircle = "/images/796130d0d087916b2c6600c0eb200b737e3d839f.svg";
const faqIconExpand = "/images/faq-icon-expand.svg";
const faqIconCollapse = "/images/faq-icon-collapse.svg";

const faqItems = [
  {
    question: "Quem pode participar da promoção?",
    answer:
      "Podem participar todos os consumidores, pessoas físicas maiores de 18 (dezoito) anos na data de inscrição na promoção, domiciliadas no território nacional e inscritas no Cadastro de Pessoas Físicas (CPF), com número válido e regular junto à Receita Federal do Brasil.\n\nNÃO PODEM participar dessa promoção Pessoas Jurídicas e os funcionários das empresas Promotoras.",
  },
  {
    question: "Qual é o período de participação da promoção?",
    answer:
      "O período de participação da promoção é de 22/05/2026 a 23/05/2026.",
  },
  {
    question: "Qual é a área de abrangência da promoção?",
    answer:
      "A promoção tem abrangência nos Estados do Paraná e Rio Grande do Sul.",
  },
  {
    question: "Quais são os locais participantes da promoção?",
    answer:
      "Participam as lojas físicas, relacionadas no site http://feirao.gruposervopa.com.br.",
  },
  {
    question: "Quais são os produtos participantes desta promoção?",
    answer:
      "Participam todos os veículos (automóveis, motocicletas e caminhões), novos, inclusive aqueles que venham a ser lançados durante o período de participação, e seminovos, desde que comercializados nos locais participantes, conforme relação disponível no site http://feirao.gruposervopa.com.br.",
  },
  {
    question: "Como faço para participar da promoção?",
    answer:
      "Para participar da promoção o consumidor deverá, obrigatoriamente:\na) preencher e assinar o termo de test drive;\nb) realizar o test drive em um dos veículos participantes.\n\nCada test drive realizado dará direito a UM número da sorte para participar da promoção.",
  },
  {
    question: "É necessário realizar alguma compra para participar da promoção?",
    answer:
      "Não. Para participar é necessário apenas preencher e assinar o termo de test drive e realizar o test drive em um dos veículos participantes.",
  },
  {
    question: "Como faço para adquirir número(s) da sorte extra(s)?",
    answer:
      "Para garantir número(s) da sorte extra(s), basta adquirir o modelo de veículo testado após a realização do test drive. Ao realizar a compra, o consumidor receberá 10 (dez) números da sorte extras.",
  },
  {
    question: "Existe um limite de participação nesta promoção?",
    answer:
      "Sim, cada participante poderá participar até o limite de 03 (três) test drives e 33 números da sorte por CPF.",
  },
  {
    question:
      "Posso realizar test drives em veículos da mesma marca para obter mais números da sorte?",
    answer:
      "Não. Para fins de participação na promoção, os test drives válidos deverão ser realizados em veículos de marcas distintas, sendo considerado apenas 01 (um) test drive por marca para geração de números da sorte.",
  },
  {
    question: "Onde posso consultar meus números da sorte?",
    answer:
      "Para consultar o(s) número(s) da sorte adquirido(s), os participantes deverão acessar o site http://feirao.gruposervopa.com.br, no prazo de até 03 (três) dias corridos após a realização do test drive e/ou da compra do veículo.",
  },
  {
    question:
      "Não estou conseguindo visualizar meus números da sorte. O que devo fazer?",
    answer:
      "Se o prazo para a geração dos números da sorte já se esgotou e, ainda assim, houver dificuldade na localização do(s) número(s) da sorte adquirido(s), entre em contato através do e-mail: feiraodeverdadeeaqui@gruposervopa.com.br.",
  },
  {
    question: "Se eu cancelar a minha compra, continuarei participando da promoção?",
    answer:
      "Caso haja cancelamento de compra do(s) veículo(s) adquirido(s) participante(s) da promoção, o(s) número(s) da sorte originado(s) por essa operação será(ão) desconsiderados, em caso de contemplação.",
  },
  {
    question: "Como faço para me descadastrar na promoção?",
    answer:
      "A qualquer momento, durante o período de participação, o consumidor poderá solicitar seu descadastramento da promoção por meio de botão específico disponível no site http://feirao.gruposervopa.com.br.",
  },
  {
    question: "Qual a data da apuração e o prêmio que faz parte desta promoção?",
    answer:
      "O sorteio será realizado pela Loteria Federal no dia 17/06/2026, e a apuração do contemplado ocorrerá no dia 19/06/2026. Será distribuído como prêmio uma Motocicleta Harley-Davidson Street Bob 0km, ano e modelo 2025/2025, na cor conforme disponibilidade em estoque, no valor unitário de R$ 100.000,00.",
  },
  {
    question: "Como saberei se fui um dos contemplados na promoção?",
    answer:
      "Em caso de contemplação, o participante será comunicado por e-mail, ou por mensagem através do whatsapp, ou por telefone, no prazo de até 30 dias após a conclusão da auditoria da contemplação.\n\nNesta comunicação o contemplado receberá instruções para o recebimento do prêmio, determinando o prazo de até 3 dias corridos para o envio dos documentos necessários, para viabilizar e registrar o recebimento do prêmio.",
  },
  {
    question: "Como faço para receber meu prêmio?",
    answer:
      "O contemplado receberá seu prêmio na loja participante mais próxima de sua residência ou em seu domicílio, conforme acerto entre as partes, mediante a assinatura do respectivo recibo de entrega.",
  },
  {
    question: "Posso trocar meu prêmio por dinheiro?",
    answer:
      "A Legislação Brasileira não permite que as premiações oriundas de Sorteios, Concursos, Vale-Brindes e Modalidades assemelhadas sejam pagas em dinheiro.",
  },
  {
    question: "Tenho outras dúvidas sobre a promoção. O que devo fazer?",
    answer:
      "As dúvidas serão resolvidas através do e-mail: feiraodeverdadeeaqui@gruposervopa.com.br.",
  },
];

const FaqSection = () => {
  const baseId = useId();
  const faqVideoRef = useRef<HTMLVideoElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useMutedLoopAutoplay(faqVideoRef);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="feirao-faq" className="home-faq" aria-labelledby={`${baseId}-heading`}>
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
          ref={faqVideoRef}
          className="home-faq__video"
          src={faqVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
