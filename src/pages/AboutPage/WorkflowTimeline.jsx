import React from "react";
import "./WorkflowTimeline.scss";

const steps = [
  {
    step: "01",
    title: "Discover",
    desc: "We study the vision, the site, and the story behind the project.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design",
    desc: "Concepts take shape through sketches, moodboards, and 3D blocking.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 20L14.5 9.5M14.5 9.5L18 13L21 10L15 4L12 7L14.5 9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 20L5.5 15.5L8.5 18.5L4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Develop",
    desc: "Real-time environments and high-fidelity renders bring the space to life.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 8L3 12L8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 8L21 12L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5L11 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Final assets, walkthroughs, and interactive builds — ready to present.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 12.5L10 17.5L19 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const WorkflowTimeline = () => {
  return (
    <section className="about-section zigzag-timeline-section">
      <div className="about-section-header">
        <span className="about-kicker">How We Work</span>
        <h3 className="about-section-title">Our Process</h3>
      </div>

      <div className="zigzag-wrapper">
        <div className="zigzag-track" aria-hidden="true"></div>

        <div className="zigzag-list">
          {steps.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                className={`zigzag-row ${isEven ? "left-aligned" : "right-aligned"}`}
                key={item.step}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="zigzag-node" aria-hidden="true">
                  <span className="node-ring"></span>
                  <span className="node-core">{item.icon}</span>
                </div>

                <div className="zigzag-content">
                  <span className="step-watermark" aria-hidden="true">
                    {item.step}
                  </span>
                  <div className="content-inner">
                    <h3>
                      <span className="step-icon">{item.icon}</span>
                      {item.title}
                      <span className="step-badge">{item.step}</span>
                    </h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowTimeline;