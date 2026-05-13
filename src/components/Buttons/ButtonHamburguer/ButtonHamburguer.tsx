import "./ButtonHamburguer.scss";
import { FC, ButtonHTMLAttributes } from "react";

type ButtonHamburguerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonHamburguer: FC<ButtonHamburguerProps> = ({ open, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={`buttonHamburguer${open ? " active" : ""}`}
      title={open ? "Fechar menu" : "Abrir menu"}
      onClick={(e) => onClick(e)}
      {...props}
    >
      {/* <span>: fluxo permitido dentro de <button>; <div> invalida o HTML e pode quebrar hidratação (ex.: Safari). */}
      <span
        className={`buttonHamburguer__lineTop${open ? " buttonHamburguer__lineTop--open" : ""}`}
        aria-hidden
      />
      <span
        className={`buttonHamburguer__lineMiddle${open ? " buttonHamburguer__lineMiddle--open" : ""}`}
        aria-hidden
      />
      <span
        className={`buttonHamburguer__lineBottom${open ? " buttonHamburguer__lineBottom--open" : ""}`}
        aria-hidden
      />
    </button>
  );
};

export default ButtonHamburguer;
