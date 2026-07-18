import React from "react";
import Marquee from "../../../components/Marquee/Marquee";

const items = [
  "3D Visualization",
  "Real-time Engines",
  "Parametric Design",
  "VR Walkthroughs",
  "Motion Graphics",
  "Archviz",
];

const CapabilitiesMarquee = () => {
  return (
    <section className="about-section about-marquee-section">
      <div className="about-marquee-wrap">
        <Marquee items={items} speed={22} />
      </div>
    </section>
  );
};

export default CapabilitiesMarquee;