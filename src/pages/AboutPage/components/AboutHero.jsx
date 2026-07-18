import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AboutHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero .animate-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );

      gsap.to(".about-hero-card", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="about-section about-hero">
      <div className="about-hero-grid">
        <div className="about-hero-copy">
          <span className="about-kicker animate-item">Who We Are</span>
          <h2 className="about-title animate-item">
            Cinematic 3D Visuals, Built to Move People
          </h2>
          <p className="about-lead animate-item">
            We turn architectural ideas into immersive digital stories, high-end
            visuals, and interactive experiences that make people feel a space
            before it's ever built.
          </p>
          <div className="about-hero-actions animate-item">
            <a href="#contact" className="about-primary-button">
              Start a Project
            </a>
            <a href="#story" className="about-secondary-button">
              Our Story
            </a>
          </div>
        </div>

        <div className="about-hero-visual animate-item">
          <div className="about-hero-card">
            <img
              src="/images/about-hero.webp"
              alt="Studio work"
              className="about-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;