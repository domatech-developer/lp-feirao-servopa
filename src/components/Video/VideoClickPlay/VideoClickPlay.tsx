"use client";
import "./VideoClickPlay.scss";
import { FC, useRef, useState } from "react";

interface VideoSource {
  url: string;
  mime_type: string;
}

interface videoProps {
  videoDesktop?: VideoSource;
  videoMobile?: VideoSource;
  play?: boolean;
  poster?: {
    url: string;
  };
}

const VideoClickPlay: FC<videoProps> = ({ poster, videoDesktop, videoMobile, play = false }) => {
  const [isActive, setIsActive] = useState(play);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.pause();
        setIsActive(false);
      } else {
        videoRef.current.play();
        setIsActive(true);
      }
    }
  };

  return (
    <div className={`videoClickPlay ${isActive && "active"}`} onClick={handleClick}>
      <video className="videoClickPlay__emphasis" poster={poster?.url} ref={videoRef}>
        {videoDesktop && <source src={videoDesktop.url} type={videoDesktop.mime_type} media="(min-width: 768px)" />}
        {videoMobile && <source src={videoMobile.url} type={videoMobile.mime_type} media="(max-width: 767px)" />}
      </video>
    </div>
  );
};

export default VideoClickPlay;
