import Image from "next/image";
import React, { FC } from "react";
import "./ImageContainer.scss";

type ImageProps = {
  title?: string;
  filename?: string;
  url: string;
  link?: string;
  alt: string;
  name?: string;
  mime_type?: string;
  type?: string;
  description?: string;
  caption?: string;
};

export type ImgContainerProps = {
  image_desktop?: ImageProps;
  image_mobile?: ImageProps;
  image?: ImageProps;
  className?: string;
  debug?: boolean;
  alt?: string;
};

const getImageText = (img?: ImageProps) => img?.alt || img?.name || img?.description || img?.title || img?.caption || "";

const ImgContainer: FC<ImgContainerProps> = ({
  className = "imgContainer",
  image_desktop,
  image_mobile,
  image,
  alt,
  debug = false
}) => {
  if (debug) {
    return (
      <pre
        style={{
          padding: "20px",
          background: "orange",
          color: "#000",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          fontSize: "14px"
        }}
      >
        {JSON.stringify({ image, image_desktop, image_mobile, className }, null, 2)}
      </pre>
    );
  }

  const mainImage = image || image_desktop || image_mobile;
  if (!mainImage) return null;

  const sourceText = getImageText(mainImage);
  const hasResponsive = image_desktop && image_mobile;

  return (
    <picture className={`${className}__imgContainer`} title={sourceText}>
      {hasResponsive && (
        <>
          <source media="(min-width: 769px)" srcSet={image_desktop!.url} />
          <source media="(max-width: 768px)" srcSet={image_mobile!.url} />
        </>
      )}

      <img
        src={hasResponsive ? image_mobile!.url : mainImage.url}
        alt={alt ?? ""}
        className={`${className}__img`}
        sizes="100vw"
      />
    </picture>
  );
};

export default ImgContainer;