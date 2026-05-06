import "./ButtonLink.scss";
import { FC } from "react";
import { Icons } from "@/@types/icons";
import { ButtonVariants } from "@/@types/variants";
import LinkDefault, { LinkDefaultProps } from "@/components/LinkDefault/LinkDefault";

type ButtonLinkProps = Omit<LinkDefaultProps, "href"> & {
  linkProps: { url?: string; title?: string; target?: string; name: string };
  variant?: ButtonVariants;
  disabled?: boolean;
  circular?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  active?: boolean;
};

const ButtonLink: FC<ButtonLinkProps> = ({
  linkProps,
  variant = "primary",
  disabled,
  circular,
  iconLeft,
  iconRight,
  active = false,
  ...props
}) => {
  if (!linkProps?.url) return null;

  return (
    <LinkDefault
      className={`buttonLink buttonLink__${variant} ${circular && `buttonLink--circular`} 
      ${!!disabled && `buttonLink__${variant}--disabled`} ${!!active && `buttonLink__${variant}--active`}`}
      target={linkProps?.target}
      title={linkProps?.name}
      href={linkProps?.url ?? "#"}
      {...props}
    >
      {!!iconLeft && (
        <div className="buttonLink__iconContainer">
          <img className="buttonLink__icon" src={`/icons/${iconLeft}.svg`} alt={iconRight} />
        </div>
      )}
      {!!linkProps?.title && <span className={`buttonLink__text buttonLink__text--${variant}`}>{linkProps?.title}</span>}
      {!!iconRight && (
        <div className="buttonLink__iconContainer">
          <img className="buttonLink__icon" src={`/icons/${iconRight}.svg`} alt={iconRight} />
        </div>
      )}
    </LinkDefault>
  );
};

export default ButtonLink;
