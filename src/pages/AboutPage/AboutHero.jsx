import React, { useEffect, useRef } from "react";
import "./AboutHero.scss";

/**
 * About Hero — "The Viewport"
 * الكانفس بيتصرف كأنه فيوفايندر كاميرا شغال، وبيشغل سيكونس واحد وقت التحميل:
 * BLUEPRINT (خطوط سلكية بتترسم) -> LAYERS (طبقات أكسونومتري بتتجمع) -> RENDER (الصورة الحقيقية).
 * الـ HUD (إحداثيات + % + تايم كود) فاضل شغال بعد كده كديكور حي.
 */

const SEQUENCE = [
  { at: 0, label: "INITIALIZING" },
  { at: 300, label: "SCANNING GEOMETRY" },
  { at: 1600, label: "ASSEMBLING LAYERS" },
  { at: 2800, label: "RENDER COMPLETE" },
];
const SEQUENCE_END = 3600;

const AboutHero = () => {
  const stageRef = useRef(null);
  const percentRef = useRef(null);
  const statusRef = useRef(null);
  const coordRef = useRef(null);
  const timecodeRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const liveRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setStatus = (percent, label) => {
      if (percentRef.current) percentRef.current.textContent = `${percent}%`;
      if (statusRef.current) statusRef.current.textContent = label;
    };

    const goLive = () => {
      liveRef.current = true;
      stage.classList.add("is-live");
      setStatus(100, "RENDER COMPLETE");

      let seconds = 0;
      const tick = () => {
        const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
        const ss = String(seconds % 60).padStart(2, "0");
        if (timecodeRef.current) timecodeRef.current.textContent = `${mm}:${ss}`;
        seconds += 1;
      };
      tick();
      const timecodeInterval = setInterval(tick, 1000);
      stage.dataset.timecodeInterval = timecodeInterval;
    };

    if (prefersReducedMotion) {
      stage.classList.add("skip-intro");
      goLive();
    } else {
      // بنشغل السيكونس عن طريق rAF عشان نحدث الأرقام بسلاسة مع الـ CSS keyframes
      const runFrame = (time) => {
        if (!startRef.current) startRef.current = time;
        const elapsed = time - startRef.current;

        const currentStage = [...SEQUENCE].reverse().find((s) => elapsed >= s.at);
        const nextStage = SEQUENCE[SEQUENCE.indexOf(currentStage) + 1];
        const stageStart = currentStage ? currentStage.at : 0;
        const stageEnd = nextStage ? nextStage.at : SEQUENCE_END;
        const stageProgress = Math.min(1, (elapsed - stageStart) / (stageEnd - stageStart));

        const percentFloor = { 0: 0, 300: 8, 1600: 40, 2800: 78 };
        const percentCeil = { 0: 8, 300: 40, 1600: 78, 2800: 100 };
        const base = percentFloor[stageStart] ?? 0;
        const cap = percentCeil[stageStart] ?? 100;
        const percent = Math.round(base + (cap - base) * stageProgress);

        setStatus(percent, currentStage ? currentStage.label : "INITIALIZING");

        if (elapsed < SEQUENCE_END) {
          rafRef.current = requestAnimationFrame(runFrame);
        } else {
          goLive();
        }
      };
      rafRef.current = requestAnimationFrame(runFrame);
    }

    const handlePointerMove = (clientX, clientY) => {
      if (!liveRef.current || !coordRef.current) return;
      const rect = stage.getBoundingClientRect();
      const xPercent = (((clientX - rect.left) / rect.width) * 100).toFixed(1);
      const yPercent = (((clientY - rect.top) / rect.height) * 100).toFixed(1);
      coordRef.current.textContent = `X ${xPercent}  Y ${yPercent}`;
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) handlePointerMove(touch.clientX, touch.clientY);
    };

    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stage.dataset.timecodeInterval) {
        clearInterval(Number(stage.dataset.timecodeInterval));
      }
    };
  }, []);

  return (
    <section className="about-section about-hero">
      <div className="viewport-stage" ref={stageRef}>
        {/* المرحلة 1: الصورة النهائية — واطية جدًا في الأول، بتطلع بره في آخر السيكونس */}
        <div className="viewport-render" aria-hidden="true" />

        {/* المرحلة 2: البلوبرنت — شبكة + خطوط مبنى بتترسم لوحدها */}
        <div className="viewport-blueprint" aria-hidden="true">
          <div className="blueprint-grid" />
          <svg viewBox="0 0 400 300" className="blueprint-wireframe">
            <polyline
              className="wf-line"
              points="60,230 60,110 200,50 340,110 340,230"
              fill="none"
            />
            <polyline className="wf-line wf-delay-1" points="60,110 340,110" fill="none" />
            <polyline
              className="wf-line wf-delay-2"
              points="120,230 120,150 170,150 170,230"
              fill="none"
            />
            <polyline
              className="wf-line wf-delay-2"
              points="230,230 230,150 280,150 280,230"
              fill="none"
            />
            <line className="wf-line wf-delay-3" x1="60" y1="230" x2="340" y2="230" />
          </svg>
        </div>

        {/* المرحلة 3: الطبقات الأكسونومترية — بتتجمع فوق بعض وبعدين تختفي */}
        <div className="viewport-layers" aria-hidden="true">
          <div className="layer-plane layer-site">
            <span>SITE</span>
          </div>
          <div className="layer-plane layer-structure">
            <span>STRUCTURE</span>
          </div>
          <div className="layer-plane layer-light">
            <span>LIGHT</span>
          </div>
        </div>

        <div className="viewport-grain" aria-hidden="true" />
        <div className="viewport-vignette" aria-hidden="true" />

        {/* شاسيه الكاميرا — إطار فيوفايندر ثابت طول الوقت */}
        <div className="hud-frame" aria-hidden="true">
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />
          <span className="hud-crosshair" />
        </div>

        <div className="hud-readout hud-readout-tl">
          <span className="hud-coord" ref={coordRef}>X 00.0  Y 00.0</span>
        </div>

        <div className="hud-readout hud-readout-tr">
          <span className="hud-rec-dot" />
          <span className="hud-timecode" ref={timecodeRef}>00:00</span>
        </div>

        <div className="hud-status">
          <span className="hud-status-label" ref={statusRef}>INITIALIZING</span>
          <span className="hud-status-percent" ref={percentRef}>0%</span>
        </div>

        <div className="hud-aperture">24MM · f/2.8 · ISO 800</div>

        {/* المحتوى الرئيسي */}
        <div className="viewport-content">
          <span className="viewport-kicker">Who We Are</span>

          <h1 className="viewport-headline">
            <span className="viewport-line">
              <span className="viewport-word">From</span>
            </span>
            <span className="viewport-line">
              <span className="viewport-word">blueprint</span>
              <span className="viewport-word">to</span>
            </span>
            <span className="viewport-line">
              <span className="viewport-word is-accent">believable.</span>
            </span>
          </h1>

          <p className="viewport-lead">
            We turn architectural drawings into cinematic renders, modeled,
            lit, and staged frame by frame until the space feels like
            somewhere you've already been.
          </p>

          <div className="viewport-actions">
            <a href="#contact" className="about-primary-button">
              Start a Project
            </a>
            <a href="#story" className="about-secondary-button">
              Our Story
            </a>
          </div>
        </div>

        <div className="viewport-stats-rail">
          <span>
            <strong>08+</strong> Years
          </span>
          <span className="viewport-divider" />
          <span>
            <strong>120+</strong> Projects
          </span>
          <span className="viewport-divider" />
          <span>
            <strong>40+</strong> Clients
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;