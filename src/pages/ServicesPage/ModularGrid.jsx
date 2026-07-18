import React, { useState } from "react";
import "./ModularGrid.scss";

const services = [
  {
    id: "01",
    title: "3D Visualization",
    tag: "Renders",
    desc: "Photorealistic stills that capture light, material, and mood with cinematic precision.",
    specs: ["Ray-traced lighting", "8K delivery", "Unlimited revisions"],
  },
  {
    id: "02",
    title: "Real-time Walkthroughs",
    tag: "Interactive",
    desc: "Explore a space before it's built — full camera freedom in a live real-time engine.",
    specs: ["Unreal / Unity pipeline", "60fps target", "Web-deployable build"],
  },
  {
    id: "03",
    title: "Parametric Design",
    tag: "Systems",
    desc: "Algorithmic workflows that adapt kitchen modules to any layout or site condition.",
    specs: ["Rule-based generation", "Rapid variant testing", "CAD-ready export"],
  },
  {
    id: "04",
    title: "Motion & Cinematics",
    tag: "Film",
    desc: "Cinematic animations that tell a project's story in motion, from concept to reveal.",
    specs: ["Storyboard included", "Color-graded", "Multi-format cuts"],
  },
  {
    id: "05",
    title: "VR / AR Presentation",
    tag: "Immersive",
    desc: "Step inside a design with headset-ready VR, or preview it on-site with AR overlays.",
    specs: ["Quest / Vision Pro", "AR marker tracking", "On-site iPad demo"],
  },
  {
    id: "06",
    title: "Art Direction",
    tag: "Consulting",
    desc: "Strategic guidance on materiality, lighting, and narrative for your next presentation.",
    specs: ["Moodboarding", "Material sourcing", "Client-facing decks"],
  },
];

const ModularGrid = () => {
  const [openSet, setOpenSet] = useState(() => new Set());

  const toggle = (id) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="svc-section modular-section" data-page-reveal>
      <div className="svc-section-header">
        <span className="svc-kicker">What We Offer</span>
        <h3 className="svc-section-title">The Cabinet Wall</h3>
        <p className="svc-lead">
          Six units, six capabilities. Tap a door to see what's built inside.
        </p>
      </div>

      <div className="cabinet-wall">
        {services.map((service, index) => {
          const isOpen = openSet.has(service.id);
          const hingeLeft = index % 2 === 0;

          return (
            <div
              className={`cabinet-unit${isOpen ? " is-open" : ""}${hingeLeft ? " hinge-left" : " hinge-right"}`}
              key={service.id}
            >
              <button
                type="button"
                className="cabinet-door"
                onClick={() => toggle(service.id)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Close" : "Open"} ${service.title} details`}
              >
                <span className="cabinet-grain" aria-hidden="true" />
                <span className="cabinet-id">{service.id}</span>
                <span className="cabinet-title">{service.title}</span>
                <span className="cabinet-handle" aria-hidden="true" />
              </button>

              <div className="cabinet-interior">
                <span className="cabinet-tag">{service.tag}</span>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
                <ul className="cabinet-specs">
                  {service.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ModularGrid;