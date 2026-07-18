import React from "react";

const services = [
  {
    title: "3D Visualization",
    desc: "Photorealistic renders that capture light, material, and mood with cinematic precision.",
  },
  {
    title: "Real-time Experiences",
    desc: "Interactive environments built in real-time engines — explore a space before it's built.",
  },
  {
    title: "Parametric Design",
    desc: "Algorithmic design workflows that adapt form to function, structure, and site conditions.",
  },
  {
    title: "Motion & Walkthroughs",
    desc: "Cinematic animations and VR walkthroughs that tell the story of a project in motion.",
  },
];

const WhatWeDoSection = () => {
  return (
    <section className="about-section about-services-section">
      <div className="about-section-header">
        <span className="about-kicker">What We Do</span>
        <h3 className="about-section-title">Capabilities</h3>
      </div>

      <div className="about-services-grid">
        {services.map((service) => (
          <div className="about-service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;