import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./WhatWeDoSection.scss";

const services = [
  {
    title: "3D Visualization",
    image: "/images/visualization.webp",
  },
  {
    title: "Real-Time Experience",
    image: "/images/realtime.webp",
  },
  {
    title: "Parametric Design",
    image: "/images/parametric.webp",
  },
  {
    title: "Motion & Walkthroughs",
    image: "/images/walkthrough.webp",
  },
];

const WhatWeDoSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          rotateX: 14,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rx = ((py - 0.5) * -10).toFixed(2);
    const ry = ((px - 0.5) * 12).toFixed(2);

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--mx", `50%`);
    card.style.setProperty("--my", `50%`);
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <section
      ref={sectionRef}
      className="about-section about-services-section"
      data-page-reveal
    >
      {" "}
      <div className="about-section-header about-services-header">
        {" "}
        <span className="about-kicker">What We Do</span>{" "}
        <h3 className="about-section-title">Capabilities</h3>{" "}
        <p className="about-lead">
          A layered visual toolkit that blends architecture, motion, and
          interactive technology into a single storytelling system.{" "}
        </p>{" "}
      </div>
      <div className="about-services-grid">
        {services.map((service, index) => (
          <article
            key={service.title}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`about-service-card about-service-card-${index + 1}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <img
              src={service.image}
              alt={service.title}
              className="about-service-image"
            />

            <div className="about-service-overlay" />

            <div className="about-service-content">
              <span className="about-service-number">0{index + 1}</span>

              <h3>{service.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
