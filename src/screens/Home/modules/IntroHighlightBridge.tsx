"use client";

import { useHomeFormModal } from "../HomeFormModalContext";
import { useSyncedTwinVideos } from "./useSyncedTwinVideos";

const introMaskOverlay = "/images/ef7423ac557df94146f57db8f2d4a23f5e96fdb8.png";
const introBrandIcon = "/images/bed37c44867b1bb4be2485766a38599cb011b8d6.svg";
const highlightMotorcycle = "/images/c74b968146cd5fdabac1ffb75f37acca06145276.png";
const highlightVideoSrc = "/videos/harley-video.mp4";
const highlightHarleyLogo = "/images/harley-davidson-logo.png";

const IntroHighlightBridge = () => {
  const { primaryRef, secondaryRef } = useSyncedTwinVideos();
  const { openFeiraoFormModal } = useHomeFormModal();

  const videoProps = {
    src: highlightVideoSrc,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "metadata" as const,
  };

  return (
    <div className="home-intro-highlight">
      <section className="home-intro">
        <div className="home-intro__shape home-intro__shape--left" />
        <div className="home-intro__shape home-intro__shape--right" />

        <div className="home-intro__media-wrap">
          <div className="home-intro__video-crop">
            <video
              ref={secondaryRef}
              className="home-intro__split-video home-intro__split-video--right"
              aria-hidden
              {...videoProps}
            />
          </div>
          <img className="home-intro__media-overlay" src={introMaskOverlay} alt="" />
        </div>

        <div className="home-intro__content">
          <img src={introBrandIcon} alt="" className="home-intro__brand-icon" />
          <h2>FEIRÃO DE VERDADE É AQUI</h2>
          <p>
            Nos dias 22 e 23 de maio, o Grupo Servopa reúne grandes marcas, condições especiais e uma
            experiência completa para você sair na frente na escolha do seu próximo carro.
          </p>
          <p>
            Escolha sua loja, faça sua inscrição e venha participar do Feirão com ofertas, test drive e
            benefícios exclusivos.
          </p>
          <button
            type="button"
            className="home-pill-btn home-pill-btn--text-only"
            onClick={() => openFeiraoFormModal()}
          >
            Quero me inscrever
          </button>
        </div>
      </section>

      <div className="home-intro-highlight__bridge-video">
        <div className="home-highlight__left">
          <div className="home-highlight__video">
            <div className="home-highlight__video-crop">
              <video
                ref={primaryRef}
                className="home-highlight__split-video home-highlight__split-video--left"
                aria-label="Vídeo de destaque Harley-Davidson"
                {...videoProps}
              />
            </div>
          </div>
          <div className="home-highlight__motorcycle-glow" aria-hidden />
          <div className="home-highlight__motorcycle-card" data-node-id="1258:5058">
            <img src={highlightMotorcycle} alt="" className="home-highlight__motorcycle-image" />
            <div className="home-highlight__motorcycle-copy">
              <p>Concorra a uma</p>
              <div className="home-highlight__motorcycle-heading" role="group" aria-label="Harley Davidson Modelo Street Bob">
                <span className="home-highlight__motorcycle-title">Harley Davidson</span>
                <span className="home-highlight__motorcycle-subtitle">Street Bob</span>
              </div>
            </div>
            <img src={highlightHarleyLogo} alt="Harley-Davidson" className="home-highlight__harley-badge" />
          </div>
        </div>
      </div>

      <section className="home-highlight">
        <div className="home-highlight__right">
          <span className="home-tag">22 e 23/5</span>
          <h2>Dois dias para acelerar sua próxima conquista</h2>
          <p>
            Faça um test drive durante o Feirão e concorra a uma
            Harley-Davidson
          </p>
          <small>
            Promoção válida somente nos dias 22 e 23 de Maio para quem fez cadastro antecipado *.
          </small>
          <button
            type="button"
            className="home-pill-btn home-pill-btn--text-only home-highlight__cta"
            onClick={() => openFeiraoFormModal()}
          >
            Marcar Test Drive e concorrer!
          </button>
        </div>
      </section>
    </div>
  );
};

export default IntroHighlightBridge;
