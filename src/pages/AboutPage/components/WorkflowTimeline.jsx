import React from "react";

const steps = [
  { step: "01", title: "Discover", desc: "We study the vision, the site, and the story behind the project." },
  { step: "02", title: "Design", desc: "Concepts take shape through sketches, moodboards, and 3D blocking." },
  { step: "03", title: "Develop", desc: "Real-time environments and high-fidelity renders bring the space to life." },
  { step: "04", title: "Deliver", desc: "Final assets, walkthroughs, and interactive builds — ready to present." },
];

const WorkflowTimeline = () => {
  return (
    <section className="about-section about-process-section">
      <div className="about-section-header">
        <span className="about-kicker">How We Work</span>
        <h3 className="about-section-title">Our Process</h3>
      </div>

      <div className="about-process-list">
        {steps.map((item, index) => (
          <div
            className="about-process-item"
            key={item.step}
            style={{ animationDelay: `${0.1 + index * 0.12}s` }}
          >
            <div className="about-process-marker">
              <span>{item.step}</span>
            </div>
            <div className="about-process-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowTimeline;