import "./InputText.scss";
import { FC, ComponentProps } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type InputProp = ComponentProps<"input"> & {
  label?: string;
  erroMsg?: string;
  invalid?: boolean;
  fullSize?: string;
};

const InputText: FC<InputProp> = ({
  id,
  label,
  erroMsg,
  invalid = false,
  required = false,
  fullSize = "w-100",
  ...props
}) => {
  const inputId =  '';

  const errorId = `${inputId}-error`;

  return (
    <div
      className={`inputText ${invalid ? "inputText--invalid" : ""} ${fullSize}`}
    >
      {label && (
        <label htmlFor={inputId} className="inputText__label">
          {label}
          {required && <span className="sr-only"> (obrigatório)</span>}
        </label>
      )}

      <input
        id={inputId}
        className="inputText__element"
        aria-invalid={invalid ? "true" : "false"}
        aria-describedby={invalid ? errorId : undefined}
        required={required}
        {...props}
      />

      {invalid && (
        <div
          id={errorId}
          className="inputText__helpContainer"
          role="alert"
        >
          <ImgDefault
            src="/icons/alert.svg"
            alt=""
            aria-hidden="true"
            className="inputText__helpIcon"
          />
          <span className="inputText__helpText">{erroMsg}</span>
        </div>
      )}
    </div>
  );
};

export default InputText;