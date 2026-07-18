import React from "react";

const reasons = [
  { title: "Senior-Level Craft", desc: "Every project is led by experienced architects and 3D artists, not junior hand-offs." },
  { title: "Fast Turnarounds", desc: "Real-time pipelines mean fewer render bottlenecks and faster client feedback loops." },
  { title: "End-to-End Delivery", desc: "From concept sketch to final interactive build, one team owns the entire journey." },
];

const WhyChooseUsSection = () => {
  return (
    <section className="about-section about-reasons-section">
      <div className="about-section-header">
        <span className="about-kicker">Why Choose Us</span>
        <h3 className="about-section-title">What Sets Us Apart</h3>
      </div>

      <div className="about-reasons-grid">
        {reasons.map((reason) => (
          <div className="about-reason-card" key={reason.title}>
            <h3>{reason.title}</h3>
            <p>{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;