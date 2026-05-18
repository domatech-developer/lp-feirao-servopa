"use client";

import { useCallback, useEffect, useState } from "react";

import ButtonHamburguer from "@/components/Buttons/ButtonHamburguer/ButtonHamburguer";
import { GTM_BUTTON } from "@/constants/gtmButtons";
import { sendGTMEvent } from "@next/third-parties/google";
import { useHomeFormModal } from "../HomeFormModalContext";

const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MOBILE_NAV_PANEL_ID = "home-mobile-nav-drawer";

const HomeMobileFloatingHeader = () => {
  const [open, setOpen] = useState(false);
  const { openFeiraoFormModal } = useHomeFormModal();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const go = (id: string) => {
    scrollToId(id);
    close();
  };

  const onInicio = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    close();
  };

  const onForm = () => {
    sendGTMEvent({
      event: `button_clicked_${GTM_BUTTON.MOBILE_HEADER_FORMULARIO}`,
      value: GTM_BUTTON.MOBILE_HEADER_FORMULARIO,
    });
    openFeiraoFormModal();
    close();
  };

  return (
    <div className="home-mobile-header">
      <header className="home-mobile-header__bar" aria-label="Feirão Servopa — navegação principal">
        <button type="button" className="home-mobile-header__brand" onClick={onInicio}>
          <img src={logoServopa} alt="Grupo Servopa" width={180} height={32} />
        </button>
        <ButtonHamburguer
          open={open}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={MOBILE_NAV_PANEL_ID}
        />
      </header>

      {open ? (
        <button
          type="button"
          className="home-mobile-header__backdrop"
          aria-label="Fechar menu"
          onClick={close}
        />
      ) : null}

      <nav
        id={MOBILE_NAV_PANEL_ID}
        className={`home-mobile-header__nav${open ? " home-mobile-header__nav--open" : ""}`}
        aria-hidden={!open}
      >
        <ul className="home-mobile-header__list">
          <li>
            <button type="button" className="home-mobile-header__link" onClick={onInicio}>
              Início
            </button>
          </li>
          <li>
            <button type="button" className="home-mobile-header__link" onClick={() => go("feirao-marcas")}>
              Marcas participantes
            </button>
          </li>
          <li>
            <button type="button" className="home-mobile-header__link" onClick={() => go("feirao-faq")}>
              Dúvidas frequentes
            </button>
          </li>
          <li>
            <button type="button" className="home-mobile-header__link" onClick={() => go("feirao-rodape")}>
              Onde estamos
            </button>
          </li>
          <li>
            <button
              type="button"
              className="home-mobile-header__link home-mobile-header__link--cta"
              data-gtm={GTM_BUTTON.MOBILE_HEADER_FORMULARIO}
              onClick={onForm}
            >
              Formulário de test drive
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeMobileFloatingHeader;
