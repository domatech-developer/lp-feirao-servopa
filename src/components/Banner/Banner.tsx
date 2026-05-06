import BreadCrumb from "../Breadcrumb/Breadcrumb";
import ButtonDefault from "../Buttons/ButtonDefault/ButtonDefault";
import ImgContainer from "../ImageContainer/ImageContainer";
import InputSelect from "../Inputs/InputSelect/InputSelect";
import TextDefault from "../TextDefault/TextDefault";
import VideoAutoPlay from "../Video/VideoAutoPlay/VideoAutoPlay";
import "./Banner.scss";
import { FC } from "react";

interface BannerProps {
  data?: any;
  debug?: boolean;
  locale?: string;
}

const Banner: FC<BannerProps> = ({ data, debug }) => {
  if (!data) return;

  if (debug) {
    const debugLog = {
      fields: {
        video_check: data.video_check,
        layout: data.layout,
        youtube_check: data.youtube_check,
        link: data.link,
        title: data.title,
        description: data.description,
        icon_check: data.icon_check,
        check_gradient: data.check_gradient,
        anchorLink: data.anchorLink,
        image_desktop: data.image_desktop,
        image_mobile: data.image_mobile,
        video_file: data.video_file,
        video_youtube: data.video_youtube
      }
    };

    console.groupCollapsed("[Banner][DEBUG] SUMMARY");
    console.dir(debugLog, { depth: null });
    console.groupEnd();
  }

  return (
    <div className="banner">
      <div className="banner__container" data-gradient={data.check_gradient} data-layout={data.layout}>
        {/* {data.anchorLink && (
          <div className="banner__anchorContainer">
            <BreadCrumb data={[{ name: data.anchorLink.title, url: data.anchorLink.url }]} />
          </div>
        )} */}
        {data.image_desktop && <ImgContainer image_desktop={data.image_desktop} image_mobile={data.image_mobile} />}
        {data.title && (
          <div className="banner__textContainer" data-layout={data.layout}>
            <h1 className="banner__titleContainer">{<TextDefault className="banner__title" text={data.title} />}</h1>
            {data.description && (
              <div className="banner__descriptionContainer">
                <TextDefault className="banner__description" text={data.description} />
              </div>
            )}

            {data.link && (
              <div className="banner__buttonContainer">
                <ButtonDefault variantLink={{ type: "link" }} data={data.link} styling="primary" icon="arrow-right-white" />
              </div>
            )}
          </div>
        )}
        {data.anchorLink && (
          <div className="banner__btnAnchorContainer">
            <ButtonDefault variantLink={{ type: "link" }} data={data.anchorLink} styling="tertiary" icon="chevron-down" />
          </div>
        )}
        {data.video_check === "true" && (
          <div className="banner__videoContainer">
            <VideoAutoPlay
              poster={"/images/banner-background.webp"}
              video={data.video_file}
              videoMobile={data.video_file}
              containerClass={"banner__videoContainer"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
