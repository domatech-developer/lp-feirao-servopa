"use client";

import { FormEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  FEIRAO_CITY_OPTIONS,
  getCityLabel,
  getDealersForCityMarca,
  getMarcasForCity,
} from "@/lib/feiraoFormLocations";
import { buildSyonetPhones, submitSyonetLead } from "@/lib/syonetLead";
import { useHomeFormModal } from "../HomeFormModalContext";
import "./FeiraoFormModal.scss";

const logoServopa = "/images/4673a74e78345a46f5e60b22edfa6d5b975cc62a.svg";
const iconClose = "/images/feirao-form-close.svg";
const iconRadioChecked = "/images/feirao-form-radio-checked.svg";
const iconRadioUnchecked = "/images/feirao-form-radio-unchecked.svg";
const iconCheckbox = "/images/feirao-form-checkbox.svg";

const PRIVACY_POLICY_HREF = "https://www.servopa.com.br/politica-de-privacidade" as const;
const DEFAULT_DATETIME = "2026-05-22T14:00";
const SUCCESS_AUTO_CLOSE_MS = 2200;

const EVENT_CONFIG_BASE = {
  eventGroup: "OPORTUNIDADE",
  source: "FEIRAO DE VERDADE E AQUI",
  media: "CLIENTES CADASTRADOS LP",
} as const;

const syonetEventTypeFromInteresse = (value: string) =>
  value === "SEMINOVOS" ? "SEMINOVOS WEB" : "NOVOS WEB";

const formatPhoneMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)})${digits.slice(2)}`;
  return `(${digits.slice(0, 2)})${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatHorarioTestDrive = (value: string) => {
  if (!value.trim()) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.trim();

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FeiraoFormModal() {
  const { isFeiraoFormModalOpen, closeFeiraoFormModal } = useHomeFormModal();
  const titleId = useId();
  const nomeRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const successCloseTimerRef = useRef<number | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidadeKey, setCidadeKey] = useState("");
  const [marca, setMarca] = useState("");
  const [concessionariaId, setConcessionariaId] = useState("");
  const [interesse, setInteresse] = useState("");
  const [testDrive, setTestDrive] = useState<"sim" | "nao">("sim");
  const [horario, setHorario] = useState(DEFAULT_DATETIME);
  const [mensagem, setMensagem] = useState("");
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const marcas = useMemo(() => getMarcasForCity(cidadeKey), [cidadeKey]);
  const dealers = useMemo(() => getDealersForCityMarca(cidadeKey, marca), [cidadeKey, marca]);

  const concessionariaLabel = useMemo(
    () => dealers.find((d) => String(d.id) === concessionariaId)?.label ?? "",
    [dealers, concessionariaId]
  );

  const showSummary = Boolean(cidadeKey && marca && concessionariaId);

  const resetForm = useCallback(() => {
    setNome("");
    setEmail("");
    setTelefone("");
    setCidadeKey("");
    setMarca("");
    setConcessionariaId("");
    setInteresse("");
    setTestDrive("sim");
    setHorario(DEFAULT_DATETIME);
    setMensagem("");
    setAceitePrivacidade(false);
  }, []);

  const handleClose = useCallback(() => {
    if (successCloseTimerRef.current !== null) {
      window.clearTimeout(successCloseTimerRef.current);
      successCloseTimerRef.current = null;
    }
    closeFeiraoFormModal();
    resetForm();
  }, [closeFeiraoFormModal, resetForm]);

  const handleCidadeChange = (value: string) => {
    setCidadeKey(value);
    setMarca("");
    setConcessionariaId("");
  };

  const handleMarcaChange = (value: string) => {
    setMarca(value);
    setConcessionariaId("");

    if (!cidadeKey || !value) return;

    const nextDealers = getDealersForCityMarca(cidadeKey, value);
    if (nextDealers.length === 1) {
      setConcessionariaId(String(nextDealers[0].id));
    }
  };

  const handlePhoneChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "").slice(0, 11);
    setTelefone(onlyDigits);
  };

  useEffect(() => {
    if (!isFeiraoFormModalOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => nomeRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) handleClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [isFeiraoFormModalOpen, handleClose, isSubmitting]);

  useEffect(() => {
    if (successCloseTimerRef.current !== null) {
      window.clearTimeout(successCloseTimerRef.current);
      successCloseTimerRef.current = null;
    }

    if (isFeiraoFormModalOpen) return;

    setWasSubmitted(false);
    setSubmitError(null);
    setIsSubmitting(false);
  }, [isFeiraoFormModalOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!aceitePrivacidade || !showSummary) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setWasSubmitted(false);

    try {
      const dealerId = Number(concessionariaId);
      if (!dealerId) {
        throw new Error("Concessionária inválida.");
      }

      if (interesse !== "NOVOS" && interesse !== "SEMINOVOS") {
        throw new Error("Interesse inválido.");
      }

      const interesseLabel = interesse === "NOVOS" ? "Novos" : "Seminovos";

      const cidadeLabel = getCityLabel(cidadeKey);
      const querTestDrive = testDrive === "sim";
      const horarioTestDriveLabel = querTestDrive ? formatHorarioTestDrive(horario) : "";

      const payload = {
        customer: {
          name: nome.trim(),
          emails: [email.trim()],
          phones: buildSyonetPhones(telefone),
        },
        event: {
          companyId: dealerId,
          ...EVENT_CONFIG_BASE,
          eventType: syonetEventTypeFromInteresse(interesse),
          comment: mensagem.trim(),
          leadInfo: {
            "Dados do Lead": {
              "Cidade de atendimento": cidadeLabel,
              "Marca de interesse": marca,
              "Concessionária": concessionariaLabel,
              "Unidade": concessionariaLabel,
              "Deseja fazer test drive": querTestDrive,
              "Horário de test drive": horarioTestDriveLabel,
              "Interesse": interesseLabel,
            },
          },
        },
      };

      await submitSyonetLead(payload);

      setWasSubmitted(true);
      resetForm();

      successCloseTimerRef.current = window.setTimeout(() => {
        successCloseTimerRef.current = null;
        closeFeiraoFormModal();
      }, SUCCESS_AUTO_CLOSE_MS);
    } catch {
      setSubmitError("Não foi possível enviar sua inscrição agora. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFeiraoFormModalOpen) return null;

  const canSubmit = aceitePrivacidade && showSummary && !isSubmitting && !wasSubmitted;

  return (
    <div
      className="feirao-form-modal__backdrop"
      role="presentation"
      onMouseDown={() => !isSubmitting && handleClose()}
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
          <div className="feirao-form-modal__header-main">
            <h2 id={titleId} className="feirao-form-modal__title">
              Preencha as informações e participe!
            </h2>
            <div className="feirao-form-modal__branding" data-node-id="2149:10665">
              <span className="feirao-form-modal__badge">Feirão DE VERDADE</span>
              <img src={logoServopa} alt="Grupo Servopa" className="feirao-form-modal__logo" width={158} height={28} />
            </div>
          </div>
          <button
            type="button"
            className="feirao-form-modal__close"
            aria-label="Fechar formulário"
            onClick={() => handleClose()}
            disabled={isSubmitting}
          >
            <img src={iconClose} alt="" width={24} height={24} aria-hidden />
          </button>
        </header>

        <div className="feirao-form-modal__body">
          {wasSubmitted ? (
            <div className="feirao-form__feedback feirao-form__feedback--success" role="status">
              <p className="feirao-form__feedback-title">Inscrição enviada!</p>
              <p className="feirao-form__feedback-text">
                Em breve nossa equipe entrará em contato. Obrigado por participar do Feirão Servopa.
              </p>
            </div>
          ) : (
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
                required
                disabled={isSubmitting}
              />
              <input
                className="feirao-form__input"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                className="feirao-form__input"
                name="telefone"
                type="tel"
                autoComplete="tel"
                placeholder="Telefone"
                inputMode="numeric"
                value={formatPhoneMask(telefone)}
                onChange={(e) => handlePhoneChange(e.target.value)}
                required
                disabled={isSubmitting}
              />

              <select
                className={`feirao-form__select${cidadeKey ? "" : " feirao-form__select--placeholder"}`}
                name="cidade"
                value={cidadeKey}
                onChange={(e) => handleCidadeChange(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione uma cidade...</option>
                {FEIRAO_CITY_OPTIONS.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                id="feirao-form-marca"
                className={`feirao-form__select${marca ? "" : " feirao-form__select--placeholder"}`}
                name="marca"
                value={marca}
                disabled={!cidadeKey || isSubmitting}
                onChange={(e) => handleMarcaChange(e.target.value)}
                required
              >
                <option value="">
                  {!cidadeKey ? "Selecione uma cidade primeiro..." : "Selecione uma marca..."}
                </option>
                {marcas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                className={`feirao-form__select${concessionariaId ? "" : " feirao-form__select--placeholder"}`}
                name="concessionaria"
                value={concessionariaId}
                disabled={!marca || isSubmitting}
                onChange={(e) => setConcessionariaId(e.target.value)}
                required
              >
                {dealers.length > 1 && (
                  <option value="">Selecione uma concessionária...</option>
                )}
                {!marca && <option value="">Selecione uma marca primeiro...</option>}
                {dealers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>

              <select
                className={`feirao-form__select${interesse ? "" : " feirao-form__select--placeholder"}`}
                name="interesse"
                value={interesse}
                onChange={(e) => setInteresse(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Novos ou seminovos...</option>
                <option value="NOVOS">Veículos novos</option>
                <option value="SEMINOVOS">Veículos seminovos</option>
              </select>

              <fieldset className="feirao-form__fieldset" disabled={isSubmitting}>
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
                    <img
                      src={testDrive === "sim" ? iconRadioChecked : iconRadioUnchecked}
                      alt=""
                      className="feirao-form__radio-icon"
                      aria-hidden
                    />
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
                    <img
                      src={testDrive === "nao" ? iconRadioChecked : iconRadioUnchecked}
                      alt=""
                      className="feirao-form__radio-icon"
                      aria-hidden
                    />
                    Não
                  </label>
                </div>
              </fieldset>

              {testDrive === "sim" && (
                <div className="feirao-form__float feirao-form__datetime-shell">
                  <label
                    className="feirao-form__float-label feirao-form__float-label--raised"
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
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <textarea
                className="feirao-form__textarea"
                name="mensagem"
                placeholder="Mensagem"
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                disabled={isSubmitting}
              />

              <label className="feirao-form__consent">
                <input
                  type="checkbox"
                  name="privacidade"
                  checked={aceitePrivacidade}
                  onChange={(e) => setAceitePrivacidade(e.target.checked)}
                  disabled={isSubmitting}
                />
                {aceitePrivacidade ? (
                  <img src={iconCheckbox} alt="" className="feirao-form__consent-icon" aria-hidden />
                ) : (
                  <span className="feirao-form__consent-box" aria-hidden />
                )}
                <span>
                  Li e aceito a{" "}
                  <a
                    href={PRIVACY_POLICY_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feirao-form__consent-link"
                  >
                    Política de Privacidade
                  </a>{" "}
                  e autorizo o contato do Grupo Servopa sobre o Feirão.
                </span>
              </label>

              {submitError && (
                <div className="feirao-form__feedback feirao-form__feedback--error" role="alert">
                  {submitError}
                </div>
              )}

              <button type="submit" className="feirao-form__submit" disabled={!canSubmit}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
