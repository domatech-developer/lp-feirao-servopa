"use client";
import "./ImgDefault.scss";
import { FC, useState } from "react";
import Image, { ImageProps } from "next/image";
import useResize from "@/hooks/useResize";

type ImgDefaultProps = ImageProps & {
  skeleton?: boolean;
  className?: string;
  srcMobile?: string;
};

const ImgDefault: FC<ImgDefaultProps> = ({ className, skeleton = true, srcMobile, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = !!srcMobile;
  return (
    <div className={`imgDefault ${className}`}>
      {skeleton && (
        <div className={`imgDefault__skeleton ${isLoaded && "imgDefault__skeleton--imgLoaded"} ${className}`} {...props} />
      )}
      <Image
        priority
        width={0}
        height={0}
        sizes="100vw"
        quality={100}
        onLoad={() => setIsLoaded(true)}
        className={`imgDefault__img ${isLoaded && "imgDefault__img--imgLoaded"} ${className}`}
        data-has-mobile={isMobile}
        {...props}
      />

      {srcMobile && (
        <Image
          priority
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
          onLoad={() => setIsLoaded(true)}
          className={`imgDefault__imgMobile ${isLoaded && "imgDefault__imgMobile--imgLoaded"} ${className}`}
          {...props}
          src={srcMobile}
        />
      )}
    </div>
  );
};

export default ImgDefault;
