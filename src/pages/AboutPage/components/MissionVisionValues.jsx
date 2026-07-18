import React from "react";

const values = [
  {
    title: "Precision",
    desc: "Every line, every render, every pixel is deliberate — nothing is left to chance.",
  },
  {
    title: "Innovation",
    desc: "We push architectural visualization forward with real-time 3D and AI-driven tools.",
  },
  {
    title: "Storytelling",
    desc: "A building is a narrative. We design experiences that make people feel the space before it exists.",
  },
];

const MissionVisionValues = () => {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="about-section about-values-section">
      <div className="about-section-header">
        <span className="about-kicker">What Drives Us</span>
        <h3 className="about-section-title">Mission, Vision &amp; Values</h3>
      </div>

      <div className="about-values-grid">
        {values.map((value, index) => (
          <div
            className="about-value-panel"
            key={value.title}
            onMouseMove={handleMove}
          >
            <span className="about-value-index">{`0${index + 1}`}</span>
            <h3>{value.title}</h3>
            <p>{value.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionValues;