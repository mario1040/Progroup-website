import React, { useEffect, useRef } from "react";
import "./AboutHero.scss";

const AboutHero = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // موضع البداية — مش في النص تمامًا عشان الصورة تبان جزء منها فورًا
    let lx = 62;
    let ly = 42;
    canvas.style.setProperty("--lx", `${lx}%`);
    canvas.style.setProperty("--ly", `${ly}%`);

    const setLens = (xPercent, yPercent) => {
      lx = xPercent;
      ly = yPercent;
      canvas.style.setProperty("--lx", `${lx}%`);
      canvas.style.setProperty("--ly", `${ly}%`);
    };

    const handlePointerMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const xPercent = ((clientX - rect.left) / rect.width) * 100;
      const yPercent = ((clientY - rect.top) / rect.height) * 100;
      setLens(
        Math.min(100, Math.max(0, xPercent)),
        Math.min(100, Math.max(0, yPercent))
      );
      lastMoveRef.current = performance.now();
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) handlePointerMove(touch.clientX, touch.clientY);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    // حركة انسيابية بطيئة لما محدش بيلمس/بيحرك الماوس
    if (!prefersReducedMotion) {
      const idleLoop = (time) => {
        const idleFor = performance.now() - lastMoveRef.current;
        if (idleFor > 1400) {
          const t = time / 1800;
          const driftX = 50 + Math.sin(t) * 22;
          const driftY = 45 + Math.cos(t * 0.8) * 16;
          setLens(driftX, driftY);
        }
        rafRef.current = requestAnimationFrame(idleLoop);
      };
      rafRef.current = requestAnimationFrame(idleLoop);
    }

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="about-section about-hero">
      <div className="reveal-stage" ref={canvasRef}>
        {/* الصورة الخافتة + الصورة الواضحة اللي بتتكشف مع اللمس/الماوس */}
        <div className="reveal-image-dim" aria-hidden="true" />
        <div className="reveal-image-vivid" aria-hidden="true" />
        <div className="reveal-grain" aria-hidden="true" />
        <div className="reveal-vignette" aria-hidden="true" />

        {/* بادچ دائري بيلف */}
        <div className="reveal-badge-spin" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="reveal-badge-path"
                d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
              />
            </defs>
            <text>
              <textPath href="#reveal-badge-path" startOffset="0%">
                DANIELS DESIGN &amp; DEV &nbsp;•&nbsp; EST. STUDIO &nbsp;•&nbsp;
              </textPath>
            </text>
          </svg>
          <span className="reveal-badge-core">3D</span>
        </div>

        {/* ملصقات متناثرة */}
        <span className="reveal-chip chip-1">3D Visualization</span>
        <span className="reveal-chip chip-2">Real-time Engines</span>
        <span className="reveal-chip chip-3">Since 2016</span>

        {/* المحتوى الرئيسي فوق الكانفس */}
        <div className="reveal-content">
          <span className="reveal-kicker">Who We Are</span>

          <h1 className="reveal-headline">
            <span className="reveal-line">
              <span className="reveal-word">Cinematic</span>
            </span>
            <span className="reveal-line">
              <span className="reveal-word">visuals,</span>
              <span className="reveal-word is-accent">built</span>
            </span>
            <span className="reveal-line">
              <span className="reveal-word">to</span>
              <span className="reveal-word is-accent">feel</span>
              <span className="reveal-word">alive.</span>
            </span>
          </h1>

          <p className="reveal-lead">
            We turn architectural ideas into immersive digital stories,
            premium visuals, and interactive experiences that help people
            feel a space before it's built.
          </p>

          <div className="reveal-actions">
            <a href="#contact" className="about-primary-button">
              Start a Project
            </a>
            <a href="#story" className="about-secondary-button">
              Our Story
            </a>
          </div>
        </div>

        {/* شريط أرقام أسفل الكانفس */}
        <div className="reveal-stats-rail">
          <span>
            <strong>08+</strong> Years
          </span>
          <span className="reveal-divider" />
          <span>
            <strong>120+</strong> Projects
          </span>
          <span className="reveal-divider" />
          <span>
            <strong>40+</strong> Clients
          </span>
        </div>

        <span className="reveal-hint">Move to reveal</span>
      </div>
    </section>
  );
};

export default AboutHero;