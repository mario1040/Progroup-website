import React from "react";
import Page from "../Page";
import "./ServicesPage.scss";

import ModularGrid from "./ModularGrid";
import ServicesCTA from "./ServicesCTA";

const ServicesPage = () => {
  return (
    <Page
      requireDarkRoom={true}
      pageClassName="services-page"
      closeButtonSide="right"
      panelContent={{
        title: "Our Services",
        quote: "Every unit, custom-built for the story you're telling.",
        content: [
          "We design each service like a module — precise, self-contained, and built to fit seamlessly into a larger system. Open a unit to see what's inside.",
        ],
      }}
      images={[
        "/images/services-1.webp",
        "/images/services-2.webp",
        "/images/services-3.webp",
      ]}
      marqueeItems={[
        "3D Visualization",
        "Real-time Walkthroughs",
        "Motion & Cinematics",
        "VR / AR Presentation",
      ]}
    >
      <div className="svc-page-content" data-page-reveal>
        <ModularGrid />
        <ServicesCTA />
      </div>
    </Page>
  );
};

export default ServicesPage;