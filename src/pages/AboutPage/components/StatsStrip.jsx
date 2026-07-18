import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 15, suffix: "+", label: "Design Awards" },
];

const StatsStrip = () => {
  const numberRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stats[index].value,
          duration: 1.6,
          delay: index * 0.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(counter.val);
          },
        });
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="about-section about-stats">
      <div className="about-stats-grid">
        {stats.map((stat, index) => (
          <div
            className="about-stat-card"
            key={stat.label}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="about-stat-number">
              <span ref={(el) => (numberRefs.current[index] = el)}>0</span>
              <span className="about-stat-suffix">{stat.suffix}</span>
            </div>
            <p className="about-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;