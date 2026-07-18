import React, { useState } from "react";
import "./CompanyStory.scss";

const storyZones = [
  {
    id: "01",
    label: "Origins",
    title: "How We Started",
    text: "Founded by architects and 3D artists who felt static renders weren't enough — we built a studio around motion, interactivity, and real-time technology.",
  },
  {
    id: "02",
    label: "Future",
    title: "Where We're Going",
    text: "We're pushing toward fully interactive, AI-assisted design experiences — where clients don't just see a project, they walk through it.",
  },
];

const CompanyStory = () => {
  const [poweredIndex, setPoweredIndex] = useState(null);

  const togglePower = (index) => {
    setPoweredIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="story" className="about-section console-section">
      <div className="about-section-header">
        <span className="about-kicker">
          <span className="console-led" />
          Our Story
        </span>
        <h3 className="about-section-title">A Studio Built on Craft</h3>
        <p className="about-lead">
          Every project we take on starts with a question: how do we make this
          space feel real before a single brick is laid?
        </p>
      </div>

      <div className="console-board">
        <div className="console-power-line" aria-hidden="true" />

        {storyZones.map((zone, index) => (
          <div
            className={`console-panel${poweredIndex === index ? " is-powered" : ""}`}
            key={zone.id}
            onClick={() => togglePower(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") togglePower(index);
            }}
          >
            <div className="console-strip" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>

            <div className="console-steam" aria-hidden="true">
              <i /><i /><i />
            </div>

            <div className="console-body">
              <div className="console-dial" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="console-dial-svg">
                  <circle className="dial-track" cx="60" cy="60" r="50" />
                  <circle className="dial-power" cx="60" cy="60" r="50" />
                  <circle className="dial-scan" cx="60" cy="60" r="42" />
                </svg>
                <div className="console-dial-center">
                  <span className="dial-zone">ZONE</span>
                  <span className="dial-id">{zone.id}</span>
                </div>
              </div>

              <div className="console-display">
                <span className="console-label">{zone.label}</span>
                <h3>{zone.title}</h3>
                <p>
                  {zone.text}
                  <span className="console-cursor" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyStory;