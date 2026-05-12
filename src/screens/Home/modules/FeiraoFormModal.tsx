"use client";

import { FormEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { useHomeFormModal } from "../HomeFormModalContext";
import "./FeiraoFormModal.scss";

const CIDADES = ["Curitiba", "São José dos Pinhais", "Colombo", "Londrina", "Maringá", "Cascavel", "Ponta Grossa"];

const MARCAS = [
  "Volkswagen",
  "BYD",
  "Audi",
  "VWCO",
  "Citroën",
  "Volvo",
  "Honda",
  "Hyundai",
  "Triumph",
  "Harley Davidson",
  "Peugeot",
  "GAC",
  "Servopa Seminovos",
];

const CONCESSIONARIAS = [
  "Servopa Volkswagen Curitiba — Batel",
  "Servopa Volkswagen Curitiba — Portão",
  "Servopa BYD Curitiba",
  "Servopa Audi Curitiba",
  "Servopa Honda Curitiba",
];

const UNIDADES = ["Matriz", "Filial", "Showroom", "Pátio de seminovos"];

const DEFAULT_DATETIME = "2026-05-22T14:00";

export default function FeiraoFormModal() {
  const { isFeiraoFormModalOpen, closeFeiraoFormModal } = useHomeFormModal();
  const titleId = useId();
  const nomeRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [marca, setMarca] = useState("BYD");
  const [concessionaria, setConcessionaria] = useState("");
  const [unidade, setUnidade] = useState("");
  const [testDrive, setTestDrive] = useState<"sim" | "nao">("sim");
  const [horario, setHorario] = useState(DEFAULT_DATETIME);
  const [mensagem, setMensagem] = useState("");
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);

  const resetForm = useCallback(() => {
    setNome("");
    setEmail("");
    setTelefone("");
    setCidade("");
    setMarca("BYD");
    setConcessionaria("");
    setUnidade("");
    setTestDrive("sim");
    setHorario(DEFAULT_DATETIME);
    setMensagem("");
    setAceitePrivacidade(false);
  }, []);

  const handleClose = useCallback(() => {
    closeFeiraoFormModal();
    resetForm();
  }, [closeFeiraoFormModal, resetForm]);

  useEffect(() => {
    if (!isFeiraoFormModalOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => nomeRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [isFeiraoFormModalOpen, handleClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!aceitePrivacidade) return;
    // Integração backend / CRM pode ser ligada aqui
    handleClose();
  };

  if (!isFeiraoFormModalOpen) return null;

  const marcaLabelRaised = Boolean(marca);
  const horarioLabelRaised = Boolean(horario);

  return (
    <div
      className="feirao-form-modal__backdrop"
      role="presentation"
      onMouseDown={() => handleClose()}
    >
      <div
        className="feirao-form-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-node-id="1305:11364"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="feirao-form-modal__header">
          <h2 id={titleId} className="feirao-form-modal__title">
            Participe do Feirão Servopa
          </h2>
          <button
            type="button"
            className="feirao-form-modal__close"
            aria-label="Fechar formulário"
            onClick={() => handleClose()}
          />
        </header>

        <div className="feirao-form-modal__body">
          <form className="feirao-form" onSubmit={handleSubmit} noValidate>
            <input
              ref={nomeRef}
              className="feirao-form__input"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="feirao-form__input"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="feirao-form__input"
              name="telefone"
              type="tel"
              autoComplete="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <select
              className={`feirao-form__select${cidade ? "" : " feirao-form__select--placeholder"}`}
              name="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            >
              <option value="" disabled>
                Cidade de atendimento
              </option>
              {CIDADES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="feirao-form__float">
              <label
                className={`feirao-form__float-label${marcaLabelRaised ? " feirao-form__float-label--raised" : ""}`}
                htmlFor="feirao-form-marca"
              >
                Marca de Interesse
              </label>
              <select
                id="feirao-form-marca"
                className="feirao-form__select"
                name="marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              >
                {MARCAS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <select
              className={`feirao-form__select${concessionaria ? "" : " feirao-form__select--placeholder"}`}
              name="concessionaria"
              value={concessionaria}
              onChange={(e) => setConcessionaria(e.target.value)}
              required
            >
              <option value="" disabled>
                Concessionária
              </option>
              {CONCESSIONARIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className={`feirao-form__select${unidade ? "" : " feirao-form__select--placeholder"}`}
              name="unidade"
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              required
            >
              <option value="" disabled>
                Unidade
              </option>
              {UNIDADES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <fieldset className="feirao-form__fieldset">
              <legend className="feirao-form__legend">Deseja fazer Test Drive?</legend>
              <div className="feirao-form__radios">
                <label className="feirao-form__radio">
                  <input
                    type="radio"
                    name="testDrive"
                    value="sim"
                    checked={testDrive === "sim"}
                    onChange={() => setTestDrive("sim")}
                  />
                  <span className="feirao-form__radio-ui" aria-hidden />
                  Sim
                </label>
                <label className="feirao-form__radio">
                  <input
                    type="radio"
                    name="testDrive"
                    value="nao"
                    checked={testDrive === "nao"}
                    onChange={() => setTestDrive("nao")}
                  />
                  <span className="feirao-form__radio-ui" aria-hidden />
                  Não
                </label>
              </div>
            </fieldset>

            {testDrive === "sim" && (
              <div className="feirao-form__float feirao-form__datetime-shell">
                <label
                  className={`feirao-form__float-label${horarioLabelRaised ? " feirao-form__float-label--raised" : ""}`}
                  htmlFor="feirao-form-horario"
                >
                  Horário Test Drive
                </label>
                <input
                  id="feirao-form-horario"
                  className="feirao-form__input"
                  type="datetime-local"
                  name="horarioTestDrive"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
                <span className="feirao-form__datetime-icon" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 2v3M16 2v3M4 9h16M6 4h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            )}

            <textarea
              className="feirao-form__textarea"
              name="mensagem"
              placeholder="Mensagem"
              rows={4}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />

            <label className="feirao-form__consent">
              <input
                type="checkbox"
                name="privacidade"
                checked={aceitePrivacidade}
                onChange={(e) => setAceitePrivacidade(e.target.checked)}
              />
              <span>
                Li e aceito a Política de Privacidade e autorizo o contato do Grupo Servopa para informações sobre
                produtos, serviços e condições do Feirão, conforme a legislação vigente.
              </span>
            </label>

            <button type="submit" className="feirao-form__submit" disabled={!aceitePrivacidade}>
              Enviar inscrição
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
