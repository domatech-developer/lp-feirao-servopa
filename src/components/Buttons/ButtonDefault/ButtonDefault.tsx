import { VariantButton } from "@/@types/variantButton";
import "./ButtonDefault.scss";
import { Icons } from "@/@types/icons";
import { ButtonVariants } from "@/@types/variants";
import LinkDefault from "@/components/LinkDefault/LinkDefault";
import { FC, ButtonHTMLAttributes } from "react";
import { LinkAcf } from "@/@types/link";
import { PositionIcon } from "@/@types/positionIcon";

type ButtonDefaultProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  styling?: ButtonVariants;
  circular?: boolean;
  disabled?: boolean;
  positionIcon?: PositionIcon;
  variantLink: VariantButton;
  data: LinkAcf;
  icon?: Icons;
  img?: any;
};

const ButtonDefault: FC<ButtonDefaultProps> = ({
  disabled,
  circular,
  styling = "primary",
  variantLink,
  data,
  icon,
  img,
  positionIcon = ""
}) => {
  const { title, url, target = "" } = data;

  return (
    <>
      {variantLink.type === "button" ? (
        <button
          className={`buttonDefault buttonDefault__${styling} ${circular ? "buttonDefault--circular" : ""}  ${
            disabled ? `buttonDefault__${styling}--disabled` : ""
          } ${positionIcon ? `buttonDefault__${styling}--${positionIcon}` : ""}`}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          data-icon={`${positionIcon || icon ? true : false}`}
          title={title}
        >
          {positionIcon === "leftRight" && icon && (
            <div className="buttonDefault__iconContainer">
              <img className="buttonDefault__icon" src={`/icons/${icon}.svg`} alt={icon} />
            </div>
          )}
          {img && (
            <div className="buttonDefault__imgContainer">
              <img className="buttonDefault__img" src={`/images/woman.webp`} alt={img} />
            </div>
          )}
          <span
            className={`buttonDefault__text buttonDefault__text--${styling} ${
              !positionIcon && !icon && "buttonDefault__text--noIcon"
            }`}
          >
            {title}
          </span>

          {icon && (
            <div className="buttonDefault__iconContainer">
              <img className="buttonDefault__icon" src={`/icons/${icon}.svg`} alt={icon} />
            </div>
          )}
        </button>
      ) : (
        <LinkDefault
          className={`buttonDefault buttonDefault__${styling} ${circular ? "buttonDefault--circular" : ""} ${
            disabled ? `buttonDefault__${styling}--disabled` : ""
          } ${positionIcon ? `buttonDefault__${styling}--${positionIcon}` : ""}`}
          tabIndex={disabled ? -1 : 0}
          href={url}
          target={target}
          title={title}
          data-icon={`${positionIcon || icon ? true : false}`}
        >
          {positionIcon === "leftRight" && icon && (
            <div className="buttonDefault__iconContainer">
              <img className="buttonDefault__icon" src={`/icons/${icon}.svg`} alt={icon} />
            </div>
          )}
          {img && (
            <div className="buttonDefault__imgContainer">
              <img className="buttonDefault__img" src={`/images/woman.webp`} alt={img} />
            </div>
          )}
          <span
            className={`buttonDefault__text buttonDefault__text--${styling} ${
              !positionIcon && !icon && "buttonDefault__text--noIcon"
            }`}
          >
            {title}
          </span>
          {icon && (
            <div className="buttonDefault__iconContainer">
              <img className="buttonDefault__icon" src={`/icons/${icon}.svg`} alt={icon} />
            </div>
          )}
        </LinkDefault>
      )}
    </>
  );
};

export default ButtonDefault;
