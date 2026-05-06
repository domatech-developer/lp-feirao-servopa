const servopaLogo = "/images/d7b93205623972d4c639db156b36beaaaf717504.svg";
const footerCardBg = "/images/82ae1ce451dd66d07090abc04aea64d4f90c17eb.png";
const footerCardTitle = "/images/acf36f896778b1d1424f071161f9694879417aae.svg";
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
            <button type="button" className="home-pill-btn home-pill-btn--ghost">
              Regulamento
            </button>
            <button type="button" className="home-pill-btn home-pill-btn--ghost">
              Política de Privacidade
            </button>
            <button type="button" className="home-pill-btn home-pill-btn--ghost">
              Termos de Uso
            </button>
          </div>
        </div>

        <div className="home-footer__cta-card">
          <img src={footerCardBg} alt="" className="home-footer__cta-bg" />
          <div className="home-footer__cta-chip">
            <img src={checkIcon} alt="" />
            <img src={footerCardTitle} alt="Escolha sua marca e entre em campo no Feirão" />
          </div>
          <p>
            Selecione a marca de interesse e, em seguida, escolha a
            concessionária participante mais conveniente para o seu atendimento.
          </p>
          <button type="button" className="home-pill-btn home-footer__cta-button">
            Escolha sua marca
          </button>
        </div>
      </div>

      <div className="home-footer__legal">
        <p>
          Promoção válida conforme regulamento. Imagens meramente ilustrativas.
          Condições, modelos, brindes, unidades participantes e disponibilidade
          de veículos sujeitos às regras da campanha.
        </p>
        <p>
          O Grupo Servopa foi fundado em 1955, atuando nos segmentos de
          concessionárias de automóveis, caminhões, motocicletas e consórcio,
          além de outros serviços ligados diretamente ao setor automotivo. Sendo
          um dos maiores e melhores grupos do país, trabalhamos para garantir
          solidez, credibilidade, segurança e confiança, pilares essenciais que
          fazem parte da nossa identidade. Hoje, o Grupo Servopa atua em toda a
          região Sul do país e atende seus mais de 300 mil clientes com total
          dedicação, que ao longo dos anos ajudaram a escrever uma história de
          sucesso.
        </p>
        <p>
          Entre em contato com a gente pelo formulário, whatsapp ou telefone ou
          e-mail sac@gruposervopa.com.br.
        </p>
      </div>

      <div className="home-footer__bottom">
        <span>© Copyright 2026 - Servopa. Todos os direitos reservados.</span>
        <span className="home-footer__made-by">
          Feito por: <img src={agencyLogo} alt="Domatech" />
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
