import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const storyCards = [
  {
    title: "How We Started",
    text: "Founded by architects and 3D artists who felt static renders weren't enough — we built a studio around motion, interactivity, and real-time technology.",
  },
  {
    title: "Where We're Going",
    text: "We're pushing toward fully interactive, AI-assisted design experiences — where clients don't just see a project, they walk through it.",
  },
];

const CompanyStory = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-story-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: undefined,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="about-section">
      <div className="about-section-header">
        <span className="about-kicker">Our Story</span>
        <h3 className="about-section-title">A Studio Built on Craft</h3>
        <p className="about-lead">
          Every project we take on starts with a question: how do we make this
          space feel real before a single brick is laid?
        </p>
      </div>

      <div className="about-story-grid">
        {storyCards.map((card) => (
          <div className="about-story-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyStory;