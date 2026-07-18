import React, { useEffect, useMemo, useRef } from "react";
import "./Page.scss";
import { useNavigate } from "react-router";
import { useToggleRoomStore } from "../stores/toggleRoomStore";
import { usePageTransitionStore } from "../stores/pageTransitionStore";
import gsap from "gsap";
import Carousel from "../components/Carousel/Carousel";
import Marquee from "../components/Marquee/Marquee";

const Page = ({
  requireDarkRoom,
  panelContent,
  imageSrc,
  images,
  marqueeItems,
  pageClassName,
  children,
  closeButtonSide = "left",
}) => {
  const { isDarkRoom, setDarkRoom } = useToggleRoomStore();
  const { isEntering, delay } = usePageTransitionStore();

  const navigate = useNavigate();
  const innerWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  const contentRootRef = useRef(null);

  const gallery = useMemo(() => {
    return images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  }, [images, imageSrc]);

  useEffect(() => {
    if (requireDarkRoom !== isDarkRoom) {
      setDarkRoom(requireDarkRoom);
    }
  }, [requireDarkRoom, isDarkRoom, setDarkRoom]);

  useEffect(() => {
    if (!isEntering) return;

    const root = contentRootRef.current;
    const revealItems = root
      ? Array.from(root.querySelectorAll("[data-page-reveal]"))
      : [];

    const animationTargets = [
      headerRef.current,
      quoteRef.current,
      ...revealItems,
    ].filter(Boolean);

    gsap.set(animationTargets, {
      opacity: 0,
      y: 20,
    });

    const newDelay = delay >= 2 ? delay : 0.3;
    const tl = gsap.timeline({ delay: newDelay });

    if (headerRef.current) {
      tl.to(
        headerRef.current,
        {
          duration: 0.9,
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        0
      );
    }

    if (quoteRef.current) {
      tl.to(
        quoteRef.current,
        {
          duration: 0.9,
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        0.15
      );
    }

    revealItems.forEach((item, index) => {
      tl.to(
        item,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        0.3 + index * 0.12
      );
    });
  }, [isEntering, delay]);

  const panelClassNames = `side-panel${!isDarkRoom ? " light" : ""}${
    pageClassName ? ` ${pageClassName}` : ""
  }`;

 const closeButtonClassNames = `
side-panel-close-button
${!isDarkRoom ? " light" : ""}
${closeButtonSide === "left"
    ? " side-panel-close-button--left"
    : " side-panel-close-button--right"}
`;
  

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={panelClassNames}>
      <button onClick={handleClick} className={closeButtonClassNames} aria-label="Close page">
        <svg
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2.28906 0.875C1.77803 1.30566 1.30522 1.77763 0.873047 2.28711L8.58594 10L0.873047 17.7129C1.30522 18.2224 1.77803 18.6943 2.28906 19.125L10 11.4141L17.7109 19.125C18.222 18.6943 18.6948 18.2224 19.127 17.7129L11.4141 10L19.127 2.28711C18.6948 1.77763 18.222 1.30566 17.7109 0.875L10 8.58594L2.28906 0.875Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className="side-panel-wrapper">
        <div className="side-panel-inner-wrapper" ref={innerWrapperRef}>
          {gallery.length > 0 && (
            <div className="side-panel-image-wrapper">
              <Carousel images={gallery} />
            </div>
          )}

          {marqueeItems && marqueeItems.length > 0 && (
            <div className="side-panel-marquee">
              <Marquee items={marqueeItems} />
            </div>
          )}

          <div className="side-panel-content-wrapper" ref={contentRootRef}>
            {panelContent && (
              <>
                <h1 className="panel-header" ref={headerRef}>
                  {panelContent.title}
                </h1>

                <h3 className="panel-quote" ref={quoteRef}>
                  {panelContent.quote}
                </h3>

                {panelContent.content?.map((text, index) => (
                  <p
                    key={index}
                    className="panel-content-text"
                    data-page-reveal
                  >
                    {text}
                  </p>
                ))}
              </>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;