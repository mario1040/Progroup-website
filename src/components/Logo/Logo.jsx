import React, { useRef, useEffect } from "react";
import { useToggleRoomStore } from "../../stores/toggleRoomStore";
import "./Logo.scss";
import gsap from "gsap";
import logoDark from "./logo-dark.png";
import logoLight from "./logo-light.png";

const Logo = () => {
  const { isDarkRoom, isBeforeZooming } = useToggleRoomStore();
  const logoRef = useRef();

  const logoClassNames = `logo${!isDarkRoom ? " light" : ""}`;
  const logoSrc = isDarkRoom ? logoDark : logoLight;

  useEffect(() => {
    if (!logoRef.current) return;

    gsap.to(logoRef.current, {
      opacity: isBeforeZooming ? 0 : 1,
      duration: 1,
    });
  }, [isBeforeZooming]);

  return (
    <div ref={logoRef} className={logoClassNames}>
      <img src={logoSrc} alt="ProGroup" className="logo-img" />
    </div>
  );
};

export default Logo;