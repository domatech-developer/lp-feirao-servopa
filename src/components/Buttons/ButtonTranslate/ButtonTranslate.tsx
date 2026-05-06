"use client";
import "./ButtonTranslate.scss";
import { FC } from "react";
import useLocale from "@/hooks/useLocale";

interface ButtonTranslateProps {
  dropDownState: string;
  setDropDownState: React.Dispatch<React.SetStateAction<string>>;
}

const FLAG_ICONS: Record<string, { title: string; flag: string }> = {
  default: { title: "Idioma único", flag: "/icons/flag-brasil.svg" }
};

const ButtonTranslate: FC<ButtonTranslateProps> = ({ dropDownState, setDropDownState }) => {
  const locale = useLocale();

  return (
    <div className={`buttonTranslate active ${dropDownState === "buttonTranslate" && "clicked"}`}>
      <div className="buttonTranslate__container">
        <button
          title="Idioma disponível"
          className="buttonTranslate__content buttonTranslate__content--flagActive"
          onClick={() => (dropDownState === "buttonTranslate" ? setDropDownState("") : setDropDownState("buttonTranslate"))}
          onBlur={() => setDropDownState("")}
        >
          <figure className="buttonTranslate__imgContainer">
            <img
              src={FLAG_ICONS[locale]?.flag || FLAG_ICONS.default.flag}
              alt={FLAG_ICONS[locale]?.title || FLAG_ICONS.default.title}
              className="buttonTranslate__imgEmphasis"
            />
          </figure>
          <p className="buttonTranslate__title">{FLAG_ICONS[locale]?.title || FLAG_ICONS.default.title}</p>
        </button>

        <div className="buttonTranslate__content buttonTranslate__content--flagOptions">
          <div className="buttonTranslate__btn" role="note">
            <figure className="buttonTranslate__imgContainer">
              <img src={FLAG_ICONS.default.flag} alt={FLAG_ICONS.default.title} className="buttonTranslate__imgEmphasis" />
            </figure>
            <p className="buttonTranslate__title">{FLAG_ICONS.default.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonTranslate;
