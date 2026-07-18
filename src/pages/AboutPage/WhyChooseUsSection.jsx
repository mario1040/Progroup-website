import React, { useState } from "react";
import "./WhyChooseUsSection.scss";

const reasons = [
  {
    title: "Senior-Level Craft",
    desc: "Every project is led by experienced architects and 3D artists, not junior hand-offs.",
    stat: "100%",
    statLabel: "Senior-Led Delivery",
  },
  {
    title: "Fast Turnarounds",
    desc: "Real-time pipelines mean fewer render bottlenecks and faster client feedback loops.",
    stat: "2×",
    statLabel: "Faster Feedback Loops",
  },
  {
    title: "End-to-End Delivery",
    desc: "From concept sketch to final interactive build, one team owns the entire journey.",
    stat: "1",
    statLabel: "Team, Full Journey",
  },
];

const WhyChooseUsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = reasons[activeIndex];

  return (
    <section className="about-section why-section">
      <div className="about-section-header">
        <span className="about-kicker">Why Choose Us</span>
        <h3 className="about-section-title">What Sets Us Apart</h3>
      </div>

      <div className="why-layout">
        <div className="why-list" role="tablist">
          {reasons.map((reason, index) => (
            <button
              key={reason.title}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`why-row${activeIndex === index ? " is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span className="why-row-index">{`0${index + 1}`}</span>
              <span className="why-row-title">{reason.title}</span>
              <span className="why-row-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="why-row-fill" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="why-detail">
          {/* الـ key بيخلي React يعمل remount للعنصر ده كل مرة تتغير، وده بيشغل الأنيميشن تاني من الأول */}
          <div className="why-detail-inner" key={activeIndex}>
            <span className="why-detail-number">{active.stat}</span>
            <p className="why-detail-desc">{active.desc}</p>
            <span className="why-detail-label">{active.statLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;