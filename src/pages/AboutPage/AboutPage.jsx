import React, { useEffect, useRef } from "react";
import Page from "../Page";
import gsap from "gsap";
import "./AboutPage.scss";

const stats = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 15, suffix: "+", label: "Design Awards" },
];

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

const AboutPage = () => {
  const statsRef = useRef([]);
  const valuesRef = useRef([]);
  const hasAnimatedStats = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (
            entry.target.classList.contains("about-stat-value") &&
            !hasAnimatedStats.current
          ) {
            hasAnimatedStats.current = true;
            animateStats();
          }

          if (entry.target.classList.contains("about-value-card")) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statsRef.current.forEach((el) => el && observer.observe(el));
    valuesRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    statsRef.current.forEach((el, index) => {
      if (!el) return;
      const target = stats[index].value;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.6,
        delay: index * 0.1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(counter.val);
        },
      });
    });
  };

  return (
    <Page
      requireDarkRoom={true}
      pageClassName="about-page"
      panelContent={{
        title: "About Us",
        quote: "Revolutionizing architecture for the AI future.",
        content: [
          "At Daniels Design & Dev, we believe architecture is more than just form—it's an experience. Our studio exists to bridge the gap between design and technology, helping architects bring their visions to life through stunning visuals and interactive digital experiences.",
        ],
      }}
      images={[
        "/images/about-1.webp",
        "/images/about-2.webp",
        "/images/about-3.webp",
      ]}
      marqueeItems={[
        "3D Visualization",
        "Architectural Design",
        "Interactive Experiences",
        "Parametric Modeling",
      ]}
    >
      <div className="about-stats">
        {stats.map((stat, index) => (
          <div className="about-stat-item" key={stat.label}>
            <div className="about-stat-number">
              <span
                className="about-stat-value"
                ref={(el) => (statsRef.current[index] = el)}
              >
                0
              </span>
              <span className="about-stat-suffix">{stat.suffix}</span>
            </div>
            <p className="about-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="about-values">
        {values.map((value, index) => (
          <div
            className="about-value-card"
            key={value.title}
            ref={(el) => (valuesRef.current[index] = el)}
          >
            <span className="about-value-index">{`0${index + 1}`}</span>
            <h4 className="about-value-title">{value.title}</h4>
            <p className="about-value-desc">{value.desc}</p>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default AboutPage;