import React from "react";
import Page from "../Page";
import "./AboutPage.scss";

import AboutHero from "./components/AboutHero";
import CompanyStory from "./components/CompanyStory";
import StatsStrip from "./components/StatsStrip";
import CapabilitiesMarquee from "./components/CapabilitiesMarquee";
import MissionVisionValues from "./components/MissionVisionValues";
import WhatWeDoSection from "./components/WhatWeDoSection";
import WorkflowTimeline from "./components/WorkflowTimeline";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import FinalCTASection from "./components/FinalCTASection";

const AboutPage = () => {
  return (
    <Page
      requireDarkRoom={true}
      pageClassName="about-page"
      closeButtonSide="right"
      panelContent={{
        title: "About Us",
        quote: "Building experiences, not just visuals.",
        content: [
          "Daniels Design & Dev turns architectural ideas into immersive digital stories, high-end visuals, and interactive experiences.",
        ],
      }}
      images={[
        "/images/about-1.webp",
        "/images/about-2.webp",
        "/images/about-3.webp",
      ]}
      marqueeItems={[
        "3D Visualization",
        "Architectural Design",
        "Interactive Experiences",
        "Parametric Modeling",
      ]}
    >
      <div className="about-page-content">
        <AboutHero />
        <CompanyStory />
        <StatsStrip />
        <CapabilitiesMarquee />
        <MissionVisionValues />
        <WhatWeDoSection />
        <WorkflowTimeline />
        <WhyChooseUsSection />
        <FinalCTASection />
      </div>
    </Page>
  );
};

export default AboutPage;