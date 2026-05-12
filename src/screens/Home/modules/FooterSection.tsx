const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";
const footerCardBg = "/images/82ae1ce451dd66d07090abc04aea64d4f90c17eb.png";
const checkIcon = "/images/cad3a4311efd27a1b62f55e6e1d00200a3f83d1b.svg";
const agencyLogo = "/images/c494d98b8cdc72971d9e18e4a4c1aba1e5bd5e31.svg";

const FooterSection = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer__top">
        <div className="home-footer__brand">
          <img src={servopaLogo} alt="Grupo Servopa" className="home-footer__logo" />
          <p>Feirão de Verdade é aqui.</p>
          <div className="home-footer__links">
            <button type="button" className="home-footer__text-link">
              Regulamento
            </button>
            <button type="button" className="home-footer__text-link">
              Política de Privacidade
            </button>
            <button type="button" className="home-footer__text-link">
              Termos de Uso
            </button>
          </div>
        </div>

        <div className="home-footer__cta-card">
          <div className="home-footer__cta-bg-layer" aria-hidden="true">
            <div className="home-footer__cta-bg-tint" />
            <img src={footerCardBg} alt="" className="home-footer__cta-bg" />
          </div>

          <div className="home-footer__cta-stack">
            <div className="home-footer__cta-ribbon">
              <div className="home-footer__cta-ribbon-bg" aria-hidden="true" />
              <div className="home-footer__cta-ribbon-row">
                <div className="home-footer__cta-check">
                  <img src={checkIcon} alt="" />
                </div>
                <p className="home-footer__cta-ribbon-title">
                  Escolha sua <span>MARCA</span> e entre em campo no Feirão
                </p>
              </div>
            </div>

            <div className="home-footer__cta-copy">
              <p>
                Selecione a marca de interesse e, em seguida, escolha a concessionária participante
                mais conveniente para o seu atendimento.
              </p>
              <button type="button" className="home-footer__cta-link">
                <span>Escolha sua marca</span>
                <span className="home-footer__cta-arrow" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="home-footer__legal">
        <div className="home-footer__legal-inner">
          <p className="home-footer__legal-block">
            <span>Promoção válida conforme </span>
            <button type="button" className="home-footer__legal-term">
              regulamento
            </button>
            <span>
              . Imagens meramente ilustrativas. Condições, modelos, brindes, unidades participantes
              e disponibilidade de veículos sujeitos às regras da campanha.
            </span>
            <br />
            <br />
            O Grupo Servopa foi fundado em 1955, atuando nos segmentos de concessionárias de
            automóveis, caminhões, motocicletas e consórcio, além de outros serviços ligados
            diretamente ao setor automotivo. Sendo um dos maiores e melhores grupos do país,
            trabalhamos para garantir solidez, credibilidade, segurança e confiança, pilares
            essenciais que fazem parte da nossa identidade. Hoje, o Grupo Servopa atua em toda a
            região Sul do país e atende seus mais de 300 mil clientes com total dedicação, que ao
            longo dos anos ajudaram a escrever uma história de sucesso.
          </p>
          <p className="home-footer__legal-contact">
            Entre em contato com a gente pelo formulário, whatsapp ou telefone ou e-mail
            sac@gruposervopa.com.br.
          </p>
        </div>
      </div>

      <div className="home-footer__bottom">
        <span className="home-footer__copyright">
          © Copyright 2026 - Servopa. Todos os direitos reservados.
        </span>
        <span className="home-footer__made-by">
          Feito por: <img src={agencyLogo} alt="Domatech" />
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
