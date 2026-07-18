import React, { useRef, useCallback } from "react";
import Page from "../Page";
import "./AboutPage.scss";

import AboutHero from "./AboutHero";
import CompanyStory from "./CompanyStory";
import StatsStrip from "./StatsStrip";
import CapabilitiesMarquee from "./CapabilitiesMarquee";
import MissionVisionValues from "./MissionVisionValues";
import WhatWeDoSection from "./WhatWeDoSection";
import WorkflowTimeline from "./WorkflowTimeline";
import WhyChooseUsSection from "./WhyChooseUsSection";
import FinalCTASection from "./FinalCTASection";

const AboutPage = () => {
  const contentRef = useRef(null);

  // نظام تتبع الماوس الذكي لخلق هالة ضوئية تفاعلية على مستوى الصفحة والكروت
  const handleMouseMove = useCallback((e) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // تمرير الإحداثيات للمتغيرات في الـ CSS
    contentRef.current.style.setProperty("--mx", `${x}px`);
    contentRef.current.style.setProperty("--my", `${y}px`);
  }, []);

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
        "Virtual Reality",
        "Digital Twin",
      ]}
    >
      <div 
        className="about-page-content" 
        ref={contentRef}
        onMouseMove={handleMouseMove}
      >
        {/* شبكة معمارية دقيقة تعطي المظهر الهندسي الفاخر (Linear / Vercel Vibe) */}
        <div className="architectural-grid" aria-hidden="true" />

        {/* هالة ضوئية تتبع الماوس في الخلفية */}
        <div className="global-spotlight" aria-hidden="true" />

        {/* الأقسام الفعلية للصفحة */}
        <div className="about-sections-wrapper">
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
      </div>
    </Page>
  );
};

export default AboutPage;