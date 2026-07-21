import React, { useState } from "react";
import "./ModularGrid.scss";

/**
 * كل يونيت هنا مبني كصندوق مطبخ حقيقي 3D (مش كارت مسطح):
 * cabinet-door (الباب، البلين الأمامي) + cabinet-side (حرف الصندوق الجانبي)
 * + cabinet-interior (الضهر، غاطس لجوه بالـ translateZ) + cabinet-led (إضاءة داخلية).
 * كل باب ليه "finish" حقيقي (خامة/لون) زي كتالوج تشطيبات مطابخ حقيقي.
 */

const services = [
  {
    id: "01",
    title: "3D Visualization",
    tag: "Renders",
    finish: "Walnut Veneer",
    finishA: "#4a3220",
    finishB: "#2a1c12",
    desc: "Photorealistic stills that capture light, material, and mood with cinematic precision.",
    specs: ["Ray-traced lighting", "8K delivery", "Unlimited revisions"],
  },
  {
    id: "02",
    title: "Real-time Walkthroughs",
    tag: "Interactive",
    finish: "Matte Graphite",
    finishA: "#3a3b3d",
    finishB: "#1e1f21",
    desc: "Explore a space before it's built — full camera freedom in a live real-time engine.",
    specs: ["Unreal / Unity pipeline", "60fps target", "Web-deployable build"],
  },
  {
    id: "03",
    title: "Parametric Design",
    tag: "Systems",
    finish: "Bronze Metal",
    finishA: "#5c4326",
    finishB: "#33240f",
    desc: "Algorithmic workflows that adapt kitchen modules to any layout or site condition.",
    specs: ["Rule-based generation", "Rapid variant testing", "CAD-ready export"],
  },
  {
    id: "04",
    title: "Motion & Cinematics",
    tag: "Film",
    finish: "Espresso Oak",
    finishA: "#2e2013",
    finishB: "#17110a",
    desc: "Cinematic animations that tell a project's story in motion, from concept to reveal.",
    specs: ["Storyboard included", "Color-graded", "Multi-format cuts"],
  },
  {
    id: "05",
    title: "VR / AR Presentation",
    tag: "Immersive",
    finish: "Sage Stone",
    finishA: "#3c4238",
    finishB: "#21261f",
    desc: "Step inside a design with headset-ready VR, or preview it on-site with AR overlays.",
    specs: ["Quest / Vision Pro", "AR marker tracking", "On-site iPad demo"],
  },
  {
    id: "06",
    title: "Art Direction",
    tag: "Consulting",
    finish: "Slate Blue",
    finishA: "#2c3238",
    finishB: "#16191c",
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
          Six modules, straight off our showroom floor. Open a door to see
          what's built inside.
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
              style={{ "--finish-a": service.finishA, "--finish-b": service.finishB }}
            >
              <div className="cabinet-box">
                {/* الضهر — بيغطس لجوه بالـ translateZ فيبقى فيه عمق حقيقي */}
                <div className="cabinet-interior">
                  <span className="cabinet-led" aria-hidden="true" />
                  <span className="cabinet-tag">{service.tag}</span>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <span className="cabinet-shelf" aria-hidden="true" />
                  <ul className="cabinet-specs">
                    {service.specs.map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </div>

                {/* حرف الصندوق الجانبي — بيبين لما الباب يفتح */}
                <span className="cabinet-side side-left" aria-hidden="true" />
                <span className="cabinet-side side-right" aria-hidden="true" />

                {/* الباب — الواجهة التفاعلية */}
                <button
                  type="button"
                  className="cabinet-door"
                  onClick={() => toggle(service.id)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Close" : "Open"} ${service.title} details`}
                >
                  <span className="cabinet-grain" aria-hidden="true" />
                  <span className="cabinet-plate">
                    <span className="cabinet-id">{service.id}</span>
                    <span className="cabinet-finish">{service.finish}</span>
                  </span>
                  <span className="cabinet-title">{service.title}</span>
                  <span className="cabinet-handle" aria-hidden="true" />
                </button>
              </div>

              <span className="cabinet-contact-shadow" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ModularGrid;