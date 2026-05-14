"use client";
import { useForm } from "@/hooks/useForm";
import ButtonDefault from "../Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "../ImgDefault/ImgDefault";
import InputText from "../Inputs/InputText/InputText";
import TextDefault from "../TextDefault/TextDefault";
import "./NewsLetter.scss";
import { FC } from "react";

interface SectionProps {}

interface NewsLetterProps {
  data?: SectionProps;
  debug?: boolean;
  locale?: string;
}

const NewsLetter: FC<NewsLetterProps> = ({ data, debug }) => {
  //   if (debug) {
  //     const debugLog = {
  //       TalentPoolLink: {
  //         section_check: data.section_check,
  //         title: data.title,
  //         subTitle: data.subTitle,
  //         description: data.description,
  //         link: data.link,
  //         image_desktop: data.image_desktop,
  //         image_mobile: data.image_mobile
  //       }
  //     };

  //     console.groupCollapsed("[TalentPoolLink][DEBUG] SUMMARY");
  //     console.dir(debugLog, { depth: null });
  //     console.groupEnd();
  //   }

  const button = {
    type: "",
    value: "",
    url: "string",
    name: "Inscreva-se",
    title: "Inscreva-se",
    target: "_target"
  };

  const { form, changeState, validation, loading, setLoading } = useForm({
    name: {
      value: "",
      invalid: false,
      errorLabel: "",
      required: true
    },
    email: {
      value: "",
      invalid: false,
      errorLabel: "",
      required: true
    }
  });

  function handleSubmit(e?: any) {
    if (e) e.preventDefault();

    setLoading(true);

    const isValid = validation();

    if (!isValid) {
      setLoading(false);
      return;
    }

    // Simula envio
    setTimeout(() => {
      console.log("Form enviado:", form);

      setLoading(false);
    }, 1500);
  }

  return (
    <section className="newsLetter">
      <div className="newsLetter__container">
        <div className="newsLetter__textContent">
          <div className="newsLetter__logoContainer">
            <div className="newsLetter__imgContainer">
              <ImgDefault className="newsLetter__img" src={"/images/teadit-red-white.webp"} alt="Logo Teadit" />
            </div>
            <h2 className="newsLetter__titleContainer">
              <TextDefault
                className="newsLetter__title"
                text={"Inscreva-se na nossa newsletter <strong>e receba nossas últimas novidades</strong>"}
              />
            </h2>
          </div>

          <form className="newsLetter__formContainer" onSubmit={handleSubmit}>
            <div className="newsLetter__inputText">
              <InputText
                placeholder="Nome"
                type="text"
                value={form.name.value}
                onChange={(e) => changeState("name", "value", e.target.value)}
              />
              {form.name.invalid && <p className="error">{form.name.errorLabel}</p>}
            </div>

            <div className="newsLetter__inputEmail">
              <InputText
                placeholder="E-mail"
                type="email"
                value={form.email.value}
                onChange={(e) => changeState("email", "value", e.target.value)}
              />
              {form.email.invalid && <p className="error">{form.email.errorLabel}</p>}
            </div>

            <div className="newsLetter__btnContainer">
              <ButtonDefault
                onClick={handleSubmit}
                variantLink={{ type: "button" }}
                data={button}
                styling="primary"
                icon="arrow-right-white"
                disabled={loading}
              />
            </div>
          </form>
        </div>
        <div className="newsLetter__imgContent">
          <ImgDefault className="newsLetter__img" src={"/images/teadit-red-white.webp"} alt="Logo Teadit" />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
