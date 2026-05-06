"use client";

import "./InputFile.scss";
import { FC, useState, useId } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg?: string;
  invalid?: boolean;
  fullSize?: string;
  icon?: string;
};

const InputFile: FC<InputProp> = ({
  id,
  fullSize = "w-100",
  label,
  erroMsg,
  invalid,
  icon = "/icons/download.svg",
  ...props
}) => {

  const [fileName, setFileName] = useState<string>("");
  const inputId = id || useId();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <div className={`inputFile ${invalid ? "inputFile--invalid" : ""} ${fullSize}`}>

      {label && (
        <label htmlFor={inputId} className={`inputFile__label ${invalid ? "inputFile__label--invalid" : ""}`}>
          {label}
        </label>
      )}

      <label
        htmlFor={inputId}
        className="inputFile__customBtn"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            document.getElementById(inputId)?.click();
          }
        }}
      >
        <div className="inputFile__iconContainer">
          <img src={icon} alt="" className="inputFile__icon" aria-hidden="true" />
        </div>

        <span>{fileName || "Escolher arquivo"}</span>
      </label>

      <input
        {...props}
        className="inputFile__element"
        id={inputId}
        type="file"
        tabIndex={-1}
        onChange={(e) => {
          handleFileChange(e);
          props.onChange?.(e);
        }}
      />

      <span className="inputFile__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputFile;