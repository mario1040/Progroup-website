import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./MissionVisionValues.scss";

const values = [
  {
    title: "Precision",
    desc: "Every line, every render, every pixel is deliberate — nothing is left to chance.",
    tag: "Mission",
  },
  {
    title: "Innovation",
    desc: "We push architectural visualization forward with real-time 3D and AI-driven tools.",
    tag: "Vision",
  },
  {
    title: "Storytelling",
    desc: "A building is a narrative. We design experiences that make people feel the space before it exists.",
    tag: "Values",
  },
];

const MissionVisionValues = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 34,
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
          stagger: 0.13,
          ease: "power3.out",
        },
      );

      gsap.to(cards, {
        y: "-=8",
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "sine.inOut",
      });
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
      className="about-section about-values-section"
      data-page-reveal
    >
      {" "}
      <div className="about-section-header about-values-header">
        {" "}
        <span className="about-kicker">What Drives Us</span>{" "}
        <h3 className="about-section-title">Mission, Vision & Values</h3>{" "}
        <p className="about-lead">
          A studio built to balance cinematic aesthetics, technical clarity, and
          future-facing digital workflows.{" "}
        </p>{" "}
      </div>
      <div className="about-values-grid">
        {values.map((value, index) => (
          <article
            key={value.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="about-value-panel"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="about-value-panel-glow" aria-hidden="true" />
            <div className="about-value-panel-inner">
              <div className="about-value-topline">
                <span className="about-value-index">{`0${index + 1}`}</span>
                <span className="about-value-tag">{value.tag}</span>
              </div>

              <h3>{value.title}</h3>
              <p>{value.desc}</p>

              <div className="about-value-footer">
                <span className="about-value-line" />
                <span className="about-value-chip">
                  {index === 0
                    ? "Craft before everything"
                    : index === 1
                      ? "AI-assisted evolution"
                      : "Emotion through space"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionValues;
